import toast from "react-hot-toast";

export const validateName = (rowData) => {
  if (!rowData.name) {
    toast.error("Name is required");
    return "Name is required";
  }
  return true;
};

export const validateEmail = (rowData) => {
  if (!rowData.email) {
    toast.error("Email is required");
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rowData.email)) {
    toast.error("Invalid email format");
    return "Invalid email format";
  }
  return true;
};

export const validatePhone = (rowData) => {
  if (!rowData.phone) {
    toast.error("Phone number is required");
    return "Phone number is required";
  }
  return true;
};

export const validateWebsite = (rowData) => {
  if (!rowData.website) {
    toast.error("Website is required");
    return "Website is required";
  }
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlRegex.test(rowData.website)) {
    toast.error("Invalid URL format");
    return "Invalid URL format";
  }
  return true;
};
