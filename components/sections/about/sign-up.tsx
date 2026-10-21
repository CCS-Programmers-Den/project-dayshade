'use client'

import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button";
import { GlassContainer } from '@/components/shared/glass-container'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { motion, LazyMotion, domAnimation } from "framer-motion";
import Link from 'next/link';

export default function SignUp() {
	return (
		<div>
			{/* SIGN UP */}
			<LazyMotion features={domAnimation}>
				<div className="mx-auto">
					<Card className="w-full mt-12 overflow-hidden bg-gradient-to-br from-pd-purple/90 to-pd-purple/70 border-0 shadow-2xl relative">
						<div
							className="absolute inset-0 pointer-events-none opacity-20"
							style={{
								backgroundImage: "url(/assets/pattern.png)",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						/>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className="relative z-20 container px-4 md:px-6 py-16 flex flex-col space-y-8 text-center mx-auto"
						>
							<h2 className="text-4xl font-bold sm:text-6xl text-white tracking-tight">
								BE A PART OF OUR STORY
							</h2>
							<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
								<Button
									asChild
									variant="outline"
									size="lg"
									className="min-w-[200px] bg-transparent border-white border-2 text-white hover:bg-white hover:text-pd-purple font-bold text-lg"
								>
									<Link href="/perks">
										Membership Perks
									</Link>
								</Button>
								<Button
									asChild
									size="lg"
									className="min-w-[200px] bg-white font-bold text-lg group"
								>
									<Link href="/join">
										Sign Up
										<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</motion.div>
					</Card>
				</div>
			</LazyMotion>

			{/* WEBSITE CREATED BY:  */}
			<motion.div

				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					stiffness: 260,
					damping: 20,
					duration: 1,
					delay: 0.2
				}}
				viewport={{ once: true }}
				className="text-center py-24 m-6">
				<GlassContainer className="max-w-4xl mx-auto">
					<Card className="bg-transparent border-0 shadow-none">
						<CardHeader>
							<CardTitle className="font-semibold sm:text-3xl text-2xl text-primary">
								ProgDen Website created by:
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="px-8 text-lg break-words whitespace-pre-line">
								King Paolo Franco, John Andrei Tacujan, Paula Joyce Ucol, Mark Louis
								Cadiente, Marc Jersey Castro, Eithan Mathew Malonzo, Gilbert Cura,
								Kharl Asuncion, Brigitte Tamondong, Jenny Jane Flores, and Kyran Emmanuel Solomon
							</p>
						</CardContent>
					</Card>
				</GlassContainer>
			</motion.div>
		</div >
	)
}
