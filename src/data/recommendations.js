// Detaylı Analiz ve Tavsiyeler
// Her sonuç için: İyi mi? Kötü mü? Analiz + Geliştirme Tavsiyeleri

export const oceanRecommendations = {
    openness: {
        high: {
            isPositive: true,
            title: '✨ Yüksek Açıklık - Güçlü Yön',
            analysis: 'Yeni fikirlere, sanata ve farklı bakış açılarına açıksınız. Yaratıcılığınız ve hayal gücünüz gelişmiş. Değişime kolayca uyum sağlarsınız.',
            strengths: [
                'Yaratıcı problem çözme yeteneği',
                'Sanatsal ve estetik duyarlılık',
                'Yeni deneyimlere açıklık',
                'Entelektüel merak'
            ],
            challenges: [
                'Bazen fazla hayalci olabilirsiniz',
                'Pratik konularda zorlanabilirsiniz',
                'Rutin işlerde sıkılabilirsiniz'
            ],
            recommendations: [
                '📚 Yaratıcılığınızı kullanın: Sanat, müzik veya yazarlık gibi alanlarda kendinizi ifade edin',
                '🌍 Yeni kültürler ve fikirler keşfedin - seyahat, kitaplar, belgeseller',
                '⚖️ Pratik becerilerinizi de geliştirin - bütçe yönetimi, planlama gibi',
                '🎯 Hayallerinizi somut hedeflere dönüştürmeyi öğrenin',
                '🧘 Meditasyon ve mindfulness ile içsel keşfinizi derinleştirin'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Dengeli Açıklık',
            analysis: 'Yeniliğe açık olmanız ile geleneksele bağlılığınız arasında sağlıklı bir denge var. Hem yaratıcı hem de pratik olabilirsiniz.',
            strengths: [
                'Duruma göre esnek olabilme',
                'Hem yenilikçi hem geleneksel düşünce',
                'Pratik yaratıcılık'
            ],
            challenges: [
                'Bazen kararsız kalabilirsiniz',
                'Tam potansiyelinizi kullanamayabilirsiniz'
            ],
            recommendations: [
                '🎨 Haftada bir yeni bir şey deneyin - hobi, yemek, aktivite',
                '📖 Farklı türlerde kitaplar okuyun',
                '💡 Beyin fırtınası yapmayı alışkanlık haline getirin',
                '🤝 Farklı düşünen insanlarla vakit geçirin'
            ]
        },
        low: {
            isPositive: null, // Context-dependent
            title: '🏠 Geleneksel ve Pratik',
            analysis: 'Denenenmiş ve kanıtlanmış yöntemleri tercih ediyorsunuz. Pratik ve ayakları yere basan bir yaklaşımınız var. Stabilite sizin için önemli.',
            strengths: [
                'Güvenilir ve tutarlı',
                'Pratik problem çözme',
                'Detaylara dikkat',
                'Sistematik çalışma'
            ],
            challenges: [
                'Değişime uyum zorluğu yaşayabilirsiniz',
                'Yaratıcı çözümler üretmekte zorlanabilirsiniz',
                'Yeni fırsatları kaçırabilirsiniz'
            ],
            recommendations: [
                '🌱 Küçük değişikliklerle başlayın - her ay yeni bir şey deneyin',
                '🎬 Farklı türlerde filmler izleyin, farklı müzikler dinleyin',
                '✍️ Günlük tutun ve hayal gücünüzü yazarak geliştirin',
                '🧩 Bulmaca ve strateji oyunları yaratıcılığı artırır',
                '👥 Yaratıcı insanlarla zaman geçirin - ilham alın'
            ]
        }
    },

    conscientiousness: {
        high: {
            isPositive: true,
            title: '🎯 Yüksek Sorumluluk - Güçlü Yön',
            analysis: 'Organize, disiplinli ve hedef odaklısınız. Görevlerinizi tamamlamakta kararlısınız. Güvenilir ve çalışkan birisi olarak tanınırsınız.',
            strengths: [
                'Mükemmel organizasyon becerileri',
                'Yüksek iş performansı',
                'Güvenilirlik ve tutarlılık',
                'Uzun vadeli hedeflere odaklanma'
            ],
            challenges: [
                'Mükemmeliyetçilik stresi',
                'Spontanlık eksikliği',
                'Aşırı çalışma riski (burnout)'
            ],
            recommendations: [
                '⏰ Kendinize "boş zaman" planlayın ve buna uyun',
                '🎲 Haftada bir plansız bir aktivite yapın',
                '💆 Stres yönetimi teknikleri öğrenin',
                '🤝 Başkalarına güvenmeyi ve iş delege etmeyi öğrenin',
                '⚖️ İş-yaşam dengesini öncelik haline getirin'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Dengeli Sorumluluk',
            analysis: 'Gerektiğinde organize ve disiplinli olabilirken, aynı zamanda esnek ve spontan da olabilirsiniz. Bu denge sağlıklıdır.',
            strengths: [
                'Duruma göre esneklik',
                'Hem planlı hem spontan olabilme',
                'Stres yönetimi'
            ],
            challenges: [
                'Bazen erteleme yapabilirsiniz',
                'Tutarlılık zorluğu'
            ],
            recommendations: [
                '📋 Basit "yapılacaklar listesi" kullanın',
                '🏆 Küçük hedefler koyup başarı hissi yaşayın',
                '⏰ Pomodoro tekniği gibi zaman yönetimi araçları deneyin',
                '📅 Haftalık plan yapma alışkanlığı edinin'
            ]
        },
        low: {
            isPositive: false,
            title: '🌊 Esnek ama Dağınık',
            analysis: 'Spontan ve esnek bir yapınız var ancak bu bazen organizasyon eksikliğine yol açabilir. Görevleri tamamlamakta zorlanabilirsiniz.',
            strengths: [
                'Yüksek esneklik',
                'Strese dayanıklılık',
                'Anlık fırsatları değerlendirebilme'
            ],
            challenges: [
                'Erteleme alışkanlığı',
                'Hedeflere ulaşmada zorluk',
                'Organizasyon eksikliği'
            ],
            recommendations: [
                '📱 Hatırlatıcı ve takvim uygulamaları kullanın',
                '🎯 Her gün sadece 3 öncelikli görev belirleyin',
                '⏰ "2 dakika kuralı" uygulayın - 2 dakikada yapılabilecek işi hemen yapın',
                '🏠 Çalışma alanınızı düzenli tutun',
                '👥 Size hesap sorabilecek bir "accountability buddy" bulun',
                '🏆 Küçük başarıları kutlayarak motivasyonunuzu artırın'
            ]
        }
    },

    extraversion: {
        high: {
            isPositive: true,
            title: '🌟 Yüksek Dışadönüklük',
            analysis: 'Sosyal, enerjik ve coşkulusunuz. İnsanlarla vakit geçirmekten enerji alırsınız. Liderlik potansiyeliniz yüksektir.',
            strengths: [
                'Güçlü iletişim becerileri',
                'Liderlik potansiyeli',
                'Geniş sosyal çevre',
                'Pozitif enerji'
            ],
            challenges: [
                'Yalnız kalmakta zorlanabilirsiniz',
                'Derin düşünme için zaman ayırmayabilirsiniz',
                'Başkalarını dinlemekte zorlanabilirsiniz'
            ],
            recommendations: [
                '🧘 Her gün 15 dakika sessiz, yalnız zaman ayırın',
                '👂 Aktif dinleme pratiği yapın',
                '📝 Günlük yazarak içsel düşüncelerinizi keşfedin',
                '🤫 Konuşmadan önce düşünmeyi alışkanlık haline getirin',
                '📚 Yalnız yapılan hobiler edinin (okuma, resim, müzik)'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Ambivert - Dengeli',
            analysis: 'Hem sosyal ortamlarda hem de yalnızken rahat hissedersiniz. Bu nadir ve değerli bir özelliktir. Duruma göre enerji modunuzu ayarlayabilirsiniz.',
            strengths: [
                'Yüksek adaptasyon yeteneği',
                'Hem dinleyici hem konuşmacı',
                'Denge ve esneklik'
            ],
            challenges: [
                'Bazen ne istediğinizi bilemeyebilirsiniz',
                'Kimlik karmaşası yaşayabilirsiniz'
            ],
            recommendations: [
                '✨ Bu dengeyi koruyun - çok değerli bir özellik',
                '📅 Sosyal ve yalnız zamanlarınızı dengeli planlayın',
                '🎭 Her iki modda da güçlü yönlerinizi keşfedin'
            ]
        },
        low: {
            isPositive: null,
            title: '🌙 İçedönük - Derin Düşünen',
            analysis: 'Yalnızlıktan enerji alırsınız. Derin düşünce ve konsantrasyon yeteneğiniz güçlüdür. Kaliteli ilişkileri tercih edersiniz.',
            strengths: [
                'Derin düşünme yeteneği',
                'Yüksek konsantrasyon',
                'Kaliteli, derin ilişkiler',
                'İyi dinleyici'
            ],
            challenges: [
                'Sosyal ortamlarda yorulabilirsiniz',
                'İlk izlenim oluşturmada zorlanabilirsiniz',
                'Networking zorluğu'
            ],
            recommendations: [
                '🔋 Sosyal etkinlikler öncesi ve sonrası dinlenme zamanı planlayın',
                '👥 Küçük grupları tercih edin',
                '💬 Bire-bir görüşmelerde güçlü yönlerinizi kullanın',
                '📧 Yazılı iletişimde (e-mail, mesaj) kendinizi ifade edin',
                '🎯 Networking yerine "değer katma" odaklı ilişkiler kurun'
            ]
        }
    },

    agreeableness: {
        high: {
            isPositive: true,
            title: '💚 Yüksek Uyumluluk',
            analysis: 'Empatik, yardımsever ve işbirlikçisiniz. Başkalarının ihtiyaçlarını önemsersiniz. Takım çalışmasında mükemmelsiniz.',
            strengths: [
                'Yüksek empati',
                'Güvenilirlik',
                'Takım çalışması becerisi',
                'Çatışma çözme yeteneği'
            ],
            challenges: [
                'Hayır demekte zorlanabilirsiniz',
                'Kendinizi ihmal edebilirsiniz',
                'Sömürüye açık olabilirsiniz'
            ],
            recommendations: [
                '🛡️ Sağlıklı sınırlar koymayı öğrenin',
                '💪 "Hayır" demeyi pratik edin - bu da bir yardımdır',
                '❤️ Kendinize de aynı şefkati gösterin (self-compassion)',
                '⚠️ Manipülatif davranışları tanımayı öğrenin',
                '📊 Kendi ihtiyaçlarınızı da öncelik listesine ekleyin'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Dengeli Uyumluluk',
            analysis: 'Hem işbirlikçi hem de kendi çıkarlarınızı koruyabilirsiniz. Bu sağlıklı bir dengedir.',
            strengths: [
                'Denge',
                'Duruma göre esneklik',
                'Sağlıklı sınırlar'
            ],
            challenges: [
                'Bazen tutarsız görünebilirsiniz'
            ],
            recommendations: [
                '✨ Bu dengeyi koruyun',
                '🤝 Win-win çözümler arayın',
                '📚 Müzakere becerilerinizi geliştirin'
            ]
        },
        low: {
            isPositive: null,
            title: '🦁 Rekabetçi ve Kararlı',
            analysis: 'Kendi çıkarlarınızı korumakta iyisiniz. Rekabetçi ve hedefe odaklısınız. Liderlik için gerekli kararlılığınız var.',
            strengths: [
                'Kararlılık',
                'Hedef odaklılık',
                'Manipülasyona dayanıklılık',
                'Liderlik potansiyeli'
            ],
            challenges: [
                'İlişkilerde zorlanabilirsiniz',
                'Soğuk veya bencil algılanabilirsiniz',
                'Takım çalışması zorluğu'
            ],
            recommendations: [
                '💚 Empati egzersizleri yapın - başkasının yerine kendinizi koyun',
                '👂 Aktif dinleme pratiği yapın',
                '🎁 Karşılıksız küçük iyilikler yapın',
                '📚 Duygusal zeka kitapları okuyun',
                '🤝 İşbirliğinin uzun vadeli faydalarını düşünün'
            ]
        }
    },

    neuroticism: {
        high: {
            isPositive: false,
            title: '⚡ Yüksek Duygusal Hassasiyet',
            analysis: 'Duygularınız yoğun ve strese karşı hassassınız. Bu zorlu olabilir ancak aynı zamanda derin bir duygusal zeka potansiyeli taşır.',
            strengths: [
                'Derin duygusal farkındalık',
                'Tehlikeleri önceden sezme',
                'Empati kapasitesi',
                'Sanatsal duyarlılık'
            ],
            challenges: [
                'Kaygı ve stres',
                'Olumsuz düşünce döngüleri',
                'Duygu düzenleme zorluğu'
            ],
            recommendations: [
                '🧘 Günlük meditasyon veya nefes egzersizleri yapın',
                '🏃 Düzenli egzersiz kaygıyı azaltır',
                '📓 Kaygı günlüğü tutun - düşüncelerinizi yazın',
                '💤 Kaliteli uyku önceliğiniz olsun (7-9 saat)',
                '🥗 Kafein ve şekeri azaltın',
                '💬 Bir terapist veya danışmanla görüşmeyi düşünün',
                '📱 Meditasyon uygulamaları kullanın (Headspace, Calm)',
                '🌳 Doğada zaman geçirin - yeşil terapi'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Dengeli Duygusallık',
            analysis: 'Stresle başa çıkabilirken aynı zamanda duygusal olarak bağlantıda kalabiliyorsunuz. Sağlıklı bir denge.',
            strengths: [
                'Duygusal denge',
                'Stres yönetimi',
                'Empati ve mantık dengesi'
            ],
            challenges: [
                'Yoğun dönemlerde zorlanabilirsiniz'
            ],
            recommendations: [
                '✨ Bu dengeyi korumak için wellness rutinlerine devam edin',
                '🧘 Stres arttığında meditasyona başvurun',
                '📊 Duygusal tetikleyicilerinizi tanıyın'
            ]
        },
        low: {
            isPositive: true,
            title: '🪨 Duygusal Stabilite - Güçlü Yön',
            analysis: 'Sakin, strese dayanıklı ve duygusal olarak stabilsiniz. Kriz anlarında soğukkanlılığınızı koruyabilirsiniz.',
            strengths: [
                'Strese dayanıklılık',
                'Sakinlik ve denge',
                'Kriz yönetimi',
                'Güvenilirlik'
            ],
            challenges: [
                'Başkalarının duygularını anlamakta zorlanabilirsiniz',
                'Soğuk algılanabilirsiniz'
            ],
            recommendations: [
                '💚 Başkalarının duygusal ihtiyaçlarına dikkat edin',
                '👂 Empati pratiği yapın',
                '🎭 Kendi duygularınızı ifade etmeyi de öğrenin',
                '🤗 Yakınlarınıza duygusal destek verin'
            ]
        }
    }
};

export const inkblotRecommendations = {
    creativity: {
        high: {
            isPositive: true,
            title: '🎨 Yüksek Yaratıcılık',
            analysis: 'Görsel uyarıcılarda özgün ve sıradışı şeyler görüyorsunuz. Hayal gücünüz güçlü.',
            recommendations: [
                '🎭 Sanatsal ifade yollarını keşfedin',
                '💡 Yaratıcı problem çözme gerektiren işler yapın',
                '📝 Yaratıcı yazarlık deneyin'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Dengeli Yaratıcılık',
            analysis: 'Hem yaratıcı hem pratik düşünebiliyorsunuz.',
            recommendations: [
                '🧩 Yaratıcılığınızı pratik projelerle birleştirin',
                '📚 Farklı sanat formlarını keşfedin'
            ]
        },
        low: {
            isPositive: null,
            title: '📐 Pratik ve Mantıksal',
            analysis: 'Somut ve geleneksel yorumlar yapıyorsunuz. Pratik düşünce yapısı.',
            recommendations: [
                '🎨 Haftada bir yaratıcı aktivite deneyin',
                '📖 Kurgu kitapları okuyun',
                '🧘 Serbest çağrışım meditasyonu yapın'
            ]
        }
    },
    anxiety: {
        high: {
            isPositive: false,
            title: '⚡ Yüksek Kaygı Belirtileri',
            analysis: 'Görsel yorumlarınızda kaygı işaretleri var. Stres yönetimi önemli.',
            recommendations: [
                '🧘 Günlük meditasyon yapın',
                '🏃 Düzenli egzersiz',
                '💬 Profesyonel destek düşünün',
                '📝 Kaygı tetikleyicilerinizi belirleyin',
                '🌿 Doğada zaman geçirin'
            ]
        },
        medium: {
            isPositive: true,
            title: '⚖️ Normal Kaygı Seviyesi',
            analysis: 'Günlük yaşamda normal stres tepkileri gösteriyorsunuz.',
            recommendations: [
                '✨ Mevcut wellness rutinlerinizi sürdürün',
                '🛡️ Stres yönetimi tekniklerini öğrenin'
            ]
        },
        low: {
            isPositive: true,
            title: '🪨 Düşük Kaygı - Sakin',
            analysis: 'Rahat ve huzurlu bir zihin yapınız var.',
            recommendations: [
                '👥 Kaygılı bireylere empati gösterin',
                '💚 Başkalarına destek olun'
            ]
        }
    },
    socialInterest: {
        high: {
            isPositive: true,
            title: '👥 Yüksek Sosyal İlgi',
            analysis: 'İnsan ilişkilerine ve sosyal dinamiklere odaklanıyorsunuz.',
            recommendations: [
                '🤝 Sosyal becerilerinizi kullanın',
                '💼 İnsan odaklı kariyerleri düşünün',
                '❤️ Gönüllü çalışmalara katılın'
            ]
        },
        low: {
            isPositive: null,
            title: '🌳 Düşük Sosyal Odak',
            analysis: 'Soyut kavramlar veya doğaya daha çok ilgi duyuyorsunuz.',
            recommendations: [
                '👥 Sosyal bağlantılarınızı güçlendirin',
                '🎭 Küçük sosyal etkinliklere katılın'
            ]
        }
    }
};

export const storyRecommendations = {
    achievement: {
        high: {
            isPositive: true,
            title: '🏆 Yüksek Başarı Motivasyonu',
            analysis: 'Hedefler koymak ve başarmak sizi motive ediyor. Kariyer odaklısınız.',
            recommendations: [
                '🎯 SMART hedefler koyun',
                '📈 İlerlemenizi takip edin',
                '🏋️ Zorlayıcı projeler üstlenin',
                '⚖️ İş-yaşam dengesini unutmayın'
            ]
        },
        low: {
            isPositive: null,
            title: '🌊 Düşük Başarı Odağı',
            analysis: 'Başarı sizin için öncelik değil. Süreç ve deneyimler daha önemli.',
            recommendations: [
                '🎯 Küçük hedeflerle başlayın',
                '🏆 Başarıyı kendi tanımınıza göre ölçün',
                '📊 İlerlemenizi kaydedin'
            ]
        }
    },
    affiliation: {
        high: {
            isPositive: true,
            title: '❤️ Yüksek İlişki İhtiyacı',
            analysis: 'İnsan ilişkileri sizin için çok önemli. Bağ kurmak sizi mutlu ediyor.',
            recommendations: [
                '👥 Kaliteli ilişkilere yatırım yapın',
                '💬 Derin sohbetler arayın',
                '🛡️ Sağlıklı sınırlar da önemli'
            ]
        },
        low: {
            isPositive: null,
            title: '🦅 Bağımsız',
            analysis: 'Kendi başınıza olmaktan hoşlanıyorsunuz.',
            recommendations: [
                '👥 Birkaç derin ilişkiyi koruyun',
                '🤝 İşbirliği becerilerinizi geliştirin'
            ]
        }
    },
    power: {
        high: {
            isPositive: null,
            title: '👑 Yüksek Güç Motivasyonu',
            analysis: 'Etki sahibi olmak ve liderlik etmek sizi motive ediyor.',
            recommendations: [
                '🎓 Liderlik eğitimi alın',
                '💚 Hizmetkar liderlik anlayışını benimseyin',
                '👂 Başkalarını da dinleyin'
            ]
        },
        low: {
            isPositive: true,
            title: '🤝 Düşük Güç İhtiyacı',
            analysis: 'Kontrol veya güç sizin için öncelik değil. İşbirlikçisiniz.',
            recommendations: [
                '✨ Bu özelliği koruyun',
                '💪 Gerektiğinde liderlik de yapabileceğinizi bilin'
            ]
        }
    },
    autonomy: {
        high: {
            isPositive: true,
            title: '🦅 Yüksek Bağımsızlık',
            analysis: 'Özgürlük ve kendi kararlarınızı vermek sizin için çok önemli.',
            recommendations: [
                '💼 Bağımsız çalışma fırsatları arayın',
                '🏠 Freelance veya girişimcilik düşünün',
                '🤝 Takım çalışması becerilerini de ihmal etmeyin'
            ]
        },
        low: {
            isPositive: null,
            title: '🤝 Takım Odaklı',
            analysis: 'Yapılandırılmış ortamlarda ve takımla çalışmayı tercih ediyorsunuz.',
            recommendations: [
                '🦅 Bazen bağımsız kararlar almayı deneyin',
                '💡 Kendi fikirlerinizi ifade edin'
            ]
        }
    }
};

// Genel Tavsiyeler ve Kaynaklar
export const generalRecommendations = {
    books: [
        { title: 'Duygusal Zeka - Daniel Goleman', category: 'duygusal gelişim' },
        { title: 'Atomik Alışkanlıklar - James Clear', category: 'alışkanlık' },
        { title: 'Sessiz Güç - Susan Cain', category: 'içedönüklük' },
        { title: 'Mindset - Carol Dweck', category: 'büyüme zihniyeti' }
    ],
    apps: [
        { name: 'Headspace', purpose: 'Meditasyon' },
        { name: 'Calm', purpose: 'Uyku ve rahatlama' },
        { name: 'Todoist', purpose: 'Görev yönetimi' },
        { name: 'Forest', purpose: 'Odaklanma' }
    ],
    practices: [
        '🧘 Günde 10 dakika meditasyon',
        '📓 Günlük tutma (journaling)',
        '🏃 Haftada 3 gün egzersiz',
        '📚 Ayda en az 1 kitap okuma',
        '😴 Düzenli uyku (7-9 saat)',
        '🥗 Dengeli beslenme',
        '🌳 Doğada zaman geçirme'
    ]
};
