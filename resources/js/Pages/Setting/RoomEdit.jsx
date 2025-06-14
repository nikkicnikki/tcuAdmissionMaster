import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RoomCreate({ auth, examroom, users }) {

    const { data, setData, put, errors, reset } = useForm({
        exam_room: examroom.data.exam_room || '',
        status: examroom.data.status || '',
        des: examroom.data.des || '',
        set_user: examroom.data.set_user || '',
 
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if ( data.status == 1 && data.set_user ) {
            alert("Room State must set to Active to Assign a User to Permit ");
        } else {
            put(route('room.update', examroom.data.id));
        }
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <a
                        onClick={() => window.history.back()}
                        className="text-xl cursor-pointer font-semibold leading-tight text-gray-800 dark:text-gray-200 cursor-pointer hover:underline transition-colors duration-200">
                        &laquo; back
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Settings - Edit Room "{examroom.data.exam_room}"
                    </h2>
                </div>
            }
        >
            <Head title="Add Room" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="set_room"
                                    value=" Room"
                                />

                                <TextInput
                                    id="set_room"
                                    className="mt-2 block w-full"
                                    name="exam_room"
                                    value={data.exam_room}
                                    onChange={(e) => setData("exam_room", e.target.value)}
                                    placeholder="Enter Room"
                                />
                                <InputError message={errors.exam_room} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="set_set_user"
                                    value="Permit - Assign User"
                                />

                                <SelectInput
                                    id="set_set_user"
                                    className="mt-2 block w-full"
                                    name="set_user"
                                    value={data.set_user}
                                    onChange={e => {
                                        //console.log("Selected Value:", e.target.value);
                                        setData('set_user', e.target.value);
                                    }}>
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                        ((user.role == 1 || user.role == 2) || user.role == 5) && (
                                            <option className="text-white bg-gray-500" key={user.id} value={user.id}>
                                                {`${user.name} - ${USER_STATUS_TEXT_MAP[user.role]}`}
                                            </option>
                                        )
                                    ))}
                                </SelectInput>
                                <InputError message={errors.set_user} className="mt-2" />
                            </div>


                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="set_status"
                                    value="Room State"
                                />

                                <SelectInput
                                    id="set_status"
                                    className="mt-2 block w-full"
                                    name="status"
                                    value={data.status}
                                    onChange={e => {
                                        //console.log("Selected Value:", e.target.value);
                                        setData('status', e.target.value);
                                    }}>
                                    <option value="">Select status</option>
                                    <option value="2">Active</option>
                                    <option value="1">Inactive</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2" />

                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="set_des"
                                    value="Room Description / Information"
                                />
                                <TextAreaInput
                                    id="set_des"
                                    className="mt-2 block w-full"
                                    name="des"
                                    value={data.des}
                                    onChange={e => setData('des', e.target.value)}
                                    isFocused={true}
                                    placeholder="Enter other information"
                                />
                                <InputError message={errors.des} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("setting.index")}
                                    className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 ">Sumbit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}