import {Dispatch} from "redux";
import {authApi} from "../api/api";

export type AppStateType = {
    isLoading: boolean
    isLogged: boolean
}
export type SetIsLoadingAT = {
    type: 'SET-IS-LOADING'
    value: boolean
}
export type SetIsLoggedAT = {
    type: 'SET-IS-LOGGED'
    value: boolean
}


type ActionType = SetIsLoadingAT | SetIsLoggedAT

const initState: AppStateType = {
    isLoading: false,
    isLogged: false
}

export const appReducer = (state: any = initState, action: any) => {

    switch (action.type) {

        case 'SET-IS-LOADING':{
            const copyState = {...state}
            copyState.isLoading = action.value
            return copyState
        }

        case 'SET-IS-LOGGED':{
            const copyState = {...state}
            copyState.isLogged = action.value
            return copyState
        }


        default: {
            return state
        }
    }
}
export const setIsLoadingAC = (value: boolean) => {
    return {type: 'SET-IS-LOADING', value}
}
export const setIsLoggedAC = (value: boolean) => {
    return {type: 'SET-IS-LOGGED', value}
}

export const authMeTC = () => {
    return (dispatch: Dispatch) => {
        authApi.me()
            .then(()=>{
                dispatch(setIsLoggedAC(true))
            })
            .catch(()=>{
                dispatch(setIsLoggedAC(false))
            })
    }
}
export const loginTC = (telegramId:number, login:string, password:string) => {
    return (dispatch: Dispatch) => {
        authApi.login(telegramId,login,password)
            .then((res)=>{
                localStorage.setItem('token', res.data.token)
                dispatch(setIsLoggedAC(true))
            })
            .catch(()=>{
                dispatch(setIsLoggedAC(false))
            })
    }
}
