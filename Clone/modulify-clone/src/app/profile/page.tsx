'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  website: string | null;
}

function ProfileContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    website: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      const supabase = createClient();

      // Get the current user session
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error getting user:', userError);
        router.push('/auth/sign-in');
        return;
      }

      try {
        // First check if user profile exists
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which is fine for a new user
          console.error('Error fetching profile:', profileError);
        }

        // Set user profile data
        const profile: UserProfile = {
          id: user.id,
          full_name: user.user_metadata?.full_name || profileData?.full_name || '',
          avatar_url: user.user_metadata?.avatar_url || profileData?.avatar_url || null,
          email: user.email || null,
          phone: profileData?.phone || '',
          bio: profileData?.bio || '',
          website: profileData?.website || '',
        };

        setUserProfile(profile);
        setFormData({
          full_name: profile.full_name || '',
          phone: profile.phone || '',
          bio: profile.bio || '',
          website: profile.website || '',
        });
      } catch (error) {
        console.error('Unexpected error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const supabase = createClient();

      // Update user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: formData.full_name }
      });

      if (authError) {
        console.error('Error updating user metadata:', authError);
        setSaveStatus('error');
        return;
      }

      // Update or insert user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: userProfile.id,
          full_name: formData.full_name,
          phone: formData.phone,
          bio: formData.bio,
          website: formData.website,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Error updating profile:', profileError);
        setSaveStatus('error');
        return;
      }

      setSaveStatus('success');

      // Update local user profile state
      setUserProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          full_name: formData.full_name,
          phone: formData.phone,
          bio: formData.bio,
          website: formData.website,
        };
      });
    } catch (error) {
      console.error('Unexpected error saving profile:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile Not Found</h2>
        <p className="text-gray-600 mb-6">Please sign in to manage your profile.</p>
        <button
          onClick={() => router.push('/auth/sign-in')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Your Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row mb-8">
          <div className="w-full md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
              {userProfile.avatar_url ? (
                <Image
                  src={userProfile.avatar_url}
                  alt={userProfile.full_name || 'User'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl font-bold">
                  {userProfile.full_name?.charAt(0) || userProfile.email?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-2">
              {userProfile.email}
            </p>
            <p className="text-sm text-gray-500">
              {/* Show account creation date if available */}
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`w-full py-2 px-4 rounded-md text-white ${
                    isSaving
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 transition-colors'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>

                {saveStatus === 'success' && (
                  <p className="mt-2 text-sm text-green-600">
                    Profile updated successfully!
                  </p>
                )}

                {saveStatus === 'error' && (
                  <p className="mt-2 text-sm text-red-600">
                    There was an error updating your profile. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
