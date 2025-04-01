import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, user }) {
    
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {`User "${user.name.toUpperCase()}"`}
            </h2>
        }
      >
        <Head title={`User "${user.name.toUpperCase()}"`} />
        
        <div className="py-12 ">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300">
                        
                    <div className="grid gap-1 grid-cols-2 mt-2">
                        {/* Left Section */}
                        <div>
                            <div>
                                <p className="mt-1"><label className="font-bold text-lg">ID : </label> {user.id}</p>
                            </div>

                            <div className="mt-1">
                                <p className="mt-1"><label className="font-bold text-lg">Name : </label> {`${user.f_name} ${user.m_name} ${user.sr_name}`.toUpperCase()}</p>
                            </div>

                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Program : </label> 
                                    {user.prog.name.toUpperCase() +" - "+user.prog.acronym.toUpperCase()}
                                </p>
                            </div>

                            <div className="mt-5">
                                <p className="mt-1"><label className="font-bold text-lg">Bachelor's Degree : </label> {user.bs_degree}</p>
                            </div>
                            <div>
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Year Graduate : </label> 
                                    {new Date(user.yr_grad).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="mt-1"><label className="font-bold text-lg">Last school attend : </label> {user.l_schl_att}</p>
                            </div>
                            <div>
                                <label className="font-bold text-lg">Transcript of Record : </label>
                                {user.tor ? (
                                    <Link 
                                        to="#"  // Prevents navigation within the app
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent React Router from handling the link
                                            window.open(user.tor, "_blank");
                                        }}
                                    >
                                        Click here
                                    </Link>
                                ) : "none"}
                            </div>
                            

                            <div className="mt-5">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Employed : </label> 
                                     {user.curr_emp}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Occupation : </label> 
                                    {user.curr_occ}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Length of Service : </label> 
                                    {user.l_serv ? user.l_serv+" Year/'s " : "" }
                                </p>
                            </div>
                            
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Gov. issued ID : </label> 
                                    {user.gov_id}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg"> Voters ID : </label> 
                                    {user.voter_id}
                                </p>
                            </div>    
                            <div className="mt-1">
                                <label className="font-bold text-lg"> Company/Institution Currently Connected : </label> 
                                <p className="mt-1">{user.conn_com_ins}</p>
                            </div>
                            
                            <div className="mt-5">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Gender : </label> 
                                     {user.sex}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Birth Day : </label> 
                                     {new Date(user.bday).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Birth Place : </label> 
                                     {user.bplace}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Contact No. : </label> 
                                     {user.cont}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Email : </label> 
                                     {user.email}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Taguig Resident? : </label> 
                                     {user.tag_res}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Barangay (if from Taguig) : </label> 
                                     {user.brgy.name}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Address : </label> 
                                     {user.curr_add}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Facebook Account : </label> 
                                     {user.fb_acc} 
                                     {
                                        user.fb_acc_link ? (
                                            <Link 
                                                to="#"  // Prevents navigation within the app
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent React Router from handling the link
                                                    window.open(user.fb_acc_link, "_blank");
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
                                    <label className="font-bold text-lg">User Profile : </label> 
                                     {
                                        user.app_pic ? (
                                            <Link 
                                                to="#"  // Prevents navigation within the app
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent React Router from handling the link
                                                    window.open(user.app_pic, "_blank");
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
                                            USER_STATUS_CLASS_MAP[user.status]
                                        }
                                    >
                                        {USER_STATUS_TEXT_MAP[user.status]}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Exam Date : </label> {user?.user.user}   
                                    <label className="font-bold text-lg"> Time : </label> {user?.exam_room.exam_room}
                                </p>
                            </div>

                            <div>
                                <p className="mt-5"><label className="font-bold text-lg">Validate By : </label> {user.validate_by?.name?.toUpperCase()}</p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1"><label className="font-bold text-lg">Printed By : </label> {user.printed_by?.name?.toUpperCase()}</p>
                            </div>
                            
                            <div className="mt-1">
                                <p className="mt-1">
                                <label className="font-bold text-lg">Printed Date : </label> 
                                {
                                    user.printed_date ? new Date(user.printed_date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }) : ''
                                }
                                </p>
                            </div>
                            
                            <div className="mt-5">
                                <p className="mt-1"><label className="font-bold text-lg">Profile : </label> {user.image_capture}</p>
                                {/* MAKE IT AT THE ICON ON TOP OR SHOW IMAGE */}
                            </div>
                            
                            <div>
                                <label className="font-bold text-lg">REMARKS :</label>
                                
                                {user.remarks && (
                                    user.status !== 3 ? 
                                            <p className="mt-1 bg-gray-200 p-4">{user.remarks}</p>
                                        : 
                                            <p className="mt-1 p-4">{user.remarks}</p>
                                )}  
                            </div>
                            

                            <div className="mt-5">
                                <p className="mt-1"><label className="font-bold text-lg">Score By : </label> {user.score_by?.name?.toUpperCase()}</p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1"><label className="font-bold text-lg">Score : </label> {user?.score}</p>
                            </div>

                            <div className="mt-5">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Create Date : </label> 
                                    {new Date(user.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="mt-1">
                                    <label className="font-bold text-lg">Update Date : </label> 
                                    {new Date(user.updated_at).toLocaleDateString("en-US", {
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