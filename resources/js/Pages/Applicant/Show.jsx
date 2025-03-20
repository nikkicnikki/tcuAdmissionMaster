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
                        
                        <div className="grip gap-1 grip-cols-2 mt-2">
                            <div className="leftside">
                                <div>
                                    <label className="font-bold text-lg">Applicant ID</label>
                                    <p className="mt-1">{applicant.id}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Applicant Name</label>
                                    <p className="mt-1">{`${applicant.f_name} ${applicant.m_name} ${applicant.sr_name}`.toUpperCase()}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="font-bold text-lg">Applicant Status</label>
                                    <p className="mt-1">
                                        <span className={
                                            "px-2 py-1 rounded text-white " +
                                            APPLICANT_STATUS_CLASS_MAP[applicant.status]
                                        }>
                                            {APPLICANT_STATUS_TEXT_MAP[applicant.status]}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <label className="font-bold text-lg">Create Date</label>
                                    <p className="mt-1">
                                        {new Date(applicant.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="rightside">
                                
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        </div> 
      </AuthenticatedLayout>  
    )
}