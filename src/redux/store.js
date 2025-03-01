import { configureStore } from '@reduxjs/toolkit'
import authApi from './feature/auth/authApi'
import infoApi from './feature/info/infoApi'
import authReducer from './feature/auth/authSlice'

export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [authApi.reducerPath]: authApi.reducer,
      [infoApi.reducerPath]: infoApi.reducer,
      auth: authReducer
      
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, infoApi.middleware),
    
  })

 