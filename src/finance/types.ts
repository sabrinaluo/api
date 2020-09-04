export interface StockPrice {
  date: string;
  adj_close: number;
}

export enum StockMarket {
  CSI = 'csi300',
  HSI = 'hsi50',
  SPX = 'sp500',
}

export interface StockJobItem {
  ticker: string;
  market: StockMarket;
}

export interface CsvItem {
  symbol: string;
  sector: string;
  yahooSymbol?: string;
}
