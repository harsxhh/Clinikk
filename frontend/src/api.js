import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const getFiles = async (type) => {
  const response = await axios.get(`${API_URL}/fetch?type=${type}`);
  return response.data;
};
