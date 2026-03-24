import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import { useTestContext } from '../../context/TestContext';
import { inkblotCards } from '../../data/inkblotData';
import { calculateInkblotScores } from '../../utils/inkblotScoring';

const { width, height } = Dimensions.get('window');
const COUNTDOWN_DURATION = 6; // seconds

const InkblotTestScreen = ({ navigation }) => {
    const { inkblotAnswers, updateInkblotAnswer, completeInkblotTest } = useTestContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [customAnswer, setCustomAnswer] = useState('');
    const [seeNothing, setSeeNothing] = useState(false);
    const [imageRotation, setImageRotation] = useState(0);

    // Countdown state
    const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
    const [showOptions, setShowOptions] = useState(false);
    const [optionsRevealed, setOptionsRevealed] = useState([]);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const cardScale = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const countdownAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const optionAnims = useRef(inkblotCards[0].options.map(() => new Animated.Value(0))).current;

    const currentCard = inkblotCards[currentIndex];
    const totalCards = inkblotCards.length;
    const isLastCard = currentIndex === totalCards - 1;

    // Countdown effect
    useEffect(() => {
        setCountdown(COUNTDOWN_DURATION);
        setShowOptions(false);
        setOptionsRevealed([]);

        // Reset option animations
        optionAnims.forEach(anim => anim.setValue(0));

        // Pulse animation for countdown
        const pulseLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
        pulseLoop.start();

        // Countdown timer
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    pulseLoop.stop();
                    pulseAnim.setValue(1);
                    setShowOptions(true);
                    revealOptionsSequentially();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            pulseLoop.stop();
        };
    }, [currentIndex]);

    // Load previous answer
    useEffect(() => {
        if (inkblotAnswers[currentIndex]) {
            const prev = inkblotAnswers[currentIndex];
            setSelectedOptions(prev.options || []);
            setCustomAnswer(prev.customAnswer || '');
            setSeeNothing(prev.seeNothing || false);
            setImageRotation(prev.rotation || 0);
        } else {
            setSelectedOptions([]);
            setCustomAnswer('');
            setSeeNothing(false);
            setImageRotation(0);
        }
        rotateAnim.setValue(0);
    }, [currentIndex]);

    const revealOptionsSequentially = () => {
        const options = currentCard.options;
        options.forEach((_, index) => {
            setTimeout(() => {
                setOptionsRevealed(prev => [...prev, index]);
                Animated.spring(optionAnims[index], {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }).start();
            }, index * 150); // 150ms delay between each option
        });
    };

    const animateTransition = (direction, callback) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(cardScale, {
                toValue: 0.9,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            callback();
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(cardScale, {
                    toValue: 1,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const toggleOption = (option) => {
        if (seeNothing) {
            setSeeNothing(false);
        }

        const isSelected = selectedOptions.some(o => o.id === option.id);
        if (isSelected) {
            setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const toggleSeeNothing = () => {
        setSeeNothing(!seeNothing);
        if (!seeNothing) {
            setSelectedOptions([]);
        }
    };

    const rotateImage = () => {
        const newRotation = (imageRotation + 90) % 360;
        setImageRotation(newRotation);

        Animated.spring(rotateAnim, {
            toValue: newRotation,
            friction: 8,
            useNativeDriver: true,
        }).start();
    };

    const getCurrentAnswer = () => ({
        options: selectedOptions,
        customAnswer: customAnswer.trim(),
        seeNothing: seeNothing,
        rotation: imageRotation,
        cardId: currentCard.id
    });

    const canProceed = () => {
        return showOptions && (seeNothing || selectedOptions.length > 0 || customAnswer.trim().length > 0);
    };

    const handleNext = () => {
        if (!canProceed()) return;

        const answer = getCurrentAnswer();
        updateInkblotAnswer(currentIndex, answer);

        if (isLastCard) {
            const allAnswers = [...inkblotAnswers];
            allAnswers[currentIndex] = answer;
            const scores = calculateInkblotScores(allAnswers);
            completeInkblotTest(scores);
            navigation.replace('InkblotResult');
        } else {
            animateTransition(1, () => {
                setCurrentIndex(prev => prev + 1);
            });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const answer = getCurrentAnswer();
            updateInkblotAnswer(currentIndex, answer);
            animateTransition(-1, () => {
                setCurrentIndex(prev => prev - 1);
            });
        }
    };

    const spin = rotateAnim.interpolate({
        inputRange: [0, 90, 180, 270, 360],
        outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
    });

    const countdownProgress = (COUNTDOWN_DURATION - countdown) / COUNTDOWN_DURATION;

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
                        total={totalCards}
                        gradientColors={['#11998e', '#38ef7d']}
                    />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Inkblot Image */}
                    <Animated.View
                        style={[
                            styles.imageContainer,
                            {
                                opacity: fadeAnim,
                                transform: [{ scale: cardScale }]
                            }
                        ]}
                    >
                        <Animated.View
                            style={[
                                styles.imageFrame,
                                { transform: [{ rotate: spin }] }
                            ]}
                        >
                            {currentCard.image ? (
                                <Image
                                    source={currentCard.image}
                                    style={styles.inkblotImage}
                                    resizeMode="contain"
                                />
                            ) : (
                                <View style={styles.placeholderImage}>
                                    <Text style={styles.placeholderEmoji}>{currentCard.placeholder}</Text>
                                </View>
                            )}
                        </Animated.View>

                        {/* Rotate Button */}
                        <TouchableOpacity
                            style={styles.rotateButton}
                            onPress={rotateImage}
                        >
                            <Text style={styles.rotateIcon}>🔄</Text>
                            <Text style={styles.rotateText}>Çevir</Text>
                        </TouchableOpacity>

                        <Text style={styles.cardNumber}>Kart {currentCard.id} / {totalCards}</Text>
                    </Animated.View>

                    {/* Countdown or Options */}
                    {!showOptions ? (
                        <View style={styles.countdownContainer}>
                            <Text style={styles.countdownInstruction}>
                                👁️ Görseli inceleyin...
                            </Text>
                            <Text style={styles.countdownSubtext}>
                                Ne görüyorsunuz? Düşünün...
                            </Text>

                            {/* Animated Countdown Circle */}
                            <Animated.View
                                style={[
                                    styles.countdownCircle,
                                    { transform: [{ scale: pulseAnim }] }
                                ]}
                            >
                                <Text style={styles.countdownNumber}>{countdown}</Text>
                            </Animated.View>

                            {/* Progress Bar */}
                            <View style={styles.countdownBar}>
                                <View
                                    style={[
                                        styles.countdownProgress,
                                        { width: `${countdownProgress * 100}%` }
                                    ]}
                                />
                            </View>

                            <Text style={styles.countdownHint}>
                                Şıklar {countdown} saniye sonra görünecek
                            </Text>
                        </View>
                    ) : (
                        <>
                            {/* Instructions */}
                            <View style={styles.instructionCard}>
                                <Text style={styles.instructionTitle}>👆 Bu görselde ne görüyorsunuz?</Text>
                                <Text style={styles.instructionText}>
                                    • Birden fazla şey seçebilirsiniz{'\n'}
                                    • Hiçbir şey görmüyorsanız bunu da belirtebilirsiniz
                                </Text>
                            </View>

                            {/* See Nothing Option */}
                            <Animated.View
                                style={{
                                    opacity: optionAnims[0],
                                    transform: [{
                                        translateY: optionAnims[0].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0]
                                        })
                                    }]
                                }}
                            >
                                <TouchableOpacity
                                    onPress={toggleSeeNothing}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.seeNothingButton,
                                        seeNothing && styles.seeNothingActive
                                    ]}
                                >
                                    <Text style={styles.seeNothingIcon}>{seeNothing ? '✓' : '○'}</Text>
                                    <Text style={[
                                        styles.seeNothingText,
                                        seeNothing && styles.seeNothingTextActive
                                    ]}>
                                        Bu görselde belirgin bir şey göremiyorum
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>

                            {/* Options - Multi Select with Animation */}
                            {!seeNothing && (
                                <>
                                    <Text style={styles.optionsLabel}>Seçenekler:</Text>
                                    <View style={styles.optionsGrid}>
                                        {currentCard.options.map((option, index) => {
                                            const isSelected = selectedOptions.some(o => o.id === option.id);
                                            return (
                                                <Animated.View
                                                    key={option.id}
                                                    style={{
                                                        width: '48%',
                                                        opacity: optionAnims[index] || new Animated.Value(1),
                                                        transform: [{
                                                            translateY: (optionAnims[index] || new Animated.Value(1)).interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: [30, 0]
                                                            })
                                                        }]
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => toggleOption(option)}
                                                        activeOpacity={0.7}
                                                        style={[
                                                            styles.optionButton,
                                                            isSelected && styles.optionSelected
                                                        ]}
                                                    >
                                                        <Text style={styles.optionCheck}>
                                                            {isSelected ? '✓' : '○'}
                                                        </Text>
                                                        <Text style={[
                                                            styles.optionText,
                                                            isSelected && styles.optionTextSelected
                                                        ]}>
                                                            {option.text}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </Animated.View>
                                            );
                                        })}
                                    </View>

                                    {/* Custom Answer */}
                                    <View style={styles.customAnswerContainer}>
                                        <Text style={styles.customLabel}>✍️ Farklı bir şey mi görüyorsunuz?</Text>
                                        <TextInput
                                            style={styles.customInput}
                                            placeholder="Kendi cevabınızı yazın..."
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            value={customAnswer}
                                            onChangeText={setCustomAnswer}
                                            multiline
                                        />
                                    </View>
                                </>
                            )}

                            {/* Selection Summary */}
                            <View style={styles.summaryContainer}>
                                <Text style={styles.summaryText}>
                                    {seeNothing
                                        ? '📝 Yanıt: Belirgin bir şey göremiyorum'
                                        : selectedOptions.length > 0 || customAnswer.trim()
                                            ? `📝 ${selectedOptions.length} seçim${customAnswer.trim() ? ' + özel cevap' : ''}`
                                            : '📝 Henüz seçim yapılmadı'}
                                </Text>
                            </View>
                        </>
                    )}
                </ScrollView>

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
                        title={isLastCard ? "Tamamla ✓" : "Sonraki →"}
                        onPress={handleNext}
                        disabled={!canProceed()}
                        gradientColors={isLastCard ? ['#4CAF50', '#8BC34A'] : ['#11998e', '#38ef7d']}
                        size="medium"
                        style={{ minWidth: 140, opacity: canProceed() ? 1 : 0.4 }}
                    />
                </View>
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
        paddingBottom: 12,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    imageFrame: {
        width: width - 100,
        height: (width - 100) * 0.75,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
        overflow: 'hidden',
    },
    inkblotImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f8f8',
    },
    placeholderImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    placeholderEmoji: {
        fontSize: 80,
    },
    rotateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 12,
    },
    rotateIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    rotateText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    cardNumber: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
    },
    // Countdown Styles
    countdownContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    countdownInstruction: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    countdownSubtext: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 24,
    },
    countdownCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(17, 153, 142, 0.3)',
        borderWidth: 4,
        borderColor: '#11998e',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    countdownNumber: {
        fontSize: 48,
        fontWeight: '800',
        color: '#11998e',
    },
    countdownBar: {
        width: '80%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 16,
    },
    countdownProgress: {
        height: '100%',
        backgroundColor: '#11998e',
        borderRadius: 3,
    },
    countdownHint: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
    },
    // Instructions & Options Styles
    instructionCard: {
        backgroundColor: 'rgba(17, 153, 142, 0.15)',
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(17, 153, 142, 0.3)',
    },
    instructionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    instructionText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    seeNothingButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    seeNothingActive: {
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
        borderColor: '#FF9800',
    },
    seeNothingIcon: {
        fontSize: 20,
        color: '#FF9800',
        marginRight: 12,
    },
    seeNothingText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        flex: 1,
    },
    seeNothingTextActive: {
        color: '#FF9800',
        fontWeight: '600',
    },
    optionsLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    optionSelected: {
        backgroundColor: 'rgba(17, 153, 142, 0.25)',
        borderColor: '#11998e',
    },
    optionCheck: {
        fontSize: 16,
        color: '#11998e',
        marginRight: 8,
        fontWeight: '700',
    },
    optionText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        flex: 1,
    },
    optionTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    customAnswerContainer: {
        marginTop: 16,
    },
    customLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 8,
    },
    customInput: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 14,
        minHeight: 60,
        color: '#fff',
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    summaryContainer: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        padding: 12,
        marginTop: 16,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.6)',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
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
});

export default InkblotTestScreen;
