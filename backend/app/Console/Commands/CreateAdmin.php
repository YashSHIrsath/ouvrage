<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdmin extends Command
{
    protected $signature   = 'app:create-admin';
    protected $description = 'Create the administrator account';

    public function handle(): int
    {
        if (User::where('role', 'admin')->exists()) {
            $this->error('An administrator account already exists.');
            $this->line('Use php artisan app:reset-admin-password to change the password.');

            return Command::FAILURE;
        }

        $this->info('Creating the administrator account.');
        $this->newLine();

        $name     = $this->ask('Name');
        $email    = $this->ask('Email');
        $password = $this->secret('Password');

        $validator = Validator::make(
            compact('name', 'email', 'password'),
            [
                'name'     => ['required', 'string', 'max:255'],
                'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
                'password' => ['required', 'string', 'min:8'],
            ]
        );

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return Command::FAILURE;
        }

        User::create([
            'name'       => $name,
            'email'      => $email,
            'password'   => Hash::make($password),
            'role'       => 'admin',
            'status'     => 1,
            'theme_mode' => 'dark',
        ]);

        $this->newLine();
        $this->info("Administrator account created successfully.");
        $this->line("Email: {$email}");

        return Command::SUCCESS;
    }
}
