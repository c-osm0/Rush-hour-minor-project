
import React, { useEffect, useState } from "react"
// import "./auth.css"
import { useNavigate } from "react-router-dom"
import axios from "axios";
export default function (props) {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/')
        }

    }, [])
    // const [firstname, setFname] = useState("");
    // const [lastname, setLname] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPass] = useState("");
    // const [cpassword, setCpass] = useState("");
    // const [message, setMessage] = useState("");
    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    let handleSignup = async (e) => {
        e.preventDefault();
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const cpassword = e.target.cpassword.value;
        axios.post("https://rush-hour-minor-project-production.up.railway.app/auth/register", {
            firstname,
            lastname,
            email,
            password,
            cpassword,
        })
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })

    };
    let handleSignin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        axios.post("https://rush-hour-minor-project-production.up.railway.app/auth/login", {
            email,
            password,
        })
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    };
    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSignin}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                name="email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                name="password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-5">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSignup}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            // value={firstname}
                            name="firstname"
                            className="form-control mt-1"
                            placeholder=" Saubhagya"
                        // onChange={(e) => setFname(e.target.value)}

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            // value={lastname}
                            className="form-control mt-1"
                            placeholder=" Kumar"
                            name="lastname"
                        // onChange={(e) => setLname(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            // value={email}
                            className="form-control mt-1"
                            name="email"
                            placeholder="saubhagya@gmail.com"
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            // value={password}
                            className="form-control mt-1"
                            placeholder="pass1234"
                            name="password"
                        // onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm-password</label>
                        <input
                            type="password"
                            // value={cpassword}
                            className="form-control mt-1"
                            placeholder="pass1234"
                            name="cpassword"
                        // onChange={(e) => setCpass(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <button type="submit" className="btn btn-primary">
                            Create account
                        </button>
                    </div>
                    {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}

                </div>
            </form>
        </div>
    )
}