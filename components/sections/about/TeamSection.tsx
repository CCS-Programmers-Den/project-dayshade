'use client'

import { teamMembers } from '@/data/teamMembers'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogTrigger, DialogClose, DialogFooter, DialogContent } from '@/components/ui/dialog'
import MembersModal from './MembersModal'
import TeamMemberCard from './TeamMemberCard'

import { motion } from 'framer-motion'

export default function TeamSection() {

	const topMembers = teamMembers.slice(0, 2);
	const otherMembers = teamMembers.slice(2);


	return (
		<div>
			<section className="py-12 px-6 relative">
				<div className="max-w-7xl mx-auto">
					{/* Meet the Team Header */}
					<div className="text-center mb-12">
						<h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
							Meet the Team
						</h2>
						<p className="text-xl">
							PD Officers {new Date().getFullYear()} - {new Date().getFullYear() + 1}
						</p>
					</div>


					{/* Button for Desktop Layout */}
					{/* <div className="hidden lg:block absolute top-8 right-8">
						<Dialog >
							<DialogTitle></DialogTitle>
							<DialogTrigger asChild>
								<Button variant="default">Show Memberfs</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md bg-[#414141]">

								<MembersModal />
								<DialogFooter className="sm:justify-start">
									<DialogClose asChild>
										<Button variant="default"
											className='font-semibold py-3 px-12 transition-all hover:bg-primary/90 duration-300 active:bg-primary/80'>
											Confirm
										</Button>

									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div> */}


					{/* Button for Mobile Layout */}
					{/* <div className="lg:hidden flex items-center justify-center my-12">
						<Dialog >
							<DialogTitle></DialogTitle>
							<DialogTrigger asChild>
								<Button variant="default">Show Memberfs</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-md bg-[#414141]">

								<MembersModal />
								<DialogFooter className="sm:justify-start">
									<DialogClose asChild>
										<Button variant="default"
											className='font-semibold py-3 px-12 transition-all hover:bg-primary/90 duration-300 active:bg-primary/80'>
											Confirm
										</Button>

									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div> */}

					{/* Mobile Layout */}
					<div className=" lg:hidden items-center justify-center mx-auto flex">
						<div className="grid grid-cols-2 gap-6">
							{teamMembers.map((member, index) => (
								<motion.div key={member.id}

									initial={{ scale: 0.8, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									transition={{
										type: "spring",
										stiffness: 260,
										damping: 20,
										delay: index * 0.02,
										duration: 1
									}}
								>
									<TeamMemberCard member={member} />
								</motion.div>
							))}
						</div>
					</div>

					{/* Desktop Layout */}
					<div className="hidden lg:block space-y-8">
						<div className="grid grid-cols-4 gap-8">
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								viewport={{ amount: 0.2, once: true }}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20,
									delay: 0.1
								}}


								className="col-start-2 col-span-1">
								<TeamMemberCard member={topMembers[0]} />
							</motion.div>
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								viewport={{ amount: 0.2, once: true }}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20,
									delay: 0.2
								}}


								className="col-start-3 col-span-1">
								<TeamMemberCard member={topMembers[1]} />
							</motion.div>
						</div>

						<div className="grid grid-cols-4 gap-8">
							{otherMembers.map((member, index) => (
								<motion.div key={member.id}

									initial={{ scale: 0.8, opacity: 0 }}
									whileInView={{ scale: 1, opacity: 1 }}
									viewport={{ amount: 0.1, once: true }}

									transition={{
										type: "spring",
										stiffness: 260,
										damping: 20,
										delay: index * 0.01,
										duration: 1
									}}

								>
									<TeamMemberCard member={member} />
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section ></div >
	)
}
