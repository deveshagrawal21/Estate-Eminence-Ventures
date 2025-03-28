'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SavedProperties } from '@/components/saved-properties';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { FaUser, FaHeart, FaHistory, FaCog, FaBell, FaSignOutAlt, FaMapMarkerAlt, FaRupeeSign, FaFilter, FaCalendarAlt, FaHome, FaBed } from 'react-icons/fa';

interface RecentSearch {
  id: string;
  date: string;
  filters: {
    location?: string;
    type?: string;
    priceRange?: string;
    bedrooms?: number;
  };
}

interface Notification {
  id: string;
  date: string;
  message: string;
  read: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('saved-properties');

  // Mock data for recent searches
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    {
      id: '1',
      date: '2025-03-18',
      filters: {
        location: 'Bangalore',
        type: 'sale',
        priceRange: '₹1 Cr - ₹2 Cr',
        bedrooms: 3
      }
    },
    {
      id: '2',
      date: '2025-03-15',
      filters: {
        location: 'Delhi NCR',
        type: 'rent',
        priceRange: '₹50,000 - ₹1,00,000/mo',
        bedrooms: 2
      }
    },
    {
      id: '3',
      date: '2025-03-10',
      filters: {
        location: 'Mumbai',
        type: 'sale',
        priceRange: '₹2 Cr - ₹5 Cr',
        bedrooms: 4
      }
    }
  ]);

  // Mock data for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      date: '2025-03-22',
      message: 'New properties matching your search criteria are available.',
      read: false
    },
    {
      id: '2',
      date: '2025-03-20',
      message: 'Price drop alert! A property you saved has reduced its price by 5%.',
      read: false
    },
    {
      id: '3',
      date: '2025-03-18',
      message: 'Your property viewing appointment has been confirmed.',
      read: true
    },
    {
      id: '4',
      date: '2025-03-15',
      message: 'Your account profile was updated successfully.',
      read: true
    }
  ]);

  // User account settings
  const [accountSettings, setAccountSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isEmailNotificationsEnabled: true,
    isSmsNotificationsEnabled: false,
    isPriceDropAlertsEnabled: true,
    isSimilarPropertyAlertsEnabled: true,
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (data?.user) {
          setUser(data.user);

          // Update account settings with user metadata
          if (data.user.user_metadata) {
            setAccountSettings(prev => ({
              ...prev,
              firstName: data.user.user_metadata.first_name || '',
              lastName: data.user.user_metadata.last_name || '',
              email: data.user.email || '',
              phone: data.user.user_metadata.phone || '',
              // Other fields would normally come from a profile table in the database
            }));
          }
        } else {
          // Redirect to login if no user
          router.push('/auth/sign-in');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const removeSearch = (searchId: string) => {
    setRecentSearches(recentSearches.filter(search => search.id !== searchId));
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setAccountSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const saveAccountSettings = () => {
    // In a real application, this would save to the database
    alert('Account settings updated successfully!');
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <NavBar />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 min-h-screen">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Authentication Required</h2>
            <p className="text-gray-600 mb-8">Please sign in to access your dashboard.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <NavBar />

      <div className="bg-gray-50 min-h-screen">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* User Welcome Section */}
          <div className="bg-blue-900 rounded-lg p-6 md:p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-blue-800 flex items-center justify-center">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="User avatar"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="text-3xl font-bold">
                    {(user.user_metadata?.first_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </div>
                )}
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome, {user.user_metadata?.first_name || user.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-blue-100 mb-4">
                  Manage your saved properties, recent searches, and account settings from your dashboard.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="bg-blue-800 px-4 py-2 rounded">
                    <div className="text-sm text-blue-200">Member Since</div>
                    <div>{new Date(user.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-blue-800 px-4 py-2 rounded">
                    <div className="text-sm text-blue-200">Saved Properties</div>
                    <div>Loading...</div>
                  </div>
                  <div className="bg-blue-800 px-4 py-2 rounded">
                    <div className="text-sm text-blue-200">Recent Searches</div>
                    <div>{recentSearches.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">Dashboard</h2>
                </div>

                <nav className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'saved-properties' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('saved-properties')}
                      >
                        <FaHeart className="mr-3" />
                        <span>Saved Properties</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'recent-searches' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('recent-searches')}
                      >
                        <FaHistory className="mr-3" />
                        <span>Recent Searches</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('notifications')}
                      >
                        <FaBell className="mr-3" />
                        <span>Notifications</span>
                        {unreadNotificationsCount > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadNotificationsCount}
                          </span>
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'account-settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('account-settings')}
                      >
                        <FaCog className="mr-3" />
                        <span>Account Settings</span>
                      </button>
                    </li>
                  </ul>

                  <div className="border-t mt-4 pt-4">
                    <button
                      className="w-full text-left px-4 py-2 rounded flex items-center text-red-600 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <FaSignOutAlt className="mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Saved Properties Tab */}
              {activeTab === 'saved-properties' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6 pb-2 border-b">Saved Properties</h2>
                  <SavedProperties />
                </div>
              )}

              {/* Recent Searches Tab */}
              {activeTab === 'recent-searches' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b">
                    <h2 className="text-xl font-bold">Recent Searches</h2>
                    {recentSearches.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRecentSearches([])}
                      >
                        Clear All
                      </Button>
                    )}
                  </div>

                  {recentSearches.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <FaHistory className="w-12 h-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Searches</h3>
                      <p className="text-gray-600 mb-6">
                        Your recent property searches will appear here.
                      </p>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/properties">Find Properties</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentSearches.map((search) => (
                        <div key={search.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <FaCalendarAlt className="mr-2" />
                              <span>{new Date(search.date).toLocaleDateString()}</span>
                            </div>
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => removeSearch(search.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                            {search.filters.location && (
                              <div className="flex items-center">
                                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                                <span>{search.filters.location}</span>
                              </div>
                            )}
                            {search.filters.type && (
                              <div className="flex items-center">
                                <FaHome className="text-blue-600 mr-2" />
                                <span className="capitalize">{search.filters.type}</span>
                              </div>
                            )}
                            {search.filters.priceRange && (
                              <div className="flex items-center">
                                <FaRupeeSign className="text-blue-600 mr-2" />
                                <span>{search.filters.priceRange}</span>
                              </div>
                            )}
                            {search.filters.bedrooms && (
                              <div className="flex items-center">
                                <FaBed className="text-blue-600 mr-2" />
                                <span>{search.filters.bedrooms} {search.filters.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              asChild
                              variant="default"
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Link href={`/properties?location=${search.filters.location}&type=${search.filters.type}`}>
                                Search Again
                              </Link>
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-600 text-blue-600"
                            >
                              Save Search
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b">
                    <h2 className="text-xl font-bold">Notifications</h2>
                    {unreadNotificationsCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={markAllNotificationsAsRead}
                      >
                        Mark All as Read
                      </Button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <FaBell className="w-12 h-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
                      <p className="text-gray-600">
                        You don't have any notifications at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                        >
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <FaCalendarAlt className="mr-2" />
                              <span>{new Date(notification.date).toLocaleDateString()}</span>
                            </div>
                            {!notification.read && (
                              <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="mb-2">{notification.message}</p>
                          <div className="flex gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setNotifications(notifications.map(n =>
                                  n.id === notification.id ? { ...n, read: true } : n
                                ));
                              }}
                              disabled={notification.read}
                            >
                              {notification.read ? 'Read' : 'Mark as Read'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Account Settings Tab */}
              {activeTab === 'account-settings' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6 pb-2 border-b">Account Settings</h2>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={accountSettings.firstName}
                          onChange={handleSettingsChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={accountSettings.lastName}
                          onChange={handleSettingsChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={accountSettings.email}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={accountSettings.phone}
                          onChange={handleSettingsChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={accountSettings.address}
                          onChange={handleSettingsChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={accountSettings.city}
                            onChange={handleSettingsChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={accountSettings.state}
                            onChange={handleSettingsChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={accountSettings.pincode}
                            onChange={handleSettingsChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isEmailNotificationsEnabled"
                          name="isEmailNotificationsEnabled"
                          checked={accountSettings.isEmailNotificationsEnabled}
                          onChange={handleSettingsChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="isEmailNotificationsEnabled" className="ml-2">
                          Email notifications
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isSmsNotificationsEnabled"
                          name="isSmsNotificationsEnabled"
                          checked={accountSettings.isSmsNotificationsEnabled}
                          onChange={handleSettingsChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="isSmsNotificationsEnabled" className="ml-2">
                          SMS notifications
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isPriceDropAlertsEnabled"
                          name="isPriceDropAlertsEnabled"
                          checked={accountSettings.isPriceDropAlertsEnabled}
                          onChange={handleSettingsChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="isPriceDropAlertsEnabled" className="ml-2">
                          Price drop alerts
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isSimilarPropertyAlertsEnabled"
                          name="isSimilarPropertyAlertsEnabled"
                          checked={accountSettings.isSimilarPropertyAlertsEnabled}
                          onChange={handleSettingsChange}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor="isSimilarPropertyAlertsEnabled" className="ml-2">
                          Similar property alerts
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => window.location.reload()}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={saveAccountSettings}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
