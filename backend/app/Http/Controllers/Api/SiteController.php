<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function index()
    {
        return response()->json([
            'settings' => $this->settingsMap(),
            'hero_slides' => HeroSlide::where('is_active', true)->orderBy('sort')->get(),
            'features' => Feature::where('is_active', true)->orderBy('sort')->get(),
            'services' => Service::where('is_active', true)->orderBy('sort')->get(),
            'partners' => Partner::where('is_active', true)->orderBy('sort')->get(),
            'gallery_categories' => GalleryCategory::orderBy('sort')->pluck('name'),
            'gallery_images' => GalleryImage::where('is_active', true)->orderBy('sort')->get(),
            'legalities' => Legality::where('is_active', true)->orderBy('sort')->get(),
            'values' => CompanyValue::where('is_active', true)->orderBy('sort')->get(),
            'mission_items' => MissionItem::where('is_active', true)->orderBy('sort')->get(),
            'faqs' => Faq::where('is_active', true)->orderBy('sort')->get(),
            'testimonials' => Testimonial::where('is_active', true)->orderBy('sort')->get(),
            'contact_lines' => ContactLine::where('is_active', true)->orderBy('sort')->get(),
            'footer_links' => [
                'nav' => FooterLink::where('area', 'nav')->orderBy('sort')->get(),
                'services' => FooterLink::where('area', 'services')->orderBy('sort')->get(),
            ],
        ]);
    }

    public function settings()
    {
        return response()->json($this->settingsMap());
    }

    public function service(string $slug)
    {
        return response()->json(
            Service::where('slug', $slug)->where('is_active', true)->firstOrFail()
        );
    }

    public function gallery(Request $request)
    {
        $query = GalleryImage::where('is_active', true);

        if ($request->filled('category')) {
            $query->where('category', $request->query('category'));
        }

        return response()->json($query->orderBy('sort')->get());
    }

    /**
     * @return array<string, string|null>
     */
    private function settingsMap(): array
    {
        return Setting::query()->pluck('setting_value', 'setting_key')->all();
    }
}
