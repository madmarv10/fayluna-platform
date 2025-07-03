// App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";

import Header from "./components/common/Header";

// Pages
import HomePage from "./pages/main/HomePage";
import ExplorePage from "./pages/main/ExplorePage";
import BlogPostPage from "./pages/main/BlogPostPage";
import SearchResultsPage from "./pages/main/SearchResultsPage";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

import ProfilePage from "./pages/user/ProfilePage";
import SettingsPage from "./pages/user/SettingsPage";
import FollowingPage from "./pages/user/FollowingPage";
import BookmarksPage from "./pages/user/BookmarksPage";

import SubmitBlogPage from "./pages/submission/SubmitBlogPage";
import EditSubmissionPage from "./pages/submission/EditSubmissionPage";
import MySubmissionsPage from "./pages/submission/MySubmissionsPage";

import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import DetailedAnalyticsPage from "./pages/analytics/DetailedAnalyticsPage";

// Optional: 404 Page
const NotFoundPage = () => (
  <div className="text-center mt-24">
    <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
    <p className="text-gray-600 mt-2">We couldn’t find the page you’re looking for.</p>
  </div>
);

// Protected route wrapper with spinner
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-600" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
              <Header />

              <main className="pt-16">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/post/:postId" element={<BlogPostPage />} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/profile/:username"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/following"
                    element={
                      <ProtectedRoute>
                        <FollowingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/bookmarks"
                    element={
                      <ProtectedRoute>
                        <BookmarksPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/submit"
                    element={
                      <ProtectedRoute>
                        <SubmitBlogPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/edit/:postId"
                    element={
                      <ProtectedRoute>
                        <EditSubmissionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-submissions"
                    element={
                      <ProtectedRoute>
                        <MySubmissionsPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <AnalyticsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics/detailed"
                    element={
                      <ProtectedRoute>
                        <DetailedAnalyticsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
