'use client';
import React, { useState } from "react";
import styles from "../register.module.css";
import Link from "next/link";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, uid: user.uid, name }),
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, uid: user.uid, name: user.displayName || "" }),
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Google signup failed. " + error.message);
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>Sign Up</div>
        <form className={styles.form} onSubmit={handleRegister}>
          <input required className={styles.input} type="text" name="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input required className={styles.input} type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required className={styles.input} type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input required className={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <input className={styles.registerButton} type="submit" value={loading ? "Signing up..." : "Sign Up"} />
        </form>

        <p className={styles.redirectText}>
          Already have an account? <Link href="/login" className={styles.redirectLink}>Sign in</Link>
        </p>

{/* Google Sign-in */}
        <div className={styles.socialAccountContainer}>
          <span className={styles.title}>Or Sign in with</span>
          <button className={styles.googleButton} onClick={handleGoogleSignup}>
  <img src="/google-logo.svg" alt="Google" className={styles.googleLogo} />
  <span>Sign in with Google</span>
</button>
        </div>
      </div>

      {showSuccess && (
 <div style={{
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "#000000cc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  flexDirection: "column",
  color: "#fff",
  fontSize: "2rem",
  fontWeight: "bold",
  animation: "fadeIn 0.4s ease"
}}>
  ✅ Login Successful
  <p style={{ fontSize: "1rem", marginTop: "10px" }}>Redirecting to homepage...</p>
</div>
)}
</div>
  );
};

export default Register;
