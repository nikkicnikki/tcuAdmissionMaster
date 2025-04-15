import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useRef } from "react";

export default function Score({ auth, applicant }) {

    const { data, setData, errors, put } = useForm({
        scorer: auth.user.id || '',
        applicant_id: applicant.id || '',
        f_name: applicant.f_name || '',
        m_name: applicant.m_name || '',
        sr_name: applicant.sr_name || '',
        score: applicant.score || '',
        exam_date: applicant.exam_date.exam_date || '',
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

        put(route('applicant.score', {applicantId: data.applicant_id, applicantScore: data.score , applicantName: `${data.sr_name}, ${data.f_name} ${data.m_name}`.toUpperCase() }));
    }

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
                        SCORING {`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`}
                    </h2>
                </div>
            }
        >

            <Head title={`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`} />


            <div className="pt-8 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-4">
                            <p className="text-[11px]">
                                <b>VALIDATOR:</b> {data.validator.name.toUpperCase()}  
                                <span className={' ml-2 text-white p-0.5 rounded text-[9px] '+USER_STATUS_CLASS_MAP[data.validator.role]}>{USER_STATUS_TEXT_MAP[data.validator.role] }</span>
                            </p>
                            <p className="text-[11px]">
                                <b>PRINTED BY:</b> {data.printed.name.toUpperCase()}  
                                <span className={' ml-2 text-white p-0.5 rounded text-[9px] '+USER_STATUS_CLASS_MAP[data.printed.role]}>{USER_STATUS_TEXT_MAP[data.printed.role] }</span>
                            </p>
                            <p className="text-[11px]">
                                <b>SCORED BY:</b> {auth.user.name.toUpperCase()}  
                                <span className={' ml-2 text-white p-0.5 rounded text-[9px] '+USER_STATUS_CLASS_MAP[auth.user.role]}>{USER_STATUS_TEXT_MAP[auth.user.role] }</span>
                            </p>
                            <br />
                            <p className="text-[11px]"><b>APPLIED:</b> {applicant.created_at}</p>
                            <p className="text-[11px]"><b>PERMIT ISSUED:</b> {applicant.printed_date}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="pt-1 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex">

                        <div className="m-5 ">
                            <img
                                src={data.image_capture}
                                alt="N/A"
                                className=" h-[100px] w-[120px] rounded border border-gray-500 shadow-md "
                            />
                        </div>
                        <div className="flex-1 my-5">
                            <p><label className="font-semibold">ID: </label> {data.applicant_id} </p>
                            <p><label className="font-semibold">NAME: </label> {`${data.sr_name},  ${data.f_name} ${data.m_name}`.toUpperCase()} </p>
                            <p><label className="font-semibold">PROGRAM: </label> {data.prog.acronym + " - " + data.prog.name} </p>
                            <p><label className="font-semibold">EXAM: </label> {formattedDate + " - Rm. " + data.exam_room} </p>
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
            {/* <pre>
                {JSON.stringify(applicant, null, 2)}
            </pre> */}

        </AuthenticatedLayout>
    );
}