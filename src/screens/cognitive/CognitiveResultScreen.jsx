import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Share,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import SaveResultModal from '../../components/SaveResultModal';
import { useTestContext } from '../../context/TestContext';
import { generateCognitiveProfile } from '../../utils/cognitiveScoring';
import { cognitiveTestInfo } from '../../data/cognitiveData';

const CognitiveResultScreen = ({ navigation }) => {
    const { cognitiveScores, oceanCompleted, inkblotCompleted, storyCompleted, saveResultToHistory } = useTestContext();
    const [expandedArea, setExpandedArea] = useState(null);
    const [showSaveModal, setShowSaveModal] = useState(false);

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

    if (!cognitiveScores) {
        return (
            <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🧩</Text>
                        <Text style={styles.emptyText}>Henüz test tamamlanmadı</Text>
                        <Button
                            title="Teste Başla"
                            onPress={() => navigation.navigate('CognitiveIntro')}
                            gradientColors={['#9C27B0', '#E91E63']}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const profile = generateCognitiveProfile(cognitiveScores);
    const allTestsCompleted = oceanCompleted && inkblotCompleted && storyCompleted;

    const handleShare = async () => {
        try {
            const message = `🧩 İçGörü - ZihinGücü Testi Sonuçlarım

${profile.profileType}
${profile.profileDescription}

📊 Skorlarım:
• Dikkat: ${cognitiveScores.attention}%
• Hafıza: ${cognitiveScores.memory}%
• Konsantrasyon: ${cognitiveScores.concentration}%
• Mantık: ${cognitiveScores.reasoning}%
• İşlem Hızı: ${cognitiveScores.speed}%

🏆 Genel: ${cognitiveScores.overall}%

📲 Sen de keşfet: İçGörü Uygulaması - Ücretsiz!`;

            await Share.share({ message });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const toggleArea = (area) => {
        setExpandedArea(expandedArea === area ? null : area);
    };

    const handleSaveResult = (note) => {
        saveResultToHistory(
            'cognitive',
            'ZihinGücü Testi',
            cognitiveScores,
            { profileType: profile.profileType, profileDescription: profile.profileDescription },
            note
        );
    };

    const getResultSummary = () => {
        return `${profile.profileType}\nGenel: ${cognitiveScores.overall}%, Dikkat: ${cognitiveScores.attention}%, Hafıza: ${cognitiveScores.memory}%`;
    };

    const getSubtestInfo = (id) => {
        return cognitiveTestInfo.subtests.find(s => s.id === id) || { icon: '📊', color: '#9C27B0' };
    };

    const renderScoreCard = (key) => {
        if (key === 'overall') return null;

        const interpretation = profile.interpretations[key];
        if (!interpretation) return null;

        const info = getSubtestInfo(key);
        const isExpanded = expandedArea === key;

        return (
            <View key={key} style={styles.scoreCard}>
                <TouchableOpacity
                    onPress={() => toggleArea(key)}
                    activeOpacity={0.7}
                    style={[styles.scoreHeader, { borderLeftColor: info.color }]}
                >
                    <View style={styles.scoreLeft}>
                        <Text style={styles.scoreIcon}>{info.icon}</Text>
                        <View style={styles.scoreInfo}>
                            <Text style={styles.scoreName}>{info.name}</Text>
                            <View style={styles.scoreBarContainer}>
                                <View
                                    style={[
                                        styles.scoreBar,
                                        { width: `${interpretation.score}%`, backgroundColor: info.color }
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.scoreRight}>
                        <Text style={[styles.scoreValue, { color: info.color }]}>
                            {interpretation.score}%
                        </Text>
                        <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.scoreDetails}>
                        <Text style={styles.interpretationTitle}>{interpretation.title}</Text>
                        <Text style={styles.interpretationText}>{interpretation.text}</Text>

                        {interpretation.tips && interpretation.tips.length > 0 && (
                            <View style={styles.tipsContainer}>
                                <Text style={styles.tipsTitle}>💡 Tavsiyeler</Text>
                                {interpretation.tips.map((tip, i) => (
                                    <Text key={i} style={styles.tipItem}>• {tip}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    };

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
                        <Text style={styles.headerIcon}>🎉</Text>
                        <Text style={styles.headerTitle}>Test Tamamlandı!</Text>
                        <Text style={styles.headerSubtitle}>ZihinGücü Analizi - Detaylı Sonuçlar</Text>
                    </Animated.View>

                    {/* Free Badge */}
                    <View style={styles.freeBadge}>
                        <Text style={styles.freeBadgeText}>🎁 TÜM SONUÇLAR ÜCRETSİZ!</Text>
                    </View>

                    {/* Overall Score */}
                    <Animated.View
                        style={[
                            styles.overallCard,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={['rgba(156, 39, 176, 0.3)', 'rgba(233, 30, 99, 0.2)']}
                            style={styles.overallGradient}
                        >
                            <View style={styles.overallScoreCircle}>
                                <Text style={styles.overallScoreValue}>{cognitiveScores.overall}</Text>
                                <Text style={styles.overallScoreLabel}>PUAN</Text>
                            </View>
                            <Text style={styles.profileType}>{profile.profileType}</Text>
                            <Text style={styles.profileDescription}>{profile.profileDescription}</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Strengths & Weaknesses */}
                    <View style={styles.highlightsRow}>
                        <View style={[styles.highlightCard, { borderColor: '#4CAF50' }]}>
                            <Text style={styles.highlightIcon}>💪</Text>
                            <Text style={styles.highlightLabel}>En Güçlü</Text>
                            <Text style={[styles.highlightValue, { color: '#4CAF50' }]}>
                                {getSubtestInfo(profile.strongest).name}
                            </Text>
                        </View>
                        <View style={[styles.highlightCard, { borderColor: '#FF9800' }]}>
                            <Text style={styles.highlightIcon}>📈</Text>
                            <Text style={styles.highlightLabel}>Gelişim Alanı</Text>
                            <Text style={[styles.highlightValue, { color: '#FF9800' }]}>
                                {getSubtestInfo(profile.weakest).name}
                            </Text>
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionCard}>
                        <Text style={styles.instructionText}>
                            👆 Her alana dokunarak detaylı analiz ve tavsiyeler görün
                        </Text>
                    </View>

                    {/* Individual Scores */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text style={styles.sectionTitle}>📊 Detaylı Analiz</Text>

                        {['attention', 'memory', 'concentration', 'reasoning', 'speed'].map(key =>
                            renderScoreCard(key)
                        )}
                    </Animated.View>

                    {/* Summary */}
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>📝 Ne Anlama Geliyor?</Text>
                        <Text style={styles.summaryText}>
                            Bilişsel becerileriniz günlük hayatta problem çözme, öğrenme ve karar verme
                            gibi tüm zihinsel aktivitelerinizi etkiler. Bu sonuçları kendinizi geliştirmek
                            için bir yol haritası olarak kullanabilirsiniz.
                        </Text>
                        <Text style={styles.summaryNote}>
                            💡 Düzenli egzersiz, kaliteli uyku ve beyin egzersizleri tüm bilişsel
                            becerilerinizi geliştirebilir.
                        </Text>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <Button
                            title="📤 Sonuçları Paylaş"
                            onPress={handleShare}
                            gradientColors={['#9C27B0', '#E91E63']}
                        />

                        {allTestsCompleted && (
                            <Button
                                title="🏆 Birleşik Sonuçları Gör"
                                onPress={() => navigation.navigate('CombinedResult')}
                                gradientColors={['#667eea', '#764ba2']}
                                style={{ marginTop: 12 }}
                            />
                        )}

                        <Button
                            title="💾 Sonuçları Kaydet"
                            onPress={() => setShowSaveModal(true)}
                            gradientColors={['#FF9800', '#FF5722']}
                            style={{ marginTop: 12 }}
                        />

                        <Button
                            title="🏠 Ana Sayfaya Dön"
                            onPress={() => navigation.navigate('Home')}
                            variant="outline"
                            style={{ marginTop: 12 }}
                        />
                    </View>
                </ScrollView>

                <SaveResultModal
                    visible={showSaveModal}
                    onClose={() => setShowSaveModal(false)}
                    onSave={handleSaveResult}
                    testType="cognitive"
                    testName="ZihinGücü Testi"
                    resultSummary={getResultSummary()}
                />
            </SafeAreaView>
        </LinearGradient>
    );
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
        paddingBottom: 16,
    },
    headerIcon: {
        fontSize: 50,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 6,
    },
    freeBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginBottom: 16,
    },
    freeBadgeText: {
        color: '#4CAF50',
        fontWeight: '700',
        fontSize: 13,
    },
    overallCard: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
    },
    overallGradient: {
        padding: 24,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(156, 39, 176, 0.3)',
    },
    overallScoreCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 4,
        borderColor: '#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    overallScoreValue: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
    },
    overallScoreLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '600',
    },
    profileType: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    profileDescription: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 22,
    },
    highlightsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    highlightCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
    },
    highlightIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    highlightLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 4,
    },
    highlightValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    instructionCard: {
        backgroundColor: 'rgba(255, 193, 7, 0.15)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 13,
        color: '#FFD54F',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 14,
    },
    scoreCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
    },
    scoreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderLeftWidth: 4,
    },
    scoreLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    scoreIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    scoreInfo: {
        flex: 1,
    },
    scoreName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    scoreBarContainer: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        width: '80%',
    },
    scoreBar: {
        height: '100%',
        borderRadius: 3,
    },
    scoreRight: {
        alignItems: 'flex-end',
    },
    scoreValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    expandIcon: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    scoreDetails: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    interpretationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    interpretationText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
        marginBottom: 12,
    },
    tipsContainer: {
        backgroundColor: 'rgba(156, 39, 176, 0.15)',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(156, 39, 176, 0.3)',
    },
    tipsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#9C27B0',
        marginBottom: 8,
    },
    tipItem: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
    },
    summaryCard: {
        backgroundColor: 'rgba(156, 39, 176, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'rgba(156, 39, 176, 0.3)',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
        marginBottom: 12,
    },
    summaryNote: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        fontStyle: 'italic',
    },
    actionsContainer: {
        marginTop: 24,
        paddingHorizontal: 10,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 24,
    },
});

export default CognitiveResultScreen;
