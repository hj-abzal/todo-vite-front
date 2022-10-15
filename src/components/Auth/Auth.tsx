import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {loginTC} from "../../state/app-reducer";

const Auth = () => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.app.isLogged);
    const dispatch = useDispatch<any>()
    const formik = useFormik({
        initialValues: {
            telegramId: 1151952,
            login: 'Turgan7',
            password: '7777',
        },
        onSubmit: ({telegramId,login,password }) => {
            dispatch(loginTC(telegramId,login,password))
        },
    });
    if (isLogged) {
        return <Navigate to={'/home'}/>
    }


    return (

        <form className='wrapper' onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">TelegramID</label>
            <input
                id="TelegramID"
                name="TelegramID"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.telegramId}
            />
            <label htmlFor="lastName">Login</label>
            <input
                id="Login"
                name="Login"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.login}
            />
            <label htmlFor="email">Password</label>
            <input
                id="Password"
                name="Password"
                type="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Auth;