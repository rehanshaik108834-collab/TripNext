import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';

const NewTripPage = () => {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');

  const handleAddCollaborator = () => {
    if (collaboratorEmail && !collaborators.includes(collaboratorEmail)) {
      setCollaborators([...collaborators, collaboratorEmail]);
      setCollaboratorEmail('');
    }
  };

  const handleRemoveCollaborator = (email) => {
    setCollaborators(collaborators.filter(c => c !== email));
  };

  const handleCreateTrip = () => {
    if (tripName && destination) {
      // Mock create trip - will integrate with backend later
      console.log('Creating trip:', { tripName, destination, startDate, endDate, collaborators });
      navigate('/trips');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Trip</h1>

          <div className="space-y-6">
            {/* Trip Name */}
            <div>
              <Label htmlFor="tripName">Trip Name *</Label>
              <Input
                id="tripName"
                type="text"
                placeholder="e.g., Summer in Europe"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Destination */}
            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                type="text"
                placeholder="e.g., Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Collaborators */}
            <div>
              <Label htmlFor="collaborator">Invite Collaborators</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="collaborator"
                  type="email"
                  placeholder="Enter email address"
                  value={collaboratorEmail}
                  onChange={(e) => setCollaboratorEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCollaborator();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddCollaborator}
                  className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
                >
                  Add
                </Button>
              </div>
              {collaborators.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {collaborators.map((email) => (
                    <div
                      key={email}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <span className="text-sm">{email}</span>
                      <button
                        onClick={() => handleRemoveCollaborator(email)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleCreateTrip}
                disabled={!tripName || !destination}
                className="flex-1 bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
              >
                Create Trip
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/trips')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTripPage;