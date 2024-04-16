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


## Internet Quantique 
L'internet quantique révolutionne la communication en exploitant les principes quantiques pour offrir une sécurité inégalée et des capacités de transmission ultrarapides. Grâce aux qubits et aux protocoles quantiques, il promet un réseau mondial ultra-sécurisé et ultra-rapide, ouvrant la voie à de nouvelles avancées dans la sécurité des données et les communications à longue distance.

## Cryptographie Quantique
La cryptographie quantique réinvente la sécurité des données en exploitant les lois de la physique quantique pour protéger les communications. En utilisant des principes comme l'intrication quantique et l'incertitude quantique, elle offre un niveau de sécurité inégalé, rendant les communications pratiquement inviolables. En permettant la distribution de clés quantiques et la transmission d'information de manière totalement sécurisée, elle ouvre la voie à un futur où les données sensibles sont protégées de manière absolue contre les cyberattaques.

## Cryptographie Post-Quantique
La cryptographie post-quantique se prépare pour un futur où les ordinateurs quantiques pourraient menacer les systèmes cryptographiques actuels. Elle vise à développer des algorithmes de chiffrement capables de résister aux attaques des ordinateurs quantiques. En utilisant des techniques basées sur des problèmes mathématiques difficiles à résoudre même pour les ordinateurs quantiques, la cryptographie post-quantique assure la sécurité des données dans un paysage technologique en constante évolution, offrant une transition en douceur vers une ère où la puissance de calcul quantique ne compromettra pas la confidentialité des informations sensibles.

## Innovations technique
**Réseau neutre de tenseurs** : Utilisation de techniques d'algorithmie quantique appliquées à des LLM de type LLaMa pour réduire leur taille tout en maintenant les mêmes performances.  
Cette technique appliqué à l'IA permets de traiter de l'information quantique, des modélisations de matière condensée.
https://multiversecomputing.com/papers/application-of-tensor-neural-networks-to-pricing-bermudan-swaptions


**Correction d'erreur quantique** : QuEra une entreprise hardware du quantique annonce sa roadmap sur la correction d'erreur quantique ils annoncent de gros changements et des algorithms perfomants.
https://www.quera.com/press-releases/quera-computing-releases-a-groundbreaking-roadmap-for-advanced-error-corrected-quantum-computers-pioneering-the-next-frontier-in-quantum-innovation


**Correction d'erreur quantique** : Google annonce une approche plus optimisée de la correction d'erreur avec des mesures de base Y et l'optimisation d'une porte quantique.
https://ar5iv.labs.arxiv.org/html/2302.07395


**Simulation Quantique** : Grâce à l'informatique quantique des chercheurs en laboratoire ont pu simulé des champs fondamentaux de la nature. 
https://arxiv.org/pdf/2404.06298.pdf


**Sous-Système classique pour l'informatique quantique** : Découverte que des propriétés presque classique jaillice dans l'informatique quantique.
https://news.aqora.io/s/fxz6ee/search_for_classical_subsystems_quantum

**Qubit Leak on error corrected** : Google annonce un algorithm qui permet de travailler avec des qubit imparfait qui dépasse les états \`1\` et \`0\` lors de la correction d'erreurs quantique. 
https://research.google/blog/overcoming-leakage-on-error-corrected-quantum-processors/

**Les effets de la mesure** : Google propose une expérience qui permet de montrer les effets de la mesure sur l'intrication. 
https://research.google/blog/measurement-induced-entanglement-phase-transitions-in-a-quantum-circuit/

**MQPQ** : ColibriTD annonce une librairie open-source qui permet de faire en python des algorithms multiplateforme.
https://github.com/ColibrITD-SAS/mpqp

## Innovations politique

**Pacte de Delft** : Des accords de codéveloppement existent entre la France et les Pays-Bas afin de faciliter le développement de l'informatique quantique. Ces accords inclus notamment des aides pour les étudiants chercheurs.euses. 
https://presse.economie.gouv.fr/13042023-la-france-et-les-pays-bas-signent-un-pacte-pour-linnovation-et-la-croissance-durable/

**Les Maisons du Quantique** : L'ouverture d'une place physique de co-développement à Paris. 
https://lelabquantique.com/la-premiere-maison-du-quantique-ouvre-ses-portes-a-station-f-une-etape-cruciale-pour-lecosysteme-quantique-francais/

**OVH x QUANDELA** : Quandela une start-up française de hardware quantique annonce officielellement la présence d'un oridinateur quantique à OVH Roubaix.

**Job Board Quantique** : Initiative française proposer par Le Lab Quantique pour un job board spécialisé dans le quantique. 
https://lelabquantique.com/jobs/

**PAC Quantique** : Aide de la region île de france pour le développement du quantique.

## Autre

**SSL x Quantique** : L'an dernier OpenSSL organise en partie un hackaton prenant en compte les algorithmes quantiques fonctionnant sur les ordinateurs classiques pour permettre une intégration des standards exsitant avec les nouveaux défis de sécurité. 
`;

function Quantum() {
  return (
    <AnimatedLayout title="Informatique Quantique">
      <Typography variant="h3">Informatique quantique</Typography>
      <MarkdownWrapper content={QuantumMD} textOnly={false} />
    </AnimatedLayout>
  );
}
