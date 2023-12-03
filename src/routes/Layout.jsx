import { Outlet } from 'react-router-dom'
export default function Layout() {
    return (
        <div className="m-[5em]">
            <main className="p-4 min-h-[70vh] mt-20">
                <Outlet />
            </main>
            <hr />
            <footer className="flex justify-between p-4">
                <p className="text-sm text-[#5b5c5c]">
                    Created by: Polina Aliyeva
                </p>
                <p className="text-sm text-[#5b5c5c]">BSU: 2023</p>
            </footer>
        </div>
    )
}
