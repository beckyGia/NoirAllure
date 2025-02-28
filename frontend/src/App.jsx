import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import ProductScreen from "./screens/ProductScreen";
import NewProductScreen from "./screens/NewProductsScreen";
import SaleProductScreen from "./screens/SaleProductScreen";
import BrandsScreen from "./screens/BrandsScreen";
import ShopBrandsScreen from "./screens/ShopBrandsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import NotAuthScreen from "./screens/NotAuthScreen";
import store from "./store";
import SearchScreen from "./screens/SearchScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

const App = () => {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/shop/:linkName" element={<ShopScreen />} />
          <Route path="/new" element={<NewProductScreen />} />
          <Route path="/new/:linkName" element={<NewProductScreen />} />
          <Route path="/sale" element={<SaleProductScreen />} />
          <Route path="/sale/:linkName" element={<SaleProductScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/brands" element={<BrandsScreen />} />
          <Route path="/loves" element={<FavoritesScreen />} />
          <Route path="/brands/:brandName" element={<ShopBrandsScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Route>
      </>
    )
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
