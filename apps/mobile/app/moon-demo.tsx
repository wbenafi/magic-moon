import { ScrollView, Text, View } from 'react-native';
import { MoonPhase } from '@/components/MoonPhase';
import { PhaseName } from '@/domain/types';

const samples = [
  { phaseName: PhaseName.NewMoon, percentage: 0 },
  { phaseName: PhaseName.FirstQuarter, percentage: 50 },
  { phaseName: PhaseName.FullMoon, percentage: 100 },
  { phaseName: PhaseName.LastQuarter, percentage: 50 },
  { phaseName: PhaseName.Waxing, percentage: 25 },
  { phaseName: PhaseName.Waning, percentage: 75 },
];

export default function MoonDemo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#05070f' }} contentContainerStyle={{ padding: 16, gap: 16 }}>
      {samples.map((sample, index) => (
        <View key={`${sample.phaseName}-${index}`} style={{ width: 120, alignItems: 'center' }}>
          <MoonPhase phaseName={sample.phaseName} percentage={sample.percentage} shadow />
          <Text style={{ color: '#cbd5e1', marginTop: 8 }}>{sample.phaseName}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
