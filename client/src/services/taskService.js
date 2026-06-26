import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";


export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// NEW 👇
export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const updateTask = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const toggleTask = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}/toggle`);
  return res.data;
};