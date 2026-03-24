// Testler Hakkında Bilgiler
// Tarihçe, kim buldu, ne zaman, kim için, neden kullanılır

export const testInfo = {
    ocean: {
        name: 'OCEAN / Big Five Kişilik Testi',
        icon: '🧠',
        color: '#667eea',
        history: {
            origin: 'Big Five modeli, 1960\'larda başlayan araştırmalara dayanır. Ernest Tupes ve Raymond Christal ilk çalışmaları yapmış, ardından Paul Costa ve Robert McCrae 1980\'lerde modeli geliştirmiştir.',
            year: '1960-1990',
            developers: 'Lewis Goldberg, Paul Costa, Robert McCrae',
            country: 'Amerika Birleşik Devletleri'
        },
        purpose: {
            why: 'Kişilik özelliklerini bilimsel olarak ölçmek ve karşılaştırmak için geliştirilmiştir.',
            who: 'Psikologlar, insan kaynakları uzmanları, kariyer danışmanları ve araştırmacılar tarafından kullanılır.',
            when: 'İşe alım süreçleri, kariyer yönlendirme, kişisel gelişim ve akademik araştırmalarda uygulanır.'
        },
        howItWorks: {
            title: 'Nasıl Çalışır?',
            description: 'Test, size çeşitli ifadeler sunar. Her ifadeye ne kadar katıldığınızı belirtirsiniz. Cevaplarınız 5 temel kişilik boyutunda analiz edilir.',
            factors: [
                { name: 'Openness (Açıklık)', desc: 'Yeni deneyimlere, fikirlere ve sanata açıklık' },
                { name: 'Conscientiousness (Sorumluluk)', desc: 'Düzen, disiplin ve hedef odaklılık' },
                { name: 'Extraversion (Dışadönüklük)', desc: 'Sosyallik, enerji ve coşku düzeyi' },
                { name: 'Agreeableness (Uyumluluk)', desc: 'İş birliği, güven ve yardımseverlik' },
                { name: 'Neuroticism (Nevrotiklik)', desc: 'Duygusal denge ve stres tepkisi' }
            ]
        },
        scientificValidity: 'Big Five, en çok araştırılan ve bilimsel olarak desteklenen kişilik modellerinden biridir. Binlerce akademik çalışmada kullanılmış ve kültürler arası geçerliliği kanıtlanmıştır.',
        tips: [
            'Sorulara içgüdüsel olarak cevap verin',
            'Çok fazla düşünmeyin, ilk tepkiniz en doğrusudur',
            'Kendinizi olduğunuz gibi, olmak istediğiniz gibi değil değerlendirin',
            'Her seçenek eşit değerlidir, doğru veya yanlış yoktur'
        ]
    },

    inkblot: {
        name: 'Rorschach Leke Testi',
        icon: '🎨',
        color: '#11998e',
        history: {
            origin: 'İsviçreli psikiyatrist Hermann Rorschach tarafından 1921\'de geliştirilmiştir. Rorschach, hastaların mürekkep lekelerini nasıl yorumladığını gözlemleyerek kişilik özelliklerini anlamaya çalışmıştır.',
            year: '1921',
            developers: 'Hermann Rorschach',
            country: 'İsviçre'
        },
        purpose: {
            why: 'Bilinçaltı düşünce kalıplarını, duygusal tepkileri ve kişilik özelliklerini ortaya çıkarmak için tasarlanmıştır.',
            who: 'Klinik psikologlar ve psikiyatristler tarafından tanı süreçlerinde kullanılır.',
            when: 'Kişilik değerlendirmesi, duygusal sorunların tespiti ve terapi süreçlerinde uygulanır.'
        },
        howItWorks: {
            title: 'Nasıl Çalışır?',
            description: 'Size simetrik mürekkep lekeleri gösterilir. Her lekede ne gördüğünüzü söylersiniz. Yanıtlarınız algı, yaratıcılık ve duygusal durumunuz hakkında ipuçları verir.',
            factors: [
                { name: 'Bütün/Detay Algısı', desc: 'Resmi bir bütün olarak mı, detaylarıyla mı görüyorsunuz?' },
                { name: 'Hareket', desc: 'Hareketli mi durağan mı şeyler görüyorsunuz?' },
                { name: 'Renk Tepkisi', desc: 'Renklere nasıl tepki veriyorsunuz?' },
                { name: 'Form Kalitesi', desc: 'Gördükleriniz yaygın mı yoksa özgün mü?' }
            ]
        },
        scientificValidity: 'Rorschach testi tartışmalı bir geçmişe sahiptir. Bazı psikologlar geçerliliğini sorgularken, Exner Kapsamlı Sistemi gibi standartlaştırılmış yöntemler güvenilirliği artırmıştır.',
        tips: [
            'Gördüğünüz ilk şeyi söyleyin',
            'Doğru veya yanlış cevap yoktur',
            'Hayal gücünüzü kullanmaktan çekinmeyin',
            'Her lekeye farklı bir şekilde bakabilirsiniz'
        ],
        funFact: 'Orijinal 10 Rorschach lekesi 1921\'den beri değişmeden kullanılmaktadır ve artık telif hakkı serbest (public domain) olduğu için herkes tarafından görüntülenebilir.'
    },

    story: {
        name: 'Tematik Algı Testi (TAT Tarzı)',
        icon: '📖',
        color: '#f5576c',
        history: {
            origin: 'Henry Murray ve Christiana Morgan tarafından 1935\'te Harvard Psikoloji Kliniğinde geliştirilmiştir. Test, belirsiz resimlerden hikayeler anlatmaya dayanır.',
            year: '1935',
            developers: 'Henry Murray, Christiana Morgan',
            country: 'Amerika Birleşik Devletleri'
        },
        purpose: {
            why: 'Kişinin iç dünyasını, motivasyonlarını, ihtiyaçlarını ve çatışmalarını ortaya çıkarmak için tasarlanmıştır.',
            who: 'Klinik psikologlar, danışmanlar ve araştırmacılar tarafından kullanılır.',
            when: 'Kişilik değerlendirmesi, motivasyon analizi ve terapi süreçlerinde uygulanır.'
        },
        howItWorks: {
            title: 'Nasıl Çalışır?',
            description: 'Size belirsiz sahneler gösteren resimler sunulur. Her resim hakkında bir hikaye yazarsınız. Hikayeleriniz motivasyonlarınız ve iç dünyanız hakkında bilgi verir.',
            factors: [
                { name: 'Başarı Motivasyonu', desc: 'Hedeflere ulaşma ve başarılı olma isteği' },
                { name: 'İlişki İhtiyacı', desc: 'Sosyal bağ ve yakınlık ihtiyacı' },
                { name: 'Güç Motivasyonu', desc: 'Etki ve kontrol sahibi olma isteği' },
                { name: 'Bağımsızlık', desc: 'Özerklik ve bireysellik ihtiyacı' }
            ]
        },
        scientificValidity: 'TAT, projektif testler arasında en yaygın kullanılanlardan biridir. Özellikle motivasyon araştırmalarında (McClelland\'ın başarı motivasyonu çalışmaları) değerli bulunmuştur.',
        tips: [
            'Hayal gücünüzü serbest bırakın',
            'En az 3-4 cümle yazın',
            'Karakterlerin ne hissettiğini, ne düşündüğünü anlatın',
            'Hikayenin başını, ortasını ve sonunu düşünün',
            'Aklınıza gelen ilk şeyleri yazın, sansür yapmayın'
        ],
        funFact: 'Murray\'in İhtiyaçlar Teorisi, TAT ile yapılan araştırmalara dayanır ve 20\'den fazla temel insani ihtiyacı tanımlar.'
    }
};

export const generalInfo = {
    disclaimer: 'Bu uygulama eğlence ve kendini keşfetme amaçlıdır. Profesyonel psikolojik değerlendirme veya teşhis yerine geçmez. Ciddi kaygılarınız varsa bir uzmana danışmanızı öneririz.',

    aboutProjectiveTests: {
        title: 'Projektif Testler Nedir?',
        description: 'Projektif testler, belirsiz uyarıcılar (lekeler, resimler) kullanarak kişinin iç dünyasını ortaya çıkarmayı amaçlar. Temel varsayım, belirsiz bir uyarıcıya verdiğimiz tepkilerin bilinçaltı düşüncelerimizi yansıttığıdır.',
        history: 'Projektif testlerin kökeni Freud\'un psikanaliz teorisine dayanır. "Projeksiyon" kavramı, kendi düşünce ve duygularımızı dış dünyaya yansıtmamızı ifade eder.'
    },

    aboutPersonalityTests: {
        title: 'Kişilik Testleri Nedir?',
        description: 'Kişilik testleri, bireylerin davranış kalıplarını, tercihlerini ve duygusal tepkilerini ölçmeye çalışır. Bu testler, kendimizi daha iyi anlamamıza ve güçlü/zayıf yönlerimizi keşfetmemize yardımcı olur.',
        types: [
            { name: 'Öz-bildirim Testleri', desc: 'Kişinin kendisi hakkında sorulara cevap verdiği testler (ör. OCEAN)' },
            { name: 'Projektif Testler', desc: 'Belirsiz uyarıcılara verilen tepkileri analiz eden testler (ör. Rorschach)' },
            { name: 'Davranışsal Testler', desc: 'Kişinin gerçek davranışlarının gözlemlenmesine dayalı testler' }
        ]
    },

    tips: {
        title: 'Testleri Yaparken Dikkat Edilecekler',
        items: [
            'Samimi ve dürüst olun',
            'İlk tepkinize güvenin',
            'Çok fazla düşünmeyin',
            'Sessiz ve rahat bir ortamda yapın',
            'Sonuçları mutlak gerçek olarak görmeyin',
            'Eğlenmek için yapın, stres yapmayın'
        ]
    }
};
