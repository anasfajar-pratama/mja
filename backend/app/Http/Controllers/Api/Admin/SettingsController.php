<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return response()->json($this->all());
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'settings' => 'required|array',
            'settings.*' => 'nullable|string',
        ]);

        foreach ($data['settings'] as $key => $value) {
            Setting::updateOrCreate(
                ['setting_key' => $key],
                ['setting_value' => $value, 'setting_group' => explode('.', $key)[0]],
            );
        }

        return response()->json($this->all());
    }

    /**
     * @return array<string, string|null>
     */
    private function all(): array
    {
        return Setting::query()->pluck('setting_value', 'setting_key')->all();
    }
}
