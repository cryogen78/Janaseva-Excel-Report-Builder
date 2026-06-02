import { Building2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      localStorage.setItem(
        "username",
        response.data.user.username
      );

      window.location.href = "/dashboard";

    }
    catch (error) {

      alert(
        error.response?.data?.message ||
        "Invalid credentials"
      );

    }

  };

  return (

    <div className="min-h-screen flex">

      <div className="w-1/2 bg-primary text-white flex flex-col justify-center items-center p-20">

        <Building2 size={80} />

        <h1 className="text-5xl font-bold mt-6 text-center">
          Janaseva Sahakari Bank
        </h1>

        <p className="mt-4 text-xl text-orange-100">
          Enterprise Reporting Platform
        </p>

      </div>

      <div className="w-1/2 flex items-center justify-center bg-background">

        <div className="bg-white p-10 rounded-3xl shadow-2xl w-[450px]">

          <h2 className="text-3xl font-bold text-primary mb-8">
            Secure Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-4 rounded-xl mb-4"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl mb-6"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            className="w-full bg-primary text-white p-4 rounded-xl hover:opacity-90"
          >
            Login
          </button>

        </div>

      </div>

    </div>

  );

}