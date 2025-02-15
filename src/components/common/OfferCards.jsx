import React from "react";

const offerData = [
  {
    title: "Cancel or switch plans anytime",
    description: "Make changes to your plan whenever you need, without any hassle.",
  },
  {
    title: "Enjoy exclusive content",
    description: "Access a wide range of shows and movies available only on our platform.",
  },
  {
    title: "Stream on multiple devices",
    description: "Watch on your phone, tablet, laptop, and TV simultaneously.",
  },
  {
    title: "No hidden fees",
    description: "Transparent pricing with no surprise charges.",
  },
];

const OfferCards = () => {
  return (
    <div className="container mt-12">
      <div className="flex flex-wrap gap-4">
        {offerData.map((offer, index) => (
          <div
            key={index}
            className="w-[300px] h-[200px] flex flex-col justify-center p-4 bg-gray-300 rounded-lg opacity-70"
          >
            <h1 className="text-white text-lg font-bold">{offer.title}</h1>
            <p className="text-gray-500 w-3/4">{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferCards;
