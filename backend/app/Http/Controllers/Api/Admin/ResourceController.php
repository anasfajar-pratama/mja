<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    /**
     * @return array{model: class-string, rules: array<string, mixed>}
     */
    private function config(string $resource): array
    {
        $config = config("cms.resources.{$resource}");

        abort_if(! $config, 404, "Unknown resource: {$resource}");

        return $config;
    }

    public function index(string $resource)
    {
        $config = $this->config($resource);
        $model = $config['model'];

        return response()->json(
            $model::query()->orderBy('sort')->orderBy('id')->get()
        );
    }

    public function show(string $resource, int $id)
    {
        $config = $this->config($resource);
        $model = $config['model'];

        return response()->json($model::findOrFail($id));
    }

    public function store(Request $request, string $resource)
    {
        $config = $this->config($resource);
        $data = $request->validate($config['rules']);
        $model = $config['model'];

        return response()->json($model::create($data), 201);
    }

    public function update(Request $request, string $resource, int $id)
    {
        $config = $this->config($resource);
        $data = $request->validate($config['rules']);
        $model = $config['model'];

        $item = $model::findOrFail($id);
        $item->update($data);

        return response()->json($item);
    }

    public function destroy(string $resource, int $id)
    {
        $config = $this->config($resource);
        $model = $config['model'];

        $model::findOrFail($id)->delete();

        return response()->json(['ok' => true]);
    }

    public function reorder(Request $request, string $resource)
    {
        $config = $this->config($resource);
        $ids = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
        ])['ids'];
        $model = $config['model'];

        foreach ($ids as $position => $id) {
            $model::whereKey($id)->update(['sort' => $position + 1]);
        }

        return response()->json(['ok' => true]);
    }
}
