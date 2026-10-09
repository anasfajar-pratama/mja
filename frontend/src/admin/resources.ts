export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'checkbox'
  | 'image'
  | 'select'
  | 'list' // array of strings, one per line
  | 'json' // array of objects, raw JSON

export interface FieldDef {
  name: string
  label: string
  type: FieldType
  options?: { value: string; label: string }[]
  help?: string
  span?: 1 | 2 | 3
}

export interface ResourceDef {
  slug: string
  label: string
  singular: string
  titleField: string
  subtitleField?: string
  imageField?: string
  fields: FieldDef[]
}

export const ICON_OPTIONS = [
  'i-check', 'i-phone', 'i-mail', 'i-star', 'i-play', 'i-shield', 'i-badge',
  'i-file', 'i-clock', 'i-eye', 'i-target', 'i-users', 'i-clean', 'i-bed',
  'i-leaf', 'i-box', 'i-car', 'i-arrow',
].map((value) => ({ value, label: value.replace('i-', '') }))

const iconField: FieldDef = { name: 'icon', label: 'Ikon', type: 'select', options: ICON_OPTIONS }
const activeField: FieldDef = { name: 'is_active', label: 'Aktif', type: 'checkbox' }
const sortField: FieldDef = { name: 'sort', label: 'Urutan', type: 'number' }

export const RESOURCES: ResourceDef[] = [
  {
    slug: 'hero-slides',
    label: 'Hero (Slides)',
    singular: 'Hero',
    titleField: 'eyebrow',
    subtitleField: 'variant',
    imageField: 'image_path',
    fields: [
      { name: 'variant', label: 'Varian', type: 'select', options: [{ value: 'dark', label: 'Gelap' }, { value: 'light', label: 'Terang' }] },
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'title_html', label: 'Judul (HTML)', type: 'textarea', help: 'Boleh memakai <span class="hl">teks merah</span> dan <span class="hl-blue">teks biru</span>.', span: 2 },
      { name: 'lead', label: 'Deskripsi', type: 'textarea', span: 2 },
      { name: 'btn_primary_label', label: 'Tombol utama — teks', type: 'text' },
      { name: 'btn_primary_href', label: 'Tombol utama — link', type: 'text' },
      { name: 'btn_secondary_label', label: 'Tombol kedua — teks', type: 'text' },
      { name: 'btn_secondary_href', label: 'Tombol kedua — link', type: 'text' },
      { name: 'image_path', label: 'Gambar utama', type: 'image' },
      { name: 'image_mini', label: 'Gambar mini (varian gelap)', type: 'image' },
      { name: 'badge_title', label: 'Badge — judul', type: 'text' },
      { name: 'badge_text', label: 'Badge — keterangan', type: 'text' },
      { name: 'stats', label: 'Statistik (varian gelap)', type: 'json', help: 'Array JSON: [{"value":"2018","label":"Tahun berdiri"}]', span: 3 },
      { name: 'highlights', label: 'Highlights (varian terang)', type: 'json', help: 'Array JSON: [{"icon":"i-badge","title":"Berpengalaman","subtitle":"Sejak 2018"}]', span: 3 },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'features',
    label: 'Fitur Unggulan',
    singular: 'Fitur',
    titleField: 'title',
    fields: [iconField, { name: 'title', label: 'Judul', type: 'text' }, { name: 'text', label: 'Deskripsi', type: 'textarea', span: 2 }, sortField, activeField],
  },
  {
    slug: 'services',
    label: 'Layanan',
    singular: 'Layanan',
    titleField: 'title',
    subtitleField: 'category',
    imageField: 'image_path',
    fields: [
      { name: 'slug', label: 'Slug', type: 'text' },
      iconField,
      { name: 'tag_label', label: 'Label tag', type: 'text' },
      { name: 'category', label: 'Kategori (modal)', type: 'text' },
      { name: 'title', label: 'Judul', type: 'text', span: 2 },
      { name: 'summary', label: 'Ringkasan', type: 'textarea', span: 2 },
      { name: 'description', label: 'Deskripsi lengkap (modal)', type: 'textarea', span: 3 },
      { name: 'image_path', label: 'Gambar', type: 'image' },
      { name: 'chips', label: 'Chips (1 per baris)', type: 'list', span: 3 },
      { name: 'benefits', label: 'Keunggulan (1 per baris)', type: 'list', span: 3 },
      { name: 'sectors', label: 'Sektor (1 per baris)', type: 'list', span: 3 },
      { name: 'is_featured', label: 'Sorotan (lebar penuh)', type: 'checkbox' },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'partners',
    label: 'Customer / Mitra',
    singular: 'Mitra',
    titleField: 'name',
    imageField: 'logo_path',
    fields: [{ name: 'name', label: 'Nama', type: 'text' }, { name: 'logo_path', label: 'Logo', type: 'image' }, sortField, activeField],
  },
  {
    slug: 'gallery-categories',
    label: 'Kategori Galeri',
    singular: 'Kategori',
    titleField: 'name',
    fields: [{ name: 'name', label: 'Nama kategori', type: 'text' }, sortField],
  },
  {
    slug: 'gallery-images',
    label: 'Galeri Foto',
    singular: 'Foto',
    titleField: 'category',
    imageField: 'image_path',
    fields: [
      { name: 'category', label: 'Kategori', type: 'text' },
      { name: 'image_path', label: 'Foto', type: 'image' },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'legalities',
    label: 'Legalitas',
    singular: 'Legalitas',
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'value', label: 'Isi', type: 'textarea', span: 2 },
      { name: 'is_full_width', label: 'Lebar penuh', type: 'checkbox' },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'values',
    label: 'Nilai ROYAL',
    singular: 'Nilai',
    titleField: 'title',
    subtitleField: 'letter',
    fields: [
      { name: 'letter', label: 'Huruf', type: 'text' },
      { name: 'title', label: 'Judul', type: 'text' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', span: 2 },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'mission-items',
    label: 'Poin Misi',
    singular: 'Poin Misi',
    titleField: 'text',
    fields: [{ name: 'text', label: 'Isi misi', type: 'textarea', span: 2 }, sortField, activeField],
  },
  {
    slug: 'faqs',
    label: 'FAQ',
    singular: 'FAQ',
    titleField: 'question',
    fields: [
      { name: 'question', label: 'Pertanyaan', type: 'textarea', span: 2 },
      { name: 'answer', label: 'Jawaban', type: 'textarea', span: 2 },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'testimonials',
    label: 'Testimoni',
    singular: 'Testimoni',
    titleField: 'name',
    subtitleField: 'role',
    fields: [
      { name: 'quote', label: 'Kutipan', type: 'textarea', span: 2 },
      { name: 'name', label: 'Nama', type: 'text' },
      { name: 'role', label: 'Jabatan', type: 'text' },
      { name: 'initials', label: 'Inisial', type: 'text' },
      { name: 'rating', label: 'Bintang (1-5)', type: 'number' },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'contact-lines',
    label: 'Baris Kontak',
    singular: 'Baris Kontak',
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'value', label: 'Isi', type: 'textarea', span: 2 },
      { name: 'href', label: 'Link (tel:/mailto:)', type: 'text' },
      { name: 'is_link', label: 'Jadikan link', type: 'checkbox' },
      sortField,
      activeField,
    ],
  },
  {
    slug: 'footer-links',
    label: 'Link Footer',
    singular: 'Link',
    titleField: 'label',
    subtitleField: 'area',
    fields: [
      { name: 'area', label: 'Kolom', type: 'select', options: [{ value: 'nav', label: 'Navigasi' }, { value: 'services', label: 'Layanan Utama' }] },
      { name: 'label', label: 'Teks', type: 'text' },
      { name: 'href', label: 'Link', type: 'text' },
      sortField,
    ],
  },
]

export const findResource = (slug: string) => RESOURCES.find((r) => r.slug === slug)
