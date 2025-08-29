const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('Ts25091983.', 10);

    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });

    console.log('✅ Admin user created:', { id: admin.id, username: admin.username });

    // // Create team members (doctors)
    // const teamMembers = await Promise.all([
    //     prisma.team.create({
    //         data: {
    //             name: 'Dr. Mehmet Öztürk',
    //             title: 'Beyin ve Sinir Cerrahisi Uzmanı',
    //             bio: 'Omurga cerrahisi alanında 15 yıllık deneyime sahip. Minimal invaziv cerrahi tekniklerde uzman.',
    //             imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    //             order: 1,
    //         },
    //     }),
    //     prisma.team.create({
    //         data: {
    //             name: 'Dr. Ayşe Demir',
    //             title: 'Nöroşirurji Uzmanı',
    //             bio: 'Spinal tümör cerrahisi ve kompleks omurga deformiteleri konularında deneyimli.',
    //             imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    //             order: 2,
    //         },
    //     }),
    // ]);

    // console.log('✅ Team members created:', teamMembers.length);

    // // Create treatments
    // const treatments = await Promise.all([
    //     prisma.treatment.create({
    //         data: {
    //             title: 'Omurga Stabilizasyonu',
    //             slug: 'omurga-stabilizasyonu',
    //             summary: 'Modern tekniklerle omurga stabilizasyon cerrahisi',
    //             content: 'Omurga stabilizasyonu, hasarlı veya dengesiz omurga segmentlerinin sabitlenmesi için uygulanan cerrahi bir yöntemdir. Bu işlem, omurga kanalındaki basıyı azaltmak ve omurganın doğal pozisyonunu korumak amacıyla yapılır.',
    //             imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    //         },
    //     }),
    //     prisma.treatment.create({
    //         data: {
    //             title: 'Minimal İnvaziv Cerrahi',
    //             slug: 'minimal-invaziv-cerrahi',
    //             summary: 'Daha az kesi, daha hızlı iyileşme',
    //             content: 'Minimal invaziv omurga cerrahisi, geleneksel açık cerrahiye kıyasla daha küçük kesilerle gerçekleştirilen modern bir yaklaşımdır. Bu yöntem sayesinde hastalar daha az ağrı yaşar ve daha hızlı iyileşir.',
    //             imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop',
    //         },
    //     }),
    // ]);

    // console.log('✅ Treatments created:', treatments.length);

    // // Create a sponsor
    // const sponsor = await prisma.sponsor.create({
    //     data: {
    //         name: 'Medtronic',
    //         logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Medtronic.svg/320px-Medtronic.svg.png',
    //     },
    // });

    // console.log('✅ Sponsor created:', sponsor.name);

    // // Create a news item
    // const news = await prisma.news.create({
    //     data: {
    //         title: 'Yeni Tedavi Merkezimiz Açıldı',
    //         content: 'Modern teknoloji ile donatılmış yeni tedavi merkezimiz hastalarımızın hizmetinde. En son nesil cerrahi robotlar ve görüntüleme sistemleri ile daha başarılı operasyonlar gerçekleştiriyoruz.',
    //         imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop',
    //     },
    // });

    // console.log('✅ News created:', news.title);

    // // Create FAQ items
    // const faqs = await Promise.all([
    //     prisma.faq.create({
    //         data: {
    //             question: 'Omurga cerrahisi sonrası ne kadar sürede iyileşirim?',
    //             answer: 'İyileşme süresi ameliyatın tipine, hastanın yaşına ve genel sağlık durumuna göre değişir. Minimal invaziv cerrahilerde genellikle 2-4 hafta, büyük ameliyatlarda 6-12 hafta sürebilir.',
    //         },
    //     }),
    //     prisma.faq.create({
    //         data: {
    //             question: 'Ameliyat öncesi nasıl hazırlanmalıyım?',
    //             answer: 'Ameliyat öncesi detaylı bir değerlendirme yapılır. Sigara kullanıyorsanız bırakmanız, düzenli ilaçlarınızı doktorunuzla gözden geçirmeniz ve fiziksel olarak mümkün olduğunca fit olmanız önemlidir.',
    //         },
    //     }),
    // ]);

    // console.log('✅ FAQs created:', faqs.length);

    // console.log('🎉 Seeding completed successfully!');
    // console.log('⚠️  Default admin credentials: username: admin, password: change_me');
    // console.log('⚠️  Please change the admin password after first login!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
