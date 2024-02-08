//// burası redux store kayıt yeri
import {configureStore , combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import produtcReducer from "./slice/productSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: produtcReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store