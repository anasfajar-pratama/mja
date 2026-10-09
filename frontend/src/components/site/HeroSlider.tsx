import { useState } from 'react'
import type { HeroSlide } from '../../types'
import { mediaUrl } from '../../lib/media'
import Icon from '../common/Icon'

function Blueprint() {
  return (
    <svg className="deco-blueprint" viewBox="0 0 800 560" fill="none" preserveAspectRatio="xMidYMid meet">
      <g stroke="#10234b" strokeWidth={2} fill="none">
        <rect x="120" y="150" width="560" height="300" />
        <rect x="180" y="230" width="150" height="220" />
        <rect x="360" y="200" width="160" height="250" />
        <rect x="550" y="270" width="110" height="180" />
        <path d="M80 450h640" />
        <path d="M120 110v380M680 110v380M80 150h640" />
        <path d="M120 110 150 140M680 110 650 140M120 490 150 460M680 490 650 460" />
        <circle cx="650" cy="110" r="42" />
        <path d="M180 190h150M360 160h160M550 230h110" />
      </g>
    </svg>
  )
}

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)

  if (slides.length === 0) return null
  const active = ((index % slides.length) + slides.length) % slides.length
  const go = (step: number) => setIndex((prev) => (((prev + step) % slides.length) + slides.length) % slides.length)

  return (
    <section className="hero" aria-label="Sorotan utama">
      <div className="hero-slides">
        {slides.map((slide, idx) => (
          <div key={slide.id} className={`hero-slide ${slide.variant}${idx === active ? ' active' : ''}`}>
            {slide.variant === 'light' && (
              <div className="hero-deco" aria-hidden="true">
                <span className="deco-chevron deco-tl" />
                <span className="deco-chevron deco-br" />
                <Blueprint />
              </div>
            )}

            <div className="container hero-grid">
              <div>
                {slide.eyebrow && (
                  <div className={`eyebrow${slide.variant === 'dark' ? ' on-dark' : ''}`}>{slide.eyebrow}</div>
                )}
                {slide.title_html && <h1 dangerouslySetInnerHTML={{ __html: slide.title_html }} />}
                {slide.lead && (
                  <p className={`lead${slide.variant === 'dark' ? ' on-dark' : ''}`}>{slide.lead}</p>
                )}

                <div className="hero-actions">
                  {slide.btn_primary_label && (
                    <a className="btn" href={slide.btn_primary_href || '#'}>
                      {slide.btn_primary_label}
                    </a>
                  )}
                  {slide.btn_secondary_label &&
                    (slide.variant === 'dark' ? (
                      <a className="phone" href={slide.btn_secondary_href || '#'}>
                        <Icon name="i-phone" /> {slide.btn_secondary_label}
                      </a>
                    ) : (
                      <a className="btn outline-navy" href={slide.btn_secondary_href || '#'}>
                        {slide.btn_secondary_label}
                      </a>
                    ))}
                </div>

                {slide.variant === 'dark' && !!slide.stats?.length && (
                  <div className="hero-stats">
                    {slide.stats.map((stat, k) => (
                      <div className="hstat" key={k}>
                        <b>{stat.value}</b>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {slide.variant === 'light' && !!slide.highlights?.length && (
                  <div className="hero2-highlights">
                    {slide.highlights.map((h, k) => (
                      <div className="h2h" key={k}>
                        <Icon name={h.icon || 'i-badge'} />
                        <div>
                          <b>{h.title}</b>
                          <span>{h.subtitle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {slide.variant === 'dark' ? (
                <div className="collage">
                  <img className="main" src={mediaUrl(slide.image_path)} alt="" />
                  {slide.image_mini && <img className="mini" src={mediaUrl(slide.image_mini)} alt="" />}
                  {slide.badge_title && (
                    <div className="play">
                      <Icon name="i-play" />
                      <div>
                        <b>{slide.badge_title}</b>
                        <span>{slide.badge_text}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hero2-media">
                  <img src={mediaUrl(slide.image_path)} alt="" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="hero-arrow hero-prev" type="button" aria-label="Tampilan hero sebelumnya" onClick={() => go(-1)}>
            ‹
          </button>
          <button className="hero-arrow hero-next" type="button" aria-label="Tampilan hero berikutnya" onClick={() => go(1)}>
            ›
          </button>
          <div className="hero-dots" aria-label="Pilih tampilan hero">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`hero-dot${idx === active ? ' active' : ''}`}
                aria-label={`Tampilkan tampilan ${idx + 1}`}
                onClick={() => setIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
