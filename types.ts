export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface BackgroundStyle {
  objectFit: ObjectFit;
  objectPosition: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface PositionableElement {
  content: string;
  position: Position;
  downloadPosition?: Position; // Optional override for download
}

export interface DateCircleState {
  position: Position;
  downloadPosition?: Position; // Optional override for download
  topText: PositionableElement;
  mainText: PositionableElement;
  bottomText: PositionableElement;
}

export interface PosterState {
  topText: string;
  heading: PositionableElement;
  paragraph: PositionableElement;
  backgroundImage: string | null;
  backgroundStyle: BackgroundStyle;
  headerFooterBackgroundColor: string;
  dateCircle: DateCircleState;
  topLeftLogo: string | null;
  topRightLogo: string | null;
  footerLogos: string[];
}