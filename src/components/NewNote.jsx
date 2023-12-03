import NoteForm from './NoteForm'

export default function NewNote({ createNoteAction }) {
    return (
        <NoteForm
            title=""
            text=""
            onSubmit={createNoteAction}
            btnText="Create"
        />
    )
}
