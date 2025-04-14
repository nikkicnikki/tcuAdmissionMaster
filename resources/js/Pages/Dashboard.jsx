import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ClipboardDocumentListIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
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
}) {
    // console.log(havePermitApplicants);

    const DateRoomExcelButton = ({ exam_date_room }) => {
        const handleDownload = () => {

            const examDate = new Date(exam_date_room[0].exam_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const cleanedData = exam_date_room.map(({
                exam_date_id, exam_room_id,
                exam_date, exam_room,
                valid_by, print_by,
                f_name, m_name, sr_name, id, ...rest }) => {

                const firstName = f_name ? f_name.toUpperCase() : '';
                const middleName = m_name ? m_name.toUpperCase() : '';
                const surname = sr_name ? sr_name.toUpperCase() : '';
                const ID = id;

                return {
                    ...rest,
                    'ID': ID,
                    'NAME': `${surname}, ${firstName} ${middleName}`.trim(),
                };
            });

            var wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(cleanedData);

            XLSX.utils.book_append_sheet(wb, ws, "ApplicantList");

            XLSX.writeFile(wb, examDate + "-" + exam_date_room[0].exam_room + ".xlsx");
        };

        return (
            <button
                onClick={handleDownload}
                className="hover:text-blue-500"
                title="excel file"
            >
                <ClipboardDocumentListIcon
                    className='h-[20px] w-[20px]'
                />
            </button>
        );
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


            <div className="py-5 relative">

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-6 gap-2">

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-900 text-xl font-semibold'>Total</h3>
                            <p>{totalApplicant}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-gray-300 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-900 text-xl font-semibold'>Pending</h3>
                            <p>{totalApplicantPending}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-[rgb(153,217,234)] shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-900 text-xl font-semibold'>Incomplete</h3>
                            <p>{totalApplicantIncomplete}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-green-500 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <h3 className='text-white text-xl font-semibold'>Valid</h3>
                            <p className='text-white'>{totalApplicantValid}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-[rgb(239,228,176)] shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <h3 className='text-gray-900 text-xl font-semibold'>Has Permit</h3>
                            <p>{totalApplicantHasPermit}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-[rgb(136,0,21)] shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <h3 className='text-yellow-500 text-xl font-semibold'>Scored</h3>
                            <p className='text-yellow-500'>{totalApplicantScored}</p>
                        </div>
                    </div>




                </div>
            </div>


            <div className="mt-2 relative ">

            <div className="hidden 2xl:block absolute top-0 left-0 w-48 h-full overflow-y-auto min-h-screen">

                    <div className="mx-auto max-w-7xl sm:px-4 lg:px-6 grid grid-cols-6 gap-2 py-4">
                        <h2 className='font-semibold'>PROGRAMS</h2>
                        {programs.map((program) => (
                            <div
                                key={program.id}
                                className="col-span-6 overflow-hidden shadow-inner bg-[rgb(136,0,21)] sm:rounded-lg dark:bg-gray-800 flex justify-between items-center w-full"
                            >
                                <div className="p-2 text-gray-900 dark:text-gray-100 shadow-inner">
                                    <h3 className="text-yellow-500 text-[9px] font-semibold text-wrap">
                                        <span className="text-sm text-white">{program.acronym}</span>
                                        <br />
                                        {program.name}
                                    </h3>
                                </div>
                                <div 
                                    className="p-2 bg-white text-gray-900 dark:text-gray-100 shadow-lg border h-full flex items-center justify-center"
                                >
                                    <p className="text-gray-700 text-center">
                                        {program.passing_grade ? program.passing_grade + "%" : "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
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
                                    <div className='flex gap-2 ml-5'>
                                        <button
                                            onClick={() => window.open(route('dateRoomList.pdf', {
                                                exam_date_id: havePermitApplicants[groupKey][0].exam_date_id,
                                                exam_room_id: havePermitApplicants[groupKey][0].exam_room_id,
                                                exam_date: havePermitApplicants[groupKey][0].exam_date,
                                                exam_room: havePermitApplicants[groupKey][0].exam_room,
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
                                    <h2 className='bg-white text-gray-900 p-2 shadow shadow-md border-b-2 border-red-400'>
                                        {groupKey} ({havePermitApplicants[groupKey].length}/{roomLimit})

                                    </h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>&nbsp;&nbsp;&nbsp;VALIDATED BY&nbsp;&nbsp;&nbsp;</th>
                                                <th>&nbsp;&nbsp;&nbsp;PRINTED BY&nbsp;&nbsp;&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {havePermitApplicants[groupKey].map((applicant, index) => (
                                                <tr key={index}>
                                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <td>&nbsp;&nbsp;&nbsp;{applicant.id}&nbsp;&nbsp;&nbsp;</td>
                                                    <td className='text-left'>{applicant.sr_name.toUpperCase() + ", " + applicant.f_name.toUpperCase() + " " + applicant.m_name.toUpperCase()}</td>
                                                    <td>&nbsp;&nbsp;&nbsp;{applicant.valid_by}&nbsp;&nbsp;&nbsp;</td>
                                                    <td>&nbsp;&nbsp;&nbsp;{applicant.print_by}&nbsp;&nbsp;&nbsp;</td>
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
        </AuthenticatedLayout>
    );
}
