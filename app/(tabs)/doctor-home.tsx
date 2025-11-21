import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Bell, Settings, Home, QrCode, Sun, Moon, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';
import QRScanner from '../../components/QRScanner';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  type: string;
  status: 'confirmed' | 'completed';
  date: string;
}

export default function DoctorHomeScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const [showQRScanner, setShowQRScanner] = useState(false);

  const [todaysAppointments] = useState<Appointment[]>([
    {
      id: 'apt_1',
      patientId: 'patient_111',
      patientName: 'James Brown',
      time: '9:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      date: 'Today',
    },
    {
      id: 'apt_2',
      patientId: 'patient_222',
      patientName: 'Olivia Davis',
      time: '11:30 AM',
      type: 'Consultation',
      status: 'confirmed',
      date: 'Today',
    },
    {
      id: 'apt_3',
      patientId: 'patient_333',
      patientName: 'Robert Johnson',
      time: '2:00 PM',
      type: 'Check-up',
      status: 'confirmed',
      date: 'Today',
    },
  ]);

  const [upcomingAppointments] = useState<Appointment[]>([
    {
      id: 'apt_4',
      patientId: 'patient_444',
      patientName: 'Linda Martinez',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      date: 'Jan 25, 2025',
    },
    {
      id: 'apt_5',
      patientId: 'patient_555',
      patientName: 'David Wilson',
      time: '3:30 PM',
      type: 'Consultation',
      status: 'confirmed',
      date: 'Jan 26, 2025',
    },
    {
      id: 'apt_6',
      patientId: 'patient_666',
      patientName: 'Emma Thompson',
      time: '2:00 PM',
      type: 'Check-up',
      status: 'confirmed',
      date: 'Jan 27, 2025',
    },
  ]);

  const handleViewPatient = (patientId: string) => {
    router.push({
      pathname: '/(tabs)/doctor-patient-profile',
      params: { patientId },
    });
  };

  const handleQRScan = (data: string) => {
    setShowQRScanner(false);
    const patientId = data.split('patient_id=')[1]?.split('&')[0] || 'patient_123';
    router.push({
      pathname: '/(tabs)/doctor-patient-profile',
      params: { patientId, walkIn: 'true' },
    });
  };

  const handleNavigateToAppointments = () => {
    router.push('/(tabs)/appointment-management');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient
        colors={colors.background}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good Morning</Text>
            <Text style={[styles.username, { color: colors.text }]}>Dr. Sarah Johnson</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              {isDark ? (
                <Sun size={22} color={colors.textSecondary} strokeWidth={2} />
              ) : (
                <Moon size={22} color={colors.textSecondary} strokeWidth={2} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              <Bell size={22} color={colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              <Settings size={22} color={colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowQRScanner(true)}
          style={styles.qrButton}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6366F1', '#818CF8']}
            style={styles.qrButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <QrCode size={24} color="#ffffff" strokeWidth={2} />
            <Text style={styles.qrButtonText}>Scan Patient QR</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Schedule</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textTertiary }]}>
              {todaysAppointments.length} appointments
            </Text>
          </View>

          {todaysAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              onPress={() => handleViewPatient(appointment.patientId)}
              activeOpacity={0.7}
            >
              <View style={[styles.modernCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                <View style={styles.cardLeft}>
                  <View style={styles.timeContainer}>
                    <Text style={[styles.timeText, { color: colors.accent }]}>{appointment.time}</Text>
                  </View>
                  <View style={styles.cardDivider} />
                  <View style={styles.cardContent}>
                    <View style={styles.patientRow}>
                      <View style={[styles.avatar, { backgroundColor: colors.accentLight }]}>
                        <Text style={[styles.avatarText, { color: colors.accent }]}>{appointment.patientName.charAt(0)}</Text>
                      </View>
                      <View style={styles.patientInfo}>
                        <Text style={[styles.patientName, { color: colors.text }]}>{appointment.patientName}</Text>
                        <View style={styles.typeBadge}>
                          <Text style={[styles.typeText, { color: colors.textTertiary }]}>{appointment.type}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[styles.statusIndicator, { backgroundColor: colors.success }]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={[styles.sectionLink, { color: colors.accent }]}>View All</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              onPress={() => handleViewPatient(appointment.patientId)}
              activeOpacity={0.7}
            >
              <View style={[styles.upcomingCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                <View style={styles.upcomingLeft}>
                  <View style={[styles.dateBox, { backgroundColor: colors.accentLight }]}>
                    <Text style={[styles.dateDay, { color: colors.accent }]}>{appointment.date.split(' ')[1]}</Text>
                    <Text style={[styles.dateMonth, { color: colors.accent }]}>{appointment.date.split(' ')[0]}</Text>
                  </View>
                  <View style={styles.upcomingInfo}>
                    <Text style={[styles.patientName, { color: colors.text }]}>{appointment.patientName}</Text>
                    <View style={styles.upcomingMeta}>
                      <Clock size={14} color={colors.textTertiary} strokeWidth={2} />
                      <Text style={[styles.metaText, { color: colors.textTertiary }]}>{appointment.time}</Text>
                      <View style={[styles.separator, { backgroundColor: colors.textTertiary }]} />
                      <Text style={[styles.metaText, { color: colors.textTertiary }]}>{appointment.type}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={[styles.navContainer, { backgroundColor: colors.navBg, borderColor: colors.iconButtonBorder }]}>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, styles.navButtonActive]}>
              <Home size={24} color="#ffffff" strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            activeOpacity={0.7}
            onPress={handleNavigateToAppointments}
          >
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <FileText size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <Calendar size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showQRScanner}
        transparent
        animationType="slide"
        onRequestClose={() => setShowQRScanner(false)}
      >
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  qrButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  qrButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  qrButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  sectionLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  modernCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardLeft: {
    flexDirection: 'row',
    padding: 20,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  cardDivider: {
    width: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    marginHorizontal: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  statusIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  upcomingCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  upcomingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dateDay: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  dateMonth: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  separator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  navContainer: {
    flexDirection: 'row',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});
