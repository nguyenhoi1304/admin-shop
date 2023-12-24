import styles from "./sidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const userName = localStorage.getItem("asm03-user");

  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          {userName && <span className={styles.logo}>{userName} Admin</span>}
        </Link>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>MAIN</p>
          <NavLink to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className={styles.icon} />
              <span>Dashboard</span>
            </li>
          </NavLink>
          <p className={styles.title}>USERS</p>

          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className={styles.icon} />
              <span>Users</span>
            </li>
          </Link>
          <p className={styles.title}>LISTS</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className={styles.icon} />
              <span>Products</span>
            </li>
          </Link>

          <NavLink to="/history" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className={styles.icon} />
              <span>History All</span>
            </li>
          </NavLink>

          <p className={styles.title}>NEW</p>
          <NavLink to="/add-product" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className={styles.icon} />
              <span>New Product</span>
            </li>
          </NavLink>

          <p className={styles.title}>USER</p>
          <li>
            <ExitToAppIcon className={styles.icon} />
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className={styles.colorOption}
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
