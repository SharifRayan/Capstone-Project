import React, { useEffect, useState } from "react";

import { OrganistionMenue } from "./menus/organisationMenu";
import { hospitalMenue } from "./menus/hospitalMenu";
import { donarMenue } from "./menus/donarMenu";
import { adminMenue } from "./menus/adminMenu";
import { patientMenue } from "./menus/patientMenu";
import { useSelector } from "react-redux";
import { printMenu } from "./menus/PrintMenu";

function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const [navigation, setnavigation] = useState([]);

  useEffect(() => {
    // console.log(user?.role);
    if (user?.role === "organisation") {
      setnavigation(OrganistionMenue);
    } else if (user?.role === "hospital") {
      setnavigation(hospitalMenue);
    } else if (user?.role === "donar") {
      setnavigation(donarMenue);
    } else if (user?.role === "admin") {
      setnavigation(adminMenue);
    } else if (user?.role === "patient") {
      setnavigation(patientMenue);
    }
  }, [user?.role]);

  return (
    <>
      <div
        className="md:flex md:w-65 md:flex-col md:fixed md:inset-y-0"
        style={{ marginTop: "85px" }}
      >
        <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto h-full">
          {/* Centered top section */}
          <div className="flex justify-center items-center mb-4">
            <div className="px-4"></div>
          </div>
          <div className="flex-grow mt-5 flex flex-col">
            <nav className="flex-1 px-4 pb-4 space-y-2 ">
              {printMenu(navigation)}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
