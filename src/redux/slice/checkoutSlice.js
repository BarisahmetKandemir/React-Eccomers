//// kargolama ve fatura adres kaydı yönetiminin yapıldığı redux
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingAddress: {},
  billingAddress: {}
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHİPPİNG_ADDRESS(state,action){
      state.shippingAddress = action.payload
    },
    SAVE_BİLLİNG_ADDRESS(state,action){
      state.billingAddress = action.payload
    }
  }
});

export const {SAVE_BİLLİNG_ADDRESS,SAVE_SHİPPİNG_ADDRESS} = checkoutSlice.actions

export const selectShippingAddress = (state) => state.checkout.shippingAddress
export const selectBillingAddress = (state) => state.checkout.billingAddress

export default checkoutSlice.reducer