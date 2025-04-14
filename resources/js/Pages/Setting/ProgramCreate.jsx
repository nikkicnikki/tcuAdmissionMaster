import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ProgramCreate({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        acronym: '',
        passing_grade: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        // Log the data before submitting
        // console.log("Form Data before submit:", data);

        post(route('program.add'));
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
                        Settings - Add Program
                    </h2>
                </div>
            }
        >
            <Head title="Add Program" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="set_name"
                                    value="Setting Program Name"
                                />

                                <TextInput
                                    id="set_name"
                                    className="mt-2 block w-full uppercase"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="Enter Program name"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="set_acronym"
                                    value="Setting Program Acronym"
                                />

                                <TextInput
                                    id="set_acronym"
                                    className="mt-2 block w-full uppercase"
                                    name="acronym"
                                    value={data.acronym}
                                    onChange={(e) => setData("acronym", e.target.value)}
                                    placeholder="e.g: MPA"
                                    required
                                />
                                <InputError message={errors.acronym} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="set_passing_grade"
                                    value="Setting Program Passsing Grade"
                                />

                                <TextInput
                                    id="set_passing_grade"
                                    className="mt-2 block w-full uppercase"
                                    name="passing_grade"
                                    type="number"
                                    value={data.passing_grade}
                                    onChange={(e) => setData("passing_grade", e.target.value)}
                                    placeholder="enter whole number"
                                />
                                <InputError message={errors.passing_grade} className="mt-2" />
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