
import React, { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { PosterState, BackgroundStyle, PositionableElement, DateCircleState } from './types';
import PosterCanvas from './components/PosterCanvas';
import ControlsPanel from './components/ControlsPanel';

const App: React.FC = () => {
  const [posterState, setPosterState] = useState<PosterState>({
    topText: "JAMHURI YA MUUNGANO WA TANZANIA\nWIZARA YA FEDHA\nSOKO LA BIDHAA TANZANIA",
    heading: {
      content: "DENGU",
      position: { x: 5, y: 55 },
      downloadPosition: { x: 5, y: 45 },
    },
    paragraph: {
      content: "TMX, COPRA, WRRB, TCDC na Serikali ya Mikoa ya Singida na Dodoma Zinawataarifu Wanunuzi na Wadau wote kushiriki mnada wa zao la DENGU Mikoa ya Singida na Dodoma.\n\nMnada utafanyika Jumatano, tarehe 09/07/2025 Kuanzia saa Nne na nusu Asubuhi Kwa njia ya kielektroniki.\n\nKaribuni wote",
      position: { x: 5, y: 68 },
      downloadPosition: { x: 5, y: 57 },
    },
    backgroundImage: "https://i.imgur.com/G5GYDPh.jpeg",
    backgroundStyle: {
      objectFit: 'cover',
      objectPosition: 'center center',
    },
    headerFooterBackgroundColor: "#fefadf", // A light yellow color
    dateCircle: {
      position: { x: 15, y: 35 },
      downloadPosition: { x: 15, y: 35 },
      topText: {
        content: "Tarehe",
        position: { x: 50, y: 20 },
        downloadPosition: { x: 50, y: 20 },
      },
      mainText: {
        content: "09",
        position: { x: 50, y: 35 },
        downloadPosition: { x: 50, y: 35 },
      },
      bottomText: {
        content: "Julai\n2025",
        position: { x: 50, y: 80 },
        downloadPosition: { x: 50, y: 80 },
      },
    },
    topLeftLogo: "./components/images/cat.png", // Placeholder for Coat of Arms
    topRightLogo: "./components/images/tmxlogo2.png", // Placeholder for TMX PLC
    footerLogos: [
      "./components/images/tmxlogo2.png", // TMX PLC
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

  const handleNestedChange = useCallback((path: (string | number)[], value: any) => {
    setPosterState(prevState => {
      const newState = JSON.parse(JSON.stringify(prevState));
      let current = newState;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newState;
    });
  }, []);

  const handleContentUpdate = useCallback((content: Partial<PosterState>) => {
    setPosterState(prevState => {
      const newState = { ...prevState };
      if (content.topText) newState.topText = content.topText;
      if (content.footerLogos) newState.footerLogos = content.footerLogos;
      
      if (content.heading?.content) {
        newState.heading = { ...prevState.heading, content: content.heading.content };
      }
      if (content.paragraph?.content) {
        newState.paragraph = { ...prevState.paragraph, content: content.paragraph.content };
      }
      if (content.dateCircle) {
        const newDateCircle = { ...prevState.dateCircle };
        if (content.dateCircle.topText?.content) newDateCircle.topText = { ...prevState.dateCircle.topText, content: content.dateCircle.topText.content };
        if (content.dateCircle.mainText?.content) newDateCircle.mainText = { ...prevState.dateCircle.mainText, content: content.dateCircle.mainText.content };
        if (content.dateCircle.bottomText?.content) newDateCircle.bottomText = { ...prevState.dateCircle.bottomText, content: content.dateCircle.bottomText.content };
        newState.dateCircle = newDateCircle;
      }
      return newState;
    });
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
    const posterElement = document.getElementById('download-poster');
    if (posterElement) {
        setIsDownloading(true);
        html2canvas(posterElement, {
            scale: 1,
            useCORS: true,
            backgroundColor: null,
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
            setIsDownloading(false);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
       {/* Hidden canvas for high-quality download */}
       <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '1000px', height: '1000px' }}>
        <PosterCanvas {...posterState} id="download-poster" useDownloadLayout={true} />
      </div>

      <header className="bg-gray-800 p-4 shadow-lg z-20">
        <h1 className="text-2xl font-bold text-center text-teal-300">Social Media Poster Designer</h1>
      </header>
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <div className="lg:w-1/3 xl:w-1/4 bg-gray-800 rounded-lg p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          <ControlsPanel 
            posterState={posterState}
            onStateChange={handleStateChange}
            onContentUpdate={handleContentUpdate}
            onBackgroundStyleChange={handleBackgroundStyleChange}
            onNestedChange={handleNestedChange}
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        </div>
        <div className="flex-grow flex items-center justify-center lg:w-2/3 xl:w-3/4 p-4 bg-gray-900/50 rounded-lg">
          <div className="w-full max-w-[1000px] aspect-square">
            <PosterCanvas {...posterState} id="visible-poster" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
