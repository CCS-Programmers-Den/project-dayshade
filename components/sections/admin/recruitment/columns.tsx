"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateMemberStatus } from "@/lib/actions/members/update-member";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
export type RecruitmentEntity = {
  id: string;
  name: string;
  student_number: string;
  course: string;
  year: string;
  student_email: string;
  facebook_link: string;
  team: string;
  status: "pending" | "accepted" | "rejected";
};

const StatusButton = ({ 
  memberId, 
  memberName, 
  newStatus 
}: { 
  memberId: string; 
  memberName: string; 
  newStatus: "accepted" | "rejected" 
}) => {
  const handleStatusChange = async () => {
    try {
      await updateMemberStatus(memberId, newStatus);
      toast.success(`${memberName} has been ${newStatus}!`);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const isAccept = newStatus === "accepted";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant={isAccept ? "default" : "destructive"}
        >
          {isAccept ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isAccept ? "Accept" : "Reject"} Application?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {newStatus} <strong>{memberName}</strong>'s application?
            This action will update their status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleStatusChange}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns: ColumnDef<RecruitmentEntity>[] = [
  { 
    accessorKey: "rowNumber",
    header: "#",
    cell: ({row}) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "student_number",
    header: "Student Number",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "year",
    header: "Year Level",
  },
  {
    accessorKey: "student_email",
    header: "Student Email",
  },
  {
    accessorKey: "facebook_link",
    header: "FB Link",
    cell: ({ row }) => {
      const link = row.getValue("facebook_link") as string;
      return (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          View Profile
        </a>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as RecruitmentEntity["status"];
      
      const statusStyles = {
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        accepted: "bg-green-500/10 text-green-500 border-green-500/20",
        rejected: "bg-red-500/10 text-red-500 border-red-500/20",
      };

      return (
        <Badge variant="outline" className={statusStyles[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const member = row.original;
      const status = member.status;

      // Only show buttons if status is pending
      if (status !== "pending") {
        return <span className="text-muted-foreground text-sm">—</span>;
      }

      return (
        <div className="flex gap-2">
          <StatusButton 
            memberId={member.id} 
            memberName={member.name} 
            newStatus="accepted" 
          />
          <StatusButton 
            memberId={member.id} 
            memberName={member.name} 
            newStatus="rejected" 
          />
        </div>
      );
    },
  },
];
