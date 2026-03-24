// Leke Yorumu Testi Verileri
// Orijinal Rorschach Görselleri - Public Domain

export const inkblotCards = [
    {
        id: 1,
        image: require('../../assets/inkblots/inkblot_01.png'),
        placeholder: '🦇',
        description: 'Simetrik siyah-beyaz leke',
        options: [
            { id: 'a', text: 'Yarasa veya kelebek', category: 'animal', score: { perception: 'whole', creativity: 1, anxiety: 0 } },
            { id: 'b', text: 'İki el veya pençe', category: 'body', score: { perception: 'detail', creativity: 2, anxiety: 1 } },
            { id: 'c', text: 'Melek veya koruyucu figür', category: 'human', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'd', text: 'Maske veya yüz', category: 'face', score: { perception: 'whole', creativity: 2, anxiety: 1 } },
            { id: 'e', text: 'Karanlık bir bulut', category: 'nature', score: { perception: 'whole', creativity: 1, anxiety: 2 } },
            { id: 'f', text: 'Hiçbir şey/Belirsiz', category: 'none', score: { perception: 'none', creativity: 0, anxiety: 2 } }
        ]
    },
    {
        id: 2,
        image: require('../../assets/inkblots/inkblot_02.png'),
        placeholder: '👥',
        description: 'Kırmızı detaylı leke',
        options: [
            { id: 'a', text: 'İki insan figürü', category: 'human', score: { perception: 'whole', creativity: 2, anxiety: 0, social: 2 } },
            { id: 'b', text: 'Kan lekeleri', category: 'abstract', score: { perception: 'color', creativity: 1, anxiety: 3 } },
            { id: 'c', text: 'Dans eden figürler', category: 'movement', score: { perception: 'whole', creativity: 3, anxiety: 0, social: 2 } },
            { id: 'd', text: 'Kelebekler', category: 'animal', score: { perception: 'detail', creativity: 2, anxiety: 0 } },
            { id: 'e', text: 'Kavga eden iki kişi', category: 'conflict', score: { perception: 'whole', creativity: 2, anxiety: 2, social: -1 } },
            { id: 'f', text: 'Ayna yansıması', category: 'abstract', score: { perception: 'whole', creativity: 2, anxiety: 1 } }
        ]
    },
    {
        id: 3,
        image: require('../../assets/inkblots/inkblot_03.png'),
        placeholder: '🎭',
        description: 'İki figür sahnesi',
        options: [
            { id: 'a', text: 'İki kişi bir şey yapıyor', category: 'human', score: { perception: 'whole', creativity: 2, anxiety: 0, social: 3 } },
            { id: 'b', text: 'Papyon veya fiyonk', category: 'object', score: { perception: 'detail', creativity: 2, anxiety: 0 } },
            { id: 'c', text: 'Kalpler', category: 'symbol', score: { perception: 'color', creativity: 2, anxiety: 0, emotional: 2 } },
            { id: 'd', text: 'İskelet veya kemikler', category: 'body', score: { perception: 'detail', creativity: 2, anxiety: 2 } },
            { id: 'e', text: 'Garsonlar veya hizmetçiler', category: 'human', score: { perception: 'whole', creativity: 3, anxiety: 0, social: 2 } },
            { id: 'f', text: 'Soyut şekiller', category: 'abstract', score: { perception: 'none', creativity: 1, anxiety: 1 } }
        ]
    },
    {
        id: 4,
        image: require('../../assets/inkblots/inkblot_04.png'),
        placeholder: '👹',
        description: 'Büyük koyu leke',
        options: [
            { id: 'a', text: 'Dev veya canavar', category: 'creature', score: { perception: 'whole', creativity: 2, anxiety: 2, authority: -2 } },
            { id: 'b', text: 'Hayvan postu veya deri', category: 'animal', score: { perception: 'whole', creativity: 2, anxiety: 1 } },
            { id: 'c', text: 'Ağaç veya bitki', category: 'nature', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'd', text: 'Robot veya makine', category: 'object', score: { perception: 'whole', creativity: 3, anxiety: 1 } },
            { id: 'e', text: 'Güçlü bir figür (baba/patron)', category: 'authority', score: { perception: 'whole', creativity: 2, anxiety: 1, authority: 2 } },
            { id: 'f', text: 'Karanlık gölge', category: 'shadow', score: { perception: 'whole', creativity: 1, anxiety: 3 } }
        ]
    },
    {
        id: 5,
        image: require('../../assets/inkblots/inkblot_05.png'),
        placeholder: '🦋',
        description: 'Basit simetrik leke',
        options: [
            { id: 'a', text: 'Yarasa', category: 'animal', score: { perception: 'whole', creativity: 1, anxiety: 0 } },
            { id: 'b', text: 'Kelebek', category: 'animal', score: { perception: 'whole', creativity: 1, anxiety: 0 } },
            { id: 'c', text: 'Güve', category: 'animal', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'd', text: 'Uçan kuş', category: 'animal', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'e', text: 'Melek kanatları', category: 'symbol', score: { perception: 'whole', creativity: 2, anxiety: 0, spiritual: 2 } },
            { id: 'f', text: 'Karanlık bir şekil', category: 'shadow', score: { perception: 'whole', creativity: 1, anxiety: 2 } }
        ]
    },
    {
        id: 6,
        image: require('../../assets/inkblots/inkblot_06.png'),
        placeholder: '🎻',
        description: 'Dikey uzun leke',
        options: [
            { id: 'a', text: 'Hayvan postu/kürk', category: 'animal', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'b', text: 'Totem direği', category: 'symbol', score: { perception: 'whole', creativity: 3, anxiety: 0, spiritual: 2 } },
            { id: 'c', text: 'Müzik aleti (keman)', category: 'object', score: { perception: 'whole', creativity: 3, anxiety: 0 } },
            { id: 'd', text: 'Omurga veya iskelet', category: 'body', score: { perception: 'detail', creativity: 2, anxiety: 2 } },
            { id: 'e', text: 'Tüylü bir şey', category: 'texture', score: { perception: 'texture', creativity: 2, anxiety: 0 } },
            { id: 'f', text: 'Karanlık geçit', category: 'space', score: { perception: 'space', creativity: 2, anxiety: 2 } }
        ]
    },
    {
        id: 7,
        image: require('../../assets/inkblots/inkblot_07.png'),
        placeholder: '👭',
        description: 'İki parçalı gri leke',
        options: [
            { id: 'a', text: 'İki kadın yüzü', category: 'human', score: { perception: 'whole', creativity: 2, anxiety: 0, social: 2, feminine: 2 } },
            { id: 'b', text: 'Bulutlar', category: 'nature', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'c', text: 'Periler veya melekler', category: 'fantasy', score: { perception: 'whole', creativity: 3, anxiety: 0, spiritual: 2 } },
            { id: 'd', text: 'İki çocuk', category: 'human', score: { perception: 'whole', creativity: 2, anxiety: 0, social: 2 } },
            { id: 'e', text: 'Maskeler', category: 'object', score: { perception: 'whole', creativity: 2, anxiety: 1 } },
            { id: 'f', text: 'Duman veya sis', category: 'nature', score: { perception: 'whole', creativity: 1, anxiety: 1 } }
        ]
    },
    {
        id: 8,
        image: require('../../assets/inkblots/inkblot_08.png'),
        placeholder: '🌸',
        description: 'Renkli leke',
        options: [
            { id: 'a', text: 'İki hayvan (aslan, kaplan)', category: 'animal', score: { perception: 'detail', creativity: 2, anxiety: 0 } },
            { id: 'b', text: 'Kelebekler', category: 'animal', score: { perception: 'whole', creativity: 2, anxiety: 0 } },
            { id: 'c', text: 'Anatomik görüntü (iç organlar)', category: 'body', score: { perception: 'color', creativity: 2, anxiety: 2 } },
            { id: 'd', text: 'Renkli çiçekler', category: 'nature', score: { perception: 'color', creativity: 3, anxiety: 0, emotional: 2 } },
            { id: 'e', text: 'Heraldik sembol/arma', category: 'symbol', score: { perception: 'whole', creativity: 3, anxiety: 0 } },
            { id: 'f', text: 'Soyut sanat', category: 'abstract', score: { perception: 'color', creativity: 2, anxiety: 0 } }
        ]
    },
    {
        id: 9,
        image: require('../../assets/inkblots/inkblot_09.png'),
        placeholder: '🔮',
        description: 'Karışık renkli leke',
        options: [
            { id: 'a', text: 'İnsan figürleri', category: 'human', score: { perception: 'whole', creativity: 2, anxiety: 1, social: 1 } },
            { id: 'b', text: 'Patlama veya ateş', category: 'nature', score: { perception: 'color', creativity: 2, anxiety: 2 } },
            { id: 'c', text: 'Deniz canlıları', category: 'animal', score: { perception: 'whole', creativity: 3, anxiety: 0 } },
            { id: 'd', text: 'Büyücüler veya cadılar', category: 'fantasy', score: { perception: 'whole', creativity: 3, anxiety: 1 } },
            { id: 'e', text: 'Çiçekler veya bitkiler', category: 'nature', score: { perception: 'color', creativity: 2, anxiety: 0 } },
            { id: 'f', text: 'Karmaşık/anlaşılmaz', category: 'none', score: { perception: 'none', creativity: 0, anxiety: 2 } }
        ]
    },
    {
        id: 10,
        image: require('../../assets/inkblots/inkblot_10.png'),
        placeholder: '🎆',
        description: 'En renkli ve karmaşık leke',
        options: [
            { id: 'a', text: 'Yengeçler veya böcekler', category: 'animal', score: { perception: 'detail', creativity: 2, anxiety: 0 } },
            { id: 'b', text: 'Deniz atları', category: 'animal', score: { perception: 'detail', creativity: 3, anxiety: 0 } },
            { id: 'c', text: 'Renkli çiçek bahçesi', category: 'nature', score: { perception: 'whole', creativity: 3, anxiety: 0, emotional: 2 } },
            { id: 'd', text: 'Havai fişekler', category: 'object', score: { perception: 'color', creativity: 3, anxiety: 0, emotional: 2 } },
            { id: 'e', text: 'Mikroplar veya hücreler', category: 'science', score: { perception: 'detail', creativity: 3, anxiety: 1 } },
            { id: 'f', text: 'Kaotik/düzensiz', category: 'chaos', score: { perception: 'none', creativity: 0, anxiety: 3 } }
        ]
    }
];

// Leke testi yorumlama kriterleri
export const inkblotInterpretation = {
    perception: {
        whole: "Bütünsel düşünme - olayları genel perspektiften değerlendiriyorsunuz",
        detail: "Detay odaklı - ayrıntılara dikkat ediyorsunuz",
        color: "Duygusal tepkisel - renk ve duygulara duyarlısınız",
        texture: "Duyusal farkındalık - dokunsal deneyimlere önem veriyorsunuz",
        space: "Mekansal zeka - boşlukları ve ilişkileri algılıyorsunuz",
        none: "Belirsizlikle başa çıkmada zorluk yaşayabilirsiniz"
    },
    categories: {
        human: "Sosyal ilgi - insan ilişkilerine önem veriyorsunuz",
        animal: "Temel içgüdüler - doğal ve pratik düşünce yapısı",
        nature: "Doğayla bağ - huzur ve denge arayışı",
        object: "Pratik zeka - somut düşünce yapısı",
        abstract: "Soyut düşünce - felsefi ve kavramsal bakış açısı",
        fantasy: "Hayal gücü - yaratıcı ve özgür düşünce",
        body: "Bedensel farkındalık - sağlık ve fiziksel kaygılar",
        symbol: "Sembolik düşünce - anlam arayışı",
        face: "Kişilik analizi - kendinizi ve başkalarını anlamaya çalışıyorsunuz",
        movement: "Dinamik düşünce - hareket ve değişime açıksınız",
        conflict: "İç çatışma - bazı gerilimler yaşıyor olabilirsiniz",
        creature: "Fantastik düşünce - hayal gücünüz güçlü",
        authority: "Otorite algısı - güç dinamiklerine duyarlısınız",
        shadow: "Bilinçaltı - iç dünyanıza ilgi duyuyorsunuz",
        texture: "Doku algısı - duyusal deneyimlere açıksınız",
        space: "Mekan algısı - boşluk ve yapı duygusu gelişmiş",
        science: "Bilimsel düşünce - analitik bakış açısı",
        chaos: "Belirsizlik - düzensizliğe karşı hassasiyet"
    },
    anxiety: {
        low: "Düşük kaygı seviyesi - genel olarak rahat ve huzurlusunuz",
        medium: "Orta kaygı seviyesi - normal stres tepkileri gösteriyorsunuz",
        high: "Yüksek kaygı belirtileri - stresle başa çıkma yöntemlerini geliştirmeniz faydalı olabilir"
    },
    creativity: {
        low: "Pratik ve geleneksel düşünce yapısı",
        medium: "Dengeli yaratıcılık - hem pratik hem yaratıcı olabilirsiniz",
        high: "Yüksek yaratıcılık - özgün ve yenilikçi düşünce yapısı"
    }
};
