'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Define the type for card setting keys
type CardSettingKeys = 'announcements' | 'birthdays' | 'trainings' | 'tasks';

interface AdminSettingsProps {
  updateDescriptions: (descriptions: Partial<Record<CardSettingKeys, string[]>>) => void;
}

const AdminSettings = ({ updateDescriptions }: AdminSettingsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cardColors, setCardColors] = useState({
    announcements: '#22d3ee',
    birthdays: '#1f2937',
    trainings: '#a855f7',
    tasks: '#ec4899',
    poll: '#34d399',
    news: '#fb923c',
  });
  const [activeTab, setActiveTab] = useState<'icon' | 'colors' | 'cardSettings'>('icon');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State for card settings descriptions
  const [cardSettings, setCardSettings] = useState<Record<CardSettingKeys, string[]>>({
    announcements: ['This is the announcements section.'],
    birthdays: ['This is the birthdays section.'],
    trainings: ['This is the trainings section.'],
    tasks: ['This is the tasks section.'],
  });

  // State for new description inputs for each card
  const [newDescriptions, setNewDescriptions] = useState<Record<CardSettingKeys, string>>({
    announcements: '',
    birthdays: '',
    trainings: '',
    tasks: '',
  });

  const [currentEditing, setCurrentEditing] = useState<{ key: CardSettingKeys; index: number } | null>(null);

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

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    // Apply the selected theme to the body
    document.body.classList.toggle('bg-gray-800', isDarkMode);
    document.body.classList.toggle('bg-white', !isDarkMode);
    document.body.classList.toggle('text-white', isDarkMode);
    document.body.classList.toggle('text-black', !isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

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

  // Add a new description
  const addDescription = (key: CardSettingKeys) => {
    const newDescription = newDescriptions[key].trim();
    if (newDescription === '') return;
    setCardSettings((prev) => ({
      ...prev,
      [key]: [...prev[key], newDescription],
    }));
    updateDescriptions({ [key]: [...cardSettings[key], newDescription] }); // Update parent component with new description
    setNewDescriptions((prev) => ({ ...prev, [key]: '' })); // Clear the input for the specific card
  };

  // Start editing a description
  const startEditing = (key: CardSettingKeys, index: number) => {
    setNewDescriptions((prev) => ({ ...prev, [key]: cardSettings[key][index] })); // Pre-fill the input
    setCurrentEditing({ key, index });
  };

  // Save edited description
  const saveEditedDescription = () => {
    if (currentEditing) {
      const { key, index } = currentEditing;
      const updatedDescription = newDescriptions[key].trim();
      setCardSettings((prev) => {
        const updatedDescriptions = [...prev[key]];
        updatedDescriptions[index] = updatedDescription;
        return {
          ...prev,
          [key]: updatedDescriptions,
        };
      });
      updateDescriptions({ [key]: updatedDescription }); // Update parent component with edited description
      setNewDescriptions((prev) => ({ ...prev, [key]: '' })); // Clear the input after saving
      setCurrentEditing(null);
    }
  };

  // Delete a description
  const deleteDescription = (key: CardSettingKeys, index: number) => {
    setCardSettings((prev) => {
      const updatedDescriptions = prev[key].filter((_, i) => i !== index);
      updateDescriptions({ [key]: updatedDescriptions }); // Update parent component with new descriptions
      return {
        ...prev,
        [key]: updatedDescriptions,
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <div className="flex items-center mb-4">
        <label className="mr-2">Dark Mode</label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          className="toggle toggle-primary"
        />
      </div>

      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('icon')}
          className={`flex-1 py-2 text-center rounded ${activeTab === 'icon' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Upload Icon
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex-1 py-2 text-center rounded ${activeTab === 'colors' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Card Colors
        </button>
        <button
          onClick={() => setActiveTab('cardSettings')}
          className={`flex-1 py-2 text-center rounded ${activeTab === 'cardSettings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Card Settings
        </button>
      </div>

      {activeTab === 'icon' && (
        <div className="mb-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border rounded p-2" />
          {selectedImage && (
            <div className="mt-2">
              <Image width={500} height={500} src={selectedImage} alt="Selected" className="w-24 h-24 mt-2" />
            </div>
          )}
        </div>
      )}

      {activeTab === 'colors' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Card Color Settings</h2>
          {Object.entries(cardColors).map(([key, color]) => (
            <div key={key} className="flex items-center mb-2">
              <label className="mr-2 capitalize">{key}:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="border rounded"
              />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'cardSettings' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Card Settings</h2>
          {Object.keys(cardSettings).map((key) => (
            <div key={key} className="flex flex-col mb-4">
              <label className="mb-1 capitalize">{key} Descriptions:</label>
              {cardSettings[key as CardSettingKeys].map((description, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">{description}</span>
                  <button onClick={() => startEditing(key as CardSettingKeys, index)} className="mr-2">
                    Edit
                  </button>
                  <button onClick={() => deleteDescription(key as CardSettingKeys, index)} className="text-red-500">
                    Delete
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="text"
                  value={newDescriptions[key as CardSettingKeys]}
                  onChange={(e) =>
                    setNewDescriptions((prev) => ({
                      ...prev,
                      [key as CardSettingKeys]: e.target.value,
                    }))
                  }
                  className="border rounded p-2 flex-1"
                  placeholder="Add a description"
                />
                <button
                  onClick={() => addDescription(key as CardSettingKeys)}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              {currentEditing?.key === key && (
                <div className="mt-2 flex items-center">
                  <button
                    onClick={saveEditedDescription}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
