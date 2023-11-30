export interface HeroItem {
  url: string;
  alt: string;
  text: string;
  number: number;
  id: string;
  link: string;
  category_id: string | undefined;
  family_id: string | undefined;
  button_text: string;
}

export interface heroResponse {
  data: HeroItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
  family_id: string;
  family_name: string;
  alt: string | null;
  url: string | null;
  link: string | null;
  number: number | null;
}

export interface CategoryResponse {
  data: CategoryItem[];
}
export interface Family {
  id: string;
  name: string;
  icon: string;
}
