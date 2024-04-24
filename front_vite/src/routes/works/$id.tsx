import { ProjectWithLabels } from "@/bindings/ProjectWithLabels";
import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import { MarkdownWrapper } from "@/components/MarkdownWrapper";
import { SkeletonImage } from "@/components/skeletons/SkeletonImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonWithIcon } from "@/components/ui/ButtonWithIcon";
import Typography from "@/components/ui/Typography";
import { SuspenseImage } from "@/lib/SuspenseImage/SuspenseImage";
import { FileIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import useSWR from "swr";

export const Route = createFileRoute("/works/$id")({
  component: WorkDetails,
});

function WorkDetails() {
  const { id } = Route.useParams();
  const { data: project, isLoading } = useSWR<ProjectWithLabels>(
    `/project/${id}`,
  );

  if (isLoading) { return <div>Loading...</div>; }
  return (
    <AnimatedLayout title={project?.title} imgSrc={project?.image_url}>
      <Typography variant="h3" className="my-4">
        {project?.title}
      </Typography>
      <div className="h-72 w-full mb-4">
        <Suspense fallback={<SkeletonImage />}>
          <SuspenseImage
            src={project?.image_url}
            className="rounded-md border object-cover h-full w-full"
          />
        </Suspense>
      </div>
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
        {project?.file_uri
          ? (
            <a href={project.file_uri} target="_blank">
              <ButtonWithIcon
                IconLeft={<FileIcon width={ICON_SIZE} height={ICON_SIZE} />}
              >
                File
              </ButtonWithIcon>
            </a>
          )
          : null}
        {project?.project_url
          ? (
            <a href={project.project_url} target="_blank">
              <Button>Visite</Button>
            </a>
          )
          : null}
      </div>
      <div className="mt-14">
        <MarkdownWrapper content={project?.description} textOnly={false} />
      </div>
    </AnimatedLayout>
  );
}

const ICON_SIZE = 18;
