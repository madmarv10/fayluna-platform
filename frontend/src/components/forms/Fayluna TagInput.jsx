import React, { useState } from "react";

const TagInput = ({ tags = [], onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(updatedTags);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Tags</label>
      <form onSubmit={addTag} className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a tag and press Enter"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center space-x-2"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(index)}
              className="text-red-500 hover:text-red-700 text-sm"
              type="button"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
