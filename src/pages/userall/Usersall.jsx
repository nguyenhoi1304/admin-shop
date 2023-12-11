import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Usersall.scss";
import { NavLink } from "react-router-dom";
import UserAPI from "../../API/UserAPI";
import Sidebar from "../../components/sidebar/Sidebar";
const Usersall = () => {
  const tables = ["Id", "Name", "Password", "Email", "role"];
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApiUsers = async () => {
      const users = await UserAPI.getAllData();
      setData(users);
    };
    fetchApiUsers();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <section style={{ marginTop: "50px" }}>
          <hr />
          <div className="title-hotel">
            <h1>User List</h1>
          </div>
          <table className="table">
            <tr>
              {tables.map((item) => (
                <th>{item}</th>
              ))}
            </tr>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.fullName}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </table>
        </section>
      </div>
    </div>
  );
};

export default Usersall;
