'use client';

import { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Users, 
  Clock, 
  Pin, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Tag, 
  User,
  ChevronDown,
  Star,
  TrendingUp,
  Bell,
  X
} from 'lucide-react';

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
    content: "We're excited to launch our new community announcement platform. This is where you'll find all the latest updates, events, and important information from our community. Stay tuned for more exciting features coming your way!",
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
    content: "Join us for our monthly community meeting where we'll discuss upcoming projects, address community concerns, and celebrate our achievements. Virtual attendance available.",
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
    content: "We will be performing scheduled maintenance on our servers this weekend. Expect brief service interruptions between 2-4 AM EST. We apologize for any inconvenience.",
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
    content: "We've updated our community guidelines to ensure a safe and welcoming environment for everyone. Please take a moment to review the changes and reach out with any questions.",
    category: "News",
    priority: "Medium",
    author: "Moderation Team",
    isPinned: false,
    tags: ["guidelines", "community", "safety"],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    _id: '5',
    title: "Community Photo Contest Winners! 📸",
    content: "Congratulations to all participants in our annual photo contest! The creativity and talent showcased was absolutely amazing. Winners will be contacted directly for their prizes.",
    category: "Events",
    priority: "Low",
    author: "Creative Team",
    isPinned: false,
    tags: ["contest", "photography", "winners"],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString()
  }
];

// Enhanced Announcement Card Component
const AnnouncementCard = ({ announcement, onEdit, onDelete }: {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'events': return <Calendar className="w-4 h-4" />;
      case 'updates': return <TrendingUp className="w-4 h-4" />;
      case 'news': return <Bell className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 ${announcement.isPinned ? 'ring-2 ring-blue-500/20 bg-gradient-to-br from-blue-50/50 to-white' : ''}`}>
      {announcement.isPinned && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2 shadow-lg">
            <Pin className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${announcement.category === 'Events' ? 'bg-purple-100 text-purple-600' : announcement.category === 'Updates' ? 'bg-blue-100 text-blue-600' : announcement.category === 'News' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
              {getCategoryIcon(announcement.category)}
            </div>
            <div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority}
              </span>
            </div>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={() => onEdit(announcement)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(announcement._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {announcement.title}
        </h3>

        {/* Content */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {announcement.content}
        </p>

        {/* Tags */}
        {announcement.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {announcement.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {announcement.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{announcement.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>{announcement.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{formatDate(announcement.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Filter Bar Component
const FilterBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, onCreateNew }: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onCreateNew: () => void;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categories = ['All', 'General', 'Events', 'Updates', 'News'];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white/50"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-4">
          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors font-medium text-gray-700"
            >
              <Filter className="w-4 h-4" />
              {selectedCategory}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[150px] z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      selectedCategory === category ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Create Button */}
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple Form Modal Component (placeholder)
const AnnouncementForm = ({ announcement, onClose, onSave }: {
  announcement: Announcement | null;
  onClose: () => void;
  onSave: (announcement: Announcement) => void;
}) => {
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    content: announcement?.content || '',
    category: announcement?.category || 'General',
    priority: announcement?.priority || 'Medium',
    author: announcement?.author || 'Anonymous',
    isPinned: announcement?.isPinned || false,
    tags: announcement?.tags.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedAnnouncement: Announcement = {
      _id: announcement?._id || Date.now().toString(),
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: announcement?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onSave(savedAnnouncement);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {announcement ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="General">General</option>
                <option value="Events">Events</option>
                <option value="Updates">Updates</option>
                <option value="News">News</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="e.g., community, event, important"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPinned" className="ml-2 text-sm font-medium text-gray-700">
              Pin this announcement
            </label>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              {announcement ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
export default function CommunityHub() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    filterAnnouncements();
  }, [announcements, searchTerm, selectedCategory]);

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

    // Sort by pinned first, then by date
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredAnnouncements(filtered);
  };

  const handleSave = (savedAnnouncement: Announcement) => {
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75"></div>
                <div className="relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                  <Megaphone className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Community Hub
                </h1>
                <p className="text-gray-600 mt-1">Stay connected with your community</p>
              </div>
            </div>

            {/* Stats - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="text-center group">
                <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500">Total Posts</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold text-blue-600 group-hover:text-purple-600 transition-colors">
                  {stats.pinned}
                </div>
                <div className="text-sm text-gray-500">Pinned</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold text-emerald-600 group-hover:text-blue-600 transition-colors">
                  {stats.thisWeek}
                </div>
                <div className="text-sm text-gray-500">This Week</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Stats */}
        <div className="grid grid-cols-3 lg:hidden gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Users, color: 'blue' },
            { label: 'Pinned', value: stats.pinned, icon: Pin, color: 'purple' },
            { label: 'This Week', value: stats.thisWeek, icon: Clock, color: 'emerald' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-2">
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                <div>
                  <div className={`text-lg font-bold text-${stat.color}-600`}>{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onCreateNew={handleCreateNew}
        />

        {/* Announcements Grid */}
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Megaphone className="w-16 h-16 text-gray-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No announcements found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'All'
                ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                : 'Be the first to create an announcement and start building your community!'}
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create First Announcement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAnnouncements.map((announcement, index) => (
              <div
                key={announcement._id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AnnouncementCard
                  announcement={announcement}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Community Hub</span>
            </div>
            <p className="text-gray-600 mb-6">
              Connecting communities through seamless communication
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span>Made with ❤️ for your community</span>
              <span>•</span>
              <span>{new Date().getFullYear()} Community Hub</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Form Modal */}
      {showForm && (
        <AnnouncementForm
          announcement={editingAnnouncement}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        
        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        
        /* Enhanced button hover effects */
        button:hover {
          transform: translateY(-1px);
        }
        
        /* Gradient text utilities */
        .text-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Pulse glow effect */
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}