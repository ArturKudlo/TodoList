import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)


    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <input
                autoFocus={true}
                value={title}
                onBlur={offEditMode}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;