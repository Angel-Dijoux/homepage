import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import Paragraph from "@/components/Paragraph";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/ui/SectionTitle";
import Typography from "@/components/ui/Typography";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <AnimatedLayout>
      <div className="rounded-lg mb-6 p-3 text-center bg-muted backdrop-blur-lg">
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
          <Link to="works">
            <Button>Work</Button>
          </Link>
        </div>
      </Section>
    </AnimatedLayout>
  );
}
