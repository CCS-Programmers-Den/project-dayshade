import React from "react";
import { columns } from "@/components/sections/admin/recruitment/columns";
import { DataTable } from "@/components/sections/admin/recruitment/data-table";
import { Label } from "@/components/ui/label";
import { getMembers } from "@/lib/actions/members/get-members";

const Page = async () => {
  const members = await getMembers();

  return (
    <section className="container mx-auto py-10 space-y-6">

        <Label className="text-3xl font-bold text-primary">Recruitment</Label>
        {/* Future filter/search or add button goes here */}

          <DataTable columns={columns} data={members} />

    </section>
  );
};

export default Page;
