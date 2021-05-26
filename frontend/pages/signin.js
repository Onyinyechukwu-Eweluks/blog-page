import Link from "next/link";
import SigninComponent from "../components/auth/SigninComponent";

const Signup = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <SigninComponent />
      </div>
    </div>
  );
};

export default Signup;
