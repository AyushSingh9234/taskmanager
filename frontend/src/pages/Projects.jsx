import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await axios.get(
      "http://127.0.0.1:5000/api/projects",
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );

    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Projects</h2>

        {projects.map((p) => (
          <div key={p._id}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}