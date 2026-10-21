'use client'

import React, { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label";
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Star, Film, Users, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getRecruitmentStatus, updateRecruitmentStatus } from '@/lib/actions/settings/recruitment-status';
import { getMembersStats } from '@/lib/actions/members/get-members';
import { getLeaderboardStats } from '@/lib/actions/leaderboard/get-leaderboard';
import { getProjectsStats } from '@/lib/actions/projects/get-projects';
import { toast } from 'sonner';

// Static UI Config
const uiCards = [
  {
    id: 'featured-projects',
    icon: <Star size={28} className="text-yellow-500" />,
    title: 'Featured Projects',
    description: 'Manage highlighted projects on the main page',
    button: { label: 'View All', route: '/admin/project' },
  },
  {
    id: 'project-showcase',
    icon: <Film size={28} className="text-purple-500" />,
    title: 'Project Showcase',
    description: 'Highlight current showcase',
    button: { label: 'Manage', route: '/admin/project' },
  },
  {
    id: 'active-members',
    icon: <Users size={28} className="text-blue-500" />,
    title: 'Active Members',
    description: 'Community participation',
    button: { label: 'Review Applications', route: '/admin/recruitment' },
  },
  {
    id: 'leaderboards',
    icon: <Trophy size={28} className="text-green-500" />,
    title: 'Leaderboards',
    description: 'Latest rankings',
    button: { label: 'Manage Board', route: '/admin/leaderboard' },
    header: { left: 'Rank', right: 'Points' },
  },
];

const AdminDashboard = () => {
  const router = useRouter();
  const [Active, isActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Separate Mock Data Sets
  const [featuredProjects, setFeaturedProjects] = useState<any>(null);
  const [projectShowcase, setProjectShowcase] = useState<any>(null);
  const [activeMembers, setActiveMembers] = useState<any>(null);
  const [leaderboards, setLeaderboards] = useState<any>(null);

  // Fetch recruitment status from database
  useEffect(() => {
    const fetchRecruitmentStatus = async () => {
      try {
        const { is_open_recruitment } = await getRecruitmentStatus();
        isActive(is_open_recruitment);
      } catch (error) {
        console.error("Failed to fetch recruitment status:", error);
        toast.error("Failed to load recruitment status");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitmentStatus();
  }, []);

  // Handle switch toggle
  const handleRecruitmentToggle = async (checked: boolean) => {
    isActive(checked);
    try {
      await updateRecruitmentStatus(checked);
      toast.success(`Recruitment is now ${checked ? 'open' : 'closed'}`);
    } catch (error: any) {
      console.error("Failed to update recruitment status:", error);
      toast.error(error.message || "Failed to update recruitment status");
      // Revert on error
      isActive(!checked);
    }
  };

  useEffect(() => {
    // Fetch all dynamic data from database
    const fetchDynamicData = async () => {
      try {
        // Fetch projects stats
        const projectsData = await getProjectsStats();
        
        setFeaturedProjects({
          stat: { value: projectsData.totalProjects, label: 'total' },
          content: projectsData.featuredProjects.map(project => {
            const devsString = Array.isArray(project.devs) 
              ? project.devs.join(', ') 
              : project.devs;
            
            // Truncate devs
            const truncatedDevs = devsString.length > 30 
              ? devsString.substring(0, 30) + '...' 
              : devsString;

            return {
              left: project.title,
              right: truncatedDevs,
            };
          }),
        });

        setProjectShowcase({
          stat: { value: projectsData.showcasesCount, label: 'showcases' },
          showcase: projectsData.currentShowcase
            ? {
                name: projectsData.currentShowcase.title,
                devs: Array.isArray(projectsData.currentShowcase.devs)
                  ? projectsData.currentShowcase.devs.join(', ')
                  : projectsData.currentShowcase.devs,
              }
            : { name: 'No showcase', devs: 'N/A' },
        });

        // Fetch members stats
        const membersData = await getMembersStats();
        const lastAppDate = membersData.lastApplicationDate 
          ? new Date(membersData.lastApplicationDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })
          : 'No applications yet';

        setActiveMembers({
          stat: { value: membersData.totalMembers, label: 'members' },
          extra: { pending: membersData.pendingCount, lastApp: lastAppDate },
        });

        // Fetch leaderboard stats
        const leaderboardData = await getLeaderboardStats();
        const lastUpdate = leaderboardData.lastUpdate
          ? new Date(leaderboardData.lastUpdate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          : 'No data yet';

        setLeaderboards({
          stat: { value: lastUpdate, label: 'last update' },
          content: leaderboardData.topEntries.map(entry => ({
            left: `${entry.rank}. ${entry.name}`,
            right: entry.points.toString(),
          })),
        });
      } catch (error) {
        console.error("Failed to fetch dynamic data:", error);
      }
    };

    fetchDynamicData();
  }, []);

  // 🔹 Map IDs to individual states
  const dataMap: Record<string, any> = {
    'featured-projects': featuredProjects,
    'project-showcase': projectShowcase,
    'active-members': activeMembers,
    'leaderboards': leaderboards,
  };

  return (
    <section>
      {/* Header */}
      <header className="flex justify-between p-4">
        <div className="flex flex-col gap-2">
          <Label className="text-3xl font-bold text-primary" htmlFor="dashboard">
            Dashboard
          </Label>
          <p className="text-muted-foreground">Manage the Page</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <Label className="text-lg">Recruitment</Label>
          <div className="flex items-center gap-2 rounded-md p-3 bg-card border">
            <Switch
              id="recruitment"
              checked={Active}
              onCheckedChange={handleRecruitmentToggle}
              disabled={loading}
            />
            <Label htmlFor="recruitment">
              {loading ? 'Loading...' : Active ? 'Active' : 'Not Active'}
            </Label>
          </div>
        </div>
      </header>

      {/* Main Cards */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
        {uiCards.map((card) => {
          const data = dataMap[card.id];
          return (
            <Card key={card.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div className="flex gap-2 items-center">
                  {card.icon}
                  <div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </div>
                </div>
                {data?.stat && (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{data.stat.value}</span>
                    <span className="text-xs text-muted-foreground">{data.stat.label}</span>
                  </div>
                )}
              </CardHeader>

              <CardContent>
                {/* Leaderboards + Featured Projects */}
                {data?.content && (
                  <div className="flex flex-col gap-2 rounded-md p-3 bg-card border">
                    {card.id === 'leaderboards' && card.header && (
                      <div className="flex justify-between text-sm text-muted-foreground font-medium">
                        <span>{card.header.left}</span>
                        <span>{card.header.right}</span>
                      </div>
                    )}
                    {data.content.map((row: any, i: number) => (
                      <div key={i} className="flex justify-between text-md text-muted-foreground">
                        <span>{row.left}</span>
                        <span className="font-medium">{row.right}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Project Showcase */}
                {data?.showcase && (
                  <div className="flex flex-col gap-2 rounded-md p-3 bg-card border">
                    <span className="font-light">Active Showcase</span>
                    <Label className="text-2xl font-bold">{data.showcase.name}</Label>
                    <span className="font-light">{data.showcase.devs}</span>
                  </div>
                )}

                {/* Active Members */}
                {data?.extra && (
                  <div className="flex flex-col gap-2 rounded-md p-3 bg-card border">
                    <Label className="text-lg font-light">
                      Pending Applications: <span className="font-medium">{data.extra.pending}</span>
                    </Label>
                    <span className="font-medium text-sm">Last Application: {data.extra.lastApp}</span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(card.button.route)}
                >
                  {card.button.label}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </main>
    </section>
  )
}

export default AdminDashboard
