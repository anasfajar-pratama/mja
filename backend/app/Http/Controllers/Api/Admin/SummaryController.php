<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\GalleryImage;
use App\Models\HeroSlide;
use App\Models\Partner;
use App\Models\Service;
use App\Models\Testimonial;

class SummaryController extends Controller
{
    public function index()
    {
        return response()->json([
            'hero_slides' => HeroSlide::count(),
            'services' => Service::count(),
            'gallery_images' => GalleryImage::count(),
            'partners' => Partner::count(),
            'faqs' => Faq::count(),
            'testimonials' => Testimonial::count(),
        ]);
    }
}
