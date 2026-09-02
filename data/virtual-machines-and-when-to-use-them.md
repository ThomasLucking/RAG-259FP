## Running one computer inside another

A virtual machine is a full operating system running inside another
computer, as if it were a separate physical machine. The real machine is
the host; the operating system running inside the virtual machine is the
guest. From the guest's point of view, nothing looks unusual: it sees a
processor, memory, a disk, and a network card, boots normally, and runs
ordinary software.

The component that makes this possible is the hypervisor. It sits between
the physical hardware and the guest operating systems, and its job is to
divide the host's resources among however many virtual machines it runs.
Hypervisors come in two families. A type 1 hypervisor runs directly on the
hardware, with no general-purpose operating system underneath it; it is
built for this one purpose and is the model used by most virtualization
servers. A type 2 hypervisor runs as an application inside an existing
operating system, alongside other programs, which is convenient on a
laptop but adds an extra layer between the guest and the hardware.

## Virtual hardware, not real hardware

Everything a guest interacts with is virtual. A virtual CPU is a slice of
the host's processing time, scheduled by the hypervisor rather than
dedicated outright. Virtual memory is a portion of the host's RAM set
aside for the guest. A virtual disk is usually a single file on the host's
storage that the guest treats as a physical drive. A virtual network
interface connects the guest to a virtual switch created by the
hypervisor, which in turn reaches the host's real network.

Because none of this hardware physically exists, a virtual machine can be
resized, cloned, or moved to another host by editing configuration and
files rather than touching cables or components. Several guests can run
different operating systems side by side on the same physical hardware,
fully isolated from one another even though they share the same
underlying resources.

## Snapshots and low-risk experimentation

A snapshot captures the exact state of a virtual machine's disk, and
sometimes its memory, at a given moment. Reverting to a snapshot puts the
machine back exactly as it was, discarding everything done since. This
turns any change into something that can simply be undone: installing an
unfamiliar package, testing a risky configuration, or trying an update
that might break the system all become safe to attempt, because a mistake
only costs a revert rather than a reinstall. This is one of the main
reasons virtualization suits learning and testing: a broken guest can be
discarded and rebuilt in minutes, and several snapshots of the same
machine let someone compare configurations side by side.

## Overhead and typical uses

Virtualization is not free. The hypervisor itself consumes processing
time, memory is split between the host and every guest, and disk access
passes through an extra layer before it reaches the real storage. A host
running many virtual machines needs enough spare capacity, since each
guest reserves resources whether or not it is busy at a given moment.

Three uses come up repeatedly in practice. Testing another operating
system is the simplest: a guest can run a distribution or a version that
differs from the host without dual-booting or buying hardware. Isolating
an environment keeps one project's dependencies, configuration, or
experiments from affecting anything else on the same physical machine.
Consolidating servers takes several tasks that would once have needed
their own dedicated computer and runs them as separate guests on one
physical host, which is cheaper to buy, power, and maintain than many
small machines.

Containers address some of the same goals — isolating an application, or
packing more of them onto one host — but they share the host's kernel
instead of running a separate guest operating system, which makes them
lighter and faster to start. That difference is developed in a separate
article; here it is enough to note that a virtual machine trades some
overhead for the stronger isolation of a genuinely separate operating
system.
