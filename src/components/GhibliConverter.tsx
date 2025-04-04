import React from "react";
const data =[
  { step: "Step 1", title: "Open the GhibliFy", text: "Click ", link: "here", description: "to open our GhibliFy tool. You don't need to download or install anything on your device." },
  { step: "Step 2", title: "Upload an image", description: "Upload the image you want to turn into Ghibli Studio-style artwork from your device or your gallery." },
  { step: "Step 3", title: "Wait", description: 'The "Image to Ghibli" process will start automatically. Simply wait a moment for your image to be restyled.' }
];
const GhibliConverter = () => {
  return (
    <div className="max-w-3xl p-6 font-sans text-gray-800 mx-auto">
    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-10">
      How to transform image into Ghibli artwork?
    </h1>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-cols-fr overflow-visible justify-center">
      {data.map(({ step, title, text, link, description }, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md">
          <p className="text-blue-500 font-medium">{step}</p>
          <h2 className="text-lg md:text-xl font-semibold mt-1">{title}</h2>
          <p className="text-gray-600 mt-2">
            {text}
            {link && <a href="#" className="text-blue-400 hover:underline">{link}</a>} {description}
          </p>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default GhibliConverter;
