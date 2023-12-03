import { useContext, useState } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import fetchAPI from '../util/fetchAPI'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const userContext = useContext(UserContext)
    console.log('userContext', userContext)

    function handleLogin() {
        const query = new URLSearchParams({
            email,
            password,
        }).toString()
        fetchAPI
            .get(`/users?${query}`)
            .then((users) => users[0])
            .then((user) => {
                if (user) {
                    userContext.onChange(user)
                    navigate('/home')
                } else {
                    setError('Invalid user')
                }
            })
            .catch((err) => {
                console.error('Error:', err)
            })
    }

    return (
        <div className="prose flex flex-col gap-5">
            <h1>Login</h1>
            <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <Link to="/signup">Sign Up</Link>

            {error && <div className="text-red-600">{error}</div>}
        </div>
    )
}
