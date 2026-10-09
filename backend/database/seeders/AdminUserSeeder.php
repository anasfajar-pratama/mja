<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@mja.local'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('admin12345'),
            ]
        );

        $this->command?->info('Admin user: admin@mja.local / admin12345');
    }
}
