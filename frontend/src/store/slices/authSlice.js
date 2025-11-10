import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({username, email, password}, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/register', {username, email, password});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const payload = username ? { username, password } : { email, password };
      const res = await api.post('/api/users/login', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Refresh access token (server reads httpOnly cookie)
// export const refreshAccessToken = createAsyncThunk(
//   'auth/refresh',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.post('/api/users/refresh-token');
//       const data = res.data;
//       if (data?.accessToken) setAuthToken(data.accessToken);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// Logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/users/logout');
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Refresh access token (server reads httpOnly cookie)
export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/users/refresh-token');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  user: null, // do not persist user in localStorage; rely on httpOnly refresh cookie + refresh endpoint
  loading: false,
  error: null,
  accessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
    },
    // clear only the error message (useful when navigating between auth pages)
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // backend returns created user (or a message). if user present, set it
        if (action.payload?.data?.id || action.payload?.id) {
          state.user = action.payload.data ?? action.payload;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // expected shape: { user, accessToken }
        // backend wraps response in ApiResponse { statusCode, data, message }
        const payloadData = action.payload?.data ?? action.payload;
        if (payloadData?.user) {
          state.user = payloadData.user;
        } else if (payloadData?.id || payloadData?.username) {
          // if backend returned the user object directly
          state.user = payloadData;
        }
  // user is set from response; do NOT persist to localStorage to avoid storing auth state in JS-accessible storage
        // if (action.payload?.accessToken) state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // refresh
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        const payloadData = action.payload?.data ?? action.payload;
        if (payloadData?.accessToken) state.accessToken = payloadData.accessToken;
        if (payloadData?.user) {
          state.user = payloadData.user;
        }
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
      })

      // .addCase(refreshAccessToken.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(refreshAccessToken.fulfilled, (state, action) => {
      //   state.loading = false;
      //   if (action.payload?.accessToken) state.accessToken = action.payload.accessToken;
      // })
      // .addCase(refreshAccessToken.rejected, (state) => {
      //   state.loading = false;
      //   state.user = null;
      //   state.accessToken = null;
      // })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        // state.accessToken = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearAuth, clearAuthError } = authSlice.actions;

// selectors
export const selectCurrentUser = (state) => state.auth.user;
// export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
