import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TestCard = ({
    title,
    description,
    icon,
    duration,
    questionCount,
    onPress,
    completed = false,
    gradientColors = ['#667eea', '#764ba2'],
    style
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[styles.cardContainer, style]}
        >
            <LinearGradient
                colors={completed ? ['#4CAF50', '#8BC34A'] : gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                {/* Decorative circles */}
                <View style={styles.decorCircle1} />
                <View style={styles.decorCircle2} />

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>{icon}</Text>
                        {completed && (
                            <View style={styles.completedBadge}>
                                <Text style={styles.checkmark}>✓</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {description}
                        </Text>

                        <View style={styles.metaContainer}>
                            {duration && (
                                <View style={styles.metaItem}>
                                    <Text style={styles.metaIcon}>⏱️</Text>
                                    <Text style={styles.metaText}>{duration}</Text>
                                </View>
                            )}
                            {questionCount && (
                                <View style={styles.metaItem}>
                                    <Text style={styles.metaIcon}>📝</Text>
                                    <Text style={styles.metaText}>{questionCount}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.arrowContainer}>
                        <Text style={styles.arrow}>›</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    decorCircle1: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    decorCircle2: {
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        position: 'relative',
    },
    icon: {
        fontSize: 28,
    },
    completedBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    checkmark: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    description: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 18,
        marginBottom: 8,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    metaIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    metaText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
    },
    arrowContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '300',
        marginTop: -2,
    },
});

export default TestCard;
