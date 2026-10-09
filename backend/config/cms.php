<?php

return [

    /*
    |--------------------------------------------------------------------------
    | CMS Resources (config-driven CRUD)
    |--------------------------------------------------------------------------
    | Each key is the resource slug used in the admin API
    | (/api/admin/{resource}). The ResourceController uses this map to build
    | validation and query the right model, so new collections only need an
    | entry here.
    */

    'resources' => [

        'hero-slides' => [
            'model' => \App\Models\HeroSlide::class,
            'rules' => [
                'variant' => 'nullable|in:dark,light',
                'eyebrow' => 'nullable|string|max:255',
                'title_html' => 'nullable|string',
                'lead' => 'nullable|string',
                'btn_primary_label' => 'nullable|string|max:255',
                'btn_primary_href' => 'nullable|string|max:255',
                'btn_secondary_label' => 'nullable|string|max:255',
                'btn_secondary_href' => 'nullable|string|max:255',
                'image_path' => 'nullable|string|max:255',
                'image_mini' => 'nullable|string|max:255',
                'badge_title' => 'nullable|string|max:255',
                'badge_text' => 'nullable|string|max:255',
                'stats' => 'nullable|array',
                'highlights' => 'nullable|array',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'features' => [
            'model' => \App\Models\Feature::class,
            'rules' => [
                'icon' => 'nullable|string|max:255',
                'title' => 'required|string|max:255',
                'text' => 'nullable|string',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'services' => [
            'model' => \App\Models\Service::class,
            'rules' => [
                'slug' => 'required|string|max:255|alpha_dash',
                'icon' => 'nullable|string|max:255',
                'tag_label' => 'nullable|string|max:255',
                'category' => 'nullable|string|max:255',
                'title' => 'required|string|max:255',
                'summary' => 'nullable|string',
                'description' => 'nullable|string',
                'image_path' => 'nullable|string|max:255',
                'chips' => 'nullable|array',
                'benefits' => 'nullable|array',
                'sectors' => 'nullable|array',
                'is_featured' => 'boolean',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'partners' => [
            'model' => \App\Models\Partner::class,
            'rules' => [
                'name' => 'required|string|max:255',
                'logo_path' => 'nullable|string|max:255',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'gallery-categories' => [
            'model' => \App\Models\GalleryCategory::class,
            'rules' => [
                'name' => 'required|string|max:255',
                'sort' => 'nullable|integer',
            ],
        ],

        'gallery-images' => [
            'model' => \App\Models\GalleryImage::class,
            'rules' => [
                'category' => 'required|string|max:255',
                'image_path' => 'required|string|max:255',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'legalities' => [
            'model' => \App\Models\Legality::class,
            'rules' => [
                'label' => 'required|string|max:255',
                'value' => 'nullable|string',
                'is_full_width' => 'boolean',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'values' => [
            'model' => \App\Models\CompanyValue::class,
            'rules' => [
                'letter' => 'required|string|max:5',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'mission-items' => [
            'model' => \App\Models\MissionItem::class,
            'rules' => [
                'text' => 'required|string',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'faqs' => [
            'model' => \App\Models\Faq::class,
            'rules' => [
                'question' => 'required|string',
                'answer' => 'nullable|string',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'testimonials' => [
            'model' => \App\Models\Testimonial::class,
            'rules' => [
                'quote' => 'required|string',
                'name' => 'required|string|max:255',
                'role' => 'nullable|string|max:255',
                'initials' => 'nullable|string|max:5',
                'rating' => 'nullable|integer|min:1|max:5',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'contact-lines' => [
            'model' => \App\Models\ContactLine::class,
            'rules' => [
                'label' => 'required|string|max:255',
                'value' => 'nullable|string',
                'href' => 'nullable|string|max:255',
                'is_link' => 'boolean',
                'sort' => 'nullable|integer',
                'is_active' => 'boolean',
            ],
        ],

        'footer-links' => [
            'model' => \App\Models\FooterLink::class,
            'rules' => [
                'area' => 'required|in:nav,services',
                'label' => 'required|string|max:255',
                'href' => 'nullable|string|max:255',
                'sort' => 'nullable|integer',
            ],
        ],

    ],

];
