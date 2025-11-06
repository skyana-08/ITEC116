import React from "react";
import close from "../assets/close.svg";
import AddCover from "../assets/AddCover.svg";

export default function NewBook({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 select-none">
      <div className="bg-[#203135] rounded-lg w-[400px] p-5 shadow-lg text-[#fff]">
        
        {/* POP UP */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Add a New Book</p>
          <button
            onClick={onClose}
            className="text-[#1F1B2A] text-2xl leading-none hover:opacity-70"
          >
            <img src={close} alt="Add" className="w-6 h-6" />
          </button>
        </div>

        <hr className="mb-4 border-2 border-[#3a535a] rounded" />

        <div className="flex gap-4">
          <div className="flex items-center justify-center w-40 h-60 bg-[#b2c2c6] rounded-md cursor-pointer hover:border-[#ccdbdf] hover:border-3">
            <img src={AddCover} alt="Add" className="w-6 h-6" />
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-3 flex-1">
            <input
              placeholder="Title"
              className="bg-[#3a535a] rounded-md px-3 py-2 focus:outline-none focus:ring-3 focus:ring-[#537680]"
            />
            <input
              placeholder="Author's Name"
              className="bg-[#3a535a] rounded-md px-3 py-2 focus:outline-none focus:ring-3 focus:ring-[#537680]"
            />
            <input
              placeholder="Genre"
              className="bg-[#3a535a] rounded-md px-3 py-2 focus:outline-none focus:ring-3 focus:ring-[#537680]"
            />
            <textarea
              placeholder="Description"
              rows="3"
              className="bg-[#3a535a] rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#537680]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-[#1F1B2A] text-white px-4 py-2 rounded-md hover:opacity-90 transition "
          >
            Cancel
          </button>

          <button className="bg-[#396AA2]/50 border-2 border-[#396AA2] text-white px-4 py-2 rounded-md hover:opacity-90 transition font-bold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
