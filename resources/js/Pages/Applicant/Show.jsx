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

            <div className="pt-12 ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg ">

                            <div className="mt-1 flex flex-nowrap">

                                <div className="flex-1">
                                    <p className="mt-1">
                                        <label className="font-bold text-lg">Status : </label>
                                        <span
                                            className={
                                                "px-2 py-1 rounded " +
                                                APPLICANT_STATUS_CLASS_MAP[applicant.status]
                                            }
                                        >
                                            {APPLICANT_STATUS_TEXT_MAP[applicant.status]}
                                        </span>
                                    </p>

                                </div>
                                <div className="flex-1">
                                    <p className="mt-1 ">
                                        <label className="font-bold text-lg">Schedule : </label>
                                        {applicant.exam_date?.exam_date ?
                                            new Date(applicant.exam_date.exam_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }) : "none"
                                        }
                                        <label className="font-bold text-lg"> - </label>
                                        {applicant.exam_room?.exam_room ? applicant.exam_room.exam_room : "none"}
                                    </p>
                                </div>
                                <div className="flex-1 text-right">
                                    <div className="mt-1 ">
                                        <p className="mt-1 text-[11px]">
                                            <label className="font-bold ">Create : </label>
                                            {new Date(applicant.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}

                                            <label className="font-bold "> Update : </label>
                                            {new Date(applicant.updated_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                </div>
                            </div>


                            <div className="flex flex-nowrap">
                                <div className="flex-1">
                                    <p className=""><label className="font-bold text-lg">Score : </label> {applicant?.score}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="">
                                        <label className="font-bold">Print permit : </label>
                                        {
                                            applicant.printed_date ? new Date(applicant.printed_date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }) : ''
                                        }
                                    </p>
                                </div>
                                <div className="flex-1 text-right">
                                    <p className=" text-[11px]">
                                        <label className="font-bold "> Validate By :_</label>{applicant.validate_by?.name?.toUpperCase()}
                                        <label className="font-bold ">_ Printed By :_</label>{applicant.printed_by?.name?.toUpperCase()}
                                        <label className="font-bold ">_ Score By :_</label>{applicant.score_by?.name?.toUpperCase()}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            

            <div className="py-2 ">
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
                                            {applicant.prog.acronym.toUpperCase() + " - " + applicant.prog.name.toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="mt-1">
                                        <label className="font-bold text-lg">Why do you want to take this program? : </label>
                                        <p className="mt-1 p-2">
                                            {applicant.reason}
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
                                                view here
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
                                            {applicant.l_serv ? applicant.l_serv + " Year/'s " : ""}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-1">
                                        <p className="mt-1">
                                            <label className="font-bold text-lg"> Gov. issued ID : </label>
                                            {applicant.gov_id ? (
                                                <Link
                                                    to="#"  // Prevents navigation within the app
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent React Router from handling the link
                                                        window.open(applicant.gov_id, "_blank");
                                                    }}
                                                >
                                                    view here
                                                </Link>
                                            ) : "none"}
                                        </p>
                                    </div>
                                    <div className="mt-1">
                                        <p className="mt-1">
                                            <label className="font-bold text-lg"> Voters ID : </label>
                                            {applicant.voter_id ? (
                                                <Link
                                                    to="#"  // Prevents navigation within the app
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent React Router from handling the link
                                                        window.open(applicant.voter_id, "_blank");
                                                    }}
                                                >
                                                    view here
                                                </Link>
                                            ) : "none"}
                                        </p>
                                    </div>
                                    <div className="mt-1">
                                        <label className="font-bold text-lg"> Company/Institution Currently Connected : </label>
                                        <p className="mt-1">{applicant.conn_com_ins}</p>
                                    </div>



                                </div>

                                {/* Right Section */}
                                <div >
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
                                                        view here
                                                    </Link>
                                                ) : "none"
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">REMARKS :</label>

                                        {applicant.remarks && (
                                            applicant.status != 3 ? (
                                                <>
                                                    <p className="mt-1 bg-gray-200 p-4">{applicant.remarks}</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="mt-1 p-4">{applicant.remarks}</p>
                                                </>

                                            )
                                        )}
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