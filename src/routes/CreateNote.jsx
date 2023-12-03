import { UserContext } from '../components/UserContextProvider'
import { useContext } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import NewNote from '../components/NewNote'
import fetchAPI from '../util/fetchAPI'

export default function CreateNote() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const createNote = async ({ title, text, createdAt, authorId }) => {
        const newNote = await fetchAPI.post('/notes', {
            title,
            text,
            createdAt,
            authorId,
        })

        return newNote
    }

    const createNoteAction = async ({ title, text }) => {
        const trimmedTitle = title.trim()
        const trimmedText = text.trim()

        const newNote = {
            title: trimmedTitle,
            text: trimmedText,
            createdAt: Date.now(),
            authorId: user.id,
        }
        const note = await createNote(newNote)

        navigate(`/notes/${note.id}`)

        return note
    }

    return (
        <div className="flex flex-col gap-5">
            <Header userEmail={user.email} />
            <div>
                <Link to="/notes">
                    <button
                        type="button"
                        className="bg-[#d1d1d1] p-2 rounded-lg font-medium hover:bg-[#949494] hover:text-white"
                    >
                        Back
                    </button>
                </Link>
                <p className="text-center text-[2em] font-medium pb-20">
                    Create new note
                </p>
            </div>
            <NewNote createNoteAction={createNoteAction} />
        </div>
    )
}
