# REFLECTION — DropWatch

**Haojia Dang · MGMT 6110 Human-AI Collaboration · Problem Set 1**

> **A note on this submission.** This is my second submission for this problem
> set. I built a first version end to end, found I had misread the brief, and
> started again from nothing. DropWatch is that second build. The first attempt
> is not wasted: two of the guardrails in `PROMPTS.md` exist because of what
> went wrong in it.

## Q1 — Who are my users, and what changes for them?

My users are **external**: people who chase concert tickets the minute they go
on sale. Working adults and students, following a handful of artists rather than
a whole scene, opening a phone in the evening. They choose whether to use this
product and can walk away from it. I am one of them, and this comes out of my
own failures rather than out of research.

What I do today is search social media for the on-sale announcement, go to
whichever platform is selling it, subscribe or register there, then pick seats
when it opens. Two things break it, and neither is the one people assume.

The first is not knowing **where**. If the tour is selling on a platform I do
not normally use, I cannot find it. I know the artist is playing and I still
cannot get to the right page in time, and by the time I have worked out where to
go, it is over. That is a location failure, not a speed failure, and no alarm
clock fixes it.

The second is that different platforms open at different times for the same
tour, so "the on-sale time" is not one number.

That is why the platform name sits on every row of DropWatch, next to the time,
and why the countdown card names the platform rather than only the artist.
Answering *where* is the first half of the job; the reminder the day before and
the countdown on the day are the second half. What it does not remove is the
queue itself.

One limit: I designed this for the way I personally lose tickets, and never
checked whether anyone else loses them the same way.

## Q2 — Augmented capacity and constrained capacity

**Augmented.** I have never written a line of code, and the two attempts give me
a number I could not have got any other way. The first took about three hours
from prompt to live URL. DropWatch — two screens, a follow state shared across
both, a reminder-and-confirm flow and a live countdown — took a little over
twenty minutes end to end, including the repository and the deployment.

Nothing about my ability to read code changed in between. What changed is that I
already had the click path and a prompt structure to fill in, and that this time
I brought far more of the specification myself. So the augmentation is not that
I can now build software. It is that the cost of a second attempt collapsed, and
with it the cost of having been wrong. Misreading the brief cost me twenty
minutes rather than a weekend.

**Constrained.** For most of both attempts I could not tell whether what I was
looking at was right or wrong. The agent wrote the whole application; I read
zero lines of it. What I verified was the eight numbered items on my own Goal
list and nothing else — not the data file, not the build configuration, not the
cases I never thought to specify.

I did not resolve this by learning to judge. I resolved it by adding a second
AI. Throughout both attempts I worked with an assistant that told me which
button to press, what the config file meant, and what to check next. So the
honest description of my weekend is one person and two agents, with the agents
doing the building and much of the judging.

I should be precise about the division of labour, since the brief says the
specification has to be mine — and it shifted between the two attempts. In the
first, I supplied the user and the job and little else. In this one I brought the
product itself, the four-step flow from following an artist to a countdown on the
day, the two screens, the decision to fix every invented name in advance so that
a styling request could not rewrite my data, and the judgment that the dark
palette was wrong for a moment that is supposed to feel exciting. What still came
out of working with an assistant is the wording — the translation of those
decisions into an R·G·O·G·C prompt, and much of the drafting of these two
Markdown files. I state this plainly because presenting all of it as mine would
contradict the one thing this reflection is about.

## Q3 — In, on, or out of the loop: where was my judgment actually needed?

**Where my judgment changed the outcome.** Three times.

The first is the one I would defend. After the third prompt the app was dark and
saturated and, to me, oppressive. Chasing a ticket drop is an excited moment —
the feeling the screen should carry is anticipation, not dread — so I asked for a
light, multi-coloured treatment instead. That came from thinking about what the
user feels at that moment, which is the part of the work no agent was doing.

The other two come from actually looking. I clicked through Goal items 5 and 8
rather than accepting them, which is how the reminder card's two states and the
empty state were confirmed rather than assumed. And earlier this weekend I
caught from a breadcrumb that a Markdown file was about to be committed into the
wrong directory.

**Where I was nominally in the loop and added nothing.** Nearly everywhere else,
and this is the more useful half. I clicked "All repositories" on GitHub's
authorisation screen without understanding what I was granting. I accepted
Vercel's detected build settings because they were pre-filled. And the single
most consequential decision in either attempt — not pasting `GEMINI_API_KEY`
into Vercel, which would have published a live key inside the JavaScript of a
public site on a public repository — was not mine. I was told, and I complied. I
did the clicking; I added nothing to the decision.

**Looking forward.** Following and unfollowing an artist can sit **out of the
loop**: reversible, low stakes, high volume, and the user sees at once if it is
wrong. The reminder-and-confirm step must stay **in the loop**, and that is the
point of the product — its whole value is that a person is asked, once, whether
they are going for it. On-sale time updates in a real version would belong **on
the loop**: pulled in bulk, sampled, with a visible last-checked timestamp,
because a wrong time is silent and the user finds out only after the tickets are
gone. I would automate the confirmation step only with a measured record of
correct on-sale times across a full season and a one-tap way to back out, and
neither exists.

## Q4 — What did it build that I never sketched?

The clearest case is a contrast inside a single message, and it is the finding I
would keep if I could keep only one.

My fourth prompt carried two prohibitions. One said do not change any artist
name, platform name, venue, city, date, time or price — and I had listed the
nine artist names, the four platform names and the four venue names one by one
in the original Guardrails. The other said do not add or remove any screen,
section, button, tab or feature. **The first held. The second did not**: the
model added a "Go to Discover" button to the empty state that I had not asked
for.

The guardrail written as a list of specific instances survived. The guardrail
written as a category did not. That is not what I expected, and it changes what
I think a guardrail is: a constraint appears to bite in proportion to how
concretely it names the things it protects.

I noticed the added button while the build was still open, but not on my own —
it was pointed out to me from a screenshot. What would have caught it at the
time is a check I never ran: comparing the new version against a written list of
what should still be there, rather than only against what I had asked to change.
I checked the diff I wanted. Nobody checked the diff I did not want.

Two smaller ones. It shipped a Gemini client and a `GEMINI_API_KEY` line in
`vite.config.ts` in both attempts, despite Guardrails saying the app must call no
model — I asked for a screen and was handed a kitchen, twice. And my own Goal
item 8 said the empty state replaces "an empty list", so the model guarded the
list and left the reminder and countdown cards showing for artists I was not
following. That defect was mine: the criterion caught exactly what it stated.

## Q5 — Three pointers for an organisation

1. **Write prohibitions as named instances, not as categories.** In one message,
   "do not change these nine names" held and "do not add any button" did not. If
   a rule matters, enumerate what it protects; a policy phrased as a category is
   the one that quietly fails.
2. **Review the diff nobody asked for.** I checked every change I requested and
   none of the changes I did not. A team shipping generated code weekly needs the
   unrequested delta surfaced by default, because that is the half nobody is
   motivated to look at.
3. **Nobody deploys who cannot explain the config file.** The one decision that
   mattered in my build — withholding an API key that would otherwise have been
   published in browser JavaScript — was made by an assistant, not by me. Put a
   named person on that gate or automate the check; do not leave it to whether
   someone happened to be advised well.
