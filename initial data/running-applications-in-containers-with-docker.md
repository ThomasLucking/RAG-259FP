---
title: Running applications in containers with Docker
summary: Covers containers versus virtual machines, images, the build and lifecycle, volumes, and multi-service networking.
tags:
  - docker
  - containers
  - devops
updated: 2026-06-01
---

## Containers versus virtual machines

A container packages an application with the libraries and files it
needs, without a full operating system. Unlike a virtual machine, it
shares the host kernel rather than booting its own or emulating
hardware, isolating only the application's process, filesystem, and
network. This makes containers far lighter and faster to start, at
the cost of a narrower isolation boundary.

### What a container is not

A container is not a small computer with its own operating system,
despite looking that way from inside. Nor is it a permanent place to
store data: anything written to its writable layer disappears once
removed, unless placed somewhere durable on purpose. Confusing a
container with a tiny server explains most apprentices' surprises in
their first weeks with Docker.

### Images, layers, and the registry

A container is a running instance of an image: a frozen, read-only
snapshot of files and instructions captured at build time. Images are
assembled from layers, each a single change such as installing a
package or copying a file; layers are cached and shared between
images, so rebuilding after a small change is usually fast. Images
are stored and distributed through registries, catalogues of named,
versioned images letting a colleague or server pull the exact image
built and tested elsewhere, without re-installing by hand.

## Building and running a container

### The recipe file and the build step

An image is described by a recipe file that lists, in order, the base
image to start from and the steps to produce the final result:
copying source files, installing dependencies, declaring a default
command. Building that recipe produces the image; running the image
produces a container, so the same image can be built once and started
many times, identically, on any machine running the same engine.

### The container lifecycle

A container moves through a small set of states: created, running,
stopped, and removed. Stopping keeps it on disk so it can be
restarted later with its writable layer intact; removing discards
that layer for good. Commands that list running or stopped
containers, or clean up unused images, keep a development machine
from accumulating leftovers from every experiment.

### Ports and environment variables

By default, a container's network is closed off from the host: a
server listening on a port inside it is unreachable from outside
unless that port is explicitly published, mapping a host port to a
container port. Configuration that varies between environments, such
as a database password or an API address, is usually passed in
through environment variables at startup, rather than hard-coded into
the image.

## Running several services together

### Volumes and where data actually lives

Because a container's writable layer disappears with the container,
anything that must outlive it, such as a database's files, needs a
volume: a storage area managed by the container engine and attached
at a chosen path. Removing and recreating a container that stores its
data in a volume leaves that data untouched, which is what makes
routine upgrades and rebuilds safe.

### Services that find each other by name

A realistic project is rarely a single container: a frontend, a
backend, and a database commonly run as separate services that need
to talk to each other. Tools that describe a whole stack in one
configuration file give each service a name on a shared network, and
that name works as an address, so a backend can reach its database by
service name instead of an IP address that would otherwise change on
every restart. Combined with a recipe file per service, this gives a
team a reproducible environment: the same services, versions, and
configuration run the same way on a laptop, a colleague's machine, or
a server.
