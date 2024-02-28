import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    errorMsg : null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        siginInStart : (state)=>{
            state.loading = true,
            state.errorMsg = null
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.errorMsg = null
        },
        signInFailure : (state,action)=>{
            state.errorMsg = action.payload,
            state.loading = false
        }
    }
});
export const{siginInStart , signInSuccess , signInFailure} = userSlice.actions;
export default userSlice.reducer;