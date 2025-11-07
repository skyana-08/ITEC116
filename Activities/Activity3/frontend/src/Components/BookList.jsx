import React, { useEffect, useState } from "react";
import BookDetails from "./BookDetails";
import NewBook from "./NewBook";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showNewBook, setShowNewBook] = useState(false);

  // 📥 Load books from backend
  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("❌ Error loading books:", err));
  }, []);

  // 🔄 Add new book to list
  const handleBookAdded = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  return (
    <div className="min-h-screen bg-[#152225] text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📚 My Bookshelf</h1>
        <button
          onClick={() => setShowNewBook(true)}
          className="bg-[#396AA2]/50 border-2 border-[#396AA2] px-4 py-2 rounded-md hover:bg-[#396AA2]/70 font-semibold"
        >
          + Add Book
        </button>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="bg-[#203135] p-4 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
            >
              {/* 🖼️ Cover */}
              <div className="w-full h-52 bg-[#2f4348] rounded-md overflow-hidden mb-3 flex items-center justify-center">
                {book.image ? (
                  <img
                    src={`http://localhost:3001/uploads/${book.image}`}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-400 text-sm">No Cover</p>
                )}
              </div>

              <p className="font-semibold text-lg truncate">{book.title}</p>
              <p className="text-sm text-[#79a9b2]">{book.author}</p>
              <p className="text-xs text-[#9cc4cc]">{book.genre}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No books yet. Add one!
          </p>
        )}
      </div>

      {/* Popups */}
      {showNewBook && (
        <NewBook
          onClose={() => setShowNewBook(false)}
          onBookAdded={handleBookAdded}
        />
      )}

      {selectedBook && (
        <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
