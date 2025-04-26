import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import TableForPatient from "../../components/shared/tables/TableForPatient";

function HospitalList() {
  const [data, setData] = useState([]);
  const getHospitalData = async (req, res) => {
    try {
      const { data } = await API.get("/patient/hospital-list");
      setData(data.hospitalData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospitalData();
  }, []);
  return (
    <>
      <Layout>
        <TableForPatient data={data} list={"Hospital List"} />
      </Layout>
    </>
  );
}

export default HospitalList;
