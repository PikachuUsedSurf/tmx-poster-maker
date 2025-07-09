import { PosterState, DateCircleContent } from '../../types';
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

export const generatePosterContent = (locations: string[], crop: CropName, date: string, lang: 'sw' | 'en'): Partial<PosterState> => {
    const formattedLocations = formatList(locations.map(toCamelCase), lang);
    const organizations = ORGANIZATION_MAP[crop] || [];
    const formattedOrganizations = formatList(organizations, lang);
    
    // Use UTC date to avoid timezone issues with date-only strings
    const dateObj = new Date(date + 'T12:00:00Z'); 
    
    // Date parts
    const day = dateObj.toLocaleDateString("en-GB", { day: '2-digit' });
    const swahiliMonth = dateObj.toLocaleDateString("sw-TZ", { month: 'long' });
    const englishMonth = dateObj.toLocaleDateString("en-US", { month: 'long' });
    const year = dateObj.getFullYear();
    const swahiliWeekday = dateObj.toLocaleDateString("sw-TZ", { weekday: 'long' });
    const englishWeekday = dateObj.toLocaleDateString("en-US", { weekday: 'long' });
    const fullDateGB = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY

    // Content variables
    let topText: string;
    let heading: string;
    let paragraph: string;
    let dateCircle: DateCircleContent;

    if (lang === 'sw') {
        const cropSwahili = CROP_TRANSLATIONS_SW[crop];
        topText = `JAMHURI YA MUUNGANO WA TANZANIA\nWIZARA YA FEDHA\nSOKO LA BIDHAA TANZANIA`;
        heading = cropSwahili.toUpperCase();
        paragraph = `TMX, ${formattedOrganizations} na Serikali ya Mikoa ya ${formattedLocations} Zinawataarifu Wanunuzi na Wadau wote kushiriki mnada wa zao la ${cropSwahili.toLowerCase()} Mikoa ya ${formattedLocations}.\n\nMnada utafanyika ${swahiliWeekday}, tarehe ${fullDateGB} Kuanzia saa Nne na nusu Asubuhi Kwa njia ya kielektroniki.\n\nKaribuni wote`;
        dateCircle = {
            topText: "Tarehe",
            mainText: day,
            bottomText: `${swahiliMonth}\n${year}`,
        };
    } else { // lang === 'en'
        const cropEnglish = CROP_NAMES_EN[crop];
        const regionText = `Region${locations.length > 1 ? 's' : ''}`;
        
        topText = `THE UNITED REPUBLIC OF TANZANIA\nMINISTRY OF FINANCE\nTANZANIA MERCANTILE EXCHANGE`;
        heading = cropEnglish.toUpperCase();
        paragraph = `TMX, ${formattedOrganizations} and the Regional Government of ${formattedLocations} invite all Buyers and Stakeholders to participate in the ${cropEnglish.toLowerCase()} auction from the ${formattedLocations} ${regionText}.\n\nThe auction will be held electronically on ${englishWeekday}, ${fullDateGB}, starting at 10:30 AM.\n\nAll are welcome`;
        dateCircle = {
            topText: "Date",
            mainText: day,
            bottomText: `${englishMonth}\n${year}`,
        };
    }

    const footerLogos = [
        LOGO_URL_MAP["TMX"],
        ...organizations.map(org => LOGO_URL_MAP[org]).filter(Boolean)
    ].filter((value, index, self) => self.indexOf(value) === index); // Ensure unique logos

    return {
        topText,
        heading,
        paragraph,
        dateCircle,
        footerLogos,
    };
}