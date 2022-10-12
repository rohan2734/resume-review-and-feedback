import {configureStore} from "@reduxjs/toolkit";
import authenticateReducer from "./authenticateSlice";

export default configureStore({
    reducer: {
        authenticator : authenticateReducer
    }
})