
export interface DateCircleContent {
  topText: string;
  mainText: string;
  bottomText: string;
}

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface BackgroundStyle {
  objectFit: ObjectFit;
  objectPosition: string;
}

export interface PosterState {
  topText: string;
  heading: string;
  paragraph: string;
  backgroundImage: string | null;
  backgroundStyle: BackgroundStyle;
  backgroundOverlayColor: string;
  headerFooterBackgroundColor: string;
  dateCircle: DateCircleContent;
  topLeftLogo: string | null;
  topRightLogo: string | null;
  footerLogos: string[];
}