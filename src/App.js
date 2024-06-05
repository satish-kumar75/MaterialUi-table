import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import { Toaster } from "react-hot-toast";
import Switcher from "./components/Switcher";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setUsers(users);
    };

    fetchUsersData();
  }, []);

  return (
    <div className="container w-full min-h-screen bg-white dark:bg-[#424242] text-black dark:text-white transition duration-300">
      <h1 className="font-medium text-2xl mb-2 sm:text-4xl">React-App</h1>
      <div className="inner-container">
        <span></span>
        <p className="font-medium text-base sm:text-lg">CRUD Operation with Material Table</p>
        <span></span>
      </div>
      <UserTable users={users} setUsers={setUsers} />
      <Toaster position="top-center" />
      <Switcher />
    </div>
  );
}

export default App;
