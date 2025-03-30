import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Validate({ auth, applicant }) {

    const { data, setData, errors, put } = useForm({
        id: applicant.id,
        f_name: applicant.f_name || '',
        m_name: applicant.m_name || '',
        sr_name: applicant.sr_name || '',
        status: applicant.status || '',
        validate_by: auth.user.id || '',
    });
    
    data.status = 3;
    console.log(applicant);
    const onSubmit = (e) => {
        e.preventDefault();
        
        put(route('applicant.valid', data.id));
    }

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

            <div className="pt-8 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        <form
                            onSubmit={onSubmit}
                            className="p-2 sm:p-2 bg-white dark:bg-gray-800 shadow sm:rounded-lg text-right"
                        >
                            <TextInput name="status" value={data.status} type="hidden" />
                            <InputError message={errors.status} className="text-red-500 mt-2" />

                            <TextInput name="f_name" value={data.f_name} type="hidden" />
                            <InputError message={errors.f_name} className="text-red-500 mt-2" />

                            <TextInput name="m_name" value={data.m_name} type="hidden" />
                            <InputError message={errors.m_name} className="text-red-500 mt-2" />

                            <TextInput name="sr_name" value={data.sr_name} type="hidden" />
                            <InputError message={errors.sr_name} className="text-red-500 mt-2" />

                            <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                <CheckIcon className="" />VALID
                            </button>

                            <p className="text-[11px] mt-2">
                                <label className="font-bold">VALIDATED By : </label> {auth.user.name.toUpperCase()}
                                <span
                                    className={
                                        "px-1 py-1 ml-3 rounded text-white text-[10px]" +
                                        USER_STATUS_CLASS_MAP[auth.user.role]
                                    }
                                >
                                    {USER_STATUS_TEXT_MAP[auth.user.role]}
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            <div className="pt-2 ">
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
                                            <label className="font-bold text-lg"> Government Worker? : </label>
                                            {applicant.gov_vald}
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