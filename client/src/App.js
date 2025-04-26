import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/shared/Routes/ProtectedRoute";
import Organisation from "./pages/DashBoard/Organistion";
import { Donar } from "./pages/DashBoard/Donar";
import Hospital from "./pages/DashBoard/Hospital";
import Consumer from "./pages/DashBoard/Consumer";
import Donation from "./pages/Donation";
import AdminHome from "./pages/Admin/AdminHome";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import PostList from "./pages/Admin/PostList";
import PatientHome from "./pages/Patient/PatientHome";
import PatientDonarList from "./pages/Patient/DonarList";
import PatientHospitalList from "./pages/Patient/HospitalList";
import PatientList from "./pages/Patient/PatientList";
import PatientOrgList from "./pages/Patient/OrgList";
import HomePage from "./pages/HomePage";
import Analytics from "./pages/Analytics";
import Inventory from "./pages/DashBoard/Inventory";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import FeedbackForm from "./components/Feedback";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/inventory"
          element={<ProtectedRoute>{<Inventory />}</ProtectedRoute>}
        />
        <Route
          path="/organisation"
          element={<ProtectedRoute>{<Organisation />}</ProtectedRoute>}
        />
        <Route
          path="/donar"
          element={<ProtectedRoute>{<Donar />}</ProtectedRoute>}
        />
        <Route
          path="/hospital"
          element={<ProtectedRoute>{<Hospital />}</ProtectedRoute>}
        />
        <Route
          path="/consumer"
          element={<ProtectedRoute>{<Consumer />}</ProtectedRoute>}
        />
        <Route
          path="/donation"
          element={<ProtectedRoute>{<Donation />}</ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute>{<AdminHome />}</ProtectedRoute>}
        />
        <Route
          path="/donar-list"
          element={<ProtectedRoute>{<DonarList />}</ProtectedRoute>}
        />
        <Route
          path="/hospital-list"
          element={<ProtectedRoute>{<HospitalList />}</ProtectedRoute>}
        />
        <Route
          path="/organisation-list"
          element={<ProtectedRoute>{<OrgList />}</ProtectedRoute>}
        />
        <Route
          path="/post-list"
          element={<ProtectedRoute>{<PostList />}</ProtectedRoute>}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute>{<Analytics />}</ProtectedRoute>}
        />
        <Route
          path="/patient"
          element={<ProtectedRoute>{<PatientHome />}</ProtectedRoute>}
        />
        <Route
          path="/patient-donar-list"
          element={<ProtectedRoute>{<PatientDonarList />}</ProtectedRoute>}
        />
        <Route
          path="/patient-hospital-list"
          element={<ProtectedRoute>{<PatientHospitalList />}</ProtectedRoute>}
        />
        <Route
          path="/patient-organisation-list"
          element={<ProtectedRoute>{<PatientOrgList />}</ProtectedRoute>}
        />
        <Route
          path="/patient-list"
          element={<ProtectedRoute>{<PatientList />}</ProtectedRoute>}
        />
        <Route
          path="/patient-feedback"
          element={<ProtectedRoute>{<FeedbackForm />}</ProtectedRoute>}
        />
      </Routes>
    </>
  );
}

export default App;
