<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exam_date', function (Blueprint $table) {
            $table->id();
            $table->string('exam_date');
            $table->string('status')->default('0');
            $table->timestamps();
        });
        
        Schema::create('exam_room', function (Blueprint $table) {
            $table->id();
            $table->string('exam_room');
            $table->string('status')->default('0');
            $table->timestamps();
        });

        
    }
    
    //$table->timestamp('email_verified_at')->nullable();
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_date');
        Schema::dropIfExists('exam_room');
    }
};
