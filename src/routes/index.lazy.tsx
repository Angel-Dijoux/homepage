import Paragraph from "@/components/Paragraph";
import { Section } from "@/components/Section";
import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import { ButtonWithIcon } from "@/components/ui/ButtonWithIcon";
import SectionTitle from "@/components/ui/SectionTitle";
import Typography from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DoubleArrowRightIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

const LazyPLanet = lazy(() => import("../components/planet"));

function Home() {
  return (
    <AnimatedLayout>
      <Suspense
        fallback={
          <Skeleton className="w-full max-w-[600px] h-[600px] aspect-w-1 aspect-h-1 " />
        }
      >
        <LazyPLanet />
      </Suspense>
      <div className="relative rounded-lg mb-6 p-3 text-center backdrop-blur-lg bg-accent">
        <Typography variant="h3" affects="large">
          Hi, I'm an software engineer!
        </Typography>
      </div>

      <div className="md:flex">
        <div className="grow-2">
          <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 ">
            Angel Dijoux
          </h2>
          <p>CypherPunk ( Photographer / Developer )</p>
        </div>
        <div className="shrink-0 md:mt-0 mt-4 md:ml-6 text-center">
          <div className="border-gray-300 border-2 border-solid w-24 h-24 inline-block rounded-full overflow-hidden">
            <img
              src="http://angel.dijoux.free.fr/images/profile_picture.jpg"
              alt="Jojo's Angel PP"
              height="100"
              width="100"
            />
          </div>
        </div>
      </div>

      <Section delay={0.1}>
        <SectionTitle variant="h3">Work</SectionTitle>
        <Paragraph>
          Angel is a full-stack software engineer and photographer based in
          Lille with a passion for technology and visual creativity. She merges
          these two domains to deliver unique experiences. She also prioritizes
          privacy as a point of honor in all the missions she undertakes.
        </Paragraph>
        <div className="flex justify-center my-4">
          <Link to="/works">
            <ButtonWithIcon IconRight={<DoubleArrowRightIcon />}>
              Portefolio
            </ButtonWithIcon>
          </Link>
        </div>
      </Section>

      <Section delay={0.2}>
        <SectionTitle variant="h3">Madly in Love with</SectionTitle>
        <Paragraph>
          Music, Quantum Computing,{" "}
          <a href="https://www.instagram.com/elki_8/" target="_blank">
            <Button variant="link" className="p-0 m-0 text-base">
              Photography
            </Button>
          </a>
          , Videography, Urban Art, Linux
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <SectionTitle variant="h3">Arround the World Wide Web</SectionTitle>
        <div className="flex justify-center items-start flex-col gap-2 mt-2">
          <a href="https://github.com/Angel-Dijoux" target="_blank">
            <ButtonWithIcon
              variant="ghost"
              IconLeft={<GitHubLogoIcon width={ICON_SIZE} height={ICON_SIZE} />}
            >
              @Angel-Dijoux
            </ButtonWithIcon>
          </a>
          <a href="https://www.instagram.com/elki_8/" target="_blank">
            <ButtonWithIcon
              variant="ghost"
              IconLeft={
                <InstagramLogoIcon width={ICON_SIZE} height={ICON_SIZE} />
              }
            >
              @elki_8
            </ButtonWithIcon>
          </a>
          <a
            href="https://www.linkedin.com/in/angel-d-4091a3253/"
            target="_blank"
          >
            <ButtonWithIcon
              variant="ghost"
              IconLeft={
                <LinkedInLogoIcon width={ICON_SIZE} height={ICON_SIZE} />
              }
            >
              @Angel-Dijoux
            </ButtonWithIcon>
          </a>
        </div>
      </Section>
    </AnimatedLayout>
  );
}

const ICON_SIZE = 18;
