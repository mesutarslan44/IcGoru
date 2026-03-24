// Leke Testi Puanlama Sistemi
// Güncellenmiş: Çoklu seçim, hiç seçim yok, özel cevap desteği

import { inkblotInterpretation } from '../data/inkblotData';

export const calculateInkblotScores = (answers) => {
    let totalCreativity = 0;
    let totalAnxiety = 0;
    let totalSocial = 0;
    let seeNothingCount = 0;
    let customAnswerCount = 0;
    let multiSelectCount = 0;
    let totalResponseCount = 0;

    const perceptionCounts = {};
    const categoryCounts = {};

    answers.forEach(answer => {
        if (!answer) return;

        // Yeni format: {options: [], customAnswer: '', seeNothing: bool, rotation: number}
        if (typeof answer === 'object' && !answer.score) {
            // Hiçbir şey görmeme durumu
            if (answer.seeNothing) {
                seeNothingCount++;
                totalAnxiety += 2; // Belirsizlikle başa çıkma zorluğu
                return;
            }

            // Özel cevap
            if (answer.customAnswer && answer.customAnswer.trim()) {
                customAnswerCount++;
                totalCreativity += 3; // Özgün düşünce
                totalResponseCount++;
            }

            // Çoklu seçimler
            if (answer.options && answer.options.length > 0) {
                if (answer.options.length > 1) {
                    multiSelectCount++;
                    totalCreativity += 1; // Birden fazla şey görebilme
                }

                answer.options.forEach(option => {
                    if (!option || !option.score) return;

                    totalResponseCount++;
                    totalCreativity += option.score.creativity || 0;
                    totalAnxiety += option.score.anxiety || 0;
                    totalSocial += option.score.social || 0;

                    const perception = option.score.perception;
                    if (perception) {
                        perceptionCounts[perception] = (perceptionCounts[perception] || 0) + 1;
                    }

                    const category = option.category;
                    if (category) {
                        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                    }
                });
            }

            return;
        }

        // Eski format desteği (geriye uyumluluk)
        if (answer && answer.score) {
            totalCreativity += answer.score.creativity || 0;
            totalAnxiety += answer.score.anxiety || 0;
            totalSocial += answer.score.social || 0;

            const perception = answer.score.perception;
            if (perception) {
                perceptionCounts[perception] = (perceptionCounts[perception] || 0) + 1;
            }

            const category = answer.category;
            if (category) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
            totalResponseCount++;
        }
    });

    // Dominant algı türü
    const dominantPerception = Object.keys(perceptionCounts).length > 0
        ? Object.keys(perceptionCounts).reduce((a, b) => perceptionCounts[a] > perceptionCounts[b] ? a : b)
        : 'whole';

    // En çok görülen kategori
    const dominantCategory = Object.keys(categoryCounts).length > 0
        ? Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b)
        : 'animal';

    // Normalleştir (0-100 arası)
    // Dinamik max değerler (daha fazla cevap = daha fazla potansiyel skor)
    const effectiveResponseCount = Math.max(totalResponseCount, 10);
    const maxCreativity = effectiveResponseCount * 3;
    const maxAnxiety = effectiveResponseCount * 3;

    // Hiç görememe durumu kaygı puanını artırır
    const anxietyBonus = seeNothingCount * 15;

    return {
        creativity: Math.min(100, Math.round((totalCreativity / maxCreativity) * 100)),
        anxiety: Math.min(100, Math.round(((totalAnxiety + anxietyBonus) / maxAnxiety) * 100)),
        socialInterest: Math.min(100, Math.round((totalSocial / 10) * 100)),
        dominantPerception,
        dominantCategory,
        perceptionCounts,
        categoryCounts,
        // Yeni metrikler
        responseStyle: {
            seeNothingCount,
            customAnswerCount,
            multiSelectCount,
            totalResponseCount,
            avgResponsesPerCard: totalResponseCount / 10
        }
    };
};

export const interpretInkblotScores = (scores) => {
    const interpretations = [];

    // Yaratıcılık yorumu
    if (scores.creativity >= 70) {
        interpretations.push({
            area: "Yaratıcılık",
            level: "Yüksek",
            score: scores.creativity,
            color: "#9B59B6",
            icon: "🎨",
            text: "Özgün ve yaratıcı bir düşünce yapınız var. Sıra dışı bakış açılarıyla olayları değerlendirebiliyorsunuz."
        });
    } else if (scores.creativity >= 40) {
        interpretations.push({
            area: "Yaratıcılık",
            level: "Orta",
            score: scores.creativity,
            color: "#3498DB",
            icon: "🎨",
            text: "Hem pratik hem yaratıcı düşünce arasında denge kurabiliyorsunuz."
        });
    } else {
        interpretations.push({
            area: "Yaratıcılık",
            level: "Düşük",
            score: scores.creativity,
            color: "#95A5A6",
            icon: "🎨",
            text: "Pratik ve somut düşünce yapısına sahipsiniz. Gerçekçi çözümler üretiyorsunuz."
        });
    }

    // Kaygı yorumu
    if (scores.anxiety >= 60) {
        interpretations.push({
            area: "Kaygı Düzeyi",
            level: "Yüksek",
            score: scores.anxiety,
            color: "#E74C3C",
            icon: "⚠️",
            text: "Bazı belirsiz durumlarda kaygı yaşama eğiliminiz olabilir. Stres yönetimi teknikleri faydalı olabilir."
        });
    } else if (scores.anxiety >= 30) {
        interpretations.push({
            area: "Kaygı Düzeyi",
            level: "Normal",
            score: scores.anxiety,
            color: "#F39C12",
            icon: "⚖️",
            text: "Normal düzeyde stres tepkileri gösteriyorsunuz."
        });
    } else {
        interpretations.push({
            area: "Kaygı Düzeyi",
            level: "Düşük",
            score: scores.anxiety,
            color: "#27AE60",
            icon: "😌",
            text: "Genel olarak sakin ve rahat bir yapınız var."
        });
    }

    // Cevap tarzı yorumu
    if (scores.responseStyle) {
        const style = scores.responseStyle;

        if (style.multiSelectCount >= 5) {
            interpretations.push({
                area: "Algı Zenginliği",
                level: "Yüksek",
                score: 80,
                color: "#00BCD4",
                icon: "👁️",
                text: "Görsellerde birden fazla şey görebiliyorsunuz. Bu zengin bir hayal gücü ve esnek düşünce yapısı işaretidir."
            });
        }

        if (style.customAnswerCount >= 3) {
            interpretations.push({
                area: "Özgünlük",
                level: "Yüksek",
                score: 85,
                color: "#E91E63",
                icon: "✨",
                text: "Kalıpların dışında düşünüyorsunuz. Özgün ve bağımsız bir bakış açınız var."
            });
        }

        if (style.seeNothingCount >= 3) {
            interpretations.push({
                area: "Belirsizlik Toleransı",
                level: "Düşük",
                score: 30,
                color: "#FF9800",
                icon: "🤔",
                text: "Belirsiz uyarıcılarda anlam bulmakta zorlanabilirsiniz. Bu, yapılandırılmış ortamları tercih ettiğinizi gösterebilir."
            });
        }
    }

    // Sosyal ilgi yorumu
    if (scores.socialInterest > 50) {
        interpretations.push({
            area: "Sosyal İlgi",
            level: "Yüksek",
            score: scores.socialInterest,
            color: "#E91E63",
            icon: "👥",
            text: "İnsan ilişkilerine ve sosyal etkileşimlere önem veriyorsunuz."
        });
    } else if (scores.socialInterest > 20) {
        interpretations.push({
            area: "Sosyal İlgi",
            level: "Orta",
            score: scores.socialInterest,
            color: "#9C27B0",
            icon: "👥",
            text: "Sosyal ilişkilerinizde dengeli bir yaklaşımınız var."
        });
    } else {
        interpretations.push({
            area: "Sosyal İlgi",
            level: "Düşük",
            score: scores.socialInterest,
            color: "#607D8B",
            icon: "👤",
            text: "Bağımsız çalışmayı ve bireysel aktiviteleri tercih edebilirsiniz."
        });
    }

    // Algı türü yorumu
    if (scores.dominantPerception && inkblotInterpretation.perception[scores.dominantPerception]) {
        interpretations.push({
            area: "Algı Türü",
            level: scores.dominantPerception,
            score: 0,
            color: "#00BCD4",
            icon: "👁️",
            text: inkblotInterpretation.perception[scores.dominantPerception]
        });
    }

    // Kategori yorumu
    if (scores.dominantCategory && inkblotInterpretation.categories[scores.dominantCategory]) {
        interpretations.push({
            area: "İlgi Alanı",
            level: scores.dominantCategory,
            score: 0,
            color: "#4CAF50",
            icon: "🎯",
            text: inkblotInterpretation.categories[scores.dominantCategory]
        });
    }

    return interpretations;
};

// Leke testi profil özeti
export const generateInkblotProfile = (scores) => {
    const interpretations = interpretInkblotScores(scores);

    let profileType = '';
    let profileDescription = '';

    const style = scores.responseStyle || {};

    if (style.customAnswerCount >= 4) {
        profileType = 'Özgün Düşünür';
        profileDescription = 'Kalıpların dışında düşünüyorsunuz. Kendi benzersiz bakış açınızla dünyayı yorumluyorsunuz.';
    } else if (style.seeNothingCount >= 4) {
        profileType = 'Somut Düşünür';
        profileDescription = 'Net ve yapılandırılmış bilgileri tercih ediyorsunuz. Belirsizlikten hoşlanmıyorsunuz.';
    } else if (scores.creativity >= 70 && scores.anxiety < 40) {
        profileType = 'Özgür Ruh';
        profileDescription = 'Yaratıcı ve rahat bir düşünce yapısına sahipsiniz. Hayalgücünüz zengin.';
    } else if (scores.creativity >= 60 && scores.socialInterest > 50) {
        profileType = 'Sosyal Sanatçı';
        profileDescription = 'Hem yaratıcı hem de sosyal ilişkilere önem veriyorsunuz.';
    } else if (scores.anxiety >= 50) {
        profileType = 'Duyarlı Gözlemci';
        profileDescription = 'Detaylara ve olası sorunlara karşı hassassınız. Dikkatli bir yapınız var.';
    } else if (scores.socialInterest > 60) {
        profileType = 'İlişki Odaklı';
        profileDescription = 'İnsan ilişkileri sizin için çok önemli. Sosyal bağlar kuruyorsunuz.';
    } else if (style.multiSelectCount >= 6) {
        profileType = 'Çok Yönlü Görücü';
        profileDescription = 'Aynı durumda birden fazla olasılığı görebiliyorsunuz. Esnek bir zihne sahipsiniz.';
    } else {
        profileType = 'Dengeli Bakış';
        profileDescription = 'Hem analitik hem sezgisel yönlerinizi kullanabiliyorsunuz.';
    }

    return {
        scores,
        interpretations,
        profileType,
        profileDescription
    };
};
