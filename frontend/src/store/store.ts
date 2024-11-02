import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import postReducer from "@/store/slices/postSlice";
import appSlice from '@/store/slices/appSlice'

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
    key: "user",
    storage,
};

const freelancerPersistConfig = {
    key: "freelancer",
    storage,
    // whitelist: ["theme"], // only persist specific data
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedPostReducer = persistReducer(freelancerPersistConfig, postReducer);

const rootReducer = combineReducers({
    user: persistedUserReducer,
    post: persistedPostReducer,
    app: appSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Necessary to avoid warnings with non-serializable data
        }),
});

export const persistor = persistStore(store);

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
