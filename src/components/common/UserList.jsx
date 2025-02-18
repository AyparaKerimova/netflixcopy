import React, { useState } from 'react';
import { Users, Search, MessageSquarePlus } from 'lucide-react';
import { useGetAllUsersQuery } from '../../store/api/messageApi';

export const UserList = ({ onSelectUser, currentUserId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useGetAllUsersQuery();


  const users = data?.data || [];
  
  const filteredUsers = users.filter(
    user => 
      user._id !== currentUserId && 
      (user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading users
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 mt-4">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="text-gray-400" size={20} />
          <h3 className="text-lg font-medium">Start New Chat</h3>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div
                key={user._id}
                onClick={() => onSelectUser(user._id)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {user.nickname.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <MessageSquarePlus className="text-gray-400 hover:text-blue-500" size={20} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};