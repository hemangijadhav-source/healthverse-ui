import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Clock, CheckCircle, XCircle, Eye, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';

interface AppointmentRequest {
  id: string;
  patientId: string;
  patientName: string;
  reason: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed';
  age: number;
  contactNumber: string;
}

export default function AppointmentManagementScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'rejected' | 'completed'>('all');

  const [appointments, setAppointments] = useState<AppointmentRequest[]>([
    {
      id: 'req_1',
      patientId: 'patient_123',
      patientName: 'Emma Wilson',
      reason: 'Regular check-up and blood pressure monitoring',
      preferredDate: 'Jan 25, 2025',
      preferredTime: '10:00 AM',
      status: 'pending',
      age: 45,
      contactNumber: '+1 (555) 123-4567',
    },
    {
      id: 'req_2',
      patientId: 'patient_456',
      patientName: 'Michael Chen',
      reason: 'Follow-up for diabetes management',
      preferredDate: 'Jan 26, 2025',
      preferredTime: '2:30 PM',
      status: 'pending',
      age: 58,
      contactNumber: '+1 (555) 234-5678',
    },
    {
      id: 'req_3',
      patientId: 'patient_789',
      patientName: 'Sarah Martinez',
      reason: 'Consultation for persistent headaches',
      preferredDate: 'Jan 27, 2025',
      preferredTime: '11:00 AM',
      status: 'pending',
      age: 32,
      contactNumber: '+1 (555) 345-6789',
    },
    {
      id: 'req_4',
      patientId: 'patient_111',
      patientName: 'James Brown',
      reason: 'Follow-up',
      preferredDate: 'Today',
      preferredTime: '9:00 AM',
      status: 'confirmed',
      age: 51,
      contactNumber: '+1 (555) 456-7890',
    },
    {
      id: 'req_5',
      patientId: 'patient_222',
      patientName: 'Olivia Davis',
      reason: 'Consultation',
      preferredDate: 'Today',
      preferredTime: '11:30 AM',
      status: 'confirmed',
      age: 29,
      contactNumber: '+1 (555) 567-8901',
    },
    {
      id: 'req_6',
      patientId: 'patient_333',
      patientName: 'Robert Johnson',
      reason: 'Check-up',
      preferredDate: 'Today',
      preferredTime: '2:00 PM',
      status: 'completed',
      age: 64,
      contactNumber: '+1 (555) 678-9012',
    },
  ]);

  const handleApprove = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'confirmed' } : apt)
    );
  };

  const handleReject = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'rejected' } : apt)
    );
  };

  const handleViewPatient = (patientId: string) => {
    router.push({
      pathname: '/(tabs)/doctor-patient-profile',
      params: { patientId },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'confirmed':
        return '#10b981';
      case 'rejected':
        return '#ef4444';
      case 'completed':
        return '#6366F1';
      default:
        return colors.textTertiary;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filterStatus);

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    rejected: appointments.filter(a => a.status === 'rejected').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient colors={colors.background as any} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerButton, { backgroundColor: colors.accentLight }]}>
          <ArrowLeft size={22} color={colors.accent} strokeWidth={2} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>Appointment Management</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {(['all', 'pending', 'confirmed', 'completed', 'rejected'] as const).map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilterStatus(status)}
              style={[
                styles.filterChip,
                { backgroundColor: filterStatus === status ? colors.accent : colors.cardBg, borderColor: colors.cardBorder },
              ]}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterText,
                { color: filterStatus === status ? '#ffffff' : colors.text }
              ]}>
                {status === 'all' ? 'All' : getStatusLabel(status)} ({statusCounts[status]})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Filter size={48} color={colors.textTertiary} strokeWidth={1.5} />
            <Text style={[styles.emptyText, { color: colors.textTertiary }]}>
              No {filterStatus === 'all' ? '' : filterStatus} appointments found
            </Text>
          </View>
        ) : (
          filteredAppointments.map((appointment) => (
            <View key={appointment.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={[styles.avatar, { backgroundColor: colors.accentLight }]}>
                    <Text style={[styles.avatarText, { color: colors.accent }]}>{appointment.patientName.charAt(0)}</Text>
                  </View>
                  <View style={styles.headerInfo}>
                    <Text style={[styles.patientName, { color: colors.text }]}>{appointment.patientName}</Text>
                    <Text style={[styles.patientDetails, { color: colors.textTertiary }]}>
                      {appointment.age} years • {appointment.contactNumber}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(appointment.status)}20` }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                    {getStatusLabel(appointment.status)}
                  </Text>
                </View>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Text style={[styles.label, { color: colors.textTertiary }]}>Reason:</Text>
                  <Text style={[styles.value, { color: colors.text }]}>{appointment.reason}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Clock size={16} color={colors.textTertiary} strokeWidth={2} />
                  <Text style={[styles.value, { color: colors.text }]}>
                    {appointment.preferredDate} at {appointment.preferredTime}
                  </Text>
                </View>
              </View>

              {appointment.status === 'pending' && (
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    onPress={() => handleViewPatient(appointment.patientId)}
                    style={[styles.actionButton, { backgroundColor: colors.accentLight }]}
                    activeOpacity={0.7}
                  >
                    <Eye size={18} color={colors.accent} strokeWidth={2} />
                    <Text style={[styles.actionText, { color: colors.accent }]}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleApprove(appointment.id)}
                    style={[styles.actionButton, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}
                    activeOpacity={0.7}
                  >
                    <CheckCircle size={18} color="#10b981" strokeWidth={2} />
                    <Text style={[styles.actionText, { color: '#10b981' }]}>Confirm</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleReject(appointment.id)}
                    style={[styles.actionButton, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}
                    activeOpacity={0.7}
                  >
                    <XCircle size={18} color="#ef4444" strokeWidth={2} />
                    <Text style={[styles.actionText, { color: '#ef4444' }]}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              {appointment.status !== 'pending' && (
                <TouchableOpacity
                  onPress={() => handleViewPatient(appointment.patientId)}
                  style={styles.viewButton}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.viewButtonText, { color: colors.accent }]}>View Patient Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  filterContainer: {
    paddingVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 16,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  headerInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  cardBody: {
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  viewButton: {
    padding: 16,
    paddingTop: 0,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});
