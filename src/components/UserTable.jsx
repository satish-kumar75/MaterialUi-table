import React, { useContext } from "react";
import MaterialTable from "material-table";
import toast from "react-hot-toast";
import UserTableActions from "./UserTableActions";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateWebsite,
} from "./Validation";
import ThemeContext from "../context/ThemeContext";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

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
    {
      title: "ID",
      field: "id",
      editable: "never",
    },
    {
      title: "Name",
      field: "name",
      validate: validateName,
    },
    {
      title: "Email",
      field: "email",
      validate: validateEmail,
    },
    {
      title: "Phone",
      field: "phone",
      validate: validatePhone,
    },
    {
      title: "Website",
      field: "website",
      validate: validateWebsite,
    },
    {
      title: "Actions",
      field: "actions",
      render: (rowData) => <UserTableActions rowData={rowData} />,
    },
  ];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MaterialTable
          title="Users Informations"
          data={users}
          columns={columns}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                const validationResults = columns.map((column) =>
                  column.validate ? column.validate(newRow) : true
                );
                const hasError = validationResults.some(
                  (result) => result !== true
                );
                if (!hasError) {
                  const newId =
                    users.length > 0 ? users[users.length - 1].id + 1 : 1; // Generate a new unique ID
                  const updatedRows = [...users, { id: newId, ...newRow }];
                  setTimeout(() => {
                    setUsers(updatedRows);
                    toast.success("Row added successfully");
                    resolve();
                  }, 1000);
                } else {
                  reject();
                }
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.id;
                const updatedRows = [...users];
                updatedRows.splice(index, 1);
                setTimeout(() => {
                  setUsers(updatedRows);
                  toast.success("Row deleted successfully");
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const validationResults = columns.map((column) =>
                  column.validate ? column.validate(updatedRow) : true
                );
                const hasError = validationResults.some(
                  (result) => result !== true
                );
                if (!hasError) {
                  const index = oldRow.tableData.id;
                  const updatedRows = [...users];
                  updatedRows[index] = updatedRow;
                  setTimeout(() => {
                    setUsers(updatedRows);
                    toast.success("Row updated successfully");
                    resolve();
                  }, 1000);
                } else {
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
