import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BackspaceIcon, CameraIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, applicants, users, examdates, examrooms }) {

    const curr_user = auth.user.id;
    const vald_user_id = applicants.validate_by;
    const vald_user_name = users.find(user => user.id === vald_user_id)?.name;
    const vald_user_role = users.find(user => user.id === vald_user_id)?.role;
    const schedule_date_id = examdates.find(examdate => examdate.status === 2)?.id;
    const schedule_exam_date = examdates.find(examdate => examdate.status === 2)?.exam_date;
    const room_id = examrooms.find(examroom => examroom.set_user === curr_user)?.id;
    const room_exam = examrooms.find(examroom => examroom.set_user === curr_user)?.exam_room;
    //console.log(applicants);

    const { data, setData, put, errors, reset } = useForm({
        //header
        status: applicants.status || '',
        created_at: applicants.created_at || '',
        updated_at: applicants.updated_at || '',

        validate_by: vald_user_id || '',
        validate_name: vald_user_name || '',

        printed_by: auth.user.id || curr_user,
        printed_name: auth.user.name || '',

        applicant_id: applicants.id || '',

        f_name: applicants.f_name || '',
        m_name: applicants.m_name || '',
        sr_name: applicants.sr_name || '',
        prog: applicants.prog || '',

        sex: applicants.sex.toLowerCase() || '',
        cont: applicants.cont || '',
        curr_add: applicants.curr_add || '',

        image_capture: applicants.image_capture || '',

    });
    console.log(applicants);
    if (auth.user.role == 3 && (data.status == 1 || data.status == 2)) {
        data.status = 2;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        put(route('applicant.update', data.applicant_id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Permit for {`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`}
                </h2>
            }
        >
            <Head title={`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`} />

            {/* APPLICANT STATUS */}
            <div className="pt-8 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-1 sm:p-3 bg-white shadow sm:rounded-lg flex flex-nowrap" >

                            <div className="mt-1 flex-1">

                                <label className="font-bold text-lg ml-2">STATUS :</label>
                                <span
                                    className={
                                        "px-1 py-1 ml-1 rounded text-white " +
                                        APPLICANT_STATUS_CLASS_MAP[data.status]
                                    }
                                >
                                    {APPLICANT_STATUS_TEXT_MAP[data.status]}
                                </span>
                                <br />


                            </div>

                            <div className="mt-1 flex-1 text-right ">
                                <p className="text-[11px]">
                                    <label className="font-bold ml-2 ">APPLIED : </label>
                                    {new Date(data.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}

                                    <label className="font-bold ml-2 ">UPDATE : </label>
                                    {new Date(data.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-[11px] ">
                                    <label className="font-bold ">PRINTED BY : </label> {data.printed_name.toUpperCase()}
                                    <span
                                        className={
                                            "px-1 py-1 ml-3 rounded text-white text-[10px]" +
                                            USER_STATUS_CLASS_MAP[auth.user.role]
                                        }
                                    >
                                        {USER_STATUS_TEXT_MAP[auth.user.role]}
                                    </span>

                                    <label className="font-bold "> VALIDATED BY : </label> {data.validate_name.toUpperCase()}
                                    <span
                                        className={
                                            "px-1 py-1 ml-3 rounded text-white text-[10px]" +
                                            USER_STATUS_CLASS_MAP[vald_user_role]
                                        }
                                    >
                                        {USER_STATUS_TEXT_MAP[vald_user_role]}
                                    </span>
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* PRINTABLE APPLICANT INFO */}
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        <div className="mt-2 p-10 flex">
                            <div className="w-9/12 bg-[rgb(250,245,226)] shadow-inner p-5 m-3" >
                                <table className="text-left">
                                    <tbody>
                                        <tr className="pb-20">
                                            <th className="text-gray-500 text-xs">APPLICANT NO. : </th>
                                            <td className="border-b border-black px-3 text-xs">{applicants.id}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">DATE OF EXAMINATION : </th>
                                            <td className="border-b border-black px-3 text-xs">
                                                {new Date(schedule_exam_date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <th className="text-right text-gray-500 text-xs"> ROOM NO. : </th>
                                            <td className="border-b border-black px-3 text-xs">{room_exam}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-gray-500 text-xs">NAME : </th>
                                            <td className="border-b border-black px-3 text-xs" colSpan="3">
                                                {data.sr_name.toUpperCase() + ", " + data.f_name.toUpperCase() + " " + data.m_name.toUpperCase()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">PROGRAM : </th>
                                            <td className="border-b border-black px-3 text-xs" colSpan="3">
                                                {
                                                    data.prog.acronym + " - " +
                                                    data.prog.name
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">GENDER : </th>
                                            <td className="border-b border-black px-3 text-xs" colSpan="3">{data.sex}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">CONTACT No. : </th>
                                            <td className="border-b border-black px-3 text-xs" colSpan="3">{data.cont}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">ADDRESS : </th>
                                            <td className="border-b border-black px-3 text-xs" colSpan="3">{data.curr_add}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-3/12 text-right " >
                                {data.image_capture ?
                                    (<img src="" alt="N/A" className="w-full h-5/6" />) :
                                    <div className="w-full h-5/6 bg-gray-200 shadow-inner flex items-center justify-center">Capture applicant image</div>
                                }

                                <button className="ml-2 mt-2 py-1 px-2 text-white bg-blue-500 rounded border transition-all hover:bg-blue-600 ">
                                    <CameraIcon className="h-[30px] " />
                                </button>
                            </div>
                        </div>

                        <form
                            onSubmit={onSubmit}
                            className="p-2 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="mt-2 flex justify-end">

                                {data.image_capture ?
                                    (<button className="ml-2 py-1 px-3 text-gray-800 bg-[rgb(239,228,176)] rounded shadow shadow-lg transition-all hover:bg-yellow-600 ">
                                        <PrinterIcon className="h-[30px] mt-2" />
                                    </button>) :
                                    <div className="ml-2 py-1 px-3 text-white bg-gray-300 rounded shadow shadow-lg transition-all" title="CAPTURE IMAGE FIRST">
                                        <PrinterIcon className="h-[30px] mt-2" />
                                    </div>
                                }
                                <Link href={route("applicant.index")}
                                    className=" bg-gray-500 ml-2 py-1 px-3 text-white rounded shadow  hover:bg-gray-800 mr-2"
                                >
                                    <BackspaceIcon className="h-[30px] mt-1" />
                                </Link>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}