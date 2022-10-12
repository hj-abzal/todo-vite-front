import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AddItemForm.module.css';

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

    return <div className={s.wrapper}>
        <div>
            <input
                className={s.Input}
                type="text"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <span className={s.error}> {error ? error : ''}</span>
        </div>
        <button onClick={addItem}>+</button>
    </div>
})
