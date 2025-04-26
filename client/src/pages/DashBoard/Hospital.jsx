import React, { useEffect, useState } from "react";
import API from "../../services/API";
import Layout from "../../components/shared/Layout/Layout";
import HospitalTable from "../../components/shared/tables/HospitalTable";

const Hospital = () => {
  const [organisations, setOrganisations] = useState([]);

  const fetchOrganisations = async () => {
    try {
      const response = await API.get("/inventory/get-all-organisations");
      if (response.data?.success) {
        setOrganisations(response.data.organisations);
      }
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    }
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <HospitalTable
          data={organisations}
          heading="All Organization Records"
        />
      </div>
    </Layout>
  );
};

export default Hospital;
