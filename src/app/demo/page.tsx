'use client';

import Typography from '@/components/Typography';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 font-poppins">
            Poppins Font Demo
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-poppins">
            This page demonstrates the Poppins font with Tailwind CSS
          </p>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 font-poppins mb-6">
            Typography Examples
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 font-poppins">Headings</h3>
              <div className="mt-3 space-y-3">
                <Typography variant="h1">Heading 1 with Typography Component</Typography>
                <h1 className="text-4xl font-bold font-poppins">Heading 1 with direct class</h1>
                <h2 className="text-3xl font-semibold font-poppins">Heading 2</h2>
                <h3 className="text-2xl font-semibold font-poppins">Heading 3</h3>
                <h4 className="text-xl font-medium font-poppins">Heading 4</h4>
                <h5 className="text-lg font-medium font-poppins">Heading 5</h5>
                <h6 className="text-base font-medium font-poppins">Heading 6</h6>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 font-poppins">Font Weights</h3>
              <div className="mt-3 space-y-2">
                <p className="font-poppins font-light">Light (300): The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-normal">Regular (400): The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-medium">Medium (500): The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-semibold">Semibold (600): The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins font-bold">Bold (700): The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 font-poppins">Text Styles</h3>
              <div className="mt-3 space-y-2">
                <p className="font-poppins italic">Italic: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins underline">Underlined: The quick brown fox jumps over the lazy dog.</p>
                <p className="font-poppins text-indigo-600">Colored: The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 font-poppins">Tailwind Components</h3>
              <div className="mt-3 space-y-4">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-poppins py-2 px-4 rounded">
                  Button with Poppins
                </button>
                
                <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4 font-poppins">
                  Alert box with Poppins font
                </div>
                
                <div className="shadow-md rounded-md bg-white p-4 font-poppins">
                  Card with Poppins font
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
