import { calcMa, parseCsvToJson } from '../utils';

describe('parseCsvToJson', () => {
  it('parse csv to json array', () => {
    expect(parseCsvToJson('A,B,C D,E\n1,2,3,4\n5,6,string,8')).toEqual([
      {
        a: 1,
        b: 2,
        c_d: 3,
        e: 4,
      },
      {
        a: 5,
        b: 6,
        c_d: 'string',
        e: 8,
      },
    ]);
  });

  it('skip when last line is empty', () => {
    expect(parseCsvToJson('A,B,C D,E\n1,2,3,4\n')).toEqual([
      {
        a: 1,
        b: 2,
        c_d: 3,
        e: 4,
      },
    ]);
  });
});

test('calcMa', () => {
  expect(
    calcMa(2, [
      {
        date: 'day1',
        adj_close: 2,
      },
      {
        date: 'day2',
        adj_close: 6,
      },
      {
        date: 'day3',
        adj_close: 8,
      },
      {
        date: 'day4',
        adj_close: 20,
      },
    ]),
  ).toEqual({
    day2: {
      adjClose: 6,
      ma2: 4,
    },
    day3: {
      adjClose: 8,
      ma2: 7,
    },
    day4: {
      adjClose: 20,
      ma2: 14,
    },
  });

  expect(
    calcMa(5, [
      {
        date: 'day1',
        adj_close: 2,
      },
      {
        date: 'day2',
        adj_close: 6,
      },
      {
        date: 'day3',
        adj_close: 8,
      },
      {
        date: 'day4',
        adj_close: 20,
      },
      {
        date: 'day5',
        adj_close: 30,
      },
      {
        date: 'day6',
        adj_close: 40,
      },
      {
        date: 'day7',
        adj_close: 50,
      },
    ]),
  ).toEqual({
    day5: {
      adjClose: 30,
      ma5: (30 + 20 + 8 + 6 + 2) / 5,
    },
    day6: {
      adjClose: 40,
      ma5: (40 + 30 + 20 + 8 + 6) / 5,
    },
    day7: {
      adjClose: 50,
      ma5: (50 + 40 + 30 + 20 + 8) / 5,
    },
  });
});
