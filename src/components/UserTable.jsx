import React, { useContext } from "react";
import MaterialTable from "material-table";
import toast from "react-hot-toast";
import ThemeContext from "../context/ThemeContext";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

function UserTable({ users, setUsers }) {
  const { currentTheme } = useContext(ThemeContext);
  const theme = createMuiTheme({
    palette: {
      type: currentTheme === "light" ? "light" : "dark",
    },
  });

  theme.typography.h6 = {
    fontSize: "1.1rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
  };

  const columns = [
    { title: "ID", field: "customId", editable: "never" },
    { title: "Name", field: "name" },
    { title: "Mobile", field: "mobile" },
    { title: "Coupon", field: "coupon" },
    { title: "DOB", field: "dob", type: "date" },
  ];

  const getNextId = () => {
    if (users.length === 0) return 1;
    const ids = users.map((user) => user.customId);
    return Math.max(...ids) + 1;
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Users Informations"
          data={users}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise(async (resolve, reject) => {
                try {
                  const customId = getNextId();
                  const newUser = { ...newRow, customId };
                  const docRef = await addDoc(
                    collection(db, "pandetails"),
                    newUser
                  );
                  setUsers([...users, { id: docRef.id, ...newUser }]);
                  toast.success("Row added successfully");
                  resolve();
                } catch (error) {
                  toast.error("Error adding row");
                  reject();
                }
              }),
            onRowDelete: (selectedRow) =>
              new Promise(async (resolve, reject) => {
                try {
                  await deleteDoc(doc(db, "pandetails", selectedRow.id));
                  const updatedRows = users.filter(
                    (user) => user.id !== selectedRow.id
                  );
                  setUsers(updatedRows);
                  toast.success("Row deleted successfully");
                  resolve();
                } catch (error) {
                  toast.error("Error deleting row");
                  reject();
                }
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise(async (resolve, reject) => {
                try {
                  const docRef = doc(db, "pandetails", oldRow.id);
                  await updateDoc(docRef, updatedRow);
                  const updatedRows = users.map((user) =>
                    user.id === oldRow.id ? updatedRow : user
                  );
                  setUsers(updatedRows);
                  toast.success("Row updated successfully");
                  resolve();
                } catch (error) {
                  toast.error("Error updating row");
                  reject();
                }
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default UserTable;
