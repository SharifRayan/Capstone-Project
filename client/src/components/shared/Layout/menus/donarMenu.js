import { DonarIcon } from "../../../shared/Icons";
import { FaUserInjured } from "react-icons/fa";
export const donarMenue = [
  {
    name: "Patient List",
    href: "/patient-list",
    icon: FaUserInjured,
    current: true,
  },
  { name: "Donation", href: "/donation", icon: DonarIcon, current: false },
];
