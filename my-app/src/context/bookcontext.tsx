
import { createContext, ReactNode ,useEffect,useState,useContext} from "react";
import { HTTP_BACKEND } from "../config";
import { Book } from "../types/types";

interface Bookcontexttype{
  books:Book[],
  setBooks:React.Dispatch<React.SetStateAction<Book[]>>;
  loading:boolean
  
}

const Bookcontext=createContext<Bookcontexttype|undefined>(undefined)

export function BookProvider({children}:{children:ReactNode}){
    const[books,setBooks]=useState<Book[]>([])
    const[loading,setloading]=useState(true)
    useEffect(()=>{
        async function getBooks() {
            try {
              const res = await fetch(HTTP_BACKEND+`books`)

 
              if (!res.ok) throw new Error("Failed to fetch books");
              
              const data:Book[] = await res.json();
              //@ts-ignore
              setBooks(data.books)
            } catch (error) {
              console.error("Error fetching books:", error);
            }finally{
              setloading(false)
            }
          }
          getBooks()
    },[])
    return(
        <Bookcontext.Provider value={{books,setBooks,loading}}>
            {children}
        </Bookcontext.Provider>
    )

}
export function useBooks() {
  const context = useContext(Bookcontext);

  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }

  return context; 
}