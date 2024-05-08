import { createSlice } from '@reduxjs/toolkit';

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface AccountSlice {
  user?: User;
  accessToken?: string;
}

const defaultState: AccountSlice = {
  user: undefined,
  accessToken: undefined,
};

const userSlice = createSlice({
  name: 'wallet',
  initialState: defaultState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
