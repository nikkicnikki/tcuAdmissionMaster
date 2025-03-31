<?php

namespace App\Imports;

use App\Models\Applicant;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;

class ImportApplicant implements ToCollection, ToModel
{
    
    private $num = 0;
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        //dd($collection);
    }

    public function model(array $row)
    {
        $this->num++;
        
        if($this->num > 1){
            $applicant = new Applicant();
            $applicant->created_at  = $row[0];
            $applicant->email       = $row[1];
            $applicant->prog        = $row[3]; //need to convert to integer 
            $applicant->sr_name     = $row[4];
            $applicant->f_name      = $row[5];
            $applicant->m_name      = $row[6];
            $applicant->sex         = $row[7];
            $applicant->bday        = $row[8];
            $applicant->bplace      = $row[9];
            $applicant->cont        = $row[10];
            $applicant->tag_res     = $row[11];
            $applicant->curr_add    = $row[12];
            $applicant->fb_acc      = $row[13];
            $applicant->fb_acc_link = $row[14];
            $applicant->bs_degree   = $row[15];
            $applicant->l_schl_att  = $row[16];
            $applicant->yr_grad     = $row[17];
            $applicant->curr_emp    = $row[18];
            $applicant->conn_com_ins= $row[19];
            $applicant->curr_occ    = $row[20];
            $applicant->l_serv      = $row[21];
            $applicant->reason      = $row[22];
            $applicant->gov_id      = $row[23];
            $applicant->tor         = $row[24];
            $applicant->voter_id    = $row[25];

        }

        // dd($row);
    }
}
