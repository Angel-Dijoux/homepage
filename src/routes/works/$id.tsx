import { MarkdownWrapper } from "@/components/MarkdownWrapper";
import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import { SkeletonImage } from "@/components/skeletons/SkeletonImage";
import Typography from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import useSWR from "swr";
import { Project } from "./index.lazy";

export const Route = createFileRoute("/works/$id")({
  component: WorkDetails,
});

function WorkDetails() {
  const { id } = Route.useParams();
  const { data: project, isLoading } = useSWR<Project>(`/project/${id}`);

  if (isLoading) return <div>Loading...</div>;
  return (
    <AnimatedLayout title={project?.title}>
      <Typography variant="h3" className="my-4">
        <MarkdownWrapper content={project?.title} />
      </Typography>
      <Suspense fallback={<SkeletonImage />}>
        {project?.image_url ? (
          <SuspenseImage
            src={project.image_url}
            className="rounded-md border mb-4"
          />
        ) : null}
      </Suspense>
      {project?.labels?.map((label) => {
        return <Badge key={label.id}>{label.label}</Badge>;
      })}
      <div className="flex flex-row items-center gap-3 mt-4">
        <a href={project?.url} target="_blank">
          <Button>Voir</Button>
        </a>
        {project?.second_url ? (
          <a href={project.second_url} target="_blank">
            <Button>View</Button>
          </a>
        ) : null}
      </div>
      <div className="mt-4">
        <MarkdownWrapper content={project?.description} />
      </div>
    </AnimatedLayout>
  );
}
