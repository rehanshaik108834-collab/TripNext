import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, MapPin, Star, TrendingUp } from 'lucide-react';
import { mockGuides } from '../mockData';

const GuidesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Guides</h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover expertly curated itineraries from travelers around the world
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search destinations, cities, or countries..."
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-[#FF6B4A] mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Paris', 'Tokyo', 'New York', 'London', 'Bali', 'Barcelona', 'Dubai', 'Rome'].map((city) => (
              <Button
                key={city}
                variant="outline"
                className="rounded-full hover:bg-[#FF6B4A] hover:text-white hover:border-[#FF6B4A] transition-colors"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Guides */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...mockGuides, ...mockGuides, ...mockGuides].map((guide, idx) => (
              <Card
                key={`${guide.id}-${idx}`}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate(`/guide/${guide.id}`)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    <MapPin className="w-4 h-4 text-[#FF6B4A] mr-1" />
                    <span className="text-sm font-semibold">{guide.places} places</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-3">{guide.destination}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <img
                        src="https://i.pravatar.cc/150?img=11"
                        alt={guide.author}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      {guide.author}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Create Your Own Travel Guide
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Share your travel experiences and help others plan their perfect trip
          </p>
          <Button
            onClick={() => navigate('/trips')}
            className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white px-8 py-6 text-lg"
          >
            Start Creating
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;