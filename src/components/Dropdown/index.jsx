import React, { useState } from "react";

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-white rounded-md"
        >
          {title}
        </button>
      </div>

      <div
        className={`origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg z-10 ring-1 ring-black ring-opacity-5 transition-all duration-500 ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="py-1 bg-white"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-black hover:text-yellow-500"
              role="menuitem"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
