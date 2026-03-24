import React, { useEffect, useRef, useState } from 'react';
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
import { generateStoryProfile } from '../../utils/storyScoring';
import { storyRecommendations } from '../../data/recommendations';

const StoryResultScreen = ({ navigation }) => {
    const { storyScores, oceanCompleted, inkblotCompleted, saveResultToHistory } = useTestContext();
    const [expandedSection, setExpandedSection] = useState(null);
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

    if (!storyScores) {
        return (
            <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📖</Text>
                        <Text style={styles.emptyText}>Henüz test tamamlanmadı</Text>
                        <Button
                            title="Teste Başla"
                            onPress={() => navigation.navigate('StoryIntro')}
                            gradientColors={['#f093fb', '#f5576c']}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const profile = generateStoryProfile(storyScores);

    const getRecommendation = (key, level) => {
        if (!storyRecommendations[key]) return null;
        return storyRecommendations[key][level] || storyRecommendations[key].medium;
    };

    const handleShare = async () => {
        try {
            const message = `📖 İçGörü - Hikaye Analizi Testi Sonuçlarım

${profile.profileType} tipindeyim!
${profile.profileDescription}

📊 Motivasyonlarım:
• Başarı: ${storyScores.achievement}%
• İlişki: ${storyScores.affiliation}%
• Güç: ${storyScores.power}%
• Bağımsızlık: ${storyScores.autonomy}%

📲 Sen de keşfet: İçGörü Uygulaması - Ücretsiz!`;

            await Share.share({ message });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const allTestsCompleted = oceanCompleted && inkblotCompleted;

    const handleSaveResult = (note) => {
        saveResultToHistory(
            'story',
            'Hikaye Analizi Testi',
            storyScores,
            { profileType: profile.profileType, profileDescription: profile.profileDescription },
            note
        );
    };

    const getResultSummary = () => {
        return `${profile.profileType}\nBaşarı: ${storyScores.achievement}%, İlişki: ${storyScores.affiliation}%, Güç: ${storyScores.power}%`;
    };

    const getLevelFromScore = (score) => {
        if (score >= 60) return 'high';
        if (score >= 30) return 'low';
        return 'medium';
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const motivationData = [
        { key: 'achievement', title: 'Başarı Motivasyonu', icon: '🏆', score: storyScores.achievement },
        { key: 'affiliation', title: 'İlişki İhtiyacı', icon: '❤️', score: storyScores.affiliation },
        { key: 'power', title: 'Güç Motivasyonu', icon: '👑', score: storyScores.power },
        { key: 'autonomy', title: 'Bağımsızlık', icon: '🦅', score: storyScores.autonomy },
    ];

    const renderMotivationCard = (data) => {
        const level = getLevelFromScore(data.score);
        const rec = getRecommendation(data.key, level);
        const isExpanded = expandedSection === data.key;

        const getBadgeInfo = () => {
            if (rec?.isPositive === true) return { color: '#4CAF50', text: '✓ Güçlü Yön' };
            if (rec?.isPositive === false) return { color: '#FF5722', text: '⚠ Dikkat' };
            return { color: '#FF9800', text: '○ Nötr' };
        };

        const badge = getBadgeInfo();

        return (
            <View key={data.key} style={styles.analysisCard}>
                <TouchableOpacity
                    onPress={() => toggleSection(data.key)}
                    activeOpacity={0.7}
                    style={styles.cardHeader}
                >
                    <View style={styles.cardLeft}>
                        <Text style={styles.cardIcon}>{data.icon}</Text>
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardTitle}>{data.title}</Text>
                            <View style={styles.scoreRow}>
                                <View style={[styles.scoreBar, { width: `${data.score}%`, backgroundColor: badge.color }]} />
                                <Text style={styles.scoreText}>{data.score}%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardRight}>
                        <View style={[styles.badge, { backgroundColor: badge.color + '30', borderColor: badge.color }]}>
                            <Text style={[styles.badgeText, { color: badge.color }]}>{badge.text}</Text>
                        </View>
                        <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                    </View>
                </TouchableOpacity>

                {isExpanded && rec && (
                    <View style={styles.cardDetails}>
                        <Text style={styles.recTitle}>{rec.title}</Text>
                        <Text style={styles.analysisText}>{rec.analysis}</Text>

                        {rec.recommendations && rec.recommendations.length > 0 && (
                            <View style={styles.recSection}>
                                <Text style={styles.recListTitle}>🎯 Tavsiyeler</Text>
                                {rec.recommendations.map((r, i) => (
                                    <Text key={i} style={styles.recItem}>{r}</Text>
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
                        <Text style={styles.headerSubtitle}>Hikaye Analizi - Detaylı Sonuçlar</Text>
                    </Animated.View>

                    {/* Free Badge */}
                    <View style={styles.freeBadge}>
                        <Text style={styles.freeBadgeText}>🎁 TÜM SONUÇLAR ÜCRETSİZ!</Text>
                    </View>

                    {/* Profile Type */}
                    <Animated.View
                        style={[
                            styles.profileCard,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={['rgba(240, 147, 251, 0.3)', 'rgba(245, 87, 108, 0.2)']}
                            style={styles.profileGradient}
                        >
                            <Text style={styles.profileType}>{profile.profileType}</Text>
                            <Text style={styles.profileDescription}>{profile.profileDescription}</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Instructions */}
                    <View style={styles.instructionCard}>
                        <Text style={styles.instructionText}>
                            👆 Her motivasyona dokunarak detaylı analiz ve tavsiyeler görün
                        </Text>
                    </View>

                    {/* Motivation Scores */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text style={styles.sectionTitle}>🎯 Motivasyon Profiliniz</Text>

                        {motivationData.map(data => renderMotivationCard(data))}
                    </Animated.View>

                    {/* Story Statistics */}
                    <Animated.View
                        style={[
                            styles.statsCard,
                            { opacity: fadeAnim }
                        ]}
                    >
                        <Text style={styles.statsTitle}>📝 Anlatım Analizi</Text>
                        <View style={styles.statsGrid}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{storyScores.averageWordCount || 0}</Text>
                                <Text style={styles.statLabel}>Ort. Kelime</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>
                                    {storyScores.detailLevel === 'high' ? 'Detaylı' :
                                        storyScores.detailLevel === 'low' ? 'Özet' : 'Dengeli'}
                                </Text>
                                <Text style={styles.statLabel}>Anlatım Tarzı</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>
                                    {storyScores.emotionalTone === 'positive' ? '☀️' :
                                        storyScores.emotionalTone === 'negative' ? '🌧️' : '⚖️'}
                                </Text>
                                <Text style={styles.statLabel}>Duygusal Ton</Text>
                            </View>
                        </View>

                        <View style={styles.toneExplanation}>
                            <Text style={styles.toneText}>
                                {storyScores.emotionalTone === 'positive'
                                    ? '☀️ Hikayelerinizde iyimser ve umutlu bir ton var. Bu olumlu bakış açısı güçlü bir yöndür!'
                                    : storyScores.emotionalTone === 'negative'
                                        ? '🌧️ Hikayelerinizde zorluk temalı anlatımlar var. Bu farkındalık öz-bakım için önemli bir sinyal olabilir.'
                                        : '⚖️ Hikayelerinizde dengeli bir duygusal ton var. Hem olumlu hem olumsuz yönleri görüyorsunuz.'}
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Summary */}
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>📝 Ne Anlama Geliyor?</Text>
                        <Text style={styles.summaryText}>
                            Anlattığınız hikayeler, bilinçaltı motivasyonlarınızı yansıtır.
                            Hangi temaları seçtiğiniz, karakterlere ne atfettiğiniz -
                            hepsi iç dünyanızın bir aynasıdır.
                        </Text>
                        <Text style={styles.summaryNote}>
                            💡 Motivasyonlarınızı bilmek, kariyer ve ilişki kararlarınızda size rehberlik edebilir.
                        </Text>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <Button
                            title="📤 Sonuçları Paylaş"
                            onPress={handleShare}
                            gradientColors={['#f093fb', '#f5576c']}
                        />

                        {allTestsCompleted ? (
                            <Button
                                title="🏆 Birleşik Sonuçları Gör"
                                onPress={() => navigation.navigate('CombinedResult')}
                                gradientColors={['#667eea', '#764ba2']}
                                style={{ marginTop: 12 }}
                            />
                        ) : (
                            <Button
                                title={`➡️ ${!oceanCompleted ? 'OCEAN Testi' : 'Leke Testi'}'ne Devam Et`}
                                onPress={() => navigation.navigate(!oceanCompleted ? 'OceanIntro' : 'InkblotIntro')}
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
                    testType="story"
                    testName="Hikaye Analizi Testi"
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
    profileCard: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileGradient: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(240, 147, 251, 0.3)',
    },
    profileType: {
        fontSize: 28,
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
    analysisCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardIcon: {
        fontSize: 28,
        marginRight: 12,
    },
    cardInfo: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreBar: {
        height: 6,
        borderRadius: 3,
        marginRight: 8,
    },
    scoreText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '600',
    },
    cardRight: {
        alignItems: 'flex-end',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
    },
    expandIcon: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    cardDetails: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    recTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    analysisText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
        marginBottom: 12,
    },
    recSection: {
        backgroundColor: 'rgba(240, 147, 251, 0.15)',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(240, 147, 251, 0.2)',
    },
    recListTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#f093fb',
        marginBottom: 10,
    },
    recItem: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 24,
        marginBottom: 4,
    },
    statsCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        color: '#f093fb',
        fontWeight: '700',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
    },
    toneExplanation: {
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        padding: 12,
    },
    toneText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
        textAlign: 'center',
    },
    summaryCard: {
        backgroundColor: 'rgba(240, 147, 251, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'rgba(240, 147, 251, 0.3)',
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

export default StoryResultScreen;
