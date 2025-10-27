import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, MapPin, Users, Calendar, DollarSign, Star } from 'lucide-react';
import { mockReviews } from '../mockData';

const HomePage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    if (isAuthenticated) {
      navigate('/trips');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            One app for all your travel planning needs
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Create detailed itineraries, explore user-shared guides, and manage your bookings seamlessly — all in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleStartPlanning}
              size="lg"
              className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white px-8 py-6 text-lg rounded-full"
            >
              Start planning
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-gray-700 hover:text-gray-900 px-8 py-6 text-lg"
            >
              Get the app <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Trip Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">Undo</Button>
                    <Button variant="ghost" size="sm">Redo</Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Share</Button>
                    <Button variant="ghost" size="sm">•••</Button>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
                    alt="Kauai trip"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white text-2xl font-bold">Kauai trip with family</h3>
                    <div className="flex items-center text-white text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      3/7 - 3/14
                      <div className="flex items-center ml-4">
                        <img src="https://i.pravatar.cc/150?img=1" className="w-6 h-6 rounded-full border-2 border-white" alt="" />
                        <img src="https://i.pravatar.cc/150?img=2" className="w-6 h-6 rounded-full border-2 border-white -ml-2" alt="" />
                        <span className="ml-2">+3</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Reservations and attachments</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Budgeting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Map Preview */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96">
              <div className="w-full h-full relative">
                <img
                  src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-159.5,22.0,9,0/600x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                  alt="Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-white">Export</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your itinerary and your map in one view
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            No more switching between different apps, tabs, and tools to keep track of your travel plans.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan your route</h3>
              <p className="text-gray-600">
                Add places from guides with one click, or search for places to visit on the map
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborate in real-time</h3>
              <p className="text-gray-600">
                Plan trips with friends or family, and see changes they make instantly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[#FF6B4A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track your budget</h3>
              <p className="text-gray-600">
                Keep your spending under control with built-in expense tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Management Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-bold flex items-center">
                  <span className="mr-2">✈️</span> Flights
                </h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✓ In-calendar</span>
                    <p className="font-bold mt-2">United Airlines UA 1234</p>
                    <p className="text-sm text-gray-600">Sat, Mar 3 • 3h 15min</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">CONFIRMATION #</p>
                    <p className="font-bold">KP5643</p>
                    <p className="text-lg font-bold mt-2">$273.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-600">SFO San Francisco</p>
                    <p className="text-2xl font-bold">5:30pm</p>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="border-t-2 border-gray-300"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">LIH Lihue</p>
                    <p className="text-2xl font-bold">10:45pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Keep all your reservations in one place
              </h2>
              <p className="text-lg text-gray-600">
                Forward confirmation emails to plans@wanderlog.com or connect your Gmail to automatically import your flights, hotels, and car rentals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            What travelers are raving about
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Over 1 million people have already tried Wanderlog and loved its easy trip planning features.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {mockReviews.slice(0, 6).map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    {review.title && (
                      <p className="text-sm text-gray-600">{review.title}</p>
                    )}
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="text-gray-700">
              See more reviews
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FF6B4A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to plan your next adventure?
          </h2>
          <Button
            onClick={handleStartPlanning}
            size="lg"
            className="bg-white text-[#FF6B4A] hover:bg-gray-100 px-8 py-6 text-lg rounded-full"
          >
            Start planning for free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Wanderlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;