import moonData from "../services/moonData.json" with { type: "json" };
import type { MoonData } from "./types";

export function getYearsFromMoonData(): number[] {
  return Object.keys(moonData)
    .map(Number)
    .sort((a, b) => a - b);
}

export async function getMoonData({
  month,
  year,
}: {
  month: number;
  year: number;
}): Promise<MoonData> {
  return (moonData[String(year) as keyof typeof moonData] as MoonData[])[month - 1];
}
