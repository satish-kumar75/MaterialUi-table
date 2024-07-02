import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import { Toaster } from "react-hot-toast";
import Switcher from "./components/Switcher";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/firebase";

function App() {
  const [users, setUsers] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US");
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pandetails"));
      const firebaseData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dob: formatDate(data.dob),
        };
      });
      setUsers(firebaseData);
    };
    fetchData();
  }, []);

  return (
    <div className="container w-full min-h-screen bg-white dark:bg-[#424242] text-black dark:text-white transition duration-300">
      <h1 className="font-medium text-2xl mb-2 sm:text-4xl font-serif tracking-widest">
        Pan Card Details
      </h1>
      <UserTable users={users} setUsers={setUsers} />
      <Toaster position="top-center" />
      <Switcher />
    </div>
  );
}

export default App;
