import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const favoriteSlices = createSlice({name: "favorites", initialState: [] as string[], reducers: {
    toggleFavorite(state, action: PayloadAction<string>){
        if(state.includes(action.payload))
            return state.filter((el)=>el !== action.payload)
        else
            state.push(action.payload);
    }
}})

export const { toggleFavorite } = favoriteSlices.actions;
export default favoriteSlices.reducer;