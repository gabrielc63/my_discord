import React from "react";
import { redirect } from "next/navigation";
import { InitialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";

const SetupPage = async () => {
  const profile = await InitialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a Server</div>;
};

export default SetupPage;
