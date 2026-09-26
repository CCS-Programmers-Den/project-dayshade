'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const images = [
	'/assets/about-pics/carousel-1.png',
	'/assets/about-pics/carousel-2.png',
	'/assets/about-pics/carousel-7.jpg',
	'/assets/about-pics/carousel-3.png',
	'/assets/about-pics/carousel-4.png',
	'/assets/about-pics/carousel-5.png',
	'/assets/about-pics/carousel-6.png',
];

const variants = {
	enter: { opacity: 0 },
	center: { opacity: 1 },
	exit: { opacity: 0 },
};

export const ImageCarousel = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="absolute inset-0 z-[-1] flex items-center justify-center">
			<AnimatePresence>
				<motion.div
					key={index}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 1.5 }}
					className="absolute inset-0 flex items-center justify-center"
				>
					<Image
						src={images[index]}
						alt={`Carousel image ${index + 1}`}
						fill
						className='object-cover'
						priority={index === 0}
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};