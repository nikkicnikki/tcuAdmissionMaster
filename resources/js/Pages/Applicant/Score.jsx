import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";

export default function Score({ auth, applicant, userJobList }) {

    const { data, setData, errors, put } = useForm({
        scorer: auth.user.id || '',

        status: applicant.status || '',

        applicant_id: applicant.id || '',
        f_name: applicant.f_name || '',
        m_name: applicant.m_name || '',
        sr_name: applicant.sr_name || '',
        score: applicant.score || '',
        exam_date: applicant.exam_date.exam_date || '',
        exam_time: applicant.exam_time.exam_time || '',
        exam_room: applicant.exam_room.exam_room || '',
        image_capture: '/storage/' + applicant.image_capture || '',
        prog: applicant.prog || '',
        validator: applicant.validate_by || '',
        printed: applicant.printed_by || '',
        applied: applicant.created_at || '',
        permit_issued: applicant.printed_date || '',


    });

    const formattedDate = new Date(data.exam_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const scoreHandle = (e) => {
        e.preventDefault();

        put(route('applicant.score', { applicantId: data.applicant_id, applicantScore: data.score, applicantName: `${data.sr_name}, ${data.f_name} ${data.m_name}`.toUpperCase() }));
    }

    const ucwords = (str) => {
        return str
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

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
                        SCORING {` "${ucwords(`${applicant.f_name} ${applicant.m_name} ${applicant.sr_name}`)}"`}
                    </h2>
                </div>
            }
        >

            <Head title={`Applicant "${ucwords(`${applicant.f_name} ${applicant.m_name} ${applicant.sr_name}`)}"`} />


            <div className="pt-8 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex">
                        <div className="p-4 flex-1 text-[11px]">
                            <p>
                                <b>VALIDATOR:</b> {data.validator.name.toUpperCase()}
                                <span className={' ml-2 p-0.5 rounded text-[9px] ' + USER_STATUS_CLASS_MAP[data.validator.role]}>{USER_STATUS_TEXT_MAP[data.validator.role]}</span>
                            </p>
                            <p>
                                <b>PRINTED BY:</b> {data.printed.name.toUpperCase()}
                                <span className={' ml-2 p-0.5 rounded text-[9px] ' + USER_STATUS_CLASS_MAP[data.printed.role]}>{USER_STATUS_TEXT_MAP[data.printed.role]}</span>
                            </p>
                            <p>
                                <b>SCORED BY:</b> {auth.user.name.toUpperCase()}
                                <span className={' ml-2 p-0.5 rounded text-[9px] ' + USER_STATUS_CLASS_MAP[auth.user.role]}>{USER_STATUS_TEXT_MAP[auth.user.role]}</span>
                            </p>
                            <br />
                            <p>
                                <b>STATUS:</b>
                                <span className={"ml-1 p-0.5 rounded" + APPLICANT_STATUS_CLASS_MAP[data.status]}>{APPLICANT_STATUS_TEXT_MAP[data.status]}</span>
                            </p>
                            <br />
                            <p><b>APPLIED:</b> {applicant.created_at}</p>
                            <p><b>PERMIT ISSUED:</b> {applicant.printed_date}</p>
                        </div>

                        <div className="p-4 justify-end text-[11px] text-right">
                            <p> <b>{data.prog.acronym}</b> {"-" + data.prog.name} <b>:PROGRAM</b></p>
                            <p className="text-green-700"> <b >{data.prog.passing_grade}</b>.00 % <b className="text-black">:PASSING GRADE</b></p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="pt-1 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8 relative">
                    {data.status == 5 && <div className="block bg-[rgb(136,0,21)] text-white p-2 absolute top-[-8px] left-[5px]">RE-SCORE</div>}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex">
                        <div className="m-5 ">
                            <img
                                src={data.image_capture}
                                alt="N/A"
                                className=" h-[100px] w-[120px] rounded border border-gray-500 shadow-md "
                            />
                        </div>
                        <div className="flex-1 my-5">
                            <p><label className="font-semibold">ID: </label> <u className="text-gray-500">{data.applicant_id}</u> </p>
                            <p>
                                <label className="font-semibold">NAME: </label>
                                <u className="text-gray-500">{ucwords(`${data.sr_name}, ${data.f_name} ${data.m_name}`)}</u>
                            </p>
                            <p><label className="font-semibold">PROGRAM: </label> <u className="text-gray-500 text-[12px]">{data.prog.acronym + " - " + data.prog.name}</u> </p>
                            <p><label className="font-semibold">EXAM: </label> <u className="text-gray-500 text-[14px]">{formattedDate + "|" + data.exam_time + "|Rm. " + data.exam_room}</u> </p>
                        </div>
                        <div className="relative my-4 mr-5 justify-end bg-gray-100 w-2/6 mb-8">
                            <form onSubmit={scoreHandle}>
                                <TextInput
                                    id="app_score"
                                    value={data.score ?? ""}
                                    type="text"
                                    className="h-5/6 w-full text-7xl text-center border border-gray-900 border-b-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    onChange={(e) => {
                                        let raw = e.target.value.replace(/\D/g, ""); // remove non-digits

                                        if (raw === "") {
                                            setData("score", "");
                                            return;
                                        }

                                        if (raw.length > 5) {
                                            // Handle overflow: interpret as float and round to 3 decimals
                                            const intPart = raw.slice(0, 2);
                                            const decPart = raw.slice(2);
                                            const num = parseFloat(`${intPart}.${decPart}`);
                                            setData("score", num.toFixed(3)); // Round to 3 decimal places
                                            return;
                                        }

                                        // Pad if needed
                                        const padded = raw.padStart(3, "0");

                                        let whole = padded.slice(0, Math.max(0, raw.length - 3));
                                        if (whole === "") whole = "0";

                                        const decimal = padded.slice(-3);
                                        setData("score", `${parseInt(whole)}.${decimal}`);
                                    }}
                                    ref={inputRef}
                                    autoFocus
                                    required
                                />
                                <span className="absolute right-6 top-16 transform -translate-y-1/2 text-6xl text-gray-500">%</span>
                                <InputError message={errors.score} className="text-red-500 mt-2" />
                                <button type="submit" className="bg-[rgb(136,0,21)] text-yellow-500 rounded w-full my-2 py-2">SCORE</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="pt-1 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                        <h2 className="font-bold p-2 bg-[rgb(136,0,21)] text-white">JOB LIST</h2>
                        <div className="overflow-auto ">
                            <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">#</th>
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">NAME</th>
                                        <th className="px-3 py-3">PROGRAM</th>
                                        <th className="px-3 py-3">SCORE</th>
                                        <th className="px-3 py-3">PASSING GRADE</th>
                                        <th className="px-3 py-3">RESULT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userJobList.map((jobList, index) => (
                                        <tr>
                                            <th className="px-3 py-0">{index + 1}</th>
                                            <td className="px-3 py-0">{jobList.id}</td>
                                            <td className="px-3 py-0">{jobList.name}</td>
                                            <td className="px-3 py-0">{jobList.program.acronym}</td>
                                            <td className="px-3 py-0">{jobList.score} <span>%</span></td>
                                            <td className="px-3 py-0">{jobList.program.passing_grade}.00 %</td>
                                            <td className="px-3 py-0">
                                                {jobList.score >= jobList.program.passing_grade ? (
                                                    <span className="bg-green-500 text-white p-0.5 text-[10px] rounded">pass</span>
                                                ) : (
                                                    <span className="bg-red-500 text-white p-0.5 text-[10px] rounded">fail</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            
        </AuthenticatedLayout>
    );
}