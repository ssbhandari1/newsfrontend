import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 const BASE_URL='https://newsapi.org/v2'
const apikey=process.env.REACT_APP_NEWS_API_KEY;
const counti='in'
export const fetchNewsData=createAsyncThunk('news/fetchNewsData' , async()=>{
    try {
        const res=await axios.get(`${BASE_URL}/top-headlines?country=${counti}&pageSize=50&apiKey=${apikey}`)
        console.log(res.data)

        return res.data
    } catch (error) {
        console.log(error.message)

    }
})
export const fetchNewsType=createAsyncThunk('news/fetchNewsType' , async(type)=>{
    try {
        const res=await axios.get(`${BASE_URL}/top-headlines?country=${counti}&category=${type}&pageSize=70&apiKey=${apikey}`)
return res.data
    } catch (error) {
        console.log(error.message)

    }
})

const newsDataSlice=createSlice({
    name:"news",
    initialState:{
        isloading:false,
        isError:false,
        newsData:{},
        newsType:[],
        saveData:[]
    },
    reducers:{

        saveNewsData:(state,action)=>{
    console.log(action.payload)
    state.saveData.push(action.payload)
        }
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchNewsData.pending,(state)=>{
            state.isloading=true
        })
        .addCase(fetchNewsData.fulfilled, (state,action)=>{
            console.log(action.payload)

            state.isloading=false
            state.newsData=action.payload
        })
        .addCase(fetchNewsData.rejected,(state)=>{
            state.isError=true
        })
        .addCase(fetchNewsType.pending,(state)=>{
            state.isloading=true
        })
        .addCase(fetchNewsType.fulfilled, (state,action)=>{
            
console.log(action.payload)
            state.isloading=false
            state.newsType=action.payload
        })
        .addCase(fetchNewsType.rejected,(state)=>{
            state.isError=true
        })
    }
})
 
export const {saveNewsData}=newsDataSlice.actions

export default newsDataSlice.reducer