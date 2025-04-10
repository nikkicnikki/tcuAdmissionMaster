import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { EXAM_STATUS_CLASS_MAP, EXAM_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';


export default function Index({ auth, examDates, examRooms, programs, users, applicantWithPermit, success, sucType }) {

    console.log(applicantWithPermit);
    const { data, setData, patch, processing, errors } = useForm({
        limit: ''
    });

    const hasStatusActive = examDates.data?.some(examDate => examDate.status === 2);

    const deleteExamDate = (examDate) => {

        const date = new Date(examDate.exam_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        if (!window.confirm(`Are you sure you want to delete "${date}" Schedule?`)) {
            return;
        }
        //console.log(route('date.delete', id ));
        router.delete(route('date.delete', examDate.id));
    }

    const deleteExamRoom = (examRoom) => {
        const room = examRoom.exam_room;

        if (!window.confirm(`Are you sure you want to delete "${room}" Room?`)) {
            return;
        }
        //console.log(route('room.delete', id ));
        router.delete(route('room.delete', examRoom.id));
    }

    const deleteProgram = (program) => {
        const prog = program.name.toUpperCase();

        if (!window.confirm(`Are you sure you want to delete "${prog}" Program?`)) {
            return;
        }

        //console.log(route('room.delete', id ));
        router.delete(route('program.delete', program.id));
    }



    const limitSubmit = (e) => {
        e.preventDefault();

        if (!data.limit) {
            alert("Please input a value.");
            return;
        }

        patch(route('roomLimit.patch', data.limit), {
            onSuccess: () => {
                alert("Limit updated successfully!");
                Inertia.reload();  // Refresh the page
            },
            onError: (errors) => {
                if (errors.limit) {
                    alert("Invalid limit: " + errors.limit);
                } else {
                    alert("An unexpected error occurred.");
                }
            }
        });
    };



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Settings form
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        {
                            (success && sucType) && sucType === 'add' ?
                                (<div className="bg-emerald-500 px-2 py-4 text-white rounded pl-5">{success}</div>)
                                : (success && sucType) && sucType === 'edit' ?
                                    (<div className="bg-blue-500 px-2 py-4 text-white rounded pl-5">{success}</div>)
                                    : (success && sucType) && sucType === 'delete' ?
                                        (<div className="bg-red-500 px-2 py-4 text-white rounded pl-5">{success}</div>)
                                        : ""
                        }

                        <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300">
                            # To Delete any data  there must no Active Schedule
                            {/* DATES TABLE*/}
                            <div className="flex justify-between items-center p-2 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <h2 className=" text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 justify items-center">
                                    Schedules
                                </h2>
                                <Link
                                    href={route("setting.examDateCreate")}
                                    className="bg-emerald-500 p-4 mx-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Add new
                                </Link>
                            </div>


                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">


                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">DATE</th>
                                        <th className="px-3 py-3">STATE</th>
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
                                                    href={route('date.edit', examDate.id)}
                                                    className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    edit
                                                </Link>
                                                {!hasStatusActive &&
                                                    <button
                                                        onClick={(e) => deleteExamDate(examDate)}
                                                        //href={route('examRoom.destroy', examRoom.id)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        delete
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <br /><br />

                            {/* ROOMS TABLE */}
                            <div className="flex justify-between items-center p-2 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <h2 className=" text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 justify items-center">
                                    Rooms
                                </h2>

                                <form
                                    onSubmit={limitSubmit}
                                    className="flex justify-end items-center gap-2 m-4"
                                >
                                    <InputLabel htmlFor="set_limit" value="limit" />

                                    <TextInput
                                        id="set_limit"
                                        name="limit"
                                        type="number"
                                        value={data.limit}
                                        onChange={(e) => setData("limit", e.target.value)}
                                        className="w-1/6 h-4/6"
                                    />
                                    <InputError message={errors.limit} className="mt-2" />
                                    <button
                                        className="bg-blue-500 p-2 text-white rounded shadow transition-all hover:bg-blue-600"
                                    >APPLY TO ALL</button>
                                </form>

                                <Link
                                    href={route("setting.examRoomCreate")}
                                    className="bg-emerald-500 p-4 mx-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Add new
                                </Link>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ROOM</th>
                                        <th className="px-3 py-3">STATE</th>
                                        <th className="px-3 py-3">USER-PERMIT</th>
                                        <th className="px-3 py-3">LIMIT</th>
                                        <th className="px-3 py-3">DESCRIPTION</th>
                                        <th className="px-3 py-3">CREATE</th>
                                        <th className="px-3 py-3">ACTION</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {examRooms.data.map(examRoom => {
                                        const matchedApplicant = applicantWithPermit.find(applicant => applicant.exam_room === examRoom.id);

                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={examRoom.id}>
                                                <td className="px-3 py-2">
                                                    {examRoom.exam_room}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded text-white " + EXAM_STATUS_CLASS_MAP[examRoom.status]}>
                                                        {EXAM_STATUS_TEXT_MAP[examRoom.status]}
                                                    </span>
                                                </td>

                                                <td className="px-3 py-2">
                                                    {examRoom.set_user ?
                                                        users.find(user => user.id === examRoom.set_user)?.name || "Unknown User"
                                                        : " - "}
                                                </td>


                                                {matchedApplicant ?
                                                    (matchedApplicant.curr_count === examRoom.limit ?
                                                        <td className="px-3 py-2 bg-red-500 text-white text-center">{matchedApplicant.curr_count + "/" + examRoom.limit + " FULL"}</td> :
                                                        <td className="px-3 py-2 bg-green-500 text-white text-center">{matchedApplicant.curr_count + "/" + examRoom.limit}</td>)
                                                    :
                                                    <td className="px-3 py-2 bg-gray-500 text-white text-center">{"0/" + examRoom.limit}</td>
                                                }



                                                <td className="px-3 py-2">
                                                    {examRoom.des}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {new Date(examRoom.created_at).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td className="px-3 py-2 text-right">
                                                    <Link
                                                        href={route('room.edit', examRoom.id)}
                                                        className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        edit
                                                    </Link>
                                                    {!hasStatusActive &&
                                                        <button
                                                            onClick={(e) => deleteExamRoom(examRoom)}
                                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                        >
                                                            delete
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>




                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300">

                            {/* PROGRAM TABLE */}
                            <div className="flex justify-between items-center p-2 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <h2 className=" text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 justify items-center">
                                    Program
                                </h2>
                                <Link
                                    href={route("setting.programCreate")}
                                    className="bg-emerald-500 p-4 mx-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Add new
                                </Link>
                            </div>

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">PROGRAM</th>
                                        <th className="px-3 py-3">CREATE</th>
                                        <th className="px-3 py-3">ACTION</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {programs.data.map(program => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={program.id}>
                                            <td className="px-3 py-2">
                                                {program.name.toUpperCase() + " - " + program.acronym.toUpperCase()}
                                            </td>
                                            <td className="px-3 py-2">
                                                {new Date(program.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <Link
                                                    href={route('program.edit', program.id)}
                                                    className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    edit
                                                </Link>
                                                {!hasStatusActive &&
                                                    <button
                                                        onClick={(e) => deleteProgram(program)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        delete
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <br /> <br />

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
/*

create an individual pagination page selection

<Pagination links={barangays.links}/>
<pre>{JSON.stringify(barangays, undefined , 2)}</pre>
*/