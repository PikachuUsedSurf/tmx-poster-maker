import React, { useState, useEffect } from 'react';
import { PosterState } from '../../types';
import { AVAILABLE_LOCATIONS, CROPS, CropName } from './constants';
import { generatePosterContent } from './helpers';
import { CheckIcon } from '../icons';

interface ContentGeneratorProps {
    onApplyContent: (content: Partial<PosterState>) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ onApplyContent }) => {
    const [locations, setLocations] = useState<string[]>([]);
    const [crop, setCrop] = useState<CropName | "">("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("10:30");
    const [language, setLanguage] = useState<'sw' | 'en'>('sw');
    const [generated, setGenerated] = useState<Partial<PosterState> | null>(null);

    useEffect(() => {
        const today = new Date();
        const offset = today.getTimezoneOffset();
        const localDate = new Date(today.getTime() - (offset*60*1000));
        setDate(localDate.toISOString().split("T")[0]);
    }, []);

    const toggleLocation = (selectedLocation: string) => {
        setLocations(prev =>
            prev.includes(selectedLocation)
                ? prev.filter(loc => loc !== selectedLocation)
                : [...prev, selectedLocation]
        );
    };

    const toggleCrop = (selectedCrop: CropName) => {
        setCrop(prev => (prev === selectedCrop ? "" : selectedCrop));
    };

    const handleGenerate = () => {
        if (locations.length === 0 || !crop || !date || !time) {
            alert("Please select at least one location, a crop, a date, and a time.");
            return;
        }
        const content = generatePosterContent(locations, crop, date, time, language);
        setGenerated(content);
    };

    const handleApply = () => {
        if(generated) {
            // Destructure to exclude footerLogos from the object passed to onApplyContent
            const { footerLogos, ...contentToApply } = generated;
            onApplyContent(contentToApply);
            alert('Content applied to poster!');
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <div className="flex bg-gray-700 rounded-md p-1">
                    <button 
                        onClick={() => setLanguage('sw')}
                        className={`w-1/2 p-2 text-sm font-semibold rounded-md transition-colors ${language === 'sw' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        aria-pressed={language === 'sw'}
                    >
                        Swahili
                    </button>
                    <button 
                        onClick={() => setLanguage('en')}
                        className={`w-1/2 p-2 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        aria-pressed={language === 'en'}
                    >
                        English
                    </button>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Locations</label>
                <div className="flex flex-wrap gap-2">
                    {AVAILABLE_LOCATIONS.map(location => {
                        const isSelected = locations.includes(location);
                        return (
                            <button key={location} onClick={() => toggleLocation(location)} className={`relative px-3 py-1 text-sm font-medium border rounded-full transition-all duration-200 ${isSelected ? 'bg-teal-600 border-teal-500 text-white' : 'bg-gray-600 border-gray-500 hover:bg-gray-500'}`}>
                                <div className={`flex items-center transition-all duration-200 ${isSelected ? 'pr-5' : ''}`}>
                                    <span>{location}</span>
                                    {isSelected && <CheckIcon className="w-4 h-4 absolute right-2" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Crop</label>
                <div className="flex flex-wrap gap-2">
                    {CROPS.map(cropName => {
                         const isSelected = crop === cropName;
                         return (
                            <button key={cropName} onClick={() => toggleCrop(cropName)} className={`relative px-3 py-1 text-sm font-medium border rounded-full transition-all duration-200 ${isSelected ? 'bg-teal-600 border-teal-500 text-white' : 'bg-gray-600 border-gray-500 hover:bg-gray-500'}`}>
                                <div className={`flex items-center transition-all duration-200 ${isSelected ? 'pr-5' : ''}`}>
                                     <span>{cropName}</span>
                                     {isSelected && <CheckIcon className="w-4 h-4 absolute right-2" />}
                                </div>
                            </button>
                         )
                    })}
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        aria-label="Select auction date"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        aria-label="Select auction time"
                    />
                </div>
            </div>
            <button onClick={handleGenerate} className="w-full mt-2 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors font-semibold">
                Generate Poster Content
            </button>
            {generated && (
                <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-900/50 space-y-4">
                    <h4 className="text-lg font-bold text-teal-300">Generated Content Preview</h4>
                    <div>
                        <label className="text-sm font-semibold text-gray-400" id="generated-heading-label">Heading</label>
                        <p className="p-2 bg-gray-700 rounded-md text-sm mt-1" aria-labelledby="generated-heading-label">{generated.heading?.content}</p>
                    </div>
                     <div>
                        <label className="text-sm font-semibold text-gray-400" id="generated-paragraph-label">Paragraph</label>
                        <p className="p-2 bg-gray-700 rounded-md text-sm mt-1 whitespace-pre-wrap" aria-labelledby="generated-paragraph-label">{generated.paragraph?.content}</p>
                    </div>
                    <button onClick={handleApply} className="w-full mt-2 p-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors font-semibold">
                        Apply to Poster
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContentGenerator;