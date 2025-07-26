'use client';

import { useState } from 'react';
import { Clock, User, Tag, Pin, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const priorityColors = {
  Low: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-blue-100 text-blue-800 border-blue-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Critical: 'bg-red-100 text-red-800 border-red-200',
};

const categoryColors = {
  General: 'bg-gray-100 text-gray-800',
  Events: 'bg-purple-100 text-purple-800',
  Updates: 'bg-blue-100 text-blue-800',
  Urgent: 'bg-red-100 text-red-800',
  News: 'bg-green-100 text-green-800',
};

export default function AnnouncementCard({ announcement, onEdit, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const response = await fetch(`/api/announcements/${announcement._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          onDelete(announcement._id);
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${
      announcement.isPinned ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {announcement.isPinned && (
              <div className="flex items-center gap-1 text-blue-600">
                <Pin className="w-4 h-4" />
                <span className="text-xs font-medium">Pinned</span>
              </div>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[announcement.category]}`}>
              {announcement.category}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[announcement.priority]}`}>
              {announcement.priority}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(announcement)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {announcement.title}
        </h3>

        {/* Content */}
        <div className="text-gray-700 mb-4">
          <p className={`leading-relaxed ${!isExpanded && announcement.content.length > 150 ? 'line-clamp-3' : ''}`}>
            {announcement.content}
          </p>
          {announcement.content.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 transition-colors"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Tags */}
        {announcement.tags && announcement.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {announcement.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{announcement.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}