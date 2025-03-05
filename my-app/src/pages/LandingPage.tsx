
import { Book } from "../types/types";
import { getBooks } from "../controllers/getBooks";
import SearchableBookList from "../components/search";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
export default  function LandingPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate(); // ✅ Correctly inside a React component

  useEffect(() => {
    async function fetchBooks() {
      const data = await getBooks();
      setBooks(data);
    }
    console.log("in the landing pageasd")

    fetchBooks();
  }, []);
  return (

    <div>
    
      <div className="min-h-screen bg-gray-900 ">
       
        <SearchableBookList books={books}/>

        <div className="max-w-7xl mx-auto overflow-x-auto">
        <button className="mb-4 w-80 bg-blue-400 hover:bg-blue-900 text-white py-2 rounded-md
        "
        onClick={()=>navigate(`/AddBook`)}
        >Add a new Book</button>
          <div className="grid grid-cols-3 gap-6 min-w-[1024px]">
            {books.map((book: Book) => (
              <div key={book.bookid} className="bg-gray-800 rounded-lg shadow-lg p-5  flex flex-col justify-center">
               <img
                src={book.imageUrl}
                width={200}
                height={100}
                alt={book.title}
                className=" " 
              />
                <h2 className="mt-4 text-xl font-semibold text-white">{book.title}</h2>
                <p className="text-gray-400">{book.author}</p>

                <button 
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                onClick={()=>navigate(`/book/${book.bookid}`)}>
                  Review 
                </button>

              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
    
}

