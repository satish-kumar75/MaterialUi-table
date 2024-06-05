import React from "react";
import { Link } from "react-router-dom";

function UserTableActions({ rowData }) {
  return (
    <Link to={`/user/${rowData.id}`}>
      <button className="border-none outline-none text-white bg-zinc-700 dark:bg-white dark:text-black hover:dark:bg-slate-300 hover:bg-zinc-800 px-3 py-1 rounded-lg transition duration-300">
        View
      </button>
    </Link>
  );
}

export default UserTableActions;
