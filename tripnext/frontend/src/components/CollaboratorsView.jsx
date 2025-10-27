import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, X, Mail, UserCheck } from 'lucide-react';

const CollaboratorsView = ({ collaborators }) => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    if (inviteEmail) {
      console.log('Inviting:', inviteEmail);
      setInviteEmail('');
      setShowInvite(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Invite Section */}
      <div>
        {!showInvite ? (
          <Button
            onClick={() => setShowInvite(true)}
            className="w-full bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Invite Collaborator
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleInvite();
                  }
                }}
              />
              <Button
                onClick={handleInvite}
                className="bg-[#FF6B4A] hover:bg-[#FF5536] text-white"
              >
                Send
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowInvite(false);
                  setInviteEmail('');
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Collaborators List */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          Collaborators ({collaborators.length})
        </h3>
        <div className="space-y-3">
          {collaborators.map((collab, idx) => (
            <div
              key={collab.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={collab.avatar}
                  alt={collab.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{collab.name}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    {idx === 0 ? (
                      <>
                        <UserCheck className="w-3 h-3 mr-1" />
                        Owner
                      </>
                    ) : (
                      <>
                        <Mail className="w-3 h-3 mr-1" />
                        Editor
                      </>
                    )}
                  </div>
                </div>
              </div>
              {idx !== 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sharing Settings */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Sharing Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Public Link</p>
              <p className="text-sm text-gray-600">Anyone with the link can view</p>
            </div>
            <Button variant="outline" size="sm">
              Copy Link
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Collaborative Editing</p>
              <p className="text-sm text-gray-600">Real-time collaboration enabled</p>
            </div>
            <div className="w-12 h-6 bg-[#FF6B4A] rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorsView;