import { resolve } from 'path';

import { readFile } from 'fs/promises';

import { StockMarket, StockPrice } from './types';

export const getYahooTickerByMarket = (
  market: StockMarket,
  _symbol: string,
  yahoo?: string,
) => {
  const symbol = String(_symbol);
  switch (market) {
    case StockMarket.HSI:
      return symbol.padStart(4, '0') + '.hk';
    case StockMarket.CSI:
      return symbol + (symbol.startsWith('60') ? '.SS' : '.SZ');
    case StockMarket.SPX:
      return yahoo ?? symbol;
  }
};

export const parseCsvToJson = <T>(csv: string) => {
  const rows = csv.replace(/\n$/, '').split('\n');
  const header = rows
    .shift()
    .split(',')
    .map((str) => str.toLowerCase().replace(' ', '_'));

  return rows.map((row) =>
    row.split(',').reduce((acc, field, index) => {
      const num = Number(field);
      return { ...acc, [header[index]]: isNaN(num) ? field : num };
    }, {} as T),
  );
};

interface ItemWithMa {
  ma: number;
  adjClose: number;
}

export const calcMa = <T>(
  window: number,
  data: StockPrice[],
): Record<string, ItemWithMa> => {
  const result = {};
  let i = data.length - 1;
  const maKey = `ma${window}`;
  while (i >= window - 1) {
    const { date: lastDate, adj_close: lastAdjClose } = data[i + 1] ?? {};
    const { adj_close: adjClose, date } = data[i];
    const { adj_close: firstAdjClose } = data[i - window + 1];

    const ma =
      lastDate && result?.hasOwnProperty(lastDate)
        ? (result[lastDate][maKey] * window - lastAdjClose + firstAdjClose) /
          window
        : data
            .slice(i - window + 1, i + 1)
            .reduce((acc, o) => o.adj_close + acc, 0) / window;

    result[date] = {
      ma,
      adjClose,
    };

    i--;
  }
  return result;
};

export const parseStockInfo = async <T>(filename: StockMarket) => {
  const csv = await readFile(resolve(__dirname, `../../data/${filename}.csv`));
  const json = parseCsvToJson<T>(csv.toString());

  return json;
};
