import React, { useState } from 'react';
import api from "../api";
import styles from "../Styles/Forgot.module.css";
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userid, setUserID] = useState(null);
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await api.get(`accounts/userid/`, { params: { email } });
            setUserID(response.data.id);
            setSuccess("Email Verified! You can now reset your password.");
            setStep(2);
        } catch (error) {
            setError(error.response?.data?.detail || "Failed to get email id");
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        if (!userid) {
            setError("User ID is not valid.");
            return;
        }

        try {
            const response = await api.patch(`accounts/forgotpassword/${userid}/`, { password: newPassword });
            setSuccess("Password Reset Successfully");
            setStep(1);
            setEmail("");
            setNewPassword(""); 
            navigate("/login");
        } catch (error) {
            setError(error.response?.data?.detail || "Failed to reset password");
        }
    };

    return (
        <div className={styles.forgotContainer}>
            <h2>Forgot password</h2>
            {step === 1 && (
                <form className={styles.forgotForm} onSubmit={handleReset}>
                    <input
                        type="email"
                        className={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className={styles.button} type="submit">
                        Verify Email
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handlePasswordReset}>
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button className={styles.button} type="submit">
                        Reset Password
                    </button>
                </form>
            )}

            {success && <p className={styles.success}>{success}</p>}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
