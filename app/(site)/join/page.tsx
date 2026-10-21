import React from "react";
import { JoinForm } from "@/components/sections/join/join-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCheck,
  Presentation,
  Shirt,
  SquareUser,
  Trophy,
} from "lucide-react";
import { memberData } from "@/lib/constants/join-stats";

const youllGet = [
  {
    icon: <Trophy />,
    title: "More chances to join competitions",
    description: "Access to hackathons, coding challenges and more!",
  },
  {
    icon: <Presentation />,
    title: "Exclusive Sessions",
    description: "Access to ProgDen webinars and workshops",
  },
  {
    icon: <Shirt />,
    title: "Exclusive Merchandise",
    description: "Access to eye-catching merchandise",
  },
  {
    icon: <SquareUser />,
    title: "Real Projects",
    description: "Access to collaborate with seniors to build your portfolio!",
  },
];

const page = () => {
  return (
    <div className="flex-col max-w-7xl mx-auto">
      <section className="relative py-32 overflow-hidden bg-background/95">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,theme(colors.secondary/0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              Unlock Your Potential
            </h1>
            <h2 className="text-3xl font-semibold text-primary mb-6 [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
              Join Our Amazing Team!
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-primary/5 backdrop-blur-sm border border-border hover:bg-gradient-to-br hover:from-secondary/10 hover:to-primary/10 transition-colors">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Nurture Your Talents
              </h3>
              <p className="text-muted-foreground">
                Welcome to our team, where programmers and multimedia
                enthusiasts thrive! We're a supportive organization dedicated to
                nurturing talents and empowering growth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-primary/5 backdrop-blur-sm border border-border hover:bg-gradient-to-br hover:from-secondary/10 hover:to-primary/10 transition-colors">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Shape the Future
              </h3>
              <p className="text-muted-foreground">
                Join us today and be part of shaping a brighter future together.
                Conquer challenges, celebrate achievements, and reach new
                heights in your career.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-primary/5 backdrop-blur-sm border border-border hover:bg-gradient-to-br hover:from-secondary/10 hover:to-primary/10 transition-colors">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Embrace Success
              </h3>
              <p className="text-muted-foreground">
                Your dreams and aspirations matter to us. Let's embrace this
                journey of success together, as we foster and celebrate your
                skills in programming and multimedia.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full grid md:grid-cols-2 h-full gap-5 py-20 ">
        <div className="flex flex-col gap-8 ">
          <Card className="flex items-center gap-5 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-border hover:scale-[1.04] transition-transform duration-200 relative overflow-hidden">
            <h2 className="text-3xl font-extrabold text-primary mb-2 tracking-tight flex gap-2">
              <span className="inline-flex items-center">
                <CheckCheck />
              </span>
              What You'll Get
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              Unlock exclusive perks and become part of a thriving community.
            </p>
          </Card>
          <div className="grid sm:grid-cols-2 gap-6">
            {youllGet.map((item, index) => (
              <Card
                key={index}
                className="flex items-center gap-5 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-border hover:scale-[1.04] transition-transform duration-200 relative overflow-hidden"
              >
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground text-3xl shadow-md" role="img" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-lg font-bold mb-1 text-primary drop-shadow">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </div>
                <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-30" />
              </Card>
            ))}
          </div>
          <Card className="mt-4 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-border flex flex-col items-center">
            <h3 className="text-xl font-bold text-center text-secondary mb-4 tracking-wide">
              Community Stats
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-center" role="presentation">
                <span className="text-4xl font-extrabold text-primary">
                  {memberData[0].ActiveMember}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Active Members
                </span>
              </div>
              <div className="flex flex-col items-center" role="presentation">
                <span className="text-4xl font-extrabold text-secondary">
                  {memberData[0].Projects}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Projects
                </span>
              </div>
              <div className="flex flex-col items-center" role="presentation">
                <span className="text-4xl font-extrabold text-yellow-400">
                  {memberData[0].YearsOfExcellence}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Years of Excellence
                </span>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
                <span className="text-primary">
                  <SquareUser />
                </span>
                Join the Den
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form to become a member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JoinForm />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground border-t border-border pt-4">
              By submitting through the form, you agree to the following. In
              compliance with Data Privacy Act 0f 2012, it's implementing rules
              and regulations, and other issuance of the National Privacy
              Commission, you authorize the organization(Programmers' Den) to
              collect your data for accomplishing the said activity
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default page;
