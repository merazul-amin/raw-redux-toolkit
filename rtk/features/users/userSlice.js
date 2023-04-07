const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch')


//initial State
const initialState = {
    loading: false,
    error: '',
    users: []
}

//fetch function
const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    return users;
})


// reducer function

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.users = [];
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.users = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.users = [];
        })
    }
});
module.exports = usersSlice.reducer;
module.exports.fetchUsers = fetchUsers