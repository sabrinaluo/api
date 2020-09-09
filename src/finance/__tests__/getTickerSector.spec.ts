import { StockMarket } from '../types';
import { getTickerSector, getYahooTickerByMarket } from '../utils';

test('getYahooTickerByMarket', () => {
  expect(getYahooTickerByMarket(StockMarket.SPX, 'GOOG', '')).toEqual('GOOG');
  expect(getYahooTickerByMarket(StockMarket.SPX, 'BRK.B', 'BRKB')).toEqual(
    'BRKB',
  );
  expect(getYahooTickerByMarket(StockMarket.HSI, '5')).toEqual('0005.hk');
  expect(getYahooTickerByMarket(StockMarket.CSI, '000300')).toEqual(
    '000300.SZ',
  );
  expect(getYahooTickerByMarket(StockMarket.CSI, '600300')).toEqual(
    '600300.SS',
  );
});

test('getTickerSector', async () => {
  expect(await getTickerSector(StockMarket.SPX)).toHaveProperty('0', {
    sector: 'CND',
    ticker: 'AMZN',
  });
  expect(await getTickerSector(StockMarket.SPX)).toHaveProperty('172', {
    sector: 'FIN',
    ticker: 'BRKB',
  });
});
