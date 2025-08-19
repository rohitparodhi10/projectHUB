import React, { useEffect, useState } from 'react';
import api from "../api";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styles from "../Styles/Projects.module.css";
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function Projects() {
    const [searchTerm, setSearchTerm] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const navigate = useNavigate();

    useEffect(() => {
        if (transcript) {
            setSearchTerm(transcript);
            if (transcript.trim()) {
                handleVoiceSearch(transcript);
            }
        }
    }, [transcript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <p>Your browser does not support voice commands.</p>;
    }

    const fetchProjects = async (searchTerm) => {
       
        if (!searchTerm.trim()) {
            setError("Please enter a search term");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await api.get(`projectsection/github/search/?query=${searchTerm}`);
            setProjects(response.data.items);
        } catch (err) {
            if (err.response) {
                setError(`Failed to fetch projects: ${err.response.data.message}`);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleManualSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        fetchProjects(searchTerm);
    };

    const handleVoiceSearch = (term) => {
        fetchProjects(term);
    };

    const handleReload=()=>{
        setSearchTerm("");
        fetchProjects("",1);
    }

    const backHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
    <div className={styles.boxWithShadow}>
        {/* Left Container */}
        <div className={styles.leftContainer}>
            <h2 className={styles.heading}>
                Access any project through voice commands from the largest hubs on the internet!
            </h2>

            <div className={styles.voiceSearchContainer}>
                <button onClick={SpeechRecognition.startListening} className={styles.button}>
                    {listening ? "Listening..." : "Start Voice Search"}
                </button>
                <button onClick={handleReload} className={styles.button}>
                    Reset
                </button>
            </div>

            {/* <div className={styles.transcriptContainer}>
                <p>{transcript}</p>
            </div> */}

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search projects manually..."
                    value={searchTerm}
                    onChange={handleManualSearch}
                    className={styles.searchInput}
                />
                <button onClick={handleSearchSubmit} className={styles.button}>
                    Search
                </button>
            </div>
        </div>

        {/* Right Container */}
        <div className={styles.rightContainer}>
            <h2>Explore our hub of projects from talented developers!</h2>
            <button className={styles.headingButton} onClick={() => navigate("/projectuploadlist")}>
                Explore Our Hub
            </button>
        </div>
    </div>

    <div className={styles.controlsBelowBox}>
        <button onClick={backHome} className={styles.button}>
            Back Home
        </button>
    </div>
        <br />
    {loading && <Loading/>}
    {error && <p className={styles.error}>{error}</p>}

    {projects.length > 0 && (
        <div className={styles.projectListContainer}>
            {projects.map((project) => (
                <div key={project.id} className={styles.projectItem}>
                    <div className={styles.projectCard}>
                        {project.owner && project.owner.avatar_url && (
                            <img
                                src={project.owner.avatar_url}
                                alt={project.full_name}
                                className={styles.projectImage}
                            />
                        )}
                        <div className={styles.projectDetails}>
                            <h3 className={styles.projectTitle}>
                                <a
                                    href={project.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.projectLink}
                                >
                                    {project.full_name}
                                </a>
                            </h3>
                            <p className={styles.projectDescription}>
                                {project.description || "No description available"}
                            </p>
                            <div className={styles.projectStars}>
                                <span className={styles.starsIcon}>⭐</span> {project.stargazers_count} Stars
                            </div>
                            <div className={styles.projectLanguage}>
                                {project.language && (
                                    <span className={styles.languageIcon}>
                                        <strong>Language:</strong> {project.language}
                                    </span>
                                )}
                            </div>
                            <a
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.projectHostedLink}
                            >
                                View Project
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>


    );
}

export default Projects;
