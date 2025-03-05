export type Book = {
    bookid: number;
    title: string;
    author: string;
    imageUrl:string
    description:string
    adminId?: number;
    reviews:[]
  };
  export type Review = {
    id: number;
    bookId: number;
    userId: number;
    content: string;
    rating: number; // Assuming rating is from 1-5
  };
  export type User = {
    id: number;
    username: string;
    password: string; // ⚠️ Avoid sending passwords to the frontend!
    role: "admin" | "user"; 
  };
  