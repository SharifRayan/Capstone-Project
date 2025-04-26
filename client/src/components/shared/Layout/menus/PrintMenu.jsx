import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function printMenu(navigation) {
  return (
    <>
      {navigation.map((item) => (
        <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
          <Link
            onClick={() => {
              navigation.forEach((i) => {
                i.current = false;
              });
              item.current = true;
            }}
            to={item.href}
            className={classNames(
              item.current
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "group rounded-md py-2 px-2 flex items-center text-lg mx-2 my-2 font-medium"
            )}
          >
            <item.icon
              className={classNames(
                "text-black", // Set icon color to black
                "mr-3 flex-shrink-0 h-4 w-4" // Adjust size to be smaller
              )}
              aria-hidden="true"
            />
            <h2 className="ml-4">{item.name}</h2>
          </Link>
        </motion.div>
      ))}
    </>
  );
}

export { printMenu };
