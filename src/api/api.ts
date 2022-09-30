import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/1.0/',
    withCredentials: true
});

export const authApi = {
    register: () => {
        instance.post('auth/register', {telegramID: '1071927152', name: 'Abzal'})
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });
    },
    login: () => {
        instance.post('auth/login', {telegramID: '1071927152', name: 'Abzal'})
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });
    }

};

export const todolistApi = {
    create: (title: string) => {
        instance.post('todolists/create', {title, user_id: '632ec8ab7671ce3ee034ffda'})
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });
    },
    update: () => {
        instance.put('todolists/update', {_id:"632ee4df42969d31003df7fb", user_id: '632ec8ab7671ce3ee034ffda', title: 'Erni'})
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });
    },
    get: () => {
        instance.get('todolists/get?user_id=632ec8ab7671ce3ee034ffda')
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });
    },
    delete: () => {
        instance.delete('todolists/delete?user_id=632ec8ab7671ce3ee034ffda&_id=632ee4df42969d31003df7fb')
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {

            });
    },

};