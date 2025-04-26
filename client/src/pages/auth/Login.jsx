import React from "react";
import Form from "../../components/shared/Form/Form";
import Spinner from "../../components/shared/Spinner";
import { useSelector } from "react-redux";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="max-w-full bg-white rounded-lg shadow-lg px-2">
            <Form
              formType="login"
              formTitle={
                <span className="text-red-500 text-5xl tracking-widest">
                  <span className="text-6xl">L</span>ogin
                </span>
              }
              submitBtn="Login"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
