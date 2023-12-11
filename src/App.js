import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/AuthContext";
import HistoryAll from "./pages/historys/HistoryAll";
import DetailHistory from "./components/DetailHistory/DetailHistory";
import Products from "./Products/Products";
import EditProduct from "./components/editProduct/EditProduct";
import Usersall from "./pages/userall/Usersall";
import NewProduct from "./components/New/NewProduct";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products">
                <Route index element={<Products />} />
              </Route>
              <Route path="/products/edit/:id">
                <Route index element={<EditProduct />} />
              </Route>
              <Route path="/users">
                <Route index element={<Usersall />} />
              </Route>
              <Route path="/history">
                <Route index element={<HistoryAll />} />
              </Route>
              <Route path="/history/:idHistory">
                <Route index element={<DetailHistory />} />
              </Route>
              <Route path="/add-product">
                <Route index element={<NewProduct />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
