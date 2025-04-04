import { ArrowRight, CheckCircle, Crown } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

export default function Plan() {
  return (
    <section className="py-16 bg-gray-50 -mx-4 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-3">Simple Pricing</h2>
      <p className="text-center text-gray-600 mb-12">Choose the right plan for your needs</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold mb-2">Free</h3>
          <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/month</span></div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>5 transformations/month</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Basic styles</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Watermarked output</span>
            </li>
          </ul>
          
          <Button className="w-full" variant="outline">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
        
        <div className="bg-primary/5 p-8 rounded-lg shadow-sm border border-primary/20 relative">
          <div className="absolute -top-4 left-0 right-0 mx-auto w-max bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            Popular
          </div>
          
          <h3 className="text-xl font-bold mb-2">Premium</h3>
          <div className="text-4xl font-bold mb-6">$9<span className="text-lg text-gray-500 font-normal">/month</span></div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Unlimited transformations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>All premium styles</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>No watermarks</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Priority processing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>API access</span>
            </li>
          </ul>
          
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Crown className="mr-2 h-4 w-4" /> Upgrade to Premium
          </Button>
        </div>
      </div>
    </div>
  </section>
  )
}
