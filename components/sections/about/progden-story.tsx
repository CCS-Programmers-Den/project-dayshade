"use client";

import React from "react";
import { GlassContainer } from "@/components/shared/glass-container";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { motion } from "framer-motion";

export default function ProgdenStory() {
  return (
    <div>
      <section className="p-6">
        <GlassContainer>
          <Card className="bg-transparent border-0 shadow-none">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  /* viewport={{ once: true, amount: 0.5 }} */
                  transition={{ duration: 0.8 }}
                  className="flex items-center justify-center"
                >
                  <div>
                    <Image
                      src="/assets/about-pics/about-pd-logo-1.png"
                      height={0}
                      width={0}
                      style={{ width: '200px', height: "auto" }} // warning if inalis T_T
                      alt="PD Logo 1"
                    />
                    <Image
                      src="/assets/about-pics/about-pd-logo-2.png"
                      height={0}
                      width={0}
                      style={{ width: '200px', height: "auto" }} // warning if inalis T_T
                      alt="PD Logo 2"
                    />
                  </div>
                  <Image
                    src="/assets/about-pics/about-pd-logo-3.png"
                    alt="PD Logo 3"
                    height={0}
                    width={0}
                    style={{ width: '200px', height: "auto" }} // warning if inalis T_T
                  />
                </motion.div>
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl space-y-4"
                >
                  <p className="text-lg">
                    It all started in 2013 when the founding members of the
                    Programmers' Den saw potential of having a skill focused
                    student organization. Since then, we have been the top
                    performers and competitors for the College of Computer
                    Studies and even the University in IT and development.
                  </p>
                  <p className="text-lg">
                    Since then, the organization has continued to grow into what
                    it is today. Our team has proudly been improving with our
                    never ending challenge to keep up with the latest
                    technologies and programming languages.
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </GlassContainer>
      </section>
    </div>
  );
}
