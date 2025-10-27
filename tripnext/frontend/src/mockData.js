// Mock data for Wanderlog clone

export const mockTrips = [
  {
    id: '1',
    name: 'Kauai trip with family',
    destination: 'Kauai, Hawaii',
    startDate: '2024-03-07',
    endDate: '2024-03-14',
    coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    collaborators: [
      { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    budget: 5000,
    spent: 2730
  },
  {
    id: '2',
    name: 'Paris Adventure',
    destination: 'Paris, France',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    collaborators: [
      { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' }
    ],
    budget: 3500,
    spent: 1200
  },
  {
    id: '3',
    name: 'Tokyo Explorer',
    destination: 'Tokyo, Japan',
    startDate: '2024-09-10',
    endDate: '2024-09-20',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    collaborators: [
      { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '4', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    budget: 6000,
    spent: 0
  }
];

export const mockDestinations = [
  {
    id: '1',
    tripId: '1',
    name: 'Waimea Canyon State Park',
    address: 'Waimea Canyon Dr, Waimea, HI 96796',
    lat: 22.0815,
    lng: -159.6609,
    type: 'attraction',
    day: 1,
    time: '09:00',
    notes: 'The Grand Canyon of the Pacific',
    duration: 180
  },
  {
    id: '2',
    tripId: '1',
    name: 'Napali Coast',
    address: 'Kauai, HI 96746',
    lat: 22.2064,
    lng: -159.5957,
    type: 'attraction',
    day: 2,
    time: '08:00',
    notes: 'Boat tour of stunning coastline',
    duration: 240
  },
  {
    id: '3',
    tripId: '1',
    name: 'Poipu Beach',
    address: 'Poipu, HI 96756',
    lat: 21.8765,
    lng: -159.4465,
    type: 'beach',
    day: 3,
    time: '10:00',
    notes: 'Snorkeling and sunbathing',
    duration: 240
  },
  {
    id: '4',
    tripId: '1',
    name: 'Hanalei Bay',
    address: 'Hanalei, HI 96714',
    lat: 22.2119,
    lng: -159.5004,
    type: 'beach',
    day: 4,
    time: '11:00',
    notes: 'Beautiful crescent-shaped bay',
    duration: 180
  }
];

export const mockFlights = [
  {
    id: '1',
    tripId: '1',
    airline: 'United Airlines',
    flightNumber: 'UA 1234',
    from: 'SFO',
    to: 'LIH',
    departTime: '5:30pm',
    arriveTime: '10:45pm',
    date: '2024-03-07',
    terminal: 'A',
    gate: '2',
    confirmation: 'KP5643',
    price: 273.00,
    status: 'Confirmed'
  }
];

export const mockReviews = [
  {
    id: '1',
    name: 'Nadia',
    title: 'Travel Blogger',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Planning your trip by having all the attractions already plugged into a map makes trip planning so much easier.'
  },
  {
    id: '2',
    name: 'Sharon Brewster',
    avatar: 'https://i.pravatar.cc/150?img=6',
    rating: 5,
    text: 'amazing app! easy to use, love the AI functionality.'
  },
  {
    id: '3',
    name: 'Jayson Oite',
    avatar: 'https://i.pravatar.cc/150?img=7',
    rating: 5,
    text: 'It seems to be this is my new travel app buddy. Very handy, convenient and very easy to use. It also recommends tourist destinations and nearby places. Kudos to the programmer. 👏👏👏👏'
  },
  {
    id: '4',
    name: 'Erica Franco',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    text: 'Absolutely love this app! It is so helpful when planning my trips. I especially love The optimize route option. When I have all my information in place like my starting point and my ending point it is fabulous!'
  },
  {
    id: '5',
    name: 'Belinda and Kathy Kohles',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: 'I have used several trip planning apps. This one by far is the best. The interaction between google maps makes the planning so much easier. Adding an adventure not in the app is also easy. Love the connection to Trip Advisor also.'
  },
  {
    id: '6',
    name: 'Lydia Yang',
    title: 'Founder @LydiaScapes Adventures',
    avatar: 'https://i.pravatar.cc/150?img=10',
    rating: 5,
    text: 'So much easier to visualize and plan a road trip to my favourite rock climbing destinations and explore the area around.'
  }
];

export const mockGuides = [
  {
    id: '1',
    title: 'Best of Hawaii',
    destination: 'Hawaii, USA',
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=800',
    places: 25,
    author: 'Wanderlog Team'
  },
  {
    id: '2',
    title: 'Paris in 7 Days',
    destination: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    places: 30,
    author: 'Travel Expert'
  },
  {
    id: '3',
    title: 'Tokyo Must-See',
    destination: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800',
    places: 40,
    author: 'Japan Explorer'
  }
];

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?img=1'
};