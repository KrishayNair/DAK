"use client";
import { useState } from "react";
import CreateForum from "./CreateForum";

const CreateForumModal = ({ isOpen, onClose, onPostCreated }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create New Forum Post</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <CreateForum
            onSuccess={() => {
              onClose();
              onPostCreated && onPostCreated();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateForumModal;
