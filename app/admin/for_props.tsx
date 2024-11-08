'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { updateDesc, deleteDesc, createDesc } from '@/actions';

// Define the type for card setting keys
type CardSettingKeys = 'announcements' | 'birthdays' | 'trainings' | 'tasks';

const AdminSettings = ({ description }: { description: any }) => {
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

    // State for card settings descriptions (initialized with empty arrays)
    const [cardSettings, setCardSettings] = useState<Record<CardSettingKeys, { id: string; text: string }[]>>({
        announcements: [],
        birthdays: [],
        trainings: [],
        tasks: []
    });

    // State for new description inputs for each card
    const [newDescriptions, setNewDescriptions] = useState<Record<CardSettingKeys, string>>({
        announcements: '',
        birthdays: '',
        trainings: '',
        tasks: ''
    });

    const [currentEditing, setCurrentEditing] = useState<{ key: CardSettingKeys; index: number } | null>(null);

    useEffect(() => {
        // Load dark mode from localStorage
        try {
            const darkMode = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
            setIsDarkMode(darkMode);
        } catch (error) {
            console.error('Error loading dark mode from localStorage:', error);
        }

        // Load selected image from localStorage
        try {
            const savedImage = localStorage.getItem('selectedImage');
            if (savedImage) setSelectedImage(savedImage);
        } catch (error) {
            console.error('Error loading image from localStorage:', error);
        }

        // Load card colors from localStorage
        try {
            const savedColors = localStorage.getItem('cardColors');
            if (savedColors) {
                setCardColors(JSON.parse(savedColors));
            }
        } catch (error) {
            console.error('Error loading card colors from localStorage:', error);
        }

        // Fetch initial data for descriptions

    }, []);

    useEffect(() => {
        document.body.classList.toggle('bg-gray-800', isDarkMode);
        document.body.classList.toggle('bg-white', !isDarkMode);
        document.body.classList.toggle('text-white', isDarkMode);
        document.body.classList.toggle('text-black', !isDarkMode);

        try {
            localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        } catch (error) {
            console.error('Error saving dark mode setting:', error);
        }
    }, [isDarkMode]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedImage(result);
                try {
                    localStorage.setItem('selectedImage', result); // Save image to localStorage
                } catch (error) {
                    console.error('Error saving image to localStorage:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleColorChange = (key: string, value: string) => {
        setCardColors((prevColors) => {
            const newColors = { ...prevColors, [key]: value };
            try {
                localStorage.setItem('cardColors', JSON.stringify(newColors)); // Save color settings to localStorage
            } catch (error) {
                console.error('Error saving colors to localStorage:', error);
            }
            return newColors;
        });
    };

    // Add a new description
    const handleAddDescription = async (key: CardSettingKeys) => {
        const newDescription = newDescriptions[key];
        if (newDescription) {
            try {
                await createDesc(newDescription);
                setCardSettings((prev) => ({
                    ...prev,
                    [key]: [...prev[key], { id: '', text: newDescription }],
                }));
                setNewDescriptions((prev) => ({ ...prev, [key]: '' }));
            } catch (error) {
                console.error("Error adding description", error);
            }
        }
    };

    // Handle delete description
    const handleDeleteDescription = async (id: number) => {

        try {
            // Call the backend delete function with the descriptionId (now a string)
            await deleteDesc(id);  // Pass the string ID



            // Update the state with the new list of description
        } catch (error) {
            console.error("Error deleting description", error);
        }
    };

    // Handle update description
    const handleUpdateDescription = async (key: CardSettingKeys) => {
        const updatedDescription = newDescriptions[key];
        if (updatedDescription && currentEditing) {
            try {
                await updateDesc(currentEditing.key, updatedDescription);
                const updatedDescriptions = [...cardSettings[key]];
                updatedDescriptions[currentEditing.index] = { id: currentEditing.key, text: updatedDescription };
                setCardSettings((prev) => ({
                    ...prev,
                    [key]: updatedDescriptions,
                }));
                setCurrentEditing(null);
                setNewDescriptions((prev) => ({ ...prev, [key]: '' }));
            } catch (error) {
                console.error("Error updating description", error);
            }
        }
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
                <div>
                    <h2 className="text-lg font-semibold mb-2">Upload Icon</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-2"
                    />
                    {selectedImage && (
                        <div className="mb-4">
                            <Image src={selectedImage} alt="Uploaded icon" width={100} height={100} />
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'colors' && (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Card Colors</h2>
                    {Object.keys(cardColors).map((key) => (
                        <div key={key} className="flex items-center mb-2">
                            <label className="mr-2">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                type="color"
                                value={cardColors[key as CardSettingKeys]}
                                onChange={(e) => handleColorChange(key, e.target.value)}
                                className="w-10 h-10"
                            />
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'cardSettings' && (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Card Settings</h2>
                    {Object.keys(cardSettings).map((key) => (
                        <div key={key} className="mb-4">
                            <h3 className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                            <input
                                type="text"
                                value={newDescriptions[key as CardSettingKeys]}
                                onChange={(e) => setNewDescriptions((prev) => ({ ...prev, [key]: e.target.value }))}
                                className="input input-bordered w-full mb-2"
                                placeholder={`Enter new ${key}`}
                            />
                            <ul>{description.map((description: any, index: number) => <li key={index}>{description?.text}</li>)}</ul>
                            <button
                                onClick={() => handleAddDescription(key as CardSettingKeys)}
                                className="btn btn-primary mb-2"
                            >
                                Add Description
                            </button>
                            {description.map((description: any, index: number) => (
                                <div key={description.id} className="flex justify-between items-center mb-2">
                                    <span>{description.text}</span>
                                    <div>
                                        <button

                                            onClick={() => handleDeleteDescription(description.id)}

                                            className="btn btn-error btn-sm"

                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
