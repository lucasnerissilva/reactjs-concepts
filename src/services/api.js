import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export const findRepositories = async () => {
  return api.get("repositories");
};

export const addRepository = async repository => {
  return api.post("repositories", repository);
};

export const deleteRepository = async id => {
  return api.delete(`repositories/${id}`);
};

export default api;
