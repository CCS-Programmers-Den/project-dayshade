"use client"

import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label"
import AddProjectMenu from "@/components/sections/admin/project/add-project-menu";
import ProjectsListView from "@/components/sections/admin/project/projects-list-view";
import ShowFeaturedProjects from "@/components/sections/admin/project/show-featured-projects";
import ShowActiveShowcase from "@/components/sections/admin/project/show-active-showcase";

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <section className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
          <Label className="text-3xl font-bold text-primary" htmlFor="projects">
            PD Projects
          </Label>
          <p className="text-muted-foreground text-sm">
            Add, edit, or remove featured projects
          </p>
        </div>

         {/* Add Project Button */}
          <AddProjectMenu onSuccess={handleRefresh} />
      </header>

      {/* Top Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Active Projects */}
        <ShowFeaturedProjects key={`featured-${refreshKey}`} />

        {/* Active Project Showcase */}
        <ShowActiveShowcase key={`showcase-${refreshKey}`} />

      </section>

      {/* Project Cards */}
      <ProjectsListView onRefresh={handleRefresh} />

    </section>
  )
};

export default Page;
