"use client";
import { use } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const PodcastDetails = ({
  params,
}: {
  params: Promise<{ podcastId: Id<"podcasts"> }>;
}) => {
  const { podcastId } = use(params);
  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId: podcastId,
  });
  return (
    <section className="flex w-full flex-col">
      <header className="mg-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            alt="headphone"
            width={24}
            height={24}
          />
          <h2 className="text-16 font-bold text-white-1">{podcast?.views}</h2>
        </figure>
      </header>
    </section>
  );
};

export default PodcastDetails;
