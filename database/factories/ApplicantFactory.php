<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Applicant;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Applicant>
 */
class ApplicantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    // php artisan tinker 
    // \App\Models\Applicant::factory(500)->create()

    protected $model = Applicant::class;

    public function definition(): array
    {
        $gender = fake()->randomElement(['male', 'female']);
        $username = fake()->userName();
        $yesno = fake()->randomElement(['yes','no']);
        $fakeGoogleDrive = fake()->regexify('[a-zA-Z0-9_-]{28}');
        $printedBy = fake()->optional(0.7)->numberBetween(1,2);
        $status = fake()->numberBetween(0,2);
        $timeStamps = fake()->dateTimeBetween('2025-02-10', '2025-4-15')->format('Y-m-d');
        $scoreBy = fake()->optional(0.7)->numberBetween(1, 2); 

        return [
            
            'sr_name'   => fake()->lastName(),
            'f_name'    => fake()->firstName($gender),
            'm_name'    => fake()->firstName($gender),
            'prog'      => fake()->numberBetween(1,4),
            'sex'       => fake()->randomElement(['male' , 'female']),
            'bday'      => fake()->dateTimeBetween('1988-01-01', '2001-12-31')->format('Y-m-d'),
            'bplace'    => fake()->city(),
            'cont'      => fake()->phoneNumber(),
            'email'     => fake()->unique()->safeEmail(),
            'tag_res'   => $yesno,
            'curr_add'  => fake()->address(),
            'brgy'      => fake()->numberBetween(1,39),
            'fb_acc'    => $username,
            'fb_acc_link' => 'https://www.facebook.com/'. $username,

            'bs_degree' => fake()->randomElement([
                'Bachelor of Science in Computer Science',
                'Bachelor of Arts in Psychology',
                'Bachelor of Business Administration',
                'Bachelor of Engineering in Civil Engineering',
                'Bachelor of Science in Information Technology',
                'Bachelor of Science in Nursing',
                'Bachelor of Fine Arts in Graphic Design',
                'Bachelor of Science in Mechanical Engineering',
                'Bachelor of Science in Biology',
                'Bachelor of Arts in English Literature'
            ]),

            'l_schl_att' => fake()->randomElement([
                'Taguig City University',
                'Riverside College',
                'Hilltop Academy',
                'Grandview Institute of Technology',
                'Eastwood International University',
                'Greenfield State University',
                'Silver Lake Community College',
                'Northgate Pasok Mow Poh Institute',
                'Jefferson Highblood University',
                'Franco School of Business'
            ]),

            'yr_grad'   => fake()->dateTimeBetween('2015-01-01', '2024-12-31')->format('Y-m-d'),
            'curr_emp'  => fake()->randomElement(['yes','no']),
            'gov_vald'  => fake()->randomElement(['yes','no']),

            'conn_com_ins'  => fake()->randomElement([
                'N/A',
                'Springfield Institute of Technology',
                'Riverside Training Academy',
                'Grandview Business Institute',
                'Eastwood Polytechnic College',
                'Greenfield Technical Institute',
                'Silver Lake Training Center',
                'Northgate Professional Academy',
                'Western Heights Learning Institute',
                'Brighton College of Engineering',
                'Hilltop Science and Research Institute'
            ]),

            'curr_occ'      => fake()->jobTitle(),
            'l_serv'        => fake()->numberBetween(1,15),
            'gov_id'        => fake()->randomElement([
                'Passport',
                'Driver’s License',
                'Social Security Card',
                'National ID',
                'Voter’s ID',
                'Taxpayer Identification Number (TIN)',
            ]),

            'voter_id'      => fake()->numerify('##########') ,
            'tor'           => "https://drive.google.com/uc?id={$fakeGoogleDrive}" ,
            'app_pic'       => "https://drive.google.com/uc?id={$fakeGoogleDrive}" ,
            'status'        => $status ,
            'exam_date'     => $status === 2 ? fake()->numberBetween(1,3) : null ,
            'exam_room'     => $status === 2 ? fake()->numberBetween(1,3) : null ,
            
            'remarks'       => $status === 1 ? fake()->sentence() : null ,
            
            'created_at'    => $status === 0 ? $timeStamps : null,
            'updated_at'    => $status === 0 ? $timeStamps : null,
            'validate_by'   => fake()->numberBetween(1,2),
            'printed_by'    => $printedBy ,
            'score_by'      => $scoreBy , 
            
            'printed_date'  => $printedBy ? fake()->dateTimeBetween('2025-02-01', '2025-3-31')->format('Y-m-d') : null,
            'image_capture' => $printedBy ? $fakeGoogleDrive.".img" : null,
            
            'score'         => !is_null($scoreBy) ? fake()->randomFloat(2, 50, 100) : fake()->numberBetween(50, 100),


        ];
    }
}
