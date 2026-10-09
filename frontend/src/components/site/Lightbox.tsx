import { useEffect } from 'react'
import type { GalleryImage } from '../../types'
import { mediaUrl } from '../../lib/media'

export default function Lightbox({ item, onClose }: { item: GalleryImage | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null

  return (
    <div className="modal open" role="dialog" aria-modal="true" aria-label="Foto dokumentasi" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-inner">
        <button className="modal-close" type="button" aria-label="Tutup foto" onClick={onClose}>
          ×
        </button>
        <img src={mediaUrl(item.image_path)} alt={item.category} />
        <div className="modal-title">{item.category}</div>
      </div>
    </div>
  )
}
