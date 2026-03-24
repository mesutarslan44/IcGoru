import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
    Share,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import SaveResultModal from '../../components/SaveResultModal';
import { useTestContext } from '../../context/TestContext';
import { generateOceanProfile } from '../../utils/oceanScoring';
import { oceanRecommendations } from '../../data/recommendations';

const { width } = Dimensions.get('window');

const factorKeyMap = {
    'O': 'openness',
    'C': 'conscientiousness',
    'E': 'extraversion',
    'A': 'agreeableness',
    'N': 'neuroticism'
};

const OceanResultScreen = ({ navigation }) => {
    const { oceanScores, inkblotCompleted, storyCompleted, saveResultToHistory } = useTestContext();
    const [expandedFactor, setExpandedFactor] = useState(null);
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

    if (!oceanScores) {
        return (
            <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🤔</Text>
                        <Text style={styles.emptyText}>Henüz test tamamlanmadı</Text>
                        <Button
                            title="Teste Başla"
                            onPress={() => navigation.navigate('OceanIntro')}
                            gradientColors={['#667eea', '#764ba2']}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const profile = generateOceanProfile(oceanScores);

    const getRecommendation = (factorKey, level) => {
        const recKey = factorKeyMap[factorKey];
        if (!recKey || !oceanRecommendations[recKey]) return null;
        return oceanRecommendations[recKey][level] || oceanRecommendations[recKey].medium;
    };

    const handleShare = async () => {
        try {
            const message = `🧠 İçGörü - OCEAN Kişilik Testi Sonuçlarım

${profile.profileType} tipindeyim!
${profile.profileDescription}

📊 Skorlarım:
• Dışadönüklük: ${oceanScores.E}%
• Uyumluluk: ${oceanScores.A}%
• Sorumluluk: ${oceanScores.C}%
• Duygusallık: ${oceanScores.N}%
• Açıklık: ${oceanScores.O}%

📲 Sen de keşfet: İçGörü Uygulaması - Ücretsiz!`;

            await Share.share({ message });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const handleSaveResult = (note) => {
        const resultSummary = `${profile.profileType}\nE: ${oceanScores.E}%, A: ${oceanScores.A}%, C: ${oceanScores.C}%, N: ${oceanScores.N}%, O: ${oceanScores.O}%`;
        saveResultToHistory(
            'ocean',
            'OCEAN Kişilik Testi',
            oceanScores,
            { profileType: profile.profileType, profileDescription: profile.profileDescription },
            note
        );
    };

    const getResultSummary = () => {
        return `${profile.profileType}\nDışadönüklük: ${oceanScores.E}%, Uyumluluk: ${oceanScores.A}%, Sorumluluk: ${oceanScores.C}%, Duygusallık: ${oceanScores.N}%, Açıklık: ${oceanScores.O}%`;
    };

    const getNextTest = () => {
        if (!inkblotCompleted) return { name: 'InkblotIntro', label: 'Leke Testi' };
        if (!storyCompleted) return { name: 'StoryIntro', label: 'Hikaye Testi' };
        return null;
    };

    const nextTest = getNextTest();

    const toggleFactor = (factor) => {
        setExpandedFactor(expandedFactor === factor ? null : factor);
    };

    const renderFactorCard = (factorKey, data) => {
        const rec = getRecommendation(factorKey, data.level);
        const isExpanded = expandedFactor === factorKey;

        const getBadgeColor = () => {
            if (rec?.isPositive === true) return '#4CAF50';
            if (rec?.isPositive === false) return '#FF5722';
            return '#FF9800';
        };

        const getBadgeText = () => {
            if (rec?.isPositive === true) return '✓ Güçlü Yön';
            if (rec?.isPositive === false) return '⚠ Gelişim Alanı';
            return '○ Bağlama Bağlı';
        };

        return (
            <View key={factorKey} style={styles.factorCard}>
                <TouchableOpacity
                    onPress={() => toggleFactor(factorKey)}
                    activeOpacity={0.7}
                    style={styles.factorHeader}
                >
                    <View style={styles.factorLeft}>
                        <Text style={styles.factorIcon}>{data.icon}</Text>
                        <View style={styles.factorInfo}>
                            <Text style={styles.factorName}>{data.name}</Text>
                            <View style={styles.scoreRow}>
                                <View style={[styles.scoreBar, { width: `${data.score}%`, backgroundColor: data.color }]} />
                                <Text style={styles.scoreText}>{data.score}%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.factorRight}>
                        <View style={[styles.badge, { backgroundColor: getBadgeColor() + '30', borderColor: getBadgeColor() }]}>
                            <Text style={[styles.badgeText, { color: getBadgeColor() }]}>{getBadgeText()}</Text>
                        </View>
                        <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                    </View>
                </TouchableOpacity>

                {isExpanded && rec && (
                    <View style={styles.factorDetails}>
                        {/* Başlık ve Analiz */}
                        <View style={styles.analysisSection}>
                            <Text style={styles.recTitle}>{rec.title}</Text>
                            <Text style={styles.analysisText}>{rec.analysis}</Text>
                        </View>

                        {/* Güçlü Yönler */}
                        {rec.strengths && rec.strengths.length > 0 && (
                            <View style={styles.listSection}>
                                <Text style={styles.listTitle}>💪 Güçlü Yönleriniz</Text>
                                {rec.strengths.map((s, i) => (
                                    <Text key={i} style={styles.listItem}>• {s}</Text>
                                ))}
                            </View>
                        )}

                        {/* Zorluklar */}
                        {rec.challenges && rec.challenges.length > 0 && (
                            <View style={styles.listSection}>
                                <Text style={styles.listTitle}>⚡ Dikkat Edilecekler</Text>
                                {rec.challenges.map((c, i) => (
                                    <Text key={i} style={styles.listItem}>• {c}</Text>
                                ))}
                            </View>
                        )}

                        {/* Tavsiyeler */}
                        {rec.recommendations && rec.recommendations.length > 0 && (
                            <View style={[styles.listSection, styles.recSection]}>
                                <Text style={styles.recListTitle}>🎯 Geliştirme Tavsiyeleri</Text>
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
                        <Text style={styles.headerSubtitle}>OCEAN Kişilik Analizi - Detaylı Sonuçlar</Text>
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
                            colors={['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.2)']}
                            style={styles.profileGradient}
                        >
                            <Text style={styles.profileType}>{profile.profileType}</Text>
                            <Text style={styles.profileDescription}>{profile.profileDescription}</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Instructions */}
                    <View style={styles.instructionCard}>
                        <Text style={styles.instructionText}>
                            👆 Her faktöre dokunarak detaylı analiz ve kişisel tavsiyeler görün
                        </Text>
                    </View>

                    {/* Factor Scores with Recommendations */}
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text style={styles.sectionTitle}>📊 Detaylı Faktör Analizi</Text>

                        {Object.keys(profile.interpretations).map((factor) =>
                            renderFactorCard(factor, profile.interpretations[factor])
                        )}
                    </Animated.View>

                    {/* Summary */}
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>📝 Özet</Text>
                        <Text style={styles.summaryText}>
                            Kişiliğinizin güçlü yönlerini kullanarak potansiyelinizi gerçekleştirebilirsiniz.
                            Gelişim alanlarına odaklanarak daha dengeli bir yaşam kurabilirsiniz.
                        </Text>
                        <Text style={styles.summaryNote}>
                            💡 Unutmayın: Her özellik bağlama göre avantaj veya dezavantaj olabilir.
                            Önemli olan kendinizi tanımak ve bilinçli tercihler yapmaktır.
                        </Text>
                    </View>

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <Button
                            title="📤 Sonuçları Paylaş"
                            onPress={handleShare}
                            gradientColors={['#667eea', '#764ba2']}
                        />

                        {nextTest && (
                            <Button
                                title={`➡️ ${nextTest.label}'ne Devam Et`}
                                onPress={() => navigation.navigate(nextTest.name)}
                                gradientColors={['#11998e', '#38ef7d']}
                                style={{ marginTop: 12 }}
                            />
                        )}

                        {inkblotCompleted && storyCompleted && (
                            <Button
                                title="🏆 Birleşik Sonuçları Gör"
                                onPress={() => navigation.navigate('CombinedResult')}
                                gradientColors={['#f093fb', '#f5576c']}
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

                {/* Save Modal */}
                <SaveResultModal
                    visible={showSaveModal}
                    onClose={() => setShowSaveModal(false)}
                    onSave={handleSaveResult}
                    testType="ocean"
                    testName="OCEAN Kişilik Testi"
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
        borderColor: 'rgba(102, 126, 234, 0.3)',
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
    factorCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
    },
    factorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    factorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    factorIcon: {
        fontSize: 28,
        marginRight: 12,
    },
    factorInfo: {
        flex: 1,
    },
    factorName: {
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
    factorRight: {
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
    factorDetails: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    analysisSection: {
        marginBottom: 16,
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
    },
    listSection: {
        marginBottom: 14,
    },
    listTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    listItem: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 22,
        marginLeft: 4,
    },
    recSection: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.2)',
    },
    recListTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4CAF50',
        marginBottom: 10,
    },
    recItem: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 24,
        marginBottom: 4,
    },
    summaryCard: {
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
        borderWidth: 1,
        borderColor: 'rgba(102, 126, 234, 0.3)',
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
        lineHeight: 18,
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

export default OceanResultScreen;
