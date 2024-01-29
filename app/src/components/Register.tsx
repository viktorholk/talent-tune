import React, { useEffect, useRef, useState } from 'react'
import {redirect } from 'react-router-dom';

const register = () => {
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const ErrRef = useRef() as React.MutableRefObject<HTMLParagraphElement>;
    
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setError("");
    }, [name, email, password])

    const handlesubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3001/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password }),
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
                return;
            }
            setSuccess("true");
        } catch (err) {
            setError((err as Error).message);
        }
    }

    return (
        <>
            {success == "true" ?
                (redirect("/home"))
                : (
                    
                    <section>
                        <p ref={ErrRef} className={error ? "errmsg" : "offscreen"}>{error}</p>
                        <h1>Register</h1>
                        <form onSubmit={handlesubmit}>
                            <label htmlFor="name">name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setname(e.target.value)} />
                            <label htmlFor="Email">Email</label>
                            <input type="text" id="Email" ref={userRef} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Login</button>
                        </form>
                    </section>
                )}
                <a href="/">Login</a>
        </>
    )
}

export default register
