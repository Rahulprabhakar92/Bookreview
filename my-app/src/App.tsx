import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BookDetail from "./pages/bookDetails";
import { BookProvider } from "./context/bookcontext";
import EditBook from "./pages/editBook";
import Createuser from "./pages/UserCreation";
import AddBook from "./pages/AddBook";
import Topheader from "./pages/Topheader";
function App() {
  return (
    
    <BookProvider>
      <Topheader />

    <Routes>
      <Route path="/" element={<Createuser />}/>
      <Route path="/Home" element={<LandingPage />} />
      <Route path="/AddBook" element={<AddBook/>}/>
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/edit/:id" element={<EditBook />}/>
    </Routes>
    </BookProvider>
  );
}

export default App;