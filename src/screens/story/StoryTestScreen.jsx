import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Animated,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    Image,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import { useTestContext } from '../../context/TestContext';
import { storyCards } from '../../data/storyData';
import { analyzeStory, calculateStoryScores } from '../../utils/storyScoring';

const { width } = Dimensions.get('window');

const StoryTestScreen = ({ navigation }) => {
    const { storyAnswers, updateStoryAnswer, completeStoryTest } = useTestContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [storyText, setStoryText] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const inputRef = useRef(null);

    const currentCard = storyCards[currentIndex];
    const totalCards = storyCards.length;
    const isLastCard = currentIndex === totalCards - 1;
    const minWords = 20;

    useEffect(() => {
        if (storyAnswers[currentIndex]) {
            setStoryText(storyAnswers[currentIndex]);
            countWords(storyAnswers[currentIndex]);
        } else {
            setStoryText('');
            setWordCount(0);
        }
    }, [currentIndex]);

    const countWords = (text) => {
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        setWordCount(words.length);
        return words.length;
    };

    const handleTextChange = (text) => {
        setStoryText(text);
        countWords(text);
    };

    const animateTransition = (callback) => {
        Keyboard.dismiss();
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            callback();
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleNext = () => {
        if (wordCount < minWords) return;

        updateStoryAnswer(currentIndex, storyText);

        if (isLastCard) {
            // Analyze all stories and calculate scores
            const allStories = [...storyAnswers];
            allStories[currentIndex] = storyText;

            const analyses = allStories.map((story, idx) => {
                if (!story) return null;
                return analyzeStory(story, storyCards[idx].analysisKeys);
            }).filter(Boolean);

            const scores = calculateStoryScores(analyses);
            completeStoryTest(scores);
            navigation.replace('StoryResult');
        } else {
            animateTransition(() => {
                setCurrentIndex(prev => prev + 1);
            });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            updateStoryAnswer(currentIndex, storyText);
            animateTransition(() => {
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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    {/* Progress */}
                    <View style={styles.progressContainer}>
                        <ProgressBar
                            current={currentIndex + 1}
                            total={totalCards}
                            gradientColors={['#f093fb', '#f5576c']}
                        />
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Image Card */}
                        <Animated.View
                            style={[
                                styles.imageContainer,
                                { opacity: fadeAnim }
                            ]}
                        >
                            <View style={styles.imageFrame}>
                                {currentCard.image ? (
                                    <Image
                                        source={currentCard.image}
                                        style={styles.storyImage}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View style={styles.placeholderImage}>
                                        <Text style={styles.placeholderEmoji}>{currentCard.placeholder}</Text>
                                        <Text style={styles.cardTitle}>{currentCard.title}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.imageTitle}>{currentCard.title}</Text>
                        </Animated.View>

                        {/* Prompt */}
                        <Animated.View style={[styles.promptContainer, { opacity: fadeAnim }]}>
                            <Text style={styles.promptText}>{currentCard.prompt}</Text>
                        </Animated.View>

                        {/* Story Input */}
                        <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
                            <TextInput
                                ref={inputRef}
                                style={styles.textInput}
                                placeholder="Hikayenizi buraya yazın..."
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                multiline
                                value={storyText}
                                onChangeText={handleTextChange}
                                textAlignVertical="top"
                            />

                            <View style={styles.wordCountContainer}>
                                <Text style={[
                                    styles.wordCountText,
                                    wordCount >= minWords && styles.wordCountValid
                                ]}>
                                    {wordCount} / {minWords} kelime
                                </Text>
                                {wordCount < minWords && (
                                    <Text style={styles.wordCountHint}>
                                        (en az {minWords} kelime gerekli)
                                    </Text>
                                )}
                            </View>
                        </Animated.View>

                        {/* Story Hints */}
                        <View style={styles.hintsContainer}>
                            <Text style={styles.hintsTitle}>💡 İpuçları:</Text>
                            <Text style={styles.hintsText}>
                                {currentCard.hints?.map((hint, i) => `• ${hint}`).join('\n') || '• Bu görselde ne görüyorsunuz?\n• Karakterler ne hissediyor?\n• Sonra ne olacak?'}
                            </Text>
                        </View>
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

                        <TouchableOpacity
                            onPress={handleNext}
                            disabled={wordCount < minWords}
                            style={[
                                styles.nextButton,
                                wordCount < minWords && styles.nextButtonDisabled,
                                isLastCard && styles.completeButton
                            ]}
                        >
                            <Text style={styles.nextButtonText}>
                                {isLastCard ? "Tamamla ✓" : "Sonraki →"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
    keyboardView: {
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    imageFrame: {
        width: width - 100,
        height: (width - 100) * 0.8,
        backgroundColor: '#fff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        overflow: 'hidden',
    },
    storyImage: {
        width: '100%',
        height: '100%',
    },
    imageTitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10,
        fontWeight: '600',
    },
    placeholderImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    placeholderEmoji: {
        fontSize: 60,
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    promptContainer: {
        backgroundColor: 'rgba(240, 147, 251, 0.15)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(240, 147, 251, 0.3)',
    },
    promptText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 24,
    },
    inputContainer: {
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 16,
        minHeight: 150,
        color: '#fff',
        fontSize: 16,
        lineHeight: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    wordCountContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8,
        paddingRight: 4,
    },
    wordCountText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '600',
    },
    wordCountValid: {
        color: '#4CAF50',
    },
    wordCountHint: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        marginLeft: 8,
    },
    hintsContainer: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
    },
    hintsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    hintsText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 20,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    navButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    navButtonDisabled: {
        opacity: 0.3,
    },
    navButtonText: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    nextButton: {
        backgroundColor: '#f093fb',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        minWidth: 130,
        alignItems: 'center',
    },
    nextButtonDisabled: {
        opacity: 0.4,
    },
    completeButton: {
        backgroundColor: '#4CAF50',
    },
    nextButtonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '700',
    },
});

export default StoryTestScreen;
