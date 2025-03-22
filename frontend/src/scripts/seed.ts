import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is required');
}

const DB_NAME = 'work-spot';

const dummySpaces = [
  {
    name: "Lekki Tech Hub",
    description: "Modern co-working space in the heart of Lekki Phase 1, featuring state-of-the-art facilities and a vibrant tech community.",
    address: {
      street: "123 Admiralty Way",
      city: "Lekki",
      state: "Lagos",
      zipCode: "106104"
    },
    amenities: ["wifi", "meeting_rooms", "coffee_bar", "printing", "parking", "phone_booth", "lounge"],
    capacity: 50,
    pricePerHour: 2500,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      "https://images.unsplash.com/photo-1600508774634-4e11d34730e2"
    ],
    availability: true,
    rating: 4.8,
    reviews: [
      {
        user: "user1",
        rating: 5,
        comment: "Great space with amazing amenities! Perfect for tech startups.",
        createdAt: new Date().toISOString()
      },
      {
        user: "user2",
        rating: 4,
        comment: "Good location and facilities. The internet is super fast!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Victoria Island Creative Hub",
    description: "Premium workspace in the heart of VI, perfect for creative professionals and entrepreneurs with stunning ocean views.",
    address: {
      street: "456 Adeola Odeku Street",
      city: "Victoria Island",
      state: "Lagos",
      zipCode: "101241"
    },
    amenities: ["wifi", "art_studio", "coffee_bar", "kitchen", "parking", "lounge", "phone_booth"],
    capacity: 40,
    pricePerHour: 3000,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890"
    ],
    availability: true,
    rating: 4.7,
    reviews: [
      {
        user: "user3",
        rating: 5,
        comment: "Excellent location and professional environment!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Ikeja Business Center",
    description: "Professional workspace in Ikeja CBD, ideal for businesses and remote workers with excellent transport links.",
    address: {
      street: "789 Allen Avenue",
      city: "Ikeja",
      state: "Lagos",
      zipCode: "100271"
    },
    amenities: ["wifi", "meeting_rooms", "coffee_bar", "printing", "parking", "phone_booth"],
    capacity: 35,
    pricePerHour: 2000,
    images: [
      "https://images.unsplash.com/photo-1572025442646-866d16c84a54",
      "https://images.unsplash.com/photo-1577412647305-991150c7d163",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e"
    ],
    availability: true,
    rating: 4.6,
    reviews: [
      {
        user: "user4",
        rating: 4,
        comment: "Great location in Ikeja, very accessible!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Yaba Tech Space",
    description: "Modern workspace in Lagos' tech district, perfect for startups and tech enthusiasts with high-speed internet.",
    address: {
      street: "234 Herbert Macaulay Way",
      city: "Yaba",
      state: "Lagos",
      zipCode: "101212"
    },
    amenities: ["wifi", "meeting_rooms", "coffee_bar", "game_room", "parking", "phone_booth", "lounge"],
    capacity: 45,
    pricePerHour: 1800,
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
      "https://images.unsplash.com/photo-1562664377-709f2c337eb2"
    ],
    availability: true,
    rating: 4.9,
    reviews: [
      {
        user: "user5",
        rating: 5,
        comment: "Perfect for tech startups! Great community.",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Ikoyi Executive Hub",
    description: "Luxury workspace in Ikoyi featuring premium amenities and spectacular city views.",
    address: {
      street: "567 Awolowo Road",
      city: "Ikoyi",
      state: "Lagos",
      zipCode: "101233"
    },
    amenities: ["wifi", "meeting_rooms", "coffee_bar", "gym", "parking", "phone_booth", "lounge"],
    capacity: 30,
    pricePerHour: 3500,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094",
      "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e",
      "https://images.unsplash.com/photo-1564069114553-7215e1ff1890"
    ],
    availability: true,
    rating: 4.8,
    reviews: [
      {
        user: "user6",
        rating: 5,
        comment: "Premium workspace with excellent service!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Startup Hub",
    description: "Dedicated space for startups and entrepreneurs",
    address: {
      street: "789 Innovation Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "78701"
    },
    amenities: ["private_offices", "phone_booths", "gym", "cafeteria", "shower"],
    capacity: 100,
    pricePerHour: 35,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.9,
    reviews: [
      {
        user: "user3",
        rating: 5,
        comment: "Best co-working space for startups!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "The Green Office",
    description: "Eco-friendly workspace with sustainable design and practices",
    address: {
      street: "421 Green Street",
      city: "Portland",
      state: "OR",
      zipCode: "97201"
    },
    amenities: ["High-Speed WiFi", "Bike Storage", "Solar Power", "Recycling Program", "Standing Desks", "Garden Terrace"],
    capacity: 45,
    pricePerHour: 22,
    images: [
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.7,
    reviews: [
      {
        user: "user4",
        rating: 5,
        comment: "Love the eco-friendly approach and garden space!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Urban Desk Chicago",
    description: "Premium workspace in Chicago's bustling business district",
    address: {
      street: "567 Michigan Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    amenities: ["24/7 Access", "Meeting Rooms", "Coffee Bar", "Phone Booths", "Printer/Scanner", "Rooftop Lounge"],
    capacity: 75,
    pricePerHour: 30,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.9,
    reviews: [
      {
        user: "user5",
        rating: 5,
        comment: "Exceptional facilities and amazing views!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Silicon Beach Hub",
    description: "Beachside co-working space perfect for digital nomads",
    address: {
      street: "890 Ocean Drive",
      city: "Santa Monica",
      state: "CA",
      zipCode: "90401"
    },
    amenities: ["High-Speed WiFi", "Beach Views", "Outdoor Workspace", "Shower Facilities", "Surfboard Storage", "Standing Desks"],
    capacity: 40,
    pricePerHour: 28,
    images: [
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.6,
    reviews: [
      {
        user: "user6",
        rating: 4,
        comment: "Perfect blend of work and beach life!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Innovation District",
    description: "High-tech workspace in Boston's innovation hub",
    address: {
      street: "345 Innovation Way",
      city: "Boston",
      state: "MA",
      zipCode: "02210"
    },
    amenities: ["High-Speed WiFi", "3D Printing Lab", "VR Room", "Meeting Rooms", "Tech Support", "Innovation Lab"],
    capacity: 60,
    pricePerHour: 32,
    images: [
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.8,
    reviews: [
      {
        user: "user7",
        rating: 5,
        comment: "Cutting-edge facilities and great community!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Mountain View Works",
    description: "Serene workspace with mountain views and outdoor areas",
    address: {
      street: "789 Mountain Road",
      city: "Denver",
      state: "CO",
      zipCode: "80202"
    },
    amenities: ["High-Speed WiFi", "Outdoor Workspace", "Meditation Room", "Bike Storage", "Shower Facilities", "Standing Desks"],
    capacity: 35,
    pricePerHour: 24,
    images: [
      "https://images.unsplash.com/photo-1572025442646-866d16c84a54",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.7,
    reviews: [
      {
        user: "user8",
        rating: 5,
        comment: "Peaceful environment with stunning views!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Historic Downtown Hub",
    description: "Charming workspace in a renovated historic building",
    address: {
      street: "123 Heritage Ave",
      city: "Charleston",
      state: "SC",
      zipCode: "29401"
    },
    amenities: ["High-Speed WiFi", "Meeting Rooms", "Coffee Bar", "Exposed Brick", "Art Gallery", "Event Space"],
    capacity: 30,
    pricePerHour: 26,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.5,
    reviews: [
      {
        user: "user9",
        rating: 4,
        comment: "Beautiful historic setting with modern amenities!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Desert Oasis Workspace",
    description: "Modern workspace with desert views and outdoor areas",
    address: {
      street: "567 Cactus Road",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85004"
    },
    amenities: ["High-Speed WiFi", "Pool", "Outdoor Workspace", "Meeting Rooms", "Coffee Bar", "Wellness Center"],
    capacity: 40,
    pricePerHour: 27,
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.6,
    reviews: [
      {
        user: "user10",
        rating: 5,
        comment: "Amazing facilities with beautiful desert views!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Music City Co-Lab",
    description: "Creative workspace with recording studios and performance spaces",
    address: {
      street: "789 Music Row",
      city: "Nashville",
      state: "TN",
      zipCode: "37203"
    },
    amenities: ["High-Speed WiFi", "Recording Studios", "Practice Rooms", "Event Space", "Coffee Bar", "Sound Equipment"],
    capacity: 45,
    pricePerHour: 29,
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.8,
    reviews: [
      {
        user: "user11",
        rating: 5,
        comment: "Perfect for musicians and creative professionals!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Waterfront Workshop",
    description: "Inspiring workspace with waterfront views and maritime charm",
    address: {
      street: "234 Harbor Drive",
      city: "Seattle",
      state: "WA",
      zipCode: "98101"
    },
    amenities: ["High-Speed WiFi", "Water Views", "Meeting Rooms", "Coffee Bar", "Bike Storage", "Shower Facilities"],
    capacity: 50,
    pricePerHour: 31,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.7,
    reviews: [
      {
        user: "user12",
        rating: 4,
        comment: "Stunning location with great amenities!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  },
  {
    name: "Miami Design District",
    description: "Stylish workspace in Miami's vibrant design district",
    address: {
      street: "456 Design Plaza",
      city: "Miami",
      state: "FL",
      zipCode: "33137"
    },
    amenities: ["High-Speed WiFi", "Design Studio", "Photo Studio", "Event Space", "Rooftop Pool", "Coffee Bar"],
    capacity: 55,
    pricePerHour: 33,
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2"
    ],
    availability: true,
    rating: 4.9,
    reviews: [
      {
        user: "user13",
        rating: 5,
        comment: "Incredible design-focused space with amazing amenities!",
        createdAt: new Date().toISOString()
      }
    ],
    createdBy: "admin",
    createdAt: new Date().toISOString()
  }
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI as string);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const spacesCollection = db.collection('spaces');

    // Clear existing data
    await spacesCollection.deleteMany({});
    console.log('Cleared existing spaces');

    // Insert dummy data
    const result = await spacesCollection.insertMany(dummySpaces);
    console.log(`Inserted ${result.insertedCount} spaces`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase(); 