import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

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
        
        <div className="py-12 ">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300">
                        
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

                            <div className="mt-5">
                                <p className="mt-1"><label className="font-bold text-lg">Bachelor's Degree : </label> {applicant.bs_degree}</p>
                            </div>
                            <div>
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Year Graduate : </label> 
                                    {new Date(applicant.yr_grad).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="mt-1"><label className="font-bold text-lg">Last school attend : </label> {applicant.l_schl_att}</p>
                            </div>
                            <div>
                                <label className="font-bold text-lg">Transcript of Record : </label>
                                {applicant.tor ? (
                                    <Link 
                                        to="#"  // Prevents navigation within the app
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent React Router from handling the link
                                            window.open(applicant.tor, "_blank");
                                        }}
                                    >
                                        Click here
                                    </Link>
                                ) : "none"}
                            </div>
                            

                            <div className="mt-5">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Employed : </label> 
                                     {applicant.curr_emp}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Occupation : </label> 
                                    {applicant.curr_occ}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Length of Service : </label> 
                                    {applicant.l_serv ? applicant.l_serv+" Year/'s " : "" }
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Government Worker? : </label> 
                                    {applicant.gov_vald}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Gov. issued ID : </label> 
                                    {applicant.gov_id}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Voters ID : </label> 
                                    {applicant.voter_id}
                                </p>
                            </div>    
                            <div className="mt-1">
                                <label className="font-bold text-lg"> Company/Institution Currently Connected : </label> 
                                <p className="mt-1">{applicant.conn_com_ins}</p>
                            </div>
                            
                            <div className="mt-5">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Gender : </label> 
                                     {applicant.sex}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Birth Day : </label> 
                                     {new Date(applicant.bday).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Birth Place : </label> 
                                     {applicant.bplace}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Contact No. : </label> 
                                     {applicant.cont}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Email : </label> 
                                     {applicant.email}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Taguig Resident? : </label> 
                                     {applicant.tag_res}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Barangay (if from Taguig) : </label> 
                                     {applicant.brgy.name}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Address : </label> 
                                     {applicant.curr_add}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Facebook Account : </label> 
                                     {applicant.fb_acc} 
                                     {
                                        applicant.fb_acc_link ? (
                                            <Link 
                                                to="#"  // Prevents navigation within the app
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent React Router from handling the link
                                                    window.open(applicant.fb_acc_link, "_blank");
                                                }}
                                            >
                                                Click here
                                            </Link>
                                        ) : "none"
                                    }
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Applicant Profile : </label> 
                                     {
                                        applicant.app_pic ? (
                                            <Link 
                                                to="#"  // Prevents navigation within the app
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent React Router from handling the link
                                                    window.open(applicant.app_pic, "_blank");
                                                }}
                                            >
                                                Click here
                                            </Link>
                                        ) : "none"
                                    }
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
                            
                            <div className="mt-1">
                                <p className="mt-1">
                                <label className="font-bold text-lg">Printed Date : </label> 
                                {
                                    applicant.printed_date ? new Date(applicant.printed_date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }) : ''
                                }
                                </p>
                            </div>
                            
                            <div className="mt-5">
                                <p className="mt-1"><label className="font-bold text-lg">Profile : </label> {applicant.image_capture}</p>
                                {/* MAKE IT AT THE ICON ON TOP OR SHOW IMAGE */}
                            </div>
                            
                            <div>
                                <label className="font-bold text-lg">REMARKS :</label>
                                
                                {applicant.remarks && (
                                    applicant.status !== 3 ? 
                                            <p className="mt-1 bg-gray-200 p-4">{applicant.remarks}</p>
                                        : 
                                            <p className="mt-1 p-4">{applicant.remarks}</p>
                                )}  
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