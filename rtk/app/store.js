const { configureStore } = require('@reduxjs/toolkit');
const counterReducer = require('../features/counter/counterSlice');
const dynamicCounterReducer = require('../features/dynamicCounter/dynamicCounterSlice');
const postReducer = require('../features/post/postSlice');
const usersReducer = require('../features/users/userSlice');
const { createLogger } = require('redux-logger');
const logger = createLogger();
//configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamicCounter: dynamicCounterReducer,
        post: postReducer,
        users: usersReducer
    },
    middleware: (getDefaultMiddleWares) => getDefaultMiddleWares().concat(logger)
})

module.exports = store;