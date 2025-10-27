import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus, Calendar, MapPin, Users, DollarSign, MoreVertical } from 'lucide-react';
import { tripsAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';

const TripsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const data = await tripsAPI.getAll();
      setTrips(data);
    } catch (error) {
      console.error('Error loading trips:', error);
      toast({
        title: 'Error',
        description: 'Failed to load trips',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = () => {
    navigate('/trip/new');
  };

  const handleViewTrip = (tripId) => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <Button
            onClick={handleCreateTrip}
            className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Trip
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B4A]"></div>
          </div>
        ) : (
          <>
            {/* Trips Grid */}
            {trips.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No trips yet</h2>
            <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
            <Button
              onClick={handleCreateTrip}
              className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
            >
              Create Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card
                key={trip.id}
                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => handleViewTrip(trip.id)}
              >
                {/* Trip Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={trip.coverImage}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.name}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {trip.destination}
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                      {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <div className="flex items-center">
                        {trip.collaborators.slice(0, 3).map((collab, idx) => (
                          <img
                            key={collab.id}
                            src={collab.avatar}
                            alt={collab.name}
                            className="w-6 h-6 rounded-full border-2 border-white"
                            style={{ marginLeft: idx > 0 ? '-8px' : '0' }}
                          />
                        ))}
                        {trip.collaborators.length > 3 && (
                          <span className="ml-2 text-xs text-gray-500">
                            +{trip.collaborators.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <span>
                        ${trip.spent.toLocaleString()} / ${trip.budget.toLocaleString()}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({Math.round((trip.spent / trip.budget) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;