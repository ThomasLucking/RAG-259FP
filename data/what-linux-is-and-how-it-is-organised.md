---
title: What Linux is and how it is organised
summary: Overview of the Linux kernel, distributions, package managers, the filesystem hierarchy, permissions, and why developers still meet Linux on servers.
tags:
  - linux
  - kernel
  - distributions
  - filesystem
updated: 2025-09-08
---

## The kernel and what surrounds it

### What the kernel actually does

Linux, strictly speaking, is a kernel, not a complete operating
system: it mediates between hardware and software, scheduling the
processor, managing memory, and exposing devices, storage and
network interfaces to programs. On its own it cannot present a
desktop or install software, so it is necessary but not sufficient
for a usable system. A Linux system is better seen as a stack of
layers than as one indivisible block: the kernel talks to hardware,
system libraries such as glibc provide services to programs, GNU
tools and a shell handle user interaction, and applications sit on
top. Because the kernel ships none of that on its own, someone has
to assemble the rest before a computer boots into something usable.

### From kernel to distribution

That assembly work is what turns a kernel into a distribution, why
many different Linux systems exist despite sharing the same core.

## Distributions and package management

### What a distribution assembles

A distribution combines the kernel with the libraries, init system,
shell, toolchain and installer needed for a working system. Debian,
Fedora, Arch Linux and Alpine each choose their own components and
defaults, acting as integrators who decide which hardware is
supported and sometimes sell support on top of software that stays
free.

### Families and their package managers

Debian and its derivatives, including Ubuntu, use `apt` with `dpkg`
packages; Red Hat, CentOS and Fedora use `dnf` with `rpm`; Arch relies
on `pacman`, Alpine on the lightweight `apk`, and Gentoo builds from
source with `emerge`. Whatever the family, a package manager resolves
dependencies, applies updates and reports what is installed.

### The filesystem hierarchy standard

Most Linux systems follow the Filesystem Hierarchy Standard, agreeing
on where things live. Everything starts at the root, `/`: `/home`
holds personal user directories, `/etc` static configuration, `/var`
data that changes often such as logs, `/usr` most installed binaries
and libraries, `/boot` files needed to start the system, and `/tmp`
files that do not survive a reboot — a shared layout that lets
scripts and habits carry over between distributions.

## Users, processes and why servers still run Linux

### Users, groups and permissions

Linux is a multi-user system: every process runs as some user, and
every file belongs to an owning user and group. Permissions cover
three actors, owner, group and everyone else, and three actions,
reading, writing and executing. This keeps one user's mistakes, or a
compromised application, from touching another user's files or the
system configuration, while groups let users share access without
full administrative rights.

### Processes and services

Once booted, a first process starts with identifier 1 and becomes the
ancestor of every other process. On most distributions this role is
filled by systemd, though alternatives such as openrc, s6 or runit
take a more modular approach. This init system also starts, stops and
supervises long-running services such as web servers or databases,
restarting them if they fail and ordering them at boot.

### Why developers meet Linux anyway

Apprentices who use Windows or macOS on their own laptop still meet
Linux constantly, because the servers running web applications,
databases and container platforms overwhelmingly run it. A project
deployed to a cloud provider or packaged into a container almost
always runs on a Linux distribution underneath, whatever development
happened locally.
