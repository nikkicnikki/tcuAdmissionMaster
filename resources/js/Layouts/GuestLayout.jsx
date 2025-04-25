import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[url('/storage/source/TCU.jpg')] bg-cover bg-center">

            {/* Light overlay */}
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/60 z-0" />

            {/* Content */}
            <div className="relative z-10">
                <div className='bg-gray-800 flex justify-center pt-2'>
                    <Link href="/" className=''>
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500 " />
                    </Link>
                </div>

                <h3 className='font-bold bg-gray-800 text-white flex justify-center p-2'>ADMISSION MASTERS</h3>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                    {children}
                </div>

                <div className='justify-end w-[450px]  flex items-center mt-0'>
                    <span className='text-gray-400'>powered by : </span>
                    <img
                        src="/storage/source/MISLOGO.png"
                        alt="mis logo"
                        className="mt-4 h-6 w-12 mb-3 mr-4 opacity-70"
                    />
                </div>
            </div>

        </div>

    );
}
