import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function DateCreate({ auth , User }) {

    const { data , setData , put , errors , reset } = useForm({

        name: User.data.name || '',
        email: User.data.email || '',
        role: User.data.role || '',
        password: '',
        password_confirmation: '',

    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        // Log the data before submitting
        //console.log("Form Data before submit:", data);

        put(route('user.update',  User.data.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit User "{User.data.name}"
                </h2>
            }
        >
            <Head title="Edit User" /> 

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form 
                            onSubmit = {onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel 
                                    htmlFor="set_name" 
                                    value="User Name" 
                                />

                                <TextInput  
                                    id="set_name"
                                    className="mt-2 block w-full"
                                    name="name"
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder ="enter name"
                                    isFocused={true}
                                    required
                                />
                                <InputError message={errors.name} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="set_email" 
                                    value="User Email" 
                                />

                                <TextInput  
                                    id="set_email"
                                    className="mt-2 block w-full"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    placeholder="enter email"
                                    required
                                />
                                <InputError message={errors.email} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="set_role" 
                                    value="Role" 
                                />

                                <SelectInput 
                                    id="set_role"
                                    className="mt-2 block w-full" 
                                    name="role"
                                    required
                                    value={data.role}
                                    onChange={ e => setData('role', e.target.value) }>
                                    <option value="">Select Role</option>
                                    <option value="1">ADMIN</option>
                                    <option value="2">MIS</option>
                                    <option value="3">VALIDATOR</option>
                                    <option value="4">SCORING STAFF</option>
                                    <option value="5">MANAGER</option>
                                </SelectInput>
                                <InputError message={errors.role} className="text-red-500 mt-2" />

                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="set_password" 
                                    value="Password" 
                                />

                                <TextInput  
                                    id="set_password"
                                    className="mt-2 block w-full"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                    placeholder="enter password"
                                    
                                />
                               
                               <InputError message={errors.password} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="set_password_confirmation" 
                                    value="Password Confirmation" 
                                />

                                <TextInput  
                                    id="set_password_confirmation"
                                    className="mt-2 block w-full"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData("password_confirmation", e.target.value)}
                                    placeholder="enter password confirmation"
                                />
                               
                               <InputError message={errors.password_confirmation} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("user.index")}
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