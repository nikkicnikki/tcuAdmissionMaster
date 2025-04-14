<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            $table->string('sr_name');
            $table->string('f_name');
            $table->string('m_name');
            $table->foreignId('prog')->constrained('programs');
            $table->string('sex');
            $table->date('bday');
            $table->string('bplace');
            $table->string('cont');
            $table->string('email');
            $table->string('tag_res'); 
            $table->string('curr_add'); 
            //$table->foreignId('brgy')->nullable(); 
            $table->string('fb_acc');   
            $table->string('fb_acc_link');  
            $table->string('bs_degree');
            $table->string('l_schl_att');
            $table->string('yr_grad');
            $table->string('curr_emp');

            $table->string('conn_com_ins');
            $table->string('curr_occ');
            $table->string('l_serv');
            $table->string('gov_id');
            $table->string('voter_id');
            $table->string('tor');
            $table->longText('reason')->nullable();
            
            
            $table->smallinteger('exam_date')->nullable();
            $table->smallinteger('exam_room')->nullable();

            $table->longText('remarks')->nullable();
            
            
            //$table->timestamps()->nullable();   //create_at , update_at column
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            
            $table->string('status')->default('0');
            
            $table->foreignId('validate_by')->nullable();
            $table->foreignId('printed_by')->nullable();   
            $table->foreignId('score_by')->nullable();
            
            $table->string('image_capture')->nullable();
            $table->timestamp('printed_date')->nullable();
            
            $table->double('score')->nullable();
        

        });
        
        
    }
    
    //$table->timestamp('email_verified_at')->nullable();
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
