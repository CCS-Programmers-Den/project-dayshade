// components/ui/team-member-card.tsx
import { Github, Mail } from "lucide-react"
import Image from "next/image"
import type { TeamMember } from "@/lib/constants/team-members"
import { MagicCard } from "@/components/magicui/magic-card"

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <MagicCard className="rounded-2xl">
      <div className="flex items-center text-muted justify-between h-88 flex-col p-6">
        {/*  // pag inalis text-muted nagiging black sa pd officer hovering*/}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 shadow-md flex-shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
          />
        </div>
        <h5 className="text-base sm:text-lg md:text-xl font-bold text-center tracking-wide">{member.name}</h5>
        <p className="text-xs sm:text-sm p-1 px-4 rounded-full text-center font-semibold bg-white/10 my-2">
          {member.title}
        </p>
        <div className="flex flex-row gap-4 items-center justify-center text-primary mt-4">
          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-secondary"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )}
          {member.socials.email && (
            <a
              href={`mailto:${member.socials.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-secondary"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )}
        </div>
      </div>
    </MagicCard>
  )
}