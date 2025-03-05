import { useState } from "react";
import { HTTP_BACKEND } from "../config";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate=useNavigate()
  const [book, setBook] = useState({
    title: "",
    author: "",
    role: "ADMIN",
    adminId:"fe6d144b-1624-4550-ba81-f421027c1b88",
    imageUrl: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(HTTP_BACKEND+`addbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!response.ok) throw new Error("Failed to add book");
      alert("Book added successfully!");
      setBook({ title: "", author: "", role: "", adminId: "", imageUrl: "", description: "" });
      navigate(`/Home`)
      
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="bg-gray-900 h-screen mt-10 p-12">
    <div className="max-w-md mx-auto mt-20 p-5 bg-gray-200 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="title" placeholder="Title" value={book.title} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="author" placeholder="Author" value={book.author} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={book.imageUrl} onChange={handleChange} className="border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={book.description} onChange={handleChange} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Book</button>
      </form>
    </div>
    </div>
  );
}
