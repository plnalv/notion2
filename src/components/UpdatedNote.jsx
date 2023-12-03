import NoteForm from './NoteForm'

export default function UpdatedNote({ title, text, updateNoteAction }) {
    return (
        <NoteForm
            title={title}
            text={text}
            onSubmit={updateNoteAction}
            btnText="Update"
        />
    )
}
