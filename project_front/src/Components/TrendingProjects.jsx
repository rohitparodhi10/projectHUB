import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../Styles/Trending.module.css';

function TrendingProjects() {
    const [trendingProjects, setTrendingProjects] = useState([]);
    const [mostVisitedProjects, setMostVisitedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get the current date in YYYY-MM-DD format
        const today = new Date();
        const last24Hours = new Date(today);
        last24Hours.setDate(today.getDate() - 1);  // Set date to 24 hours ago

        const formattedDate = last24Hours.toISOString().split('T')[0];  // Convert to 'YYYY-MM-DD'

        // Fetch Trending Projects (based on stars and updated within last 24 hours)
        axios
            .get(`https://api.github.com/search/repositories?q=created:>=${formattedDate}&sort=stars&order=desc`)
            .then(response => {
                setTrendingProjects(response.data.items.slice(0,4));
            })
            .catch(err => {
                setError('Error fetching trending projects');
            });

        // Fetch Most Visited Projects (based on forks)
        axios
            .get(`https://api.github.com/search/repositories?q=forks:>1&sort=forks&order=desc`)
            .then(response => {
                setMostVisitedProjects(response.data.items.slice(0,4));
            })
            .catch(err => {
                setError('Error fetching most visited projects');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className={styles.visitedContainer}>
                <h3 className={styles.sub}>Most Visited Projects</h3>
                {mostVisitedProjects.length > 0 ? (
                    <div className={styles.projectList}>
                        {mostVisitedProjects.map((project) => (
                            <div key={project.id} className={styles.projectItem}>
                                <div className={styles.projectName}>
                                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                                        {project.name}
                                    </a>
                                </div>
                                {project.owner && project.owner.avatar_url && (
                                    <img 
                                        src={project.owner.avatar_url} 
                                        alt={project.owner.login} 
                                        className={styles.projectImage} 
                                    />
                                )}
                                <p><strong>Forks:</strong> {project.forks_count}</p>
                                <p><strong>Watchers:</strong> {project.watchers_count}</p>
                                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                                    View Project
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No most visited projects found.</p>
                )}
            </div>

            <div className={styles.trendingContainer}>
                <h3 className={styles.sub}>Trending Projects (Last 24 Hours)</h3>
                {trendingProjects.length > 0 ? (
                    <div className={styles.projectList}>
                        {trendingProjects.map((project) => (
                            <div key={project.id} className={styles.projectItem}>
                                <div className={styles.projectName}>
                                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                                        {project.name}
                                    </a>
                                </div>
                                {project.owner && project.owner.avatar_url && (
                                    <img 
                                        src={project.owner.avatar_url} 
                                        alt={project.owner.login} 
                                        className={styles.projectImage} 
                                    />
                                )}
                                <p><strong>Stars:</strong> {project.stargazers_count}</p>
                                <a href={project.html_url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                                    View Project
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No trending projects found in the last 24 hours.</p>
                )}
            </div>
        </div>
    );
}

export default TrendingProjects;
