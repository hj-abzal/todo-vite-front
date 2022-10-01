import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required!');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }
    console.log(error);
    return <div className="AddItemFormWrapper">
        <div>
            <input className="Input" type="text" value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <span className="Error"> {error ? error : ''}</span>
        </div>
        <button className="AddButton" onClick={addItem}>+</button>
    </div>
})
