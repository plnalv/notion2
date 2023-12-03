import { useContext } from 'react'
import { UserContext } from '../components/UserContextProvider'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import fetchAPI from '../util/fetchAPI'
import Error404 from './Error404'

export default function Note() {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [note, setNote] = useState(null)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchAPI
            .get(`/notes/${id}`)
            .then((note) => setNote(note))
            .catch((error) => {
                console.error('Error fetching note:', error)
                setError(true)
            })
    }, [id])

    if (error) {
        return <Error404 />
    }

    if (!note) {
        return <div>Loading...</div>
    }

    function handleDeleteNote(noteId) {
        fetchAPI
            .delete(`/notes/${noteId}`)
            .then(() => {
                navigate(`/notes`)
            })
            .catch((err) => console.error('Error deleting note:', err))
    }

    return (
        <div className="flex flex-col gap-5">
            <Header userEmail={user.email} />
            <div className="flex flex-row justify-between">
                <Link to="/notes">
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 rounded-lg font-medium hover:bg-[#949494] hover:text-white"
                    >
                        Back
                    </button>
                </Link>
                <p className="text-[2em] font-medium pb-20">{note.title}</p>
                <div>
                    <Link to={`/notes/${note.id}/edit`}>
                        <button
                            type="button"
                            className="bg-[#d1d1d1] p-2 mr-2 rounded-lg hover:bg-[#949494]"
                        >
                            ✍️
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 rounded-lg hover:bg-[#949494]"
                        onClick={() => handleDeleteNote(note.id)}
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <pre className="bg-[#d1d1d1] p-3 min-h-[20vh] break-words">
                {note.text}
            </pre>
        </div>
    )
}
