import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Animated,
    TextInput,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from './Button';

const SaveResultModal = ({
    visible,
    onClose,
    onSave,
    testType,
    testName,
    resultSummary
}) => {
    const [note, setNote] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            }).start();
        } else {
            slideAnim.setValue(300);
        }
    }, [visible]);

    const handleSave = () => {
        onSave(note);
        setNote('');
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            onClose();
        }, 2000);
    };

    const getTestIcon = () => {
        switch (testType) {
            case 'ocean': return '🧠';
            case 'inkblot': return '🎨';
            case 'story': return '📖';
            case 'cognitive': return '🧩';
            default: return '📊';
        }
    };

    if (!visible) return null;

    if (showConfirmation) {
        return (
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.confirmationContainer}>
                        <Text style={styles.confirmIcon}>✅</Text>
                        <Text style={styles.confirmTitle}>Kaydedildi!</Text>
                        <Text style={styles.confirmText}>
                            Sonuçlarınız güvenle saklandı. "Geçmiş Sonuçlar" bölümünden erişebilirsiniz.
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >
                    <LinearGradient
                        colors={['#1a1a2e', '#16213e']}
                        style={styles.modalContent}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.headerIcon}>{getTestIcon()}</Text>
                                <Text style={styles.headerTitle}>Sonuçları Kaydet</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Why Save */}
                            <View style={styles.whyCard}>
                                <Text style={styles.whyTitle}>💡 Neden Kaydetmeliyim?</Text>
                                <Text style={styles.whyText}>
                                    • Terapi sürecinizde ilerlemenizi takip edin{'\n'}
                                    • Bir ay sonra testi tekrar yapın ve karşılaştırın{'\n'}
                                    • Kendinizde olan değişimleri gözlemleyin{'\n'}
                                    • Danışmanınıza veya terapistinize gösterin{'\n'}
                                    • Kişisel gelişim yolculuğunuzu belgeleyin
                                </Text>
                            </View>

                            {/* Result Preview */}
                            <View style={styles.previewCard}>
                                <Text style={styles.previewTitle}>📋 Kaydedilecek Sonuç</Text>
                                <Text style={styles.testName}>{testName}</Text>
                                <Text style={styles.previewResult}>{resultSummary}</Text>
                                <Text style={styles.previewDate}>
                                    📅 {new Date().toLocaleDateString('tr-TR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Text>
                            </View>

                            {/* Note Input */}
                            <View style={styles.noteSection}>
                                <Text style={styles.noteLabel}>
                                    📝 Not Ekleyin (İsteğe Bağlı)
                                </Text>
                                <Text style={styles.noteHint}>
                                    O gün nasıl hissettiniz? Ne düşünüyordunuz?
                                </Text>
                                <TextInput
                                    style={styles.noteInput}
                                    placeholder="Örn: Bugün biraz stresliydim... veya Son 1 haftadır meditasyon yapıyorum..."
                                    placeholderTextColor="rgba(255,255,255,0.3)"
                                    value={note}
                                    onChangeText={setNote}
                                    multiline
                                    numberOfLines={4}
                                />
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionsContainer}>
                                <Button
                                    title="💾 Sonuçları Kaydet"
                                    onPress={handleSave}
                                    gradientColors={['#4CAF50', '#8BC34A']}
                                    size="large"
                                />
                                <TouchableOpacity
                                    style={styles.skipButton}
                                    onPress={onClose}
                                >
                                    <Text style={styles.skipText}>Kaydetmeden Geç</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Privacy Note */}
                            <View style={styles.privacyNote}>
                                <Text style={styles.privacyIcon}>🔒</Text>
                                <Text style={styles.privacyText}>
                                    Verileriniz yalnızca cihazınızda saklanır. Hiçbir sunucuya gönderilmez.
                                </Text>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        maxHeight: '90%',
    },
    modalContent: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#fff',
        flex: 1,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 18,
        color: '#fff',
    },
    whyCard: {
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
    },
    whyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4CAF50',
        marginBottom: 10,
    },
    whyText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
    },
    previewCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    previewTitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 8,
    },
    testName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    previewResult: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
    },
    previewDate: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 12,
    },
    noteSection: {
        marginBottom: 20,
    },
    noteLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    noteHint: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 10,
    },
    noteInput: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 14,
        minHeight: 100,
        color: '#fff',
        fontSize: 14,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    actionsContainer: {
        marginBottom: 16,
    },
    skipButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    skipText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
    },
    privacyNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        padding: 12,
    },
    privacyIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    privacyText: {
        flex: 1,
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
    },
    confirmationContainer: {
        backgroundColor: '#1a1a2e',
        borderRadius: 24,
        padding: 40,
        marginHorizontal: 40,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    confirmIcon: {
        fontSize: 60,
        marginBottom: 16,
    },
    confirmTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#4CAF50',
        marginBottom: 10,
    },
    confirmText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default SaveResultModal;
