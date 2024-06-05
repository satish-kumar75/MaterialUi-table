import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Switcher from "./Switcher";

const UserPage = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const userData = await response.json();
      setUser(userData);
    };

    fetchUserData();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const UserDetail = ({ label, value }) => (
    <p className="flex items-center justify-evenly break-all break-words">
      <span className="font-medium block max-w-80 w-full">{label}:</span>
      <span className="block max-w-80 w-full text-left ">{value}</span>
    </p>
  );

  return (
    <div className="user-container bg-white dark:bg-[#424242] text-black dark:text-white min-h-screen transition duration-300 flex flex-col items-center">
      <div className="inner-container my-8 text-center">
        <h2 className="font-medium text-2xl mb-2 sm:text-4xl">React App</h2>
        <span className="block w-16 h-1 bg-blue-500 mx-auto mb-4"></span>
        <p className="font-medium text-base sm:text-lg">
          CRUD Operation with Material Table
        </p>
        <span className="block w-16 h-1 bg-blue-500 mx-auto mt-4"></span>
      </div>
      <div className="shadow shadow-slate-500/40 hover:shadow-slate-500/40 p-8 rounded-lg bg-gray-50 dark:bg-gray-800 w-11/12 sm:w-2/5 lg:w-1/2 xl:w-1/2 transition duration-300">
        <img
          src="https://xsgames.co/randomusers/avatar.php?g=male"
          alt="user img"
          className="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-blue-500"
        />
        <p className="text-center font-semibold text-lg mb-4">User Details</p>
        <div className="text-left space-y-2">
          <UserDetail label="ID" value={user.id} />
          <UserDetail label="Name" value={user.name} />
          <UserDetail label="Email" value={user.email} />
          <UserDetail label="Phone" value={user.phone} />
          <UserDetail label="Website" value={user.website} />
        </div>
      </div>
      <Switcher />
    </div>
  );
};

export default UserPage;
