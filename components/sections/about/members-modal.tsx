import React from 'react';
import  {membersData}  from '@/lib/constants/all-members';
import { Button } from "@/components/ui/button";

export default function MembersModal() {
    const totalMembers = membersData.teams.reduce((sum, team) => sum + team.count, 0);

    return (
        <div className='w-full max-w-lg mx-auto'>
            <h1 className='text-5xl font-semibold text-primary mb-6 text-center'>
                Members ({totalMembers})
            </h1>
            <section className='bg-background p-6 rounded-md w-full space-y-8'>
                <div className='text-center'>
                    <h4 className='text-primary text-lg font-semibold'>Advisor</h4>
                    <h2 className='text-3xl font-semibold text-center'>
                        {membersData.advisor.name}
                    </h2>
                </div>

                {membersData.teams.map(team => (
                    <div key={team.id}>
                        <h2 className='text-primary text-xl'>
                            {team.name} ({team.count})
                        </h2>
                        <ol className='ml-6 text-sm relative border-l-2 border-primary pl-4 space-y-1'>
                            {team.members.map(member => (
                                <li key={member.id}>{member.name}</li>
                            ))}
                        </ol>
                    </div>
                ))}
            </section>
        </div>
    );
}