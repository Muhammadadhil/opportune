import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import { persistStore ,persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root", 
    storage,
};

const persistedReducer=persistReducer(persistConfig,userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

export const persistor=persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
