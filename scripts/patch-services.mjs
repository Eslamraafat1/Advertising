import fs from "fs";

const path = "app/lib/data.ts";
let c = fs.readFileSync(path, "utf8");

const arServices = `    servicesData: [
      { id: "photography", icon: "📷", title: "التصوير", shortDesc: "تصوير متميز للعلامات والمنتجات والتنفيذيين والفعاليات بإضاءة نظيفة وتسليم متسق.", price: "", fullDesc: "تصوير متميز للعلامات والمنتجات والتنفيذيين والفعاليات بإضاءة نظيفة وتسليم متسق.", features: [] },
      { id: "commercial", icon: "📺", title: "إنتاج الإعلانات التجارية", shortDesc: "إعلانات وأفلام حملات عالية التأثير من الفكرة إلى التصوير والتسليم النهائي.", price: "", fullDesc: "إعلانات وأفلام حملات عالية التأثير من الفكرة إلى التصوير والتسليم النهائي.", features: [] },
      { id: "post-production", icon: "✂️", title: "ما بعد الإنتاج والتسليم النهائي", shortDesc: "مونتاج، ألوان، صوت، mastering، ونسخ متعددة الصيغ تلبي مواصفات المنصات والبث.", price: "", fullDesc: "مونتاج، ألوان، صوت، mastering، ونسخ متعددة الصيغ تلبي مواصفات المنصات والبث.", features: [] },
      { id: "events", icon: "🎤", title: "تغطية الفعاليات والإنتاج المباشر", shortDesc: "تغطية متعددة الكامeras، بث مباشر، طائرات بدون طيار، ومontages في نفس اليوم للمؤتmerات والإطلاقات والحفلات.", price: "", fullDesc: "تغطية متعددة الكameras، بث مباشر، طائرات بدون طيار، ومontages في نفس اليوم للمؤتmerات والإطلاقات والحفلات.", features: [] },
      { id: "documentary", icon: "🎬", title: "إنتاج الأفلام الوثائقية", shortDesc: "أفلام وثائقية وسلاسل doc مبنية على البحث للمنصات والقنوات والمؤسسات.", price: "", fullDesc: "أفلام وثائقية وسلاسل doc مبنية على البحث للمنصات والقنوات والمؤسسات.", features: [] },
      { id: "on-ground-egypt", icon: "🇪🇬", title: "خدمات الإنتاج على أرض الواقع في مصر", shortDesc: "تصاريح، fixing، طاقم، معدات، لوجستيات، وlocation scouting للتصوير الدولي في مصر.", price: "", fullDesc: "تصاريح، fixing، طاقم، معدات، لوجستيات، وlocation scouting للتصوير الدولي في مصر.", features: [] },
      { id: "podcast", icon: "🎙️", title: "إنتاج البودكاست", shortDesc: "إنتاج بودكast صوتي ومرئي في الاستودio أو on location، مع montage ومقاطع للتوزيع.", price: "", fullDesc: "إنتاج بودكast صوتي ومرئي في الاستودio أو on location، مع montage ومقاطع للتوزيع.", features: [] },
      { id: "corporate", icon: "🏢", title: "المحتوى المؤسسي والصناعي", shortDesc: "أفلام مؤسسية واضحة وموثوقة للنفط والغاز والتعليم والعقارات والصناعات المعقدة.", price: "", fullDesc: "أفلام مؤسسية واضحة وموثوقة للنفط والغاز والتعليم والعقارات والصناعات المعقدة.", features: [] },
      { id: "tv-broadcast", icon: "📡", title: "إنتاج البرامج التلفزيونية والبث المباشر", shortDesc: "إنتاج استودio وميداني مع control room workflow وrun downs وحزم graphics وتسليم.", price: "", fullDesc: "إنتاج استودio وميداني مع control room workflow وrun downs وحزم graphics وتسليم.", features: [] },
      { id: "motion-cgi", icon: "✨", title: "الموشن CGI والمرئيات المدعومة بالذكاء الاصطناعي", shortDesc: "موشن 2D و3D وCGI ومرئيات بمساعدة AI لرفع السرد وشرح الأفكار المعقدة.", price: "", fullDesc: "موشن 2D و3D وCGI ومرئيات بمساعدة AI لرفع السرد وشرح الأفكار المعقدة.", features: [] },
      { id: "dubbing", icon: "🌐", title: "الدبلجة والتعليق الصوتي والتعريب", shortDesc: "ترجمة، تعليق صوتي، دبلجة، ADR، وتعبئة متعددة اللغات وفق معايير التسليم.", price: "", fullDesc: "ترجمة، تعليق صوتي، دبلجة، ADR، وتعبئة متعددة اللغات وفق معايير التسليم.", features: [] },
      { id: "marketing", icon: "📊", title: "حلول التسويق والأداء", shortDesc: "استراتيجية محتوى، media buying، اختبار إبداعي، وأنظمة حملات مبنية حول الإنتاج.", price: "", fullDesc: "استراتيجية محتوى، media buying، اختبار إبداعي، وأنظمة حملات مبنية حول الإنتاج.", features: [] },
    ],`;

const arPage = `    servicesPage: {
      badge: "خدماتنا",
      title: "خدماتنا",
      subtext: "استوديو إنتاج أفلام وفيديو متكامل في مصر ومنطقة الشرق الأوسط وشمال أفريقيا. اختر خدمة أدناه أو أرسل brief وسنوصي بالإعداد المناسب.",
      gridBadge: "خدماتنا",
      gridTitle: "اختر خدمة أدناه",
      quoteTitle: "احصل على عرض سعر",
      quoteSubtext: "أرسل brief وسنرد بالخطة المناسبة والخطوات التالية.",
      quoteEmailLabel: "البريد الإلكتروني",
      quoteEmail: "bendary@globaluntoldstory.com",
      quotePhoneLabel: "الهاتف وWhatsApp",
      quotePhone: "+20 100 129 9639",
      quoteForm: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        interestedIn: "مهتم بـ",
        message: "رسالة عن الخدمة",
        chooseService: "اختر خدمة",
        submit: "احصل على عرض سعر",
      },
      whyTitle: "لماذا The Untold Story?",
      whyList: [
        { icon: "🎬", title: "دورة إنتاج متكاملة", desc: "من التخطيط والتصوير إلى ما بعد الإنتاج والتعريب والتسليم النهائي." },
        { icon: "🌍", title: "المنطقة والعالم", desc: "مكاتب في مصر ودبي وجدة لخدمة العملاء حول العالم." },
        { icon: "🇪🇬", title: "إنتاج على أرض الواقع في مصر", desc: "تصاريح وطاقم ومعدات ولوجستيات ومواقع للتصوير الدولي." },
        { icon: "⚡", title: "تنفيذ منضبط", desc: "ميزانيات متوقعة، نتائج متميزة، وخطوات واضحة." },
      ],
      ctaTitle: "احصل على عرض سعر",
      ctaSub: "أرسل brief وسنرد بالخطة المناسبة والخطوات التالية.",
      ctaBtn: "احصل على عرض سعر",
    },`;

const idx1 = c.indexOf("  ar: {");
const idx2 = c.indexOf("    servicesData: [", idx1);
const idx3 = c.indexOf("    processData: {", idx2);
c = c.slice(0, idx2) + arServices + "\n" + c.slice(idx3);

const p1 = c.indexOf("    servicesPage: {", idx1);
const p2 = c.indexOf("    contactPage: {", p1);
c = c.slice(0, p1) + arPage + "\n" + c.slice(p2);

fs.writeFileSync(path, c);
console.log("patched");
