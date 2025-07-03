// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
import SubmitBlogPage from './pages/SubmitBlogPage';
import EditSubmissionPage from './pages/EditSubmissionPage';
import MySubmissionsPage from './pages/MySubmissionsPage';
import BookmarksPage from './pages/BookmarksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DetailedAnalyticsPage from './pages/DetailedAnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';

import PrivateRoute from './components/PrivateRoute'; // Wrapper for protected routes

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route
                path="/profile/:userId"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/submit"
                element={
                  <PrivateRoute>
                    <SubmitBlogPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-submission/:submissionId"
                element={
                  <PrivateRoute>
                    <EditSubmissionPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-submissions"
                element={
                  <PrivateRoute>
                    <MySubmissionsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <PrivateRoute>
                    <BookmarksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <PrivateRoute>
                    <AnalyticsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/analytics/detailed/:postId"
                element={
                  <PrivateRoute>
                    <DetailedAnalyticsPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

