import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { useTestContext } from '../../context/TestContext';

const OceanIntroScreen = ({ navigation }) => {
    const { oceanCompleted, resetOceanTest } = useTestContext();

    const handleStart = () => {
        if (oceanCompleted) {
            resetOceanTest();
        }
        navigation.navigate('OceanTest');
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
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🧠</Text>
                        </View>
                        <Text style={styles.title}>OCEAN Kişilik Testi</Text>
                        <Text style={styles.subtitle}>Big Five Kişilik Modeli</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionCard}>
                        <Text style={styles.description}>
                            OCEAN modeli, bilimsel olarak en çok kabul gören kişilik modellerinden biridir.
                            5 temel boyutta kişiliğinizi analiz eder:
                        </Text>
                    </View>

                    {/* Factors */}
                    <View style={styles.factorsContainer}>
                        {[
                            { letter: 'O', name: 'Deneyime Açıklık', icon: '🎨', color: '#DDA0DD' },
                            { letter: 'C', name: 'Sorumluluk', icon: '📋', color: '#45B7D1' },
                            { letter: 'E', name: 'Dışadönüklük', icon: '🎭', color: '#FF6B6B' },
                            { letter: 'A', name: 'Uyumluluk', icon: '🤝', color: '#4ECDC4' },
                            { letter: 'N', name: 'Duygusal Denge', icon: '⚖️', color: '#96CEB4' },
                        ].map((factor, index) => (
                            <View key={factor.letter} style={styles.factorItem}>
                                <View style={[styles.factorIcon, { backgroundColor: factor.color + '30' }]}>
                                    <Text style={styles.factorEmoji}>{factor.icon}</Text>
                                </View>
                                <View style={styles.factorText}>
                                    <Text style={[styles.factorLetter, { color: factor.color }]}>
                                        {factor.letter}
                                    </Text>
                                    <Text style={styles.factorName}>{factor.name}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Info */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>⏱️</Text>
                            <Text style={styles.infoText}>10-15 dakika</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>📝</Text>
                            <Text style={styles.infoText}>50 soru</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🎯</Text>
                            <Text style={styles.infoText}>Bilimsel</Text>
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsCard}>
                        <Text style={styles.instructionsTitle}>📌 Nasıl Cevaplanır?</Text>
                        <Text style={styles.instructionsText}>
                            • Her ifadeyi dikkatle okuyun{'\n'}
                            • Size en uygun seçeneği işaretleyin{'\n'}
                            • Doğru veya yanlış cevap yoktur{'\n'}
                            • İçgüdüsel olarak cevap verin
                        </Text>
                    </View>

                    {/* Action Button */}
                    <View style={styles.actionContainer}>
                        <Button
                            title={oceanCompleted ? "🔄 Testi Tekrarla" : "🚀 Teste Başla"}
                            onPress={handleStart}
                            gradientColors={['#667eea', '#764ba2']}
                            size="large"
                        />

                        {oceanCompleted && (
                            <Button
                                title="📊 Sonuçları Gör"
                                onPress={() => navigation.navigate('OceanResult')}
                                variant="outline"
                                style={{ marginTop: 12 }}
                            />
                        )}

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
        paddingBottom: 24,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 30,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        fontSize: 50,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 8,
    },
    descriptionCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    description: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 24,
        textAlign: 'center',
    },
    factorsContainer: {
        marginBottom: 24,
    },
    factorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
    },
    factorIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    factorEmoji: {
        fontSize: 22,
    },
    factorText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    factorLetter: {
        fontSize: 20,
        fontWeight: '800',
        marginRight: 10,
    },
    factorName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    infoItem: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 14,
        minWidth: 90,
    },
    infoIcon: {
        fontSize: 24,
        marginBottom: 6,
    },
    infoText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
    },
    instructionsCard: {
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    instructionsTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    instructionsText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 24,
    },
    actionContainer: {
        paddingHorizontal: 10,
    },
});

export default OceanIntroScreen;
