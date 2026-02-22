export function todayParts() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

export function parseNumberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getSafeDayRoute(params: {
  year?: string | string[];
  month?: string | string[];
  day?: string | string[];
}) {
  const today = todayParts();
  return {
    year: parseNumberParam(params.year, today.year),
    month: parseNumberParam(params.month, today.month),
    day: parseNumberParam(params.day, today.day),
  };
}

export function getSafeMonthRoute(params: { year?: string | string[]; month?: string | string[] }) {
  const today = todayParts();
  return {
    year: parseNumberParam(params.year, today.year),
    month: parseNumberParam(params.month, today.month),
  };
}
