import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{
  padding: "15px",
  background: "#020617",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}}>
      <h3>TaskManager</h3>

      <div>
        <Link to="/dashboard" style={{ margin: "10px", color: "white" }}>
          Dashboard
        </Link>

        <Link to="/projects" style={{ margin: "10px", color: "white" }}>
          Projects
        </Link>

        <Link to="/tasks" style={{ margin: "10px", color: "white" }}>
        Tasks
</Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}