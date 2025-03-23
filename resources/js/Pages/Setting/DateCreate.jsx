import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function DateCreate({auth}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Settings
                </h2>
            }
        >
            Create Date
        </AuthenticatedLayout>
        )
}