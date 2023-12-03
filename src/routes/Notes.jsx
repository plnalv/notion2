import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import fetchAPI from '../util/fetchAPI'

export default function Notes() {
    const { user } = useContext(UserContext)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetchAPI
            .get(`/notes?authorId=${user.id}`)
            .then((note) => setNotes(note))
            .catch((err) => {
                console.error('Error fetching notes:', err)
            })
    }, [user.id])

    function handleDeleteNote(noteId) {
        fetchAPI
            .delete(`/notes/${noteId}`)
            .then(() => {
                setNotes((prevNotes) =>
                    prevNotes.filter((note) => note.id !== noteId)
                )
            })
            .catch((err) => console.error('Error deleting note:', err))
    }

    return (
        <div className="flex flex-col gap-5">
            <Header userEmail={user.email} />
            <div className="text-center pb-10">
                <p className="text-[2em] font-medium pb-10">Notes</p>
                <Link to="/notes/newNote">
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 w-[15em] rounded-lg font-medium hover:bg-[#949494] hover:text-white"
                    >
                        Add new note
                    </button>
                </Link>
            </div>
            <ul className="flex flex-col gap-5">
                {notes.map((note) => (
                    <li
                        key={note.id}
                        className="relative bg-[#d1d1d1] p-2 overflow-hidden"
                    >
                        <Link to={`/notes/${note.id}`}>
                            <p className="font-medium line-clamp-1">
                                {note.title}
                            </p>
                            <p>
                                {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <Link to={`/notes/${note.id}/edit`}>
                                <button
                                    type="button"
                                    className="bg-[#d1d1d1] p-2 rounded-lg hover:bg-[#949494]"
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
                    </li>
                ))}
            </ul>
        </div>
    )
}
