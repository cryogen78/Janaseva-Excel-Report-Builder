import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user"
  });

  const fetchUsers = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/users"
        );

      setUsers(response.data.users);

    }
    catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const createUser = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/users",
        formData
      );

      alert("User Created");

      setFormData({
        username: "",
        password: "",
        role: "user"
      });

      fetchUsers();

    }
    catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const deleteUser = async (id) => {

    if (!window.confirm("Delete User?"))
      return;

    await axios.delete(
      `http://localhost:5000/api/users/${id}`
    );

    fetchUsers();

  };

  const disableUser = async (id) => {

    await axios.put(
      `http://localhost:5000/api/users/disable/${id}`
    );

    fetchUsers();

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        User Management
      </h1>

      {/* CREATE USER */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="font-bold text-xl mb-4">
          Create User
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            className="border p-3 rounded"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value
              })
            }
          />

          <input
            type="password"
            className="border p-3 rounded"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value
              })
            }
          />

          <select
            className="border p-3 rounded"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value
              })
            }
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

        </div>

        <button
          onClick={createUser}
          className="
            mt-4
            bg-orange-600
            text-white
            px-6
            py-3
            rounded
          "
        >
          Create User
        </button>

      </div>

      {/* USER TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">
                Username
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t"
              >

                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  {user.status}
                </td>

                <td className="p-4 flex gap-2">

                  <button
                    onClick={() =>
                      disableUser(user.id)
                    }
                    className="
                      bg-yellow-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Disable
                  </button>

                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}