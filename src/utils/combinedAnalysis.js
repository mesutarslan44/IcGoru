// Birleşik Analiz Sistemi

import { interpretOceanScores, generateOceanProfile } from './oceanScoring';
import { interpretInkblotScores, generateInkblotProfile } from './inkblotScoring';
import { interpretStoryScores, generateStoryProfile } from './storyScoring';

export const generateCombinedAnalysis = (oceanScores, inkblotScores, storyScores) => {
    const profile = {
        primaryTraits: [],
        strengths: [],
        growthAreas: [],
        summary: '',
        recommendations: [],
        detailedAnalysis: {},
        overallProfile: null
    };

    // Profiller oluştur
    const oceanProfile = oceanScores ? generateOceanProfile(oceanScores) : null;
    const inkblotProfile = inkblotScores ? generateInkblotProfile(inkblotScores) : null;
    const storyProfile = storyScores ? generateStoryProfile(storyScores) : null;

    // OCEAN'dan ana özellikler
    if (oceanProfile) {
        Object.keys(oceanProfile.interpretations).forEach(factor => {
            if (oceanProfile.interpretations[factor].score >= 70) {
                profile.primaryTraits.push({
                    trait: oceanProfile.interpretations[factor].name,
                    source: 'OCEAN',
                    strength: 'Yüksek',
                    icon: oceanProfile.interpretations[factor].icon
                });
            }
        });
    }

    // Güçlü yönler analizi
    if (oceanScores && inkblotScores) {
        // Dışadönüklük + Yüksek sosyal ilgi = Sosyal güç
        if (oceanScores.E >= 60 && inkblotScores.socialInterest > 3) {
            profile.strengths.push({
                title: "Sosyal Zeka",
                icon: "🗣️",
                description: "Güçlü sosyal beceriler ve iletişim yeteneği"
            });
        }

        // Açıklık + Yaratıcılık = Yaratıcı güç
        if (oceanScores.O >= 60 && inkblotScores.creativity >= 60) {
            profile.strengths.push({
                title: "Yaratıcı Düşünce",
                icon: "💡",
                description: "Yüksek yaratıcılık ve yenilikçi düşünce"
            });
        }
    }

    if (oceanScores && storyScores) {
        // Sorumluluk + Başarı motivasyonu = Kariyer gücü
        if (oceanScores.C >= 60 && storyScores.achievement >= 50) {
            profile.strengths.push({
                title: "Hedefe Odaklılık",
                icon: "🎯",
                description: "Güçlü başarı odaklılık ve disiplin"
            });
        }

        // Uyumluluk + İlişki odaklılık = İlişki gücü
        if (oceanScores.A >= 60 && storyScores.affiliation >= 50) {
            profile.strengths.push({
                title: "İlişki Kurma",
                icon: "💝",
                description: "Derin ve anlamlı ilişkiler kurma kapasitesi"
            });
        }
    }

    // Gelişim alanları
    if (oceanScores && inkblotScores) {
        // Yüksek Nevrotizm + Yüksek kaygı = Stres yönetimi
        if (oceanScores.N >= 60 && inkblotScores.anxiety >= 50) {
            profile.growthAreas.push({
                title: "Stres Yönetimi",
                icon: "🧘",
                description: "Stres ve kaygı yönetimi teknikleri faydalı olabilir"
            });
        }

        // Düşük dışadönüklük + düşük sosyal ilgi
        if (oceanScores.E < 40 && inkblotScores.socialInterest < 0) {
            profile.growthAreas.push({
                title: "Sosyal Bağlantılar",
                icon: "🤝",
                description: "Sosyal bağlantıları güçlendirmek faydalı olabilir"
            });
        }
    }

    // Öneriler
    profile.recommendations = generateRecommendations(oceanScores, inkblotScores, storyScores);

    // Özet oluştur
    profile.summary = generateSummary(oceanScores, inkblotScores, storyScores);

    // Detaylı analiz
    profile.detailedAnalysis = {
        ocean: oceanProfile,
        inkblot: inkblotProfile,
        story: storyProfile
    };

    // Genel profil türü
    profile.overallProfile = determineOverallProfile(oceanScores, inkblotScores, storyScores);

    return profile;
};

const generateSummary = (ocean, inkblot, story) => {
    let summary = "📊 Analiz sonuçlarınıza göre, ";

    if (!ocean && !inkblot && !story) {
        return "Henüz test tamamlanmadı.";
    }

    // Kişilik tipi
    if (ocean) {
        if (ocean.E >= 60) {
            summary += "sosyal ve dışadönük bir yapıya sahipsiniz. ";
        } else if (ocean.E < 40) {
            summary += "içedönük ve düşünceli bir yapıya sahipsiniz. ";
        } else {
            summary += "hem sosyal hem de bireysel aktivitelerde dengeli bir yapıya sahipsiniz. ";
        }
    }

    // Düşünce tarzı
    if (inkblot && ocean) {
        if (inkblot.creativity >= 60 && ocean.O >= 60) {
            summary += "Yaratıcı ve yenilikçi düşünme yeteneğiniz güçlü. ";
        } else if (ocean.C >= 60) {
            summary += "Sistematik ve organize düşünme yeteneğiniz ön planda. ";
        }
    }

    // Motivasyon
    if (story) {
        if (story.achievement >= 60) {
            summary += "Başarı ve hedeflere ulaşma sizin için önemli bir motivasyon kaynağı. ";
        }
        if (story.affiliation >= 60) {
            summary += "İnsan ilişkileri ve bağlılık hayatınızda merkezi bir yer tutuyor. ";
        }
    }

    // Duygusal denge
    if (ocean && inkblot) {
        if (ocean.N < 40 && inkblot.anxiety < 40) {
            summary += "Genel olarak duygusal dengeniz yerinde görünüyor.";
        } else if (ocean.N >= 60 || inkblot.anxiety >= 60) {
            summary += "Stresle başa çıkma konusunda kendinize özen göstermeniz faydalı olabilir.";
        }
    }

    return summary;
};

const generateRecommendations = (ocean, inkblot, story) => {
    const recommendations = [];

    if (ocean) {
        // Düşük dışadönüklük için
        if (ocean.E < 40) {
            recommendations.push({
                title: "Sosyal Aktiviteler",
                icon: "🎭",
                text: "Küçük gruplarla sosyal aktivitelere katılmayı deneyebilirsiniz."
            });
        }

        // Yüksek nevrotizm için
        if (ocean.N >= 60) {
            recommendations.push({
                title: "Mindfulness",
                icon: "🧘",
                text: "Meditasyon ve nefes egzersizleri duygusal dengeyi destekleyebilir."
            });
        }

        // Yüksek açıklık için
        if (ocean.O >= 70) {
            recommendations.push({
                title: "Yaratıcı Projeler",
                icon: "🎨",
                text: "Sanat, yazı veya yaratıcı hobiler size enerji verebilir."
            });
        }
    }

    if (inkblot) {
        // Yüksek kaygı için
        if (inkblot.anxiety >= 50) {
            recommendations.push({
                title: "Rahatlama Teknikleri",
                icon: "🌿",
                text: "Doğa yürüyüşleri ve gevşeme egzersizleri faydalı olabilir."
            });
        }

        // Düşük sosyal ilgi için
        if (inkblot.socialInterest < 0) {
            recommendations.push({
                title: "Bireysel Aktiviteler",
                icon: "📚",
                text: "Okuma, yazma veya bireysel hobiler size iyi gelebilir."
            });
        }
    }

    if (story) {
        // Yüksek başarı motivasyonu için
        if (story.achievement >= 60) {
            recommendations.push({
                title: "Hedef Belirleme",
                icon: "📋",
                text: "SMART hedefler belirlemek motivasyonunuzu yönlendirebilir."
            });
        }

        // Yüksek ilişki odaklılık için
        if (story.affiliation >= 60) {
            recommendations.push({
                title: "İlişki Geliştirme",
                icon: "💬",
                text: "Yakın ilişkilerinize zaman ayırmak size iyi gelecektir."
            });
        }
    }

    // Default öneriler
    if (recommendations.length === 0) {
        recommendations.push({
            title: "Kendini Keşfet",
            icon: "🔍",
            text: "Günlük tutmak iç dünyanızı daha iyi anlamanıza yardımcı olabilir."
        });
    }

    return recommendations;
};

const determineOverallProfile = (ocean, inkblot, story) => {
    const profiles = [
        {
            type: "Sosyal Lider",
            icon: "👑",
            color: "#FF6B6B",
            match: () => ocean?.E >= 60 && story?.power >= 50
        },
        {
            type: "Yaratıcı Ruh",
            icon: "🎨",
            color: "#9B59B6",
            match: () => ocean?.O >= 60 && inkblot?.creativity >= 60
        },
        {
            type: "Empatik Dinleyici",
            icon: "💝",
            color: "#E91E63",
            match: () => ocean?.A >= 60 && story?.affiliation >= 50
        },
        {
            type: "Stratejik Düşünür",
            icon: "🎯",
            color: "#3498DB",
            match: () => ocean?.C >= 60 && story?.achievement >= 50
        },
        {
            type: "Özgür Kaşif",
            icon: "🦅",
            color: "#00BCD4",
            match: () => ocean?.O >= 50 && story?.autonomy >= 50
        },
        {
            type: "Sakin Gözlemci",
            icon: "🌊",
            color: "#26A69A",
            match: () => ocean?.E < 40 && inkblot?.anxiety < 40
        },
        {
            type: "Duyarlı Sanatçı",
            icon: "🌸",
            color: "#AB47BC",
            match: () => ocean?.N >= 50 && inkblot?.creativity >= 50
        },
        {
            type: "Dengeli Birey",
            icon: "⚖️",
            color: "#78909C",
            match: () => true // Default
        }
    ];

    for (const profile of profiles) {
        if (profile.match()) {
            return profile;
        }
    }

    return profiles[profiles.length - 1];
};

// Paylaşılabilir özet oluştur
export const generateShareableReport = (combinedProfile) => {
    const { overallProfile, strengths, summary } = combinedProfile;

    let report = `🧠 İçGörü Kişilik Analizi\n\n`;
    report += `📌 Profil: ${overallProfile?.icon || ''} ${overallProfile?.type || 'Dengeli Birey'}\n\n`;
    report += `${summary}\n\n`;

    if (strengths.length > 0) {
        report += `✨ Güçlü Yönler:\n`;
        strengths.forEach(s => {
            report += `${s.icon} ${s.title}\n`;
        });
    }

    report += `\n📲 Sen de keşfet: İçGörü Uygulaması`;

    return report;
};
