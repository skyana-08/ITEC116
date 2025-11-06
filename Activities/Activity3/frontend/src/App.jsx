import React, { useState } from "react";
import NewBook from "./Components/NewBook";
import BookDetails from "./Components/BookDetails";

import search from "./assets/search.svg";
import edit from "./assets/edit.svg";
import del from "./assets/delete.svg";
import Add from "./assets/add.svg";

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("ALL");

  // BOOK DATA
  const books = [
    { id: 1, title: "The Haunting of Hill Road", genre: "HORROR", color: "#388066" },
    { id: 2, title: "Love Letters From June", genre: "ROMANCE", color: "#C87056" },
    { id: 3, title: "Dragon Tales: Ember Rise", genre: "FANTASY", color: "#6756C8" },
    { id: 4, title: "Dark Night Chronicles", genre: "THRILLER", color: "#BE3144" },
    { id: 5, title: "Detective Story: Case 9", genre: "MYSTERY", color: "#388066" },
    { id: 6, title: "Funny Times: A Comedy", genre: "COMEDY", color: "#C87056" },
    { id: 7, title: "Space Quest: Orion", genre: "SCI-FI", color: "#6756C8" },
    { id: 8, title: "Action Hero: Last Stand", genre: "ACTION", color: "#BE3144" },
    { id: 9, title: "Learning JavaScript", genre: "EDUCATIONAL", color: "#396AA2" },
    { id: 10, title: "The Long Journey", genre: "ADVENTURE", color: "#16A34A" },
    { id: 11, title: "Life & Times: A Biography", genre: "BIOGRAPHY", color: "#78350F" },
    { id: 12, title: "Drama at Dawn", genre: "DRAMA", color: "#F59E0B" }
  ];

  const Search = (e) => {
    setSearchTerm(e.target.value);
  };

  const Genre = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
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
          onChange={Search}
          className="w-full px-4 py-2 pr-10 rounded-md bg-white text-black placeholder-[#1F1B2A] focus:outline-none"
        />
        <img
          src={search}
          alt="Search Icon"
          className="w-5 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
        />
      </div>

      {/* Genres */}
      <div className="grid grid-cols-6 gap-2 mb-4 text-center">
        <div 
          onClick={() => Genre("ALL")}
          className={`border-2 h-12 ${selectedGenre === "ALL" ? "border-white ring-2 ring-white" : "border-gray-500"} bg-gray-500/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer`}>
          ALL
        </div>

        <div 
          onClick={() => Genre("HORROR")}
          className={`border-2 h-12 border-[#BE3144] bg-[#BE3144]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "HORROR" ? "ring-2 ring-white" : ""}`}>
          HORROR
        </div>

        <div 
          onClick={() => Genre("COMEDY")}
          className={`border-2 h-12 border-[#D3B050] bg-[#D3B050]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "COMEDY" ? "ring-2 ring-white" : ""}`}>
          COMEDY
        </div>

        <div 
          onClick={() => Genre("MYSTERY")}
          className={`border-2 h-12 border-[#388066] bg-[#388066]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "MYSTERY" ? "ring-2 ring-white" : ""}`}>
          MYSTERY
        </div>

        <div 
          onClick={() => Genre("EDUCATIONAL")}
          className={`border-2 h-12 border-[#396AA2] bg-[#396AA2]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "EDUCATIONAL" ? "ring-2 ring-white" : ""}`}>
          EDUCATIONAL
        </div>

        <div 
          onClick={() => Genre("ROMANCE")}
          className={`border-2 h-12 border-[#BE3144] bg-[#BE3144]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "ROMANCE" ? "ring-2 ring-white" : ""}`}>
          ROMANCE
        </div>

        <div 
          onClick={() => Genre("FANTASY")}
          className={`border-2 h-12 border-[#6B21A8] bg-[#6B21A8]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "FANTASY" ? "ring-2 ring-white" : ""}`}>
          FANTASY
        </div>

        <div 
          onClick={() => Genre("SCI-FI")}
          className={`border-2 h-12 border-[#0891B2] bg-[#0891B2]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "SCI-FI" ? "ring-2 ring-white" : ""}`}>
          SCI-FI
        </div>

        <div 
          onClick={() => Genre("DRAMA")}
          className={`border-2 h-12 border-[#F59E0B] bg-[#F59E0B]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "DRAMA" ? "ring-2 ring-white" : ""}`}>
          DRAMA
        </div>

        <div 
          onClick={() => Genre("THRILLER")}
          className={`border-2 h-12 border-[#DC2626] bg-[#DC2626]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "THRILLER" ? "ring-2 ring-white" : ""}`}>
          THRILLER
        </div>

        <div 
          onClick={() => Genre("ADVENTURE")}
          className={`border-2 h-12 border-[#16A34A] bg-[#16A34A]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "ADVENTURE" ? "ring-2 ring-white" : ""}`}>
          ADVENTURE
        </div>

        <div 
          onClick={() => Genre("ACTION")}
          className={`border-2 h-12 border-[#0EA5E9] bg-[#0EA5E9]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "ACTION" ? "ring-2 ring-white" : ""}`}>
          ACTION
        </div>

        <div 
          onClick={() => Genre("BIOGRAPHY")}
          className={`border-2 h-12 border-[#78350F] bg-[#78350F]/20 p-4 rounded-lg font-semibold flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer ${selectedGenre === "BIOGRAPHY" ? "ring-2 ring-white" : ""}`}>
          BIOGRAPHY
        </div>
      </div>

      {/* ADD BOOK */}
      <button onClick={() => setShowPopup(true)} className="fixed bottom-6 right-6 bg-[#396AA2]/50 border-2 border-[#396AA2] w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
        <img src={Add} alt="Add" className="w-6 h-6" />
      </button>

      {showPopup && <NewBook onClose={() => setShowPopup(false)} />}

      {/* Total No. of Books */}
      <div className="flex items-center gap-2 text-lg mt-2">
        <span>Total Books:</span>
        <span className="font-bold text-[#fff]">{filteredBooks.length}</span>
      </div>

      {/* BOOKS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-5 w-full max-w-5xl">
        {filteredBooks.map((book) => (
          <div key={book.id} className="flex flex-col items-center">
            <div onClick={() => setShowBookDetails(true)} className="cursor-pointer">
              <div className="relative w-40 h-60 hover:scale-105 transition-transform duration-150">
                <div className="absolute inset-0 rounded-lg rounded-br-none z-0 shadow-md" style={{ backgroundColor: book.color }} />
                <div className="absolute left-3 right-3 bottom-2 h-4 w-37 bg-white rounded-l-full z-10 shadow-sm" />

                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
                  {book.genre}
                </div>
              </div>
            </div>

            {/* BOOK TITLE AND GENRE */}
            <p className="mt-3 font-semibold text-center max-w-[9rem] truncate">{book.title}</p>
            <span className="text-xs mt-1 px-2 py-1 rounded-full bg-white/10">{book.genre}</span>

            <div className="flex gap-3 mt-3">
              <button className="bg-[#1F1B2A] p-2 rounded-md hover:scale-120 transition-transform duration-150">
                <img src={edit} alt="Edit" className="w-4 h-4" />
              </button>
              <button className="bg-[#1F1B2A] p-2 rounded-md hover:scale-120 transition-transform duration-150">
                <img src={del} alt="Delete" className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookDetails && <BookDetails onClose={() => setShowBookDetails(false)} />}

    </div>
  );
}
