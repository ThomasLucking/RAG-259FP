---
title: Continuous integration and continuous delivery
summary: Surveys the CI/CD pipeline from commit to deployment, covering stages, artifacts, delivery versus deployment, environments, secrets, caching, and rollback.
tags:
  - ci-cd
  - devops
  - pipelines
  - deployment
updated: 2026-06-22
---

Every commit is a promise that the project still works. Continuous
integration and continuous delivery, together shortened to CI/CD, are the
practice of checking that promise automatically, every time code changes,
and of moving a verified change toward production without manual,
repetitive handling.

## The integration problem CI was invented to solve

### Merging in isolation

Before CI became common, developers on the same project often worked for
days or weeks on separate branches before merging. Each branch drifted
further from the others, so integration itself became a risky, occasional
event: files conflicted, one module's changes silently broke another, and
nobody found out until the branches finally met.

The fix that gave continuous integration its name is simple to state and
hard to skip: integrate constantly, in small increments, so that any
conflict or breakage is caught within minutes of being introduced rather
than weeks later. A short feedback loop turns integration from a dreaded
event into a routine, low-risk step.

### Why manual releases do not scale

The same drift happens at release time. A person who rebuilds and
redeploys by hand, following a checklist, will eventually skip a step,
run an outdated command, or deploy from the wrong branch. The mistake is
not a lack of discipline; it is that repetitive manual work is inherently
error-prone, and the person doing it is also the one least likely to
notice a subtle omission in their own routine.

Automating that repetitive work does not remove judgment from the
process; it removes the chance of a typo or a forgotten step from an
otherwise mechanical task, and it produces a record of exactly what ran,
in what order, and with what result.

## The pipeline as an assembly line

### Stages as workstations

A CI/CD pipeline is easiest to picture as an assembly line. Each change
travels down the line and moves through a sequence of stations: one
station assembles the change, another inspects it for defects, another
packages the result, and a final one ships it. A defect found at any
station stops that unit from moving further; nothing downstream ever
receives a faulty piece.

This ordering matters as much as the checks themselves. A station only
starts once the station before it has finished successfully, so a failed
build never reaches the testing station, and a failed test never reaches
deployment. The pipeline enforces the order; nobody has to remember it.

### Jobs, steps and runners

Pipelines describe their work as jobs, and jobs as an ordered list of
steps: a step checks out the code, another installs dependencies, another
runs a command. Several jobs can run at the same time when they do not
depend on each other, which is how a pipeline keeps its total running
time short even as more checks are added.

Each job typically executes on a runner: a freshly provisioned, disposable
machine that knows nothing about the project until a step explicitly
fetches the code onto it. Hosted CI services provide these runners on
demand, in a standard image, and discard them once the job ends, so a job
cannot accumulate hidden state between runs.

### Triggers that start the line

A pipeline does not run on its own initiative; a trigger starts it. The
most common trigger is a push to a branch, but pipelines also commonly
react to a proposed change before it is merged, to a scheduled time of
day, or to a manual request from a person. Choosing the right trigger is
part of the pipeline's design: running the full pipeline on every push
keeps feedback fast, while reserving costlier checks for a schedule keeps
them from slowing down everyday work.

## From build to artifact

### The build stage

The build stage turns source code into something that can actually run:
compiled binaries, a bundled application, a rendered set of static files.
Its job is narrow but essential: confirm that the project still assembles
correctly given its current dependencies and configuration. A build stage
that fails is not a nuisance; it is the earliest and cheapest point at
which a broken change can be caught.

### The test stage

Once a build succeeds, the pipeline can run automated checks against it:
unit tests, style and linting rules, checks for broken references,
security scans. These checks answer a different question than the build
did: not whether the project assembles, but whether it behaves as
expected. Separating them into their own stage or job keeps a failure
easy to attribute to a specific cause.

### Producing and storing artifacts

Whatever a build stage produces that is worth keeping — a compiled
package, a set of generated files, a container image — is called an
artifact. Pipelines commonly separate the job that builds an artifact
from the job that later deploys it, and pass the artifact between them
rather than rebuilding it twice. This separation guarantees that the
exact thing tested is the exact thing shipped, with nothing rebuilt, and
therefore possibly different, in between.

## Delivery, deployment and environments

### Continuous delivery versus continuous deployment

Both terms are commonly shortened to CD, and the difference between them
is a single decision point. Continuous delivery means every change that
clears its checks is packaged and ready to release at any moment, but a
person still decides when to trigger the release. Continuous deployment
removes that decision: a change that clears every check is released
automatically, with no human step in between. Neither is strictly better;
the choice depends on how much confidence the checks actually earn and
how much oversight a release deserves.

### Environments and promotion

Pipelines rarely deploy straight from a laptop to production. Instead, a
change typically moves through a sequence of environments — for instance
a staging environment that mirrors production closely enough to catch
integration issues, then production itself — and each environment can
carry its own configuration, its own approvals, and its own safeguards.
Requiring manual approval before a deployment reaches a sensitive
environment is exactly how continuous delivery keeps its human checkpoint
without giving up automation everywhere else.

### Secrets and least privilege

A pipeline that deploys needs credentials: a token, a key, a stored
credential. Keeping that value directly inside a workflow file or a
script would expose it to anyone who can read the repository, so CI
platforms provide an encrypted store for secrets instead, injecting them
into a job only at run time and keeping them out of logs. The same
principle of least privilege applies to what a pipeline may do at all: by
default a job can typically read a repository but not publish anywhere,
and any broader permission has to be granted explicitly, station by
station, rather than assumed.

## Speed, safety and recovery

### Caching to keep the line moving

Reinstalling every dependency from scratch on every run wastes time
without adding safety, so pipelines commonly cache the outputs of slow,
repeatable steps — downloaded packages, compiled intermediates — between
runs. Caching speeds up feedback without changing what is actually being
verified, which is why it is worth adding once a pipeline is already
correct, not before.

### Deployment strategies

Shipping a new version does not have to mean replacing the old one
outright. A pipeline can shift traffic gradually to the new version while
watching for errors, or it can keep the previous version fully running
behind the new one so that switching back requires no rebuild at all.
These strategies trade some complexity for the ability to limit how many
users are affected if something is still wrong despite every earlier
check clearing.

### Rollback and what a red pipeline should mean

Even a pipeline with a thorough test stage cannot catch every defect,
because some problems only surface once real users, real data, or real
traffic reach a deployment. The response is never to edit a running
system by hand; it is to go back to the source and correct the change
there, then let the same pipeline redeploy the fix exactly as it deployed
the mistake. The history stays honest, and the recovery uses the same
trusted path as every other release.

A pipeline that turns red is not a failure of the team; it is the system
doing exactly the job it exists for. A team that treats a red pipeline as
routine information, to be fixed before anything else moves forward,
gets the benefit CI/CD was built to provide. A team that grows used to
ignoring a red pipeline, or that merges past it anyway, has quietly
turned the whole line back into unpaid, unreliable manual work.
