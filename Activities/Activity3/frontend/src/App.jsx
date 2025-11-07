import React, { useState, useEffect } from "react";
import NewBook from "./Components/NewBook";
import BookDetails from "./Components/BookDetails";
import search from "./assets/search.svg";
import edit from "./assets/edit.svg";
import del from "./assets/delete.svg";
import Add from "./assets/add.svg";

// Genre Colors Map
const genreColors = {
  ALL: "#ffffff",
  HORROR: "#8B0000",
  COMEDY: "#FFD93D",
  MYSTERY: "#E89B00",
  EDUCATIONAL: "#008080",
  ROMANCE: "#FF77A9",
  FANTASY: "#6A5ACD",
  "SCI-FI": "#00C896",
  DRAMA: "#A36F4A",
  THRILLER: "#C51E3A",
  ADVENTURE: "#3B9C50",
  ACTION: "#1E88E5",
  BIOGRAPHY: "#3478F6",
};

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:3001/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`http://localhost:3001/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBooks(books.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Update book
  const handleUpdateBook = async (updatedBook) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedBook.title);
      formData.append("author", updatedBook.author);
      formData.append("genre", updatedBook.genre);
      formData.append("description", updatedBook.description);
      if (updatedBook.imageFile) formData.append("image", updatedBook.imageFile);

      const res = await fetch(`http://localhost:3001/books/${updatedBook.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update book");
      await fetchBooks();
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "ALL" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#203135] text-white flex flex-col items-center p-8 select-none">
      {/* TITLE */}
      <div className="flex items-center gap-2">
        <span className="text-[#348BEF] text-[3rem] font-black">*</span>
        <p className="text-xl font-semibold mb-2.5">READ A BOOK</p>
      </div>

      {/* Search Bar */}
      <div className="relative w-80 mb-4">
        <input
          type="search"
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded-md bg-white text-black placeholder-[#1F1B2A] focus:outline-none"
        />
        <img
          src={search}
          alt="Search Icon"
          className="w-5 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
        />
      </div>

      {/* Genres */}
      <GenreTabs selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />

      {/* Add Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 bg-[#396AA2]/50 border-2 border-[#396AA2] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <img src={Add} alt="Add" className="w-6 h-6" />
      </button>

      {showPopup && (
        <NewBook
          onClose={() => setShowPopup(false)}
          onBookAdded={(newBook) => setBooks([...books, newBook])}
        />
      )}

      {/* Total Books */}
      <div className="flex items-center gap-2 text-lg mt-2">
        <span>Total Books:</span>
        <span className="font-bold text-[#fff]">{filteredBooks.length}</span>
      </div>

      {/* BOOKS DISPLAY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-5 w-full max-w-5xl">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onShowDetails={() => {
              setSelectedBook(book);
              setShowBookDetails(true);
            }}
            onDelete={handleDelete}
            onEdit={() => setEditingBook(book)}
          />
        ))}
      </div>

      {showBookDetails && selectedBook && (
        <BookDetails book={selectedBook} onClose={() => setShowBookDetails(false)} />
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={handleUpdateBook}
        />
      )}
    </div>
  );
}

function GenreTabs({ selectedGenre, onSelectGenre }) {
  const genres = [
    "ALL",
    "HORROR",
    "COMEDY",
    "MYSTERY",
    "EDUCATIONAL",
    "ROMANCE",
    "FANTASY",
    "SCI-FI",
    "DRAMA",
    "THRILLER",
    "ADVENTURE",
    "ACTION",
    "BIOGRAPHY",
  ];

  const getTextColor = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "black" : "white";
  };

  return (
    <div className="grid grid-cols-6 gap-2 mb-4 text-center">
      {genres.map((genre) => {
        const isSelected = selectedGenre === genre;
        const bgColor = isSelected ? genreColors[genre] : genreColors[genre] + "33";
        const textColor = isSelected ? getTextColor(genreColors[genre]) : "#fff";

        return (
          <div
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className="border-2 h-12 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer"
            style={{
              borderColor: genreColors[genre],
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {genre}
          </div>
        );
      })}
    </div>
  );
}

function BookCard({ book, onShowDetails, onDelete, onEdit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cursor-pointer" onClick={onShowDetails}>
        <div className="relative w-40 h-60 hover:scale-105 transition-transform duration-150 rounded-lg overflow-hidden shadow-md bg-[#2f4348]">
          {book.image ? (
            <img
              src={`http://localhost:3001/uploads/${book.image}`}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Cover
            </div>
          )}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
            {book.genre}
          </div>
        </div>
      </div>

      <p className="mt-3 font-semibold text-center max-w-[9rem] truncate">
        {book.title}
      </p>
      <span className="text-xs mt-1 px-2 py-1 rounded-full bg-white/10">
        {book.genre}
      </span>
      <div className="flex gap-3 mt-3">
        <button
          onClick={onEdit}
          className="bg-[#1F1B2A] p-2 rounded-md hover:scale-110 transition-transform"
        >
          <img src={edit} alt="Edit" className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="bg-[#1F1B2A] p-2 rounded-md hover:scale-110 transition-transform"
        >
          <img src={del} alt="Delete" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EditBookModal({ book, onClose, onSave }) {
  const [form, setForm] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    imageFile: null,
  });
  const [preview, setPreview] = useState(book.image ? `http://localhost:3001/uploads/${book.image}` : null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-[#2b3a40] p-6 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-2 p-2 rounded bg-white text-black"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full mb-2 p-2 rounded bg-white text-black"
        />
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full mb-2 p-2 rounded bg-white text-black"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="w-full mb-2 p-2 rounded bg-white text-black"
        />
        <input type="file" onChange={handleFileChange} className="w-full mb-3" />

        {preview && <img src={preview} alt="Preview" className="w-32 h-44 object-cover rounded mb-3" />}

        <div className="flex justify-between mt-4">
          <button
            onClick={() => onSave(form)}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
