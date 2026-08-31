---
title: "Moving to Omarchy"
date: 2026-08-30T14:00:00-04:00
draft: false
tags: ["linux", "omarchy", "hyprland", "gaming"]
---

I had been running Windows out of habit for years, which is the worst reason
to run anything. This weekend I wiped it.

<!--more-->

## The habit

Here is honestly everything I still did on Windows.

Almost nothing. Every real task had slowly moved into WSL, one terminal at a
time, until Windows was mostly a bootloader with a taskbar. I was using it to
start a Linux I was already living in. The only thing left that really needed
Windows was gaming, and League of Legends in particular.

And it felt slow. Not broken, not crashing, just slow in a way that is hard to
describe or measure. An R7 3700X, a 3060 Ti, an NVMe drive and 48 GB of RAM,
and I would still watch a window think about whether it wanted to open.
Windows was fine, the machine was fine, but it never felt like the right
match.

So at first I only wanted a dual boot.

## Why I never switched

I know Debian. I have installed it many times, mostly at work, usually on a
machine nobody else wanted. My personal experience with it is that it is
boring and it is solid, and those two things come together. It does not
surprise you and it does not excite you. It is perfect for running things over
SSH: an old machine, you install it, you start a recurring task or a script,
and you forget about it. As a desktop it gives me nothing.

That is the trap. I could always picture the install, never the week after it,
because it was never my main machine.
What I could not picture was sitting down and deciding what my desktop should
be, because I genuinely do not know. I do not know what I want. I do not know
what exists. And I am not going to spend three evenings reading window manager
configs to find out. I knew it would work on my machine. I did not know what
would be good for me.

I read about Omarchy several times and never installed it. It took
[Quattro](https://github.com/basecamp/omarchy/releases/tag/v4.0.0), the 4.0
release, for me to actually move.

Because the offer is the opposite of the usual one. It is not a kit. It is not
"here is a beautiful base, now make it yours over the next month". It is
somebody's finished setup, handed over, and it is built for gaming, for
agents and for development, which happen to be exactly the three things I do.
Out of the box it is DHH's vision of a working machine. It looks like a system
made by someone who uses it every day, not a system over-configured to the
taste of one person. It is also built around a full keyboard experience, which
is exactly what I was looking for.

I did not want to make choices. I wanted to inherit good ones.

## The part where I have to talk about DHH

I need to say a few words about DHH, for the people who do not know him.

Omarchy comes out of 37signals, the company DHH joined. And DHH is loud. He is
invited on every podcast and every YouTube channel, and he has strong opinions
about almost everything. Some of them are only the usual tech founder posture,
tiring but harmless. Some are not. What he wrote about immigration, in
particular the London piece, went far beyond a provocative opinion.

If you prefer to read it rather than take my word for it, there is a
[detailed summary at LibreNews](https://thelibre.news/lets-talk-about-dhh/)
and a text written from inside the Ruby community by
[Tekin Süleyman](https://tekin.co.uk/2025/09/the-ruby-community-has-a-dhh-problem).
Read them and decide for yourself.

I use the distribution. I do not think that is nothing, and I am not going to
pretend the two are unrelated just because the software is good.

If your limit is that you would rather not run a desktop shaped so closely by
one person whose politics you find ugly, that is a perfectly reasonable
position, and you lose nothing by holding it. [CachyOS](https://cachyos.org/)
will bring you most of the way there, and probably further. Arch underneath,
strongly tuned for performance and gaming, Hyprland offered during the
install. Different style, same result.

Now the actual install.

## Leaving Windows took longer than expected

BitLocker was enabled on every disk, and every disk had to be decrypted before
anything else could happen.

There is no trick here. You start it, you watch a percentage, you go and do
something else. It is by far the longest step of the whole migration, and it
happens before you have installed anything at all.

The SSDs were reasonable, two or three hours each. One of my hard drives took
eighteen hours on its own, and I still do not know why. So plan a full day,
and do not trust the first disk to tell you how long the next one will take.

Then the shrink. I had around 1.6 TB free. Windows offered me 300 GB.

Not 1.5 TB. Not a round 1 TB. 300 GB, with no option to ask for more. The
usual explanation is unmovable files sitting at the end of the volume, page
file, hibernation, shadow copies, but I never got a clear answer out of it. I
took the 300 GB and told myself I would deal with the rest later.

The install on that partition finished cleanly, and then would not boot.

I could almost certainly have repaired it. It looked like a bootloader or an
EFI entry problem, I had a terminal on the flash drive, and that is one
evening of work. I sat there for a minute and thought about what I would have
at the end: a dual boot machine, a 300 GB partition I would fill quickly, and
a Windows install I would keep starting out of habit, without ever booting
Linux.

So I wiped the disk and gave everything to Omarchy.

This is the part I would insist on if you are hesitating. When I finally
looked at what was on the Windows side, there was nothing I needed. One work
VPN configuration I had forgotten to back up, which will cost me a call to
someone and nothing more. The dual boot had been a way of not deciding.
Deciding took less time.

## Two minutes

The install took two minutes.

I had forgotten that a complete system install could take so little time, and
it was even faster on my girlfriend's computer, which has a better CPU.

The 2560x1440 screen came up at the right resolution and the right refresh
rate without asking me anything. The 3060 Ti was handled during the install,
no question, no driver detour. Even Windows still has to download drivers
after its own install.

And the keyboard experience is the point. Start, switch, resize, close, all
without moving my hand away from the home row. This is the whole reason I was
interested, and it worked from the first day.

The tiling itself takes longer to learn, and I prefer to say it honestly. The
behaviour is obviously right. My fingers have not caught up. I still use the
wrong shortcut, and I regularly destroy a layout I had just spent minutes, or
sometimes hours, building.

One thing I did add myself. I use Firefox, and I had been looking for a real
keyboard experience in the browser for a long time without finding anything I
liked. [Tridactyl](https://github.com/tridactyl/tridactyl) is exactly that.
Simple, fast, and you never have to touch the mouse again.

## Onboarding

The keybindings menu is what made the first hours easy. Every time I wondered
"how do I open this?", the shortcut list had the answer, and I did not have to
search for it anywhere else.

There is also a "Learn" menu, for Neovim, Hyprland and a few others, but it
mostly sends you to the documentation. It does not really make the job easier,
and there is nothing hands-on in it. It is still nice to have.

## It is not minimal

One expectation I got wrong.

I was expecting something close to bare, and it is not. X is there. Spotify is
there. A long list of other things is there. Omarchy is an opinionated
desktop, not a minimal base. If you are imagining an empty Arch install with a
window manager on top, that is not what you get.

Which is fine, because that is the whole point. I wanted to inherit choices. I
also inherited a few I would not have made, and that is the trade.

## Agents

As I said at the beginning, this system is also built for agents. It comes
with a few AI agents that are easy to install. Again, if you are against AI,
this distribution is probably not for you.

What surprised me is the Omarchy skill. It gives the agent a lot of
information about the system, and it lets the agent modify any configuration
to adjust things to my liking.

## Games, and the thing that started all this

I do sim racing regularly. That is the main reason I wanted a dual boot in the
first place. I played rFactor 2 for a long time and recently moved to Le Mans
Ultimate.

I had read that the game should work and that the wheel should be recognised.
Should. So I was ready to lose an evening on it, hope it would work, and
reinstall Windows in the worst case.

The opposite happened. The wheel, a Logitech G29, worked from the first boot.
No driver hunt, no udev rule, no forum thread from 2019 with a dead link. I
plugged it in expecting to lose an evening, and it was simply there. Even on
Windows the Logitech software is more painful than that: one game does not
need it, rFactor 2 did. I reinstalled Windows a few months ago and it took me
far too long to get the wheel working again. Here it took the two minutes of
the system install.

Steam was fine. Le Mans Ultimate installed without any problem and starts
perfectly.

Then it dies the moment I enter a race.

Which is a very specific kind of disappointment. Far enough to believe it
works, not far enough to actually drive. The problem is Proton itself. Since
the 1.0 update, neither the official Proton nor the normal GE-Proton gets the
game past the loading of a track, so the community maintains its own build for
it. The one I use is
[GE-Proton10-34-LMU-hid_fixes](https://github.com/JacKeTUs/proton-ge-custom/releases/tag/GE-Proton10-34-LMU-hid_fixes),
by JacKeTUs, which is the build that also survives the 1.3 update. You extract
it into Steam's `compatibilitytools.d` folder and you select it for that game
alone, in the compatibility section of its properties. Again two minutes, and
it now works perfectly.

This is the part where a distribution stops mattering and a community starts.
Nothing in Omarchy fixed that game. Somebody who does not know me did.

League of Legends is the other one, and that one I think I simply lose.
Vanguard is a kernel level anti cheat, it will not run under Proton, and
running it in a VM is exactly what it is built to detect. There is no clever
workaround coming. So I will spend that time on something else.

## Windows in a container

I also tried [Dockur](https://github.com/dockur/windows), a Docker container
that runs Windows. I do not know yet if I will need it, but I wanted to know
whether I could quickly run something there.

Again the install went smoothly, and I reached a working desktop fairly
quickly, where I could install a few things including Office. I did not go
much further than that. The other good point is the shared folder, already
available, which makes moving files easy.

With this I really had the feeling of WSL in reverse.

## Where I landed

The install was the easy part, Windows was the hard part. BitLocker and that
absurd 300 GB shrink took more than a day, and what solved it was to stop
trying to keep both systems and give the whole disk to Omarchy. Everything
after that was uneventful in the best way. Screen, GPU and racing wheel all
worked on the first boot.

What it costs me is League of Legends, and one call to someone about a VPN
configuration.
