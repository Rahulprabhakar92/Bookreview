import { useState } from "react";
import { HTTP_BACKEND } from "../config";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [user, setUser] = useState({  username: "",role:"ADMIN" ,password:""});
  const navigate=useNavigate()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch(HTTP_BACKEND+`createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("User created successfully!");
        setUser({  username: "",role:"ADMIN" ,password:""});
        navigate(`/Home`)
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div className="bg-gray-900 h-screen flex">
    <div className="max-w-ls mx-auto m-60  p-4 border rounded shadow-lg bg-gray-100 justify-center ">
      <h2 className="text-2xl font-bold mb-4 text-center">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="username"
          name="username"
          placeholder="Enter Username"
          value={user.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

         <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        /> 
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create User
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreateUser;
