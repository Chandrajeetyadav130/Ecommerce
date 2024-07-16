import axios from "axios"
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,

}
    from "../constants/useConstant"
    // Login action
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_REQUEST })
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.post(`/api/v1/login`,
                { email, password },
                config
            )
            dispatch({ type: LOGIN_SUCCESS,payload:data.user })

            console.log(data)
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.error })
        }
    }
}
// register
export const register = (userData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: REGISTER_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.post("/api/v1/register", userData, config)
            dispatch({ type: REGISTER_SUCCESS, payload: data.user })
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.error
            })
        }
    }
}
// Load user information if login
export const loadUser = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOAD_USER_REQUEST })
            const { data } = await axios.get(`/api/v1/me`)
            console.log(data)

            dispatch({ type: LOAD_USER_SUCCESS, payload:data.user })

        } catch (error) {
            dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error })
        }
    }
}
// Logout user
export const logout = () => {
    return async (dispatch) => {
        try {
            await axios.get(`/api/v1/logout`)
            dispatch({ type: LOGOUT_SUCCESS })


        } catch (error) {
            dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error })
        }
    }
}

// updateProfile
export const updateProfile = (userData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_PROFILE_REQUEST })
            const config = { headers: { "Content-Type": "multipart/form-data" } }
            const { data } = await axios.put("/api/v1/me/update", userData, config)
            console.log(data)
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response.data.error
            })
        }
    }
}
// updatePassword
export const updatePassword = (passwords) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_PASSWORD_REQUEST })
            const config = { headers: { "Content-Type": "application/json" } }
            const { data } = await axios.put("/api/v1/password/update", passwords, config)
            console.log(data)
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
        } catch (error) {
            dispatch({
                type: UPDATE_PASSWORD_FAIL,
                payload: error.response.data.error
            })
        }
    }
}
export const clearError = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
}
