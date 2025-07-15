
import React, { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { PosterState, BackgroundStyle, DateCircleContent } from './types';
import PosterCanvas from './components/PosterCanvas';
import ControlsPanel from './components/ControlsPanel';

const App: React.FC = () => {
  const [posterState, setPosterState] = useState<PosterState>({
    topText: "JAMHURI YA MUUNGANO WA TANZANIA\nWIZARA YA FEDHA\nSOKO LA BIDHAA TANZANIA",
    heading: "DENGU",
    paragraph: "TMX, COPRA, WRRB, TCDC na Serikali ya Mikoa ya Singida na Dodoma Zinawataarifu Wanunuzi na Wadau wote kushiriki mnada wa zao la DENGU Mikoa ya Singida na Dodoma.\n\nMnada utafanyika Jumatano, tarehe 09/07/2025 Kuanzia saa Nne na nusu Asubuhi Kwa njia ya kielektroniki.\n\nKaribuni wote",
    backgroundImage: "https://i.imgur.com/G5GYDPh.jpeg",
    backgroundStyle: {
      objectFit: 'cover',
      objectPosition: 'center center',
    },
    headerFooterBackgroundColor: "#fefadf", // A light yellow color
    dateCircle: {
      topText: "Tarehe",
      mainText: "09",
      bottomText: "Julai\n2025",
    },
    topLeftLogo: "./components/images/cat.png", // Placeholder for Coat of Arms
    topRightLogo: "./components/images/tmx.svg", // Placeholder for TMX PLC
    footerLogos: [
      "./components/images/tmx.svg", // TMX PLC
      "./components/images/WRRB.png", // WRRB
      "./components/images/copra.png", // COPRA
      "./components/images/TCDC.png", // CBT
      "./components/images/cbt.png", // TCDC
      "./components/images/tcb.png", // TCB
    ],
  });
  
  const [isDownloading, setIsDownloading] = useState(false);

  const handleStateChange = useCallback(<K extends keyof PosterState>(key: K, value: PosterState[K]) => {
    setPosterState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, []);

  const handleContentUpdate = useCallback((content: Partial<PosterState>) => {
    setPosterState(prevState => ({
      ...prevState,
      ...content,
    }));
  }, []);

  const handleDateCircleChange = useCallback((key: keyof DateCircleContent, value: string) => {
    setPosterState(prevState => ({
      ...prevState,
      dateCircle: {
        ...prevState.dateCircle,
        [key]: value,
      }
    }));
  }, []);

  const handleBackgroundStyleChange = useCallback((key: keyof BackgroundStyle, value: string) => {
    setPosterState(prevState => ({
      ...prevState,
      backgroundStyle: {
        ...prevState.backgroundStyle,
        [key]: value,
      }
    }));
  }, []);
  
  const handleDownload = useCallback(() => {
    const posterElement = document.getElementById('poster-canvas');
    if (posterElement) {
        setIsDownloading(true);

        html2canvas(posterElement, {
            width: 1000,
            height: 1000,
            scale: 1, // Use scale 1 for 1000x1000 output
            useCORS: true,
            backgroundColor: null, // Use transparent background for canvas capture
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = 'poster.png';
            link.href = canvas.toDataURL('image/png');
            
            // Append link to body, click, and remove for robust download triggering
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsDownloading(false);
        }).catch((err: any) => {
            console.error("Failed to download poster:", err);
            alert("An error occurred while downloading the poster. Check the console for details.");
            setIsDownloading(false);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <header className="bg-gray-800 p-4 shadow-lg z-20">
        <h1 className="text-2xl font-bold text-center text-teal-300">Social Media Poster Designer</h1>
      </header>
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <div className="lg:w-1/3 xl:w-1/4 bg-gray-800 rounded-lg p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          <ControlsPanel 
            posterState={posterState}
            onStateChange={handleStateChange}
            onContentUpdate={handleContentUpdate}
            onDateCircleChange={handleDateCircleChange}
            onBackgroundStyleChange={handleBackgroundStyleChange}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        </div>
        <div className="flex-grow flex items-center justify-center lg:w-2/3 xl:w-3/4 p-4 bg-gray-900/50 rounded-lg">
          <PosterCanvas {...posterState} />
        </div>
      </main>
    </div>
  );
};

export default App;