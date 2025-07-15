import React from 'react';
import { PosterState } from '../types';

const OVERLAY_IMAGE_URL = "./components/images/overlay.png";

const PosterCanvas: React.FC<PosterState> = ({
  topText,
  heading,
  paragraph,
  backgroundImage,
  backgroundStyle,
  headerFooterBackgroundColor,
  dateCircle,
  topLeftLogo,
  topRightLogo,
  footerLogos,
}) => {
  return (
    <div
      id="poster-canvas"
      className="w-full max-w-[1000px] aspect-square bg-[#002f2f] relative overflow-hidden shadow-2xl text-white"
    >
      {/* Background Image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: backgroundStyle.objectFit,
            objectPosition: backgroundStyle.objectPosition,
          }}
          crossOrigin="anonymous"
        />
      )}

      {/* Full Canvas Overlay Image */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ 
          backgroundImage: `url(${OVERLAY_IMAGE_URL})`,
          mixBlendMode: 'normal',
          opacity: 100
        }}
      />
      
      {/* Header Section - Positioned Absolutely */}
      <header 
          className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 py-4 shadow-lg z-10" 
          style={{ backgroundColor: headerFooterBackgroundColor }}
      >
        <div className="w-1/4 flex justify-start">
          {topLeftLogo && <img src={topLeftLogo} alt="Top Left Logo" className="max-h-[60px] w-auto" crossOrigin="anonymous" />}
        </div>
        <div className="w-1/2 text-center font-bold text-black text-lg leading-tight whitespace-pre-wrap">
          {topText}
        </div>
        <div className="w-1/4 flex justify-end">
          {topRightLogo && <img src={topRightLogo} alt="Top Right Logo" className="max-h-[60px] w-auto" crossOrigin="anonymous" />}
        </div>
      </header>

      {/* Body Section - Padded to avoid header/footer */}
      <main className="relative w-full h-full flex flex-col justify-center items-start z-0 px-10 box-border pt-[120px] pb-[120px]">
          {/* This container preserves the inner layout of the text and date circle */}
          <div className="relative w-full flex-grow flex flex-col justify-center items-start">
            <div className="absolute top-0 left-0 translate-y-1/2 z-20">
              <div className="bg-[#009A9A] rounded-full w-[200px] h-[200px] flex flex-col justify-center items-center text-center p-4 shadow-lg">
                <span className="text-lg font-medium">{dateCircle.topText}</span>
                <span className="text-7xl font-bold leading-none my-1">{dateCircle.mainText}</span>
                <span className="text-lg font-medium whitespace-pre-wrap">{dateCircle.bottomText}</span>
              </div>
            </div>
            <div className="pl-[10px] pt-[300px] w-full">
              <h1 className="text-8xl font-extrabold tracking-wider">{heading}</h1>
              <p className="mt-6 text-2xl text-justify max-w-4xl whitespace-pre-wrap leading-relaxed">{paragraph}</p>
            </div>
          </div>
      </main>
      
      {/* Footer Logos - Positioned Absolutely */}
      <footer 
          className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-8 px-10 py-4 shadow-lg z-10"
          style={{ backgroundColor: headerFooterBackgroundColor }}
      >
          {footerLogos.map((logo, index) => (
              <img key={index} src={logo} alt={`Footer Logo ${index + 1}`} className="max-h-[60px] max-w-[120px] object-contain" crossOrigin="anonymous" />
          ))}
      </footer>
    </div>
  );
};

export default PosterCanvas;
