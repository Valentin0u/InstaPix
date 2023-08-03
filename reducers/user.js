import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: '', photos: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.value.email = action.payload;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter(
        (el) => el !== action.payload
      );
    },
  },
});

export const { updateEmail, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
