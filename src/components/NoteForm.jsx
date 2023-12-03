import { useState } from 'react'
import { Form } from 'react-router-dom'
import { Note } from '../util/validation'

export default function NoteForm({
    title: defaultTitle,
    text: defaultText,
    onSubmit,
    btnText,
}) {
    const [title, setTitle] = useState(defaultTitle)
    const [text, setText] = useState(defaultText)
    const [errors, setErrors] = useState(null)

    function handleSubmit() {
        const trimmedTitle = title.trim()
        const trimmedText = text.trim()

        try {
            Note.parse({ title: trimmedTitle, text: trimmedText })
            onSubmit({ title, text })
        } catch (error) {
            setErrors(error.formErrors.fieldErrors)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-5">
                    Name:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-[#d1d1d1]"
                    />
                </label>
                {errors?.title && (
                    <div className="text-red-600">{errors?.title[0]}</div>
                )}
                <label className="flex flex-col gap-5">
                    Note text:
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="bg-[#d1d1d1]"
                    />
                </label>
                <input type="submit" value={btnText} />
            </div>
        </Form>
    )
}
