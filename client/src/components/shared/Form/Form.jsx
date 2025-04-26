import React, { useState } from "react";
import { InputType } from "./InputType";
import { handleLogin, handleRegister } from "../../../services/AuthServices";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const roles = [
  { id: "admin", title: "Admin" },
  { id: "organisation", title: "Organisation" },
  { id: "donar", title: "Donor" },
  { id: "hospital", title: "Hospital" },
  { id: "patient", title: "Patient" },
];

const genders = ["male", "female", "other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Form({ formType, formTitle, submitBtn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const history = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const renderFieldsInRows = (fields) => {
    const rows = [];
    for (let i = 0; i < fields.length; i += 2) {
      const firstField = fields[i];
      const secondField = fields[i + 1];
      rows.push(
        <div key={i} className="flex flex-wrap gap-4 mb-4">
          <div className={`flex-1 ${secondField ? "" : "w-full"}`}>
            {firstField}
          </div>
          {secondField && <div className="flex-1">{secondField}</div>}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="w-[40rem] px-2">
      <form
        onSubmit={(e) => {
          if (formType === "login") {
            return handleLogin(e, email, password, role, history);
          } else {
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              nidNumber,
              website,
              gender,
              bloodGroup,
              city,
              profilePicture,
              history
            );
          }
        }}
        className="shadow-x-xl px-4 py-8 rounded-lg"
      >
        <div className="text-center mb-6">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {formTitle}
          </h2>
        </div>

        <div className="my-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Select Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#B91C1C] focus:ring-[#B91C1C]"
          >
            <option value="">Select Role</option>
            {roles.map((roleOption) => (
              <option key={roleOption.id} value={roleOption.id}>
                {roleOption.title}
              </option>
            ))}
          </select>
        </div>

        {(() => {
          switch (formType) {
            case "login":
              return renderFieldsInRows([
                <InputType
                  labelText="Email"
                  labelFor="email"
                  inputType="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />,
                <InputType
                  labelText="Password"
                  labelFor="password"
                  inputType="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />,
              ]);
            case "register":
              const registerFields = [
                <InputType
                  labelText="Email"
                  labelFor="email"
                  inputType="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />,
                <InputType
                  labelText="Password"
                  labelFor="password"
                  inputType="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />,
              ];

              if (["admin", "donar", "patient"].includes(role)) {
                registerFields.push(
                  <InputType
                    labelText="Name"
                    labelFor="name"
                    inputType="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                );
              }

              if (role === "organisation") {
                registerFields.push(
                  <InputType
                    labelText="Organisation Name"
                    labelFor="organisationName"
                    inputType="text"
                    name="organisationName"
                    value={organisationName}
                    onChange={(e) => setOrganisationName(e.target.value)}
                  />
                );
              }

              if (role === "hospital") {
                registerFields.push(
                  <InputType
                    labelText="Hospital Name"
                    labelFor="hospitalName"
                    inputType="text"
                    name="hospitalName"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                );
              }

              if (role === "donar") {
                registerFields.push(
                  <InputType
                    labelText="NID Number"
                    labelFor="nidNumber"
                    inputType="text"
                    name="nidNumber"
                    value={nidNumber}
                    onChange={(e) => setNidNumber(e.target.value)}
                  />,
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#B91C1C] focus:ring-[#B91C1C]"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gen) => (
                        <option key={gen} value={gen}>
                          {gen.charAt(0).toUpperCase() + gen.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>,
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Blood Group
                    </label>
                    <select
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#B91C1C] focus:ring-[#B91C1C]"
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>,
                  <InputType
                    labelText="City"
                    labelFor="city"
                    inputType="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />,
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#B91C1C] file:text-white hover:file:bg-[#9F1717] focus:outline-none focus:ring-2 focus:ring-[#B91C1C] focus:ring-offset-2"
                    />
                  </div>
                );
              }

              if (!["donar", "patient"].includes(role)) {
                registerFields.push(
                  <InputType
                    labelText="Website"
                    labelFor="website"
                    inputType="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                );
              }

              registerFields.push(
                <InputType
                  labelText="Address"
                  labelFor="address"
                  inputType="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />,
                <InputType
                  labelText="Phone"
                  labelFor="phone"
                  inputType="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              );

              return renderFieldsInRows(registerFields);
            default:
              return null;
          }
        })()}

        <motion.button
          type="submit"
          className="w-full mt-5 bg-[#B91C1C] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
        >
          {submitBtn}
        </motion.button>

        {formType === "login" ? (
          <p className="mt-4 text-center text-sm text-gray-600">
            Not registered yet?{" "}
            <Link to="/register" className="font-medium text-black">
              Register!
            </Link>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-600">
            Already a user?{" "}
            <Link to="/login" className="font-medium text-black">
              Login!
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default Form;
