import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Ghibli AI GhibliFy?",
    answer: `Ghibli AI GhibliFy is an AI tool designed specifically to transform images 
    from one style (e.g., a photograph) into another—the iconic and highly distinctive 
    Studio Ghibli art style. You don’t need to write a prompt, tweak any settings, or 
    fine-tune parameters. Just upload your image, and the AI does the rest, instantly 
    reimagining it in Ghibli’s signature look.

    The result? A beautifully hand-drawn aesthetic with soft, dreamy colors, intricate details, 
    and the magical charm that defines Studio Ghibli’s world. Whether you want to turn a landscape 
    into something straight out of My Neighbor Totoro or transform a portrait into an anime-style 
    character, Ghibli AI GhibliFy makes it effortless.`,
  },
  {
    question: "What images can you turn into Studio Ghibli art with AI?",
    answer: `You can transform landscapes, portraits, pets, and even abstract images into 
    Studio Ghibli-style art. The AI adapts to different types of images while preserving 
    key details and enhancing them with Ghibli’s signature aesthetic.`,
  },
  {
    question: "How do you create an AI Studio Ghibli PFP (profile picture)?",
    answer: `To create a Ghibli-style profile picture, upload a clear portrait image to the 
    Ghibli AI GhibliFy. The AI will process your image and generate a hand-drawn version with 
    soft shading, detailed expressions, and a magical, anime-inspired feel.`,
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="border-t border-gray-700">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700">
            <button
              className={`w-full text-left p-4 flex justify-between items-center 
                ${
                  openIndex === index
                    ? "bg-gray-800 text-white"
                    : "bg-transparent text-gray-300"
                }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-400 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
