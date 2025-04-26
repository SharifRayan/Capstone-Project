import { DonarIcon, HospitalIcon, NgoIcon } from "../../../shared/Icons";
import { FaRegComments } from "react-icons/fa";

export const patientMenue = [
  {
    name: "Donar List",
    href: "/patient-donar-list",
    icon: DonarIcon,
    current: true,
  },
  {
    name: "Hospital List",
    href: "/patient-hospital-list",
    icon: HospitalIcon,
    current: false,
  },
  {
    name: "Organisation List",
    href: "/patient-organisation-list",
    icon: NgoIcon,
    current: false,
  },
  {
    name: "Feedback",
    href: "/patient-feedback",
    icon: FaRegComments,
    current: false,
  },
];
