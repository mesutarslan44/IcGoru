import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResultCard = ({
    title,
    score,
    level,
    description,
    icon,
    color = '#667eea',
    showScore = true,
    style
}) => {
    const getLevelColor = () => {
        switch (level?.toLowerCase()) {
            case 'yüksek':
            case 'high':
                return '#4CAF50';
            case 'orta':
            case 'medium':
                return '#FF9800';
            case 'düşük':
            case 'low':
                return '#9E9E9E';
            default:
                return color;
        }
    };

    const getScoreGradient = () => {
        if (score >= 70) return ['#4CAF50', '#8BC34A'];
        if (score >= 40) return ['#FF9800', '#FFC107'];
        return ['#9E9E9E', '#BDBDBD'];
    };

    return (
        <View style={[styles.card, style]}>
            <LinearGradient
                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                style={styles.cardGradient}
            >
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        {icon && <Text style={styles.icon}>{icon}</Text>}
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    {level && (
                        <View style={[styles.levelBadge, { backgroundColor: getLevelColor() + '30' }]}>
                            <Text style={[styles.levelText, { color: getLevelColor() }]}>
                                {level}
                            </Text>
                        </View>
                    )}
                </View>

                {showScore && typeof score === 'number' && (
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreTrack}>
                            <LinearGradient
                                colors={getScoreGradient()}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.scoreBar, { width: `${Math.min(100, score)}%` }]}
                            />
                        </View>
                        <Text style={styles.scoreText}>{Math.round(score)}%</Text>
                    </View>
                )}

                {description && (
                    <Text style={styles.description}>{description}</Text>
                )}
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginVertical: 8,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    cardGradient: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        fontSize: 24,
        marginRight: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        flex: 1,
    },
    levelBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '600',
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    scoreTrack: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 12,
    },
    scoreBar: {
        height: '100%',
        borderRadius: 4,
    },
    scoreText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        minWidth: 45,
        textAlign: 'right',
    },
    description: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 20,
    },
});

export default ResultCard;
