export interface TestimonialTag {
  label: string;
  bg: string;
  text: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  comment: string;
  highlightedText: string;
  rating: number;
  isFeatured?: boolean;
  avatarBg: string;
  tags: TestimonialTag[];
}
