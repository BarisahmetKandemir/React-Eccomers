//// burası redux store kayıt yeri
import {configureStore , combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import produtcReducer from "./slice/productSlice"
import filterReducer from  "./slice/filterSlice"
import cartReducer from "./slice/cartSlice"
import checkoutReducer from "./slice/checkoutSlice"
import orderReducer from "./slice/orderSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: produtcReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store