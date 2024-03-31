import { Divider } from "@/components/Divider";
import { WorkGridItem } from "@/components/GridItem";
import { Section } from "@/components/Section";
import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import Typography from "@/components/ui/Typography";
import useSWR from "swr";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Label {
  id: number;
  label: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  second_url?: string;
  is_sio: boolean;
  labels?: Label[];
}

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

const calculateDelay = (index: number, offset: number) => {
  return (offset + index * 0.55 * 0.1) % 0.3;
};

export function Works() {
  const { data: projects } = useSWR<Project[]>("/project");
  console.log(projects, markdown);

  const createMarkdownMarkup = (content: string) => ({
    __html: content,
  });

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
              thumbnail="https://cdn.sanity.io/images/wuakm03c/production/67dc4f6e5d922f4e44481e4084f0d8b4a9ac4299-3840x2160.png?w=3840&fit=max&auto=format"
            >
              <div className="mt-4">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {project.description}
                </Markdown>
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
              thumbnail="https://cdn.sanity.io/images/wuakm03c/production/67dc4f6e5d922f4e44481e4084f0d8b4a9ac4299-3840x2160.png?w=3840&fit=max&auto=format"
            >
              <div className="mt-4">
                <div
                  className="flex flex-col justify-center"
                  dangerouslySetInnerHTML={createMarkdownMarkup(
                    project.description
                  )}
                />
              </div>
            </WorkGridItem>
          </Section>
        ))}
      </div>
    </AnimatedLayout>
  );
}
