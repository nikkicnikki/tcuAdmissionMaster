import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function DateCreate({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        exam_date: '',
        status: 1,
        des: '',

    })

    const onSubmit = (e) => {
        e.preventDefault();

        // Log the data before submitting
        //console.log("Form Data before submit:", data);

        post(route('date.add'));
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
                        Settings - Add Schedule
                    </h2>
                </div>
            }
        >
            <Head title="Add Schedule" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="set_date"
                                    value="Setting Date"
                                />

                                <TextInput
                                    id="set_date"
                                    type="date"
                                    className="mt-2 block w-full"
                                    name="exam_date"
                                    value={data.exam_date}
                                    onChange={(e) => setData("exam_date", e.target.value)}
                                />
                                <InputError message={errors.exam_date} className="text-red-500 mt-2" />
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
                                    onChange={e => setData('des', e.target.value)}
                                    isFocused={true}
                                    placeholder="Enter other information"
                                />

                                <InputError message={errors.des} className="text-red-500 mt-2" />
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