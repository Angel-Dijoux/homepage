import { MarkdownWrapper } from "@/components/MarkdownWrapper";
import { AnimatedLayout } from "@/components/layouts/AnimatedLayout";
import Typography from "@/components/ui/Typography";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/quantum/")({
  component: Quantum,
});

const QuantumMD = `
L'informatique quantique est un domaine multidisciplinaire qui utilise les principes de la mécanique quantique pour résoudre des problèmes complexes que nos ordinateurs conventionnels ne pourront jamais gérer. C'est particulièrement le cas pour certains algorithmes dont le temps de calcul, même sur nos supercalculateurs les plus puissants, évolue de manière exponentielle ou est estimé à plus de 13 milliards d'années ! L'objectif des ordinateurs quantiques serait donc de résoudre des problèmes en temps polynomial au moins, voire linéaire ou logarithmique.

![Olivier Ezratty Quantum illustration](https://assets-global.website-files.com/649e211f56977b29f1d2308a/651d959ff9469d69ca889b61_Oliver1.png)


## Types d'architecture

Les architectures d'ordinateurs quantiques sont des structures complexes qui représentent le cœur même de l'informatique quantique. Il est important de comprendre que concevoir et construire un ordinateur quantique est un défi majeur pour les physiciens, ingénieurs et chercheurs, à la fois sur le plan théorique et pratique. De plus, chaque type d'architecture, qu'il s'agisse de supraconducteurs, d'atomes neutres ou de photons, présente ses propres défis techniques et nécessite une expertise spécifique. Ces architectures diverses reflètent la diversité et la complexité de l'informatique quantique, et leur développement nécessite des efforts d'ingénierie considérables pour surmonter les obstacles.

- Superconducteur :
	 Cette architecture repose sur des circuits supraconducteurs pour stocker et manipuler l'information quantique. Bien que ces circuits soient macroscopiques, ils possèdent des propriétés quantiques telles que des états quantifiés, la superposition d'états et l'intrication. Les circuits supraconducteurs sont utilisés pour définir des qubits supraconducteurs, qui sont manipulés par des impulsions électromagnétiques. Les ordinateurs supraconducteurs font partie des plateformes les plus avancées en informatique quantique et font l'objet de recherches et de développements intensifs par de nombreuses entreprises (Alice&Bob, IBM, Google) et laboratoires.

- Atome neutre  : 
	 Ensuite vient l'ordinateur quantique à atomes neutres. Dans ce type d'ordinateur, les qubits sont généralement représentés par les états quantiques des atomes. Les atomes sont maintenus dans des pièges quantiques créés par des champs magnétiques ou des lasers, permettant un contrôle précis de leur mouvement et de leur interaction. L'avantage des ordinateurs quantiques à atomes neutres réside dans la facilité avec laquelle les qubits peuvent être manipulés et interagir les uns avec les autres, offrant la possibilité de calculs quantiques complexes et précis. Ces systèmes font l'objet d'études intensives dans le domaine de l'informatique quantique (par des entreprises telles que Pasqal, Quantinuum, QuEra et des laboratoires), car ils permettent de résoudre des problèmes difficiles et d'améliorer les performances des ordinateurs quantiques.

- Photons : 
	 Enfin, il y a les ordinateurs quantiques photoniques. Ceux-ci exploitent les propriétés uniques des photons en tant que porteurs d'information quantique. Grâce à leur faible décohérence et à leur facilité de manipulation, les photons sont des candidats idéaux pour le transport et le traitement des qubits. Des avancées technologiques et théoriques récentes ont permis aux ordinateurs quantiques photoniques de surmonter les défis associés à l'inefficacité des portes logiques à deux qubits, promettant des avancées significatives dans le traitement de l'information quantique. En conséquence, cette approche, développée par des entreprises (Quandela, PsiQuantum) et des laboratoires, se positionne parmi les technologies de pointe pour l'avenir de l'informatique quantique.


## Innovations

**Réseau neutre de tenseurs** : Utilisation de techniques d'algorithmie quantique appliquées à des LLM de type LLaMa pour réduire leur taille tout en maintenant les mêmes performances.  
Cette technique appliqué à l'IA permets de traiter de l'information quantique, des modélisations de matière condensée.
https://multiversecomputing.com/papers/application-of-tensor-neural-networks-to-pricing-bermudan-swaptions
`;

function Quantum() {
  return (
    <AnimatedLayout title="Informatique Quantique">
      <Typography variant="h3">Informatique quantique</Typography>
      <MarkdownWrapper content={QuantumMD} textOnly={false} />
    </AnimatedLayout>
  );
}
