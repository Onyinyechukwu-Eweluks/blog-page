import Link from "next/link";
import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <SignupComponent />
      </div>
    </div>
  );
};

export default Signup;
