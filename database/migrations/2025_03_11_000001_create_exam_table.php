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
        Schema::create('exam_dates', function (Blueprint $table) {
            $table->id();
            $table->string('exam_date');
            $table->integer('status')->default(2);
            $table->text('des')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        
        Schema::create('exam_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('exam_room');
            $table->integer('status')->default(2);
            $table->integer('set_user')->nullable();
            $table->text('des')->nullable();
            $table->integer( 'limit')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        Schema::create('exam_time', function (Blueprint $table){
            $table->id();
            $table->string('exam_time');
            $table->integer('status')->default(2);
            $table->text('des')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        
    }
    
    //$table->timestamp('email_verified_at')->nullable();
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_dates');
        Schema::dropIfExists('exam_rooms');
        Schema::dropIfExists('exam_time');
    }
};
