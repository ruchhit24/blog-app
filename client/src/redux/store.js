import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import themeReducer from "./theme/themeSlice"
import { combineReducers } from "redux"; // Change from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Change from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userReducer,
    theme : themeReducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);


// export const store = configureStore({
//     reducer : {
//         user : userReducer,
//     }
// })
