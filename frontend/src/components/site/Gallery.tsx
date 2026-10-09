import { useEffect, useMemo, useState } from 'react'
import type { GalleryImage, SettingMap } from '../../types'
import { mediaUrl } from '../../lib/media'
import Lightbox from './Lightbox'

const PER_PAGE = 8

export default function Gallery({
  categories,
  images,
  settings,
}: {
  categories: string[]
  images: GalleryImage[]
  settings: SettingMap
}) {
  const [category, setCategory] = useState(categories[0] || '')
  const [page, setPage] = useState(0)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const items = useMemo(() => images.filter((img) => img.category === category), [images, category])
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE))

  useEffect(() => setPage(0), [category])
  useEffect(() => {
    if (page >= totalPages) setPage(0)
  }, [page, totalPages])

  // Auto-advance batches (mirrors the original landing page behaviour).
  useEffect(() => {
    if (totalPages <= 1) return
    const timer = setInterval(() => setPage((p) => (p + 1) % totalPages), 5000)
    return () => clearInterval(timer)
  }, [totalPages])

  const pageItems = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section id="gallery" className="section light-pure">
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow">{settings['gallery.eyebrow']}</div>
          <h2>{settings['gallery.title']}</h2>
          <p className="lead">{settings['gallery.lead']}</p>
        </div>

        <div className="gallery-nav">
          <div className="gallery-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`tab-btn${cat === category ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-viewport">
          <div className="gallery">
            {pageItems.map((img) => (
              <button
                key={img.id}
                type="button"
                className="g-item"
                aria-label={`Perbesar foto: ${img.category}`}
                onClick={() => setLightbox(img)}
              >
                <img loading="lazy" src={mediaUrl(img.image_path)} alt={img.category} />
                <span>{img.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-ctrls">
          <button
            type="button"
            className="slide-btn"
            aria-label="Slide sebelumnya"
            onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
          >
            ‹
          </button>
          <span className="slide-info">
            Batch {page + 1} / {totalPages} ({items.length} Foto)
          </span>
          <button
            type="button"
            className="slide-btn"
            aria-label="Slide berikutnya"
            onClick={() => setPage((p) => (p + 1) % totalPages)}
          >
            ›
          </button>
        </div>
      </div>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </section>
  )
}
