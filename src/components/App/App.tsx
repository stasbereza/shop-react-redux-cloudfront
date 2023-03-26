import React, { useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Routes, Route } from "react-router-dom";
import MainLayout from "~/components/MainLayout/MainLayout";
import PageProductForm from "~/components/pages/PageProductForm/PageProductForm";
import PageOrders from "~/components/pages/PageOrders/PageOrders";
import PageOrder from "~/components/pages/PageOrder/PageOrder";
import PageProductImport from "~/components/pages/admin/PageProductImport/PageProductImport";
import PageCart from "~/components/pages/PageCart/PageCart";
import PageProducts from "~/components/pages/PageProducts/PageProducts";
import { Typography, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: AxiosError | unknown) => {
      const errorMessage =
        error instanceof AxiosError ? error.message : JSON.stringify(error);
      setOpenSnackbar(true);
      setErrorMessage(errorMessage);
    };

    const interceptor = axios.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const handleClose = (): void => {
    setOpenSnackbar(false);
  };

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<PageProducts />} />
        <Route path="cart" element={<PageCart />} />
        <Route path="admin/orders">
          <Route index element={<PageOrders />} />
          <Route path=":id" element={<PageOrder />} />
        </Route>
        <Route path="admin/products" element={<PageProductImport />} />
        <Route path="admin/product-form">
          <Route index element={<PageProductForm />} />
          <Route path=":id" element={<PageProductForm />} />
        </Route>
        <Route
          path="*"
          element={<Typography variant="h1">Not found</Typography>}
        />
      </Routes>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}

export default App;
