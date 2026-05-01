import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const BASE_URL = "https://taskmanager-production-ad18.up.railway.app";

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/projects`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FETCH USERS (FIXED ROUTE)
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ RUN ALL
  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/api/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ CREATE TASK
  const createTask = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/tasks`,
        {
          title,
          project,
          assignedTo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTitle("");
      setProject("");
      setAssignedTo("");

      fetchTasks();
    } catch (error) {
      alert("Only Admin can create task");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Tasks</h2>

        {/* ADMIN CREATE FORM */}
        {user.role === "Admin" && (
          <div style={{ marginBottom: "20px" }}>
            <h3>Create Task</h3>

            <input
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <select onChange={(e) => setProject(e.target.value)}>
              <option>Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>

            <br /><br />

            <select onChange={(e) => setAssignedTo(e.target.value)}>
              <option>Select User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <br /><br />

            <button onClick={createTask}>Create Task</button>
          </div>
        )}

        <hr />

        {/* TASK LIST */}
        {tasks.map((t) => (
          <div key={t._id} style={{ marginBottom: "15px" }}>
            <h4>{t.title}</h4>
            <p>Status: {t.status}</p>

            <select
              value={t.status}
              onChange={(e) => updateStatus(t._id, e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        ))}
      </div>
    </>
  );
}