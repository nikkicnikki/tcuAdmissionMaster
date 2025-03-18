<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; //use for DB
use Carbon\Carbon;  //use for carbon

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('programs')->insert([
            ['name' => 'MASTER IN PUBLIC ADMINISTRATION','acronym' => 'MPA' ,'created_at' => Carbon::now()],
            ['name' => 'MASTER IN BUSINESS ADMINISTRATION','acronym' => 'MBA' ,'created_at' => Carbon::now()],
            ['name' => 'MASTER OF ARTS IN EDUCATIONAL MAJOR IN EDUCATIONAL MANAGEMENT','acronym' => 'MAE-MEM' ,'created_at' => Carbon::now()],
            ['name' => 'MASTER OF SCIENCE IN CRIMINAL JUSTICE','acronym' => 'MSCJ' ,'created_at' => Carbon::now()],
            
        ]);
    }
}