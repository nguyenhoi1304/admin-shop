import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import { useEffect, useState } from "react";
import UserAPI from "../../API/UserAPI";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await UserAPI.getAllData();
      setUserList(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchLogin = async () => {
      const body = JSON.stringify({
        email,
        password,
      });
      const response = await UserAPI.login(body);
      console.log(response);
      localStorage.setItem("token", response.token);

      // setIsLogin(response.isLogin);
      if (typeof response !== undefined) setUserList(response.user);
      if (response.isLogin === true) {
        console.log(response.user.email);
        localStorage.setItem("asm03-user", response.user.fullName);
        navigate("/home");
        window.location.reload();
      } else {
        if (response.invalidPassword === true)
          alert("Email or password wrong!");
        else alert(response.message);
      }
    };

    fetchLogin();
  };

  return (
    <>
      {loading ? (
        <h1 className={styles.message_loading}>Please loading wait!</h1>
      ) : (
        <div className={styles.login}>
          <div className={styles.lContainer}>
            <h1 style={{ textAlign: "center", color: "white" }}>Login</h1>
            <input
              type="text"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.lInput}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.lInput}
            />
            <button onClick={handleSubmit} className={styles.lButton}>
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
