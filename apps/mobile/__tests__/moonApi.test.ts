import { getMoonData, getYearsFromMoonData } from '../src/domain/moonApi';

describe('moonApi parity', () => {
  it('returns sorted years', () => {
    const years = getYearsFromMoonData();
    expect(years[0]).toBe(2023);
    expect(years.at(-1)).toBe(2028);
  });

  it('returns expected moon data for known sample date', () => {
    const monthData = getMoonData({ year: 2024, month: 3 });
    expect(monthData.monthName).toBe('March');
    expect(monthData.phase['25'].phaseName).toBe('Full moon');
  });
});
