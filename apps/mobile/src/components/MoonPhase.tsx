import { Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, Filter, G, Path } from 'react-native-svg';
import { PhaseName } from '@/domain/types';

export function getShadowPath(phaseName: PhaseName, percentage: number) {
  const p = Number(percentage);
  const isWaning = [PhaseName.Waning, PhaseName.LastQuarter, PhaseName.NewMoon].includes(phaseName);
  const rx = Math.abs(50 - p);
  const ry = 50;
  const sweepBackbone = isWaning ? 0 : 1;
  const backbonePath = `M 50 0 A 50 50 0 0 ${sweepBackbone} 50 100`;

  let sweepTerminator;
  if (!isWaning) {
    sweepTerminator = p < 50 ? 1 : 0;
  } else {
    sweepTerminator = p < 50 ? 0 : 1;
  }

  const safeRx = Math.max(0.1, rx);
  const terminatorPath = `A ${safeRx} ${ry} 0 0 ${sweepTerminator} 50 0`;
  return `${backbonePath} ${terminatorPath} Z`;
}

export function MoonPhase({ phaseName, percentage, shadow }: { phaseName: PhaseName; percentage: number; shadow?: boolean }) {
  const shadowPath = getShadowPath(phaseName, percentage);

  return (
    <View style={[styles.container, shadow && styles.glow]}>
      <Image source={require('../../assets/moon.webp')} style={styles.texture} resizeMode="cover" />
      <Svg viewBox="0 0 100 100" style={styles.overlay}>
        <Defs>
          <Filter id="dropshadow" x="-20%" y="-20%" width="140%" height="140%" />
        </Defs>
        <G>
          <Path d={shadowPath} fill="rgba(0, 0, 0, 0.87)" />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  texture: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '170deg' }],
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    transform: [{ scale: 1.1 }],
  },
  glow: {
    shadowColor: '#fff',
    shadowOpacity: 0.3,
    shadowRadius: 14,
  },
});
