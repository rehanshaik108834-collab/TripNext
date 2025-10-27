import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, MapPin, Calendar, DollarSign, Users, Share2, Download, Edit, Trash2 } from 'lucide-react';
import { mockTrips, mockDestinations, mockFlights } from '../mockData';
import TripMap from './TripMap';
import ItineraryView from './ItineraryView';
import BudgetView from './BudgetView';
import CollaboratorsView from './CollaboratorsView';

const TripDetailPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [flights, setFlights] = useState([]);
  const [activeTab, setActiveTab] = useState('itinerary');

  useEffect(() => {
    // Load trip data from mock
    const foundTrip = mockTrips.find(t => t.id === tripId);
    if (foundTrip) {
      setTrip(foundTrip);
      setDestinations(mockDestinations.filter(d => d.tripId === tripId));
      setFlights(mockFlights.filter(f => f.tripId === tripId));
    }
  }, [tripId]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Trip not found</p>
          <Button
            onClick={() => navigate('/trips')}
            className="mt-4 bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
          >
            Back to Trips
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Trip Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{trip.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {trip.destination}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                  {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <div className="flex">
                    {trip.collaborators.slice(0, 3).map((collab, idx) => (
                      <img
                        key={collab.id}
                        src={collab.avatar}
                        alt={collab.name}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        style={{ marginLeft: idx > 0 ? '-8px' : '0' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Itinerary/Budget/Collaborators */}
          <div className="bg-white rounded-lg shadow-md">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="itinerary"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B4A] data-[state=active]:text-[#FF6B4A]"
                >
                  Itinerary
                </TabsTrigger>
                <TabsTrigger
                  value="budget"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B4A] data-[state=active]:text-[#FF6B4A]"
                >
                  Budget
                </TabsTrigger>
                <TabsTrigger
                  value="collaborators"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#FF6B4A] data-[state=active]:text-[#FF6B4A]"
                >
                  Collaborators
                </TabsTrigger>
              </TabsList>

              <TabsContent value="itinerary" className="p-4">
                <ItineraryView
                  destinations={destinations}
                  flights={flights}
                  onAddDestination={() => console.log('Add destination')}
                />
              </TabsContent>

              <TabsContent value="budget" className="p-4">
                <BudgetView trip={trip} />
              </TabsContent>

              <TabsContent value="collaborators" className="p-4">
                <CollaboratorsView collaborators={trip.collaborators} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side - Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
            <TripMap destinations={destinations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;