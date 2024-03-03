import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    errorMsg : null,
    successMsg : null,
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
        },
        updateStart: (state) => {
            state.loading = true;
            state.errorMsg = null;
          },
          updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.errorMsg = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.errorMsg = action.payload;
          },
          updateSuccessMsg : (state,action)=>{
            state.successMsg = action.payload;
          }
    }
});
export const{siginInStart , signInSuccess , signInFailure ,updateStart,updateFailure,updateSuccess , updateSuccessMsg} = userSlice.actions;
export default userSlice.reducer;