import React from "react";
import close from "../assets/close.svg";

export default function BookDetails({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 select-none">
      <div className="bg-[#203135] rounded-lg w-[420px] p-6 shadow-lg text-[#fff]">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-semibold">Book Details</p>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition"
          >
            <img src={close} alt="Close" className="w-6 h-6" />
          </button>
        </div>

        <hr className="mb-4 border-2 border-[#3a535a] rounded" />

        {/* Book Preview */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-40 h-60 hover:scale-105 transition-transform duration-150">
            <div className="absolute inset-0 bg-[#388066] rounded-lg rounded-br-none z-0 shadow-md" />
            <div className="absolute left-3 right-3 bottom-2 h-4 w-37 bg-white rounded-l-full z-10 shadow-sm" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-sm">
          <div>
            <p className="font-bold text-[#79a9b2]">Title:</p>
            <p className="pl-2">Performative101</p>
          </div>
          <div>
            <p className="font-bold text-[#79a9b2]">Author:</p>
            <p className="pl-2">Chroma</p>
          </div>
          <div>
            <p className="font-bold text-[#79a9b2]">Genre:</p>
            <p className="pl-2">Comedy</p>
          </div>
          <div>
            <p className="font-bold text-[#79a9b2]">Description:</p>
            <p className="pl-2 text-justify">
              A lighthearted look at how everyday actions can be seen as
              performances in social settings.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-[#396AA2]/50 border-2 border-[#396AA2] text-white px-5 py-2 rounded-md hover:bg-[#396AA2]/70 transition font-semibold">
            Read
          </button>
        </div>
      </div>
    </div>
  );
}
