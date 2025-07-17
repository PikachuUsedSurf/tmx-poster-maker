import { PosterState, PositionableElement } from '../../types';
import { CropName, CROP_TRANSLATIONS_SW, CROP_NAMES_EN, ORGANIZATION_MAP, LOGO_URL_MAP } from './constants';

const toCamelCase = (str: string): string => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
};

const formatList = (items: string[], lang: 'sw' | 'en'): string => {
    const conjunction = lang === 'sw' ? 'na' : 'and';
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
    return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items[items.length - 1]}`;
};

const SWAHILI_NUMBERS: Record<number, string> = {
    1: 'Moja', 2: 'Mbili', 3: 'Tatu', 4: 'Nne', 5: 'Tano', 6: 'Sita',
    7: 'Saba', 8: 'Nane', 9: 'Tisa', 10: 'Kumi', 11: 'Kumi na Moja', 12: 'Kumi na Mbili'
};

const getSwahiliPeriod = (hour: number): string => {
    if (hour >= 5 && hour < 12) return 'Asubuhi'; // Morning
    if (hour >= 12 && hour < 16) return 'Mchana'; // Afternoon
    if (hour >= 16 && hour < 19) return 'Jioni'; // Evening
    return 'Usiku'; // Night
};

const formatTime = (time: string, lang: 'sw' | 'en'): string => {
    const [hour, minute] = time.split(':').map(Number);
    
    if (lang === 'en') {
        const ampm = hour >= 12 ? 'PM' : 'AM';
        let h12 = hour % 12;
        if (h12 === 0) h12 = 12;
        const formattedMinute = minute.toString().padStart(2, '0');
        return `${h12}:${formattedMinute} ${ampm}`;
    }

    // Swahili Time Logic
    let swahiliHour = hour >= 7 ? hour - 6 : hour + 6;
    if (swahiliHour > 12) swahiliHour -= 12;
    if (swahiliHour === 0) swahiliHour = 12;

    const period = getSwahiliPeriod(hour);
    const swahiliHourWord = SWAHILI_NUMBERS[swahiliHour];

    if (minute === 0) return `Saa ${swahiliHourWord} kamili ${period}`;
    if (minute === 15) return `Saa ${swahiliHourWord} na robo ${period}`;
    if (minute === 30) return `Saa ${swahiliHourWord} na nusu ${period}`;
    
    const nextSwahiliHour = (swahiliHour % 12) + 1;
    const nextSwahiliHourWord = SWAHILI_NUMBERS[nextSwahiliHour];

    if (minute === 45) return `Saa ${nextSwahiliHourWord} kasorobo ${period}`;
    if (minute < 30) return `Saa ${swahiliHourWord} na dakika ${minute} ${period}`;
    
    // minute > 30 and not 45
    const minutesToNextHour = 60 - minute;
    return `Saa ${nextSwahiliHourWord} kasoro dakika ${minutesToNextHour} ${period}`;
};


export const generatePosterContent = (locations: string[], crop: CropName, date: string, time: string, lang: 'sw' | 'en'): Partial<PosterState> => {
    const formattedLocations = formatList(locations.map(toCamelCase), lang);
    const organizations = ORGANIZATION_MAP[crop] || [];
    const formattedOrganizations = formatList(organizations, lang);
    const formattedTime = formatTime(time, lang);
    
    const dateObj = new Date(date + 'T12:00:00Z'); 
    
    const day = dateObj.toLocaleDateString("en-GB", { day: '2-digit' });
    const swahiliMonth = dateObj.toLocaleDateString("sw-TZ", { month: 'long' });
    const englishMonth = dateObj.toLocaleDateString("en-US", { month: 'long' });
    const year = dateObj.getFullYear();
    const swahiliWeekday = dateObj.toLocaleDateString("sw-TZ", { weekday: 'long' });
    const englishWeekday = dateObj.toLocaleDateString("en-US", { weekday: 'long' });
    const fullDateGB = dateObj.toLocaleDateString("en-GB");

    let topText: string;
    let heading: string;
    let paragraph: string;
    let dateCircleContent: { topText: PositionableElement, mainText: PositionableElement, bottomText: PositionableElement };

    if (lang === 'sw') {
        const cropSwahili = CROP_TRANSLATIONS_SW[crop];
        topText = `JAMHURI YA MUUNGANO WA TANZANIA\nWIZARA YA FEDHA\nSOKO LA BIDHAA TANZANIA`;
        heading = cropSwahili.toUpperCase();
        paragraph = `TMX, ${formattedOrganizations} na Serikali ya Mikoa ya **${formattedLocations}** Zinawataarifu Wanunuzi na Wadau wote kushiriki mnada wa zao la ${cropSwahili.toLowerCase()} Mikoa ya **${formattedLocations}**.\n\nMnada utafanyika **${swahiliWeekday}**, tarehe **${fullDateGB}** Kuanzia **${formattedTime}** Kwa njia ya kielektroniki.\n\nKaribuni wote`;
        dateCircleContent = {
            topText: { content: "Tarehe", position: { x: 0, y: 0 } },
            mainText: { content: day, position: { x: 0, y: 0 } },
            bottomText: { content: `${swahiliMonth}\n${year}`, position: { x: 0, y: 0 } },
        };
    } else { // lang === 'en'
        const cropEnglish = CROP_NAMES_EN[crop];
        const regionText = `Region${locations.length > 1 ? 's' : ''}`;
        
        topText = `THE UNITED REPUBLIC OF TANZANIA\nMINISTRY OF FINANCE\nTANZANIA MERCANTILE EXCHANGE`;
        heading = cropEnglish.toUpperCase();
        paragraph = `TMX, ${formattedOrganizations} and the Regional Government of **${formattedLocations}** invite all Buyers and Stakeholders to participate in the ${cropEnglish.toLowerCase()} auction from the **${formattedLocations}** ${regionText}.\n\nThe auction will be held electronically on **${englishWeekday}**, **${fullDateGB}**, starting at **${formattedTime}**.\n\nAll are welcome`;
        dateCircleContent = {
            topText: { content: "Date", position: { x: 0, y: 0 } },
            mainText: { content: day, position: { x: 0, y: 0 } },
            bottomText: { content: `${englishMonth}\n${year}`, position: { x: 0, y: 0 } },
        };
    }

    const footerLogos = [
        LOGO_URL_MAP["TMX"],
        ...organizations.map(org => LOGO_URL_MAP[org]).filter(Boolean)
    ].filter((value, index, self) => self.indexOf(value) === index);

    return {
        topText,
        heading: { content: heading, position: {x:0, y:0} }, // Position is a dummy, will be ignored
        paragraph: { content: paragraph, position: {x:0, y:0} }, // Position is a dummy, will be ignored
        dateCircle: {
            ...dateCircleContent,
            position: {x:0, y:0} // Position is a dummy, will be ignored
        },
        footerLogos,
    };
}