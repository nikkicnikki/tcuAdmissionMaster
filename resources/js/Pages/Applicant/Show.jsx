import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, applicant }) {
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {`Applicant "${`${applicant.f_name} ${applicant.m_name} ${applicant.sr_name}`.toUpperCase()}"`}
            </h2>
        }
      >
        <Head title={`Applicant "${`${applicant.f_name} ${applicant.m_name} ${applicant.sr_name}`.toUpperCase()}"`} />
        
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        
                    <div className="grid gap-1 grid-cols-2 mt-2">
                        {/* Left Section */}
                        <div>
                            <div>
                                <p className="mt-1"><label className="font-bold text-lg">ID : </label> {applicant.id}</p>
                            </div>

                            <div className="mt-1">
                                <p className="mt-1"><label className="font-bold text-lg">Name : </label> {`${applicant.f_name} ${applicant.m_name} ${applicant.sr_name}`.toUpperCase()}</p>
                            </div>

                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Program : </label> 
                                    {applicant.prog.name.toUpperCase() +" - "+applicant.prog.acronym.toUpperCase()}
                                </p>
                            </div>

                            
                        </div>
                                
                        {/* Right Section */}
                        <div >
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Status : </label> 
                                    <span
                                        className={
                                            "px-2 py-1 rounded text-white " +
                                            APPLICANT_STATUS_CLASS_MAP[applicant.status]
                                        }
                                    >
                                        {APPLICANT_STATUS_TEXT_MAP[applicant.status]}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Exam Date : </label> {applicant?.exam_date}   
                                    <label className="font-bold text-lg"> Time : </label> {applicant?.exam_room}
                                </p>
                            </div>

                            <div>
                                <p className="mt-5"><label className="font-bold text-lg">Validate By : </label> {applicant.validate_by?.name?.toUpperCase()}</p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1"><label className="font-bold text-lg">Printed By : </label> {applicant.printed_by?.name?.toUpperCase()}</p>
                            </div>
                            
                            <div className="mt-5">
                                <p className="mt-1">
                                <label className="font-bold text-lg">Printed Date : </label> 
                                {new Date(applicant.printed_date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="mt-5">
                                <p className="mt-1"><label className="font-bold text-lg">Score By : </label> {applicant.score_by?.name?.toUpperCase()}</p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1"><label className="font-bold text-lg">Score : </label> {applicant?.score}</p>
                            </div>

                            <div className="mt-5">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Create Date : </label> 
                                    {new Date(applicant.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Update Date : </label> 
                                    {new Date(applicant.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        
                    </div>
                       
                    </div> 
                </div> 
            </div>
        </div> 
      </AuthenticatedLayout>  
    )
}