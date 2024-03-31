import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/works/$id")({
  component: WorkDetails,
});

function WorkDetails() {
  const { id } = Route.useParams();
  return <p>{id}</p>;
}
