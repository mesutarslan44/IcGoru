// ZihinGücü Testi - Bilişsel Beceri Değerlendirmesi
// ÖZGÜN - Hiçbir lisanslı testten alıntı yapılmamıştır
// GETAP benzeri ama tamamen özgün içerik

export const cognitiveTestInfo = {
    name: 'ZihinGücü Testi',
    description: 'Bilişsel becerilerinizi 5 farklı alanda değerlendirin',
    icon: '🧩',
    color: '#9C27B0',
    duration: '15-20 dk',
    subtests: [
        { id: 'attention', name: 'Dikkat', icon: '👁️', color: '#FF5722' },
        { id: 'memory', name: 'Hafıza', icon: '🧠', color: '#2196F3' },
        { id: 'concentration', name: 'Konsantrasyon', icon: '🎯', color: '#4CAF50' },
        { id: 'reasoning', name: 'Mantık', icon: '🔗', color: '#9C27B0' },
        { id: 'speed', name: 'İşlem Hızı', icon: '⚡', color: '#FF9800' }
    ]
};

// 1. DİKKAT TESTİ
export const attentionQuestions = [
    {
        id: 'att_1',
        type: 'find_different',
        instruction: 'Farklı olanı bulun',
        timeLimit: 10,
        items: ['🔵', '🔵', '🔵', '🔴', '🔵', '🔵'],
        correctIndex: 3,
        difficulty: 1
    },
    {
        id: 'att_2',
        type: 'find_different',
        instruction: 'Farklı olanı bulun',
        timeLimit: 8,
        items: ['△', '△', '△', '△', '▽', '△', '△', '△'],
        correctIndex: 4,
        difficulty: 1
    },
    {
        id: 'att_3',
        type: 'find_different',
        instruction: 'Farklı olanı bulun',
        timeLimit: 8,
        items: ['😀', '😀', '😀', '😁', '😀', '😀'],
        correctIndex: 3,
        difficulty: 2
    },
    {
        id: 'att_4',
        type: 'count',
        instruction: "Kaç tane 'A' harfi var?",
        timeLimit: 12,
        text: 'BAACDAEFAGHAIAJKA',
        options: [4, 5, 6, 7],
        correctAnswer: 6,
        difficulty: 2
    },
    {
        id: 'att_5',
        type: 'count',
        instruction: "Kaç tane '7' rakamı var?",
        timeLimit: 10,
        text: '3741759787217',
        options: [3, 4, 5, 6],
        correctAnswer: 4,
        difficulty: 2
    },
    {
        id: 'att_6',
        type: 'sequence_error',
        instruction: 'Dizideki hatayı bulun',
        timeLimit: 12,
        sequence: ['1', '2', '3', '4', '6', '6', '7', '8'],
        correctIndex: 4, // 5 yerine 6 var
        difficulty: 3
    },
    {
        id: 'att_7',
        type: 'find_different',
        instruction: 'Farklı olanı bulun (dikkatli bakın)',
        timeLimit: 6,
        items: ['🟢', '🟢', '🟢', '🟢', '🟩', '🟢', '🟢', '🟢', '🟢'],
        correctIndex: 4,
        difficulty: 3
    },
    {
        id: 'att_8',
        type: 'count',
        instruction: "Kaç tane 'd' ve 'b' harfi toplam var?",
        timeLimit: 15,
        text: 'dbpqdbpqbdpqdbpq',
        options: [6, 8, 10, 12],
        correctAnswer: 8,
        difficulty: 3
    }
];

// 2. HAFIZA TESTİ
export const memoryQuestions = [
    {
        id: 'mem_1',
        type: 'number_sequence',
        instruction: 'Sayıları ezberleyin, sonra sırayla yazın',
        showTime: 4,
        sequence: [3, 7, 2, 9],
        difficulty: 1
    },
    {
        id: 'mem_2',
        type: 'number_sequence',
        instruction: 'Sayıları ezberleyin, sonra sırayla yazın',
        showTime: 5,
        sequence: [4, 1, 8, 5, 2],
        difficulty: 2
    },
    {
        id: 'mem_3',
        type: 'number_sequence',
        instruction: 'Sayıları ezberleyin, sonra TERSİNDEN yazın',
        showTime: 5,
        sequence: [6, 2, 9],
        reverse: true,
        difficulty: 2
    },
    {
        id: 'mem_4',
        type: 'image_recall',
        instruction: 'Resimleri ezberleyin, sonra hangilerini gördüğünüzü seçin',
        showTime: 6,
        shownImages: ['🏠', '🚗', '🌳', '☀️', '🐕'],
        allOptions: ['🏠', '🚗', '🌳', '☀️', '🐕', '🌙', '🐈', '🚀'],
        difficulty: 2
    },
    {
        id: 'mem_5',
        type: 'number_sequence',
        instruction: 'Sayıları ezberleyin, sonra sırayla yazın',
        showTime: 6,
        sequence: [6, 2, 9, 4, 1, 7],
        difficulty: 3
    },
    {
        id: 'mem_6',
        type: 'word_recall',
        instruction: 'Kelimeleri ezberleyin, sonra yazın',
        showTime: 8,
        words: ['Elma', 'Masa', 'Kitap', 'Deniz', 'Güneş', 'Kalem'],
        difficulty: 3
    },
    {
        id: 'mem_7',
        type: 'pattern_recall',
        instruction: 'Deseni ezberleyin, sonra aynısını seçin',
        showTime: 4,
        pattern: [1, 0, 1, 1, 0, 1, 0, 0, 1], // 3x3 grid
        difficulty: 3
    }
];

// 3. KONSANTRASYON TESTİ
export const concentrationQuestions = [
    {
        id: 'con_1',
        type: 'stroop',
        instruction: 'Kelimenin RENGİNİ söyleyin (yazılanı değil)',
        word: 'KIRMIZI',
        displayColor: '#2196F3', // mavi
        options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'],
        correctIndex: 1,
        difficulty: 1
    },
    {
        id: 'con_2',
        type: 'stroop',
        instruction: 'Kelimenin RENGİNİ söyleyin',
        word: 'YEŞİL',
        displayColor: '#F44336', // kırmızı
        options: ['Yeşil', 'Mavi', 'Kırmızı', 'Sarı'],
        correctIndex: 2,
        difficulty: 2
    },
    {
        id: 'con_3',
        type: 'stroop',
        instruction: 'Kelimenin RENGİNİ söyleyin',
        word: 'MAVİ',
        displayColor: '#4CAF50', // yeşil
        options: ['Mavi', 'Yeşil', 'Kırmızı', 'Turuncu'],
        correctIndex: 1,
        difficulty: 2
    },
    {
        id: 'con_4',
        type: 'stroop',
        instruction: 'Kelimenin RENGİNİ söyleyin',
        word: 'SARI',
        displayColor: '#9C27B0', // mor
        options: ['Sarı', 'Mor', 'Mavi', 'Kırmızı'],
        correctIndex: 1,
        difficulty: 3
    },
    {
        id: 'con_5',
        type: 'go_nogo',
        instruction: "'O' görünce BASIN, 'X' görünce BASMAYIN",
        sequence: ['O', 'O', 'X', 'O', 'X', 'X', 'O', 'O', 'X', 'O'],
        targetCount: 6, // O sayısı
        speed: 1200,
        difficulty: 2
    },
    {
        id: 'con_6',
        type: 'go_nogo',
        instruction: "'🟢' görünce BASIN, '🔴' görünce BASMAYIN",
        sequence: ['🟢', '🔴', '🟢', '🟢', '🔴', '🟢', '🔴', '🔴', '🟢', '🟢', '🔴', '🟢'],
        targetCount: 7,
        speed: 1000,
        difficulty: 3
    }
];

// 4. MANTIK TESTİ
export const reasoningQuestions = [
    {
        id: 'rea_1',
        type: 'number_pattern',
        instruction: 'Sıradaki sayı nedir?',
        sequence: [2, 4, 6, 8, '?'],
        options: [9, 10, 11, 12],
        correctIndex: 1,
        difficulty: 1
    },
    {
        id: 'rea_2',
        type: 'number_pattern',
        instruction: 'Sıradaki sayı nedir?',
        sequence: [1, 3, 5, 7, '?'],
        options: [8, 9, 10, 11],
        correctIndex: 1,
        difficulty: 1
    },
    {
        id: 'rea_3',
        type: 'number_pattern',
        instruction: 'Sıradaki sayı nedir?',
        sequence: [1, 2, 4, 8, '?'],
        options: [10, 12, 16, 32],
        correctIndex: 2,
        difficulty: 2
    },
    {
        id: 'rea_4',
        type: 'number_pattern',
        instruction: 'Sıradaki sayı nedir? (Fibonacci)',
        sequence: [1, 1, 2, 3, 5, 8, '?'],
        options: [10, 11, 12, 13],
        correctIndex: 3,
        difficulty: 3
    },
    {
        id: 'rea_5',
        type: 'analogy',
        instruction: 'Kuş - Uçmak :: Balık - ?',
        options: ['Koşmak', 'Yüzmek', 'Yürümek', 'Zıplamak'],
        correctIndex: 1,
        difficulty: 1
    },
    {
        id: 'rea_6',
        type: 'analogy',
        instruction: 'Göz - Görmek :: Kulak - ?',
        options: ['Koklamak', 'Duymak', 'Tatmak', 'Dokunmak'],
        correctIndex: 1,
        difficulty: 1
    },
    {
        id: 'rea_7',
        type: 'analogy',
        instruction: 'Doktor - Hastane :: Öğretmen - ?',
        options: ['Ofis', 'Fabrika', 'Okul', 'Mağaza'],
        correctIndex: 2,
        difficulty: 2
    },
    {
        id: 'rea_8',
        type: 'logic_puzzle',
        instruction: 'Ali, Ayşe\'den büyük. Ayşe, Mehmet\'ten büyük. En küçük kim?',
        options: ['Ali', 'Ayşe', 'Mehmet'],
        correctIndex: 2,
        difficulty: 2
    },
    {
        id: 'rea_9',
        type: 'logic_puzzle',
        instruction: 'Kedi köpekten hızlı. Köpek tavşandan yavaş. En hızlı hangisi?',
        options: ['Kedi', 'Köpek', 'Tavşan'],
        correctIndex: 2,
        difficulty: 3
    },
    {
        id: 'rea_10',
        type: 'shape_pattern',
        instruction: 'Sıradaki şekil hangisi?',
        sequence: ['○', '○○', '○○○', '?'],
        options: ['○○○', '○○○○', '○○', '○'],
        correctIndex: 1,
        difficulty: 2
    }
];

// 5. İŞLEM HIZI TESTİ
export const speedQuestions = [
    {
        id: 'spd_1',
        type: 'simple_math',
        instruction: 'Hızlıca cevaplayın',
        problem: '3 + 5 = ?',
        options: [7, 8, 9, 10],
        correctIndex: 1,
        timeLimit: 5,
        difficulty: 1
    },
    {
        id: 'spd_2',
        type: 'simple_math',
        instruction: 'Hızlıca cevaplayın',
        problem: '12 - 7 = ?',
        options: [4, 5, 6, 7],
        correctIndex: 1,
        timeLimit: 5,
        difficulty: 1
    },
    {
        id: 'spd_3',
        type: 'simple_math',
        instruction: 'Hızlıca cevaplayın',
        problem: '4 × 6 = ?',
        options: [20, 22, 24, 26],
        correctIndex: 2,
        timeLimit: 6,
        difficulty: 2
    },
    {
        id: 'spd_4',
        type: 'simple_math',
        instruction: 'Hızlıca cevaplayın',
        problem: '36 ÷ 4 = ?',
        options: [7, 8, 9, 10],
        correctIndex: 2,
        timeLimit: 6,
        difficulty: 2
    },
    {
        id: 'spd_5',
        type: 'simple_math',
        instruction: 'Hızlıca cevaplayın',
        problem: '7 + 8 - 3 = ?',
        options: [10, 11, 12, 13],
        correctIndex: 2,
        timeLimit: 7,
        difficulty: 2
    },
    {
        id: 'spd_6',
        type: 'simple_math',
        instruction: 'Hızlıca cevaplayın',
        problem: '15 × 3 = ?',
        options: [35, 40, 45, 50],
        correctIndex: 2,
        timeLimit: 7,
        difficulty: 3
    },
    {
        id: 'spd_7',
        type: 'comparison',
        instruction: 'Hangisi daha büyük?',
        optionA: '3 × 7',
        optionB: '4 × 5',
        correctAnswer: 'A', // 21 > 20
        timeLimit: 6,
        difficulty: 2
    },
    {
        id: 'spd_8',
        type: 'comparison',
        instruction: 'Hangisi daha büyük?',
        optionA: '48 ÷ 6',
        optionB: '7 + 2',
        correctAnswer: 'B', // 8 < 9
        timeLimit: 7,
        difficulty: 3
    }
];

// Tüm testleri birleştir
export const allCognitiveQuestions = {
    attention: attentionQuestions,
    memory: memoryQuestions,
    concentration: concentrationQuestions,
    reasoning: reasoningQuestions,
    speed: speedQuestions
};
