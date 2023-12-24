import styles from "./navbar.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import img from "../../img/banner.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const nameUser = localStorage.getItem("asm03-user");

  const handleLogout = () => {
    localStorage.removeItem("asm03-user");
    localStorage.removeItem("token");
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <LanguageOutlinedIcon className={styles.icon} />
            English
          </div>
          <div className={styles.item}>
            <DarkModeOutlinedIcon
              className={styles.icon}
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className={styles.item}>
            <FullscreenExitOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.item}>
            <NotificationsNoneOutlinedIcon className={styles.icon} />
            <div className="counter">1</div>
          </div>
          <div className={styles.item}>
            <ChatBubbleOutlineOutlinedIcon className={styles.icon} />
            <div className="counter">2</div>
          </div>
          <div className={styles.item}>
            <ListOutlinedIcon className={styles.icon} />
          </div>
          <div className={styles.item}>
            <img src={img} alt="" className={styles.avatar} />
          </div>
          {nameUser && (
            <div className={styles.item}>
              {nameUser}
              <NavLink to="/">
                <button onClick={handleLogout} className={styles.btn_logout}>
                  LogOut
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
