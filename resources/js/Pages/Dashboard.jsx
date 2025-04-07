import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    auth,
    totalApplicant, 
    totalApplicantPending,
    totalApplicantInomplete,
    totalApplicantValid,
    totalApplicantHasPermit,
    totalApplicantScored,}) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
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
                            <p>{totalApplicantInomplete}</p>
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
        </AuthenticatedLayout>
    );
}
