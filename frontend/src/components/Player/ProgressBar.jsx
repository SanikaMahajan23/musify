import React from "react";

export default function ProgressBar({ progress, onChange }) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
    />
  );
}
