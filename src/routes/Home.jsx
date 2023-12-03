import { useContext } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function Home() {
    const { user } = useContext(UserContext)
    return (
        <div className="flex flex-col gap-5">
            <Header userEmail={user.email} />
            <div className="text-center pb-10">
                <p className="text-[2em] font-medium pb-20">About me</p>
                <p className="font-medium">
                    Email:{' '}
                    <span className="text-[#5b5c5c] font-normal">
                        {user.email}
                    </span>
                </p>
                <p className="font-medium">
                    Date sign up:{' '}
                    <span className="text-[#5b5c5c] font-normal">
                        {new Date(user.createdAt).toLocaleString()}
                    </span>
                </p>
            </div>
            <Link to="/notes" className="flex justify-center">
                <button
                    type="button"
                    className="bg-[#d1d1d1] p-2 w-[15em] rounded-lg font-medium hover:bg-[#949494] hover:text-white"
                >
                    Go to notes
                </button>
            </Link>
        </div>
    )
}
