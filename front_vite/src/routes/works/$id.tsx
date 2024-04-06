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
import { ButtonWithIcon } from "@/components/ui/ButtonWithIcon";
import { FileIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

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
        <MarkdownWrapper content={project?.title} textOnly={false} />
      </Typography>
      <Suspense fallback={<SkeletonImage />}>
        <SuspenseImage
          src={project?.image_url}
          className="rounded-md border mb-4"
        />
      </Suspense>
      <div className="flex  gap-2">
        {project?.labels?.map((label) => {
          return (
            <Badge key={label.id} variant="secondary">
              {label.name}
            </Badge>
          );
        })}
      </div>
      <div className="flex flex-row items-center gap-3 mt-4">
        <a href={project?.github_url} target="_blank">
          <ButtonWithIcon
            IconLeft={<GitHubLogoIcon width={ICON_SIZE} height={ICON_SIZE} />}
          >
            View on GitHub
          </ButtonWithIcon>
        </a>
        {project?.file_uri ? (
          <a href={project.project_url} target="_blank">
            <ButtonWithIcon
              IconLeft={<FileIcon width={ICON_SIZE} height={ICON_SIZE} />}
            >
              File
            </ButtonWithIcon>
          </a>
        ) : null}
        {project?.project_url ? (
          <a href={project.project_url} target="_blank">
            <Button>Visite</Button>
          </a>
        ) : null}
      </div>
      <div className="mt-14">
        <MarkdownWrapper content={project?.description} textOnly={false} />
      </div>
    </AnimatedLayout>
  );
}

const ICON_SIZE = 18;
