import React, { useState } from 'react';
import api from "../api";
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/ProjectUpload.module.css";
function ProjectUpload() {
    const [project_name, setProjectName]=useState("");
    const [project_description, setProjectDescription]=useState("");
    const [project_zip, setProjectUpload]=useState(null);
    const [project_stars, setProjectStars]=useState("");
    const [project_link, setProjectLink]=useState("");
    const [loading, setLoading]=useState(false);
    const [uploadSuccess, setUploadSuccess]=useState(false);
    const navigate=useNavigate();

    const handleProjectChange=(e)=>{
        setProjectUpload(e.target.files[0]);
    }

   
    const handleProjectUpload=async (e)=>{
        e.preventDefault();
        setLoading(true);
        setUploadSuccess(false);
        
        const formData=new FormData();
        formData.append("project_name", project_name);
        formData.append("project_description", project_description);
        formData.append("project_stars", project_stars);
        formData.append("project_link", project_link);
        if(project_zip){
            formData.append("project_zip", project_zip);
        }

        try{
            const response=await api.post("projectsection/projectsupload/", formData, 
                {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    }
                }
            );
            navigate("/successupload")
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }

    }
  return (
    <div className={styles.projectUploadContainer}>
        <button className={styles.navigateButton} onClick={()=>navigate('/')}>⬅</button>
        <h2 className={styles.heading}>Add a New Project</h2>
        <form onSubmit={handleProjectUpload} className={styles.formProjectU}>
            <input
                type="text"
                placeholder="Project Name"
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className={styles.input}
            />

            <input
                type="text"
                placeholder="Project Description"
                value={project_description}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                className={styles.input}
            />

            <input
                type="text"
                placeholder="Project Stars"
                value={project_stars}
                onChange={(e) => setProjectStars(e.target.value)}
                required
                className={styles.input}
            />

            <input 
                type="url"
                placeholder='Project Link'
                value={project_link}
                onChange={(e)=>setProjectLink(e.target.value)}
                required
                className={styles.input}
            />
            <input
                type="file"
                placeholder="Project Upload"
                accept="file/*"
                onChange={handleProjectChange}
                className={styles.fileInput}
            />

            <button type="submit" disabled={loading} className={styles.button}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </form>
    </div>

  )
}

export default ProjectUpload;
