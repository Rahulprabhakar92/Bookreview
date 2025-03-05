import { HTTP_BACKEND } from "../config";




export async function getBooks() {
    try {
      const res = await fetch(HTTP_BACKEND+`books`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch books");
      
      const data = await res.json();
      return data.books || [];
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  }


  