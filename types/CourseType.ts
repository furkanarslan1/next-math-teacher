// export interface CourseType {
//   id: number;
//   slug: string;
//   title: string;
//   shortDescription: string;
//   price: number;
//   image: string;
// }

export interface CourseType {
  id: string; // UUID olduğu için string
  title: string;
  slug: string;
  price: number;
  discount_percentage: number;
  short_description: string;
  description: string;
  image_url: string;
  is_active: boolean;

  features: string[];

  category_id?: string;
  course_categories?: {
    category_id: string;
    categories?: {
      name: string;
    };
  }[];
  created_at?: string;
}
