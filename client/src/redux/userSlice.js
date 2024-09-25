export const userSlice = createSlice({    
    initialState :{
        name:'',
        email:'',
        isLoggedIn:false,
        isPremium:false,
    },
    reducers:{
        loginUser:(state, action)=>{
            state.isLoggedIn=true;
        },
        logOutUser:(state, action)=>{
            state.isLoggedIn=false;
        },
    }

})

export const {loginUser, logOutUser} =userSlice.actions
export default userSlice.reducers