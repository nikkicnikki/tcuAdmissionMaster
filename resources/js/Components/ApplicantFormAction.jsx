import { ArrowPathIcon, CheckIcon, PercentBadgeIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function ApplicantFormAction({
    role,
    status,
    applicantId,
    roomLimit,
    roomLimitStatus,
}) {
    return (
        <>
            {/* ADMIN Role 1, MANAGER Role 5 or VALIDATOR Role 3 - Status 1 or Status 2 */}
            {(((role == 1 || role == 3) || role == 5) && (status == 1 || status == 2)) && (
                <td className="px-3 py-2 text-right flex flex-nowrap">
                    <Link
                        href={route("applicant.edit", applicantId)}
                        className="font-medium rounded flex-1 px-1 py-1 text-white bg-[rgb(153,217,234)] dark:text-red-500 hover:bg-blue-500 mx-1 flex flex-nowrap items-center justify-center"
                        title="UPDATE"
                    >
                        <ArrowPathIcon className="w-5 h-3" />
                    </Link>

                    <Link
                        href={route('applicant.validate', applicantId)}
                        className="font-medium rounded flex-1 px-1 py-1 text-white bg-green-600 dark:text-blue-500 hover:bg-green-800 mx-1 flex flex-nowrap items-center justify-center"
                        title="VALIDATE"
                    >
                        <CheckIcon className="w-5 h-3" />
                    </Link>

                </td>
            )}

            {/* ADMIN Role 1, MANAGER Role 5 or MIS Role 2 - Status 3 */}
            {(((role == 1 || role == 2) || role == 5)  && status == 3) && (
                <td className="px-3 py-2 text-right flex flex-nowrap">
                    <Link
                        href={route("applicant.edit", applicantId)}
                        className="font-medium rounded flex-1 px-2 py-2 text-white bg-[rgb(153,217,234)] dark:text-red-500 hover:bg-blue-500 mx-1 flex flex-nowrap items-center justify-center"
                        title="UPDATE"
                    >
                        <ArrowPathIcon className="w-5 h-3" />
                    </Link>
                    {roomLimitStatus >= roomLimit ?
                        (<div
                            className="font-medium rounded flex-1 px-2 py-2 text-gray-400 bg-gray-500 dark:text-gray-500 mx-1 flex flex-nowrap items-center justify-center"
                            title="YOUR ASSIGN ROOM IS CURRENTLY FULL"
                        >
                            <PrinterIcon className="w-5 h-3 text-white" />
                        </div>)
                        : (<Link
                            href={route("applicant.permit", applicantId)}
                            className="font-medium rounded flex-1 px-2 py-2 text-gray-400 bg-[rgb(239,228,176)] dark:text-red-500 hover:bg-yellow-500 mx-1 flex flex-nowrap items-center justify-center"
                            title="PRINT"
                        >
                            <PrinterIcon className="w-5 h-3 text-black" />
                        </Link>)
                    }

                </td>
            )}

            {/* ADMIN Role 1, MANAGER Role 5 - Status 4 */}
            {((role == 1 || role == 5) && status == 4) && (
                <td className="px-3 py-2 text-right flex flex-nowrap">
                    <a
                        href={route('permit.reprint', { applicant_id: applicantId })}
                        className="p-2 rounded shadow-inner bg-gray-100 hover:shadow-md"
                        title="REPRINT"
                        target="_blank"
                    >
                        <PrinterIcon className="w-5 h-3 text-gray-900" />
                    </a>
                    <Link
                        href={route("applicant.edit", applicantId)}
                        className="font-medium rounded flex-1 px-2 py-2 text-white bg-[rgb(153,217,234)] dark:text-red-500 hover:bg-blue-500 mx-1 flex flex-nowrap items-center justify-center"
                        title="UPDATE"
                    >
                        <ArrowPathIcon className="w-5 h-3" />
                    </Link>
                    <Link
                        href={route('applicant.scoring', applicantId)}
                        className="font-medium rounded flex-1 px-1 py-1 text-yellow-500 bg-[rgb(136,0,21)] dark:text-red-500 hover:bg-red-700 mx-1 flex flex-nowrap items-center justify-center"
                        title="SCORE"
                    >
                        <PercentBadgeIcon className="w-5 h-5" />
                    </Link>


                </td>
            )}

            {/* ADMIN Role 1 , MANAGER Role 5 - Status 5 */}
            {(((role == 1 || role == 5) && status == 5) || ( role == 2 && (status == 4 || status == 5))) && (
                <td className="px-3 py-2 text-right flex flex-nowrap">
                    <a
                        href={route('permit.reprint', { applicant_id: applicantId })}
                        className="p-2 rounded shadow-inner bg-gray-100 hover:shadow-md"
                        title="REPRINT"
                        target="_blank"
                    >
                        <PrinterIcon className="w-5 h-3 text-gray-900" />
                    </a>
                    <Link
                        href={route("applicant.edit", applicantId)}
                        className="font-medium rounded flex-1 px-2 py-2 text-white bg-[rgb(153,217,234)] dark:text-red-500 hover:bg-blue-500 mx-1 flex flex-nowrap items-center justify-center"
                        title="UPDATE"
                    >
                        <ArrowPathIcon className="w-5 h-3" />
                    </Link>

                    <Link
                        href={route('applicant.scoring', applicantId)}
                        className="font-medium rounded flex-1 px-1 py-1 shadow-inner bg-gray-100 dark:text-red-500 hover:shadow-md mx-1 flex flex-nowrap items-center justify-center"
                        title="RE-SCORE"
                    >
                        <PercentBadgeIcon className="w-5 h-5" />
                    </Link>
                </td>
            )}


            {/* SCORING STAFF Role 4 - Status 4 */}
            {role == 4 && status == 4  && (
                <td className="px-3 py-2 text-right flex flex-nowrap">

                    <Link
                        href={route('applicant.scoring', applicantId)}
                        className="font-medium rounded flex-1 px-1 py-1 text-yellow-500 bg-[rgb(136,0,21)] dark:text-red-500 hover:bg-red-700 mx-1 flex flex-nowrap items-center justify-center"
                        title="SCORE"
                    >
                        <PercentBadgeIcon className="w-5 h-5" />
                    </Link>
                </td>
            )}

            {/* SCORING STAFF Role 4 - Status 5 */}
            {role == 4 && status == 5 && (
                <td className="px-3 py-2 text-right flex flex-nowrap">

                    <Link
                        href={route('applicant.scoring', applicantId)}
                        className="font-medium rounded flex-1 px-1 py-1 text-yellow-500 bg-white dark:text-red-500 hover:shadow mx-1 flex flex-nowrap items-center justify-center"
                        title="RE-SCORE"
                    >
                        <PercentBadgeIcon className="w-5 h-5" />
                    </Link>
                </td>
            )}


        </>

    )
}