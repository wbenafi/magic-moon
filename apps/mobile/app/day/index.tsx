import { Redirect } from 'expo-router';
import { todayParts } from '@/utils/dateRouting';

export default function DayIndex() {
  const today = todayParts();
  return <Redirect href={`/day/${today.year}/${today.month}/${today.day}`} />;
}
