import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Users, Heart, Shield } from 'lucide-react-native';

const features = [
  { icon: Users, delay: 400 },
  { icon: Heart, delay: 600 },
  { icon: Shield, delay: 800 },
];

export default function OnboardingSlide2() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#a855f7', '#d946ef', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.slideGradient}
      >
        <MotiView style={styles.heroContainer}>
          <View style={styles.cardsContainer}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotiView
                  key={index}
                  from={{ opacity: 0, translateY: 40, scale: 0.8 }}
                  animate={{ opacity: 1, translateY: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 12,
                    stiffness: 90,
                    delay: feature.delay,
                  }}
                  style={[
                    styles.card,
                    index === 1 && styles.cardCenter,
                  ]}
                >
                  <View style={styles.iconWrapper}>
                    <Icon size={32} color="#ffffff" strokeWidth={2} />
                  </View>
                </MotiView>
              );
            })}
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1000 }}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Care for Family</Text>
          <Text style={styles.description}>
            Manage every member in one secure app.
          </Text>
        </MotiView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    overflow: 'hidden',
  },
  slideGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    height: 280,
    zIndex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  card: {
    width: 90,
    height: 120,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  cardCenter: {
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    transform: [{ translateY: -10 }],
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 320,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 26,
  },
});
