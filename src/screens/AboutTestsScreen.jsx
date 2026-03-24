import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { testInfo, generalInfo } from '../data/testInfo';

const AboutTestsScreen = ({ navigation }) => {
    const [expandedTest, setExpandedTest] = useState(null);

    const toggleTest = (testKey) => {
        setExpandedTest(expandedTest === testKey ? null : testKey);
    };

    const renderTestCard = (testKey, test) => {
        const isExpanded = expandedTest === testKey;

        return (
            <View key={testKey} style={styles.testCard}>
                <TouchableOpacity
                    onPress={() => toggleTest(testKey)}
                    activeOpacity={0.7}
                    style={[styles.testHeader, { borderColor: test.color + '50' }]}
                >
                    <View style={styles.testHeaderLeft}>
                        <Text style={styles.testIcon}>{test.icon}</Text>
                        <Text style={styles.testName}>{test.name}</Text>
                    </View>
                    <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.testContent}>
                        {/* Tarihçe */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>📜 Tarihçe</Text>
                            <Text style={styles.sectionText}>{test.history.origin}</Text>
                            <View style={styles.infoRow}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Yıl</Text>
                                    <Text style={styles.infoValue}>{test.history.year}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Ülke</Text>
                                    <Text style={styles.infoValue}>{test.history.country}</Text>
                                </View>
                            </View>
                            <Text style={styles.developerText}>
                                👤 {test.history.developers}
                            </Text>
                        </View>

                        {/* Nasıl Çalışır */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>⚙️ {test.howItWorks.title}</Text>
                            <Text style={styles.sectionText}>{test.howItWorks.description}</Text>
                            <View style={styles.factorsList}>
                                {test.howItWorks.factors.map((factor, i) => (
                                    <View key={i} style={styles.factorItem}>
                                        <Text style={styles.factorName}>{factor.name}</Text>
                                        <Text style={styles.factorDesc}>{factor.desc}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Amaç */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>🎯 Amaç ve Kullanım</Text>
                            <Text style={styles.sectionText}>
                                <Text style={styles.bold}>Neden: </Text>{test.purpose.why}
                            </Text>
                            <Text style={styles.sectionText}>
                                <Text style={styles.bold}>Kim Kullanır: </Text>{test.purpose.who}
                            </Text>
                            <Text style={styles.sectionText}>
                                <Text style={styles.bold}>Ne Zaman: </Text>{test.purpose.when}
                            </Text>
                        </View>

                        {/* İpuçları */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>💡 İpuçları</Text>
                            {test.tips.map((tip, i) => (
                                <Text key={i} style={styles.tipItem}>• {tip}</Text>
                            ))}
                        </View>

                        {/* Bilimsel Geçerlilik */}
                        <View style={[styles.section, styles.validitySection]}>
                            <Text style={styles.sectionTitle}>🔬 Bilimsel Geçerlilik</Text>
                            <Text style={styles.sectionText}>{test.scientificValidity}</Text>
                        </View>

                        {/* Fun Fact */}
                        {test.funFact && (
                            <View style={styles.funFactBox}>
                                <Text style={styles.funFactTitle}>🤓 İlginç Bilgi</Text>
                                <Text style={styles.funFactText}>{test.funFact}</Text>
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
                    <View style={styles.header}>
                        <Text style={styles.headerIcon}>📚</Text>
                        <Text style={styles.headerTitle}>Testler Hakkında</Text>
                        <Text style={styles.headerSubtitle}>
                            Tarihçe, Amaç ve Kullanım Bilgileri
                        </Text>
                    </View>

                    {/* Genel Bilgi */}
                    <View style={styles.introCard}>
                        <Text style={styles.introTitle}>{generalInfo.aboutPersonalityTests.title}</Text>
                        <Text style={styles.introText}>{generalInfo.aboutPersonalityTests.description}</Text>
                    </View>

                    {/* Test Kartları */}
                    {Object.entries(testInfo).map(([key, test]) => renderTestCard(key, test))}

                    {/* Projektif Testler */}
                    <View style={styles.projectiveCard}>
                        <Text style={styles.projectiveTitle}>{generalInfo.aboutProjectiveTests.title}</Text>
                        <Text style={styles.projectiveText}>{generalInfo.aboutProjectiveTests.description}</Text>
                        <Text style={styles.projectiveHistory}>{generalInfo.aboutProjectiveTests.history}</Text>
                    </View>

                    {/* Genel İpuçları */}
                    <View style={styles.tipsCard}>
                        <Text style={styles.tipsTitle}>{generalInfo.tips.title}</Text>
                        {generalInfo.tips.items.map((tip, i) => (
                            <Text key={i} style={styles.tipText}>✓ {tip}</Text>
                        ))}
                    </View>

                    {/* Uyarı */}
                    <View style={styles.disclaimerCard}>
                        <Text style={styles.disclaimerIcon}>⚠️</Text>
                        <Text style={styles.disclaimerText}>{generalInfo.disclaimer}</Text>
                    </View>

                    {/* Geri Butonu */}
                    <Button
                        title="← Ana Sayfaya Dön"
                        onPress={() => navigation.goBack()}
                        variant="outline"
                        style={{ marginTop: 20 }}
                    />
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
        fontSize: 50,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
        textAlign: 'center',
    },
    introCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    introTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
    },
    introText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
    },
    testCard: {
        marginBottom: 16,
    },
    testHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
    },
    testHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    testIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    testName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        flex: 1,
    },
    expandIcon: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
    testContent: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 14,
        padding: 16,
        marginTop: 8,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
        marginBottom: 8,
    },
    bold: {
        fontWeight: '700',
        color: '#fff',
    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 8,
    },
    infoItem: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: 12,
        marginRight: 8,
    },
    infoLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    developerText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 8,
    },
    factorsList: {
        marginTop: 12,
    },
    factorItem: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
    },
    factorName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    factorDesc: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
    },
    tipItem: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 24,
    },
    validitySection: {
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        borderRadius: 12,
        padding: 14,
    },
    funFactBox: {
        backgroundColor: 'rgba(255, 193, 7, 0.15)',
        borderRadius: 12,
        padding: 14,
    },
    funFactTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    funFactText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
    },
    projectiveCard: {
        backgroundColor: 'rgba(17, 153, 142, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(17, 153, 142, 0.3)',
    },
    projectiveTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
    },
    projectiveText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 22,
        marginBottom: 10,
    },
    projectiveHistory: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        fontStyle: 'italic',
        lineHeight: 20,
    },
    tipsCard: {
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
    },
    tipsTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    tipText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 26,
    },
    disclaimerCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 87, 87, 0.1)',
        borderRadius: 12,
        padding: 16,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(255, 87, 87, 0.2)',
    },
    disclaimerIcon: {
        fontSize: 22,
        marginRight: 12,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
});

export default AboutTestsScreen;
