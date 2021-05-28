import Router from "next/router";
import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponent = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
  });

  useEffect(() => {
    if (isAuth()) {
      return Router.push("/");
    }
  }, []);

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
    setState({ ...state, loading: true });

    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setState({ ...state, error: data.error, loading: false });
      } else {
        //save user token to cookie
        // save user info to localstorage
        //authenticate user
        authenticate(data, () => {
          Router.push(`/`);
        });
      }
    });
  };

  const { email, password, error, loading, message } = state;

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <form className="row g-3" onSubmit={handleSubmit}>
        <h2 className="text-center">Signin</h2>

        <div className="col-12">
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
            Sign In
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container">
      {showLoading()}
      {showError()}
      {showMessage()}
      {signinForm()}
    </div>
  );
};

export default SigninComponent;
