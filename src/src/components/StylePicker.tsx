
import React from 'react';
import { cn } from '@/lib/utils';

interface Style {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

interface StylePickerProps {
  styles: Style[];
  selectedStyle: string | null;
  onStyleSelect: (styleId: string) => void;
}

const STYLES: Style[] = [
  {
    id: 'totoro',
    name: 'My Neighbor Totoro',
    thumbnail: 'https://i.imgur.com/WLXSvSB.jpeg',
    description: 'Soft, dreamlike forest landscapes with rounded characters'
  },
  {
    id: 'spirited',
    name: 'Spirited Away',
    thumbnail: 'https://i.imgur.com/YUgJUeS.jpeg',
    description: 'Vibrant colors with ethereal spirits and detailed backgrounds'
  },
  {
    id: 'howl',
    name: "Howl's Moving Castle",
    thumbnail: 'https://i.imgur.com/Y9mt8x3.jpeg',
    description: 'Steampunk aesthetic with romantic, warm color palettes'
  },
  {
    id: 'mononoke',
    name: 'Princess Mononoke',
    thumbnail: 'https://i.imgur.com/mdfpLWg.jpeg',
    description: 'Rich, natural tones with mystical forest elements'
  },
  {
    id: 'highq_ghibli',
    name: 'High Quality Ghibli',
    thumbnail: 'https://i.imgur.com/d6TjuJi.jpeg',
    description: 'Enhanced quality using specialized Ghibli model (may take longer)'
  }
];

const StylePicker = ({ selectedStyle, onStyleSelect }: StylePickerProps) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Choose a Ghibli Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={cn(
              "ghibli-card cursor-pointer transition-all duration-300 relative border rounded-lg overflow-hidden",
              selectedStyle === style.id ? "ring-2 ring-primary scale-[1.02]" : "hover:scale-[1.01]"
            )}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={style.thumbnail} 
                alt={style.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm">{style.name}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{style.description}</p>
            </div>
            {selectedStyle === style.id && (
              <div className="absolute top-0 right-0 bg-primary text-white m-2 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylePicker;
