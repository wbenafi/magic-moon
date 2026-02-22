import { useLocalSearchParams } from 'expo-router';
import { DayScreen } from '@/screens/DayScreen';
import { getSafeDayRoute } from '@/utils/dateRouting';

export default function DayRouteScreen() {
  const params = useLocalSearchParams<{ year?: string; month?: string; day?: string }>();
  const safeRoute = getSafeDayRoute(params);
  return <DayScreen {...safeRoute} />;
}
