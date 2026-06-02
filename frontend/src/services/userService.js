import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

export const getUsers = async () => {

  const response =
    await axios.get(API_URL);

  return response.data;

};

export const createUser = async (data) => {

  const response =
    await axios.post(
      API_URL,
      data
    );

  return response.data;

};

export const deleteUser = async (id) => {

  const response =
    await axios.delete(
      `${API_URL}/${id}`
    );

  return response.data;

};

export const disableUser = async (id) => {

  const response =
    await axios.put(
      `${API_URL}/disable/${id}`
    );

  return response.data;

};

export const enableUser = async (id) => {

  const response =
    await axios.put(
      `${API_URL}/enable/${id}`
    );

  return response.data;

};

export const resetPassword = async (
  id,
  password
) => {

  const response =
    await axios.put(
      `${API_URL}/reset-password/${id}`,
      { password }
    );

  return response.data;

};