import { createSlice } from "@reduxjs/toolkit";

interface WalletSlice {
    address: string;
}

const defaultState: WalletSlice = {
    address: ''
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState: defaultState,
    reducers: {
        setWalletAddress: (state: any, action: any) => {
            state.address = action.payload
        }
    }
})

export const { setWalletAddress } = walletSlice.actions;

export default walletSlice.reducer