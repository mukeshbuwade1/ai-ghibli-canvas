import { CheckCircle } from 'lucide-react'
import React from 'react'

export default function WhyGhibliAI() {
  return (
    <section className="py-16">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Why Use GhibliFy?</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">High Quality</h3>
          <p className="text-gray-600">Our AI generates beautiful Ghibli-style images with stunning detail and vibrant colors.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
          <p className="text-gray-600">Simply upload your image, choose a style, and let our AI do the rest. No design skills needed.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
          <p className="text-gray-600">Get your transformed images in seconds, no waiting around for complex processing.</p>
        </div>
      </div>
    </div>
  </section>
  )
}
