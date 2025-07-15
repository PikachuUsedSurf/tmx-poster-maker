import React from 'react';
import { PosterState, DateCircleContent, BackgroundStyle, } from '../types';
import TextInput from './TextInput';
import ImageUpload from './ImageUpload';
import Accordion from './Accordion';
import { DownloadIcon } from './icons';
import ContentGenerator from './content-generator';

interface ControlsPanelProps {
  posterState: PosterState;
  onStateChange: <K extends keyof PosterState>(key: K, value: PosterState[K]) => void;
  onContentUpdate: (content: Partial<PosterState>) => void;
  onDateCircleChange: (key: keyof DateCircleContent, value: string) => void;
  onBackgroundStyleChange: (key: keyof BackgroundStyle, value: string) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  posterState,
  onStateChange,
  onContentUpdate,
  onDateCircleChange,
  onBackgroundStyleChange,
  onDownload,
  isDownloading
}) => {
    
  const handleFooterLogoChange = (index: number, value: string) => {
    const newLogos = [...posterState.footerLogos];
    newLogos[index] = value;
    onStateChange('footerLogos', newLogos);
  };

  const addFooterLogo = () => {
    onStateChange('footerLogos', [...posterState.footerLogos, '']);
  };

  const removeFooterLogo = (index: number) => {
    const newLogos = posterState.footerLogos.filter((_, i) => i !== index);
    onStateChange('footerLogos', newLogos);
  };

  return (
    <div className="space-y-4 text-gray-200">
      <h2 className="text-xl font-bold text-center text-teal-300 mb-6">Editing Controls</h2>
      
      <Accordion title="Content Generator">
        <ContentGenerator onApplyContent={onContentUpdate} />
      </Accordion>
      
      <Accordion title="Text Content">
        <TextInput
          label="Top Center Text"
          isTextarea={true}
          value={posterState.topText}
          onChange={(e) => onStateChange('topText', e.target.value)}
          rows={3}
        />
        <TextInput
          label="Main Heading"
          value={posterState.heading}
          onChange={(e) => onStateChange('heading', e.target.value)}
        />
        <TextInput
          label="Main Paragraph"
          isTextarea={true}
          value={posterState.paragraph}
          onChange={(e) => onStateChange('paragraph', e.target.value)}
          rows={8}
        />
      </Accordion>
      
      <Accordion title="Date Circle">
        <TextInput
          label="Top Text (e.g., 'Tarehe')"
          value={posterState.dateCircle.topText}
          onChange={(e) => onDateCircleChange('topText', e.target.value)}
        />
        <TextInput
          label="Main Text (e.g., '09')"
          value={posterState.dateCircle.mainText}
          onChange={(e) => onDateCircleChange('mainText', e.target.value)}
        />
        <TextInput
          label="Bottom Text (e.g., 'Julai 2025')"
          isTextarea={true}
          value={posterState.dateCircle.bottomText}
          onChange={(e) => onDateCircleChange('bottomText', e.target.value)}
          rows={2}
        />
      </Accordion>

      <Accordion title="Background">
        <ImageUpload
          label="Background Image"
          onUpload={(url) => onStateChange('backgroundImage', url)}
          currentImage={posterState.backgroundImage}
        />
         <div className="mt-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">Header/Footer Background Color</label>
            <input
                type="color"
                value={posterState.headerFooterBackgroundColor.slice(0, 7)}
                onChange={(e) => onStateChange('headerFooterBackgroundColor', `${e.target.value}4D`)} // Appends 30% opacity
                className="w-full h-10 p-1 bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
            />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image Fit</label>
                <select 
                    value={posterState.backgroundStyle.objectFit} 
                    onChange={e => onBackgroundStyleChange('objectFit', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="fill">Fill</option>
                    <option value="none">None</option>
                    <option value="scale-down">Scale Down</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image Position</label>
                 <select 
                    value={posterState.backgroundStyle.objectPosition} 
                    onChange={e => onBackgroundStyleChange('objectPosition', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                 </select>
            </div>
        </div>
      </Accordion>

      <Accordion title="Logos">
        <ImageUpload
            label="Top Left Logo"
            onUpload={(url) => onStateChange('topLeftLogo', url)}
            currentImage={posterState.topLeftLogo}
        />
        <ImageUpload
            label="Top Right Logo"
            onUpload={(url) => onStateChange('topRightLogo', url)}
            currentImage={posterState.topRightLogo}
        />
        <div>
            <h4 className="text-md font-semibold mt-4 mb-2 text-gray-300">Footer Logos</h4>
            {posterState.footerLogos.map((logo, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                    <ImageUpload
                        label={`Footer Logo ${index + 1}`}
                        onUpload={(url) => handleFooterLogoChange(index, url)}
                        currentImage={logo}
                        isCompact={true}
                    />
                    <button onClick={() => removeFooterLogo(index)} className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                        X
                    </button>
                </div>
            ))}
            <button onClick={addFooterLogo} className="w-full mt-2 p-2 bg-teal-600 hover:bg-teal-700 rounded-md transition-colors">
                + Add Footer Logo
            </button>
        </div>
      </Accordion>

      <div className="pt-4">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          <DownloadIcon />
          {isDownloading ? 'Downloading...' : 'Download Poster'}
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel;
