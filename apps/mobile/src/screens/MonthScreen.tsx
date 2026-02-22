import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { MoonPhase } from '@/components/MoonPhase';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { i18n } from '@/domain/i18n';
import { getMoonData, getYearsFromMoonData } from '@/domain/moonApi';
import type { NameDay } from '@/domain/types';

export function MonthScreen({ year, month }: { year: number; month: number }) {
  const years = getYearsFromMoonData();
  const monthData = getMoonData({ year, month });
  const nextMonth = month === 12 ? 1 : month + 1;
  const previousMonth = month === 1 ? 12 : month - 1;
  const nextYear = nextMonth === 1 && years.includes(year + 1) ? year + 1 : year;
  const previousYear = previousMonth === 12 && years.includes(year - 1) ? year - 1 : year;

  return (
    <View style={styles.container}>
      <StarfieldBackground />
      <View style={styles.header}><Text style={styles.brand}>Magic Moon</Text></View>
      <View style={styles.weekdays}>
        {monthData.nameDay.map((day: NameDay) => <Text key={day} style={styles.weekday}>{i18n.es[day].slice(0, 3)}</Text>)}
      </View>
      <View style={styles.grid}>
        {Object.entries(monthData.phase).map(([dayNumber, phase]) => (
          <Link
            key={dayNumber}
            href={`/day/${year}/${month}/${dayNumber}`}
            style={[
              styles.cell,
              Number(dayNumber) === 1 ? { marginLeft: `${(phase.dayWeek / 7) * 100}%` as never } : null,
              phase.isPhaseLimit ? styles.phaseLimit : styles.normal,
            ]}
          >
            <Text style={styles.num}>{dayNumber}</Text>
            <View style={{ width: 35 }}><MoonPhase phaseName={phase.phaseName} percentage={phase.lighting} /></View>
          </Link>
        ))}
      </View>
      <View style={styles.nav}>
        <Link href={`/month/${previousYear}/${previousMonth}`} style={styles.side}>{i18n.es[monthData.nameMonth[previousMonth - 1]]}</Link>
        <Text style={styles.title}>{i18n.es[monthData.monthName]}</Text>
        <Link href={`/month/${nextYear}/${nextMonth}`} style={styles.side}>{i18n.es[monthData.nameMonth[nextMonth - 1]]}</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05070f', paddingTop: 60, paddingHorizontal: 12 },
  header: { alignItems: 'center', marginBottom: 10 },
  brand: { color: '#fff', fontSize: 28 },
  weekdays: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  weekday: { color: 'rgba(255,255,255,0.4)', width: '14.2%', textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 },
  cell: { width: '14.2%', borderRadius: 8, alignItems: 'center', paddingVertical: 6, borderWidth: 1 },
  num: { color: '#fff', fontWeight: '700' },
  phaseLimit: { borderColor: '#9ca3af' },
  normal: { borderColor: '#1f2937' },
  nav: { marginTop: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 30 },
  side: { color: 'rgba(255,255,255,0.5)', fontSize: 18 },
});
