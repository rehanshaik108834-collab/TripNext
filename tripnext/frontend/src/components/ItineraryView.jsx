import React from 'react';
import { Button } from './ui/button';
import { Plus, MapPin, Clock, Edit, Trash2 } from 'lucide-react';

const ItineraryView = ({ destinations, flights, onAddDestination }) => {
  // Group destinations by day
  const groupedByDay = destinations.reduce((acc, dest) => {
    if (!acc[dest.day]) {
      acc[dest.day] = [];
    }
    acc[dest.day].push(dest);
    return acc;
  }, {});

  const days = Object.keys(groupedByDay).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="space-y-6">
      {/* Flights Section */}
      {flights && flights.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Flights</h3>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {flights.map((flight) => (
            <div key={flight.id} className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    ✓ {flight.status}
                  </span>
                  <p className="font-bold mt-2">{flight.airline} {flight.flightNumber}</p>
                  <p className="text-sm text-gray-600">{flight.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">CONFIRMATION #</p>
                  <p className="font-bold">{flight.confirmation}</p>
                  <p className="text-lg font-bold mt-2">${flight.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-600">{flight.from}</p>
                  <p className="text-xl font-bold">{flight.departTime}</p>
                </div>
                <div className="flex-1 mx-4">
                  <div className="border-t-2 border-gray-300"></div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{flight.to}</p>
                  <p className="text-xl font-bold">{flight.arriveTime}</p>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Terminal {flight.terminal}</span>
                <span>Gate {flight.gate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Itinerary by Day */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">Itinerary</h3>
          <Button
            onClick={onAddDestination}
            size="sm"
            className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Place
          </Button>
        </div>

        {days.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-600">No destinations added yet</p>
            <Button
              onClick={onAddDestination}
              size="sm"
              className="mt-3 bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
            >
              Add Your First Destination
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h4 className="font-bold text-gray-900">Day {day}</h4>
                </div>
                <div className="p-4 space-y-3">
                  {groupedByDay[day].map((dest, idx) => (
                    <div
                      key={dest.id}
                      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg group transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[#FF6B4A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{dest.name}</h5>
                            <p className="text-sm text-gray-600 mt-1">
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {dest.address}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {dest.time} • {dest.duration} min
                            </div>
                            {dest.notes && (
                              <p className="text-sm text-gray-600 mt-2 italic">{dest.notes}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryView;