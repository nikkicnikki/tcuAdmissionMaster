import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ClipboardDocumentListIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';

export default function Dashboard({
    auth,
    totalApplicant,
    totalApplicantPending,
    totalApplicantIncomplete,
    totalApplicantValid,
    totalApplicantHasPermit,
    totalApplicantScored,
    havePermitApplicants,
    roomLimit,
    scheduleListCount,
    programs,
    withScoreList,
    validatedApplicant,
    incompleteApplicant,
    program_count_perc,
    averagesOverall,
}) {
    // console.log(havePermitApplicants);
    const ProgramExcelButton = ({ with_score_list, program_acronym, titleProg }) => {

        const handleDownload = () => {
            const typeOfExcel = program_acronym ? `${program_acronym}-OverallExamResult.xlsx` : "OverallExamResult.xlsx";
            const cleanedData = program_acronym ?
                with_score_list.filter(applicant => applicant.program.acronym === program_acronym).map(({
                    // (applicant => applicant.print_by_id === auth.user.id)
                    id, f_name, m_name, sr_name, score, program, ...rest }) => {

                    const firstName = f_name ? f_name.toUpperCase() : '';
                    const middleName = m_name ? m_name.toUpperCase() : '';
                    const surname = sr_name ? sr_name.toUpperCase() : '';
                    const ID = id;
                    const PROGRAM = program.acronym;
                    const PASSING = program.passing_grade;


                    return {
                        // ...rest,
                        'ID': ID,
                        'NAME': `${surname}, ${firstName} ${middleName}`.trim(),
                        'PROGRAM': PROGRAM,
                        'SCORE': score,
                        'PASSING GRADE': PASSING,
                        'RESULT': (score >= PASSING ? 'pass' : 'fail'),
                    };

                })

                : with_score_list.map(({

                    id, f_name, m_name, sr_name, score, program, ...rest }) => {

                    const firstName = f_name ? f_name.toUpperCase() : '';
                    const middleName = m_name ? m_name.toUpperCase() : '';
                    const surname = sr_name ? sr_name.toUpperCase() : '';
                    const ID = id;
                    const PROGRAM = program.acronym;
                    const PASSING = program.passing_grade;

                    return {
                        // ...rest,
                        'ID': ID,
                        'NAME': `${surname}, ${firstName} ${middleName}`.trim(),
                        'PROGRAM': PROGRAM,
                        'SCORE': score,
                        'PASSING GRADE': PASSING,
                        'RESULT': (score >= PASSING ? 'pass' : 'fail'),
                    };
                });

            var wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(cleanedData);

            XLSX.utils.book_append_sheet(wb, ws, "ExamResult");

            XLSX.writeFile(wb, typeOfExcel);
        };


        return (
            <button onClick={handleDownload} className="hover:text-blue-500 flex" title="EXCEL FILE" >
                <ClipboardDocumentListIcon className=' h-[20px] w-[20px]' /> {titleProg}
            </button>
        );
    }

    const DateRoomExcelButton = ({ exam_date_room }) => {

        const handleDownload = () => {

            const examDate = new Date(exam_date_room[0].exam_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const cleanedData = exam_date_room.map(({
                exam_date_id, exam_time_id, exam_room_id,
                exam_date, exam_time, exam_room,
                valid_by, print_by,
                f_name, m_name, sr_name, id, ...rest
            }, index) => {

                const firstName = f_name ? f_name.toUpperCase() : '';
                const middleName = m_name ? m_name.toUpperCase() : '';
                const surname = sr_name ? sr_name.toUpperCase() : '';
                const ID = id;

                return {
                    // ...rest,
                    'No.': index + 1, // Use index from map callback
                    'ID': ID,
                    'NAME': `${surname}, ${firstName} ${middleName}`.trim(),
                };
            });


            var wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(cleanedData);

            XLSX.utils.book_append_sheet(wb, ws, "ApplicantList");

            XLSX.writeFile(wb, examDate + "-Shift-" + exam_date_room[0].exam_time + "-Rm-" + exam_date_room[0].exam_room + ".xlsx");
        };



        return (
            <button onClick={handleDownload} className="hover:text-blue-500" title="excel file" >
                <ClipboardDocumentListIcon className='h-[20px] w-[20px]' />
            </button>
        );
    };

    const [isOpen, setIsOpen] = useState(false);

    // Auto-open sidebar when screen is >= 1500px
    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth >= 1500) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        checkWidth(); // Run on mount
        window.addEventListener('resize', checkWidth); // Listen on resize

        return () => window.removeEventListener('resize', checkWidth); // Cleanup
    }, []);

    const flatApplicants = Object.entries(havePermitApplicants)
        .flatMap(([key, applicants]) => {
            return applicants.map(applicant => ({
                ...applicant,
                schedule_key: key, // optional if you want to keep track of which key the applicant came from
            }));
        });

    const round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    };

    const [activeTab, setActiveTab] = useState("Overall");
    const navItems = [
        {
            label: "Overall",
            bg: "bg-white",
            text: "text-gray-900",
            count: totalApplicant,
        },
        {
            label: "Pending",
            bg: "bg-gray-300",
            text: "text-gray-900",
            count: totalApplicantPending,
            perc: round((totalApplicantPending / totalApplicant) * 100, 2),
        },
        {
            label: "Incomplete",
            bg: "bg-[rgb(153,217,234)]",
            text: "text-gray-900",
            count: totalApplicantIncomplete,
            perc: round((totalApplicantIncomplete / totalApplicant) * 100, 2),

        },
        {
            label: "Valid",
            bg: "bg-green-500",
            text: "text-white",
            count: totalApplicantValid,
            perc: round((totalApplicantValid / totalApplicant) * 100, 2),

        },
        {
            label: "Has permit",
            bg: "bg-[rgb(239,228,176)]",
            text: "text-gray-900",
            count: totalApplicantHasPermit,
            perc: round((totalApplicantHasPermit / totalApplicant) * 100, 2),

        },
        {
            label: "Scored",
            bg: "bg-[rgb(136,0,21)]",
            text: "text-yellow-500",
            count: totalApplicantScored,
            perc: round((totalApplicantScored / totalApplicant) * 100, 2),

        },
    ];

    // TOTAL AVERAGE OF ALL EXAMINED APPLICANT
    const totalAverage = Object.values(averagesOverall).reduce((acc, val) => acc + val, 0);
    const averageOfAverages = round((totalAverage / Object.values(averagesOverall).length), 2);

    // TOTAL NO. OF PASS, FAIL AND EXAMINED APPLICANT
    const totalExamined = program_count_perc.reduce((sum, program) => sum + program.examined, 0);
    const totalPass = program_count_perc.reduce((sum, program) => sum + program.pass, 0);
    const percPass = round((totalPass / totalExamined) * 100, 2);
    const totalFail = program_count_perc.reduce((sum, program) => sum + program.failed, 0);
    const percFail = round((totalFail / totalExamined) * 100, 2);

    const ucwords = (str) => {
        return str
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const contentMap = {
        Overall:
            <div className='h-screen'>

                <div className="pt-0 pb-2 mb-2">
                    <div className="mx-auto max-h max-w-7xl sm:px- lg:px-8">
                        <h2 className='font-bold mb-2'>OVERALL STATUS</h2>
                        <div className="overflow-hidden sm:rounded-lg dark:bg-gray-800 justify-start items-center flex gap-4">
                            <div className='bg-white shadow-sm mb-2 shadow-gray-500 border border-gray-200 ml-6 block-flex rounded w-[280px] h-32'>
                                <b className=' pl-3 pt-2 block'>AVR. GRADE</b>
                                <div className=' flex justify-center items-center py-6 '>
                                    {averageOfAverages}%
                                </div>
                            </div>

                            <div className='bg-white shadow-sm mb-2 shadow-gray-500  border border-gray-200 block-flex rounded w-[280px] h-32'>
                                <b className=' pl-3 pt-2 block'>EXAMINEE</b>
                                <div className=' flex justify-center items-center py-6'>
                                    {totalExamined}
                                </div>
                            </div>

                            <div className='bg-white shadow-sm mb-2 shadow-gray-500  border border-gray-200 block-flex rounded w-[280px] h-32'>
                                <b className=' pl-3 pt-2 block'>PASS</b>
                                <div className=' flex justify-center items-center py-6 '>
                                    {totalPass} ({percPass}%)
                                </div>
                            </div>

                            <div className='bg-white shadow-sm mb-2 shadow-gray-500 border border-gray-200 block-flex rounded w-[280px] h-32'>
                                <b className=' pl-3 pt-2 block'>FAIL</b>
                                <div className=' flex justify-center items-center py-6 '>
                                    {totalFail} ({percFail}%)
                                </div>
                            </div>

                            {/* <pre>{JSON.stringify(program_count_perc, null, 2)}</pre> */}
                        </div>
                    </div>
                </div>

                <div className="pt-1">
                    <div className="mx-auto max-h max-w-7xl ">
                        <div className="overflow-hidden sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className='font-bold mb-2 ml-8'>PROGRAM STATUS</h2>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {program_count_perc.map((prog) => (
                                    <>
                                        <div className="w-full sm:w-[280px]">
                                            <p className='px-2 pt-2 text-white bg-[rgb(136,0,21)] rounded-tr-lg rounded-tl-lg '><b>{prog.prog_acronym}</b></p>
                                            <p className='px-2 text-[11px] text-yellow-500 bg-[rgb(136,0,21)] h-10'>{prog.prog_name}</p>
                                            <p className='bg-yellow-100 px-2 pt-1 shadow-inner shadow-gray-200 uppercase text-[13px] text-gray-400'>passing grade: <span className='pl-0 text-gray-800'>{prog.prog_passing} %</span></p>

                                            <div className='border bg-white pt-1 uppercase text-[13px] text-gray-400'>
                                                <p className=' px-2 '>applied: <span className='pl-12 text-gray-800'>{prog.applied}</span> ({prog.percentage} % / overall)</p>
                                                <p className=' px-2 '>examined: <span className='pl-9 text-gray-800'>{prog.examined}</span> ({prog.examined_perc} % / applied)</p>
                                            </div>

                                            <div className='flex justify-between shadow  rounded shadow-gray-500'>
                                                <div className='flex justify-center items-center h-16 w-1/2 rounded-bl-lg border text-gray-400 font-semibold'>RESULT</div>
                                                <div className='rounded-br-lg bg-gray-200 text-gray-800 h-16 p-2 w-1/2 shadow-lg text-[14px]'>
                                                    <p className='shadow-text'>pass: <span className='pl-1 text-yellow-500'>{prog.pass}</span>  <span className='text-gray-400'>({prog.pass_perc}%)</span></p>
                                                    <p>fail: <span className='pl-3'>{prog.failed}</span> <span className='text-gray-400'>({prog.failed_perc}%)</span></p>
                                                </div>
                                            </div>
                                            <div className='sm:w-[280px] shadow-sm mb-10 shadow-gray-500 p-2 rounded bg-gray-200 mt-2'><b className='text-gray-800'>AVERAGE SCORE:</b> {prog.average}%</div>
                                        </div>

                                    </>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

            </div>,
        Pending: <div className='h-screen'></div>,

        Incomplete:
            <div className='h-screen'>
                {/* CURRENT USER PENDING LIST */}
                <div className="pt-1 pb-2 ">
                    <div className="mx-auto max-h max-w-7xl sm:px- lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-[rgb(153,217,234)] text-white">YOUR JOB LIST</h2>
                            <p className='p-1 pl-2'>
                                <b>TOTAL:</b> {incompleteApplicant.filter(incompleteList => incompleteList.validate_by.id === auth.user.id).length}
                            </p>
                            <div className="overflow-auto ">
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">#</th>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">NAME</th>
                                            <th className="px-3 py-3">REMARKS</th>
                                            <th className="px-3 py-3">PROGRAM</th>
                                            <th className="px-3 py-3">VALIDATOR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {incompleteApplicant
                                            .filter(incompleteList => incompleteList.validate_by.id === auth.user.id)
                                            .map((incompleteList, index) => (
                                                <tr key={incompleteList.id}>
                                                    <th className="px-3 py-0">{index + 1}</th>
                                                    <td className="px-3 py-0">{incompleteList.id}</td>
                                                    <td className="px-3 py-0">
                                                        <Link className='hover:text-blue-700'
                                                            href={route('applicant.show', incompleteList.id)}>
                                                            {ucwords(incompleteList.name)}
                                                        </Link>
                                                    </td>
                                                    <td className="px-3 py-0">{incompleteList.remarks}</td>
                                                    <td className="px-3 py-0">{incompleteList.program.acronym}</td>
                                                    <td className="px-3 py-0">
                                                        {incompleteList.validate_by.name}
                                                        <span className={"ml-1 rounded text-[9px] p-1 text-white" + USER_STATUS_CLASS_MAP[incompleteList.validate_by.role]}>{USER_STATUS_TEXT_MAP[incompleteList.validate_by.role]}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ALL PENDING LIST */}
                <div className="pt-1 pb-2">
                    <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-[rgb(153,217,234)] text-white">PENDING LIST</h2>
                            <p className='p-1 pl-2'><b>TOTAL:</b> {incompleteApplicant.length}</p>
                            <div className="overflow-auto ">
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">#</th>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">NAME</th>
                                            <th className="px-3 py-3">REMARKS</th>
                                            <th className="px-3 py-3">PROGRAMS</th>
                                            <th className="px-3 py-3">VALIDATOR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {incompleteApplicant.map((incompleteList, index) => (
                                            <tr>
                                                <th className="px-3 py-0">{index + 1}</th>
                                                <td className="px-3 py-0">{incompleteList.id}</td>
                                                <td className="px-3 py-0">
                                                    <Link className='hover:text-blue-700'
                                                        href={route('applicant.show', incompleteList.id)}>
                                                        {ucwords(incompleteList.name)}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-0">{incompleteList.remarks}</td>
                                                <td className="px-3 py-0">{incompleteList.program.acronym}</td>
                                                <td className="px-3 py-0">
                                                    {incompleteList.validate_by.name}
                                                    <span className={"ml-1 rounded text-[9px] p-1 text-white" + USER_STATUS_CLASS_MAP[incompleteList.validate_by.role]}>{USER_STATUS_TEXT_MAP[incompleteList.validate_by.role]}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,

        Valid:
            <div className='h-screen'>
                {/* CURRENT USER VALID LIST */}
                <div className="pt-1 pb-2 ">
                    <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-green-500 text-white">YOUR JOB LIST</h2>
                            <p className='p-1 pl-2'><b>TOTAL:</b> {validatedApplicant.filter(validList => validList.validate_by.id === auth.user.id).length}</p>
                            <div className="overflow-auto ">
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">#</th>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">NAME</th>
                                            <th className="px-3 py-3">CURRENT STATUS</th>
                                            <th className="px-3 py-3">PROGRAM</th>
                                            <th className="px-3 py-3">VALIDATOR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {validatedApplicant
                                            .filter(validList => validList.validate_by.id === auth.user.id)
                                            .map((validList, index) => (
                                                <tr key={validList.id}>
                                                    <th className="px-3 py-0">{index + 1}</th>
                                                    <td className="px-3 py-0">{validList.id}</td>
                                                    <td className="px-3 py-0">
                                                        <Link className='hover:text-blue-700'
                                                            href={route('applicant.show', validList.id)}>
                                                            {ucwords(validList.name)}
                                                        </Link>
                                                    </td>
                                                    <td className="px-3 py-0"><span className={" rounded text-[11px] p-1" + APPLICANT_STATUS_CLASS_MAP[validList.status]}>{APPLICANT_STATUS_TEXT_MAP[validList.status]}</span></td>
                                                    <td className="px-3 py-0">{validList.program.acronym}</td>
                                                    <td className="px-3 py-0">
                                                        {validList.validate_by.name}
                                                        <span className={"ml-1 rounded text-[9px] p-1 text-white" + USER_STATUS_CLASS_MAP[validList.validate_by.role]}>{USER_STATUS_TEXT_MAP[validList.validate_by.role]}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ALL VALID LIST */}
                <div className="pt-1 pb-2">
                    <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-green-500 text-white">VALID LIST</h2>
                            <p className='p-1 pl-2'><b>TOTAL:</b> {validatedApplicant.length}</p>
                            <div className="overflow-auto ">
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">#</th>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">NAME</th>
                                            <th className="px-3 py-3">CURRENT STATUS</th>
                                            <th className="px-3 py-3">PROGRAM</th>
                                            <th className="px-3 py-3">VALIDATOR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {validatedApplicant.map((validList, index) => (
                                            <tr>
                                                <th className="px-3 py-0">{index + 1}</th>
                                                <td className="px-3 py-0">{validList.id}</td>
                                                <td className="px-3 py-0">
                                                    <Link className='hover:text-blue-700'
                                                        href={route('applicant.show', validList.id)}>
                                                        {ucwords(validList.name)}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-0"><span className={" rounded text-[11px] p-1" + APPLICANT_STATUS_CLASS_MAP[validList.status]}>{APPLICANT_STATUS_TEXT_MAP[validList.status]}</span></td>
                                                <td className="px-3 py-0">{validList.program.acronym}</td>
                                                <td className="px-3 py-0">
                                                    {validList.validate_by.name}
                                                    <span className={"ml-1 rounded text-[9px] p-1 text-white" + USER_STATUS_CLASS_MAP[validList.validate_by.role]}>{USER_STATUS_TEXT_MAP[validList.validate_by.role]}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,

        "Has permit":
            <div className='h-screen'>
                {/* CURRENT USER SCORE LIST */}
                <div className="pt-1 pb-2 ">
                    <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-[rgb(239,228,176)] text-gray-900">YOUR JOB LIST</h2>
                            <p className='p-1 pl-2'><b>TOTAL:</b> {flatApplicants.filter(applicant => applicant.print_by_id === auth.user.id).length}</p>
                            <div className="overflow-auto ">
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">#</th>
                                            <th className="px-3 py-3">ID</th>
                                            <th className="px-3 py-3">NAME</th>
                                            <th className="px-3 py-3">SCHEDULE</th>
                                            <th className="px-3 py-3">CURRENT STATUS</th>
                                            <th className="px-3 py-3">&nbsp;&nbsp;&nbsp;VALIDATED BY&nbsp;&nbsp;&nbsp;</th>
                                            <th className="px-3 py-3">&nbsp;&nbsp;&nbsp;PRINTED BY&nbsp;&nbsp;&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {flatApplicants
                                            .filter(applicant => applicant.print_by_id === auth.user.id)
                                            .map((applicant, index) => (
                                                <tr key={applicant.id}>
                                                    <th className="px-3 py-0">{index + 1}</th>
                                                    <td className="px-3 py-0">{applicant.id}</td>

                                                    <td className="px-3 py-0">
                                                        <Link className='hover:text-blue-700'
                                                            href={route('applicant.show', applicant.id)}>
                                                            {ucwords(
                                                                [applicant.f_name, applicant.m_name, applicant.sr_name]
                                                                    .filter(Boolean) // removes falsy values like null, undefined, ''
                                                                    .join(' ')
                                                            )}
                                                        </Link>
                                                    </td>
                                                    <td className="px-3 py-0">{applicant.schedule_key}</td>
                                                    <td className="px-3 py-0">
                                                        <span className={"rounded text-[11px] p-1 " + APPLICANT_STATUS_CLASS_MAP[applicant.status]}>
                                                            {APPLICANT_STATUS_TEXT_MAP[applicant.status]}
                                                        </span>
                                                    </td>
                                                    <td className={"px-3 py-0 "}>{applicant.valid_by} <span className={"text-[9px] text-white p-1 rounded" + USER_STATUS_CLASS_MAP[applicant.valid_by_role]}>{USER_STATUS_TEXT_MAP[applicant.valid_by_role]}</span></td>
                                                    <td className={"px-3 py-0 "}>{applicant.print_by} <span className={"text-[9px] p-1 rounded" + USER_STATUS_CLASS_MAP[applicant.print_by_role]}>{USER_STATUS_TEXT_MAP[applicant.print_by_role]}</span></td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ALL HAS PERMIT LIST */}
                <div className="mt-2 relative ">

                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <h2 className="font-bold p-2 bg-[rgb(239,228,176)] text-gray-900">HAS PERMIT LIST</h2>
                            <div className="p-2 text-gray-900 dark:text-gray-100">
                                <div className='flex'>
                                    {scheduleListCount.map((schedList, index) => (
                                        <>
                                            <div className='ml-2 p-2 bg-gray-100 text-black shadow-inner' key={schedList.total + "-" + index}>
                                                {schedList.exam_date}
                                            </div>
                                            <span className='bg-gray-200 text-gray-900 p-2 shadow shadow-md border-b-2 border-red-500'>{schedList.total}</span>
                                        </>
                                    ))}
                                </div>
                                {Object.keys(havePermitApplicants).map((groupKey) => (
                                    <div key={groupKey} className='p-4 relative'>
                                        {havePermitApplicants[groupKey].length >= roomLimit ?
                                            <span className='bg-red-500 text-white text-xs px-2 ml-2 top-[20px] left-[-15px] absolute ' >full</span>
                                            : ""
                                        }
                                        {(auth.user.role == 1 || auth.user.role == 5) &&
                                            <div className='flex gap-2 ml-5'>
                                                <button
                                                    onClick={() => window.open(route('schedule.pdf', {
                                                        exam_date_id: havePermitApplicants[groupKey][0].exam_date_id,
                                                        exam_time_id: havePermitApplicants[groupKey][0].exam_time_id,
                                                        exam_room_id: havePermitApplicants[groupKey][0].exam_room_id,
                                                        groupKey: groupKey,
                                                    }),
                                                        '_blank')}
                                                    className="hover:text-blue-500"
                                                    title="PDF file">
                                                    <DocumentArrowDownIcon
                                                        className='h-[20px] w-[20px]'
                                                    />
                                                </button>
                                                <DateRoomExcelButton exam_date_room={havePermitApplicants[groupKey]} />
                                            </div>
                                        }

                                        <h2 className='bg-white text-gray-900 p-2 shadow shadow-md border-b-2 border-red-400'>
                                            {groupKey} ({havePermitApplicants[groupKey].length}/{roomLimit})

                                        </h2>

                                        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-[rgb(136,0,21)]">
                                                <tr className="text-nowrap">
                                                    <th className="px-3 py-3">#</th>
                                                    <th className="px-3 py-3">ID</th>
                                                    <th className="px-3 py-3">NAME</th>
                                                    <th className="px-3 py-3">CURRENT STATUS</th>
                                                    <th className="px-3 py-3">&nbsp;&nbsp;&nbsp;VALIDATED BY&nbsp;&nbsp;&nbsp;</th>
                                                    <th className="px-3 py-3">&nbsp;&nbsp;&nbsp;PRINTED BY&nbsp;&nbsp;&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {havePermitApplicants[groupKey].map((applicant, index) => (
                                                    <tr key={index}>
                                                        <th className="px-3 py-0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                        <td className="px-3 py-0">&nbsp;&nbsp;&nbsp;{applicant.id}&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="px-3 py-0">
                                                            <Link className='hover:text-blue-700'
                                                                href={route('applicant.show', applicant.id)}>
                                                                {ucwords(
                                                                    `${applicant.sr_name}, ${applicant.f_name} ${applicant.m_name}`
                                                                )}
                                                            </Link>
                                                        </td>
                                                        <td className={"px-3 py-0 "}>&nbsp;&nbsp;&nbsp;<span className={" rounded text-[9px] p-1" + APPLICANT_STATUS_CLASS_MAP[applicant.status]}>{APPLICANT_STATUS_TEXT_MAP[applicant.status]}</span>&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="px-3 py-0">&nbsp;&nbsp;&nbsp;{applicant.valid_by} <span className={"text-[9px] text-white p-1 rounded" + USER_STATUS_CLASS_MAP[applicant.valid_by_role]}>{USER_STATUS_TEXT_MAP[applicant.valid_by_role]}</span>&nbsp;&nbsp;&nbsp;</td>
                                                        <td className="px-3 py-0">&nbsp;&nbsp;&nbsp;{applicant.print_by} <span className={"text-[9px] p-1 rounded" + USER_STATUS_CLASS_MAP[applicant.print_by_role]}>{USER_STATUS_TEXT_MAP[applicant.print_by_role]}</span>&nbsp;&nbsp;&nbsp;</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div >,

        Scored:
            <div className='h-screen'>
                {/* CURRENT USER SCORE LIST */}
                <div className="pt-1 pb-2 ">
                    <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-[rgb(136,0,21)] text-white">YOUR JOB LIST</h2>
                            <p className='p-1 pl-2'><b>TOTAL:</b> {withScoreList.filter(scoreList => scoreList.score_by.id === auth.user.id).length}</p>
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
                                            <th className="px-3 py-3">SCORER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withScoreList
                                            .filter(scoreList => scoreList.score_by.id === auth.user.id)
                                            .map((scoreList, index) => (
                                                <tr key={scoreList.id}>
                                                    <th className="px-3 py-0">{index + 1}</th>
                                                    <td className="px-3 py-0">{scoreList.id}</td>
                                                    <td className="px-3 py-0">
                                                        <Link className='hover:text-blue-700'
                                                            href={route('applicant.show', scoreList.id)}>
                                                            {ucwords(scoreList.name)}
                                                        </Link>
                                                    </td>
                                                    <td className="px-3 py-0">{scoreList.program.acronym}</td>
                                                    <td className="px-3 py-0">{scoreList.score} <span>%</span></td>
                                                    <td className="px-3 py-0">{scoreList.program.passing_grade}.00 %</td>
                                                    <td className="px-3 py-0">
                                                        {scoreList.score >= scoreList.program.passing_grade ? (
                                                            <span className="bg-green-500 text-white p-0.5 text-[10px] rounded">pass</span>
                                                        ) : (
                                                            <span className="bg-red-500 text-white p-0.5 text-[10px] rounded">fail</span>
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-0">
                                                        {scoreList.score_by.name}
                                                        <span className={"ml-1 rounded text-[9px] p-1 text-white" + USER_STATUS_CLASS_MAP[scoreList.score_by.role]}>{USER_STATUS_TEXT_MAP[scoreList.score_by.role]}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                {/* ALL SCORE LIST */}
                <div className="pt-1 pb-2">
                    <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                        {(auth.user.role == 1 || auth.user.role == 5) &&
                            <div className='flex my-2'>
                                <button
                                    onClick={() => window.open(route('examResult.pdf', "all"),
                                        '_blank')}
                                    className="hover:text-blue-500"
                                    title="PDF file">
                                    <DocumentArrowDownIcon
                                        className='ml-5 h-[20px] w-[20px]'
                                    />
                                </button>
                                <ProgramExcelButton with_score_list={withScoreList} titleProg={"ALL"} />
                                {programs.map(prog => (
                                    <>
                                        <button
                                            onClick={() => window.open(route('examResult.pdf', {
                                                program_acronym: prog.acronym
                                            }),
                                                '_blank')}
                                            className="hover:text-blue-500"
                                            title="PDF file">
                                            <DocumentArrowDownIcon
                                                className='ml-5 h-[20px] w-[20px]'
                                            />
                                        </button>
                                        <ProgramExcelButton with_score_list={withScoreList} program_acronym={prog.acronym} titleProg={prog.acronym} />
                                    </>
                                ))}
                            </div>
                        }

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 justify-center items-center">
                            <h2 className="font-bold p-2 bg-[rgb(136,0,21)] text-white">SCORE LIST</h2>
                            <p className='p-1 pl-2'><b>TOTAL:</b> {withScoreList.length}</p>
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
                                            <th className="px-3 py-3">SCORER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withScoreList.map((scoreList, index) => (
                                            <tr>
                                                <th className="px-3 py-0">{index + 1}</th>
                                                <td className="px-3 py-0">{scoreList.id}</td>
                                                <td className="px-3 py-0">
                                                    <Link className='hover:text-blue-700'
                                                        href={route('applicant.show', scoreList.id)}>
                                                        {ucwords(scoreList.name)}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-0">{scoreList.program.acronym}</td>
                                                <td className="px-3 py-0">{scoreList.score} <span>%</span></td>
                                                <td className="px-3 py-0">{scoreList.program.passing_grade}.00 %</td>
                                                <td className="px-3 py-0">
                                                    {scoreList.score >= scoreList.program.passing_grade ? (
                                                        <span className="bg-green-500 text-white p-0.5 text-[10px] rounded">pass</span>
                                                    ) : (
                                                        <span className="bg-red-500 text-white p-0.5 text-[10px] rounded">fail</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-0">
                                                    {scoreList.score_by.name}
                                                    <span className={"ml-1 rounded text-[9px] p-1 text-white" + USER_STATUS_CLASS_MAP[scoreList.score_by.role]}>{USER_STATUS_TEXT_MAP[scoreList.score_by.role]}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* HEADER AND SIDEBAR */}
            <div className="pt-5 relative ">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="m-4 p-2 bg-white shadow text-gray-900 rounded z-20 absolute left-0 top-[-10px]
                                block [@media(min-width:1500px)]:hidden"
                >
                    {isOpen ? '>>' : '<<'}
                </button>

                <div className={`
                        absolute top-0 left-0 h-full w-[180px] z-10 
                        transform transition-transform duration-300
                        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                        [@media(min-width:1500px)]:translate-x-0
                        `}>

                    <div className="absolute top-[50px] mx-auto max-w-5xl sm:px-2 lg:px-4 grid grid-cols-6 gap-1">
                        <h2 className='font-semibold'>PROGRAMS</h2>
                        {programs.map((program) => (
                            <div
                                key={program.id}
                                className="col-span-6 overflow-hidden shadow  sm:rounded-lg dark:bg-gray-800 flex justify-between items-center w-full"
                            >
                                <div className="p-2 text-gray-900 bg-[rgb(136,0,21)] w-full dark:text-gray-100 shadow">
                                    <h3 className="text-yellow-500 text-[9px] font-semibold text-wrap">
                                        <span className="text-sm text-white">{program.acronym}</span>
                                        <br />
                                        {program.name}
                                    </h3>
                                </div>
                                <div
                                    className="p-2 bg-yellow-100 w-8 text-gray-900 dark:text-gray-100 border h-full flex items-center justify-center"
                                >
                                    <p className="text-gray-700 text-center text-[13px]">
                                        {program.passing_grade ? program.passing_grade + "%" : "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-1 ">
                    <h2 className='font-semibold p-2'>CURRENT APPLICANTS STATUS</h2>
                </div>


                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 gap-2  ">
                    <div className="flex gap-4 flex-wrap">
                        {navItems.map(({ label, bg, text, count, perc }) => (
                            <div className='w-32'>
                                <button
                                    key={label}
                                    onClick={label === 'Pending' ? undefined : () => setActiveTab(label)}

                                    className={`w-full px-4 py-2 rounded font-medium transition border ${activeTab === label
                                        ? `${bg} ${text} border-b-[6px] border-[#d4b106] `
                                        : label === 'Pending' ? `${bg} ${text}  opacity-50 cursor-not-allowed `
                                            : `${bg} ${text} shadow hover:border-[#d4b106] border-b-[6px] border-transparent`
                                        }`}
                                >
                                    <b>{label}</b>
                                    <p className=''>{count}</p>
                                </button>
                                {perc ? <div className='bg-gray-200 text-gray-800 shadow-inner shadow-gray-300 rounded flex justify-center items-center p-2'> ( {perc} %) </div> : ""}
                            </div>

                        ))}
                    </div>
                </div>


            </div>




            {/* Dynamic Content */}
            <div className="p-4 rounded-xl">{contentMap[activeTab]}</div>






        </AuthenticatedLayout>
    );
}
