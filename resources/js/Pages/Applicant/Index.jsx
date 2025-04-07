import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
//import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import TableHeading from "@/Components/TableHeading";
import ApplicantFormAction from "@/Components/ApplicantFormAction";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";


export default function Index({ auth, applicants, queryParams = null, success, sucType, examdate, examrooms }) {

    const active_schedule = examdate.find(examd => examd.status == 2)?.exam_date;
    const assign_room = examrooms.find(examroom => examroom.set_user == auth.user.id)?.exam_room;

    queryParams = queryParams || {}
    //<pre>{JSON.stringify(applicants, undefined , 2)}</pre>

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('applicant.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {

        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('applicant.index'), queryParams);
    }

    const alertClasses = {
        success: 'bg-emerald-500 text-white',
        edit: 'bg-blue-500 text-white',
        delete: 'bg-red-500 text-white',
        print: 'bg-[rgb(250,245,226)] text-gray-500',
    };



    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Applicant form
                </h2>
            }
        >
            <Head title="Applicant form" />

            <div className="pt-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-4 flex justify-between">

                        <div className="flex justify-between gap-4">
                            <div>
                                <label className="font-bold">ACTIVE SCHEDULE: </label>
                                <label className="bg-[rgb(250,245,226)] shadow-inner p-5">{active_schedule ? new Date(active_schedule).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "no schedule"}</label>
                            </div>
                            {(auth.user.role == 1 || auth.user.role == 2) ?
                                <div>
                                    <label className="font-bold">YOUR ASSIGN ROOM: </label>
                                    <label className="bg-[rgb(250,245,226)] shadow-inner p-5">{assign_room ? assign_room : "no assign room"}</label>
                                </div> : ""

                            }
                        </div>

                    </div>
                </div>
            </div>

            {auth.user.role == 1 && (

                <div className="pt-5 pb-5">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-4 flex items-center gap-4">

                            <a
                                className="text-white bg-blue-500 p-3 hover:bg-blue-700 flex items-center gap-2 rounded"
                                href="/excel"
                            >
                                <ArrowUpOnSquareStackIcon className="h-[20px] w-[20px]" />
                                <span>Import Applicant</span>
                            </a>

                            <span className="text-gray-500">{"<< Add NEW Applicant here"}</span>

                        </div>
                    </div>
                </div>

            )}

            <div className={
                auth.user.role == 1 ? (" pt-1 ") : " py-2 pt-10 "
            }
            >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        {
                            success && sucType && (
                                <div className={`${alertClasses[sucType]} px-2 py-4 rounded pl-5`}>
                                    {success}
                                </div>
                            )
                        }


                        <div className="p-6 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-300">

                            <div className="overflow-auto ">
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">

                                            <TableHeading
                                                name="id"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ID
                                            </TableHeading>
                                            <TableHeading
                                                name="name"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                NAME
                                            </TableHeading>
                                            <TableHeading
                                                name="status"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                STATUS
                                            </TableHeading>
                                            <TableHeading
                                                name="exam_date"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                EXAM DATE
                                            </TableHeading>
                                            <TableHeading
                                                name="exam_room"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                EXAM ROOM
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                APPLIED
                                            </TableHeading>
                                            <th className="px-3 py-3">VALIDATOR</th>
                                            <th className="px-3 py-3">PRINT BY</th>
                                            <th className="px-3 py-3 text-right">ACTIONS</th>
                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="Applicant Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.status}
                                                    onChange={e => searchFieldChanged('status', e.target.value)}>
                                                    <option value="">Select Status</option>
                                                    <option value="1">Pending</option>
                                                    <option value="2">Incomplete</option>
                                                    <option value="3">Valid</option>
                                                    <option value="4">Has Permit</option>
                                                    <option value="5">Scored</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {applicants.data.map(applicant => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={applicant.id}>
                                                <th className="px-3 py-2">{applicant.id}</th>


                                                {auth.user.role == 3 && (applicant.status == 1 || applicant.status == 2) ? (
                                                    <td className="px-3 py-2 uppercase text-nowrap  text-gray-600">
                                                        {applicant.f_name + " " + applicant.m_name + " " + applicant.sr_name}
                                                    </td>
                                                ) :
                                                    <td className="px-3 py-2 uppercase text-nowrap hover:underline text-blue-600">
                                                        <Link href={route('applicant.show', applicant.id)}>
                                                            {applicant.f_name + " " + applicant.m_name + " " + applicant.sr_name}
                                                        </Link>
                                                    </td>
                                                }

                                                <td className="px-3 py-2">
                                                    <span className={
                                                        "px-2 py-1 rounded  " +
                                                        APPLICANT_STATUS_CLASS_MAP[applicant.status]
                                                    }>
                                                        {APPLICANT_STATUS_TEXT_MAP[applicant.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2">
                                                    { }
                                                    {applicant.exam_date?.exam_date ?
                                                        new Date(applicant.exam_date?.exam_date).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }) : " - "
                                                    }
                                                </td>
                                                <td className="px-3 py-2">{applicant.exam_room?.exam_room ? applicant.exam_room?.exam_room : " - "}</td>
                                                <td className="px-3 py-2 text-nowrap">

                                                    {applicant.created_at ?
                                                        new Date(applicant.created_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }) : "none"
                                                    }
                                                </td>
                                                <td className="px-3 py-2">{applicant.validate_by?.name}</td>
                                                <td className="px-3 py-2">{applicant.printed_by?.name}</td>
                                                <ApplicantFormAction
                                                    role={auth.user.role}
                                                    status={applicant.status}
                                                    applicantId={applicant.id}
                                                />
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={applicants.meta.links} />
                        </div>
                    </div>
                </div>
            </div>




        </AuthenticatedLayout>
    )
}
//<pre>{JSON.stringify(applicants, undefined , 2)}</pre>