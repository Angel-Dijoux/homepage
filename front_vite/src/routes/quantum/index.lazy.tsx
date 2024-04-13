import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import Typography from "@/components/ui/Typography";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/quantum/")({
  component: Quantum,
});

function Quantum() {
  return (
    <AnimatedLayout title="Informatique Quantique">
      <Typography variant="h3">Informatique quantique</Typography>
      <div>
        <p>Hello</p>
      </div>
    </AnimatedLayout>
  );
}
