import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({applicants}){
    return(
        <AuthenticatedLayout
            //user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Applicant form
                </h2>
            }
        >
            <Head title="Applicant form" /> 

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">NAME</th>
                                        <th className="px-3 py-3">GENDER</th>
                                        <th className="px-3 py-3">EMAIL</th>
                                        <th className="px-3 py-3">CREATED</th>
                                        <th className="px-3 py-3">VALIDATOR</th>
                                        <th className="px-3 py-3">PRINT BY</th>
                                        <th className="px-3 py-3 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applicants.data.map(applicant => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th className="px-3 py-2">{applicant.id}</th>
                                            <td className="px-3 py-2 uppercase">{applicant.f_name+" "+applicant.m_name+" "+applicant.sr_name}</td>
                                            <td className="px-3 py-2">{applicant.sex}</td>
                                            <td className="px-3 py-2">{applicant.email}</td>
                                            <td className="px-3 py-2">{applicant.created_at}</td>
                                            <td className="px-3 py-2">{applicant.validated_by.name}</td>
                                            <td className="px-3 py-2">{applicant.printed_by.name}</td>
                                            <td className="px-3 py-2 text-right">
                                                <Link 
                                                    href={route('applicant.edit', applicant.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"    
                                                >
                                                    Edit
                                                </Link>
                                                <Link 
                                                    href={route('applicant.destroy', applicant.id)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"    
                                                >
                                                    Delete
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
    )
}