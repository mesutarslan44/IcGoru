// Hikaye Testi Puanlama Sistemi

import { sentimentWords, storyAnalysisWeights } from '../data/storyData';

export const analyzeStory = (text, cardAnalysisKeys) => {
    if (!text || text.trim().length === 0) {
        return {
            themes: {},
            sentiment: { positive: 0, negative: 0, neutral: 1 },
            length: 0,
            wordCount: 0
        };
    }

    const lowerText = text.toLowerCase();
    const results = {
        themes: {},
        sentiment: { positive: 0, negative: 0, neutral: 0 },
        length: text.length,
        wordCount: text.split(/\s+/).filter(w => w.length > 0).length
    };

    // Tema analizi
    if (cardAnalysisKeys) {
        Object.keys(cardAnalysisKeys).forEach(theme => {
            const keywords = cardAnalysisKeys[theme];
            let count = 0;
            keywords.forEach(keyword => {
                if (lowerText.includes(keyword.toLowerCase())) count++;
            });
            results.themes[theme] = count;
        });
    }

    // Duygu analizi
    sentimentWords.positive.forEach(word => {
        if (lowerText.includes(word.toLowerCase())) results.sentiment.positive++;
    });

    sentimentWords.negative.forEach(word => {
        if (lowerText.includes(word.toLowerCase())) results.sentiment.negative++;
    });

    // Net sentiment yoksa neutral
    if (results.sentiment.positive === 0 && results.sentiment.negative === 0) {
        results.sentiment.neutral = 1;
    }

    return results;
};

export const calculateStoryScores = (allStoryAnalyses) => {
    if (!allStoryAnalyses || allStoryAnalyses.length === 0) {
        return {
            achievement: 0,
            affiliation: 0,
            power: 0,
            autonomy: 0,
            emotionalTone: 'neutral',
            detailLevel: 'low'
        };
    }

    const aggregated = {
        achievement: 0,
        affiliation: 0,
        power: 0,
        autonomy: 0,
        positivity: 0,
        negativity: 0,
        storyLengthAvg: 0,
        detailLevel: 'medium'
    };

    let totalLength = 0;

    allStoryAnalyses.forEach(analysis => {
        if (!analysis || !analysis.themes) return;

        // Tema skorlarını topla
        if (analysis.themes.achievement) aggregated.achievement += analysis.themes.achievement;
        if (analysis.themes.intimacy || analysis.themes.family) {
            aggregated.affiliation += (analysis.themes.intimacy || 0) + (analysis.themes.family || 0);
        }
        if (analysis.themes.power || analysis.themes.conflict) {
            aggregated.power += (analysis.themes.power || 0) + (analysis.themes.conflict || 0);
        }
        if (analysis.themes.freedom || analysis.themes.escape) {
            aggregated.autonomy += (analysis.themes.freedom || 0) + (analysis.themes.escape || 0);
        }

        // Diğer temalar
        if (analysis.themes.harmony) aggregated.affiliation += analysis.themes.harmony;
        if (analysis.themes.journey) aggregated.autonomy += analysis.themes.journey;
        if (analysis.themes.hope) aggregated.achievement += analysis.themes.hope;
        if (analysis.themes.loneliness) aggregated.autonomy += analysis.themes.loneliness;

        // Duygu skorları
        aggregated.positivity += analysis.sentiment.positive;
        aggregated.negativity += analysis.sentiment.negative;

        totalLength += analysis.wordCount || 0;
    });

    // Ortalama hikaye uzunluğu
    aggregated.storyLengthAvg = Math.round(totalLength / allStoryAnalyses.length);

    // Detay seviyesi
    if (aggregated.storyLengthAvg > 100) aggregated.detailLevel = 'high';
    else if (aggregated.storyLengthAvg > 40) aggregated.detailLevel = 'medium';
    else aggregated.detailLevel = 'low';

    // Normalleştir (0-100)
    const maxScore = Math.max(allStoryAnalyses.length * 5, 1);
    return {
        achievement: Math.min(100, Math.round((aggregated.achievement / maxScore) * 100)),
        affiliation: Math.min(100, Math.round((aggregated.affiliation / maxScore) * 100)),
        power: Math.min(100, Math.round((aggregated.power / maxScore) * 100)),
        autonomy: Math.min(100, Math.round((aggregated.autonomy / maxScore) * 100)),
        emotionalTone: aggregated.positivity > aggregated.negativity ? 'positive' :
            aggregated.negativity > aggregated.positivity ? 'negative' : 'neutral',
        detailLevel: aggregated.detailLevel,
        averageWordCount: aggregated.storyLengthAvg
    };
};

export const interpretStoryScores = (scores) => {
    const interpretations = [];

    // Başarı motivasyonu
    if (scores.achievement >= 60) {
        interpretations.push({
            area: "Başarı Motivasyonu",
            level: "Yüksek",
            score: scores.achievement,
            color: "#FF9800",
            icon: "🏆",
            text: "Hedeflerinize ulaşmak ve kendinizi geliştirmek sizin için önemli."
        });
    } else if (scores.achievement >= 30) {
        interpretations.push({
            area: "Başarı Motivasyonu",
            level: "Orta",
            score: scores.achievement,
            color: "#FFC107",
            icon: "🎯",
            text: "Başarı sizin için önemli ama tek önceliğiniz değil."
        });
    }

    // İlişki odaklılık
    if (scores.affiliation >= 60) {
        interpretations.push({
            area: "İlişki Odaklılık",
            level: "Yüksek",
            score: scores.affiliation,
            color: "#E91E63",
            icon: "❤️",
            text: "İnsan ilişkileri ve sosyal bağlar hayatınızda merkezi bir yer tutuyor."
        });
    } else if (scores.affiliation >= 30) {
        interpretations.push({
            area: "İlişki Odaklılık",
            level: "Orta",
            score: scores.affiliation,
            color: "#F06292",
            icon: "🤝",
            text: "İlişkilerinize değer verirsiniz ama bağımsızlığınızı da korursunuz."
        });
    }

    // Güç ihtiyacı
    if (scores.power >= 60) {
        interpretations.push({
            area: "Liderlik Eğilimi",
            level: "Yüksek",
            score: scores.power,
            color: "#9C27B0",
            icon: "👑",
            text: "Kontrol ve etki sahibi olmak sizin için önemli. Liderlik potansiyeliniz var."
        });
    } else if (scores.power >= 30) {
        interpretations.push({
            area: "Liderlik Eğilimi",
            level: "Orta",
            score: scores.power,
            color: "#BA68C8",
            icon: "⚡",
            text: "Gerektiğinde inisiyatif alabilirsiniz."
        });
    }

    // Özerklik
    if (scores.autonomy >= 60) {
        interpretations.push({
            area: "Bağımsızlık",
            level: "Yüksek",
            score: scores.autonomy,
            color: "#00BCD4",
            icon: "🦅",
            text: "Özgürlük ve bağımsızlık sizin için değerli. Kendi yolunuzu çizmeyi tercih ediyorsunuz."
        });
    } else if (scores.autonomy >= 30) {
        interpretations.push({
            area: "Bağımsızlık",
            level: "Orta",
            score: scores.autonomy,
            color: "#4DD0E1",
            icon: "🌊",
            text: "Hem bağımsız olabilir hem de takım çalışmasına uyum sağlayabilirsiniz."
        });
    }

    // Duygusal ton
    interpretations.push({
        area: "Genel Bakış Açısı",
        level: scores.emotionalTone === 'positive' ? 'İyimser' :
            scores.emotionalTone === 'negative' ? 'Temkinli' : 'Dengeli',
        score: 0,
        color: scores.emotionalTone === 'positive' ? '#4CAF50' :
            scores.emotionalTone === 'negative' ? '#FF5722' : '#9E9E9E',
        icon: scores.emotionalTone === 'positive' ? '☀️' :
            scores.emotionalTone === 'negative' ? '🌧️' : '⚖️',
        text: scores.emotionalTone === 'positive' ?
            "Olaylara genellikle olumlu bir perspektiften bakıyorsunuz." :
            scores.emotionalTone === 'negative' ?
                "Potansiyel zorlukları önceden görme eğilimindesiniz." :
                "Olaylara dengeli bir bakış açısıyla yaklaşıyorsunuz."
    });

    // Detay seviyesi
    interpretations.push({
        area: "Anlatım Tarzı",
        level: scores.detailLevel === 'high' ? 'Detaylı' :
            scores.detailLevel === 'low' ? 'Özet' : 'Dengeli',
        score: 0,
        color: '#607D8B',
        icon: '📝',
        text: scores.detailLevel === 'high' ?
            "Düşüncelerinizi ayrıntılı ifade etmeyi tercih ediyorsunuz." :
            scores.detailLevel === 'low' ?
                "Kısa ve öz anlatımı tercih ediyorsunuz." :
                "Anlatımınızda denge var."
    });

    return interpretations;
};

// Hikaye profil özeti
export const generateStoryProfile = (scores) => {
    const interpretations = interpretStoryScores(scores);

    let profileType = '';
    let profileDescription = '';

    if (scores.achievement >= 60 && scores.power >= 40) {
        profileType = 'Hırslı Lider';
        profileDescription = 'Hem başarı hem de etki için çalışan güçlü bir motivasyonunuz var.';
    } else if (scores.affiliation >= 60 && scores.autonomy < 40) {
        profileType = 'Topluluk İnsanı';
        profileDescription = 'İlişkiler ve ait olma duygusu sizin için çok önemli.';
    } else if (scores.autonomy >= 60) {
        profileType = 'Özgür Ruh';
        profileDescription = 'Bağımsızlık ve kendi yolunuzu çizmek sizin için öncelikli.';
    } else if (scores.achievement >= 50) {
        profileType = 'Gelişim Odaklı';
        profileDescription = 'Sürekli öğrenmek ve gelişmek sizin için önemli.';
    } else if (scores.affiliation >= 50) {
        profileType = 'İlişki Ustası';
        profileDescription = 'İnsanlarla bağ kurmak sizin için değerli.';
    } else {
        profileType = 'Dengeli Birey';
        profileDescription = 'Farklı motivasyonlar arasında denge kurabiliyorsunuz.';
    }

    return {
        scores,
        interpretations,
        profileType,
        profileDescription
    };
};
