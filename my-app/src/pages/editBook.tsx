import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/bookcontext";
import { HTTP_BACKEND } from "../config";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, setBooks } = useBooks();
  const book = books.find((b) => b.bookid.toString() === id);

  const [content, setcontent] = useState(book?.description || "");
  const [rating,setrating]=useState(0)


  const handleSave = async () => {
    if (!book) return; 
    try {
      const response = await fetch(HTTP_BACKEND+`addreview/${book.bookid}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
            rating,
            bookid:id,
            userId:"fe6d144b-1624-4550-ba81-f421027c1b88"
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
  
      const data = await response.json();
  
      const updatedBooks = books.map((b) =>
        b.bookid === book.bookid ? { ...b, ...data } : b
      );
      setBooks(updatedBooks);
  
      navigate(`/book/${id}`);


    } catch (error) {
      console.error("Error updating book:", error);
    }
  };
  

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-3xl p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Write Review</h2>
        <label className="block mb-2 text-lg">Review</label>
        <textarea
          className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
          rows={4}
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
        <label className="block mt-4 mb-2 text-lg">Rating</label>
        <input
          type="number"
          className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setrating(Number(e.target.value))}
        />
        <button
          onClick={handleSave}
          className="mt-6 w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBook;
