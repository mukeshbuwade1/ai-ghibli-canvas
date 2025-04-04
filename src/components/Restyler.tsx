import React from "react";

const RestylerSection = () => {
  return (
    <section className="  py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 space-y-4">
          <span className="text-blue-500 border border-blue-500 px-3 py-1 rounded-full text-sm font-medium">
          GhibliFy
          </span>
          <h2 className="text-4xl font-semibold leading-tight">
            Apply Studio Ghibli style to any image
          </h2>
          <p className="text-gray-400">
            With our AI GhibliFy feature, you can give your photos a magical
            makeover. Upload any picture and apply the iconic Studio Ghibli art
            style in seconds, infusing your images with AI whimsy. It's a fun
            way to see familiar sights through a new lens and an excellent tool
            for creating unique social media content or personalized art pieces.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600  font-medium px-6 py-3 rounded-lg transition text-white">
            Restyle image into Ghibli artwork
          </button>
        </div>

        {/* Right Side - Image Comparison */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
            <div className="text-gray-600 text-sm flex justify-between px-2">
              <span>Before</span>
              <span>After</span>
            </div>
            <div className="relative w-[350px] h-[200px] md:w-[400px] md:h-[250px] flex">
              {/* Left Image (Before) */}
              <div className="w-1/2 overflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/672e2ecfabc225dc52e26a4a/67ee9a37a6559b8871e9ed86_img-7RvJOWbNqwpFayNWRrp0N.webp" // Replace with actual image URL
                  alt="Before"
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>

              {/* Divider Arrow */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full ">
                ➝
              </div>

              {/* Right Image (After) */}
              <div className="w-1/2 overflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/672e2ecfabc225dc52e26a4a/67ee9a38eae1308e28b8e35c_getimg_ai_img-Y635oK6nQ6l9aXrSUeLB1.webp" // Replace with actual image URL
                  alt="After"
                  className="w-full h-full object-cover rounded-r-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestylerSection;
