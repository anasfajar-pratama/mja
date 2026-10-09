<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $t) {
            $t->id();
            $t->string('setting_key')->unique();
            $t->text('setting_value')->nullable();
            $t->string('setting_group')->nullable();
            $t->timestamps();
        });

        Schema::create('hero_slides', function (Blueprint $t) {
            $t->id();
            $t->string('variant')->default('dark');
            $t->string('eyebrow')->nullable();
            $t->text('title_html')->nullable();
            $t->text('lead')->nullable();
            $t->string('btn_primary_label')->nullable();
            $t->string('btn_primary_href')->nullable();
            $t->string('btn_secondary_label')->nullable();
            $t->string('btn_secondary_href')->nullable();
            $t->string('image_path')->nullable();
            $t->string('image_mini')->nullable();
            $t->string('badge_title')->nullable();
            $t->string('badge_text')->nullable();
            $t->json('stats')->nullable();
            $t->json('highlights')->nullable();
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('features', function (Blueprint $t) {
            $t->id();
            $t->string('icon')->nullable();
            $t->string('title');
            $t->text('text')->nullable();
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('services', function (Blueprint $t) {
            $t->id();
            $t->string('slug')->unique();
            $t->string('icon')->nullable();
            $t->string('tag_label')->nullable();
            $t->string('category')->nullable();
            $t->string('title');
            $t->text('summary')->nullable();
            $t->text('description')->nullable();
            $t->string('image_path')->nullable();
            $t->json('chips')->nullable();
            $t->json('benefits')->nullable();
            $t->json('sectors')->nullable();
            $t->boolean('is_featured')->default(false);
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('partners', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('logo_path')->nullable();
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('gallery_categories', function (Blueprint $t) {
            $t->id();
            $t->string('name')->unique();
            $t->integer('sort')->default(0);
            $t->timestamps();
        });

        Schema::create('gallery_images', function (Blueprint $t) {
            $t->id();
            $t->string('category');
            $t->string('image_path');
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('legalities', function (Blueprint $t) {
            $t->id();
            $t->string('label');
            $t->text('value')->nullable();
            $t->boolean('is_full_width')->default(false);
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('company_values', function (Blueprint $t) {
            $t->id();
            $t->string('letter');
            $t->string('title');
            $t->text('description')->nullable();
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('mission_items', function (Blueprint $t) {
            $t->id();
            $t->text('text');
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('faqs', function (Blueprint $t) {
            $t->id();
            $t->text('question');
            $t->text('answer')->nullable();
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('testimonials', function (Blueprint $t) {
            $t->id();
            $t->text('quote');
            $t->string('name');
            $t->string('role')->nullable();
            $t->string('initials')->nullable();
            $t->unsignedTinyInteger('rating')->default(5);
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('contact_lines', function (Blueprint $t) {
            $t->id();
            $t->string('label');
            $t->text('value')->nullable();
            $t->string('href')->nullable();
            $t->boolean('is_link')->default(false);
            $t->integer('sort')->default(0);
            $t->boolean('is_active')->default(true);
            $t->timestamps();
        });

        Schema::create('footer_links', function (Blueprint $t) {
            $t->id();
            $t->string('area')->default('nav');
            $t->string('label');
            $t->string('href')->nullable();
            $t->integer('sort')->default(0);
            $t->timestamps();
        });
    }

    public function down(): void
    {
        foreach ([
            'footer_links', 'contact_lines', 'testimonials', 'faqs', 'mission_items',
            'company_values', 'legalities', 'gallery_images', 'gallery_categories',
            'partners', 'services', 'features', 'hero_slides', 'settings',
        ] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
