import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Properties from "./pages/Properties/Properties";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Footer from "./components/Footer/Footer";
import AdminLayout from "./AdminLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./Slice/userSlice";
import SkeletonBody from "./components/SkeletonBody/SkeletonBody.jsx";



import PropertyPage from "./admin/pages/properties/PropertyPage.jsx";
import CreatePropertyPage from "./admin/pages/properties/CreatePropertyPage.jsx";

import CreateCategory from "./admin/pages/categories/createCategory/CreateCategory";
import AllCategories from "./admin/pages/categories/AllCategories";
import EditCategory from "./admin/pages/categories/editCategory/EditCategory";

const App = () => {
  const dispatch = useDispatch();
  const { userData, userStatus } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  let isAuthenticated = true;

  if (userStatus === "pre" || userStatus === "loading") {
    return <SkeletonBody />;
  } else if (userStatus === "idle" && userData) {
    isAuthenticated = true;
  }

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div style={{ marginTop: "0px" }}>
                <Routes>
                  <Route path="/" element={<Properties />} />
                  <Route path="/all" element={<Properties />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* Secured Admin Routes (without Navbar & Footer) */}
        {/* {isAuthenticated && (
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="category/all" element={<AllCategories />} />
            <Route path="category/create" element={<CreateCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="subcategories" element={<SubcategoryPage />} />
            <Route path="properties" element={<PropertyPage />} />
            <Route path="properties/create" element={<CreatePropertyPage />} />
          </Route>
        )} */}

        {/* From other file */}

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="category/all" element={<AllCategories />} />
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="category/edit/:id" element={<EditCategory />} />
          {/* <Route path="subcategories" element={<SubcategoryPage />} /> */}
          <Route path="properties" element={<PropertyPage />} />
          <Route path="properties/create" element={<CreatePropertyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
