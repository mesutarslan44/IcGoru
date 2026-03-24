import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import TestCard from '../components/TestCard';
import Button from '../components/Button';
import { useTestContext } from '../context/TestContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const { getCompletionStatus, hasCompletedAllTests } = useTestContext();
    const status = getCompletionStatus();

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const testCards = [
        {
            id: 'ocean',
            title: 'OCEAN Kişilik Testi',
            description: 'Big Five modeli ile 5 temel kişilik özelliğinizi keşfedin',
            icon: '🧠',
            duration: '10-15 dk',
            questionCount: '50 soru',
            gradientColors: ['#667eea', '#764ba2'],
            screen: 'OceanIntro',
            completed: status.ocean
        },
        {
            id: 'inkblot',
            title: 'Leke Yorumu Testi',
            description: 'Rorschach benzeri görsellerle bilinçaltınızı keşfedin',
            icon: '🎨',
            duration: '5-10 dk',
            questionCount: '10 kart',
            gradientColors: ['#11998e', '#38ef7d'],
            screen: 'InkblotIntro',
            completed: status.inkblot
        },
        {
            id: 'story',
            title: 'Hikaye Analizi Testi',
            description: 'TAT benzeri görsellerle iç dünyanızı yansıtın',
            icon: '📖',
            duration: '15-20 dk',
            questionCount: '8 görsel',
            gradientColors: ['#f093fb', '#f5576c'],
            screen: 'StoryIntro',
            completed: status.story
        },
        {
            id: 'cognitive',
            title: 'ZihinGücü Testi',
            description: 'Dikkat, hafıza, konsantrasyon ve mantık becerilerinizi ölçün',
            icon: '🧩',
            duration: '15-20 dk',
            questionCount: '5 bölüm',
            gradientColors: ['#9C27B0', '#E91E63'],
            screen: 'CognitiveIntro',
            completed: status.cognitive
        }
    ];

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
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoIcon}>🔮</Text>
                            <View style={styles.logoGlow} />
                        </View>
                        <Text style={styles.appTitle}>İçGörü</Text>
                        <Text style={styles.appSubtitle}>Psikoloji Analiz Uygulaması</Text>

                        {/* Progress indicator */}
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>
                                Tamamlanan: {status.count}/4 test
                            </Text>
                            <View style={styles.progressDots}>
                                {[status.ocean, status.inkblot, status.story, status.cognitive].map((completed, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.progressDot,
                                            completed && styles.progressDotActive
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>
                    </Animated.View>

                    {/* Test Cards */}
                    <Animated.View
                        style={[
                            styles.cardsContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }]
                            }
                        ]}
                    >
                        <Text style={styles.sectionTitle}>🎯 Testleri Keşfet</Text>

                        {testCards.map((test, index) => (
                            <Animated.View
                                key={test.id}
                                style={{
                                    opacity: fadeAnim,
                                    transform: [{
                                        translateX: slideAnim.interpolate({
                                            inputRange: [0, 50],
                                            outputRange: [0, (index % 2 === 0 ? -1 : 1) * 30]
                                        })
                                    }]
                                }}
                            >
                                <TestCard
                                    title={test.title}
                                    description={test.description}
                                    icon={test.icon}
                                    duration={test.duration}
                                    questionCount={test.questionCount}
                                    gradientColors={test.gradientColors}
                                    completed={test.completed}
                                    onPress={() => navigation.navigate(test.screen)}
                                />
                            </Animated.View>
                        ))}
                    </Animated.View>

                    {/* Bottom Actions */}
                    <Animated.View
                        style={[
                            styles.actionsContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        {hasCompletedAllTests ? (
                            <Button
                                title="🏆 Birleşik Sonuçları Gör"
                                onPress={() => navigation.navigate('CombinedResult')}
                                gradientColors={['#f093fb', '#f5576c']}
                                size="large"
                            />
                        ) : (
                            <>
                                <Button
                                    title="📊 Tüm Testleri Başlat"
                                    onPress={() => navigation.navigate('OceanIntro')}
                                    gradientColors={['#667eea', '#764ba2']}
                                    size="large"
                                />

                                {status.count > 0 && (
                                    <View style={styles.partialResultsHint}>
                                        <Text style={styles.hintText}>
                                            💡 {status.count} test tamamlandı. Birleşik sonuç için 4 testi de tamamlayın.
                                        </Text>
                                    </View>
                                )}
                            </>
                        )}
                    </Animated.View>

                    {/* Result History Button */}
                    <TouchableOpacity
                        style={styles.historyButton}
                        onPress={() => navigation.navigate('ResultHistory')}
                    >
                        <Text style={styles.historyIcon}>📚</Text>
                        <View style={styles.historyInfo}>
                            <Text style={styles.historyTitle}>Geçmiş Sonuçlar</Text>
                            <Text style={styles.historySubtitle}>Kayıtlı test sonuçlarınızı görün</Text>
                        </View>
                        <Text style={styles.historyArrow}>→</Text>
                    </TouchableOpacity>

                    {/* Info Section */}
                    <View style={styles.infoSection}>
                        <Text style={styles.welcomeText}>
                            👋 Hoş geldiniz! Bu uygulama 4 farklı psikolojik test ile kendinizi daha iyi tanımanıza yardımcı olur.
                        </Text>
                        <Button
                            title="📚 Testler Hakkında Bilgi Al"
                            onPress={() => navigation.navigate('AboutTests')}
                            variant="outline"
                            style={{ marginTop: 12 }}
                        />
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            ✨ Kendini keşfetmenin ilk adımı
                        </Text>
                        <Text style={styles.footerDisclaimer}>
                            Bu testler eğlence amaçlıdır ve profesyonel değerlendirme yerine geçmez.
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
        paddingBottom: 30,
    },
    header: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    logoIcon: {
        fontSize: 64,
        textShadowColor: 'rgba(102, 126, 234, 0.5)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 20,
    },
    logoGlow: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        backgroundColor: 'rgba(102, 126, 234, 0.3)',
        borderRadius: 50,
        filter: 'blur(20px)',
    },
    appTitle: {
        fontSize: 42,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 2,
        textShadowColor: 'rgba(102, 126, 234, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    appSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
        letterSpacing: 1,
    },
    progressContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    progressText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 8,
    },
    progressDots: {
        flexDirection: 'row',
        gap: 8,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    progressDotActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#81C784',
    },
    cardsContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        marginLeft: 4,
    },
    actionsContainer: {
        marginTop: 30,
        paddingHorizontal: 10,
    },
    partialResultsHint: {
        marginTop: 16,
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    hintText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
    },
    footerDisclaimer: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 20,
    },
    infoSection: {
        marginTop: 30,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 20,
    },
    welcomeText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 22,
    },
    historyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    historyIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    historyInfo: {
        flex: 1,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
    },
    historySubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    historyArrow: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.4)',
    },
});

export default HomeScreen;
