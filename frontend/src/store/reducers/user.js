import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin as reqFetchLogin } from "../../lib/apis/auth";
import { fetchGetProfileImage as reqFetchProfileImage } from "../../lib/apis/profile";
const initialState = {
  isLoggedIn: false,
  userInfo: null,
  loading: "idle",
};

const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (data, thunkAPI) => {
    try {
      const response = await reqFetchLogin(data);
      return response; //액션의 payload;
    } catch (error) {
      alert("잘못된 로그인 정보입니다.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (data, thunkAPI) => {
    try {
      const response = await reqFetchProfileImage(data); //data = userId
      console.log("fffffff");
      console.log(response);
      return response;
    } catch (error) {
      alert("프로필 이미지 불러오기 실패");
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log("fulfilled");
      console.log(action);

      state.loading = "fulfilled";
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchLogin.pending, (state, action) => {
      console.log("pending");

      state.loading = "pending";
      state.userInfo = null;
      state.isLoggedIn = false;

      console.log(action);
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      console.log("rejected");

      state.loading = "rejected";
      state.userInfo = null;
      state.isLoggedIn = false;

      console.log(action);
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      console.log("profile-fulfilled");

      state.loading = "fulfilled";
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export { fetchLogin, fetchProfile };
export const { logout } = userSlice.actions;
export default userSlice.reducer;
