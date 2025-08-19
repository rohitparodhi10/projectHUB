import React, { useEffect, useState } from 'react';
import api from "../api";
import styles from "../Styles/HubList.module.css";
import { useNavigate } from 'react-router-dom';

function HubList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get("projectsection/projectsupload/");
                setProjects(response.data); // Assuming response.data is an array of projects
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
        <button className={styles.navigateButton} onClick={()=>navigate("/")}>⬅</button>
        <div className={styles.container}>
            <h2 className={styles.title}>Projects Gallary</h2>
            {projects.length === 0 ? (
                <p className={styles.noProjects}>No projects available</p>
            ) : (
                <ul className={styles.projectList}>
                    {projects.map((project) => (
                        <li key={project.id || project.project_name} className={styles.projectItem}>
                            <h3 className={styles.projectName}>{project.project_name}</h3>
                            <p className={styles.projectDescription}>{project.project_description}</p>
                            <div className={styles.stars}>
                                {Array.from({ length: Math.min(project.project_stars, 5) }).map((_, index) => (
                                    <span key={index} className={styles.star}>★</span>
                                ))}
                            </div>
                            <p className={styles.projectEmail}><strong>Email:</strong> {project.user_email}</p>
                            <a href={project.project_link} className={styles.projectLink}>Live Link</a>
                            <a href={project.project_zip} download className={styles.downloadLink}>
                                Download Project Zip
                            </a>
                            <a className={styles.queryButton} onClick={()=>navigate("/query")}>Query</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
}

export default HubList;
