<?php

namespace App\Imports;

use App\Models\Applicant;
use App\Models\Program;
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
        foreach ($collection->skip(1) as $row) { // Skip the first row (headers)
            // Find the corresponding Program
            $program = Program::where('acronym', 'LIKE', substr($row[3], 0, 3) . '%')->first();
            $create_date = self::excelToTimestamp($row[0]);
            $bday = self::excelToTimestamp($row[8]);

            $applicant = Applicant::where('email', 'LIKE', $row[1])->first();

            if ($applicant) {
                
                $applicant->update([
                    'created_at'  => $create_date,
                    'prog'        => $program ? $program->id : null, // Assign program ID if found
                    'sr_name'     => $row[4],
                    'f_name'      => $row[5],
                    'm_name'      => $row[6],
                    'sex'         => $row[7],
                    'bday'        => $bday ,
                    'bplace'      => $row[9],
                    'cont'        => $row[10],
                    'tag_res'     => $row[11],
                    'curr_add'    => $row[12],
                    'fb_acc'      => $row[13],
                    'fb_acc_link' => $row[14],
                    'bs_degree'   => $row[15],
                    'l_schl_att'  => $row[16],
                    'yr_grad'     => $row[17],
                    'curr_emp'    => $row[18],
                    'conn_com_ins' => $row[19],
                    'curr_occ'    => $row[20],
                    'l_serv'      => $row[21],
                    'reason'      => $row[22],
                    'gov_id'      => $row[23],
                    'tor'         => $row[24],
                    'voter_id'    => $row[25],
                    'status'      => 1, // for status be pending(1)
                ]);

            } else {

                Applicant::create([
                    'created_at'  => $create_date,
                    'email'       => $row[1],
                    'prog'        => $program ? $program->id : null, // Assign program ID if found
                    'sr_name'     => $row[4],
                    'f_name'      => $row[5],
                    'm_name'      => $row[6],
                    'sex'         => $row[7],
                    'bday'        => $bday,
                    'bplace'      => $row[9],
                    'cont'        => $row[10],
                    'tag_res'     => $row[11],
                    'curr_add'    => $row[12],
                    'fb_acc'      => $row[13],
                    'fb_acc_link' => $row[14],
                    'bs_degree'   => $row[15],
                    'l_schl_att'  => $row[16],
                    'yr_grad'     => $row[17],
                    'curr_emp'    => $row[18],
                    'conn_com_ins' => $row[19],
                    'curr_occ'    => $row[20],
                    'l_serv'      => $row[21],
                    'reason'      => $row[22],
                    'gov_id'      => $row[23],
                    'tor'         => $row[24],
                    'voter_id'    => $row[25],
                    'status'      => 1, // for status be pending(1)
                ]);

            }
        }
    }

    public function model(array $row)
    {
        // $this->num++;

        // if ($this->num > 1) {
        //     // this code have same result but the other code is much more optimize
        //     // $shortAcronym = substr($row[3] , 0 , 3 );
        //     // $program = Program::where('acronym', 'LIKE', $shortAcronym . '%')->first();

        //     $program = Program::where('acronym', 'LIKE', substr($row[3], 0, 3) . '%')->first();

        //     $applicant = new Applicant();
        //     $applicant->created_at  = $row[0];
        //     $applicant->email       = $row[1];
        //     $applicant->prog        = $program ? $program->id : null;
        //     $applicant->sr_name     = $row[4];
        //     $applicant->f_name      = $row[5];
        //     $applicant->m_name      = $row[6];
        //     $applicant->sex         = $row[7];
        //     $applicant->bday        = $row[8];
        //     $applicant->bplace      = $row[9];
        //     $applicant->cont        = $row[10];
        //     $applicant->tag_res     = $row[11];
        //     $applicant->curr_add    = $row[12];
        //     $applicant->fb_acc      = $row[13];
        //     $applicant->fb_acc_link = $row[14];
        //     $applicant->bs_degree   = $row[15];
        //     $applicant->l_schl_att  = $row[16];
        //     $applicant->yr_grad     = $row[17];
        //     $applicant->curr_emp    = $row[18];
        //     $applicant->conn_com_ins = $row[19];
        //     $applicant->curr_occ    = $row[20];
        //     $applicant->l_serv      = $row[21];
        //     $applicant->reason      = $row[22];
        //     $applicant->gov_id      = $row[23];
        //     $applicant->tor         = $row[24];
        //     $applicant->voter_id    = $row[25];
        // }

        // dd($row);
    }


    public function excelToTimestamp($excelSerial, $format = 'Y-m-d H:i:s')
    {
        // Set timezone to Asia/Manila
        date_default_timezone_set('Asia/Manila');

        // Excel's real epoch is 1899-12-30 (to correct for the leap year bug)
        $excelEpoch = strtotime('1899-12-30');

        // Split the serial into the integer (days) and fractional part (time)
        $days = floor($excelSerial);
        $fraction = $excelSerial - $days;

        // Calculate the date part
        $date = strtotime("+$days days", $excelEpoch);

        // If there's a fractional part, calculate the time part
        if ($fraction > 0) {
            $time = $fraction * 86400;  // Convert fraction to seconds
            $timestamp = $date + $time;
        } else {
            $timestamp = $date;
        }

        // Return the timestamp in the requested format
        return date($format, $timestamp);
    }
}
