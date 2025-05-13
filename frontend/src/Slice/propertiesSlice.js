import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../API/Api.js";

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    categories: [],
    subcategories: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
    },
    filters: {
      type: "buy",
      location: "",
      propertyType: "all",
      beds: "1",
      baths: "1",
    },
    loading: false,
  },
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setProperties,
  setCategories,
  setSubcategories,
  setPagination,
  setFilters,
  setLoading,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;

// Thunks
export function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch) {
    try {
      const { data } = await axios.get(`${BASEURL}v1/category`);
      dispatch(setCategories(data.categories));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
}

export function fetchSubcategories() {
  return async function fetchSubcategoriesThunk(dispatch) {
    try {
      const { data } = await axios.get(`${BASEURL}v1/subcategory`);
      dispatch(setSubcategories(data.subcategories));
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };
}

export function fetchProperties(page = 1, filters, limit = 2) {
  return async function fetchPropertiesThunk(dispatch) {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`${BASEURL}v1/property`, {
        params: {
          ...filters,
          page: page,
          limit: limit,
        },
      });
      dispatch(setProperties(data.properties));
      dispatch(setPagination({
        currentPage: data.pagination.currentPage,
        totalPages: data.pagination.totalPages,
        totalItems: data.pagination.totalItems,
      }));
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}