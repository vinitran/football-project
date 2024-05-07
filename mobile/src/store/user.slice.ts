import { createSlice } from '@reduxjs/toolkit';

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
}

interface AccountSlice {
  user?: User;
}

const defaultState: AccountSlice = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'wallet',
  initialState: defaultState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
