'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import ProfileForm from '@/components/profile/ProfileForm';
import { fetchProfile, updateProfile, updateProfileForAdminThunk } from '@/redux/profileSlice';
import { UpdateProfileDto } from '@/interfaces/profile';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { BiObjectsHorizontalLeft } from "react-icons/bi";
import GroupIcon from '@mui/icons-material/Group';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import ProtectedRoute from '@/components/ProtectedRoute';
import API from '@/lib/api';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const role = useAppSelector((state) => state.auth.user?.role);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const authChecked = useAppSelector((state) => state.auth.authChecked); // لو عندك flag للتحقق من auth

  const [editing, setEditing] = useState(false);

  // 🟢 جلب البروفايل بعد التأكد من وجود userId
  useEffect(() => {
    if (!authChecked || !userId) return; // امنع request قبل انتهاء checkAuth أو بدون ID
    dispatch(fetchProfile(userId));
  }, [dispatch, userId, authChecked]);

  const handleUpdateProfile = async (data: UpdateProfileDto) => {
    if (!userId) {
      console.error("User ID is undefined!");
      return;
    }

    try {
      if (role === "admin") {
        await dispatch(updateProfileForAdminThunk({ userId, data })).unwrap();
      } else {
        await dispatch(updateProfile({ userId, data })).unwrap();
      }

      // جلب البروفايل مرة أخرى بعد التحديث
      dispatch(fetchProfile(userId));
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (!authChecked || loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-lg text-red-500 font-semibold">No profile data found.</div>
      </div>
    );
  }

const baseURL = API.defaults.baseURL || "";
const profileImageUrl = profile.profileImage
  ? `${baseURL.replace(/\/$/, "")}/${profile.profileImage.replace(/^\/+/, "").replace(/\\/g, "/")}`
  : "";



console.log("🌍 [FRONTEND] Final image URL:", profileImageUrl);


  return (
    <ProtectedRoute>
    <main className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Profile</h1>

      {/* عرض صورة البروفايل */}
      <div className="flex justify-center mb-6">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile Image"
            className="w-32 h-32 rounded-full object-cover border"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <PersonOutlineIcon className="text-4xl text-gray-500" />
          </div>
        )}
      </div>

      {!editing ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-center gap-3">
              <PersonOutlineIcon className="text-blue-600" />
              <div>
                <p className="font-semibold">Name:</p>
                <p className="text-gray-600">{profile?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <EmailIcon className="text-blue-600" />
              <div>
                <p className="font-semibold">Email:</p>
                <p className="text-gray-600">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AdminPanelSettingsIcon className="text-blue-600" />
              <div>
                <p className="font-semibold">Role:</p>
                <p className="text-gray-600 capitalize">{profile?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BiObjectsHorizontalLeft className="text-blue-600 w-6 h-10" />
              <div>
                <p className="font-semibold">Bio:</p>
                <p className="text-gray-600">{profile?.bio || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GroupIcon className="text-blue-600" />
              <div>
                <p className="font-semibold">Team:</p>
                <p className="text-gray-600">{profile?.team || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PeopleAltIcon className="text-blue-600" />
              <div>
                <p className="font-semibold">Team Lead:</p>
                <p className="text-gray-600">{profile?.teamLead || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <WorkIcon className="text-blue-600" />
              <div>
                <p className="font-semibold">Position:</p>
                <p className="text-gray-600">{profile?.position || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        </>
      ) : (
        <ProfileForm
          profile={profile}
          role={role}
          onCancel={() => setEditing(false)}
          onSave={handleUpdateProfile}
        />
      )}
    </main>
    </ProtectedRoute>
  );
}
