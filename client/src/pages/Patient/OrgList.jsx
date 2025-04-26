import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import TableForPatient from "../../components/shared/tables/TableForPatient";

function OrgList() {
  const [data, setData] = useState([]);
  const getOrganisationData = async (req, res) => {
    try {
      const { data } = await API.get("/patient/organisation-list");
      setData(data.organizationData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrganisationData();
  }, []);
  return (
    <Layout>
      <TableForPatient data={data} list={"Organisation List"} />
    </Layout>
  );
}

export default OrgList;
