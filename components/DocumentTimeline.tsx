import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { FileText, Image as ImageIcon, Upload, X, Layers, Sparkles } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface Document {
  id: string;
  type: 'prescription' | 'report' | 'invoice' | 'other';
  title: string;
  date: string;
  timestamp: number;
  icon?: string;
  url?: string;
  fileType?: string;
}

interface DocumentTimelineProps {
  documents: Document[];
  onUpload: () => void;
  onViewDocument: (doc: Document) => void;
}

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'prescription':
      return '💊';
    case 'report':
      return '📋';
    case 'invoice':
      return '🧾';
    default:
      return '📄';
  }
};

const getDocumentColor = (type: string, isDark: boolean) => {
  const colors = {
    prescription: isDark ? '#34D399' : '#10B981',
    report: isDark ? '#818CF8' : '#6366F1',
    invoice: isDark ? '#FBBF24' : '#F59E0B',
    other: isDark ? '#F87171' : '#EF4444',
  };
  return colors[type as keyof typeof colors] || colors.other;
};

function TimelineCard3D({
  doc,
  index,
  color,
  isDark,
  colors,
  onPress
}: {
  doc: Document;
  index: number;
  color: string;
  isDark: boolean;
  colors: any;
  onPress: () => void;
}) {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateZ = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.05);
      translateZ.value = withSpring(20);
    })
    .onUpdate((event) => {
      rotateX.value = interpolate(
        event.translationY,
        [-100, 0, 100],
        [15, 0, -15],
        Extrapolate.CLAMP
      );
      rotateY.value = interpolate(
        event.translationX,
        [-100, 0, 100],
        [-15, 0, 15],
        Extrapolate.CLAMP
      );
    })
    .onEnd(() => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
      scale.value = withSpring(1);
      translateZ.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
        { scale: scale.value },
        { translateZ: translateZ.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card3DWrapper, animatedStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          style={styles.card3DTouch}
        >
          <LinearGradient
            colors={isDark
              ? [`${color}15`, `${color}05`]
              : [`${color}10`, `${color}05`]
            }
            style={[styles.card3D, { borderColor: `${color}40` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.card3DInner}>
              <View style={[styles.iconContainer3D, { backgroundColor: `${color}25` }]}>
                <MotiView
                  from={{ scale: 0, rotate: '-180deg' }}
                  animate={{ scale: 1, rotate: '0deg' }}
                  transition={{
                    delay: 400 + index * 100,
                    type: 'spring',
                    damping: 12,
                  }}
                >
                  <Text style={styles.docIcon3D}>{getDocumentIcon(doc.type)}</Text>
                </MotiView>

                <View style={[styles.sparkleContainer]}>
                  <MotiView
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      type: 'timing',
                      duration: 2000,
                      loop: true,
                    }}
                  >
                    <Sparkles size={12} color={color} strokeWidth={2} />
                  </MotiView>
                </View>
              </View>

              <View style={styles.contentContainer3D}>
                <View style={styles.typeRow}>
                  <View style={[styles.typeBadge, { backgroundColor: `${color}20` }]}>
                    <Text style={[styles.typeText, { color: color }]}>
                      {doc.type.toUpperCase()}
                    </Text>
                  </View>
                  <Layers size={14} color={colors.textTertiary} strokeWidth={2} />
                </View>

                <Text style={[styles.docTitle3D, { color: colors.text }]} numberOfLines={2}>
                  {doc.title}
                </Text>

                <Text style={[styles.docDate3D, { color: colors.textSecondary }]}>
                  {doc.date}
                </Text>
              </View>
            </View>

            <View style={[styles.glowLine, { backgroundColor: color }]} />

            <View style={styles.layerIndicators}>
              {[0, 1, 2].map((i) => (
                <MotiView
                  key={i}
                  from={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 600 + index * 100 + i * 50 }}
                  style={[styles.layerDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

export function DocumentTimeline({ documents, onUpload, onViewDocument }: DocumentTimelineProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const scrollY = useSharedValue(0);

  const sortedDocs = [...documents].sort((a, b) => b.timestamp - a.timestamp);

  if (documents.length === 0) {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 300, damping: 15 } as any}
        style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
      >
        <View style={[styles.emptyContainer, { backgroundColor: colors.accentLight }]}>
          <Upload size={40} color={colors.accent} strokeWidth={1.5} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No Documents Yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textTertiary }]}>
            Upload your medical documents
          </Text>
        </View>

        <TouchableOpacity onPress={onUpload} style={styles.uploadButton}>
          <LinearGradient
            colors={['#6366F1', '#818CF8']}
            style={styles.uploadButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Upload size={18} color="#ffffff" strokeWidth={2} />
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    );
  }

  return (
    <>
      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 300, damping: 15 } as any}
        style={[styles.mainCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: colors.text }]}>Documents Timeline</Text>
            <View style={[styles.countBadge, { backgroundColor: colors.accentLight }]}>
              <Text style={[styles.count, { color: colors.accent }]}>{documents.length}</Text>
            </View>
          </View>
          <Layers size={20} color={colors.accent} strokeWidth={2} />
        </View>

        <View style={styles.timeline3D}>
          {sortedDocs.map((doc, index) => {
            const color = getDocumentColor(doc.type, isDark);

            return (
              <MotiView
                key={doc.id}
                from={{
                  opacity: 0,
                  translateX: -50,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                  scale: 1,
                }}
                transition={{
                  type: 'spring',
                  delay: 300 + index * 150,
                  damping: 15,
                  stiffness: 80,
                }}
                style={styles.timelineItem3D}
              >
                <TimelineCard3D
                  doc={doc}
                  index={index}
                  color={color}
                  isDark={isDark}
                  colors={colors}
                  onPress={() => setSelectedDoc(doc)}
                />
              </MotiView>
            );
          })}
        </View>

        <TouchableOpacity onPress={onUpload} style={styles.addButton}>
          <LinearGradient
            colors={['#6366F1', '#818CF8']}
            style={styles.addButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Upload size={18} color="#ffffff" strokeWidth={2} />
            <Text style={styles.addButtonText}>Add Document</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>

      <Modal
        visible={!!selectedDoc}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedDoc(null)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(0, 0, 0, 0.8)' }]}>
          <MotiView
            from={{ scale: 0.8, opacity: 0, rotateX: '45deg' }}
            animate={{ scale: 1, opacity: 1, rotateX: '0deg' }}
            transition={{ type: 'spring', damping: 20 }}
            style={[styles.modalContent, { backgroundColor: colors.containerBg }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{selectedDoc?.title}</Text>
              <TouchableOpacity onPress={() => setSelectedDoc(null)}>
                <X size={24} color={colors.text} strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalDivider} />

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.docDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textTertiary }]}>Type</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>
                    {selectedDoc?.type.charAt(0).toUpperCase()}{selectedDoc?.type.slice(1)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textTertiary }]}>Date</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{selectedDoc?.date}</Text>
                </View>

                {selectedDoc?.fileType && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: colors.textTertiary }]}>File Type</Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>{selectedDoc.fileType}</Text>
                  </View>
                )}

                {selectedDoc?.url && (
                  <View style={[styles.previewContainer, { backgroundColor: colors.cardBg }]}>
                    <View style={styles.previewPlaceholder}>
                      <ImageIcon size={48} color={colors.textTertiary} strokeWidth={1.5} />
                      <Text style={[styles.previewText, { color: colors.textTertiary }]}>Document Preview</Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={() => setSelectedDoc(null)} style={[styles.closeButton, { backgroundColor: colors.cardBg }]}>
                <Text style={[styles.closeButtonText, { color: colors.text }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 6,
    textAlign: 'center',
  },
  uploadButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  mainCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  count: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  timeline3D: {
    gap: 16,
    marginBottom: 20,
  },
  timelineItem3D: {
    width: '100%',
  },
  card3DWrapper: {
    width: '100%',
    height: 140,
  },
  card3DTouch: {
    flex: 1,
  },
  card3D: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  card3DInner: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  iconContainer3D: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  docIcon3D: {
    fontSize: 36,
  },
  sparkleContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  contentContainer3D: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  docTitle3D: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    lineHeight: 22,
  },
  docDate3D: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },
  glowLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    opacity: 0.6,
  },
  layerIndicators: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    flexDirection: 'row',
    gap: 6,
  },
  layerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  addButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 28,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    flex: 1,
    marginRight: 12,
  },
  modalDivider: {
    height: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  modalBody: {
    padding: 24,
  },
  docDetails: {
    gap: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  previewContainer: {
    borderRadius: 16,
    padding: 24,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  previewPlaceholder: {
    alignItems: 'center',
    gap: 12,
  },
  previewText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  modalFooter: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.15)',
  },
  closeButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
