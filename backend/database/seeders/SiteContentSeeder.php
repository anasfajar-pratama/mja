<?php

namespace Database\Seeders;

use App\Models\CompanyValue;
use App\Models\ContactLine;
use App\Models\Faq;
use App\Models\Feature;
use App\Models\FooterLink;
use App\Models\GalleryCategory;
use App\Models\GalleryImage;
use App\Models\HeroSlide;
use App\Models\Legality;
use App\Models\MissionItem;
use App\Models\Partner;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            Setting::class, HeroSlide::class, Feature::class, Service::class, Partner::class,
            GalleryCategory::class, GalleryImage::class, Legality::class, CompanyValue::class,
            MissionItem::class, Faq::class, Testimonial::class, ContactLine::class, FooterLink::class,
        ] as $model) {
            $model::query()->truncate();
        }

        foreach ($this->settings() as $key => $value) {
            Setting::create([
                'setting_key' => $key,
                'setting_value' => $value,
                'setting_group' => explode('.', $key)[0],
            ]);
        }

        HeroSlide::create([
            'variant' => 'dark',
            'eyebrow' => 'Professional • Competent • Credible',
            'title_html' => 'Supporting You with <span class="hl">Facility Care</span> &amp; <span class="hl-blue">Outsourcing</span>',
            'lead' => 'PT. Magali Jaya Abadi (MJA) adalah perusahaan penyedia layanan tenaga kerja siap pakai terkemuka di bidang Cleaning Service, Security, Parkir, dan penunjang bisnis untuk meningkatkan efisiensi dan akselerasi operasional perusahaan Anda.',
            'btn_primary_label' => 'Konsultasi Sekarang',
            'btn_primary_href' => '#kontak',
            'btn_secondary_label' => '0812 8118 4882',
            'btn_secondary_href' => 'tel:+6281281184882',
            'image_path' => 'media/img24.webp',
            'image_mini' => 'media/img07.webp',
            'badge_title' => 'Standar Kerja 5R',
            'badge_text' => 'Disiplin & Kualitas Kerja Teruji',
            'stats' => [
                ['value' => '2018', 'label' => 'Tahun berdiri'],
                ['value' => '7+', 'label' => 'Solusi layanan utama'],
                ['value' => 'ASK', 'label' => 'Attitude • Skills • Knowledge'],
                ['value' => '5R', 'label' => 'Ringkas • Rapih • Resik • Rawat • Rajin'],
            ],
            'sort' => 1,
        ]);

        HeroSlide::create([
            'variant' => 'light',
            'eyebrow' => 'Sejak 2018 • Terpercaya',
            'title_html' => 'Membangun Operasional Bisnis yang <span class="hl">Bersih</span>, <span class="hl-blue">Aman</span> &amp; Efisien',
            'lead' => 'PT. Magali Jaya Abadi menghadirkan solusi facility care dan outsourcing terpadu — dari cleaning service, security, hingga pengelolaan penunjang — agar perusahaan Anda beroperasi tanpa hambatan teknis.',
            'btn_primary_label' => 'Konsultasi Sekarang',
            'btn_primary_href' => '#kontak',
            'btn_secondary_label' => 'Lihat Layanan',
            'btn_secondary_href' => '#layanan',
            'image_path' => 'media/img07.webp',
            'highlights' => [
                ['icon' => 'i-badge', 'title' => 'Berpengalaman', 'subtitle' => 'Berdiri sejak 2018'],
                ['icon' => 'i-users', 'title' => 'Profesional', 'subtitle' => 'Tenaga terlatih ASK'],
                ['icon' => 'i-shield', 'title' => 'Terpercaya', 'subtitle' => 'Legalitas lengkap'],
            ],
            'sort' => 2,
        ]);

        $features = [
            ['i-badge', 'Tenaga Terlatih', 'Personel berdedikasi tinggi dengan standar ASK (Attitude, Skills, Knowledge).'],
            ['i-shield', 'Legalitas Lengkap', 'Akte Notaris, NIB, NPWP, dan keanggotaan resmi asosiasi APKLINDO.'],
            ['i-clock', 'Dukungan 24/7', 'Tim pengawas siaga memastikan kelancaran operasional fasilitas Anda.'],
            ['i-file', 'Metode 5R Teruji', 'Pola kerja sistematis: Ringkas, Rapih, Resik, Rawat, dan Rajin.'],
        ];
        foreach ($features as $i => [$icon, $title, $text]) {
            Feature::create(['icon' => $icon, 'title' => $title, 'text' => $text, 'sort' => $i + 1]);
        }

        foreach ($this->services() as $i => $s) {
            Service::create($s + ['sort' => $i + 1]);
        }

        $partners = [
            ['TK Buahati', 'customer-tk-buahati.png'],
            ['Piramid', 'customer-piramid.png'],
            ['Karya Husada', 'customer-karya-husada.png'],
            ['Yayasan Astri Bakti Insani', 'customer-astri-bakti-insani.png'],
            ['Atro Das', 'customer-atro-das.png'],
            ['Alizza', 'customer-alizza.png'],
            ['Fuji Kitchen', 'customer-fuji-kitchen.png'],
            ['Mal Cikampek', 'customer-malci-kampek.png'],
            ['RSUD Jatisari', 'customer-rsud-jatisari.png'],
            ['Kementerian Perhubungan', 'customer-kemenhub.png'],
            ['Lanud Suryadarma', 'customer-lanud.png'],
            ['Buahati Islamic School', 'customer-buahati.png'],
            ['Izza', 'customer-izza.png'],
            ['Alya Medical Center', 'customer-alya-medical.png'],
        ];
        foreach ($partners as $i => [$name, $file]) {
            Partner::create(['name' => $name, 'logo_path' => 'media/'.$file, 'sort' => $i + 1]);
        }

        $categories = ['Cleaning Service', 'Gardener Service', 'General Supplier', 'Parking'];
        foreach ($categories as $i => $name) {
            GalleryCategory::create(['name' => $name, 'sort' => $i + 1]);
        }

        $gallery = [
            'Cleaning Service' => array_map(fn ($n) => "img{$n}", range(24, 41)),
            'Gardener Service' => array_merge(['img06'], array_map(fn ($n) => "img{$n}", range(42, 48))),
            'General Supplier' => array_merge(['img08'], array_map(fn ($n) => "img{$n}", range(49, 55))),
            'Parking' => array_map(fn ($n) => "img{$n}", range(56, 59)),
        ];
        $sort = 0;
        foreach ($gallery as $category => $images) {
            foreach ($images as $img) {
                GalleryImage::create([
                    'category' => $category,
                    'image_path' => "media/{$img}.webp",
                    'sort' => ++$sort,
                ]);
            }
        }

        $legalities = [
            ['Akte Pendirian Nomor', 'Nomor 19 tanggal 10 Agustus 2024', false],
            ['Dibuat oleh Notaris', 'Yurike Goldania, SH., Mkn', false],
            ['Keputusan Menkumham', 'Nomor AHU-0170846.01.11 Tahun 2024', false],
            ['Nomor Pokok Wajib Pajak (NPWP)', '05.500.048.3-408.000', false],
            ['Surat Keterangan Domisili Usaha', '474/364/IX/2020', false],
            ['Keanggotaan Asosiasi APKLINDO', 'TA/10239/KRW/VIII/2021', false],
            ['Nomor Induk Berusaha (NIB)', '2008240017517 — Terverifikasi Berusaha Resmi', true],
        ];
        foreach ($legalities as $i => [$label, $value, $full]) {
            Legality::create(['label' => $label, 'value' => $value, 'is_full_width' => $full, 'sort' => $i + 1]);
        }

        $values = [
            ['R', 'Responsible', 'Menjalankan dan menyelesaikan pekerjaan dengan baik karena pekerjaan adalah bagian dari amanah mulia.'],
            ['O', 'Optimistic', 'Meyakini selalu ada kebaikan dan kemajuan dalam setiap pekerjaan yang dikerjakan secara tulus dan benar.'],
            ['Y', 'Yielded', 'Menghargai waktu dan tenaga demi hasil yang produktif serta memberi kontribusi positif berkelanjutan.'],
            ['A', 'Active', 'Antusias, penuh inisiatif, selalu berpikir konstruktif, serta menciptakan suasana kerja yang harmonis.'],
            ['L', 'Leading', 'Senantiasa menjadi yang terdepan dalam mutu pelayanan dan konsistensi kepuasan mitra.'],
        ];
        foreach ($values as $i => [$letter, $title, $desc]) {
            CompanyValue::create(['letter' => $letter, 'title' => $title, 'description' => $desc, 'sort' => $i + 1]);
        }

        $missions = [
            'Mengambil bagian pembangunan dan menghasilkan SDM yang berkualitas unggul.',
            'Menjadikan perusahaan profesional, kompeten, dan kredibel di seluruh Indonesia.',
            'Mampu berdaya saing tinggi di pasar regional maupun global.',
            'Memiliki jaringan kantor representatif di kota-kota strategis Indonesia.',
            'Meningkatkan standar layanan berkesinambungan berbasis Customer Satisfaction.',
        ];
        foreach ($missions as $i => $text) {
            MissionItem::create(['text' => $text, 'sort' => $i + 1]);
        }

        $faqs = [
            ['Layanan apa saja yang disediakan oleh PT. MJA?', 'Kami menyediakan Cleaning Service, Security Service, Parking Management, Housekeeping, Gardener Service, General Supplier, serta Business Process Outsourcing (BPO) menyeluruh.'],
            ['Wilayah operasional mana saja yang dilayani?', 'Kantor operasional utama kami berada di Karawang dan Purwakarta, dengan kesiapan penempatan tenaga kerja ke seluruh wilayah Jawa Barat, Jabodetabek, dan perwakilan kota besar di Indonesia.'],
            ['Bagaimana skema kerja sama yang ditawarkan?', 'Kerja sama fleksibel: tersedia sistem kontrak jangka panjang (tahunan) maupun proyek khusus (event/short-term), lengkap dengan jaminan penggantian personel jika berhalangan.'],
            ['Apakah tenaga kerja sudah melalui pelatihan sebelum ditempatkan?', 'Pasti. Setiap personel wajib lulus modul pelatihan ASK (Attitude, Skills, Knowledge), pembekalan K3 dasar, dan penerapan kedisiplinan 5R.'],
            ['Bagaimana prosedur survei lokasi dan pengajuan proposal?', 'Anda dapat menghubungi tim kami melalui WhatsApp di 0812 8118 4882 atau form chat di pojok kanan layar. Tim teknis kami akan melakukan survei kebutuhan fasilitas Anda secara gratis.'],
        ];
        foreach ($faqs as $i => [$q, $a]) {
            Faq::create(['question' => $q, 'answer' => $a, 'sort' => $i + 1]);
        }

        $testimonials = [
            ['Tenaga kebersihan dan keamanan yang ditempatkan sangat disiplin. Komunikasi dengan manajemen supervisor selalu cepat dan solutif.', 'Manajer Operasional', 'Mitra Gedung Perkantoran', 'MO', 5],
            ['Sangat terbantu dengan skema BPO dari MJA. Kami bisa fokus penuh pada target produksi pabrik tanpa terbebani teknis rekrutmen pekerja penunjang.', 'Kepala Bagian GA', 'Klien Sektor Industri', 'GA', 5],
            ['Hasil kebersihan area publik dan kamar hotel konsisten rapi. Evaluasi bulanan selalu transparan dengan laporan kerja yang tertib.', 'Hospitality Manager', 'Klien Komersial & Hotel', 'HM', 5],
        ];
        foreach ($testimonials as $i => [$quote, $name, $role, $initials, $rating]) {
            Testimonial::create([
                'quote' => $quote, 'name' => $name, 'role' => $role,
                'initials' => $initials, 'rating' => $rating, 'sort' => $i + 1,
            ]);
        }

        $contacts = [
            ['Head Office', 'Kp. Ciselang RT/RW. 002/004, Desa Karangjaya, Kec. Tirtamulya, Kab. Karawang - Jawa Barat', null, false],
            ['Nomor Telepon / WhatsApp', '0812 8118 4882', 'tel:+6281281184882', true],
            ['Alamat Email Resmi', 'magajijayaabadi01@gmail.com', 'mailto:magajijayaabadi01@gmail.com', true],
            ['Branch Office Purwakarta', 'Perumahan Bumi Jaya Indah (BJI) Blok AV No. 23, Desa Munjuljaya, Kec. Purwakarta, Kab. Purwakarta - Jawa Barat', null, false],
            ['Telepon Kantor Cabang', '0877 7864 6710', 'tel:+6287778646710', true],
            ['Jam Operasional', 'Senin - Sabtu: 08.00 - 17.00 WIB (Layanan Siaga 24 Jam)', null, false],
        ];
        foreach ($contacts as $i => [$label, $value, $href, $isLink]) {
            ContactLine::create([
                'label' => $label, 'value' => $value, 'href' => $href,
                'is_link' => $isLink, 'sort' => $i + 1,
            ]);
        }

        $footerNav = [
            ['Tentang Perusahaan', '#tentang'],
            ['Layanan & Solusi', '#layanan'],
            ['Visi & Misi', '#strategic'],
            ['Legalitas & Sertifikasi', '#legalitas'],
            ['Mitra Klien', '#customer'],
            ['Dokumentasi', '#gallery'],
        ];
        foreach ($footerNav as $i => [$label, $href]) {
            FooterLink::create(['area' => 'nav', 'label' => $label, 'href' => $href, 'sort' => $i + 1]);
        }
        $footerServices = [
            'Business Process Outsourcing',
            'Cleaning Service & 5R',
            'Security Service',
            'Housekeeping',
            'Parking Management',
        ];
        foreach ($footerServices as $i => $label) {
            FooterLink::create(['area' => 'services', 'label' => $label, 'href' => '#layanan', 'sort' => $i + 1]);
        }
    }

    private function settings(): array
    {
        return [
            'brand.name' => 'PT. MAGALI JAYA ABADI',
            'brand.tagline' => 'FACILITY CARE • CLEAN SPACE HEALTHY LIFE',
            'brand.logo' => 'media/img01.webp',
            'brand.favicon' => 'media/favicon.png',
            'meta.title' => 'PT. Magali Jaya Abadi — Facility Care & Outsourcing Solusi Bisnis',
            'meta.description' => 'Company Profile PT. Magali Jaya Abadi — solusi facility care, outsourcing, cleaning service, security, dan layanan penunjang bisnis.',
            'meta.theme_color' => '#071527',
            'contact.whatsapp_number' => '6281281184882',
            'contact.whatsapp_display' => '0812 8118 4882',
            'contact.email' => 'magajijayaabadi01@gmail.com',
            'contact.phone_head_display' => '0812 8118 4882',
            'contact.phone_head_href' => 'tel:+6281281184882',
            'contact.phone_branch_display' => '0877 7864 6710',
            'contact.phone_branch_href' => 'tel:+6287778646710',
            'contact.location' => 'Karawang & Purwakarta, Jawa Barat',

            'about.eyebrow' => 'About PT. MJA',
            'about.title_html' => 'Partner operasional dengan <span class="hl">Trusted Expertise</span>',
            'about.paragraph_1' => 'PT. Magali Jaya Abadi (MJA) adalah perusahaan penyedia layanan tenaga (outsourcing) siap pakai terkemuka yang menyediakan tenaga kerja kompeten di bidangnya sejak tahun 2018.',
            'about.paragraph_2' => 'Kami bergerak di bidang Cleaning Service, Security, dan Parkir serta dikelola oleh tim berpengalaman profesional. Kami sadar bahwa kenyamanan, keamanan, dan kebersihan merupakan fondasi utama agar bisnis mitra terus berkembang tanpa kendala teknis.',
            'about.experience_value' => '2018',
            'about.experience_label' => 'Berdiri Sejak',
            'about.main_image' => 'media/img03.webp',
            'about.mini_image' => 'media/img05.webp',
            'about.vision_title' => 'Our Vision',
            'about.vision' => 'Memberikan pelayanan berkualitas dan bertanggung jawab serta selalu mengutamakan kepuasan pelanggan.',
            'about.mission_title' => 'Our Mission',
            'about.mission' => 'Menjadi perusahaan profesional, kompeten, kredibel, dan berdaya saing global dengan standar mutu berkesinambungan.',
            'about.cta_label' => 'Eksplor Layanan Kami',
            'about.cta_href' => '#layanan',

            'strategic.eyebrow' => 'Strategic Direction',
            'strategic.title' => 'Fondasi nilai dan arah pertumbuhan MJA',
            'strategic.lead' => 'Arahkan kursor pada kartu visi dan misi untuk melihat komitmen mutu layanan kami secara mendalam.',
            'strategic.vision_title' => 'Visi Perusahaan',
            'strategic.vision' => 'Memberikan pelayanan berkualitas dan bertanggung jawab serta selalu mengutamakan kepuasan pelanggan melalui konsistensi mutu tenaga kerja dan penerapan SOP berstandar industri.',
            'strategic.mission_title' => 'Misi Perusahaan',
            'strategic.values_eyebrow' => 'Our Core Values',
            'strategic.values_title' => 'Budaya Kerja ROYAL',
            'strategic.values_lead' => 'Nilai luhur yang ditanamkan kepada seluruh jajaran manajemen dan personel lapangan.',

            'services.eyebrow' => 'Our Services',
            'services.title' => 'Solusi komprehensif penunjang efisiensi bisnis',
            'services.lead' => 'Klik salah satu layanan di bawah untuk melihat rincian ruang lingkup, manfaat operasional, dan cakupan sektor.',
            'services.cta_label' => 'Ajukan Penawaran Layanan',

            'legal.eyebrow' => 'Legality & Credentials',
            'legal.title' => 'Legalitas resmi perusahaan',
            'legal.lead' => 'PT. Magali Jaya Abadi beroperasi dengan izin usaha resmi dan legalitas hukum lengkap sesuai perundang-undangan Republik Indonesia.',

            'customer.eyebrow' => 'Our Partners',
            'customer.title' => 'Mitra dan customer terpercaya',
            'customer.lead' => 'Dukungan kepercayaan dari berbagai institusi pendidikan, fasilitas kesehatan, instansi pemerintah, hingga industri komersial.',

            'gallery.eyebrow' => 'Documentation',
            'gallery.title' => 'Dokumentasi kegiatan operasional',
            'gallery.lead' => 'Aktivitas riil pelatihan, penempatan tenaga kebersihan, satpam, perawatan lanskap, dan logistik PT. Magali Jaya Abadi.',

            'faq.eyebrow' => 'FAQ',
            'faq.title' => 'Pertanyaan yang sering diajukan',
            'faq.lead' => 'Informasi praktis mengenai skema kemitraan, cakupan area, dan sistem kerja sama MJA.',

            'testimonial.eyebrow' => 'Testimonials',
            'testimonial.title' => 'Kepercayaan dari mitra kami',
            'testimonial.lead' => 'Kepuasan dan kenyamanan mitra kerja adalah tolok ukur kesuksesan PT. Magali Jaya Abadi.',

            'cta.title_html' => 'Reliable Facility Care with <span class="hl">Proven Quality</span>',
            'cta.text' => 'Tingkatkan efisiensi dan kenyamanan fasilitas kerja Anda sekarang. Tim profesional PT. Magali Jaya Abadi siap merancang solusi ketenagakerjaan terbaik.',
            'cta.phone_label' => 'Hubungi Head Office',
            'cta.phone_href' => 'tel:+6281281184882',
            'cta.email_label' => 'Kirim Email Proposal',
            'cta.email_href' => 'mailto:magajijayaabadi01@gmail.com',

            'contact_section.eyebrow' => 'Contact Details',
            'contact_section.title' => 'Siap bermitra dengan Anda',
            'contact_section.lead' => 'Kunjungi kantor kami atau hubungi perwakilan layanan untuk konsultasi dan jadwal survei lapangan.',
            'contact_section.company_name' => 'PT. MAGALI JAYA ABADI',
            'contact_section.map_embed' => 'https://www.google.com/maps?q=Kp.%20Ciselang%20RT%2FRW%20002%2F004%2C%20Desa%20Karangjaya%2C%20Kec.%20Tirtamulya%2C%20Kab.%20Karawang%2C%20Jawa%20Barat&output=embed',

            'footer.description' => 'Penyedia layanan tenaga kerja (outsourcing) siap pakai terpercaya untuk facility care, kebersihan, keamanan, dan penunjang kelancaran bisnis.',
            'footer.copyright' => '© 2026 PT. Magali Jaya Abadi. Hak cipta dilindungi.',
            'footer.tagline' => 'FACILITY CARE • Clean Space Healthy Life',
        ];
    }

    private function services(): array
    {
        return [
            [
                'slug' => 'bpo', 'icon' => 'i-users', 'tag_label' => 'Pemborongan Terpadu',
                'category' => 'Layanan Pemborongan Pekerjaan',
                'title' => 'Business Process Outsourcing (BPO)',
                'summary' => 'Solusi pemborongan pekerjaan penunjang untuk membantu perusahaan menghemat biaya operasional, memitigasi risiko ketenagakerjaan, dan membebaskan manajemen untuk fokus pada kompetensi inti bisnis.',
                'description' => 'Business Process Outsourcing (BPO) MJA adalah solusi pengalihan pekerjaan penunjang operasional perusahaan secara komprehensif. Melalui skema pemborongan ini, perusahaan mitra dapat sepenuhnya berkonsentrasi pada peningkatan profitabilitas dan bisnis inti, sementara seluruh kerumitan rekrutmen, administrasi, legalitas, dan pengelolaan pekerja ditangani oleh tenaga profesional kami.',
                'image_path' => 'media/img04.webp',
                'chips' => ['Efisiensi Biaya', 'Mitigasi Risiko', 'Klik untuk detail lengkap', 'Supervisi Rutin'],
                'benefits' => [
                    'Penghematan biaya operasional, rekrutmen, dan overhead HR hingga 30%.',
                    'Mitigasi risiko ketenagakerjaan, kepatuhan regulasi hukum, dan jaminan payroll tepat waktu.',
                    'Jaminan penggantian tenaga kerja dalam waktu maksimal 24 jam bila berhalangan.',
                    'Evaluasi Key Performance Indicator (KPI) dan pengawasan operasional berkala.',
                ],
                'sectors' => ['Pabrik & Kawasan Industri', 'Gedung Perkantoran', 'Rumah Sakit & Klinik', 'Hotel & Hospitality', 'Pusat Perbelanjaan / Mall', 'Instansi Pemerintah'],
                'is_featured' => true,
            ],
            [
                'slug' => 'cleaning', 'icon' => 'i-clean', 'tag_label' => 'Kebersihan & Higienitas',
                'category' => 'Kebersihan & Higienitas',
                'title' => 'Cleaning Service & Metode 5R',
                'summary' => 'Layanan kebersihan menyeluruh area indoor maupun outdoor dengan peralatan modern, chemical ramah lingkungan, dan standar kerja 5R.',
                'description' => 'Layanan kebersihan menyeluruh yang mencakup Daily Cleaning, Periodic Deep Cleaning, dan sanitasi area kerja. Setiap petugas dibekali teknik pembersihan modern serta menerapkan budaya kerja 5R (Ringkas, Rapih, Resik, Rawat, Rajin) agar area fasilitas selalu bersih, higienis, dan nyaman bagi produktivitas kerja.',
                'image_path' => 'media/img24.webp',
                'chips' => ['Perkantoran', 'Rumah Sakit', 'Pabrik', 'Hotel', '+ Info Lengkap'],
                'benefits' => [
                    'Tenaga kerja tersertifikasi dengan pembekalan ASK (Attitude, Skills, Knowledge).',
                    'Peralatan modern lengkap (Floor Polisher, Auto Scrubber, Vacuum Cleaner Wet & Dry).',
                    'Penggunaan bahan kimia pembersih (chemical) ramah lingkungan bersertifikat MSDS.',
                    'Supervisi dan checklist mutu kebersihan harian yang terdokumentasi rapi.',
                ],
                'sectors' => ['Perkantoran Korporat', 'Pabrik Manufaktur', 'Rumah Sakit & Farmasi', 'Universitas & Sekolah', 'Pusat Retail & Supermarket', 'Fasilitas Perbankan'],
            ],
            [
                'slug' => 'housekeeping', 'icon' => 'i-bed', 'tag_label' => 'Hospitalitas & Resik',
                'category' => 'Hospitalitas & Tata Graha',
                'title' => 'Housekeeping Service',
                'summary' => 'Menangani keindahan, kerapihan, kebersihan, dan kesiapan kamar serta area publik hotel maupun fasilitas komersial dengan standar perhotelan bintang.',
                'description' => 'Layanan tata graha profesional untuk menjaga estetika, higienitas, dan kesiapan kamar hunian serta seluruh area publik fasilitas komersial. Berorientasi pada standar bintang perhotelan guna memberikan impresi pertama yang berkelas kepada setiap tamu.',
                'image_path' => 'media/img05.webp',
                'chips' => ['Room Section', 'Public Area', 'Hospitality SOP', '+ Info Lengkap'],
                'benefits' => [
                    'Penanganan menyeluruh Room Section (kamar tidur, kamar mandi, linen management).',
                    'Penanganan Public Area Section (lobby, koridor, ruang pertemuan, lounge).',
                    'Tenaga muda terampil dengan etika hospitality dan grooming standar perhotelan.',
                    'Kecepatan penyiapan unit kamar dengan kontrol kualitas sanitasi terukur.',
                ],
                'sectors' => ['Hotel & Resort', 'Apartemen & Kondominium', 'Wisma Atlet & Mess Karyawan', 'Fasilitas Co-living', 'Clubhouse & Lounge'],
            ],
            [
                'slug' => 'security', 'icon' => 'i-shield', 'tag_label' => 'Keamanan & Ketertiban',
                'category' => 'Keamanan & Ketertiban',
                'title' => 'Security Service (Satpam Terlatih)',
                'summary' => 'Penyediaan satuan pengamanan bersertifikat dengan kedisiplinan prima, tanggap darurat, dan pengawasan protokol keamanan terintegrasi.',
                'description' => 'Penyediaan satuan pengamanan bersertifikat resmi Gada Pratama/Madya di bawah binaan instruktur profesional. Siaga 24 jam melindungi aset, karyawan, tamu, serta menjaga kelancaran operasional area kerja dari berbagai potensi ancaman.',
                'image_path' => 'media/img07.webp',
                'chips' => ['Office Building', 'Kawasan Industri', 'Sertifikat Resmi', '+ Info Lengkap'],
                'benefits' => [
                    'Disiplin tinggi, berbadan sehat, serta pembawaan humanis dan tegas.',
                    'Sistem patroli rutin terjadwal dengan pelaporan mutasi buku dan digital.',
                    'Kesiapan tanggap darurat (K3, pemadaman api dini, evakuasi, pertolongan pertama).',
                    'Pengawasan ketat pos akses, pemeriksaan kendaraan masuk/keluar, dan monitoring CCTV.',
                ],
                'sectors' => ['Kawasan Industri & Pergudangan', 'Gedung Perkantoran', 'Pusat Perbelanjaan / Retail', 'Kampus & Sekolah', 'Perumahan / Residensial'],
            ],
            [
                'slug' => 'gardener', 'icon' => 'i-leaf', 'tag_label' => 'Lanskap & Taman Asri',
                'category' => 'Lanskap & Ruang Hijau',
                'title' => 'Gardener Service',
                'summary' => 'Perawatan estetika ruang hijau, pemeliharaan tanaman berkala, pemupukan, pemangkasan rapi, serta tata lanskap untuk lingkungan kerja yang nyaman.',
                'description' => 'Layanan perawatan dan penataan lanskap ruang hijau agar selalu asri, tertib, dan menyejukkan. Lingkungan kerja yang hijau dan terawat terbukti meningkatkan kenyamanan visual dan produktivitas karyawan.',
                'image_path' => 'media/img42.webp',
                'chips' => ['Perawatan Rutin', 'Pemilihan Tanaman', 'Desain Lanskap', '+ Info Lengkap'],
                'benefits' => [
                    'Perawatan rutin: penyiraman teratur, pemupukan organik, pemangkasan dahan dan rumput.',
                    'Pencegahan dan pengendalian hama penyakit tanaman secara berkala.',
                    'Konsultasi penataan taman, pemilihan jenis flora hemat perawatan, dan revitalisasi lanskap.',
                    'Peralatan pemotong rumput dan perawatan kebun yang lengkap dan aman.',
                ],
                'sectors' => ['Halaman Pabrik', 'Taman Gedung Perkantoran', 'Lanskap Kampus', 'Taman Fasilitas Medis', 'Hotel & Resort'],
            ],
            [
                'slug' => 'supplier', 'icon' => 'i-box', 'tag_label' => 'Pengadaan Tepat Waktu',
                'category' => 'Pengadaan Kebutuhan Operasional',
                'title' => 'General Supplier',
                'summary' => 'Pengadaan barang dan perlengkapan penunjang operasional kantor, kawasan industri, chemical cleaning, hingga APD keselamatan kerja (K3).',
                'description' => 'Penyediaan barang dan perlengkapan kerja untuk mendukung kelancaran operasional perusahaan skala kecil, menengah, hingga industri manufaktur besar dengan jaminan kualitas dan ketepatan jadwal pengiriman.',
                'image_path' => 'media/img08.webp',
                'chips' => ['Alat Cleaning', 'Peralatan Safety K3', 'ATK Kantor', '+ Info Lengkap'],
                'benefits' => [
                    'Pengadaan bahan kimia pembersih, chemical sanitasi, dan mesin cleaning.',
                    'Alat Pelindung Diri (APD) K3 (Safety shoes, helm, rompi, sarung tangan, masker).',
                    'Alat Tulis Kantor (ATK), kebutuhan pantry, hingga perlengkapan maintenance.',
                    'Harga kompetitif dengan sistem invoicing transparan dan termin pembayaran fleksibel.',
                ],
                'sectors' => ['Perusahaan Swasta', 'Badan Usaha Milik Negara (BUMN)', 'Pabrik & Manufaktur', 'Rumah Sakit', 'Instansi Pendidikan'],
            ],
            [
                'slug' => 'parking', 'icon' => 'i-car', 'tag_label' => 'Manajemen Parkir',
                'category' => 'Manajemen Parkir',
                'title' => 'Parking Management',
                'summary' => 'Pengelolaan sirkulasi dan area perparkiran tertib, nyaman, aman, dengan petugas ramah serta sistem pengawasan kendaraan yang disiplin.',
                'description' => 'Pengelolaan sirkulasi, penataan tata letak, dan pengawasan area parkir kendaraan bermotor secara tertib, aman, dan efisien demi kenyamanan pengunjung fasilitas Anda.',
                'image_path' => 'media/img56.webp',
                'chips' => ['Gedung Perkantoran', 'Rumah Sakit', 'Pusat Retail', '+ Info Lengkap'],
                'benefits' => [
                    'Pengaturan arus keluar-masuk kendaraan untuk mencegah kemacetan di pintu gerbang.',
                    'Petugas parkir ramah, komunikatif, dan tanggap membantu mengarahkan kendaraan.',
                    'Pencatatan karcis dan sistem pengawasan kendaraan yang disiplin.',
                    'Penataan tata letak ruang parkir yang optimal untuk kapasitas maksimal.',
                ],
                'sectors' => ['Gedung Komersial', 'Rumah Sakit', 'Pusat Perbelanjaan', 'Kampus', 'Pabrik & Kantor'],
            ],
        ];
    }
}
