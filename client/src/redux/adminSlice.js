import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const base_url = "http://localhost:4000/api/admin";

export const allUser = createAsyncThunk("allUser", async () => {
  const res = await axios.get(base_url + "/user/all");
  return res.data;
});
export const getUser = createAsyncThunk("getUser", async (params) => {
  const res = await axios.get(base_url + `/user/${params}`);
  return res.data;
});
export const permissionUser = createAsyncThunk("rollUser", async (data) => {
  const res = await axios.put(base_url + `/user/${data.params}`, {role: data.role});
  return res.data;
});
export const getAllCategory = createAsyncThunk("getAllCategory", async () => {
  const res = await axios.get(base_url + "/category/all");
  return res.data;
});
export const createCategory = createAsyncThunk("addCategory", async (data) => {
  const res = await axios.post(base_url + "/category/", data);
  return res.data;
});
export const updateCategory = createAsyncThunk("editCategory", async (data) => {
  const res = await axios.put(base_url + `/category/${data._id}`, data);
  return res.data;
});
export const deleteCategory = createAsyncThunk("delCategory", async (data) => {
  const res = await axios.delete(base_url + `/category/${data._id}`);
  return res.data;
});

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    user: {},
    categories: [],
    category: {
      title: "",
      _id: "",
    },
    flag: false,
  },
  reducers: {
    getCategory: (state, action) => {
      state.category.title = action.payload.val.title;
      state.category._id = action.payload.val._id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allUser.fulfilled, (state, action) => {
      state.users = action.payload.users;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(permissionUser.fulfilled, (state, action) => {
      console.log(action.payload);
      // state.user = action.payload.user;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categories = action.payload.result;
      state.flag = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.flag = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.category.title = "";
      state.flag = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.flag = false;
    });
  },
});

export const { getCategory } = adminSlice.actions;

export default adminSlice.reducer;