import React, { useState, useEffect } from 'react';
import api from '../api';
import styles from "../Styles/Account.module.css";
import { useNavigate } from 'react-router-dom';

function Account() {
    const navigate=useNavigate();
    const [error, setError]=useState(false);
    const [user, setUser] = useState({
        email: 'Data not available',
        userImage: null,
        loginCount: 'Data not available',
    });

    const [editMode, setEditMode] = useState(false); // Toggle for edit mode
    const [formData, setFormData] = useState({
        email: '',
        userImage: null,
    });

    useEffect(() => {
        setError(true);
        const fetchUserDetails = async () => {
            try {
                const response = await api.get("accounts/register/");
                        
                // Get the email from localStorage
                const storedEmail = localStorage.getItem("email");
        
        
                // Check if response.data is an array and try finding the current user by email
                if (Array.isArray(response.data)) {
                    const currentUser = response.data.find(user => user.email === storedEmail);
        
                    if (currentUser) {
                        
                        setUser({
                            email: currentUser.email,
                            userImage: currentUser.user_image || "No image available",
                            loginCount: currentUser.login_count || "Data not available",
                            id: currentUser.id,
                        });

                        // Pre-fill the form for editing
                        setFormData({
                            email: currentUser.email,
                            userImage: null,
                        });

                    } else{
                        setError(error);
                    }
                } else {
                    setError(error);
                }
            } catch (error) {
                setError(error);
            }
        };
        
        // Call the fetchUserDetails function
        fetchUserDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            userImage: e.target.files[0], // Store the selected file
        }));
    };

    const updateUserDetails = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('email', formData.email);
            if (formData.userImage) {
                formDataToSend.append('user_image', formData.userImage);
            }

            const userId = user.id;
            const url = `http://ec2-65-0-107-88.ap-south-1.compute.amazonaws.com/accounts/update/${userId}/`;  // Full URL

            const response = await api.patch(url, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        
            setUser((prev) => ({
                ...prev,
                email: response.data.email,
                userImage: response.data.user_image || prev.userImage,
            }));

            setEditMode(false); // Exit edit mode
        } catch (error) {
            setError(error);
        }
    };


    return (
        <>
            <h2 className={styles.heading}>Account Credentials</h2>
            <div className={styles.accountContainer}>
                <button onClick={()=>navigate("/")}>⬅</button>
                <h2><b>Hello,<br />{user.email}</b></h2>
                <div className={styles.profileDetails}>
                    {user.userImage !== 'No image available' ? (
                        <img src={user.userImage} alt="User" className={styles.userImage} />
                    ) : (
                        <span className={styles.noImageText}>{user.userImage}</span>
                    )}
                    <p><strong>Email:</strong> {user.email}</p>

                </div>

                {!editMode ? (
                    <button
                        className={styles.editButton}
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </button>
                ) : (
                    <form className={styles.editForm} onSubmit={updateUserDetails}>
                        <label>
                            <strong>Email:</strong>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            <strong>Profile Picture:</strong>
                            <input
                                type="file"
                                name="userImage"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className={styles.editActions}>
                            <button type="submit" className={styles.saveButton}>Save</button>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>    
    );
}

export default Account;
