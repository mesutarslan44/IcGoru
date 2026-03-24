import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestContext = createContext();

export const useTestContext = () => {
    const context = useContext(TestContext);
    if (!context) {
        throw new Error('useTestContext must be used within a TestProvider');
    }
    return context;
};

export const TestProvider = ({ children }) => {
    // Test sonuçları
    const [oceanAnswers, setOceanAnswers] = useState([]);
    const [oceanScores, setOceanScores] = useState(null);
    const [oceanCompleted, setOceanCompleted] = useState(false);

    const [inkblotAnswers, setInkblotAnswers] = useState([]);
    const [inkblotScores, setInkblotScores] = useState(null);
    const [inkblotCompleted, setInkblotCompleted] = useState(false);

    const [storyAnswers, setStoryAnswers] = useState([]);
    const [storyScores, setStoryScores] = useState(null);
    const [storyCompleted, setStoryCompleted] = useState(false);

    const [cognitiveScores, setCognitiveScores] = useState(null);
    const [cognitiveCompleted, setCognitiveCompleted] = useState(false);

    const [combinedAnalysis, setCombinedAnalysis] = useState(null);

    // Sonuç geçmişi
    const [resultHistory, setResultHistory] = useState([]);

    // Uygulama durumu
    const [isLoading, setIsLoading] = useState(true);
    const [hasCompletedAllTests, setHasCompletedAllTests] = useState(false);

    // Verileri yükle
    useEffect(() => {
        loadSavedData();
    }, []);

    // Tüm testlerin tamamlanıp tamamlanmadığını kontrol et
    useEffect(() => {
        setHasCompletedAllTests(oceanCompleted && inkblotCompleted && storyCompleted && cognitiveCompleted);
    }, [oceanCompleted, inkblotCompleted, storyCompleted, cognitiveCompleted]);

    const loadSavedData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('icgoru_data');
            if (savedData) {
                const data = JSON.parse(savedData);

                if (data.oceanAnswers) setOceanAnswers(data.oceanAnswers);
                if (data.oceanScores) setOceanScores(data.oceanScores);
                if (data.oceanCompleted) setOceanCompleted(data.oceanCompleted);

                if (data.inkblotAnswers) setInkblotAnswers(data.inkblotAnswers);
                if (data.inkblotScores) setInkblotScores(data.inkblotScores);
                if (data.inkblotCompleted) setInkblotCompleted(data.inkblotCompleted);

                if (data.storyAnswers) setStoryAnswers(data.storyAnswers);
                if (data.storyScores) setStoryScores(data.storyScores);
                if (data.storyCompleted) setStoryCompleted(data.storyCompleted);

                if (data.cognitiveScores) setCognitiveScores(data.cognitiveScores);
                if (data.cognitiveCompleted) setCognitiveCompleted(data.cognitiveCompleted);

                if (data.combinedAnalysis) setCombinedAnalysis(data.combinedAnalysis);
                if (data.resultHistory) setResultHistory(data.resultHistory);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveData = async () => {
        try {
            const dataToSave = {
                oceanAnswers,
                oceanScores,
                oceanCompleted,
                inkblotAnswers,
                inkblotScores,
                inkblotCompleted,
                storyAnswers,
                storyScores,
                storyCompleted,
                cognitiveScores,
                cognitiveCompleted,
                combinedAnalysis,
                resultHistory
            };
            await AsyncStorage.setItem('icgoru_data', JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            saveData();
        }
    }, [oceanScores, inkblotScores, storyScores, cognitiveScores, combinedAnalysis, resultHistory, isLoading]);

    // OCEAN test fonksiyonları
    const updateOceanAnswer = (questionIndex, answer) => {
        setOceanAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[questionIndex] = answer;
            return newAnswers;
        });
    };

    const completeOceanTest = (scores) => {
        setOceanScores(scores);
        setOceanCompleted(true);
    };

    const resetOceanTest = () => {
        setOceanAnswers([]);
        setOceanScores(null);
        setOceanCompleted(false);
    };

    // Inkblot test fonksiyonları
    const updateInkblotAnswer = (cardIndex, answer) => {
        setInkblotAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[cardIndex] = answer;
            return newAnswers;
        });
    };

    const completeInkblotTest = (scores) => {
        setInkblotScores(scores);
        setInkblotCompleted(true);
    };

    const resetInkblotTest = () => {
        setInkblotAnswers([]);
        setInkblotScores(null);
        setInkblotCompleted(false);
    };

    // Story test fonksiyonları
    const updateStoryAnswer = (cardIndex, story) => {
        setStoryAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[cardIndex] = story;
            return newAnswers;
        });
    };

    const completeStoryTest = (scores) => {
        setStoryScores(scores);
        setStoryCompleted(true);
    };

    const resetStoryTest = () => {
        setStoryAnswers([]);
        setStoryScores(null);
        setStoryCompleted(false);
    };

    // Cognitive test fonksiyonları
    const completeCognitiveTest = (scores) => {
        setCognitiveScores(scores);
        setCognitiveCompleted(true);
    };

    const resetCognitiveTest = () => {
        setCognitiveScores(null);
        setCognitiveCompleted(false);
    };

    // Tüm testleri sıfırla
    const resetAllTests = async () => {
        setOceanAnswers([]);
        setOceanScores(null);
        setOceanCompleted(false);
        setInkblotAnswers([]);
        setInkblotScores(null);
        setInkblotCompleted(false);
        setStoryAnswers([]);
        setStoryScores(null);
        setStoryCompleted(false);
        setCognitiveScores(null);
        setCognitiveCompleted(false);
        setCombinedAnalysis(null);

        try {
            await AsyncStorage.removeItem('icgoru_data');
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    };

    // Test tamamlanma durumları
    const getCompletionStatus = () => ({
        ocean: oceanCompleted,
        inkblot: inkblotCompleted,
        story: storyCompleted,
        cognitive: cognitiveCompleted,
        all: hasCompletedAllTests,
        count: [oceanCompleted, inkblotCompleted, storyCompleted, cognitiveCompleted].filter(Boolean).length
    });

    // Sonuç kaydetme fonksiyonları
    const saveResultToHistory = (testType, testName, scores, profile, note = '') => {
        const newResult = {
            id: Date.now().toString(),
            testType,
            testName,
            scores,
            profile,
            note,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        setResultHistory(prev => [newResult, ...prev]);
        return newResult.id;
    };

    const deleteResultFromHistory = (resultId) => {
        setResultHistory(prev => prev.filter(r => r.id !== resultId));
    };

    const getResultsByTestType = (testType) => {
        return resultHistory.filter(r => r.testType === testType);
    };

    const getLatestResult = (testType) => {
        const results = getResultsByTestType(testType);
        return results.length > 0 ? results[0] : null;
    };

    const clearAllHistory = async () => {
        setResultHistory([]);
    };

    const value = {
        // OCEAN
        oceanAnswers,
        oceanScores,
        oceanCompleted,
        updateOceanAnswer,
        completeOceanTest,
        resetOceanTest,

        // Inkblot
        inkblotAnswers,
        inkblotScores,
        inkblotCompleted,
        updateInkblotAnswer,
        completeInkblotTest,
        resetInkblotTest,

        // Story
        storyAnswers,
        storyScores,
        storyCompleted,
        updateStoryAnswer,
        completeStoryTest,
        resetStoryTest,

        // Cognitive
        cognitiveScores,
        cognitiveCompleted,
        completeCognitiveTest,
        resetCognitiveTest,

        // Combined
        combinedAnalysis,
        setCombinedAnalysis,

        // General
        isLoading,
        hasCompletedAllTests,
        resetAllTests,
        getCompletionStatus,

        // Result History
        resultHistory,
        saveResultToHistory,
        deleteResultFromHistory,
        getResultsByTestType,
        getLatestResult,
        clearAllHistory
    };

    return (
        <TestContext.Provider value={value}>
            {children}
        </TestContext.Provider>
    );
};

export default TestContext;
