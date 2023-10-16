import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "user",
  lastname: "user",
  email: "xyz@gmail.com",
  id: "",
  loggedIn: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    updateUserFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    removeUserFirstName: (state, action) => {
      state.firstname = action.payload;
    },
    updateUserLastName: (state, action) => {
      state.lastname = action.payload;
    },
    removeUserLastName: (state, action) => {
      state.lastname = action.payload;
    },
    updateUserEmail: (state, action) => {
      state.email = action.payload;
    },
    removeUserEmail: (state, action) => {
      state.email = action.payload;
    },
    updateUserId: (state, action) => {
      state.id = action.payload;
    },
    removeUserId: (state, action) => {
      state.id = action.payload;
    },
    updateUserLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    removeUserLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const {
  updateUserFirstName,
  removeUserFirstName,
  updateUserLastName,
  removeUserLastName,
  updateUserEmail,
  removeUserEmail,
  updateUserId,
  removeUserId,
  updateUserLoggedIn,
  removeUserLoggedIn,
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;

// export const userSelectoreUserData = useSelector((state) => ({
//   firstname: state.user.firstname,
// }));
