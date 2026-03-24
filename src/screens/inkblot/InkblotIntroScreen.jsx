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

const InkblotIntroScreen = ({ navigation }) => {
    const { inkblotCompleted, resetInkblotTest } = useTestContext();

    const handleStart = () => {
        if (inkblotCompleted) {
            resetInkblotTest();
        }
        navigation.navigate('InkblotTest');
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
                            <Text style={styles.icon}>🎨</Text>
                        </View>
                        <Text style={styles.title}>Leke Yorumu Testi</Text>
                        <Text style={styles.subtitle}>Projektif Psikoloji Analizi</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionCard}>
                        <Text style={styles.description}>
                            Rorschach tarzı leke görselleri ile bilinçaltınızı keşfedin.
                            Her görselde ne gördüğünüz, düşünce ve duygu kalıplarınızı ortaya çıkarır.
                        </Text>
                    </View>

                    {/* What It Measures */}
                    <View style={styles.measuresContainer}>
                        <Text style={styles.measuresTitle}>🔍 Ne Ölçer?</Text>
                        {[
                            { icon: '🎨', text: 'Yaratıcılık düzeyi' },
                            { icon: '😌', text: 'Kaygı seviyesi' },
                            { icon: '👥', text: 'Sosyal ilgi' },
                            { icon: '👁️', text: 'Algı biçimi' },
                            { icon: '💭', text: 'Düşünce kalıpları' },
                        ].map((item, index) => (
                            <View key={index} style={styles.measureItem}>
                                <Text style={styles.measureIcon}>{item.icon}</Text>
                                <Text style={styles.measureText}>{item.text}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Info */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>⏱️</Text>
                            <Text style={styles.infoText}>5-10 dk</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🖼️</Text>
                            <Text style={styles.infoText}>10 kart</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🧠</Text>
                            <Text style={styles.infoText}>Projektif</Text>
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsCard}>
                        <Text style={styles.instructionsTitle}>📌 Nasıl Yapılır?</Text>
                        <Text style={styles.instructionsText}>
                            • Her leke görselini inceleyin{'\n'}
                            • Size EN FAZLA neyi çağrıştırıyorsa onu seçin{'\n'}
                            • İçgüdüsel olarak cevap verin{'\n'}
                            • Doğru veya yanlış cevap yoktur
                        </Text>
                    </View>

                    {/* Important Note */}
                    <View style={styles.noteCard}>
                        <Text style={styles.noteIcon}>💡</Text>
                        <Text style={styles.noteText}>
                            Bu test, profesyonel psikolojik değerlendirme değildir.
                            Eğlenceli bir kendini keşfetme aracı olarak kullanılmalıdır.
                        </Text>
                    </View>

                    {/* Action Button */}
                    <View style={styles.actionContainer}>
                        <Button
                            title={inkblotCompleted ? "🔄 Testi Tekrarla" : "🚀 Teste Başla"}
                            onPress={handleStart}
                            gradientColors={['#11998e', '#38ef7d']}
                            size="large"
                        />

                        {inkblotCompleted && (
                            <Button
                                title="📊 Sonuçları Gör"
                                onPress={() => navigation.navigate('InkblotResult')}
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
        backgroundColor: 'rgba(17, 153, 142, 0.2)',
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
    measuresContainer: {
        marginBottom: 24,
    },
    measuresTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 14,
    },
    measureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
    },
    measureIcon: {
        fontSize: 22,
        marginRight: 14,
    },
    measureText: {
        fontSize: 15,
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
        backgroundColor: 'rgba(17, 153, 142, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(17, 153, 142, 0.3)',
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
    noteCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,193,7,0.1)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        alignItems: 'flex-start',
    },
    noteIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    noteText: {
        flex: 1,
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    actionContainer: {
        paddingHorizontal: 10,
    },
});

export default InkblotIntroScreen;
