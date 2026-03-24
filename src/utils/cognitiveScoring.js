// ZihinGücü Testi - Puanlama Sistemi
// Bilişsel beceri değerlendirmesi

export const calculateCognitiveScores = (results) => {
    const scores = {
        attention: 0,
        memory: 0,
        concentration: 0,
        reasoning: 0,
        speed: 0,
        overall: 0
    };

    // Her alt test için puan hesapla
    if (results.attention) {
        const { correct, total, avgTime } = results.attention;
        const baseScore = (correct / total) * 80;
        const timeBonus = Math.max(0, 20 - (avgTime / 1000)); // ms to seconds
        scores.attention = Math.min(100, Math.round(baseScore + timeBonus));
    }

    if (results.memory) {
        const { recalled, total } = results.memory;
        scores.memory = Math.round((recalled / total) * 100);
    }

    if (results.concentration) {
        const { correct, errors, total } = results.concentration;
        const baseScore = (correct / total) * 100;
        scores.concentration = Math.max(0, Math.round(baseScore - (errors * 5)));
    }

    if (results.reasoning) {
        const { correct, total } = results.reasoning;
        scores.reasoning = Math.round((correct / total) * 100);
    }

    if (results.speed) {
        const { correct, total, avgTime } = results.speed;
        const accuracy = correct / total;
        const speedFactor = Math.max(0.5, 1 - ((avgTime / 1000) / 10));
        scores.speed = Math.round(accuracy * speedFactor * 100);
    }

    // Genel ortalama
    const validScores = Object.values(scores).filter(s => s > 0);
    scores.overall = Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length);

    return scores;
};

export const interpretCognitiveScores = (scores) => {
    const interpretations = {};

    const getLevel = (score) => {
        if (score >= 80) return 'high';
        if (score >= 50) return 'medium';
        return 'low';
    };

    const interpretationTexts = {
        attention: {
            high: {
                title: '🌟 Güçlü Dikkat',
                text: 'Dikkat beceriniz güçlü. Detayları kolayca fark ediyorsunuz. Karmaşık görevlerde bile odaklanabilirsiniz.',
                tips: ['Dikkat gerektiren işlerde liderlik edebilirsiniz', 'Detay odaklı meslekler size uygun']
            },
            medium: {
                title: '⚖️ Orta Düzey Dikkat',
                text: 'Dikkat beceriniz ortalama düzeyde. Biraz pratikle geliştirilebilir.',
                tips: ['Dikkat egzersizleri yapın', 'Tek seferde tek işe odaklanın', 'Kısa molalar verin']
            },
            low: {
                title: '📈 Gelişim Alanı: Dikkat',
                text: 'Dikkat becerinizi güçlendirmek faydalı olabilir.',
                tips: ['Meditasyon deneyin', 'Bulmaca çözün', 'Telefon kullanımını azaltın', 'Uyku düzeninize dikkat edin']
            }
        },
        memory: {
            high: {
                title: '🌟 Güçlü Hafıza',
                text: 'Hafızanız güçlü. Bilgileri kolayca kodlayıp hatırlıyorsunuz.',
                tips: ['Bu yeteneğinizi yeni şeyler öğrenmek için kullanın', 'Başkalarına öğretmeyi deneyin']
            },
            medium: {
                title: '⚖️ Orta Düzey Hafıza',
                text: 'Hafıza beceriniz ortalama. Tekrar ve strateji kullanımı faydalı olabilir.',
                tips: ['Tekrar yapın', 'Görselleştirme kullanın', 'Bilgileri gruplandırın']
            },
            low: {
                title: '📈 Gelişim Alanı: Hafıza',
                text: 'Hafıza egzersizleri yapmanız önerilir.',
                tips: ['Hafıza oyunları oynayın', 'Kelime ezberleyin', 'Uyku kalitenizi artırın', 'Omega-3 tüketin']
            }
        },
        concentration: {
            high: {
                title: '🌟 Yüksek Konsantrasyon',
                text: 'Konsantrasyonunuz yüksek. Uzun süre odaklanabiliyorsunuz.',
                tips: ['Karmaşık projeler üstlenebilirsiniz', 'Derinlemesine çalışma yapabilirsiniz']
            },
            medium: {
                title: '⚖️ Orta Düzey Konsantrasyon',
                text: 'Konsantrasyon beceriniz orta düzeyde.',
                tips: ['Pomodoro tekniği kullanın', 'Dikkat dağıtıcıları azaltın', 'Düzenli molalar verin']
            },
            low: {
                title: '📈 Gelişim Alanı: Konsantrasyon',
                text: 'Odaklanma egzersizleri faydalı olabilir.',
                tips: ['Nefes egzersizleri yapın', 'Sessiz ortamlarda çalışın', 'Çoklu görevden kaçının', 'Düzenli egzersiz yapın']
            }
        },
        reasoning: {
            high: {
                title: '🌟 Güçlü Mantık',
                text: 'Mantıksal düşünme beceriniz güçlü. Problem çözme yeteneğiniz yüksek.',
                tips: ['Analitik düşünce gerektiren alanlarda başarılı olursunuz', 'Strateji oyunlarında iyisiniz']
            },
            medium: {
                title: '⚖️ Orta Düzey Mantık',
                text: 'Mantık beceriniz ortalama düzeyde.',
                tips: ['Mantık bulmacaları çözün', 'Satranç veya sudoku oynayın', 'Programlama öğrenin']
            },
            low: {
                title: '📈 Gelişim Alanı: Mantık',
                text: 'Mantık bulmacaları çözmek bu beceriyi geliştirebilir.',
                tips: ['Günlük bulmaca çözün', 'Strateji oyunları oynayın', 'Matematik pratikleri yapın']
            }
        },
        speed: {
            high: {
                title: '🌟 Hızlı Zihin',
                text: 'İşlem hızınız yüksek. Hızlı düşünüp karar verebiliyorsunuz.',
                tips: ['Hızlı karar gerektiren işlerde başarılısınız', 'Refleksleriniz güçlü']
            },
            medium: {
                title: '⚖️ Orta Düzey Hız',
                text: 'İşlem hızınız ortalama düzeyde.',
                tips: ['Hız gerektiren oyunlar oynayın', 'Mental matematik pratikleri yapın']
            },
            low: {
                title: '📈 Gelişim Alanı: Hız',
                text: 'Hız gerektiren aktiviteler bu beceriyi geliştirebilir.',
                tips: ['Refleks oyunları oynayın', 'Hızlı okuma tekniklerini öğrenin', 'Düzenli egzersiz yapın']
            }
        }
    };

    Object.keys(scores).forEach(key => {
        if (key !== 'overall' && interpretationTexts[key]) {
            const level = getLevel(scores[key]);
            interpretations[key] = {
                score: scores[key],
                level,
                ...interpretationTexts[key][level]
            };
        }
    });

    return interpretations;
};

export const generateCognitiveProfile = (scores) => {
    const interpretations = interpretCognitiveScores(scores);

    // En güçlü ve en zayıf alanları bul
    const areas = ['attention', 'memory', 'concentration', 'reasoning', 'speed'];
    const sortedAreas = [...areas].sort((a, b) => scores[b] - scores[a]);

    const strongest = sortedAreas[0];
    const weakest = sortedAreas[sortedAreas.length - 1];

    // Profil tipi belirle
    let profileType = '';
    let profileDescription = '';

    if (scores.overall >= 80) {
        profileType = '🧠 Zihin Şampiyonu';
        profileDescription = 'Tüm bilişsel alanlarda güçlü performans gösteriyorsunuz. Zihinsel kapasitesiniz yüksek.';
    } else if (scores.reasoning >= 80 && scores.speed >= 70) {
        profileType = '⚡ Hızlı Düşünür';
        profileDescription = 'Hem mantıksal düşünme hem de hızlı işlem yapabilme becerileriniz güçlü.';
    } else if (scores.memory >= 80 && scores.attention >= 70) {
        profileType = '🎯 Odaklı Gözlemci';
        profileDescription = 'Dikkat ve hafıza alanlarında güçlüsünüz. Detayları yakalayıp hatırlıyorsunuz.';
    } else if (scores.concentration >= 80) {
        profileType = '🧘 Derin Odaklı';
        profileDescription = 'Konsantrasyonunuz güçlü. Uzun süre tek konuya odaklanabiliyorsunuz.';
    } else if (scores.overall >= 60) {
        profileType = '📊 Dengeli Zihin';
        profileDescription = 'Bilişsel becerileriniz dengeli dağılım gösteriyor. Her alanda yeterli düzeydesiniz.';
    } else {
        profileType = '🌱 Gelişen Zihin';
        profileDescription = 'Potansiyelinizi ortaya çıkarmak için egzersizlere devam edin. Her gün biraz daha güçleneceksiniz.';
    }

    return {
        scores,
        interpretations,
        profileType,
        profileDescription,
        strongest,
        weakest
    };
};
