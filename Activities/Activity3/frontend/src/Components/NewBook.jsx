import React, { useState } from "react";
import close from "../assets/close.svg";
import AddCover from "../assets/AddCover.svg";

export default function NewBook({ onClose, onBookAdded }) {
  const [coverImage, setCoverImage] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setCoverImage(URL.createObjectURL(selectedFile));
  };


  const handleCreate = async () => {
    if (!formData.title || !formData.author || !formData.genre || !file) {
      alert("Please fill in all fields and upload a cover image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("image", file); 
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("genre", formData.genre);
      data.append("description", formData.description);

      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to add book");

      const newBook = await response.json();
      onBookAdded(newBook); 
      onClose(); // close popup
    } catch (error) {
      console.error(" Error adding book:", error);
      alert("Something went wrong while adding the book.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 select-none">
      <div className="bg-[#203135] rounded-lg w-[400px] p-5 shadow-lg text-[#fff]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Add a New Book</p>
          <button onClick={onClose} className="hover:opacity-70">
            <img src={close} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        <hr className="mb-4 border-2 border-[#3a535a] rounded" />

        <div className="flex gap-4">
          {/* 📚 Cover Upload */}
          <label className="flex items-center justify-center w-40 h-60 bg-[#b2c2c6] rounded-md cursor-pointer overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={AddCover} alt="Add" className="w-6 h-6" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* ✏️ Text Fields */}
          <div className="flex flex-col gap-3 flex-1">
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-[#3a535a] rounded-md px-3 py-2 focus:outline-none"
            />
            <input
              placeholder="Author's Name"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="bg-[#3a535a] rounded-md px-3 py-2 focus:outline-none"
            />
            <input
              placeholder="Genre"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              className="bg-[#3a535a] rounded-md px-3 py-2 focus:outline-none"
            />
            <textarea
              placeholder="Description"
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-[#3a535a] rounded-md px-3 py-2 resize-none focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-[#1F1B2A] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="bg-[#396AA2]/50 border-2 border-[#396AA2] text-white px-4 py-2 rounded-md hover:opacity-90 transition font-bold"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
