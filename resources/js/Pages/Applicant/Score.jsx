import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Score({auth, applicant }) {

    const { data , setData , errors, put } = useForm({
        scorer: auth.user.id || '' ,
        applicant_id: applicant.id || '' ,
        f_name: applicant.f_name || '',
        m_name: applicant.m_name || '',
        sr_name: applicant.sr_name || '',
        score: applicant.score || '',
        exam_date: applicant.exam_date.exam_date || '',
        exam_room: applicant.exam_room.exam_room || '',
        image_capture: ''+ 


    });

    console.log(applicant);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex ">
                    <a
                        onClick={() => window.history.back()}
                        className="text-xl cursor-pointer font-semibold leading-tight text-gray-800 dark:text-gray-200 cursor-pointer hover:underline transition-colors duration-200">
                        &laquo; back
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Permit for {`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`}
                    </h2>
                </div>
            }
        >



            <h1>WELCOME TO MOBILE LEGENDS</h1>
            <pre>
                {JSON.stringify(applicant, null, 2)}
            </pre>

        </AuthenticatedLayout>
    );
}