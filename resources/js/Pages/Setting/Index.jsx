import { EXAM_STATUS_CLASS_MAP, EXAM_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";


export default function Index({ auth , examDates , examRooms }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Settings
                </h2>
            }
            >
            <Head title="Settings" /> 

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300">

                            <div>
                                <Link 
                                    href={route("setting.examDateCreate")}
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Add Date
                                </Link>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">DATE</th>
                                        <th className="px-3 py-3">STATUS</th>
                                        <th className="px-3 py-3">DESCRIPTION</th>
                                        <th className="px-3 py-3">CREATE</th>
                                        <th className="px-3 py-3">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examDates.data.map(examDate => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={examDate.id}>
                                            <td className="px-3 py-2">
                                                {new Date(examDate.exam_date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " + EXAM_STATUS_CLASS_MAP[examDate.status]}>
                                                    {EXAM_STATUS_TEXT_MAP[examDate.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">
                                                {examDate.des}
                                            </td>
                                            <td className="px-3 py-2">
                                                {new Date(examDate.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <Link 
                                                    //href={route('examDate.destroy', examDate.id)}
                                                    className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1"    
                                                >
                                                    edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        

                        
                            <Link 
                                className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                            >
                                Add Room
                            </Link>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ROOM</th>
                                        <th className="px-3 py-3">STATUS</th>
                                        <th className="px-3 py-3">ACTION</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {examRooms.data.map(examRoom => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={examRoom.id}>
                                            <td className="px-3 py-2">
                                                {examRoom.exam_room}
                                            </td>
                                            <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " + EXAM_STATUS_CLASS_MAP[examRoom.status]}>
                                                    {EXAM_STATUS_TEXT_MAP[examRoom.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <Link 
                                                    //href={route('examRoom.destroy', examRoom.id)}
                                                    className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1"    
                                                >
                                                    edit
                                                </Link>
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