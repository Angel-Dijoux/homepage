import { Divider } from "@/components/Divider";
import { WorkGridItem } from "@/components/GridItem";
import { MarkdownWrapper } from "@/components/MarkdownWrapper";
import { Section } from "@/components/Section";
import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import { SkeletonImage } from "@/components/skeletons/SkeletonImage";
import Typography from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { createLazyFileRoute } from "@tanstack/react-router";
import useSWR from "swr";

export const Route = createLazyFileRoute("/works/")({
  component: Works,
});

type Label = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  shorten_description: string;
  image_url: string;
  github_url: string;
  project_url?: string;
  file_uri?: string;
  is_sio: boolean;
  labels?: Label[];
};

const calculateDelay = (index: number, offset: number) => {
  return (offset + index * 0.55 * 0.1) % 0.3;
};

function Works() {
  const { data: projects, isLoading } = useSWR<Project[]>("/projects/true");

  if (isLoading) return <SkeletonCard length={4} />;
  return (
    <AnimatedLayout title="Works">
      <Typography variant="h3">Works</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {projects?.map((project, index) => (
          <Section
            delay={calculateDelay(index, 0)}
            key={project.id}
            className="mt-0"
          >
            <WorkGridItem
              id={project.id}
              title={project.title}
              thumbnail={project.image_url}
            >
              <div className="mt-4">
                <MarkdownWrapper
                  content={project.shorten_description}
                  className="whitespace-pre-line"
                />
              </div>
            </WorkGridItem>
          </Section>
        ))}
      </div>
      <Section delay={0.2}>
        <Divider />

        <Typography variant="h3">Personal projects</Typography>
      </Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {projects?.map((project, index) => (
          <Section
            delay={calculateDelay(index, 0.2)}
            key={project.id}
            className="mt-0"
          >
            <WorkGridItem
              id={project.id}
              title={project.title}
              thumbnail={project.image_url}
            >
              <div className="mt-4">
                <MarkdownWrapper
                  content={project.shorten_description}
                  className="whitespace-pre-line"
                />
              </div>
            </WorkGridItem>
          </Section>
        ))}
      </div>
    </AnimatedLayout>
  );
}

const SkeletonCard = ({ length }: { length: number }) => {
  return (
    <>
      <Skeleton className="h-6 w-[150px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <SkeletonImage />
            <div className="space-y-2 ">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
