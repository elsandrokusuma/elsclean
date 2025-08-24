import { db, type BlogPost, type BlogContentBlock } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, addDoc, query, where, limit } from 'firebase/firestore';

// In a real app, this data would likely come from a CMS or database
const initialBlogPosts: Omit<BlogPost, 'id'>[] = [
  {
    slug: "merawat-sneakers-putih",
    title: "5 Cara Merawat Sepatu Sneakers Putih Agar Tetap Kinclong",
    description: "Jaga sneakers putih kesayanganmu agar tidak menguning dengan tips mudah ini.",
    image: "https://i.imgur.com/rx25vM6.gif",
    imageHint: "clean white shoes",
    author: "Tim elsclean.id",
    date: "18 Juli 2024",
    content: [
        { type: 'paragraph', text: 'Sneakers putih adalah item fashion yang wajib dimiliki, namun merawatnya bisa menjadi tantangan tersendiri. Warna putih yang rentan kotor dan menguning seringkali membuat pemiliknya was-was. Tapi jangan khawatir, dengan perawatan yang tepat, sneakers putih Anda bisa tetap terlihat seperti baru. Berikut adalah 5 cara efektif untuk merawatnya.' },
        { type: 'heading', text: '1. Bersihkan Secara Teratur' },
        { type: 'paragraph', text: 'Kunci utama menjaga kebersihan sneakers putih adalah dengan membersihkannya secara rutin. Jangan biarkan noda menempel terlalu lama. Segera bersihkan noda kecil menggunakan lap basah atau tisu basah khusus sepatu. Untuk pembersihan mingguan, gunakan sikat lembut dan larutan pembersih ringan (campuran air dan sedikit sabun cuci piring atau sampo). Sikat perlahan bagian yang kotor, lalu lap dengan kain bersih.' },
        { type: 'heading', text: '2. Teknik Mencuci yang Benar' },
        { type: 'paragraph', text: 'Hindari mencuci sneakers putih di mesin cuci karena dapat merusak bentuk dan bahan sepatu. Cuci secara manual. Lepaskan tali sepatu dan insole, cuci secara terpisah. Gunakan sikat gigi bekas untuk membersihkan area sol yang sulit dijangkau. Bilas hingga bersih dan pastikan tidak ada sisa sabun yang menempel.' },
        { type: 'heading', text: '3. Proses Pengeringan yang Tepat' },
        { type: 'paragraph', text: 'Jangan pernah menjemur sneakers putih di bawah sinar matahari langsung! Panas matahari bisa menyebabkan oksidasi dan membuat bagian karet (midsole) menjadi kuning (yellowing). Keringkan sepatu dengan cara diangin-anginkan di tempat yang sejuk dan kering. Anda bisa memasukkan gumpalan kertas koran atau handuk kecil ke dalam sepatu untuk membantu menyerap kelembapan dan menjaga bentuknya.' },
        { type: 'heading', text: '4. Atasi Midsole yang Menguning (Unyellowing)' },
        { type: 'paragraph', text: 'Jika midsole sudah terlanjur menguning, Anda memerlukan perawatan khusus. Gunakan produk unyellowing yang banyak tersedia di pasaran. Oleskan cairan unyellowing secara merata pada bagian midsole, lalu bungkus dengan plastic wrap. Jemur di bawah sinar matahari (khusus untuk proses ini) selama beberapa jam. Hasilnya, sol akan kembali putih cemerlang.' },
        { type: 'heading', text: '5. Penyimpanan yang Baik' },
        { type: 'paragraph', text: 'Cara Anda menyimpan sepatu juga berpengaruh pada keawetannya. Simpan sneakers di dalam kotak aslinya atau rak sepatu yang bersih dan tidak lembab. Tambahkan silica gel di dalam kotak untuk menyerap kelembapan dan mencegah tumbuhnya jamur. Hindari menumpuk sepatu agar bentuknya tidak berubah.' },
    ],
  },
  {
    slug: "mengenal-jenis-bahan-sepatu",
    title: "Mengenal Jenis-Jenis Bahan Sepatu dan Cara Membersihkannya",
    description: "Beda bahan, beda cara penanganan. Pelajari cara membersihkan sepatu sesuai bahannya.",
    image: "https://i.imgur.com/rx25vM6.gif",
    imageHint: "shoe materials",
    author: "Tim elsclean.id",
    date: "19 Juli 2024",
    content: [
        { type: 'paragraph', text: 'Setiap sepatu dibuat dari bahan yang berbeda, dan masing-masing bahan memerlukan perlakuan khusus agar tetap awet dan terlihat bagus. Mengetahui cara membersihkan sepatu sesuai bahannya akan memperpanjang usia pakai sepatu kesayangan Anda. Mari kita kenali beberapa bahan sepatu yang paling umum dan cara membersihkannya.' },
        { type: 'heading', text: '1. Kulit (Leather)' },
        { type: 'paragraph', text: 'Sepatu kulit memberikan kesan klasik dan elegan. Untuk membersihkannya, gunakan sikat bulu kuda untuk menghilangkan debu dan kotoran. Kemudian, oleskan pembersih khusus kulit (leather cleaner) dengan kain lembut. Setelah bersih, aplikasikan kondisioner atau semir sepatu untuk menjaga kelembapan dan kilaunya. Biarkan kering secara alami.' },
        { type: 'heading', text: '2. Suede' },
        { type: 'paragraph', text: 'Suede adalah bahan yang sangat rentan terhadap air dan noda. Gunakan sikat khusus suede untuk membersihkan debu searah dengan seratnya. Untuk noda kering, gunakan penghapus suede. Jika terkena noda basah, serap dengan kain kering sesegera mungkin. Hindari air, namun jika terpaksa, gunakan pembersih khusus suede. Lindungi dengan spray pelindung suede secara berkala.' },
        { type: 'heading', text: '3. Kanvas (Canvas)' },
        { type: 'paragraph', text: 'Kanvas adalah bahan yang populer untuk sneakers. Anda bisa mencucinya dengan tangan menggunakan sikat dan larutan air sabun hangat. Untuk noda membandel, gunakan campuran baking soda dan cuka. Sikat perlahan dan bilas bersih. Keringkan dengan cara diangin-anginkan, jangan di bawah matahari langsung.' },
        { type: 'heading', text: '4. Kulit Sintetis (Synthetic Leather)' },
        { type: 'paragraph', text: 'Perawatan kulit sintetis lebih mudah dari kulit asli. Cukup lap dengan kain mikrofiber yang dibasahi air sabun ringan. Hindari penggunaan semir sepatu atau kondisioner berbahan dasar minyak karena bisa merusak lapisan sintetisnya. Keringkan dengan kain bersih.' },
        { type: 'heading', text: '5. Knit (Rajut)' },
        { type: 'paragraph', text: 'Bahan rajut seperti pada banyak sepatu lari modern memerlukan kehati-hatian. Gunakan sikat lembut dan larutan sabun yang sangat ringan. Tepuk-tepuk bagian yang kotor, jangan digosok terlalu keras agar tidak merusak serat rajutnya. Bilas dengan menepuk-nepuk menggunakan kain basah yang bersih dan keringkan dengan diangin-anginkan.' },
    ],
  },
  {
    slug: "diy-repaint-sepatu",
    title: "DIY Repaint Sepatu: Bikin Sepatumu Jadi Baru Lagi!",
    description: "Ingin sepatumu tampil beda? Coba repaint sendiri di rumah dengan panduan lengkap ini.",
    image: "https://i.imgur.com/rx25vM6.gif",
    imageHint: "shoe repaint diy",
    author: "Tim elsclean.id",
    date: "20 Juli 2024",
    content: [
        { type: 'paragraph', text: 'Repaint atau mewarnai ulang sepatu adalah cara yang fantastis untuk memberikan kehidupan baru pada sepatu lama yang warnanya sudah pudar, atau bahkan untuk mengkustomisasi sepatu baru agar sesuai dengan gaya Anda. Meskipun terdengar rumit, dengan persiapan dan teknik yang tepat, Anda bisa melakukannya sendiri di rumah. Ikuti panduan lengkap ini!' },
        { type: 'heading', text: 'Langkah 1: Persiapan Alat dan Bahan' },
        { type: 'paragraph', text: 'Sebelum memulai, siapkan semua yang Anda butuhkan: Cat akrilik khusus kulit/kanvas (misalnya Angelus), Aseton atau leather preparer/deglazer, Kuas cat berbagai ukuran, Lakban kertas (masking tape), Koran atau alas pelindung, Wadah untuk cat, dan Finisher/pelapis cat (matte atau glossy).' },
        { type: 'heading', text: 'Langkah 2: Bersihkan dan Persiapkan Permukaan Sepatu' },
        { type: 'paragraph', text: 'Sepatu harus dalam keadaan bersih dan kering. Ini adalah langkah krusial. Gunakan aseton atau leather deglazer pada kapas untuk membersihkan lapisan pabrik dari sepatu kulit. Untuk kanvas, cukup pastikan sudah bersih dari debu dan kotoran. Langkah ini akan membantu cat menempel dengan sempurna.' },
        { type: 'heading', text: 'Langkah 3: Masking Area yang Tidak Ingin Dicat' },
        { type: 'paragraph', text: 'Gunakan lakban kertas untuk menutupi bagian-bagian yang tidak ingin Anda cat, seperti sol, logo, atau bagian dalam sepatu. Pastikan lakban menempel dengan rapat untuk mencegah cat merembes.' },
        { type: 'heading', text: 'Langkah 4: Mulai Mengecat' },
        { type: 'paragraph', text: 'Tuang sedikit cat ke wadah. Mulailah mengecat dengan lapisan yang tipis dan merata. Lebih baik mengaplikasikan beberapa lapisan tipis daripada satu lapisan tebal. Lapisan tebal cenderung mudah retak. Biarkan setiap lapisan kering sepenuhnya (sekitar 15-30 menit) sebelum menambahkan lapisan berikutnya. Gunakan kuas kecil untuk detail yang rumit.' },
        { type: 'heading', text: 'Langkah 5: Finishing' },
        { type: 'paragraph', text: 'Setelah Anda puas dengan warnanya dan cat sudah benar-benar kering (tunggu setidaknya 24 jam), saatnya untuk melapisi. Aplikasikan 1-2 lapisan tipis finisher menggunakan kuas bersih. Finisher akan melindungi cat dari goresan dan air, serta memberikan hasil akhir yang profesional (matte atau glossy). Biarkan finisher kering sepenuhnya sebelum melepas lakban dan menggunakan sepatu Anda. Selamat! Anda punya sepatu "baru"!' },
    ],
  },
];

export async function seedBlogData() {
    const blogsCollection = collection(db, "blogs");
    console.log("Seeding blog data to Firestore...");
    for (const post of initialBlogPosts) {
        // Check if a post with the same slug already exists
        const q = query(blogsCollection, where("slug", "==", post.slug), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            await addDoc(blogsCollection, post);
            console.log(`Added blog post: ${post.title}`);
        } else {
            console.log(`Blog post already exists, skipping: ${post.title}`);
        }
    }
}

export async function getAllPosts(cached: boolean = true): Promise<BlogPost[]> {
    if (cached) {
      // Return static data for build-time generation (generateStaticParams)
      return initialBlogPosts.map((post, index) => ({...post, id: `initial-${index}`}));
    }
  
    // Fetch from Firestore for client-side rendering
    const blogsCollection = collection(db, 'blogs');
    const snapshot = await getDocs(blogsCollection);
    if (snapshot.empty) {
        await seedBlogData();
        const newSnapshot = await getDocs(blogsCollection);
        return newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const blogsCollection = collection(db, 'blogs');
    const q = query(blogsCollection, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        // Fallback to check initial data if Firestore is empty or post not found
        const post = initialBlogPosts.find(p => p.slug === slug);
        if (post) {
            // Seed the database for next time
            await seedBlogData();
            // Try fetching again
            const newSnapshot = await getDocs(q);
            if (!newSnapshot.empty) {
                const doc = newSnapshot.docs[0];
                return { id: doc.id, ...doc.data() } as BlogPost;
            }
        }
        return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
}
