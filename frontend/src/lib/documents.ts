export interface KnowledgeDocument {
  slug: string
  title: string
}

export interface KnowledgeCategory {
  name: string
  documents: KnowledgeDocument[]
}

function doc(slug: string): KnowledgeDocument {
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
  return { slug, title }
}

export const knowledgeBase: KnowledgeCategory[] = [
  {
    name: "Languages & Fundamentals",
    documents: [
      doc("a-command-line-todo-list-in-rust"),
      doc("adding-types-to-javascript-with-typescript"),
      doc("building-a-mini-game-in-java"),
      doc("data-structures-and-generics-in-java"),
      doc("first-steps-with-javascript"),
      doc("functional-programming-in-typescript"),
      doc("writing-a-tcp-chat-in-python"),
    ],
  },
  {
    name: "Data & Algorithms",
    documents: [
      doc("big-o-notation-and-algorithmic-complexity"),
      doc("choosing-the-right-data-structure"),
      doc("defining-a-database-schema-with-sql"),
      doc("querying-data-with-sql"),
      doc("relational-database-design-and-modelling"),
    ],
  },
  {
    name: "Web & Full-Stack",
    documents: [
      doc("building-a-blog-with-plain-php"),
      doc("building-a-full-stack-typescript-application"),
      doc("building-a-static-website-with-semantic-html-and-css"),
      doc("building-a-user-interface-with-react"),
      doc("moving-from-plain-php-to-a-framework"),
      doc("writing-an-http-api-with-bun-and-sqlite"),
      doc("writing-structured-documents-with-typst"),
    ],
  },
  {
    name: "Infrastructure & Ops",
    documents: [
      doc("continuous-integration-and-continuous-delivery"),
      doc("infrastructure-as-code-with-ansible"),
      doc("inside-a-modern-development-environment"),
      doc("ip-addressing-and-subnetting"),
      doc("running-applications-in-containers-with-docker"),
      doc("setting-up-a-linux-workstation-for-development"),
      doc("virtual-machines-and-when-to-use-them"),
      doc("what-linux-is-and-how-it-is-organised"),
      doc("working-in-the-unix-command-line"),
    ],
  },
  {
    name: "Process & Team",
    documents: [
      doc("choosing-a-test-strategy-for-an-application"),
      doc("delivering-a-laravel-application-as-a-scrum-team"),
      doc("how-software-development-methodologies-evolved"),
      doc("practising-test-driven-development-with-katas"),
      doc("principles-that-keep-code-maintainable"),
      doc("what-project-management-means-in-it"),
      doc("working-as-a-team-with-agile-and-scrum"),
      doc("working-well-inside-a-development-team"),
      doc("writing-useful-user-stories"),
    ],
  },
  {
    name: "Career & Communication",
    documents: [
      doc("keeping-a-cv-and-a-training-journal"),
      doc("preparing-and-delivering-an-oral-presentation"),
      doc("presenting-a-technical-subject-to-an-audience"),
    ],
  },
]

export const totalDocumentCount = knowledgeBase.reduce(
  (sum, category) => sum + category.documents.length,
  0,
)
