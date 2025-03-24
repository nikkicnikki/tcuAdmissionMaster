import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RoomCreate({auth}) {

    const { data , setData , post , errors , reset } = useForm({
        exam_room: '',
        status: '1',
        des: '',

    })

    const onSubmit = (e) => {
        e.preventDefault();

        // Log the data before submitting
        //console.log("Form Data before submit:", data);

        post(route('room.add'));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Settings - Add Room
                </h2>
            }
        >
            <Head title="Add Room" /> 

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form 
                            onSubmit = {onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel 
                                    htmlFor="set_room" 
                                    value="Setting Room" 
                                />

                                <TextInput  
                                    id="set_room"
                                    className="mt-2 block w-full"
                                    name="exam_room"
                                    value={data.exam_date}
                                    onChange={(e) => setData("exam_room", e.target.value)}
                                    placeholder="Enter Room"
                                />
                                <InputError message={errors.set_room} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="set_status" 
                                    value="Setting Status" 
                                />

                                <SelectInput 
                                    id="set_status"
                                    className="mt-2 block w-full" 
                                    name="status"
                                    onChange={ e => setData('status', e.target.value) }>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </SelectInput>
                                <InputError message={errors.set_status} className="mt-2" />

                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="set_des" 
                                    value="Setting Description" 
                                />

                                <TextAreaInput 
                                    id="set_des"
                                    className="mt-2 block w-full" 
                                    name="des"
                                    value={data.des}
                                    onChange={ e => setData('des', e.target.value) } 
                                    isFocused={true}
                                    placeholder="Enter other information"
                                /> 
                            
                            <InputError message={errors.set_des} className="mt-2" />
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