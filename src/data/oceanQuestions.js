// IPIP Big Five 50 Soru - Türkçe
// Public Domain - Ücretsiz Kullanım

export const oceanQuestions = [
    // EXTRAVERSION (Dışadönüklük) - E
    { id: 1, text: "Partilerin neşe kaynağıyımdır.", factor: "E", direction: "+" },
    { id: 2, text: "İnsanlarla konuşmaktan pek hoşlanmam.", factor: "E", direction: "-" },
    { id: 3, text: "Etrafımda birçok insan olduğunda kendimi rahat hissederim.", factor: "E", direction: "+" },
    { id: 4, text: "Arka planda kalmayı tercih ederim.", factor: "E", direction: "-" },
    { id: 5, text: "Sohbeti başlatan genellikle benim.", factor: "E", direction: "+" },
    { id: 6, text: "Söyleyecek fazla bir şeyim yoktur.", factor: "E", direction: "-" },
    { id: 7, text: "Farklı insanlarla konuşurum.", factor: "E", direction: "+" },
    { id: 8, text: "İlgi odağı olmaktan hoşlanmam.", factor: "E", direction: "-" },
    { id: 9, text: "Yabancılarla kolayca iletişim kurarım.", factor: "E", direction: "+" },
    { id: 10, text: "Sosyal toplantılarda sessiz kalırım.", factor: "E", direction: "-" },

    // AGREEABLENESS (Uyumluluk) - A
    { id: 11, text: "Başkalarının duygularına ilgi duyarım.", factor: "A", direction: "+" },
    { id: 12, text: "Başkalarının sorunlarıyla pek ilgilenmem.", factor: "A", direction: "-" },
    { id: 13, text: "İnsanların kendilerini rahat hissetmelerini sağlarım.", factor: "A", direction: "+" },
    { id: 14, text: "Başkalarını aşağılarım.", factor: "A", direction: "-" },
    { id: 15, text: "Başkalarının duygularını hissederim.", factor: "A", direction: "+" },
    { id: 16, text: "İnsanlara sert davranırım.", factor: "A", direction: "-" },
    { id: 17, text: "Herkese zaman ayırırım.", factor: "A", direction: "+" },
    { id: 18, text: "Başkalarına hakaret ederim.", factor: "A", direction: "-" },
    { id: 19, text: "Yumuşak kalpli biriyim.", factor: "A", direction: "+" },
    { id: 20, text: "Başkalarının refahıyla pek ilgilenmem.", factor: "A", direction: "-" },

    // CONSCIENTIOUSNESS (Sorumluluk) - C
    { id: 21, text: "Her zaman hazırlıklıyımdır.", factor: "C", direction: "+" },
    { id: 22, text: "Eşyalarımı ortalıkta bırakırım.", factor: "C", direction: "-" },
    { id: 23, text: "Detaylara dikkat ederim.", factor: "C", direction: "+" },
    { id: 24, text: "İşleri berbat ederim.", factor: "C", direction: "-" },
    { id: 25, text: "İşleri hemen hallederim.", factor: "C", direction: "+" },
    { id: 26, text: "Genellikle eşyalarımı yerine koymayı unuturum.", factor: "C", direction: "-" },
    { id: 27, text: "Düzeni severim.", factor: "C", direction: "+" },
    { id: 28, text: "Sorumluluklarımdan kaçarım.", factor: "C", direction: "-" },
    { id: 29, text: "Bir programa bağlı kalırım.", factor: "C", direction: "+" },
    { id: 30, text: "Detaylarla uğraşmaktan hoşlanmam.", factor: "C", direction: "-" },

    // NEUROTICISM (Duygusal Dengesizlik) - N
    { id: 31, text: "Kolayca strese girerim.", factor: "N", direction: "+" },
    { id: 32, text: "Çoğu zaman rahatımdır.", factor: "N", direction: "-" },
    { id: 33, text: "Küçük şeyler için endişelenirim.", factor: "N", direction: "+" },
    { id: 34, text: "Nadiren üzgün hissederim.", factor: "N", direction: "-" },
    { id: 35, text: "Kolayca rahatsız olurum.", factor: "N", direction: "+" },
    { id: 36, text: "Kolayca kızgınlaşmam.", factor: "N", direction: "-" },
    { id: 37, text: "Ruh halim sık sık değişir.", factor: "N", direction: "+" },
    { id: 38, text: "Duygusal iniş çıkışlar yaşamam.", factor: "N", direction: "-" },
    { id: 39, text: "Sık sık melankolik olurum.", factor: "N", direction: "+" },
    { id: 40, text: "Kolayca paniklemem.", factor: "N", direction: "-" },

    // OPENNESS (Deneyime Açıklık) - O
    { id: 41, text: "Zengin bir kelime dağarcığım vardır.", factor: "O", direction: "+" },
    { id: 42, text: "Soyut fikirleri anlamakta zorlanırım.", factor: "O", direction: "-" },
    { id: 43, text: "Canlı bir hayal gücüm vardır.", factor: "O", direction: "+" },
    { id: 44, text: "Soyut fikirlerle ilgilenmem.", factor: "O", direction: "-" },
    { id: 45, text: "Mükemmel fikirlerim vardır.", factor: "O", direction: "+" },
    { id: 46, text: "İyi bir hayal gücüm yoktur.", factor: "O", direction: "-" },
    { id: 47, text: "Olayları çabuk kavrarım.", factor: "O", direction: "+" },
    { id: 48, text: "Zor kelimeleri kullanmaktan kaçınırım.", factor: "O", direction: "-" },
    { id: 49, text: "Düşünmek ve olaylar üzerine kafa yormak için zaman harcarım.", factor: "O", direction: "+" },
    { id: 50, text: "Fikirlerle dolu değilimdir.", factor: "O", direction: "-" }
];

// Cevap seçenekleri
export const answerOptions = [
    { value: 1, label: "Kesinlikle Katılmıyorum", emoji: "😤" },
    { value: 2, label: "Katılmıyorum", emoji: "😕" },
    { value: 3, label: "Kararsızım", emoji: "😐" },
    { value: 4, label: "Katılıyorum", emoji: "🙂" },
    { value: 5, label: "Kesinlikle Katılıyorum", emoji: "😊" }
];

// Faktör açıklamaları
export const factorDescriptions = {
    E: {
        name: "Dışadönüklük",
        icon: "🎭",
        color: "#FF6B6B",
        high: "Sosyal, enerjik, konuşkan ve canlısınız. İnsanlarla vakit geçirmekten enerji alıyorsunuz.",
        low: "İçedönük, sakin ve bağımsızsınız. Kendi başınıza vakit geçirmekten keyif alıyorsunuz.",
        medium: "Hem sosyal ortamlardan hem de yalnız kalınca keyif alabiliyorsunuz. Dengelisiniz."
    },
    A: {
        name: "Uyumluluk",
        icon: "🤝",
        color: "#4ECDC4",
        high: "İşbirlikçi, güvenilir ve yardımseversiniz. Başkalarının ihtiyaçlarını önemsiyorsunuz.",
        low: "Rekabetçi, şüpheci ve eleştirelsiniz. Kendi çıkarlarınızı öncelikli tutuyorsunuz.",
        medium: "Hem işbirliği yapabilir hem de gerektiğinde rekabet edebilirsiniz."
    },
    C: {
        name: "Sorumluluk",
        icon: "📋",
        color: "#45B7D1",
        high: "Disiplinli, organize ve güvenilirsiniz. Hedeflerinize ulaşmak için planlı çalışıyorsunuz.",
        low: "Esnek, spontan ve rahat bir yapınız var. Kurallara bağlı kalmaktan hoşlanmıyorsunuz.",
        medium: "Hem planlı olabiliyor hem de anlık kararlar verebiliyorsunuz."
    },
    N: {
        name: "Duygusal Denge",
        icon: "⚖️",
        color: "#96CEB4",
        high: "Duygusal dalgalanmalar yaşayabiliyorsunuz. Strese karşı hassassınız.",
        low: "Duygusal olarak dengeli ve sakinsiniz. Stresle iyi başa çıkıyorsunuz.",
        medium: "Duygusal tepkileriniz genellikle ölçülü ve dengelidir."
    },
    O: {
        name: "Deneyime Açıklık",
        icon: "🎨",
        color: "#DDA0DD",
        high: "Yaratıcı, meraklı ve yeniliklere açıksınız. Soyut düşüncelerden keyif alıyorsunuz.",
        low: "Pratik, geleneksel ve somut düşüncelerden hoşlanıyorsunuz.",
        medium: "Hem yeni fikirlere açık hem de geleneklere saygılısınız."
    }
};
