import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:flex h-screen items-center justify-center ">
          <div className="rounded-xl shadow-xl bg-gray-50 my-auto items-center">
            <div className="flex justify-center"></div>
            <Form
              formType={"register"}
              formTitle={
                <span className="text-red-500 text-5xl tracking-widest">
                  <span className="text-6xl">R</span>egister
                </span>
              }
              submitBtn={"Register"}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
