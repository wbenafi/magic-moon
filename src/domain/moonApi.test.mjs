import test from 'node:test';
import assert from 'node:assert/strict';

import { getMoonData, getYearsFromMoonData } from './moonApi.ts';

test('returns sorted years from moon data', () => {
  const years = getYearsFromMoonData();

  assert.deepEqual(years, [...years].sort((a, b) => a - b));
  assert.equal(years[0], 2023);
  assert.equal(years.at(-1), 2027);
});

test('returns expected sample month payload', async () => {
  const january2024 = await getMoonData({ month: 1, year: 2024 });

  assert.equal(january2024.month, 1);
  assert.equal(january2024.year, 2024);
  assert.equal(january2024.monthName, 'January');
  assert.equal(january2024.phase[11].phaseName, 'New Moon');
  assert.equal(january2024.phase[25].phaseName, 'Full moon');
});
