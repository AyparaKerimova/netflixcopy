import React, { useState } from "react";

const accordionData = [
  {
    title: "Accordion Item 1",
    content: "Content for accordion item 1 goes here. You can add any HTML content.",
  },
  {
    title: "Accordion Item 2",
    content: "Content for accordion item 2 goes here. You can add any HTML content.",
  },
  {
    title: "Accordion Item 3",
    content: "Content for accordion item 3 goes here. You can add any HTML content.",
  },
];

const Accordion = () => {
  const [selected, setSelected] = useState(null);

  const toggleAccordion = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="w-4/5 mx-auto mt-6">
      <ul className="shadow-lg rounded-md">
        {accordionData.map((item, index) => (
          <li key={index} className="border-b bg-gray-800 border-gray-700 rounded mt-1">
            <button
              type="button"
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-lg font-medium text-white">{item.title}</span>
              <span className={`transition-transform ${selected === index ? "rotate-45" : ""}`}>➕</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                selected === index ? "max-h-[200px]" : "max-h-0"
              }`}
            >
              <div className="p-4 text-white">{item.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
