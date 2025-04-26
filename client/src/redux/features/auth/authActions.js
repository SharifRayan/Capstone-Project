import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../../services/API";

// Login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password, role, history }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      // Store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);

        // Redirect based on user role
        if (role === "admin") {
          history("/admin");
        } else if (role === "organisation") {
          history("/organisation");
        } else if (role === "donar") {
          history("/donar");
        } else if (role === "hospital") {
          history("/hospital");
        } else if (role === "patient") {
          history("/patient");
        } else {
          history("/home");
        }
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        alert("An error occurred during login");
        return rejectWithValue(error.message);
      }
    }
  }
);

// Register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      formData, // Expecting FormData for registration, including profile picture
      history,
    },
    { rejectWithValue }
  ) => {
    try {
      // Make the API call using FormData
      const { data } = await API.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success(data.message);
        history("/login"); // Redirect to login upon successful registration
        return data;
      } else {
        console.error("Unexpected response data:", data);
        return rejectWithValue("Unexpected response data");
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        alert("Error occurred while registering");
        return rejectWithValue(error.message);
      }
    }
  }
);

// Get current user
export const getcurrentUser = createAsyncThunk(
  "auth/getcurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/currentuser");
      if (res?.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
