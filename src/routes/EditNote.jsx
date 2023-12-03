import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../components/UserContextProvider'
import Header from '../components/Header'
import { useParams, Link, useNavigate } from 'react-router-dom'
import fetchAPI from '../util/fetchAPI'
import UpdatedNote from '../components/UpdatedNote'

export default function EditNote() {
    const { user } = useContext(UserContext)
    const [note, setNote] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        fetchAPI
            .get(`/notes/${id}`)
            .then((note) => setNote(note))
            .catch((error) => console.error('Error fetching note:', error))
    }, [id])

    if (!note) {
        return <div>Loading...</div>
    }

    const updateNote = async ({ title, text }) => {
        const updatedNote = await fetchAPI.put(`/notes/${id}`, {
            title,
            text,
            createdAt: note.createdAt,
            authorId: note.authorId,
        })

        return updatedNote
    }

    const updateNoteAction = async ({ title, text }) => {
        const trimmedTitle = title.trim()
        const trimmedText = text.trim()

        const updatedNote = {
            title: trimmedTitle,
            text: trimmedText,
        }

        const note = await updateNote(updatedNote)

        navigate(`/notes/${note.id}`)

        return note
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
                <p className="text-[2em] font-medium pb-20">Edit Note</p>
            </div>
            <div>
                <UpdatedNote
                    title={note.title}
                    text={note.text}
                    updateNoteAction={updateNoteAction}
                />
            </div>
        </div>
    )
}
