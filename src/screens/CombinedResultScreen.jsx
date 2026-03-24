import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Share,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResultCard from '../components/ResultCard';
import Button from '../components/Button';
import { useTestContext } from '../context/TestContext';
import { generateCombinedAnalysis, generateShareableReport } from '../utils/combinedAnalysis';

const CombinedResultScreen = ({ navigation }) => {
    const {
        oceanScores,
        inkblotScores,
        storyScores,
        hasCompletedAllTests,
        setCombinedAnalysis,
        resetAllTests
    } = useTestContext();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    if (!hasCompletedAllTests) {
        return (
            <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🔮</Text>
                        <Text style={styles.emptyTitle}>Birleşik Analiz</Text>
                        <Text style={styles.emptyText}>
                            Birleşik sonuçları görmek için 3 testi de tamamlamanız gerekmektedir.
                        </Text>
                        <Button
                            title="Testlere Dön"
                            onPress={() => navigation.navigate('Home')}
                            gradientColors={['#667eea', '#764ba2']}
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const combinedProfile = generateCombinedAnalysis(oceanScores, inkblotScores, storyScores);

    const handleShare = async () => {
        try {
            const message = generateShareableReport(combinedProfile);
            await Share.share({ message });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const handleRestart = () => {
        resetAllTests();
        navigation.navigate('Home');
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
                        <Text style={styles.headerIcon}>🏆</Text>
                        <Text style={styles.headerTitle}>Birleşik Analiz</Text>
                        <Text style={styles.headerSubtitle}>3 Testin Kapsamlı Sonucu</Text>
                    </Animated.View>

                    {/* Overall Profile */}
                    <Animated.View
                        style={[
                            styles.profileCard,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }]
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={[
                                combinedProfile.overallProfile?.color + '40' || 'rgba(102, 126, 234, 0.3)',
                                'rgba(118, 75, 162, 0.2)'
                            ]}
                            style={styles.profileGradient}
                        >
                            <Text style={styles.profileIcon}>{combinedProfile.overallProfile?.icon || '✨'}</Text>
                            <Text style={styles.profileType}>{combinedProfile.overallProfile?.type || 'Keşfedici'}</Text>
                            <Text style={styles.profileSummary}>{combinedProfile.summary}</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Strengths */}
                    {combinedProfile.strengths.length > 0 && (
                        <Animated.View style={{ opacity: fadeAnim }}>
                            <Text style={styles.sectionTitle}>💪 Güçlü Yönleriniz</Text>
                            <View style={styles.strengthsContainer}>
                                {combinedProfile.strengths.map((strength, index) => (
                                    <View key={index} style={styles.strengthItem}>
                                        <Text style={styles.strengthIcon}>{strength.icon}</Text>
                                        <View style={styles.strengthText}>
                                            <Text style={styles.strengthTitle}>{strength.title}</Text>
                                            <Text style={styles.strengthDesc}>{strength.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </Animated.View>
                    )}

                    {/* Growth Areas */}
                    {combinedProfile.growthAreas.length > 0 && (
                        <Animated.View style={{ opacity: fadeAnim }}>
                            <Text style={styles.sectionTitle}>🌱 Gelişim Alanları</Text>
                            <View style={styles.growthContainer}>
                                {combinedProfile.growthAreas.map((area, index) => (
                                    <View key={index} style={styles.growthItem}>
                                        <Text style={styles.growthIcon}>{area.icon}</Text>
                                        <View style={styles.growthText}>
                                            <Text style={styles.growthTitle}>{area.title}</Text>
                                            <Text style={styles.growthDesc}>{area.description}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </Animated.View>
                    )}

                    {/* Recommendations */}
                    {combinedProfile.recommendations.length > 0 && (
                        <Animated.View style={{ opacity: fadeAnim }}>
                            <Text style={styles.sectionTitle}>💡 Öneriler</Text>
                            {combinedProfile.recommendations.map((rec, index) => (
                                <View key={index} style={styles.recCard}>
                                    <Text style={styles.recIcon}>{rec.icon}</Text>
                                    <View style={styles.recContent}>
                                        <Text style={styles.recTitle}>{rec.title}</Text>
                                        <Text style={styles.recText}>{rec.text}</Text>
                                    </View>
                                </View>
                            ))}
                        </Animated.View>
                    )}

                    {/* Primary Traits */}
                    {combinedProfile.primaryTraits.length > 0 && (
                        <Animated.View
                            style={[
                                styles.traitsCard,
                                { opacity: fadeAnim }
                            ]}
                        >
                            <Text style={styles.traitsTitle}>✨ Ana Kişilik Özellikleri</Text>
                            <View style={styles.traitsGrid}>
                                {combinedProfile.primaryTraits.map((trait, index) => (
                                    <View key={index} style={styles.traitItem}>
                                        <Text style={styles.traitIcon}>{trait.icon}</Text>
                                        <Text style={styles.traitName}>{trait.trait}</Text>
                                    </View>
                                ))}
                            </View>
                        </Animated.View>
                    )}

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        <Button
                            title="📤 Sonuçları Paylaş"
                            onPress={handleShare}
                            gradientColors={['#f093fb', '#f5576c']}
                            size="large"
                        />

                        <Button
                            title="🧠 OCEAN Detayları"
                            onPress={() => navigation.navigate('OceanResult')}
                            variant="outline"
                            style={{ marginTop: 12 }}
                        />

                        <Button
                            title="🎨 Leke Testi Detayları"
                            onPress={() => navigation.navigate('InkblotResult')}
                            variant="outline"
                            style={{ marginTop: 8 }}
                        />

                        <Button
                            title="📖 Hikaye Testi Detayları"
                            onPress={() => navigation.navigate('StoryResult')}
                            variant="outline"
                            style={{ marginTop: 8 }}
                        />

                        <View style={styles.divider} />

                        <Button
                            title="🔄 Tüm Testleri Sıfırla"
                            onPress={handleRestart}
                            gradientColors={['#607D8B', '#455A64']}
                            style={{ marginTop: 12 }}
                        />

                        <Button
                            title="🏠 Ana Sayfaya Dön"
                            onPress={() => navigation.navigate('Home')}
                            variant="ghost"
                            style={{ marginTop: 12 }}
                        />
                    </View>

                    {/* Disclaimer */}
                    <View style={styles.disclaimerCard}>
                        <Text style={styles.disclaimerIcon}>ℹ️</Text>
                        <Text style={styles.disclaimerText}>
                            Bu sonuçlar eğlence amaçlıdır ve profesyonel psikolojik değerlendirme yerine geçmez.
                            Ciddi kaygılarınız varsa bir uzmana danışmanızı öneririz.
                        </Text>
                    </View>
                </ScrollView>
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
        paddingBottom: 24,
    },
    headerIcon: {
        fontSize: 70,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
    },
    profileCard: {
        marginBottom: 24,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },
    profileGradient: {
        padding: 28,
        alignItems: 'center',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    profileIcon: {
        fontSize: 50,
        marginBottom: 12,
    },
    profileType: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    profileSummary: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        marginTop: 8,
    },
    strengthsContainer: {
        marginBottom: 8,
    },
    strengthItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.2)',
    },
    strengthIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    strengthText: {
        flex: 1,
    },
    strengthTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    strengthDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    growthContainer: {
        marginBottom: 8,
    },
    growthItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 193, 7, 0.12)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.2)',
    },
    growthIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    growthText: {
        flex: 1,
    },
    growthTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    growthDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    recCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
    },
    recIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    recContent: {
        flex: 1,
    },
    recTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    recText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 19,
    },
    traitsCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
    },
    traitsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    traitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    traitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    traitIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    traitName: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    actionsContainer: {
        marginTop: 32,
        paddingHorizontal: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 16,
    },
    disclaimerCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        marginTop: 24,
        alignItems: 'flex-start',
    },
    disclaimerIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 18,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
        paddingHorizontal: 20,
    },
});

export default CombinedResultScreen;
