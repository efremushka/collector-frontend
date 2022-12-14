import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"


export const fetchCollections = createAsyncThunk("collections/fetchCollections", async () => {
    const { data } = await axios.get("/collections")
    return data
})

export const fetchTags = createAsyncThunk("collections/fetchTags", async () => {
    const { data } = await axios.get("/tags")
    return data
})

export const fetchRemoveCollection = createAsyncThunk("collections/fetchRemoveCollection", async (id) => {
    const { data } = await axios.delete(`/collections/${id}`)
})

const initialState = {
    collections: {
        items: [],
        status: "loading",
    },
    tags: {
        items: [],
        status: "loading",
    }
}

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCollections.pending]: (state) => {
            state.collections.items = []
            state.collections.status = "loading"
        },
        [fetchCollections.fulfilled]: (state, action) => {
            state.collections.items = action.payload
            state.collections.status = "loaded"
        },
        [fetchCollections.rejected]: (state) => {
            state.collections.items = []
            state.collections.status = "error"
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = "error"
        },
        [fetchRemoveCollection.pending]: (state, action) => {
            state.collections.items = state.collections.items.filter(obj => obj._id !== action.meta.arg)
        }
    }
})

export const collectionsReducer = collectionsSlice.reducer