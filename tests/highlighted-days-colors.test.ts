import { DateTime } from '../src/datetime';

test('DateTime.convertHighlightedDays - handles legacy format', () => {
  const array = [
    '2019-11-23',
    ['2019-01-01', '2019-01-15'],
    ['2019-11-01', '2019-11-11'],
  ];
  const convertedArray = DateTime.convertHighlightedDays(array, 'YYYY-MM-DD');
  
  expect(convertedArray).toHaveLength(3);
  expect(convertedArray[0] instanceof DateTime).toBe(true);
  expect(Array.isArray(convertedArray[1])).toBe(true);
  expect(Array.isArray(convertedArray[2])).toBe(true);
});

test('DateTime.convertHighlightedDays - handles new format with single dates', () => {
  const array = [
    { date: '2019-11-23', color: '#ff0000' },
    { date: '2019-12-01', color: '#00ff00' },
  ];
  const convertedArray = DateTime.convertHighlightedDays(array, 'YYYY-MM-DD');
  
  expect(convertedArray).toHaveLength(2);
  expect(convertedArray[0]).toHaveProperty('date');
  expect(convertedArray[0]).toHaveProperty('color', '#ff0000');
  expect((convertedArray[0] as any).date instanceof DateTime).toBe(true);
  expect(convertedArray[1]).toHaveProperty('color', '#00ff00');
});

test('DateTime.convertHighlightedDays - handles new format with date ranges', () => {
  const array = [
    { dates: ['2019-11-01', '2019-11-05'], color: '#0000ff' },
  ];
  const convertedArray = DateTime.convertHighlightedDays(array, 'YYYY-MM-DD');
  
  expect(convertedArray).toHaveLength(1);
  expect(convertedArray[0]).toHaveProperty('dates');
  expect(convertedArray[0]).toHaveProperty('color', '#0000ff');
  expect(Array.isArray((convertedArray[0] as any).dates)).toBe(true);
  expect((convertedArray[0] as any).dates[0] instanceof DateTime).toBe(true);
  expect((convertedArray[0] as any).dates[1] instanceof DateTime).toBe(true);
});

test('DateTime.convertHighlightedDays - handles mixed format', () => {
  const array = [
    '2019-11-23', // legacy single date
    { date: '2019-12-01', color: '#ff0000' }, // new single date with color
    ['2019-01-01', '2019-01-15'], // legacy date range
    { dates: ['2019-11-01', '2019-11-05'], color: '#0000ff' }, // new date range with color
  ];
  const convertedArray = DateTime.convertHighlightedDays(array, 'YYYY-MM-DD');
  
  expect(convertedArray).toHaveLength(4);
  
  // Legacy single date
  expect(convertedArray[0] instanceof DateTime).toBe(true);
  
  // New single date with color
  expect(convertedArray[1]).toHaveProperty('date');
  expect(convertedArray[1]).toHaveProperty('color', '#ff0000');
  
  // Legacy date range
  expect(Array.isArray(convertedArray[2])).toBe(true);
  
  // New date range with color
  expect(convertedArray[3]).toHaveProperty('dates');
  expect(convertedArray[3]).toHaveProperty('color', '#0000ff');
});