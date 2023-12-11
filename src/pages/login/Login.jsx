import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useEffect, useState } from "react";
import UserAPI from "../../API/UserAPI";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();
      setUserList(response);
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
    <div className="login">
      <div className="lContainer">
        <h1 style={{ textAlign: "center", color: "white" }}>Login</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={(e) => setEmail(e.target.value)}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="lInput"
        />
        <button onClick={handleSubmit} className="lButton">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
