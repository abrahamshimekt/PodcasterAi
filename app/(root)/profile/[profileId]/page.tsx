'use client'
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React, { use } from "react";

const page = ({ params }: { params: Promise<{ profileId: string }> }) => {
  const { profileId } = use(params);
  const user = useQuery(api.users.getUserById, { clerkId: profileId });
  const podcastsData = useQuery(api.podcasts.getPodcastsByAuthorId, {
    authorId: profileId,
  });
  if (!user || !podcastsData) return <LoaderSpinner />;
  return (
    <section>
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gsp-6 max-md:items-center md:flex-row">
        {/* profile card */}
        <ProfileCard podcastData={podcastsData!}
        imageUrl={user?.imageUrl}
        userFirstName={user?.name}/>
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData?.podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  imgUrl={podcast.imageUrl!}
                  title={podcast?.podcastTitle}
                  description={podcast?.podcastDescription}
                  podcastId={podcast?._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default page;
