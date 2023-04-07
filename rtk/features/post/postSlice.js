const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch')

//initial State
const initialState = {
    loading: false,
    posts: [],
    error: ''
};

//create async thunk
const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts = await res.json();
    return posts;
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchPosts.pending, (state, action) => {
            state.loading = true;
            state.error = '';

        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.posts = action.payload;
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.posts = [];
        })
    }
})

module.exports = postSlice.reducer;
module.exports.fetchPosts = fetchPosts;