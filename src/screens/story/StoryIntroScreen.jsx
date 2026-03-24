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

const StoryIntroScreen = ({ navigation }) => {
    const { storyCompleted, resetStoryTest } = useTestContext();

    const handleStart = () => {
        if (storyCompleted) {
            resetStoryTest();
        }
        navigation.navigate('StoryTest');
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
                            <Text style={styles.icon}>📖</Text>
                        </View>
                        <Text style={styles.title}>Hikaye Analizi Testi</Text>
                        <Text style={styles.subtitle}>TAT Benzeri Projektif Test</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionCard}>
                        <Text style={styles.description}>
                            Belirsiz görsellere bakarak kendi hikayenizi oluşturun.
                            Anlattığınız hikayeler, içsel motivasyonlarınızı ve duygularınızı yansıtır.
                        </Text>
                    </View>

                    {/* What It Reveals */}
                    <View style={styles.revealsContainer}>
                        <Text style={styles.revealsTitle}>🔮 Ne Ortaya Çıkarır?</Text>
                        {[
                            { icon: '🏆', text: 'Başarı motivasyonu' },
                            { icon: '❤️', text: 'İlişki ihtiyaçları' },
                            { icon: '👑', text: 'Güç ve kontrol eğilimi' },
                            { icon: '🦅', text: 'Bağımsızlık arzusu' },
                            { icon: '🌤️', text: 'Genel bakış açısı' },
                        ].map((item, index) => (
                            <View key={index} style={styles.revealItem}>
                                <Text style={styles.revealIcon}>{item.icon}</Text>
                                <Text style={styles.revealText}>{item.text}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Info */}
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>⏱️</Text>
                            <Text style={styles.infoText}>15-20 dk</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>🖼️</Text>
                            <Text style={styles.infoText}>8 görsel</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoIcon}>✍️</Text>
                            <Text style={styles.infoText}>Yazılı</Text>
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={styles.instructionsCard}>
                        <Text style={styles.instructionsTitle}>📌 Nasıl Yapılır?</Text>
                        <Text style={styles.instructionsText}>
                            • Her görseli dikkatlice inceleyin{'\n'}
                            • Görselden ilham alarak bir hikaye yazın{'\n'}
                            • Karakterlerin ne hissettiğini, ne düşündüğünü anlatın{'\n'}
                            • En az 20 kelime yazın{'\n'}
                            • Hayal gücünüzü kullanın!
                        </Text>
                    </View>

                    {/* Writing Tips */}
                    <View style={styles.tipsCard}>
                        <Text style={styles.tipsTitle}>💡 İpuçları</Text>
                        <Text style={styles.tipsText}>
                            • Ne oluyor? Neden?{'\n'}
                            • Karakterler ne hissediyor?{'\n'}
                            • Hikaye nasıl bitecek?{'\n'}
                            • Aklınıza gelen ilk şeyleri yazın
                        </Text>
                    </View>

                    {/* Action Button */}
                    <View style={styles.actionContainer}>
                        <Button
                            title={storyCompleted ? "🔄 Testi Tekrarla" : "🚀 Teste Başla"}
                            onPress={handleStart}
                            gradientColors={['#f093fb', '#f5576c']}
                            size="large"
                        />

                        {storyCompleted && (
                            <Button
                                title="📊 Sonuçları Gör"
                                onPress={() => navigation.navigate('StoryResult')}
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
        backgroundColor: 'rgba(240, 147, 251, 0.2)',
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
    revealsContainer: {
        marginBottom: 24,
    },
    revealsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 14,
    },
    revealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
    },
    revealIcon: {
        fontSize: 22,
        marginRight: 14,
    },
    revealText: {
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
        backgroundColor: 'rgba(240, 147, 251, 0.15)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(240, 147, 251, 0.3)',
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
    tipsCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    tipsTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 10,
    },
    tipsText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 22,
    },
    actionContainer: {
        paddingHorizontal: 10,
    },
});

export default StoryIntroScreen;
