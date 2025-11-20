import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Brain, Lock, Sparkles } from 'lucide-react-native';

export default function OnboardingSlide3() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#d946ef', '#a855f7', '#7c3aed']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.slideGradient}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9, rotateY: '15deg' }}
          animate={{ opacity: 1, scale: 1, rotateY: '0deg' }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 80,
            delay: 200,
          }}
          style={styles.heroContainer}
        >
          <View style={styles.mainCard}>
            <MotiView
              from={{ scale: 0, rotate: '-180deg' }}
              animate={{ scale: 1, rotate: '0deg' }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 100,
                delay: 400,
              }}
              style={styles.brainIconWrapper}
            >
              <Brain size={56} color="#ffffff" strokeWidth={1.5} />
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 600, duration: 400 }}
              style={[styles.badge, styles.badgeLeft]}
            >
              <Lock size={16} color="#ffffff" strokeWidth={2} />
            </MotiView>

            <MotiView
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 700, duration: 400 }}
              style={[styles.badge, styles.badgeRight]}
            >
              <Sparkles size={16} color="#ffffff" strokeWidth={2} />
            </MotiView>
          </View>

          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.3 }}
            transition={{
              type: 'timing',
              duration: 2500,
              loop: true,
              repeatReverse: true,
            }}
            style={styles.glowEffect}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Smart & Private</Text>
          <Text style={styles.description}>
            AI-powered insights with total privacy.
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
  mainCard: {
    width: 200,
    height: 200,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    position: 'relative',
    elevation: 6,
  },
  brainIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeLeft: {
    left: -10,
    top: 40,
  },
  badgeRight: {
    right: -10,
    bottom: 40,
  },
  glowEffect: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#ffffff',
    zIndex: 0,
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
