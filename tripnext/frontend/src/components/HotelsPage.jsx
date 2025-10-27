import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, MapPin, Calendar, Users, Star, DollarSign } from 'lucide-react';

const HotelsPage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const mockHotels = [
    {
      id: '1',
      name: 'Grand Hyatt Kauai Resort & Spa',
      location: 'Poipu, Kauai, Hawaii',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      price: 450,
      rating: 4.6,
      reviews: 1243,
      amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant']
    },
    {
      id: '2',
      name: 'Princeville Resort',
      location: 'Princeville, Kauai, Hawaii',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      price: 380,
      rating: 4.7,
      reviews: 892,
      amenities: ['Pool', 'Golf', 'Ocean View', 'Gym']
    },
    {
      id: '3',
      name: 'Kauai Beach Resort',
      location: 'Lihue, Kauai, Hawaii',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
      price: 295,
      rating: 4.4,
      reviews: 1567,
      amenities: ['Pool', 'Beach Access', 'Restaurant', 'Bar']
    },
    {
      id: '4',
      name: 'Koloa Landing Resort',
      location: 'Poipu, Kauai, Hawaii',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      price: 520,
      rating: 4.8,
      reviews: 634,
      amenities: ['Pool', 'Spa', 'Kitchen', 'Beach Access']
    },
    {
      id: '5',
      name: 'Waimea Plantation Cottages',
      location: 'Waimea, Kauai, Hawaii',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      price: 220,
      rating: 4.3,
      reviews: 445,
      amenities: ['Pool', 'Beach Access', 'Historic', 'Garden']
    },
    {
      id: '6',
      name: 'Hanalei Bay Resort',
      location: 'Princeville, Kauai, Hawaii',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      price: 340,
      rating: 4.5,
      reviews: 789,
      amenities: ['Pool', 'Tennis', 'Ocean View', 'Restaurant']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl text-gray-600 mb-8">
            Search and compare hotels to find the best deals for your trip
          </p>

          {/* Search Box */}
          <Card className="max-w-5xl mx-auto p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="date"
                  placeholder="Check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="date"
                  placeholder="Check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{mockHotels.length}</span> properties found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Button variant="outline" size="sm">Recommended</Button>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="flex">
                {/* Hotel Image */}
                <div className="relative w-1/3 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Hotel Info */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {hotel.location}
                      </div>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{hotel.rating}</span>
                        <span className="text-sm text-gray-600 ml-1">({hotel.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#FF6B4A]">${hotel.price}</p>
                      <p className="text-xs text-gray-600">per night</p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-xs text-gray-600">+{hotel.amenities.length - 3} more</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;