"use client";
import React, { useState } from "react";
import styles from "../Login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) return alert("Please enter your email first.");
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Password reset email sent."))
      .catch((err) => alert(err.message));
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      alert("Google sign-in failed: " + err.message);
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>Sign In</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            required
            className={styles.input}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.forgotPassword}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }}>
              Forgot Password?
            </a>
          </span>
          <input
            className={styles.loginButton}
            type="submit"
            value={loading ? "Signing in..." : "Sign In"}
          />
        </form>

        <p className={styles.redirectText}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.redirectLink}>Sign up</Link>
        </p>

        {/* Google Sign-in */}
        <div className={styles.socialAccountContainer}>
          <span className={styles.title}>Or Sign in with</span>
          <button className={styles.googleButton} onClick={handleGoogleLogin}>
  <img src="/google-logo.svg" alt="Google" className={styles.googleLogo} />
  <span>Sign in with Google</span>
</button>


        </div>
      </div>

      {/* ✅ Success Overlay */}
      {showSuccess && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "white",
            padding: "30px 40px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            textAlign: "center",
            animation: "popIn 0.3s ease-out"
          }}>
            <h2 style={{ color: "#12B1D1", fontSize: "24px", fontWeight: "bold" }}>🎉 Registration Successful!</h2>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>Redirecting...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
