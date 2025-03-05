export type Book = {
    bookid: number;
    title: string;
    author: string;
    imageUrl: string;
    description: string;
    adminId?: number;
    reviews: [];
  };
export default function BookCardnew({ book }: { book: Book }) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col justify-center transition duration-300 ease-in-out hover:scale-105">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-64 object-cover rounded-md mb-4"
        />
        <h2 className="mt-4 text-xl font-semibold text-white">{book.title}</h2>
        <p className="text-gray-400">{book.author}</p>
        <button className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
          Want to Read
        </button>
      </div>
    );
  }