import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


export const fetchProduct =createAsyncThunk ('products/fetch', async ()=>{
    const res = fetch("https://dummyjson.com/products");
    const json = (await res).json();
    return json
})


const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],
        status:"idle"
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProduct.pending,(state,action)=>{
            state.status = "pending"
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.status = "idle"
        })
        .addCase(fetchProduct.rejected,(state,action)=>{
            state.status = "error"
        })
    }
});
export default productSlice.reducer 


