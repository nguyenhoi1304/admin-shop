import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DataTable.css";
import { Link } from "react-router-dom";

const Datatable = (props) => {
  const data = props.data;
  const tables = [
    "Id User",
    "Name",
    "Phone",
    "Address",
    "Total",
    "Delivery",
    "Status",
    "Detail",
  ];

  return (
    <div>
      <section style={{ margin: "0 auto" }}>
        <table className="table">
          <tr>
            {tables.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
          {data?.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item._id}</td>
                <td>{item?.fullName}</td>
                <td>{item.phone}</td>
                <td style={{ padding: "0 10px" }}>{item.address}</td>
                <td>{parseInt(item.total).toLocaleString()} /VND</td>
                <td> {item.delivery}</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/history/${item._id}`}>
                    <button className="btn_view">View</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </div>
  );
};

export default Datatable;
