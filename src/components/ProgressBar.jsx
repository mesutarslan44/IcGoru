import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProgressBar = ({
    current,
    total,
    showPercentage = true,
    showCount = true,
    height = 8,
    gradientColors = ['#667eea', '#764ba2'],
    backgroundColor = 'rgba(255,255,255,0.2)',
    animated = true,
    style
}) => {
    const progress = total > 0 ? (current / total) * 100 : 0;
    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (animated) {
            Animated.spring(animatedWidth, {
                toValue: progress,
                friction: 8,
                tension: 40,
                useNativeDriver: false,
            }).start();
        } else {
            animatedWidth.setValue(progress);
        }
    }, [progress, animated]);

    const widthInterpolation = animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <View style={[styles.container, style]}>
            {(showPercentage || showCount) && (
                <View style={styles.labelContainer}>
                    {showCount && (
                        <Text style={styles.countText}>
                            {current} / {total}
                        </Text>
                    )}
                    {showPercentage && (
                        <Text style={styles.percentText}>
                            {Math.round(progress)}%
                        </Text>
                    )}
                </View>
            )}

            <View style={[styles.trackContainer, { height, backgroundColor }]}>
                <Animated.View style={[styles.progressContainer, { width: widthInterpolation }]}>
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progress, { height }]}
                    />
                </Animated.View>

                {/* Milestone markers */}
                {[25, 50, 75].map((milestone) => (
                    <View
                        key={milestone}
                        style={[
                            styles.milestone,
                            { left: `${milestone}%` },
                            progress >= milestone && styles.milestoneActive
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    countText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    percentText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
    },
    trackContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    progressContainer: {
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        flex: 1,
        borderRadius: 10,
    },
    milestone: {
        position: 'absolute',
        top: -2,
        width: 2,
        height: '150%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        transform: [{ translateX: -1 }],
    },
    milestoneActive: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
});

export default ProgressBar;
