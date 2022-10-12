import {createSlice} from "@reduxjs/toolkit";

export const authenticateSlice = createSlice({
    name: 'authenticator',
    initialState:{
        jwtToken : localStorage.getItem("token") ? localStorage.getItem("token") : null,
        isLogin: localStorage.getItem("token") ? true : false
    },
    reducers: {
        login: (state,action) => {
            console.log({action});
            console.log({jwtToken : action.payload.jwtToken});
            state.jwtToken = action.payload.jwtToken;
            state.isLogin = true;
            localStorage.setItem("token",JSON.stringify(action.payload.jwtToken))
        },
        logout: (state) => {
            state.jwtToken = null;
            state.isLogin =false
            localStorage.removeItem("token");
        }

    }
})

export const {login,logout} = authenticateSlice.actions;

export default authenticateSlice.reducer;