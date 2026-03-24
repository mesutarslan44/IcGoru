import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { useTestContext } from '../context/TestContext';

const ResultHistoryScreen = ({ navigation }) => {
    const { resultHistory, deleteResultFromHistory, clearAllHistory } = useTestContext();
    const [expandedResult, setExpandedResult] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, []);

    const getTestInfo = (testType) => {
        switch (testType) {
            case 'ocean':
                return { icon: '🧠', name: 'OCEAN Kişilik', color: '#667eea' };
            case 'inkblot':
                return { icon: '🎨', name: 'Leke Yorumu', color: '#11998e' };
            case 'story':
                return { icon: '📖', name: 'Hikaye Analizi', color: '#f093fb' };
            case 'cognitive':
                return { icon: '🧩', name: 'ZihinGücü', color: '#9C27B0' };
            default:
                return { icon: '📊', name: 'Test', color: '#667eea' };
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Bugün';
        if (diffDays === 1) return 'Dün';
        if (diffDays < 7) return `${diffDays} gün önce`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay önce`;
        return `${Math.floor(diffDays / 365)} yıl önce`;
    };

    const handleDelete = (resultId) => {
        Alert.alert(
            '🗑️ Sonucu Sil',
            'Bu sonucu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => deleteResultFromHistory(resultId)
                }
            ]
        );
    };

    const handleClearAll = () => {
        Alert.alert(
            '🗑️ Tüm Geçmişi Temizle',
            'Tüm kayıtlı sonuçları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Tümünü Sil',
                    style: 'destructive',
                    onPress: clearAllHistory
                }
            ]
        );
    };

    const toggleExpand = (resultId) => {
        setExpandedResult(expandedResult === resultId ? null : resultId);
    };

    const renderResult = (result, index) => {
        const info = getTestInfo(result.testType);
        const isExpanded = expandedResult === result.id;

        return (
            <Animated.View
                key={result.id}
                style={[
                    styles.resultCard,
                    {
                        opacity: fadeAnim,
                        borderLeftColor: info.color
                    }
                ]}
            >
                <TouchableOpacity
                    onPress={() => toggleExpand(result.id)}
                    activeOpacity={0.7}
                    style={styles.resultHeader}
                >
                    <View style={styles.resultLeft}>
                        <Text style={styles.resultIcon}>{info.icon}</Text>
                        <View style={styles.resultInfo}>
                            <Text style={styles.resultName}>{result.testName}</Text>
                            <Text style={styles.resultDate}>{getRelativeTime(result.date)}</Text>
                        </View>
                    </View>
                    <View style={styles.resultRight}>
                        {result.profile?.profileType && (
                            <Text style={[styles.profileBadge, { backgroundColor: info.color + '30', color: info.color }]}>
                                {result.profile.profileType.slice(0, 15)}
                            </Text>
                        )}
                        <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.expandedContent}>
                        {/* Date */}
                        <Text style={styles.fullDate}>
                            📅 {formatDate(result.date)}
                        </Text>

                        {/* Profile */}
                        {result.profile && (
                            <View style={styles.profileSection}>
                                {result.profile.profileType && (
                                    <Text style={styles.profileType}>{result.profile.profileType}</Text>
                                )}
                                {result.profile.profileDescription && (
                                    <Text style={styles.profileDesc}>{result.profile.profileDescription}</Text>
                                )}
                            </View>
                        )}

                        {/* Scores */}
                        {result.scores && (
                            <View style={styles.scoresSection}>
                                <Text style={styles.scoresTitle}>📊 Skorlar</Text>
                                <View style={styles.scoresGrid}>
                                    {Object.entries(result.scores).map(([key, value]) => {
                                        if (typeof value !== 'number') return null;
                                        return (
                                            <View key={key} style={styles.scoreItem}>
                                                <Text style={styles.scoreLabel}>{key}</Text>
                                                <Text style={[styles.scoreValue, { color: info.color }]}>
                                                    {value}%
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        )}

                        {/* Note */}
                        {result.note && (
                            <View style={styles.noteSection}>
                                <Text style={styles.noteLabel}>📝 Notunuz</Text>
                                <Text style={styles.noteText}>{result.note}</Text>
                            </View>
                        )}

                        {/* Delete Button */}
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(result.id)}
                        >
                            <Text style={styles.deleteText}>🗑️ Bu Sonucu Sil</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
        );
    };

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backText}>← Geri</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>📚 Geçmiş Sonuçlar</Text>
                    <View style={{ width: 60 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoIcon}>💡</Text>
                        <Text style={styles.infoText}>
                            Kayıtlı test sonuçlarınızı görüntüleyin ve zaman içindeki değişiminizi takip edin.
                        </Text>
                    </View>

                    {/* Stats */}
                    {resultHistory.length > 0 && (
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{resultHistory.length}</Text>
                                <Text style={styles.statLabel}>Toplam Kayıt</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>
                                    {new Set(resultHistory.map(r => r.testType)).size}
                                </Text>
                                <Text style={styles.statLabel}>Farklı Test</Text>
                            </View>
                        </View>
                    )}

                    {/* Results List */}
                    {resultHistory.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>📭</Text>
                            <Text style={styles.emptyTitle}>Henüz Kayıt Yok</Text>
                            <Text style={styles.emptyText}>
                                Test sonuçlarınızı kaydettiğinizde burada görünecekler.
                            </Text>
                            <Button
                                title="Teste Başla"
                                onPress={() => navigation.navigate('Home')}
                                gradientColors={['#667eea', '#764ba2']}
                                style={{ marginTop: 20 }}
                            />
                        </View>
                    ) : (
                        <>
                            {resultHistory.map((result, index) => renderResult(result, index))}

                            {/* Clear All Button */}
                            <TouchableOpacity
                                style={styles.clearAllButton}
                                onPress={handleClearAll}
                            >
                                <Text style={styles.clearAllText}>🗑️ Tüm Geçmişi Temizle</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        paddingVertical: 8,
        paddingRight: 16,
    },
    backText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        borderRadius: 14,
        padding: 14,
        marginBottom: 20,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    infoIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 28,
        fontWeight: '800',
        color: '#667eea',
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 4,
    },
    resultCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
        borderLeftWidth: 4,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    resultLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    resultIcon: {
        fontSize: 28,
        marginRight: 14,
    },
    resultInfo: {
        flex: 1,
    },
    resultName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    resultDate: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    resultRight: {
        alignItems: 'flex-end',
    },
    profileBadge: {
        fontSize: 11,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginBottom: 6,
        overflow: 'hidden',
    },
    expandIcon: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
    },
    expandedContent: {
        padding: 16,
        paddingTop: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    fullDate: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        marginBottom: 12,
        paddingTop: 12,
    },
    profileSection: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },
    profileType: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    profileDesc: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    scoresSection: {
        marginBottom: 12,
    },
    scoresTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
    },
    scoresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    scoreItem: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
    },
    scoreLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
    },
    scoreValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    noteSection: {
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 193, 7, 0.2)',
    },
    noteLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFD54F',
        marginBottom: 6,
    },
    noteText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
        fontStyle: 'italic',
    },
    deleteButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 13,
        color: '#FF5722',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 60,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        lineHeight: 22,
    },
    clearAllButton: {
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    clearAllText: {
        fontSize: 14,
        color: 'rgba(255, 87, 34, 0.7)',
    },
});

export default ResultHistoryScreen;
