import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

export function StarfieldBackground() {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 30000, useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: 30000, useNativeDriver: true }),
      ]),
    ).start();
  }, [drift]);

  const translateY = drift.interpolate({ inputRange: [0, 1], outputRange: [0, -40] });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY }] }]}>
        <Image source={require('../../assets/space.webp')} style={styles.image} resizeMode="cover" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '120%',
    opacity: 0.45,
  },
});
