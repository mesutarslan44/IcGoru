// Hikaye Analizi Testi Verileri
// TAT Tarzı Projektif Test - Orijinal Görseller

export const storyCards = [
    {
        id: 1,
        image: require('../../assets/storyimages/story_01.png'),
        placeholder: '💼',
        title: 'Çalışma Anı',
        prompt: 'Bu görseldeki kişi hakkında bir hikaye anlatın. Ne yapıyor? Ne düşünüyor?',
        themes: ['başarı', 'çalışma', 'düşünce', 'yalnızlık', 'hedef'],
        analysisKeys: {
            achievement: ['başarı', 'hedef', 'çalışma', 'kazanmak', 'başarmak', 'proje', 'kariyer'],
            affiliation: ['özlemek', 'düşünmek', 'hatırlamak', 'sevdikleri'],
            power: ['kontrol', 'karar', 'yönetmek', 'önemli'],
            autonomy: ['kendi', 'bağımsız', 'özgür', 'seçim']
        },
        hints: [
            'Bu kişi ne iş yapıyor olabilir?',
            'Pencereden dışarı mı bakıyor?',
            'Mutlu mu, yorgun mu, düşünceli mi?'
        ]
    },
    {
        id: 2,
        image: require('../../assets/storyimages/story_02.png'),
        placeholder: '👥',
        title: 'İki Kişi',
        prompt: 'Bu iki kişi kim? Aralarında ne geçiyor? Hikayelerini anlatın.',
        themes: ['ilişki', 'bağ', 'iletişim', 'destek', 'çatışma'],
        analysisKeys: {
            achievement: ['öğretmek', 'rehberlik', 'yardım', 'geliştirmek'],
            affiliation: ['sevgi', 'bağ', 'yakınlık', 'güven', 'arkadaş', 'aile', 'paylaşmak'],
            power: ['korumak', 'yönlendirmek', 'söylemek', 'otoritie'],
            autonomy: ['ayrılık', 'kendi yolu', 'farklı']
        },
        hints: [
            'Bu kişiler birbirleriyle nasıl tanışmış?',
            'Konuşuyorlar mı, susuyorlar mı?',
            'Mutlu bir an mı, zor bir an mı?'
        ]
    },
    {
        id: 3,
        image: require('../../assets/storyimages/story_03.png'),
        placeholder: '🛤️',
        title: 'Yol Ayrımı',
        prompt: 'Bu kişi bir yol ayrımında. Hangi yolu seçecek? Neden?',
        themes: ['karar', 'seçim', 'belirsizlik', 'gelecek', 'yolculuk'],
        analysisKeys: {
            achievement: ['hedef', 'başarı', 'ulaşmak', 'ilerlemek', 'kazanmak'],
            affiliation: ['bekleyen', 'dönmek', 'özlemek'],
            power: ['cesaret', 'kararlı', 'güçlü', 'mücadele'],
            autonomy: ['özgür', 'kendi', 'bağımsız', 'seçim', 'karar', 'yol']
        },
        hints: [
            'Neden bu noktaya geldi?',
            'Hangi yolu seçecek ve neden?',
            'Geride ne bırakıyor, önünde ne var?'
        ]
    },
    {
        id: 4,
        image: require('../../assets/storyimages/story_04.png'),
        placeholder: '👨‍👩‍👧‍👦',
        title: 'Toplantı',
        prompt: 'Bu grup neden bir araya gelmiş? Aralarında neler oluyor?',
        themes: ['grup', 'topluluk', 'iletişim', 'uyum', 'çatışma'],
        analysisKeys: {
            achievement: ['proje', 'başarı', 'hedef', 'plan', 'çalışma'],
            affiliation: ['kutlama', 'birlik', 'paylaşım', 'arkadaş', 'aile', 'destek'],
            power: ['lider', 'yönetmek', 'söz', 'karar', 'etki'],
            autonomy: ['farklı', 'ayrı', 'kendi fikri']
        },
        hints: [
            'Bu bir kutlama mı, toplantı mı, tartışma mı?',
            'Herkes mutlu mu?',
            'Kim konuşuyor, kim dinliyor?'
        ]
    },
    {
        id: 5,
        image: require('../../assets/storyimages/story_05.png'),
        placeholder: '😔',
        title: 'Yalnız An',
        prompt: 'Bu kişi neden yalnız? Ne hissediyor? Hikayesini anlatın.',
        themes: ['yalnızlık', 'düşünce', 'dinlenme', 'üzüntü', 'huzur'],
        analysisKeys: {
            achievement: ['başarısızlık', 'hayal kırıklığı', 'yorgunluk', 'mola'],
            affiliation: ['özlem', 'yalnızlık', 'ayrılık', 'kayıp', 'hatıra'],
            power: ['güçsüz', 'çaresiz', 'pes', 'teslim'],
            autonomy: ['kendi', 'düşünce', 'iç', 'huzur', 'sessizlik']
        },
        hints: [
            'Neden bu durumda?',
            'Üzgün mü, dinleniyor mu, düşünüyor mu?',
            'Sonra ne olacak?'
        ]
    },
    {
        id: 6,
        image: require('../../assets/storyimages/story_06.png'),
        placeholder: '🏔️',
        title: 'Mücadele',
        prompt: 'Bu kişi neyin peşinde? Başarabilecek mi? Hikayesini anlatın.',
        themes: ['başarı', 'mücadele', 'hedef', 'zorluk', 'azim'],
        analysisKeys: {
            achievement: ['başarı', 'zirve', 'hedef', 'ulaşmak', 'kazanmak', 'çaba', 'azim'],
            affiliation: ['destek', 'alkış', 'takdir'],
            power: ['güç', 'irade', 'kararlılık', 'mücadele', 'yenmek'],
            autonomy: ['kendi', 'tek başına', 'bağımsız']
        },
        hints: [
            'Nereye ulaşmaya çalışıyor?',
            'Zorlanıyor mu, eğleniyor mu?',
            'Başarırsa ne hissedecek?'
        ]
    },
    {
        id: 7,
        image: require('../../assets/storyimages/story_07.png'),
        placeholder: '🏠',
        title: 'Evde',
        prompt: 'Bu evde neler oluyor? Bu insanlar birbirleriyle nasıl ilişkili?',
        themes: ['aile', 'ev', 'ilişki', 'günlük hayat', 'bağ'],
        analysisKeys: {
            achievement: ['sorumluluk', 'iş', 'görev', 'başarı'],
            affiliation: ['aile', 'sevgi', 'bağ', 'sıcaklık', 'birlik', 'paylaşım', 'destek'],
            power: ['otorite', 'kural', 'söz', 'karar'],
            autonomy: ['özgürlük', 'kendi odası', 'gizlilik']
        },
        hints: [
            'Bu ev nasıl bir ev?',
            'Burada yaşayanlar mutlu mu?',
            'Şu an ne konuşuyorlar veya yapıyorlar?'
        ]
    },
    {
        id: 8,
        image: require('../../assets/storyimages/story_08.png'),
        placeholder: '🌅',
        title: 'Ufka Bakış',
        prompt: 'Bu kişi ufka bakıyor. Ne düşünüyor? Geleceğinde ne var?',
        themes: ['gelecek', 'umut', 'düşünce', 'plan', 'huzur'],
        analysisKeys: {
            achievement: ['hayal', 'hedef', 'gelecek', 'plan', 'başarı'],
            affiliation: ['özlem', 'hatıra', 'beklenti', 'kavuşma'],
            power: ['özgür', 'güçlü', 'cesaret', 'yeni başlangıç'],
            autonomy: ['özgürlük', 'yeni', 'değişim', 'keşif', 'macera', 'yol']
        },
        hints: [
            'Neyi geride bırakıyor?',
            'Neyi bekliyor veya umut ediyor?',
            'Mutlu mu, hüzünlü mü, kararlı mı?'
        ]
    }
];

// Duygu analizi için kelime listeleri
export const sentimentWords = {
    positive: [
        'mutlu', 'sevinç', 'umut', 'başarı', 'sevgi', 'güven', 'huzur', 'neşe',
        'güzel', 'harika', 'muhteşem', 'keyif', 'gülümseme', 'kutlama', 'zafer',
        'kazanmak', 'başarmak', 'destek', 'arkadaş', 'aile', 'sıcak', 'rahat',
        'özgür', 'cesur', 'güçlü', 'kararlı', 'umutlu', 'heyecan', 'coşku'
    ],
    negative: [
        'üzgün', 'korkmuş', 'endişeli', 'yalnız', 'kayıp', 'başarısız', 'ağlamak',
        'korku', 'kaygı', 'stres', 'yorgun', 'bitkin', 'çaresiz', 'umutsuz',
        'hayal kırıklığı', 'pişmanlık', 'öfke', 'kızgın', 'sinir', 'kavga',
        'ayrılık', 'ölüm', 'hastalık', 'sorun', 'problem', 'zor', 'acı'
    ]
};

// Hikaye analizi yorumlama kriterleri
export const storyInterpretation = {
    themes: {
        achievement: "Başarı odaklı - hedefler ve kazanımlar sizin için önemli",
        affiliation: "İlişki odaklı - insanlarla bağ kurmak sizin için değerli",
        power: "Güç odaklı - etki ve kontrol sahibi olmak sizi motive ediyor",
        autonomy: "Bağımsızlık odaklı - özgürlük ve bireysellik sizin için kritik"
    },
    emotionalTone: {
        positive: "Olumlu bakış açısı - optimist ve umutlu bir yaklaşımınız var",
        negative: "Meydan okuma farkındalığı - zorlukların farkındasınız",
        neutral: "Dengeli perspektif - durumları objektif değerlendiriyorsunuz"
    },
    detailLevel: {
        high: "Detaylı anlatım - gözlem gücünüz ve hayal gücünüz gelişmiş",
        medium: "Dengeli anlatım - pratik ve yaratıcı arasında denge kuruyorsunuz",
        low: "Özet anlatım - konuya odaklı, pratik düşünce yapısı"
    }
};
