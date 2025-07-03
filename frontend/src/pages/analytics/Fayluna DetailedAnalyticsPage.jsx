import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import PerformanceChart from '../components/analytics/PerformanceChart';
import { getPostAnalytics, getUserSubmissions } from '../api/analytics';
import { Skeleton } from '@/components/ui/skeleton';

const DetailedAnalyticsPage = () => {
  const [selectedPostId, setSelectedPostId] = useState('');
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await getUserSubmissions(); // Replace with your API function
      setPosts(res);
      if (res.length > 0) {
        setSelectedPostId(res[0].id);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPostId) {
      setLoading(true);
      getPostAnalytics(selectedPostId).then(data => {
        setAnalytics(data);
        setLoading(false);
      });
    }
  }, [selectedPostId]);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Detailed Analytics</h1>

      <div className="mb-4 w-full max-w-md">
        <Select value={selectedPostId} onValueChange={setSelectedPostId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a post" />
          </SelectTrigger>
          <SelectContent>
            {posts.map(post => (
              <SelectItem key={post.id} value={post.id}>
                {post.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Skeleton className="h-[300px] w-full rounded-md" />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Views</p>
                <p className="text-xl font-bold">{analytics.views}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Bookmarks</p>
                <p className="text-xl font-bold">{analytics.bookmarks}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Shares</p>
                <p className="text-xl font-bold">{analytics.shares}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Click-Through Rate</p>
                <p className="text-xl font-bold">{analytics.ctr}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Engagement Over Time</h2>
            <PerformanceChart data={analytics.chartData} />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Top Referrers</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">Source</th>
                    <th className="px-4 py-2">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.referrers.map((ref, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{ref.source}</td>
                      <td className="px-4 py-2">{ref.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailedAnalyticsPage;
