export interface ICreateBanner {
  titleAZ: string;
  titleEN: string;
  titleRU: string;
  subtitleAZ?: string;
  subtitleEN?: string;
  subtitleRU?: string;
  descAZ?: string;
  descEN?: string;
  descRU?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaText2?: string;
  ctaUrl2?: string;
  imageUrl?: string;
  isActive?: boolean;
  order?: number;
}
