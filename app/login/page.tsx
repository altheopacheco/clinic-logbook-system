import { redirect } from "next/navigation";

export default function Page() {

    async function handleLogin(formData: FormData) {
        'use server';

        const data = Object.fromEntries(formData);
        if (data.password == process.env.SYSTEM_PASSWORD) {
            redirect("/dashboard");
        }
    }

    return <main className="flex justify-center p-2 h-[80vh] items-center">
        <div className="h-fit p-2 border shadow">
            <h1 className="text-center text-2xl">LOG IN</h1> 
            <form action={handleLogin}>
                <input className="border rounded" name="password" type="password" />
                <button type="submit" className="p-1 rounded border hover:bg-gray-100">Login</button>
            </form>
        </div>
    </main>
}