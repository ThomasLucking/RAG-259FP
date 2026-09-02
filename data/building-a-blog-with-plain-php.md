---
title: Building a blog with plain PHP
summary: Explains how a plain PHP blog turns a request into HTML, covering arrays, PDO, sessions, and password hashing.
tags:
  - php
  - server-side-rendering
  - pdo
  - security
updated: 2026-02-09
---

A blog built with plain PHP and no framework shows what a framework
normally does on a developer's behalf. A PHP script on the server reads
the incoming request, talks to a database if needed, and prints HTML
straight into the response; the browser only ever receives static markup
and CSS, with no client framework and no JavaScript. This "back-end only"
architecture predates React, Vue and Angular, and still powers small
sites and the API-style backends those front-end frameworks talk to.

## From request to rendered page

Without a router, a request for a given URL typically maps to a specific
PHP file on disk, whose output becomes the response. Execution runs top to
bottom: PHP code and HTML markup are interleaved, with `<?php ?>` tags
marking where logic starts and stops, and the script echoes computed data
into the surrounding markup for that single request only.

Because the page is rebuilt from scratch on every visit, nothing is kept
between requests unless it is stored somewhere explicit, such as a
database or a session. This statelessness is a core property of HTTP and
the reason mechanisms like sessions exist, simulating continuity across
requests that are otherwise unrelated.

## Language basics: variables, arrays, and superglobals

PHP variables are loosely typed and start with a dollar sign, and control
structures such as `if`, `foreach` and `match` read close to other
C-family languages, easy to pick up after JavaScript or TypeScript.
Arrays are the workhorse data structure, behaving either as an ordered
list or as an associative map from string keys to values: a database row,
a list of blog posts, and submitted form input all end up as arrays.

That form and request data reaches the script through superglobals, arrays
PHP populates automatically: `$_GET` for query-string parameters, `$_POST`
for submitted form fields, `$_SESSION` for data kept across requests, and
`$_SERVER` and `$_FILES` for request metadata and uploaded files. Reading
these directly, instead of through a framework's request object, makes it
explicit which values come from the client and are untrusted until
validated.

## Persisting data safely with PDO

PHP Data Objects (PDO) is the standard abstraction for talking to a
relational database from PHP, and it returns rows as arrays that fit
naturally with the rest of the language.

The habit PDO encourages is the prepared statement: SQL text is sent with
placeholders instead of literal values, and the values are bound and sent
separately, so the driver keeps the query's structure and the
user-supplied data in different channels. Concatenating a title or a
comment directly into the SQL text removes that separation: if the input
contains characters meaningful to SQL, the query's behaviour changes at
execution time. This is SQL injection, and it can expose or corrupt an
entire database; prepared statements close that path structurally instead
of relying on escaping every value by hand.

## Sessions, authentication, and password storage

A login system must remember that a visitor already authenticated, even
though HTTP requests carry no memory of each other. PHP sessions solve
this by storing an identifier in a cookie and keeping the associated data,
including the signed-in user's identity, in `$_SESSION` on the server.
Every page restricted to logged-in visitors checks that session state
before rendering anything sensitive.

Passwords are never stored as submitted, and never in a reversible form.
They are hashed with a purpose-built algorithm that embeds a random salt,
so identical passwords produce different stored values and brute-force
attempts stay slow; verifying a login means hashing the submitted password
the same way and comparing the result, not decrypting anything.

Writing the routing, the SQL, the session checks and the password hashing
by hand, instead of relying on a framework's router, ORM and
authentication layer, makes each mechanism visible on its own, whereas the
same result behind a single framework call hides why each layer exists.
