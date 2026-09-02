---
title: Writing a TCP chat in Python
summary: Explains sockets, the client/server model, TCP framing, and threads, one level below the abstractions HTTP normally hides.
tags:
  - networking
  - python
  - tcp
  - sockets
updated: 2026-03-23
---

## The socket as a building block

A socket is an endpoint for network communication, identified by an IP
address and a port. Before any web framework or HTTP library existed,
programs already exchanged data by opening sockets and writing bytes to
them. A chat application built directly on sockets removes the layers
that usually sit between a program and the network.

### Client and server roles

The model has two distinct roles. A server binds a socket to an address
and port, then listens for incoming connections, staying passive until
one arrives. A client actively opens a connection toward a known server
address; once it succeeds, both sides can read and write bytes over the
same channel. A chat server keeps one connection per participant and
forwards whatever it receives from one client to all the others; it is
the only component aware of the full set of participants.

### Ports and binding

An address alone is not enough to reach a specific program, since a
machine can run many network services at once. Each service binds to a
distinct port number, claiming that port so the operating system routes
matching traffic to the listening process. Ports below 1024 are
traditionally reserved for well-known services (HTTP uses 80, HTTPS uses
443), so custom applications pick a higher, unused one; binding a port
that is already taken raises an error, a common mistake when restarting
a server too quickly.

## Choosing and using TCP

### TCP versus UDP

TCP and UDP are the two common transport protocols built on top of IP.
TCP establishes a connection, guarantees that bytes arrive in order and
without loss, and retransmits automatically, while UDP sends independent
packets with no ordering or delivery guarantee, but less overhead. A chat
application needs messages to arrive complete and in order, so TCP is
the natural choice; UDP suits cases where occasional loss is tolerable
and latency matters more, such as live audio or game state updates.

### Framing messages in a byte stream

TCP delivers a continuous stream of bytes, not discrete messages. Nothing
guarantees that one call to send data matches one call to receive it: a
message can arrive split across several reads, or several messages can
arrive merged together. Framing recovers message boundaries from that
stream, for instance by ending each message with a delimiter such as a
newline, or by prefixing each message with its length in bytes. Agreeing
on this scheme is effectively designing a small custom protocol.

## Handling many clients

### Threads per connection

A server that only talks to one client at a time is of little use for a
chat room. The common approach dedicates one thread to each accepted
connection, so the server reads from many clients concurrently without
one slow or silent client blocking the others. Shared state, such as the
list of connected clients, then needs protection against concurrent
access, since two threads modifying it at once can corrupt it, often the
first concrete, motivated encounter with synchronisation primitives such
as locks.

### What this teaches about HTTP

Building a protocol by hand shows what an HTTP library normally does
silently: opening a socket, framing requests and responses, matching a
request to its reply, and handling partial reads. HTTP is, at its core, a
text-based protocol layered on top of TCP, with its own framing rules.

Once sockets, framing, and concurrent connections feel familiar from a
small custom protocol, the design choices behind HTTP become far easier
to recognise.
