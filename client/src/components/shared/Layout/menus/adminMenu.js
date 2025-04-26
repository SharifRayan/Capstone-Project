import {
  FaHospital,
  FaUserAlt,
  FaClipboardList,
  FaRegListAlt,
} from "react-icons/fa";

export const adminMenue = [
  {
    name: "Donar List",
    href: "/donar-list",
    current: true,
    icon: FaClipboardList,
  },
  {
    name: "Hospital List",
    href: "/hospital-list",
    current: false,
    icon: FaHospital,
  },
  {
    name: "Organisation List",
    href: "/organisation-list",
    current: false,
    icon: FaUserAlt,
  },
  {
    name: "Post List",
    href: "/post-list",
    icon: FaRegListAlt,
    current: false,
  },
];
