---
title: IP addressing and subnetting
summary: Explains how devices are identified on a network, how an IPv4 address splits into network and host parts, and what IPv6 changes.
tags:
  - networking
  - ipv4
  - ipv6
  - subnetting
updated: 2025-11-17
---

## Networks, switches, and routers

### What a network is

A network is a set of devices that share resources and exchange data once
they agree on common rules and route traffic to the right place. Every
device carries a MAC address, a physical identifier with no location info.

### Switches and routers

A switch connects devices on one local network, reading MAC addresses
to forward frames only to the destination port, not everywhere. A router
connects separate networks and decides, from the destination IP, where a
packet travels next; the default gateway is just that router.

### Why IP addresses exist

Because MAC addresses carry no location, a network needs a logical,
hierarchical identifier: the IP address. It works like a hotel room number
— one part names the floor, the rest the room — so a router can route
toward a network without knowing every device inside it.

## IPv4 structure and subnetting

### Address and mask

An IPv4 address is a 32-bit number, written as four decimal octets separated
by dots, each from 0 to 255. It splits into a network part, shared by every
device on the network, and a host part unique to one device. The subnet
mask marks that split: consecutive 1s for the network, then consecutive 0s
for the host. CIDR notation writes the same split more compactly, e.g. /24
for 255.255.255.0.

### Network and broadcast addresses

Within any block, the first address (host bits all 0) identifies the
network itself, and the last (host bits all 1) is the broadcast address,
reaching every device at once. Neither can be assigned to a device, so a
block sized for 2^h hosts holds only 2^h minus 2 usable ones.

### Reasoning in binary

Subnetting borrows bits from the host part to create smaller, separate
networks, isolating devices and limiting broadcast traffic. Finding the
boundaries means lining up address and mask bit by bit: where the mask
switches from 1s to 0s marks where the network part ends. Each borrowed bit
doubles the subnet count while halving the hosts per subnet — a sizing
trade-off. Older classful addressing (A, B, C) fixed a mask from the first
octet alone; CIDR replaced it.

### Private ranges, gateway, and DNS

Some ranges are reserved for internal use and never routed publicly:
10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. A router typically translates
these into one public address via NAT (Network Address Translation). A
device also needs a default gateway and DNS servers to translate names into
IP addresses; DHCP usually assigns all of this automatically, for a limited
lease rather than permanently.

## What IPv6 changes

### A much larger address space

IPv4 offers roughly 4.3 billion addresses, already exhausted given the number
of connected devices worldwide. IPv6 replaces it with a 128-bit address,
large enough that exhaustion stops being a practical concern.

### Notation and address types

An IPv6 address is written in hexadecimal, as eight groups of four digits
separated by colons; leading zeros can be dropped, and one run of all-zero
groups collapsed to a double colon. It splits into a network prefix and an
interface identifier, usually 64 bits each. Global unicast addresses are
publicly routable, unique local addresses stay internal like IPv4 ranges,
and link-local ones form automatically within one network segment.

### Practical differences from IPv4

IPv6 drops broadcast in favor of multicast, supports automatic address
configuration without a DHCP server, and removes most of the need for NAT
since every device can hold a public address directly.
