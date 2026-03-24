// OCEAN (Big Five) Puanlama Sistemi

import { oceanQuestions, factorDescriptions } from '../data/oceanQuestions';

export const calculateOceanScores = (answers) => {
    const scores = {
        E: 0, // Extraversion
        A: 0, // Agreeableness
        C: 0, // Conscientiousness
        N: 0, // Neuroticism
        O: 0  // Openness
    };

    const counts = { E: 0, A: 0, C: 0, N: 0, O: 0 };

    answers.forEach((answer, index) => {
        if (index >= oceanQuestions.length) return;

        const question = oceanQuestions[index];
        const factor = question.factor;
        let value = answer; // 1-5 arası

        // Negatif yönlü soruları tersine çevir
        if (question.direction === '-') {
            value = 6 - value; // 1->5, 2->4, 3->3, 4->2, 5->1
        }

        scores[factor] += value;
        counts[factor]++;
    });

    // Yüzdelik hesapla (her faktör için max 50 puan - 10 soru x 5)
    const percentages = {};
    Object.keys(scores).forEach(factor => {
        const maxScore = counts[factor] * 5;
        percentages[factor] = maxScore > 0 ? Math.round((scores[factor] / maxScore) * 100) : 0;
    });

    return percentages;
};

export const interpretOceanScores = (percentages) => {
    const interpretations = {};

    Object.keys(percentages).forEach(factor => {
        const score = percentages[factor];
        let level;

        if (score >= 70) level = 'high';
        else if (score >= 40) level = 'medium';
        else level = 'low';

        interpretations[factor] = {
            score,
            level,
            description: factorDescriptions[factor][level],
            name: factorDescriptions[factor].name,
            icon: factorDescriptions[factor].icon,
            color: factorDescriptions[factor].color
        };
    });

    return interpretations;
};

// Kişilik profili özeti oluştur
export const generateOceanProfile = (percentages) => {
    const interpretations = interpretOceanScores(percentages);

    // Dominant özellikler (en yüksek 2 faktör)
    const sortedFactors = Object.keys(percentages)
        .sort((a, b) => percentages[b] - percentages[a]);

    const dominant = sortedFactors.slice(0, 2);
    const lowest = sortedFactors.slice(-1)[0];

    // Profil türü belirleme
    let profileType = '';
    let profileDescription = '';

    if (percentages.E >= 70 && percentages.O >= 70) {
        profileType = 'Kaşif';
        profileDescription = 'Sosyal, meraklı ve yeniliklere açık bir kişiliğiniz var.';
    } else if (percentages.C >= 70 && percentages.A >= 70) {
        profileType = 'Harmonist';
        profileDescription = 'Düzenli, uyumlu ve güvenilir bir kişiliğiniz var.';
    } else if (percentages.O >= 70 && percentages.N < 40) {
        profileType = 'Yaratıcı';
        profileDescription = 'Yaratıcı, sakin ve özgün düşünen bir kişiliğiniz var.';
    } else if (percentages.E >= 70 && percentages.A >= 70) {
        profileType = 'Lider';
        profileDescription = 'Karizmatik, işbirlikçi ve ilham veren bir kişiliğiniz var.';
    } else if (percentages.C >= 70) {
        profileType = 'Stratejist';
        profileDescription = 'Planlı, disiplinli ve hedefe odaklı bir kişiliğiniz var.';
    } else if (percentages.A >= 70) {
        profileType = 'Arabulucu';
        profileDescription = 'Empatik, uyumlu ve yardımsever bir kişiliğiniz var.';
    } else if (percentages.E < 40 && percentages.O >= 60) {
        profileType = 'Düşünür';
        profileDescription = 'İçebakışlı, yaratıcı ve derin düşünen bir kişiliğiniz var.';
    } else {
        profileType = 'Dengeli';
        profileDescription = 'Farklı durumlara uyum sağlayabilen esnek bir kişiliğiniz var.';
    }

    return {
        interpretations,
        dominant,
        lowest,
        profileType,
        profileDescription,
        chartData: {
            labels: ['Dışadönüklük', 'Uyumluluk', 'Sorumluluk', 'Duyguslık', 'Açıklık'],
            data: [
                percentages.E / 100,
                percentages.A / 100,
                percentages.C / 100,
                percentages.N / 100,
                percentages.O / 100
            ]
        }
    };
};
