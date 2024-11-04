'use client';

import { useState, useEffect } from 'react';

export default function AdminColorSettings() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cardColors, setCardColors] = useState({
    announcements: '#22d3ee',
    birthdays: '#1f2937',
    trainings: '#a855f7',
    tasks: '#ec4899',
    poll: '#34d399',
    news: '#fb923c',
  });

  useEffect(() => {
    // Load previously saved settings from localStorage
    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      setSelectedImage(savedImage);
    }

    const savedColors = localStorage.getItem('cardColors');
    if (savedColors) {
      setCardColors(JSON.parse(savedColors));
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        localStorage.setItem('selectedImage', reader.result as string); // Save image to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (key: string, value: string) => {
    setCardColors((prevColors) => {
      const newColors = { ...prevColors, [key]: value };
      localStorage.setItem('cardColors', JSON.stringify(newColors)); // Save colors to localStorage
      return newColors;
    });
  };

  return (
    <div className="admin-settings">
      <h2>Upload Icon</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" className="w-24 h-24 mt-2" />
        </div>
      )}

      <h2 className="mt-4">Card Color Settings</h2>
      {Object.entries(cardColors).map(([key, color]) => (
        <div key={key} className="flex items-center mb-2">
          <label className="mr-2 capitalize">{key}:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
