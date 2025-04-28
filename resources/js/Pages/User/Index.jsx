import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
//import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams = null, success, sucType }) {

    queryParams = queryParams || {}
    //<pre>{JSON.stringify(users, undefined , 2)}</pre>

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('user.index'), queryParams);
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
        router.get(route('user.index'), queryParams);
    }


    const deleteUser = (userdata) => {

        if (!window.confirm(`Are you sure you want to delete USER "${userdata.name}" ?`)) {
            return;
        }
        //console.log(route('date.delete', id ));
        router.delete(route('user.destroy', userdata.id));
    }

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User form
                </h2>

            }
        >
            <Head title="User form" />

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

                            <div className="flex justify-between items-center p-2 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <h2 className=" text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 justify items-center">
                                    Users
                                </h2>
                                {auth.user.role == 1 && (
                                    <Link
                                        href={route("user.create")}
                                        className="bg-emerald-500 p-4 mx-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                                    >
                                        Add new
                                    </Link>
                                )}

                            </div>

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
                                                name="role"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                ROLE
                                            </TableHeading>

                                            <TableHeading
                                                name="email"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                EMAIL
                                            </TableHeading>

                                            <TableHeading
                                                name="created_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                CREATE
                                            </TableHeading>

                                            <TableHeading
                                                name="updated_at"
                                                sort_field={queryParams.sort_field}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                UPDATE
                                            </TableHeading>

                                            {auth.user.role == 1 && (
                                                <th className="px-3 py-3 text-right">ACTIONS</th>
                                            )}

                                        </tr>
                                    </thead>

                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-0 py-0 w-10">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.id}
                                                    placeholder="#"
                                                    onBlur={e => searchFieldChanged('id', e.target.value)}
                                                    onKeyPress={e => onKeyPress('id', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.name}
                                                    placeholder="User Name"
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.role}
                                                    onChange={e => searchFieldChanged('role', e.target.value)}>
                                                    <option value="">Select Role</option>
                                                    {auth.user.role == 1 && <option value="1">ADMIN</option>}
                                                    <option value="2">MIS</option>
                                                    <option value="3">VALIDATOR</option>
                                                    <option value="4">SCORING STAFF</option>
                                                    <option value="5">MANAGER</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.email}
                                                    placeholder="Email"
                                                    onBlur={e => searchFieldChanged('email', e.target.value)}
                                                    onKeyPress={e => onKeyPress('email', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {users.data.map(user => (

                                            (user.role == 1 && auth.user.role != 1) ? "" :
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                                                    <th className="px-3 py-2">{user.id}</th>
                                                    <td className="px-3 py-2 uppercase text-nowrap text-blue-600">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <span className={
                                                            "px-2 py-1 rounded " +
                                                            USER_STATUS_CLASS_MAP[user.role]
                                                        }>
                                                            {USER_STATUS_TEXT_MAP[user.role]}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2">{user.email}</td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {new Date(user.created_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit",
                                                            hour12: true, // Set to false for 24-hour format
                                                        })}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {new Date(user.updated_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit",
                                                            hour12: true, // Set to false for 24-hour format
                                                        })}
                                                    </td>
                                                    {auth.user.role == 1 && (
                                                        <td className="px-3 py-2 text-right text-nowrap">
                                                            <Link
                                                                href={route('user.edit', user.id)}
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={(e) => deleteUser(user)}
                                                                //href={route('examRoom.destroy', examRoom.id)}
                                                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                            >
                                                                delete
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
//<pre>{JSON.stringify(users, undefined , 2)}</pre>