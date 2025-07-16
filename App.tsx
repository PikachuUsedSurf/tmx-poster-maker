
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
    topRightLogo: "./components/images/tmxlogo.png", // Placeholder for TMX PLC
    footerLogos: [
      "./components/images/tmxlogo.png", // TMX PLC
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
        
        // To ensure consistent rendering across devices, we create a temporary,
        // off-screen element with a fixed size (1000x1000px) for html2canvas to use.
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        
        // Clone the poster element to avoid affecting the one on screen.
        const clone = posterElement.cloneNode(true) as HTMLElement;
        
        // Remove responsive Tailwind classes and apply fixed dimensions to the clone.
        // This is the key to ensuring the downloaded poster is always 1000x1000px.
        clone.style.width = '1000px';
        clone.style.height = '1000px';
        clone.style.maxWidth = 'none';
        clone.style.aspectRatio = 'auto';
        
        container.appendChild(clone);
        document.body.appendChild(container);

        html2canvas(clone, {
            scale: 1, // We want a 1:1 capture of our 1000px element.
            useCORS: true,
            backgroundColor: null,
            // By not specifying width/height here, html2canvas uses the element's
            // own dimensions, which we have explicitly set to 1000x1000.
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = 'poster.png';
            link.href = canvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((err: any) => {
            console.error("Failed to download poster:", err);
            alert("An error occurred while downloading the poster. Check the console for details.");
        }).finally(() => {
            // Important: clean up the temporary container from the DOM.
            document.body.removeChild(container);
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
