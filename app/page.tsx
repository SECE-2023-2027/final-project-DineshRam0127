'use client';

import { useState, useEffect } from 'react';
import { Megaphone, Users, Clock } from 'lucide-react';
import AnnouncementCard from '@/components/AnnouncementCard';
import AnnouncementForm from '@/components/AnnouncementForm';
import FilterBar from '@/components/FilterBar';

// Type definition for an announcement
interface Announcement {
  _id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  author: string;
  isPinned: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const sampleAnnouncements: Announcement[] = [
  {
    _id: '1',
    title: "Welcome to Community Hub! 🎉",
    content: "We're excited to launch our new community announcement platform...",
    category: "General",
    priority: "High",
    author: "Community Admin",
    isPinned: true,
    tags: ["welcome", "launch", "community"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: "Monthly Community Meeting - January 2025",
    content: "Join us for our monthly community meeting...",
    category: "Events",
    priority: "Medium",
    author: "Event Coordinator",
    isPinned: false,
    tags: ["meeting", "january", "community-events"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    title: "System Maintenance Scheduled",
    content: "We will be performing scheduled maintenance...",
    category: "Updates",
    priority: "High",
    author: "Tech Team",
    isPinned: true,
    tags: ["maintenance", "system", "weekend"],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: '4',
    title: "New Community Guidelines Released",
    content: "We've updated our community guidelines...",
    category: "News",
    priority: "Medium",
    author: "Moderation Team",
    isPinned: false,
    tags: ["guidelines", "community", "safety"],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString()
  }
];

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [announcements, searchTerm, selectedCategory]);

  const fetchAnnouncements = async () => {
    try {
      console.log('Fetching announcements...');
      const response = await fetch('/api/announcements');
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setAnnouncements(data.data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAnnouncements = () => {
    let filtered = [...announcements];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(ann => ann.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(ann =>
        ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ann.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredAnnouncements(filtered);
  };

  const handleSave = (savedAnnouncement: Announcement) => {
    if (!savedAnnouncement._id) {
      savedAnnouncement._id = Date.now().toString();
      savedAnnouncement.createdAt = new Date().toISOString();
      savedAnnouncement.updatedAt = new Date().toISOString();
    }

    if (editingAnnouncement) {
      setAnnouncements(prev =>
        prev.map(ann => ann._id === savedAnnouncement._id ? savedAnnouncement : ann)
      );
    } else {
      setAnnouncements(prev => [savedAnnouncement, ...prev]);
    }
    setEditingAnnouncement(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowForm(true);
  };

  const handleDelete = (announcementId: string) => {
    setAnnouncements(prev => prev.filter(ann => ann._id !== announcementId));
  };

  const handleCreateNew = () => {
    setEditingAnnouncement(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAnnouncement(null);
  };

  const stats = {
    total: announcements.length,
    pinned: announcements.filter(ann => ann.isPinned).length,
    thisWeek: announcements.filter(ann => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(ann.createdAt) > weekAgo;
    }).length,
    urgent: announcements.filter(ann => ann.category === 'Urgent' || ann.priority === 'Critical').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Community Hub</h1>
                <p className="text-gray-600">Stay updated with the latest announcements</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">{stats.total}</div>
                <div>Total Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-blue-600">{stats.pinned}</div>
                <div>Pinned</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-emerald-600">{stats.thisWeek}</div>
                <div>This Week</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:hidden gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-bold text-lg">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-bold text-lg">{stats.thisWeek}</div>
                <div className="text-xs text-gray-600">This Week</div>
              </div>
            </div>
          </div>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onCreateNew={handleCreateNew}
        />

        {/* Announcements Grid */}
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Megaphone className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria.'
                : 'Be the first to create an announcement for your community!'}
            </p>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create First Announcement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <AnnouncementForm
          announcement={editingAnnouncement}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
