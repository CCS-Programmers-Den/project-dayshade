import { z } from "zod";

export const memberSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  count: z.number(),
  members: z.array(memberSchema),
});

export const membersDataSchema = z.object({
  advisor: z.object({
    name: z.string(),
  }),
  teams: z.array(teamSchema),
});

export const membersData = {
  advisor: { name: "Nomar Lapitan" },
  teams: [
    {
      id: 1,
      name: "Web and App Development Team",
      count: 11,
      members: [
        { id: 1, name: "Member 1" },
        { id: 2, name: "Member 2" },
        { id: 3, name: "Member 3" },
        { id: 4, name: "Member 4" },
      ],
    },
    {
      id: 2,
      name: "Game Development Team",
      count: 45,
      members: [
        { id: 5, name: "Member 5" },
        { id: 6, name: "Member 6" },
        { id: 7, name: "Member 7" },
        { id: 8, name: "Member 8" },
      ],
    },
    {
      id: 3,
      name: "Competitive Development Team",
      count: 21,
      members: [
        { id: 9, name: "Member 9" },
        { id: 10, name: "Member 10" },
        { id: 11, name: "Member 11" },
        { id: 12, name: "Member 12" },
      ],
    },
    {
      id: 4,
      name: "Multimedia Team",
      count: 5,
      members: [
        { id: 13, name: "Member 13" },
        { id: 14, name: "Member 14" },
        { id: 15, name: "Member 15" },
        { id: 16, name: "Member 16" },
      ],
    },
  ],
};

export const validatedMembersData = membersDataSchema.parse(membersData);

export type ValidatedMembersData = z.infer<typeof membersDataSchema>;
export type Team = z.infer<typeof teamSchema>;
export type Member = z.infer<typeof memberSchema>;