import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { MoonPhase } from '@/components/MoonPhase';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { getMoonData } from '@/domain/moonApi';
import { i18n } from '@/domain/i18n';

export function DayScreen({ year, month, day }: { year: number; month: number; day: number }) {
  const monthData = getMoonData({ year, month });
  const todayMoon = monthData.phase[String(day)] ?? monthData.phase['1'];
  const timeEvent = todayMoon.timeEvent;
  const hours = timeEvent ? Number(timeEvent.split(':')[0]) - 8 : 0;
  const minutes = timeEvent ? Number(timeEvent.split(':')[1]) : 0;
  const date = new Date(year, month - 1, hours < 0 ? day + 1 : day, hours, minutes);
  const phaseLimits = Object.entries(monthData.phase).filter(([, phase]) => phase.isPhaseLimit);

  return (
    <View style={styles.container}>
      <StarfieldBackground />
      <View style={styles.header}>
        <Text style={styles.brand}>Magic Moon</Text>
        <Link href={`/month/${year}/${month}`} style={styles.cta}>{i18n.es.viewMonth}</Link>
      </View>

      <View style={styles.main}>
        <View style={styles.heroMoon}>
          <MoonPhase phaseName={todayMoon.phaseName} percentage={todayMoon.lighting} shadow />
        </View>
        <Text style={styles.date}>
          {date.toLocaleDateString('es-US', { day: 'numeric', month: 'long' })}
          {todayMoon.timeEvent ? ` ${date.toLocaleTimeString('es-US', { hour: 'numeric', minute: 'numeric' })}` : ''}
        </Text>
        <Text style={styles.phase}>{i18n.es[todayMoon.phaseName]} <Text style={styles.percent}>| {Math.floor(todayMoon.lighting)}%</Text></Text>

        <View style={styles.grid}>
          {phaseLimits.map(([monthDay, phase]) => (
            <Link key={monthDay} href={`/day/${year}/${month}/${monthDay}`} style={styles.card}>
              <Text style={styles.dayNumber}>{monthDay}</Text>
              <View style={{ width: 56 }}>
                <MoonPhase phaseName={phase.phaseName} percentage={phase.lighting} />
              </View>
              <Text style={styles.cardLabel}>{i18n.es[phase.phaseName]}</Text>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05070f' },
  header: { paddingHorizontal: 20, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#fff', fontSize: 28 },
  cta: { color: '#fff', borderWidth: 1, borderColor: '#fff', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
  main: { alignItems: 'center', paddingTop: 20, paddingHorizontal: 16 },
  heroMoon: { width: '70%', maxWidth: 330 },
  date: { color: '#fff', fontSize: 22, marginTop: 12 },
  phase: { color: '#fff', fontSize: 28, marginVertical: 18 },
  percent: { color: '#94a3b8', fontSize: 18 },
  grid: { width: '100%', maxWidth: 380, flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  card: { width: '23%', borderWidth: 1, borderColor: 'rgba(100,116,139,0.4)', borderRadius: 6, alignItems: 'center', paddingVertical: 8 },
  dayNumber: { color: 'rgba(255,255,255,0.7)' },
  cardLabel: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 11, marginTop: 6 },
});
