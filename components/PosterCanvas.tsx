import React from 'react';
import { PosterState, Position } from '../types';

const OVERLAY_IMAGE_URL = "./components/images/overlay.png";

interface PosterCanvasProps extends PosterState {
  id: string;
  useDownloadLayout?: boolean;
}

const PosterCanvas: React.FC<PosterCanvasProps> = ({
  id,
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
  useDownloadLayout = false,
}) => {
  const getPos = (
    element: { position: Position; downloadPosition?: Position }
  ): Position => {
    return (useDownloadLayout && element.downloadPosition)
      ? element.downloadPosition
      : element.position;
  };

  const headingPos = getPos(heading);
  const paragraphPos = getPos(paragraph);
  const dateCirclePos = getPos(dateCircle);
  const dateCircleTopTextPos = getPos(dateCircle.topText);
  const dateCircleMainTextPos = getPos(dateCircle.mainText);
  const dateCircleBottomTextPos = getPos(dateCircle.bottomText);

  return (
    <div
      id={id}
      className="w-full h-full bg-[#002f2f] relative overflow-hidden shadow-2xl text-white"
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
          opacity: 1
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

      {/* Body Section - Container for absolutely positioned elements */}
      <main className="absolute top-0 left-0 w-full h-full z-0">
          
          {/* Date Circle Wrapper - Positioned via props */}
          <div
            className="absolute z-20"
            style={{
              top: `${dateCirclePos.y}%`,
              left: `${dateCirclePos.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="bg-[#009A9A] rounded-full w-[200px] h-[200px] text-center p-4 shadow-lg relative">
              {/* Positionable text elements inside the circle */}
              <div
                className="absolute text-lg font-medium w-full"
                style={{ top: `${dateCircleTopTextPos.y}%`, left: `${dateCircleTopTextPos.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                  {dateCircle.topText.content}
              </div>
               <div
                className="absolute text-7xl font-bold leading-none my-1 w-full"
                style={{ top: `${dateCircleMainTextPos.y}%`, left: `${dateCircleMainTextPos.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                  {dateCircle.mainText.content}
              </div>
              <div
                className="absolute text-lg font-medium whitespace-pre-wrap w-full"
                style={{ top: `${dateCircleBottomTextPos.y}%`, left: `${dateCircleBottomTextPos.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                 {dateCircle.bottomText.content}
              </div>
            </div>
          </div>

          {/* Heading - Positioned via props */}
          <div
            className="absolute"
            style={{
              top: `${headingPos.y}%`,
              left: `${headingPos.x}%`,
              width: `calc(95% - ${headingPos.x}%)`,
            }}
          >
            <h1 className="text-8xl font-extrabold tracking-wider">{heading.content}</h1>
          </div>
          
          {/* Paragraph - Positioned via props */}
          <div
            className="absolute"
            style={{
              top: `${paragraphPos.y}%`,
              left: `${paragraphPos.x}%`,
              width: `calc(95% - ${paragraphPos.x}%)`,
            }}
          >
            <p className="text-2xl text-justify max-w-4xl whitespace-pre-wrap leading-relaxed">{paragraph.content}</p>
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