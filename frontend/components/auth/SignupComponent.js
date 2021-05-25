import React, { useState } from "react";
import { signup } from "../../actions/auth";
// const SERVER_URL = "http://localhost:8000";

const SignupComponent = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      error: false,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ ...state, loading: true, error: false });
    const user = { name, email, password };
    // console.log(user);
    signup(user).then((data) => {
      // console.log(data);
      if (data.error) {
        setState({ ...state, error: data.error, loading: false });
      }
      setState({
        ...state,
        name: "",
        email: "",
        password: "",
        loading: false,
        message: data.message,
        showForm: false,
      });
    });
  };
  const { name, email, password, error, message, showForm } = state;
  const signupForm = () => {
    return (
      <form className="row g-3" onSubmit={handleSubmit}>
        <h2>Signup page</h2>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            defaultValue={name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            defaultValue={email}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            defaultValue={password}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    );
  };
  return <div className="container">{signupForm()}</div>;
};

export default SignupComponent;
