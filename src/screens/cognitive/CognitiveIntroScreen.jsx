import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { cognitiveTestInfo } from '../../data/cognitiveData';

const CognitiveIntroScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <Animated.View
                        style={[
                            styles.header,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🧩</Text>
                        </View>
                        <Text style={styles.title}>ZihinGücü Testi</Text>
                        <Text style={styles.subtitle}>Bilişsel Beceri Değerlendirmesi</Text>
                    </Animated.View>

                    {/* Description */}
                    <Animated.View
                        style={[
                            styles.descriptionCard,
                            { opacity: fadeAnim }
                        ]}
                    >
                        <Text style={styles.descriptionTitle}>📋 Test Hakkında</Text>
                        <Text style={styles.descriptionText}>
                            Bu test, 5 temel bilişsel becerinizi ölçer. Her bölümde farklı zihinsel
                            yetenekleriniz değerlendirilir ve sonunda kapsamlı bir profil oluşturulur.
                        </Text>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoIcon}>⏱️</Text>
                                <Text style={styles.infoLabel}>Süre</Text>
                                <Text style={styles.infoValue}>15-20 dk</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoIcon}>📊</Text>
                                <Text style={styles.infoLabel}>Alt Test</Text>
                                <Text style={styles.infoValue}>5 Bölüm</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoIcon}>🎯</Text>
                                <Text style={styles.infoLabel}>Zorluk</Text>
                                <Text style={styles.infoValue}>Artan</Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Subtests */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text style={styles.sectionTitle}>🧠 Test Bölümleri</Text>

                        {cognitiveTestInfo.subtests.map((subtest, index) => (
                            <Animated.View
                                key={subtest.id}
                                style={[
                                    styles.subtestCard,
                                    {
                                        borderLeftColor: subtest.color,
                                        transform: [{
                                            translateX: slideAnim.interpolate({
                                                inputRange: [0, 50],
                                                outputRange: [0, (index % 2 === 0 ? -1 : 1) * 20]
                                            })
                                        }]
                                    }
                                ]}
                            >
                                <Text style={styles.subtestIcon}>{subtest.icon}</Text>
                                <View style={styles.subtestInfo}>
                                    <Text style={styles.subtestName}>{subtest.name}</Text>
                                    <Text style={styles.subtestDesc}>
                                        {getSubtestDescription(subtest.id)}
                                    </Text>
                                </View>
                                <View style={[styles.subtestBadge, { backgroundColor: subtest.color + '30' }]}>
                                    <Text style={[styles.subtestBadgeText, { color: subtest.color }]}>
                                        {index + 1}
                                    </Text>
                                </View>
                            </Animated.View>
                        ))}
                    </Animated.View>

                    {/* Tips */}
                    <Animated.View
                        style={[
                            styles.tipsCard,
                            { opacity: fadeAnim }
                        ]}
                    >
                        <Text style={styles.tipsTitle}>💡 İpuçları</Text>
                        <Text style={styles.tipItem}>• Her soru için süre sınırı var, dikkatli olun</Text>
                        <Text style={styles.tipItem}>• Sessiz bir ortamda çözün</Text>
                        <Text style={styles.tipItem}>• Acele etmeyin ama çok da yavaş kalmayın</Text>
                        <Text style={styles.tipItem}>• Doğru cevap bulmaya odaklanın</Text>
                    </Animated.View>

                    {/* Disclaimer */}
                    <View style={styles.disclaimerCard}>
                        <Text style={styles.disclaimerIcon}>ℹ️</Text>
                        <Text style={styles.disclaimerText}>
                            Bu test eğlence ve kişisel gelişim amaçlıdır.
                            Profesyonel zeka testi veya tanı yerine geçmez.
                        </Text>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <Button
                            title="🚀 Teste Başla"
                            onPress={() => navigation.replace('CognitiveTest')}
                            gradientColors={['#9C27B0', '#E91E63']}
                            size="large"
                        />
                        <Button
                            title="← Geri Dön"
                            onPress={() => navigation.goBack()}
                            variant="ghost"
                            style={{ marginTop: 12 }}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const getSubtestDescription = (id) => {
    const descriptions = {
        attention: 'Görsel dikkat ve seçici dikkat becerileri',
        memory: 'Kısa süreli ve çalışma belleği',
        concentration: 'Odaklanma ve sürdürülebilir dikkat',
        reasoning: 'Mantıksal düşünme ve problem çözme',
        speed: 'Zihinsel işlem hızı ve tepki süresi'
    };
    return descriptions[id] || '';
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 24,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 3,
        borderColor: 'rgba(156, 39, 176, 0.4)',
    },
    icon: {
        fontSize: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
    },
    descriptionCard: {
        backgroundColor: 'rgba(156, 39, 176, 0.15)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(156, 39, 176, 0.3)',
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoItem: {
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    infoLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
    },
    infoValue: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    subtestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
    },
    subtestIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    subtestInfo: {
        flex: 1,
    },
    subtestName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    subtestDesc: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
    },
    subtestBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtestBadgeText: {
        fontSize: 14,
        fontWeight: '700',
    },
    tipsCard: {
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        borderRadius: 16,
        padding: 16,
        marginTop: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
    },
    tipItem: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 22,
    },
    disclaimerCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 14,
        alignItems: 'flex-start',
    },
    disclaimerIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 18,
    },
    actionsContainer: {
        marginTop: 24,
    },
});

export default CognitiveIntroScreen;
