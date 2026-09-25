import LeaderboardView from "@/components/sections/leaderboard/leaderboard-view";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import FileUploadForms from "@/components/sections/admin/leaderboard/file-upload-forms";

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          PD x CSC Toot Leaderboards
        </h1>
        <Button variant="outline" size="sm">
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Update Leaderboard</CardTitle>
            <CardDescription>
              Upload new leaderboard data or refresh the current standings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploadForms />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>
              Quick overview of the leaderboard statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Total Players</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Standings</CardTitle>
          <CardDescription>
            Live leaderboard showing current player rankings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardView />
        </CardContent>
      </Card>
    </div>
  );
}
