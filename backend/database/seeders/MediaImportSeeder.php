<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MediaImportSeeder extends Seeder
{
    /**
     * Copy the existing static assets (../assets) into the public storage disk
     * so the CMS owns its media and can serve/replace it through uploads.
     */
    public function run(): void
    {
        $source = base_path('../assets');

        if (! File::isDirectory($source)) {
            $this->command?->warn("Assets folder not found at {$source}");
            return;
        }

        $disk = Storage::disk('public');
        $disk->makeDirectory('media');

        $allowed = ['webp', 'png', 'jpg', 'jpeg', 'svg', 'gif'];
        $count = 0;

        // File::files() returns only top-level files (skips original/ and _bak-logo/).
        foreach (File::files($source) as $file) {
            if (! in_array(strtolower($file->getExtension()), $allowed, true)) {
                continue;
            }
            $disk->putFileAs('media', $file->getPathname(), $file->getFilename());
            $count++;
        }

        $this->command?->info("Imported {$count} media files into storage/app/public/media");
    }
}
