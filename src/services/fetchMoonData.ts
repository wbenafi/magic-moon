import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = "https://www.icalendar37.net/lunar/api/";
const OUTPUT_FILE = path.join(__dirname, "moonData.json");

interface MoonPhase {
  phaseName: string;
  isPhaseLimit: boolean | number;
  lighting: number;
  svg?: string;
  svgMini?: string | boolean;
  timeEvent: string | boolean;
  dis: number;
  dayWeek: number;
  npWidget: string;
}

interface MonthData {
  monthName: string;
  firstDayMonth: string;
  daysMonth: string;
  nameDay: string[];
  nameMonth: string[];
  phase: Record<string, MoonPhase>;
  month: number;
  year: number;
  receivedVariables: Record<string, string>;
  lang: string;
  language: string;
  title: string[];
  autor: string;
  version: string;
}

type MoonDataStore = Record<string, MonthData[]>;

async function fetchMonthData(year: number, month: number): Promise<MonthData> {
  const ldz = new Date(year, month - 1, 1).getTime() / 1000;

  const params = new URLSearchParams({
    lang: "en",
    month: String(month),
    year: String(year),
    LDZ: String(ldz),
  });

  const url = `${API_URL}?${params.toString()}`;
  console.log(`Fetching: Year ${year}, Month ${month}...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // Remove svg fields to reduce file size
  if (data.phase) {
    for (const day of Object.keys(data.phase)) {
      delete data.phase[day].svg;
      delete data.phase[day].svgMini;
    }
  }

  return data;
}

async function fetchYearData(year: number): Promise<MonthData[]> {
  const monthsData: MonthData[] = [];

  for (let month = 1; month <= 12; month++) {
    const monthData = await fetchMonthData(year, month);
    monthsData.push(monthData);

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  return monthsData;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: npx tsx src/services/fetchMoonData.ts <year1> [year2] [year3] ...");
    console.log("Example: npx tsx src/services/fetchMoonData.ts 2024 2025 2026");
    process.exit(1);
  }

  const years = args.map((arg: string) => {
    const year = parseInt(arg, 10);
    if (isNaN(year) || year < 1900 || year > 2100) {
      console.error(`Invalid year: ${arg}`);
      process.exit(1);
    }
    return year;
  });

  // Load existing data if it exists
  let existingData: MoonDataStore = {};
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const fileContent = fs.readFileSync(OUTPUT_FILE, "utf-8");
      existingData = JSON.parse(fileContent);
      console.log(`Loaded existing data with years: ${Object.keys(existingData).join(", ")}`);
    } catch (error) {
      console.warn("Could not parse existing moonData.json, starting fresh");
    }
  }

  console.log(`\nFetching moon data for years: ${years.join(", ")}\n`);

  for (const year of years) {
    console.log(`\n--- Processing year ${year} ---`);
    const yearData = await fetchYearData(year);
    existingData[String(year)] = yearData;
    console.log(`Completed year ${year}`);
  }

  // Sort years in the output
  const sortedData: MoonDataStore = {};
  const sortedYears = Object.keys(existingData).sort();
  for (const year of sortedYears) {
    sortedData[year] = existingData[year];
  }

  // Save to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedData, null, 2));
  console.log(`\nData saved to ${OUTPUT_FILE}`);
  console.log(`Years in file: ${sortedYears.join(", ")}`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

