<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; //use for DB
use Carbon\Carbon;  //use for carbon

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('barangay')->insert([

            ['name' => 'OTHERS', 'created_at' => Carbon::now()],
            	
            ['name' => 'BAGUMBAYAN', 'created_at' => Carbon::now()],
            ['name' => 'BAMBANG', 'created_at' => Carbon::now()],
            ['name' => 'CALZADA-TIPAS', 'created_at' => Carbon::now()],
            ['name' => 'CEMBO', 'created_at' => Carbon::now()],
            ['name' => 'CENTRAL BICUTAN', 'created_at' => Carbon::now()],

            ['name' => 'CENTRAL SIGNAL', 'created_at' => Carbon::now()],
            ['name' => 'COMEMBO', 'created_at' => Carbon::now()],
            ['name' => 'EAST REMBO', 'created_at' => Carbon::now()],
            ['name' => 'FORT BONIFACIO', 'created_at' => Carbon::now()],
            ['name' => 'HAGONOY', 'created_at' => Carbon::now()],

            ['name' => 'IBAYO-TIPAS', 'created_at' => Carbon::now()],
            ['name' => 'KATUPARAN', 'created_at' => Carbon::now()],
            ['name' => 'LIGID-TIPAS', 'created_at' => Carbon::now()],
            ['name' => 'LOWER BICUTAN', 'created_at' => Carbon::now()],
            ['name' => 'MAHARLIKA', 'created_at' => Carbon::now()],

            ['name' => 'NAPINDAN', 'created_at' => Carbon::now()],
            ['name' => 'NEW LOWER BICUTAN', 'created_at' => Carbon::now()],
            ['name' => 'NORTH DAANG HARI', 'created_at' => Carbon::now()],
            ['name' => 'NORTH SIGNAL', 'created_at' => Carbon::now()],
            ['name' => 'PALINGON-TIPAS', 'created_at' => Carbon::now()],

            ['name' => 'PEMBO', 'created_at' => Carbon::now()],
            ['name' => 'PINAGSAMA', 'created_at' => Carbon::now()],
            ['name' => 'PITOGO', 'created_at' => Carbon::now()],
            ['name' => 'POST PROPER NORTHSIDE', 'created_at' => Carbon::now()],
            ['name' => 'POST PROPER SOUTHSIDE', 'created_at' => Carbon::now()],

            ['name' => 'RIZAL', 'created_at' => Carbon::now()],
            ['name' => 'SAN MIGUEL', 'created_at' => Carbon::now()],
            ['name' => 'SOUTH CEMBO', 'created_at' => Carbon::now()],
            ['name' => 'SOUTH DAANG HARI', 'created_at' => Carbon::now()],
            ['name' => 'SOUTH SIGNAL', 'created_at' => Carbon::now()],

            ['name' => 'STA. ANA', 'created_at' => Carbon::now()],
            ['name' => 'TANYAG', 'created_at' => Carbon::now()],
            ['name' => 'TUKTUKAN', 'created_at' => Carbon::now()],
            ['name' => 'UPPER BICUTAN', 'created_at' => Carbon::now()],
            ['name' => 'USUSAN', 'created_at' => Carbon::now()],

            ['name' => 'WAWA', 'created_at' => Carbon::now()],
            ['name' => 'WEST REMBO', 'created_at' => Carbon::now()],
            ['name' => 'WESTERN BICUTAN', 'created_at' => Carbon::now()],

            
        ]);
    }
}