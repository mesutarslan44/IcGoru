import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import { useTestContext } from '../../context/TestContext';
import { oceanQuestions, answerOptions } from '../../data/oceanQuestions';
import { calculateOceanScores } from '../../utils/oceanScoring';

const { width } = Dimensions.get('window');

const OceanTestScreen = ({ navigation }) => {
    const { oceanAnswers, updateOceanAnswer, completeOceanTest } = useTestContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Animations
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const currentQuestion = oceanQuestions[currentIndex];
    const totalQuestions = oceanQuestions.length;
    const isLastQuestion = currentIndex === totalQuestions - 1;

    useEffect(() => {
        // Load saved answer if exists
        if (oceanAnswers[currentIndex]) {
            setSelectedAnswer(oceanAnswers[currentIndex]);
        } else {
            setSelectedAnswer(null);
        }
    }, [currentIndex, oceanAnswers]);

    const animateTransition = (direction, callback) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: direction * 50,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            callback();
            slideAnim.setValue(direction * -50);
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const handleSelectAnswer = (value) => {
        // Animate selection
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();

        setSelectedAnswer(value);
        updateOceanAnswer(currentIndex, value);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        if (isLastQuestion) {
            // Calculate scores and complete
            const allAnswers = [...oceanAnswers];
            allAnswers[currentIndex] = selectedAnswer;
            const scores = calculateOceanScores(allAnswers);
            completeOceanTest(scores);
            navigation.replace('OceanResult');
        } else {
            animateTransition(1, () => {
                setCurrentIndex(prev => prev + 1);
            });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            animateTransition(-1, () => {
                setCurrentIndex(prev => prev - 1);
            });
        }
    };

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                {/* Progress */}
                <View style={styles.progressContainer}>
                    <ProgressBar
                        current={currentIndex + 1}
                        total={totalQuestions}
                        gradientColors={['#667eea', '#764ba2']}
                    />
                </View>

                {/* Question Card */}
                <Animated.View
                    style={[
                        styles.questionCard,
                        {
                            opacity: fadeAnim,
                            transform: [
                                { translateX: slideAnim },
                                { scale: scaleAnim }
                            ]
                        }
                    ]}
                >
                    <View style={styles.questionHeader}>
                        <Text style={styles.questionNumber}>Soru {currentIndex + 1}</Text>
                        <View style={styles.factorBadge}>
                            <Text style={styles.factorText}>{currentQuestion.factor}</Text>
                        </View>
                    </View>

                    <Text style={styles.questionText}>{currentQuestion.text}</Text>
                </Animated.View>

                {/* Answer Options */}
                <View style={styles.optionsContainer}>
                    {answerOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => handleSelectAnswer(option.value)}
                            activeOpacity={0.7}
                            style={[
                                styles.optionButton,
                                selectedAnswer === option.value && styles.optionSelected
                            ]}
                        >
                            <LinearGradient
                                colors={
                                    selectedAnswer === option.value
                                        ? ['#667eea', '#764ba2']
                                        : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']
                                }
                                style={styles.optionGradient}
                            >
                                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                                <Text style={[
                                    styles.optionLabel,
                                    selectedAnswer === option.value && styles.optionLabelSelected
                                ]}>
                                    {option.label}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Navigation */}
                <View style={styles.navigationContainer}>
                    <TouchableOpacity
                        onPress={handlePrevious}
                        disabled={currentIndex === 0}
                        style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
                    >
                        <Text style={styles.navButtonText}>← Önceki</Text>
                    </TouchableOpacity>

                    <Button
                        title={isLastQuestion ? "Tamamla ✓" : "Sonraki →"}
                        onPress={handleNext}
                        disabled={selectedAnswer === null}
                        gradientColors={isLastQuestion ? ['#4CAF50', '#8BC34A'] : ['#667eea', '#764ba2']}
                        size="medium"
                        style={{ minWidth: 140 }}
                    />
                </View>

                {/* Quick Exit */}
                <TouchableOpacity
                    style={styles.exitButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.exitText}>Teste Ara Ver</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 20,
    },
    progressContainer: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    questionCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    questionNumber: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '600',
    },
    factorBadge: {
        backgroundColor: 'rgba(102, 126, 234, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    factorText: {
        fontSize: 14,
        color: '#667eea',
        fontWeight: '700',
    },
    questionText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
        lineHeight: 30,
        textAlign: 'center',
    },
    optionsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    optionButton: {
        marginVertical: 6,
        borderRadius: 16,
        overflow: 'hidden',
    },
    optionSelected: {
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    optionGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
    },
    optionEmoji: {
        fontSize: 24,
        marginRight: 14,
    },
    optionLabel: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
        flex: 1,
    },
    optionLabelSelected: {
        color: '#fff',
        fontWeight: '700',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    navButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    navButtonDisabled: {
        opacity: 0.3,
    },
    navButtonText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    exitButton: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    exitText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
    },
});

export default OceanTestScreen;
