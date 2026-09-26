'use client';

import React from 'react';
import Image from 'next/image';
import TeamMemberCard from './team-member-card';
import { teamMembers } from '@/lib/constants/team-members';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

export const TeamMemberCircles = () => {
	return (
		<TooltipProvider >
			<div className='relative flex flex-col items-center '>
				<div className='flex flex-row flex-wrap items-center justify-center gap-2'>
					{teamMembers.map((member) => (
						<Tooltip key={member.id}>
							<TooltipTrigger asChild>
								<div className='relative  flex flex-col items-center justify-start p-2 cursor-pointer'>
									<div className='size-24 rounded-full bg-destructive border-2 border-gray-600 overflow-hidden relative'>
										<Image
											src={member.image}
											alt={member.name}
											fill
											style={{ objectFit: 'cover' }}
										/>
									</div>
									<p className='text-sm text-gray-400 mt-2 text-center w-24 h-10 flex items-center justify-center whitespace-normal'>
										{member.title}
									</p>
								</div>
							</TooltipTrigger>
							<TooltipContent className='bg-transparent'>
								<TeamMemberCard member={member} />
							</TooltipContent>
						</Tooltip>
					))}
				</div>
			</div>
		</TooltipProvider>
	);
};