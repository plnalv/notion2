import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/UserContextProvider'

export default function Error404() {
    const { user } = useContext(UserContext)

    return (
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[3em] font-medium text-red-600">404</h1>
            <h3 className="text-[2em] font-medium">Page not found</h3>
            {user ? (
                <Link to="/home">
                    <p>
                        Go{' '}
                        <span className="underline hover:text-[#66a3ed]">
                            Home
                        </span>
                    </p>
                </Link>
            ) : (
                <Link to="/">
                    <p>
                        Go{' '}
                        <span className="underline hover:text-[#66a3ed]">
                            Login
                        </span>
                    </p>
                </Link>
            )}
        </div>
    )
}
