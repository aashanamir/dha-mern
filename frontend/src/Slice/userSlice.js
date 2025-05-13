import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../API/Api.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userStatus: "pre",
    userData: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.userStatus = action.payload;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  }
});

export const { setStatus, setUser } = userSlice.actions;
export default userSlice.reducer;

// Thunks
export function LogInUser(email, password) {
  return async function LogInUserThunk(dispatch) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(BASEURL + "v1/user/login", {
        email, password
      }, {
        headers: {
          "Content-Type": "application/json",
        }, withCredentials: true,
      });
      console.log(data);
      
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    }
  }
}

export function fetchUser() {
  return async function fetchUserThunk(dispatch) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.get(BASEURL + "v1/user/me", {
        withCredentials: true,
      });
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    }
  }
}



export function logOutUser() {
  return async function fetchUserThunk(dispatch) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.get(BASEURL + "user/logout", {
        withCredentials: true,
      });
      console.log(data);
      
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error);
      dispatch(setStatus("error"));
    }
  }
}