import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getDashboard = async () => {
      const res = await axios.get(
        "http://127.0.0.1:5000/api/dashboard",
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      setData(res.data);
    };

    getDashboard();
  }, []);

  return (
  <>
    <Navbar />

    <div className="container">
      <h1>Dashboard</h1>

      <p>Total Tasks: {data.total}</p>
      <p>Completed: {data.completed}</p>
      <p>Pending: {data.pending}</p>
      <p>Overdue: {data.overdue}</p>
    </div>
  </>
);
}

export default Dashboard;