import { useLocalSearchParams } from 'expo-router';
import { MonthScreen } from '@/screens/MonthScreen';
import { getSafeMonthRoute } from '@/utils/dateRouting';

export default function MonthRouteScreen() {
  const params = useLocalSearchParams<{ year?: string; month?: string }>();
  const safeRoute = getSafeMonthRoute(params);
  return <MonthScreen {...safeRoute} />;
}
