

import { useState } from "react";
import BookCardnew from "./cardnew";


export type Book = {
  bookid: number;
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  adminId?: number;
  reviews: [];
};

export default function SearchableBookList({ books }: { books: Book[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBooks = searchTerm ? filteredBooks : books.slice(0, 0);

  return (
    <div className="flex flex-col items-center bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-white mt-7  text-center">Book Library</h1>
      <div className="p-4  text-white flex justify-center">
  <input
    type="text"
    placeholder="Search by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className=" w-3xl mx-auto px-4 py-2 border-1 border-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {displayedBooks.map((book:Book) => (
      <BookCardnew key={book.bookid} book={book} />
    ))}
  </div>
</div>
    </div>
  );
}
