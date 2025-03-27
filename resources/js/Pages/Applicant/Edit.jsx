import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth , applicants , programs }) {
    console.log(auth);
    const { data , setData , put , errors , reset } = useForm({
        
        status          : applicants.status        || '' ,
        created_at      : applicants.created_at    || '' ,
        updated_at      : applicants.updated_at    || '' ,
        validator_id    : auth.user.id ,
        validator_name  : auth.user.name ,
        created_at      : applicants.created_at || '' ,
        updated_at      : applicants.updated_at || '' ,

        f_name          : applicants.f_name        || '' ,
        m_name          : applicants.m_name        || '' ,
        sr_name         : applicants.sr_name       || '' ,
        prog            : applicants.prog          || '' ,
        reason          : applicants.reason        || '' ,
        
        bs_degree       : applicants.bs_degree     || '' ,
        yr_grad         : applicants.yr_grad       || '' ,
        l_schl_att      : applicants.l_schl_att    || '' ,
        tor             : applicants.tor           || '' ,
        
        curr_emp        : applicants.curr_emp      || '' ,
        curr_occ        : applicants.curr_occ      || '' ,
        l_serv          : applicants.l_serv        || '' ,
        gov_vald        : applicants.gov_vald      || '' ,
        gov_id          : applicants.gov_id        || '' ,
        voter_id        : applicants.voter_id      || '' ,
        conn_com_ins    : applicants.conn_com_ins  || '' ,
        
        sex             : applicants.sex           || '' ,
        bday            : applicants.bday          || '' ,
        bplace          : applicants.bplace        || '' ,
        cont            : applicants.cont          || '' ,
        email           : applicants.email         || '' ,
        tag_res         : applicants.tag_res       || '' ,
        curr_add        : applicants.curr_add      || '' ,
        fb_acc          : applicants.fb_acc        || '' ,
        fb_acc_link     : applicants.fb_acc_link   || '' ,
        
        
        remarks         : applicants.remarks       || '' ,
        
        
        //validate_by     : applicants.data.validate_by ,
    });
    
    //console.log(examdate);
    const onSubmit = (e) => {
        e.preventDefault();

        // Log the data before submitting
        //console.log("Form Data before submit:", data);

        //put(route('appicant.update',  data.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Validation {`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`}
                </h2>
            }
        >
            <Head title={`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`} /> 

            <div className="pt-12 pb-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg flex flex-nowrap" >
                            
                            <div className="mt-1 flex-1">
                                <label className="font-bold text-lg">VALIDATOR : </label> {data.validator_name.toUpperCase()} 
                                <span
                                    className={
                                        "px-1 py-1 ml-3 rounded text-white text-[10px]" +
                                        USER_STATUS_CLASS_MAP[auth.user.role] 
                                    }
                                >
                                    {USER_STATUS_TEXT_MAP[auth.user.role]}
                                </span>
                            </div>
                            <div className="mt-1 flex-1">
                                <label className="font-bold text-lg">STATUS : </label> 
                                <span
                                    className={
                                        "px-1 py-1 ml-3 rounded text-white " +
                                        APPLICANT_STATUS_CLASS_MAP[data.status] 
                                    }
                                >
                                    {APPLICANT_STATUS_TEXT_MAP[data.status]}
                                </span>

                                <label className="font-bold text-lg ml-2 text-[15px]">CREATE : </label>
                                    {new Date(data.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}

                                <label className="font-bold text-lg ml-2 text-[15px]">UPDATE : </label>
                                    {new Date(data.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                            </div>

                        </div>   
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form 
                            onSubmit = {onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div className="flex flex-nowrap">
                                {/* name of applicant */}
                                <div className="flex-1 pl-2">
                                    <InputLabel 
                                        htmlFor="app_f_name" 
                                        value="firstname" 
                                    />

                                    <TextInput  
                                        id="app_f_name"
                                        className="mt-2 block w-full"
                                        name="f_name"
                                        value={data.f_name}
                                        onChange={(e) => setData("f_name", e.target.value)}
                                    />
                                    <InputError message={errors.f_name} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel 
                                        htmlFor="app_m_name" 
                                        value="middlename" 
                                    />
                                    <TextInput  
                                        id="app_m_name"
                                        className="mt-2 block w-full"
                                        name="m_name"
                                        value={data.m_name}
                                        onChange={(e) => setData("m_name", e.target.value)}
                                    />
                                    <InputError message={errors.m_name} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel 
                                        htmlFor="app_sr_name" 
                                        value="Surname" 
                                    />
                                    <TextInput  
                                        id="app_sr_name"
                                        className="mt-2 block w-full"
                                        name="sr_name"
                                        value={data.sr_name}
                                        onChange={(e) => setData("sr_name", e.target.value)}
                                    />
                                    <InputError message={errors.sr_name} className="text-red-500 mt-2" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="app_prog" 
                                    value="Program" 
                                />
                                <SelectInput 
                                    id="app_prog"
                                    className="mt-2 block w-full" 
                                    name="prog"
                                    value={data.prog.id}
                                    onChange={ e => {
                                        //console.log("Selected Value:", e.target.value);
                                        setData('prog', e.target.value);
                                        } }>
                                    {programs.map(program => (
                                        <option value={program.id}>{program.acronym + " - " + program.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.prog} className="text-red-500 mt-2" />

                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="app_reason" 
                                    value="Why do you want to take this program?" 
                                />
                                <p className="mt-1 p-2 bg-gray-100">{data.reason ? data.reason : "none" }</p>
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_bs_degree" 
                                    value="Bachelor's Degree" 
                                />
                                <TextInput  
                                    id="app_bs_degree"
                                    className="mt-2 block w-full"
                                    name="bs_degree"
                                    value={data.bs_degree}
                                    onChange={(e) => setData("bs_degree", e.target.value)}
                                />
                                <InputError message={errors.bs_degree} className="text-red-500 mt-2" />
                            </div>
                            
                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_yr_grad" 
                                    value="Year Graduate" 
                                />
                                <TextInput  
                                    id="app_yr_grad"
                                    className="mt-2 block w-full"
                                    name="yr_grad"
                                    type="date"
                                    value={data.yr_grad}
                                    onChange={(e) => setData("yr_grad", e.target.value)}
                                />
                                <InputError message={errors.yr_grad} className="text-red-500 mt-2" />
                            </div>
                            
                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_l_schl_att" 
                                    value="Last school attend" 
                                />
                                <TextInput  
                                    id="app_l_schl_att"
                                    className="mt-2 block w-full"
                                    name="l_schl_att"
                                    value={data.l_schl_att}
                                    onChange={(e) => setData("l_schl_att", e.target.value)}
                                />
                                <InputError message={errors.l_schl_att} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_l_schl_att" 
                                    value="Last school attend" 
                                />
                                <TextInput  
                                    id="app_l_schl_att"
                                    className="mt-2 block w-full"
                                    name="l_schl_att"
                                    value={data.l_schl_att}
                                    onChange={(e) => setData("l_schl_att", e.target.value)}
                                />
                                <InputError message={errors.l_schl_att} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="app_tor" 
                                    value="Transcript of Record" 
                                />
                                <TextInput  
                                    id="app_tor"
                                    className="mt-2 block w-full"
                                    name="tor"
                                    value={data.tor}
                                    onChange={(e) => setData("tor", e.target.value)}
                                />
                                <Link 
                                    to="#"  // Prevents navigation within the app
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent React Router from handling the link
                                        window.open(data.tor, "_blank");
                                    }}
                                >
                                    view here
                                </Link>
                                <InputError message={errors.tor} className="text-red-500 mt-2" />
                            </div>
                            
                            <div className="mt-4">
                                <InputLabel 
                                    htmlFor="app_curr_emp" 
                                    value="Employed" 
                                />
                                <SelectInput 
                                    id="app_curr_emp"
                                    className="mt-2 block w-full" 
                                    name="curr_emp"
                                    value={data.curr_emp}
                                    onChange={ e => setData('curr_emp', e.target.value) }>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </SelectInput>
                                <InputError message={errors.curr_emp} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_curr_occ" 
                                    value="Last school attend" 
                                />
                                <TextInput  
                                    id="app_curr_occ"
                                    className="mt-2 block w-full"
                                    name="curr_occ"
                                    value={data.curr_occ}
                                    onChange={(e) => setData("curr_occ", e.target.value)}
                                />
                                <InputError message={errors.curr_occ} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_l_serv"
                                    value="Length of Service" 
                                />
                                <TextInput  
                                    id="app_l_serv"
                                    className="mt-2 block w-full"
                                    name="l_serv"
                                    value={data.l_serv}
                                    onChange={(e) => setData("l_serv", e.target.value)}
                                />
                                <InputError message={errors.l_serv} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_gov_vald" 
                                    value="Government Worker?" 
                                />
                                <SelectInput 
                                    id="app_gov_vald"
                                    className="mt-2 block w-full" 
                                    name="gov_vald"
                                    value={data.gov_vald}
                                    onChange={ e => setData('gov_vald', e.target.value) }>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </SelectInput>
                                <InputError message={errors.gov_vald} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_gov_id" 
                                    value="Gov. issued ID " 
                                />
                                <TextInput  
                                    id="app_gov_id"
                                    className="mt-2 block w-full"
                                    name="gov_id"
                                    value={data.gov_id}
                                    onChange={(e) => setData("gov_id", e.target.value)}
                                />
                                <Link 
                                    to="#"  // Prevents navigation within the app
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent React Router from handling the link
                                        window.open(data.gov_id, "_blank");
                                    }}
                                >
                                    view here
                                </Link>
                                <InputError message={errors.gov_id} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_voter_id" 
                                    value="Voters ID " 
                                />
                                <TextInput  
                                    id="app_voter_id"
                                    className="mt-2 block w-full"
                                    name="voter_id"
                                    value={data.voter_id}
                                    onChange={(e) => setData("voter_id", e.target.value)}
                                />
                                <Link 
                                    to="#"  // Prevents navigation within the app
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent React Router from handling the link
                                        window.open(data.voter_id, "_blank");
                                    }}
                                >
                                    view here
                                </Link>
                                <InputError message={errors.voter_id} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-2">
                                <InputLabel 
                                    htmlFor="app_conn_com_ins"
                                    value="Company/Institution Currently Connected " 
                                />
                                <TextInput  
                                    id="app_conn_com_ins"
                                    className="mt-2 block w-full"
                                    name="conn_com_ins"
                                    value={data.conn_com_ins}
                                    onChange={(e) => setData("conn_com_ins", e.target.value)}
                                />
                                <InputError message={errors.conn_com_ins} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-20">
                                <InputLabel 
                                    htmlFor="app_sex" 
                                    value="Gender" 
                                />
                                <SelectInput 
                                    id="app_sex"
                                    className="mt-2 block w-full" 
                                    name="sex"
                                    value={data.sex}
                                    onChange={ e => setData('sex', e.target.value) }>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </SelectInput>
                                <InputError message={errors.sex} className="text-red-500 mt-2" />
                            </div>
                            bday




                            <div className="mt-4 text-right">
                                <Link
                                    href={route("applicant.index")}
                                    className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 ">UPDATE</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
        )
}