export interface Space {
  _id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  images: string[];
  amenities: string[];
  capacity: number;
  price: number;
  rating: number;
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
  location: {
    type: string;
    coordinates: number[];
  };
  createdAt: string;
  updatedAt: string;
  available: boolean;
  pricePerHour: number;
  availability: {
    start: string;
    end: string;
  };
} 