import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const errorMessage = "Title is required!"

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }


    return (
        <div>
            <input
                value={title}
                onChange={ onChangeHandler }
                onKeyPress={ onKeyPressHandler }
                style={error ? {border: "3px solid red"} : {}}
            />
            <button onClick={addItem}>+</button>
            <div style={error ? {color: "red"} : {display: "none"}}>
                {errorMessage}
            </div>
        </div>
    )
}
export default  AddItemForm;