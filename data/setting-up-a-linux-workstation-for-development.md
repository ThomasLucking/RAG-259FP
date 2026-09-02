---
title: Setting up a Linux workstation for development
summary: Overview of choosing a Linux distribution, installing it, managing packages, and keeping a development setup reproducible.
tags:
  - linux
  - debian
  - dev-environment
  - dotfiles
updated: 2025-09-02
---

## Choosing a distribution and installing the system

A development machine rarely runs the same operating system a new laptop
ships with. Vocational ICT programs often move apprentices away from the
factory-installed Windows environment toward a Linux distribution, because
Linux dominates servers and software shops and gives finer control over the
toolchain than a consumer OS.

### Why Linux, and why Debian

Linux distributions are operating systems built around the Linux kernel.
They differ in release philosophy, package format, and default software,
but share the same underlying model. Debian favours tested, stable packages
over bleeding-edge versions, and several other distributions, including
Ubuntu, build on top of it. That stability is why it is a common teaching
choice and a common server choice — two environments an apprentice meets
again later.

### Partitioning, dual-booting, and installing

Keeping the original Windows installation available alongside the new
Linux one is done through dual-booting: a boot menu lets the machine start
either system. This requires shrinking the Windows partition to free
unallocated disk space, then pointing the Linux installer at that free
space rather than at the Windows partition — one of the few genuinely
destructive steps in the process, and one worth double-checking before
confirming.

Installing itself usually happens from a bootable USB drive: an installer
image is written to a USB key, the machine boots from it, and the installer
walks through language, keyboard layout, time zone, and disk configuration.
Locale choices matter more than they look, since keyboard layout and
timezone affect daily work.

## Configuring the system for daily development work

### Package management

Debian-based systems manage software through `apt`, which installs from a
curated repository and resolves dependencies automatically. A freshly
installed system is brought up to date first, then further software — a
browser, an editor, command-line tools — is installed the same way. Some
desktop environments also support Flatpak, a separate packaging format with
its own repositories, extending the range of available applications beyond
what the distribution ships.

### Tuning the desktop and toolchain

Default desktop settings suit a general audience, not someone staring at
code all day: notification sounds, animation speed, visual effects, and
display scaling are typical candidates for adjustment. Beyond the desktop
itself, a toolchain needs at minimum a browser and a code editor, installed
either from the distribution's repository or from a vendor package. None of
these choices are final; apprentices keep tuning them as their workflow
evolves.

## Keeping the setup reproducible

A workstation configured once by hand is fragile: reinstalling the system
or moving to new hardware means redoing everything from memory. Most
command-line tools and editors read their settings from small
configuration files, commonly called dotfiles because their names start
with a dot. Keeping these files under version control, separate from the
system itself, means a workstation's personality — shell aliases, editor
preferences, terminal colours — can be restored deliberately instead of
rebuilt by hand after every reinstall.

Handing apprentices a ready-made image would be faster, but it would remove
the point of the exercise. Installing and configuring the system themselves
exposes them to partitioning, package management, and the general shape of
Linux administration, skills expected independently of any single project.
It also produces a machine they actually understand, which matters the
first time something on it breaks.
