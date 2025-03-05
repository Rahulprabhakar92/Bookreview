

import { useBooks } from "../context/bookcontext";
import {  useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Review } from "../types/types";

const BookDetail = () => {
  const {id}=useParams()
  const {books}=useBooks()
  const navigate=useNavigate()


  if (!Array.isArray(books) || books.length === 0) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
    <ClipLoader color="#36d7b7" size={50} />
  </div>
  }

  const book=books.find((b)=>b?.bookid.toString()===id)

  if (!book) {
    return <div className="text-white text-center mt-10">Book not found</div>;
  }

  return (
    <div className="h-screen bg-gray-900 ">

    <div className="max-w-5xl  mx-auto  bg-gray-500 text-white rounded-lg shadow-lg flex flex-col md:flex-row gap-8 p-10">

      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-48 h-72 object-cover rounded-md shadow-lg"
      />


      <div className="flex-1">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-lg text-gray-400 mt-1">by {book.author}</p>


        <div className="flex items-center gap-2 mt-3">
          <span className="text-yellow-400 text-xl">★ ★ ★ ★ ☆</span>
          {/* <span className="text-gray-300 text-lg">{book.rating} ({book.reviews} reviews)</span> */}
        </div>
        <p className="text-gray-300 mt-4">{book.description}</p>
        <div className="mt-6 flex gap-4">
        <button
  onClick={() => navigate(`/edit/${id}`)}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
>
  Write a review
</button>


          <button className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-800"
          onClick={()=>{navigate(`/edit/${id}`)}}
          >
            Rate this Book
          </button>
        </div>
        <div>
        <p className="text-lg text-gray-300 mt-1"> Reviews</p>
        {book?.reviews?.length > 0 ? (
    book.reviews.map((review:Review) => (
      <div key={review.id} className="border p-2 mb-2 rounded bg-gray-800 text-white">
        <p className="font-bold">Rating: {review.rating} ⭐</p>
        <p>{review.content}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No reviews yet.</p>
  )}
        </div>
      </div>
    </div>
    </div>

  );
};

export default BookDetail;
