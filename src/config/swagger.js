const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Anatolian Spine Clinic API',
            version: '1.0.0',
            description: 'Omurga Kliniği tanıtım sitesi için RESTful API dokümantasyonu',
            contact: {
                name: 'Anatolian Spine Clinic',
                email: 'info@anatolianspine.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                    description: 'Session cookie for admin authentication',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        ok: {
                            type: 'boolean',
                            example: false,
                        },
                        error: {
                            type: 'string',
                            example: 'Hata mesajı',
                        },
                    },
                },
                Success: {
                    type: 'object',
                    properties: {
                        ok: {
                            type: 'boolean',
                            example: true,
                        },
                        message: {
                            type: 'string',
                            example: 'İşlem başarılı',
                        },
                    },
                },
                Team: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Dr. Mehmet Öztürk',
                        },
                        title: {
                            type: 'string',
                            example: 'Beyin ve Sinir Cerrahisi Uzmanı',
                        },
                        bio: {
                            type: 'string',
                            example: 'Omurga cerrahisi alanında 15 yıllık deneyime sahip.',
                        },
                        imageUrl: {
                            type: 'string',
                            example: 'https://example.com/doctor.jpg',
                        },
                        order: {
                            type: 'integer',
                            example: 1,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Treatment: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: 'Omurga Stabilizasyonu',
                        },
                        slug: {
                            type: 'string',
                            example: 'omurga-stabilizasyonu',
                        },
                        summary: {
                            type: 'string',
                            example: 'Modern tekniklerle omurga stabilizasyon cerrahisi',
                        },
                        content: {
                            type: 'string',
                            example: 'Detaylı tedavi açıklaması...',
                        },
                        imageUrl: {
                            type: 'string',
                            example: 'https://example.com/treatment.jpg',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Project: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: 'Araştırma Projesi',
                        },
                        summary: {
                            type: 'string',
                            example: 'Proje özeti',
                        },
                        imageUrl: {
                            type: 'string',
                            example: 'https://example.com/project.jpg',
                        },
                        link: {
                            type: 'string',
                            example: 'https://example.com/project',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Sponsor: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'MedTech Solutions',
                        },
                        description: {
                            type: 'string',
                            example: 'Medikal teknoloji çözümleri konusunda lider şirket',
                        },
                        logo: {
                            type: 'string',
                            example: 'https://example.com/sponsors/medtech-logo.png',
                        },
                        logoUrl: {
                            type: 'string',
                            example: 'https://example.com/logo.jpg',
                        },
                        website: {
                            type: 'string',
                            example: 'https://medtech-solutions.com',
                        },
                        category: {
                            type: 'string',
                            enum: ['technology', 'pharmaceutical', 'equipment', 'education', 'research'],
                            example: 'technology',
                        },
                        status: {
                            type: 'string',
                            enum: ['active', 'inactive'],
                            example: 'active',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Research: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: 'Araştırma Başlığı',
                        },
                        content: {
                            type: 'string',
                            example: 'Araştırma içeriği',
                        },
                        imageUrl: {
                            type: 'string',
                            example: 'https://example.com/research.jpg',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                MediaItem: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: 'Minimal İnvaziv Lomber Füzyon Ameliyatı',
                        },
                        description: {
                            type: 'string',
                            example: 'Prof. Dr. Mehmet Yılmaz tarafından gerçekleştirilen minimal invaziv lomber füzyon ameliyatının detaylı anlatımı.',
                        },
                        content: {
                            type: 'string',
                            example: 'Medya içeriği',
                        },
                        type: {
                            type: 'string',
                            enum: ['video', 'image', 'podcast', 'webinar'],
                            example: 'video',
                        },
                        url: {
                            type: 'string',
                            example: 'https://youtube.com/watch?v=abc123xyz',
                        },
                        mediaUrl: {
                            type: 'string',
                            example: 'https://example.com/video.mp4',
                        },
                        thumbnail: {
                            type: 'string',
                            example: 'https://example.com/media/thumbnails/fusion-surgery.jpg',
                        },
                        publishDate: {
                            type: 'string',
                            example: '2024-03-15',
                        },
                        category: {
                            type: 'string',
                            enum: ['education', 'surgery', 'research', 'patient', 'conference'],
                            example: 'surgery',
                        },
                        status: {
                            type: 'string',
                            enum: ['published', 'draft', 'archived'],
                            example: 'published',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Innovation: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: 'Robotik Cerrahi Sistemi',
                        },
                        content: {
                            type: 'string',
                            example: '<p>Yeni nesil robotik cerrahi sistemi ile daha hassas ve güvenli operasyonlar gerçekleştiriyoruz...</p>',
                        },
                        type: {
                            type: 'string',
                            enum: ['podcast', 'video', 'article', 'research'],
                            example: 'podcast',
                        },
                        category: {
                            type: 'string',
                            enum: ['support', 'education', 'research', 'technology'],
                            example: 'support',
                        },
                        status: {
                            type: 'string',
                            enum: ['draft', 'published', 'archived'],
                            example: 'archived',
                        },
                        team: {
                            type: 'string',
                            example: 'Dr. Mehmet Yılmaz Ekibi',
                        },
                        startDate: {
                            type: 'string',
                            example: '2024-01-15',
                        },
                        image: {
                            type: 'string',
                            example: 'https://example.com/innovation-image.jpg',
                        },
                        tags: {
                            type: 'string',
                            example: 'robotik,cerrahi,teknoloji,inovasyon',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                News: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        title: {
                            type: 'string',
                            example: 'Haber Başlığı',
                        },
                        content: {
                            type: 'string',
                            example: 'Haber içeriği',
                        },
                        imageUrl: {
                            type: 'string',
                            example: 'https://example.com/news.jpg',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                Faq: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        question: {
                            type: 'string',
                            example: 'Omurga ameliyatı sonrası normal aktivitelere ne zaman dönebilirim?',
                        },
                        answer: {
                            type: 'string',
                            example: 'Ameliyat türüne bağlı olarak değişir. Minimal invaziv ameliyatlarda 2-4 hafta, açık ameliyatlarda 6-12 hafta sürebilir.',
                        },
                        category: {
                            type: 'string',
                            enum: ['general', 'treatment', 'appointment', 'surgery', 'payment', 'insurance'],
                            example: 'surgery',
                        },
                        order: {
                            type: 'integer',
                            example: 1,
                        },
                        status: {
                            type: 'string',
                            enum: ['active', 'inactive'],
                            example: 'active',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                ContactForm: {
                    type: 'object',
                    required: ['name', 'email', 'subject', 'message'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Ahmet Yılmaz',
                            minLength: 2,
                            maxLength: 100,
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'ahmet@example.com',
                        },
                        subject: {
                            type: 'string',
                            example: 'Randevu talebi',
                            minLength: 3,
                            maxLength: 200,
                        },
                        message: {
                            type: 'string',
                            example: 'Merhaba, randevu almak istiyorum.',
                            minLength: 10,
                            maxLength: 2000,
                        },
                    },
                },
                AppointmentForm: {
                    type: 'object',
                    required: ['name', 'email', 'phone', 'preferredDate'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Ayşe Demir',
                            minLength: 2,
                            maxLength: 100,
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'ayse@example.com',
                        },
                        phone: {
                            type: 'string',
                            example: '+90 555 123 4567',
                        },
                        preferredDate: {
                            type: 'string',
                            example: '2024-12-15 14:00',
                        },
                        message: {
                            type: 'string',
                            example: 'Ek notlar...',
                            maxLength: 1000,
                        },
                    },
                },
                LoginForm: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            example: 'admin',
                        },
                        password: {
                            type: 'string',
                            example: 'change_me',
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Auth',
                description: 'Admin kimlik doğrulama işlemleri',
            },
            {
                name: 'Team',
                description: 'Doktor ve ekip üyeleri yönetimi',
            },
            {
                name: 'Treatments',
                description: 'Tedavi yöntemleri yönetimi',
            },
            {
                name: 'Projects',
                description: 'Proje yönetimi',
            },
            {
                name: 'Sponsors',
                description: 'Sponsor yönetimi',
            },
            {
                name: 'Research',
                description: 'Araştırma yönetimi',
            },
            {
                name: 'Media',
                description: 'Medya içerikleri yönetimi',
            },
            {
                name: 'Innovation',
                description: 'İnovasyon yönetimi',
            },
            {
                name: 'News',
                description: 'Haber yönetimi',
            },
            {
                name: 'FAQ',
                description: 'Sık sorulan sorular yönetimi',
            },
            {
                name: 'Contact',
                description: 'İletişim formu',
            },
            {
                name: 'Appointment',
                description: 'Randevu formu',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;
