import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar,
    TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';
import {
    cognitiveTestInfo,
    attentionQuestions,
    memoryQuestions,
    concentrationQuestions,
    reasoningQuestions,
    speedQuestions
} from '../../data/cognitiveData';
import { calculateCognitiveScores, generateCognitiveProfile } from '../../utils/cognitiveScoring';
import { useTestContext } from '../../context/TestContext';

const { width } = Dimensions.get('window');

const allQuestions = {
    attention: attentionQuestions.slice(0, 5),
    memory: memoryQuestions.slice(0, 4),
    concentration: concentrationQuestions.slice(0, 4),
    reasoning: reasoningQuestions.slice(0, 5),
    speed: speedQuestions.slice(0, 5)
};

const subtestOrder = ['attention', 'memory', 'concentration', 'reasoning', 'speed'];

const CognitiveTestScreen = ({ navigation }) => {
    const { completeCognitiveTest } = useTestContext();

    const [currentSubtest, setCurrentSubtest] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const [showingMemory, setShowingMemory] = useState(false);
    const [memoryInput, setMemoryInput] = useState('');
    const [startTime, setStartTime] = useState(Date.now());

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(new Animated.Value(1)).current;

    const currentSubtestKey = subtestOrder[currentSubtest];
    const currentSubtestInfo = cognitiveTestInfo.subtests.find(s => s.id === currentSubtestKey);
    const questions = allQuestions[currentSubtestKey] || [];
    const question = questions[currentQuestion];
    const totalQuestions = questions.length;

    // Timer effect
    useEffect(() => {
        if (!question) return;

        const timeLimit = question.timeLimit || 10;
        setTimeLeft(timeLimit);
        setStartTime(Date.now());

        // Memory show phase
        if (question.type === 'number_sequence' || question.type === 'image_recall') {
            setShowingMemory(true);
            setMemoryInput('');
            const showTime = question.showTime || 5;

            Animated.timing(progressAnim, {
                toValue: 0,
                duration: showTime * 1000,
                useNativeDriver: false,
            }).start();

            const timer = setTimeout(() => {
                setShowingMemory(false);
                progressAnim.setValue(1);
            }, showTime * 1000);

            return () => clearTimeout(timer);
        }

        // Regular timer
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentSubtest, currentQuestion]);

    const handleTimeout = () => {
        recordAnswer(null, true);
        goToNext();
    };

    const recordAnswer = (answer, timeout = false) => {
        const responseTime = Date.now() - startTime;
        const isCorrect = checkAnswer(answer);

        setResults(prev => {
            const subtestResults = prev[currentSubtestKey] || {
                correct: 0,
                total: 0,
                errors: 0,
                recalled: 0,
                times: []
            };

            return {
                ...prev,
                [currentSubtestKey]: {
                    ...subtestResults,
                    correct: subtestResults.correct + (isCorrect ? 1 : 0),
                    total: subtestResults.total + 1,
                    errors: subtestResults.errors + (timeout || !isCorrect ? 1 : 0),
                    recalled: subtestResults.recalled + (isCorrect ? 1 : 0),
                    times: [...subtestResults.times, responseTime],
                    avgTime: [...subtestResults.times, responseTime].reduce((a, b) => a + b, 0) /
                        ([...subtestResults.times, responseTime].length)
                }
            };
        });
    };

    const checkAnswer = (answer) => {
        if (!question || answer === null) return false;

        switch (question.type) {
            case 'find_different':
            case 'sequence_error':
                return answer === question.correctIndex;
            case 'count':
            case 'number_pattern':
            case 'analogy':
            case 'logic_puzzle':
            case 'shape_pattern':
            case 'simple_math':
            case 'stroop':
                return answer === question.correctIndex;
            case 'number_sequence':
                const inputNumbers = memoryInput.split('').map(Number).filter(n => !isNaN(n));
                if (question.reverse) {
                    return JSON.stringify(inputNumbers) === JSON.stringify([...question.sequence].reverse());
                }
                return JSON.stringify(inputNumbers) === JSON.stringify(question.sequence);
            case 'comparison':
                return answer === question.correctAnswer;
            default:
                return answer === question.correctIndex;
        }
    };

    const handleAnswer = (answerIndex) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answerIndex);
        recordAnswer(answerIndex);

        setTimeout(() => {
            setSelectedAnswer(null);
            goToNext();
        }, 500);
    };

    const handleMemorySubmit = () => {
        recordAnswer(memoryInput);
        setMemoryInput('');
        goToNext();
    };

    const goToNext = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            if (currentQuestion < totalQuestions - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else if (currentSubtest < subtestOrder.length - 1) {
                setCurrentSubtest(prev => prev + 1);
                setCurrentQuestion(0);
            } else {
                // Test tamamlandı
                finishTest();
                return;
            }

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        });
    };

    const finishTest = () => {
        const scores = calculateCognitiveScores(results);
        completeCognitiveTest(scores);
        navigation.replace('CognitiveResult');
    };

    const renderQuestion = () => {
        if (!question) return null;

        switch (question.type) {
            case 'find_different':
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        <View style={styles.itemsGrid}>
                            {question.items.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.itemButton,
                                        selectedAnswer === index && styles.itemSelected
                                    ]}
                                    onPress={() => handleAnswer(index)}
                                >
                                    <Text style={styles.itemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case 'count':
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        <View style={styles.countTextBox}>
                            <Text style={styles.countText}>{question.text}</Text>
                        </View>
                        <View style={styles.optionsRow}>
                            {question.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedAnswer === index && styles.optionSelected
                                    ]}
                                    onPress={() => handleAnswer(index)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case 'number_sequence':
                if (showingMemory) {
                    return (
                        <View style={styles.questionContainer}>
                            <Text style={styles.instruction}>Sayıları ezberleyin</Text>
                            <View style={styles.memoryDisplay}>
                                {question.sequence.map((num, index) => (
                                    <Text key={index} style={styles.memoryNumber}>{num}</Text>
                                ))}
                            </View>
                            <Text style={styles.memoryHint}>Ezberleniyor...</Text>
                        </View>
                    );
                }
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>
                            {question.reverse ? 'TERSİNDEN yazın' : 'Sırayla yazın'}
                        </Text>
                        <TextInput
                            style={styles.memoryInput}
                            value={memoryInput}
                            onChangeText={setMemoryInput}
                            keyboardType="numeric"
                            placeholder="Sayıları girin..."
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            autoFocus
                        />
                        <Button
                            title="Gönder"
                            onPress={handleMemorySubmit}
                            gradientColors={['#9C27B0', '#E91E63']}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                );

            case 'image_recall':
                if (showingMemory) {
                    return (
                        <View style={styles.questionContainer}>
                            <Text style={styles.instruction}>🖼️ Resimleri ezberleyin</Text>
                            <View style={styles.imageGrid}>
                                {question.shownImages.map((img, index) => (
                                    <View key={index} style={styles.imageItem}>
                                        <Text style={styles.imageEmoji}>{img}</Text>
                                    </View>
                                ))}
                            </View>
                            <Text style={styles.memoryHint}>Ezberleniyor...</Text>
                        </View>
                    );
                }
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>Hangileri vardı? (Gördüklerinizi seçin)</Text>
                        <View style={styles.imageGrid}>
                            {question.allOptions.map((img, index) => {
                                const isSelected = memoryInput.includes(img);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.imageSelectItem,
                                            isSelected && styles.imageItemSelected
                                        ]}
                                        onPress={() => {
                                            if (isSelected) {
                                                setMemoryInput(memoryInput.replace(img, ''));
                                            } else {
                                                setMemoryInput(memoryInput + img);
                                            }
                                        }}
                                    >
                                        <Text style={styles.imageEmoji}>{img}</Text>
                                        {isSelected && <Text style={styles.checkMark}>✓</Text>}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <Button
                            title="Gönder"
                            onPress={handleMemorySubmit}
                            gradientColors={['#9C27B0', '#E91E63']}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                );

            case 'stroop':
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        <View style={styles.stroopBox}>
                            <Text style={[styles.stroopWord, { color: question.displayColor }]}>
                                {question.word}
                            </Text>
                        </View>
                        <View style={styles.optionsGrid}>
                            {question.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedAnswer === index && styles.optionSelected
                                    ]}
                                    onPress={() => handleAnswer(index)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case 'number_pattern':
            case 'analogy':
            case 'logic_puzzle':
            case 'shape_pattern':
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        {question.sequence && (
                            <View style={styles.sequenceBox}>
                                {question.sequence.map((item, index) => (
                                    <Text key={index} style={styles.sequenceItem}>{item}</Text>
                                ))}
                            </View>
                        )}
                        <View style={styles.optionsGrid}>
                            {question.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedAnswer === index && styles.optionSelected
                                    ]}
                                    onPress={() => handleAnswer(index)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case 'simple_math':
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        <View style={styles.mathBox}>
                            <Text style={styles.mathProblem}>{question.problem}</Text>
                        </View>
                        <View style={styles.optionsRow}>
                            {question.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedAnswer === index && styles.optionSelected
                                    ]}
                                    onPress={() => handleAnswer(index)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case 'comparison':
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        <View style={styles.comparisonRow}>
                            <TouchableOpacity
                                style={[
                                    styles.comparisonButton,
                                    selectedAnswer === 'A' && styles.optionSelected
                                ]}
                                onPress={() => handleAnswer('A')}
                            >
                                <Text style={styles.comparisonText}>{question.optionA}</Text>
                            </TouchableOpacity>
                            <Text style={styles.comparisonVs}>VS</Text>
                            <TouchableOpacity
                                style={[
                                    styles.comparisonButton,
                                    selectedAnswer === 'B' && styles.optionSelected
                                ]}
                                onPress={() => handleAnswer('B')}
                            >
                                <Text style={styles.comparisonText}>{question.optionB}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );

            default:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.instruction}>{question.instruction}</Text>
                        {question.options && (
                            <View style={styles.optionsGrid}>
                                {question.options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.optionButton,
                                            selectedAnswer === index && styles.optionSelected
                                        ]}
                                        onPress={() => handleAnswer(index)}
                                    >
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                );
        }
    };

    if (!question) {
        return (
            <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <Text style={styles.loading}>Yükleniyor...</Text>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={[styles.subtestBadge, { backgroundColor: currentSubtestInfo?.color + '30' }]}>
                        <Text style={styles.subtestIcon}>{currentSubtestInfo?.icon}</Text>
                        <Text style={[styles.subtestName, { color: currentSubtestInfo?.color }]}>
                            {currentSubtestInfo?.name}
                        </Text>
                    </View>
                    <View style={styles.progressInfo}>
                        <Text style={styles.progressText}>
                            {currentSubtest + 1}/{subtestOrder.length} Bölüm • Soru {currentQuestion + 1}/{totalQuestions}
                        </Text>
                    </View>
                </View>

                {/* Timer */}
                <View style={styles.timerContainer}>
                    <View style={[
                        styles.timerCircle,
                        timeLeft <= 3 && styles.timerDanger
                    ]}>
                        <Text style={[
                            styles.timerText,
                            timeLeft <= 3 && styles.timerTextDanger
                        ]}>
                            {timeLeft}
                        </Text>
                    </View>
                    <View style={styles.timerBar}>
                        <View
                            style={[
                                styles.timerProgress,
                                {
                                    width: `${(timeLeft / (question.timeLimit || 10)) * 100}%`,
                                    backgroundColor: timeLeft <= 3 ? '#FF5722' : currentSubtestInfo?.color
                                }
                            ]}
                        />
                    </View>
                </View>

                {/* Question */}
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    {renderQuestion()}
                </Animated.View>

                {/* Overall Progress */}
                <View style={styles.footer}>
                    <ProgressBar
                        current={(currentSubtest * 5) + currentQuestion + 1}
                        total={23} // Toplam soru sayısı
                        gradientColors={['#9C27B0', '#E91E63']}
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
    loading: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    subtestBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    subtestIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    subtestName: {
        fontSize: 14,
        fontWeight: '700',
    },
    progressInfo: {
        alignItems: 'flex-end',
    },
    progressText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    timerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        borderWidth: 3,
        borderColor: '#9C27B0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    timerDanger: {
        borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
    },
    timerText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#9C27B0',
    },
    timerTextDanger: {
        color: '#FF5722',
    },
    timerBar: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
    },
    timerProgress: {
        height: '100%',
        borderRadius: 2,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    questionContainer: {
        alignItems: 'center',
    },
    instruction: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 26,
    },
    itemsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
    },
    itemButton: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    itemSelected: {
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.3)',
    },
    itemText: {
        fontSize: 28,
    },
    countTextBox: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    countText: {
        fontSize: 24,
        color: '#fff',
        letterSpacing: 3,
        fontFamily: 'monospace',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    optionButton: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 2,
        borderColor: 'transparent',
        minWidth: 80,
        alignItems: 'center',
    },
    optionSelected: {
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.3)',
    },
    optionText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    memoryDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 20,
    },
    memoryNumber: {
        fontSize: 48,
        fontWeight: '800',
        color: '#fff',
    },
    memoryHint: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
    },
    memoryInput: {
        width: '80%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 16,
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 8,
        borderWidth: 2,
        borderColor: 'rgba(156, 39, 176, 0.5)',
    },
    stroopBox: {
        padding: 30,
        marginBottom: 24,
    },
    stroopWord: {
        fontSize: 48,
        fontWeight: '800',
    },
    sequenceBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 24,
    },
    sequenceItem: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '700',
    },
    mathBox: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
    },
    mathProblem: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '700',
    },
    comparisonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    comparisonButton: {
        flex: 1,
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    comparisonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    comparisonVs: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '700',
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 20,
    },
    imageItem: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSelectItem: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'transparent',
    },
    imageItemSelected: {
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.3)',
    },
    imageEmoji: {
        fontSize: 36,
    },
    checkMark: {
        position: 'absolute',
        top: 2,
        right: 2,
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '700',
    },
    footer: {
        paddingVertical: 16,
    },
});

export default CognitiveTestScreen;
