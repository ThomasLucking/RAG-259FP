# Concept original

En gros, ce que je voulais faire, c'est intégrer un LLM local qui va chercher des données côté serveur, comme les documents actuellement présents qui montrent plusieurs concepts de programmation, bases de données, bonnes pratiques de code, etc. Je voulais faire ça avec un backend en Python et un frontend en React utilisant TanStack Query pour appeler l'API que j'ai créée avec FastAPI.

# Première étape

D'abord, j'ai regardé quelles sont les principales étapes pour implémenter un RAG pour des choses très simples, notamment avec des LLMs locaux, ce qui se résumait en gros à : chunking -> embedding -> stockage des données dans une base de données vectorielle -> retrieval, ce qui est la même chose pour la requête de l'utilisateur, sauf qu'au lieu de stocker la requête, je l'embed simplement, puis j'interroge la base de données vectorielle avec la requête de l'utilisateur pour récupérer les plus proches.

Pour implémenter ça, j'ai d'abord créé `data_chunking.py` qui récupère les données depuis `/data`, et j'ai dû d'abord bien les parser avant de les embed. Donc la première chose que j'ai faite, c'était de chunker les headers de chaque fichier markdown, puis de découper le contenu des fichiers markdown.

J'ai dû faire ça pour pouvoir garder les sections séparées, et ce sera plus facile à embed puisque la quantité de contenu sera plus petite. Pour y arriver, j'ai dû utiliser le TextSplitter de LangChain, ce qui m'a donné des chunks.

# Deuxième étape

La deuxième étape était d'utiliser ces chunks et de les embed avec un modèle d'embedding. À la base, je prévoyais d'utiliser qwen3-embedding 4b, mais j'ai rencontré des problèmes puisque, quand je chunkais de grandes quantités de données, ça prenait trop de temps et ça drainait trop de batterie de mon ordinateur. J'ai donc décidé d'utiliser `nomic-embed-text`, qui était environ 30 fois plus petit et beaucoup plus rapide. Après avoir embed les données, j'ai dû les stocker dans une base de données vectorielle, donc j'ai choisi ChromaDB puisqu'elle est petite et que je n'avais pas besoin de faire tourner PostgreSQL pour quelque chose d'aussi simple.

# Troisième étape

Maintenant la troisième étape, qui était de générer la requête de l'utilisateur. À la base, je prévoyais de faire un truc similaire, c'est-à-dire chunk -> embed -> store, cependant, comme la requête de l'utilisateur était un simple fichier txt, je n'avais pas besoin de parser les headers ni rien. Et après avoir consulté Claude et des ressources en ligne, j'ai réalisé que je n'avais pas besoin de la stocker dans une base de données vectorielle, puisque c'est une simple requête utilisateur : je pouvais directement récupérer le prompt de l'utilisateur et l'embed. Ensuite, je l'interroge dans la base de données vectorielle.

# Couche API

Maintenant que le backend est terminé, le code n'est cependant pas encore modulaire. J'ai dû transformer chaque fichier en différentes fonctions et permettre le passage de paramètres. J'ai décidé de demander à Claude de le faire puisque je suis flemmard.

Après ça, j'ai créé 3 endpoints :

- POST /retrieve retourne les chunks de documents les plus pertinents pour une question donnée, sans génération de réponse.

- POST /query RAG complet : récupère les chunks pertinents et retourne une réponse générée par le LLM, ainsi que les chunks utilisés.

- GET /documents/{slug} — reconstitue et retourne le contenu complet d'un fichier markdown source à partir de son slug (tous ses chunks stockés recollés ensemble).

# Frontend

Une fois le backend terminé, j'ai décidé de demander directement à Claude de me créer l'interface utilisateur, que vous pouvez voir [ici](app.png).

# Problèmes rencontrés

- C'était un peu pénible au début puisque je ne savais pas qu'il fallait d'abord chunker les headers des fichiers markdown avant de chunker le contenu, donc j'ai rencontré beaucoup de problèmes où je n'arrivais pas à chunker les données correctement.

- Modèle d'embedding trop gros : quand j'ai essayé d'utiliser un modèle de 4b pour les embeddings, ça prenait trop de temps et ça drainait beaucoup trop de batterie.

- Sur-ingénierie de la requête utilisateur : j'ai passé environ 30-45 minutes à essayer d'implémenter le même flow avec la requête utilisateur, mais j'ai fini par comprendre qu'il suffisait d'embed la requête brute de l'utilisateur, puis d'interroger la vector db pour trouver les vecteurs correspondants.

# Fonctionnalités supplémentaires que j'aimerais ajouter

- Un moyen d'ajouter des documents de manière dynamique au lieu d'un dataset fixe.

- La possibilité pour l'utilisateur de choisir le modèle et le modèle d'embedding qu'il veut, surtout s'il a un meilleur setup, mais de façon user-friendly, sans avoir à modifier le code.

- Améliorer le style du site web, qui était un peu basique.

- Pouvoir upload différents types de fichiers, puisqu'actuellement l'embedding et le chunking ne fonctionnent que sur des fichiers markdown, mais j'aimerais aussi que ça fonctionne avec des fichiers txt, pdf, docx, etc.

- Donner un accès internet au LLM local pour qu'il puisse chercher plus de détails sur la requête de l'utilisateur.