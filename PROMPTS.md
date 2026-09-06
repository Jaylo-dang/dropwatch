# PROMPTS.md — DropWatch

- **Student:** Haojia Dang
- **Course:** MGMT 6110 Human-AI Collaboration · Problem Set 1
- **User type:** External
- **User sentence:** A concert-ticket fan opens this screen to see which platform each of their artists' on-sales is happening on and when, and knows it worked when the on-sale they confirmed is counting down in front of them on the day.
- **Live link:** https://dropwatch-xi.vercel.app/
- **Repository:** https://github.com/Jaylo-dang/dropwatch
- **Built with:** Google AI Studio (Build), Gemini 3.8 Flash
- **Note:** The four prompts below were sent to Gemini in AI Studio. Their wording was drafted with an assistant from my own specification; see REFLECTION.md Q2 for the division of labour.

---

## Prompt 1 — the master prompt (R·G·O·G·C)

```
[R] ROLE
You are a senior front-end developer building a React web app.

[G] GOAL
Build the front end of DropWatch, a web product for concert-ticket fans who
chase on-sale moments. They are working adults and students, opening this on a
phone in the evening, and their job on this product is: "keep the on-sale times
for the artists I care about in one place, and make sure I am not asleep when
one opens." TWO screens, switched by a tab bar at the top, with no page reload
between them.

SCREEN 1 - "Discover":
1) A header reading "DropWatch" with a line underneath reading "Following 3 of
   9 artists" that updates as artists are followed and unfollowed.
2) A row of genre chips: All, Pop, Rock, Indie, Hip-hop, Electronic. They
   toggle and filter the list below immediately.
3) A list of exactly 9 artists as cards. Use these nine names and genres, and
   no others:
     - Aria Volt (Pop)
     - Novaline (Pop)
     - Rui & the Static (Rock)
     - Blue Cassette Club (Rock)
     - The Paper Lanterns (Indie)
     - Halcyon Grey (Indie)
     - Marta Fenn (Hip-hop)
     - Dune Prospect (Hip-hop)
     - Kenji Moroe (Electronic)
   Each card shows: artist name, genre, city and venue of their next show, the
   next on-sale date, how many upcoming on-sales they have, and a Follow /
   Following star button. Tapping the star toggles it and the count in the
   header changes at once.

SCREEN 2 - "My drops":
4) At the top, a REMINDER CARD for the one on-sale that opens tomorrow. It
   reads "On sale tomorrow" and shows artist, venue, city, the exact on-sale
   date and time, the platform name, and the price range. It has two buttons:
   "I'm going for it" and "Not this one".
5) Pressing "I'm going for it" turns the card into a confirmed state reading
   "You're in. The countdown starts when the doors open." with a green check.
   Pressing "Not this one" collapses the card to a single dismissed line with
   an Undo control.
6) Below that, a COUNTDOWN CARD for the one on-sale that opens today. It shows
   the artist, the platform, and a live countdown in HH:MM:SS that ticks down
   every second. Set its target to two hours and fifteen minutes after the app
   loads, so the countdown is always running when the page is opened. When it
   reaches zero the card reads "Doors are open" and stops.
7) Below those, the list of every upcoming on-sale for followed artists,
   grouped under date headings, oldest first. Each row shows: artist, venue and
   city, on-sale date and time, platform name, price range, and a tag reading
   either "Presale" or "General sale".
8) When no artists are followed, screen 2 shows "You are not following anyone
   yet. Follow an artist on Discover to see their on-sales here." instead of an
   empty list.

[O] OUTPUT
A running app. Keep every invented value in ONE data file of its own: the 9
artists named above, the 4 ticketing platforms named below, and at least 14
on-sale entries, so the screen looks real. One component per section (tab bar,
artist card, artist list, genre chips, reminder card, countdown card, on-sale
row, on-sale list). Every state change happens without reloading the page, and
following an artist on screen 1 is reflected on screen 2 immediately. Readable
on a phone at arm's length: cards stack in a single column below 480px and tap
targets are large. When you are done, list the files you created and what each
one holds.

[G] GUARDRAILS
Screens and invented data only. Do NOT call the Gemini API or any other model.
Do NOT call any outside service or fetch from any URL. No database, no login,
no sign-up, no user accounts, no analytics. No browser notifications, no
service worker, no push, no email, no SMS, no calendar integration - the
reminder and the confirmation are in-app state on screen 2 and nothing leaves
the page. No payment, no checkout, no links to any external site. No third
screen, no routing, no settings page. No features I did not list above.

NAMES ARE FIXED. Use exactly the nine artist names I listed above and exactly
these four ticketing platform names: TixNova, StageLine, Rialto Tickets,
Nimbus Live. Do NOT rename them, do NOT substitute names you consider more
realistic, do NOT add a tenth artist or a fifth platform, and do NOT change
them later when I ask for styling, layout or any other change. If you believe
a name should change, say so in one line and leave it as it is.

Use these four invented venue names only: Harbourline Arena, The Glasshouse,
Pier Nine Pavilion, Northgate Dome. Every date, time, price and seat figure is
invented. Do NOT use the name, logo or trademark of any real performer, band,
venue, ticketing company or promoter, and do not use names that closely
resemble real ones. Nothing confidential.

[C] CONTEXT
Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in
Google AI Studio, pushed to GitHub, deployed on Vercel, and opened on a phone
by classmates in Week 3. I am not a programmer: when you make a choice I did
not specify, say so in one line rather than burying it.
```

**What came back:** Ran 200 seconds. A running preview with both screens, the
tab bar, the nine artists under their own names, the reminder card, and a
countdown ticking from 02:14. All nine artist names, four platform names and
four venue names came back exactly as specified. It also shipped a Gemini client
and a `GEMINI_API_KEY` line in `vite.config.ts`, despite the Guardrail saying
the app must call no model.

**What I changed next and why:** Nothing functional. I checked the preview
against Goal items 1 to 8 one at a time. Items 5 and 8 needed clicking to
verify, so I pressed both buttons on the reminder card and unfollowed all nine
artists to force the empty state. Both behaved as specified. Then I moved to
appearance.

---

## Prompt 2 — the design theme

```
Apply the "High Density" design theme to the app.
```

**What came back:** A denser dark layout, a slate palette, per-genre colour
badges. Every artist name, platform name, venue, city, date and price survived
unchanged.

**What I changed next and why:** Nothing, but this is the most important entry
in the log. In an earlier attempt at this problem set, this exact four-word
prompt silently rewrote all my invented data — several names changed, one
invented outright, a date range shifted — and I did not notice at all. The only
difference this time is the `NAMES ARE FIXED` block in the Guardrails, which was
written because of that failure and which explicitly says "do NOT change them
later when I ask for styling". The guardrail came out of a failure and then held
under the same attack that caused it.

---

## Prompt 3 — more colour, more energy

```
Make the visual design more colourful and more energetic - buying tickets the
moment they drop is an exciting, high-adrenaline moment and the page currently
feels too calm. Specifically:
- Move off the near-black slate background to a warmer, more saturated ground.
- Give the countdown card the loudest treatment on the page: it is the most
  exciting element and should read as urgent.
- Keep the per-genre colour tags, but let the colours carry more of the layout
  rather than sitting only in small badges.
- Keep text contrast high enough to read on a phone in a dark room.

This is a VISUAL change only. Do NOT change any artist name, platform name,
venue, city, date, time, price, seat count, or any other value in the data
file. Do NOT add, remove or rename any artist or platform. Do NOT add or remove
any section, button, tab or feature, and do NOT change what any control does.
Both screens keep exactly the eight behaviours they have now.
Change nothing else.
```

**What came back:** Ran 185 seconds. A warm dark ground, a crimson-to-amber
countdown card that was now clearly the loudest element on the page, and genre
colours carrying the card borders. Names and data again untouched.

**What I changed next and why:** Two things came out of checking this version.

First, I found a real defect, and it was mine rather than the model's. With no
artists followed, screen 2 still displayed the reminder card and the countdown
card for two artists I was not following. My own Goal item 8 says the empty
state replaces "an empty list" — I wrote only about the list, so the model
guarded only the list. The criterion caught exactly what it stated and nothing
more.

Second, I decided the dark palette was wrong for this product. Chasing a ticket
drop is an excited, anticipatory moment, and a near-black page reads as heavy.
That judgment is mine, and both changes went into the next prompt.

---

## Prompt 4 — light theme, and the empty-state fix

```
Two changes in this message. First the visual redesign, then one behaviour fix.

VISUAL: Switch to a LIGHT theme. The current dark palette feels heavy and
oppressive, and this product is about an exciting moment. Make it bright and
genuinely colourful.
- Replace the dark ground with a light, warm off-white page background.
- Cards sit on white or very light tinted surfaces with soft shadows, not on
  dark panels.
- Keep the five genre colours (Pop, Rock, Indie, Hip-hop, Electronic) and let
  them carry much more of the layout than before: coloured left accent bars,
  lightly tinted card fills in that genre's hue, coloured badges and coloured
  section headings. The page should read as multi-coloured, not as one accent
  colour on grey.
- The countdown card stays the single loudest element on the page. On a light
  ground that means a strongly saturated filled card with high-contrast digits,
  not a dark box.
- Legibility is not negotiable: body text is dark on light surfaces, text on any
  saturated fill is white or near-black with strong contrast, and nothing is
  pale text on a pale tint. It must be readable on a phone in daylight.
- Keep every existing section, card, button, chip, tab and badge exactly where
  it is. This is a colour and surface change, not a layout change.

BEHAVIOUR FIX: On "My drops", the reminder card and the countdown card
currently show even when their artist is not followed. Tie both cards to the
followed list: the reminder card appears only if the tomorrow on-sale's artist
is followed, and the countdown card appears only if today's on-sale artist is
followed. When no artists are followed at all, screen 2 shows only the line
"You are not following anyone yet. Follow an artist on Discover to see their
on-sales here." with no reminder card, no countdown card and no on-sale list.
When at least one artist is followed, all three come back as they are now.

NAMES AND DATA ARE FIXED. Do NOT change any artist name, band name, platform
name, venue, city, date, time, price, seat count or badge text. Do NOT add,
remove or rename any artist or platform. Do NOT add or remove any screen,
section, button, tab or feature, and do NOT change what any control does beyond
the behaviour fix described above. Both screens keep all eight behaviours from
the original specification.

Change nothing else.
```

**What came back:** Ran 169 seconds. A light, multi-coloured theme with a
white-on-crimson countdown card, genre-tinted artist cards and readable dark
text throughout. The empty state now correctly hides all three elements, and all
three return when an artist is followed. Names, venues, platforms and prices
unchanged for the third time in a row.

It also added a "Go to Discover" button to the empty state, which I had not
asked for and which the same message explicitly forbade — "Do NOT add or remove
any screen, section, button, tab or feature".

**What I changed next and why:** Nothing. I kept the button, because it is a
genuine improvement to a dead end, and the decision worth recording is that I
noticed it and chose to keep it rather than not noticing. What is more
interesting is the contrast inside one message: the instruction not to change
nine artist names, which I had listed one by one, held; the instruction not to
add any button, which was a category with no instances, did not. A guardrail
written as a list of specific things appears to survive where the same guardrail
written as a category does not.

This message also deliberately moved two variables at once — a visual change and
a behaviour fix — because I was short of time. That was a choice, not an
oversight, and it means a regression in this version could not have been
attributed to one of the two.

---

## Build log — decisions and failures that were not prompts

- **This is my second attempt at this problem set.** I took a first version all
  the way to a live URL, then found I had misread the brief and rebuilt from
  nothing. The `NAMES ARE FIXED` guardrail came from that attempt.
- **The rebuild took a little over 20 minutes end to end**, against roughly three
  hours for the first attempt. Nothing about my ability to read code changed in
  between. What changed is that I already knew the click path, already had a
  prompt structure to fill in, and brought more of the specification myself.
- **I opened the Code tab and did not read it.** A full application written
  while I typed four messages; lines of code read by me: zero. That ratio is the
  honest description of what I was able to judge.
- **`vite.config.ts` reads `GEMINI_API_KEY`, and there is a `.env.example`.** I
  did not supply the key on Vercel: on a public repository behind a public URL,
  that config line would publish a live key into the JavaScript the browser
  downloads. The deployment loaded fine without it.
- **Verified on the live URL, not only in the preview.** Opened it in a private
  window and on a phone, followed and unfollowed artists, confirmed the reminder
  card, and watched the countdown tick.
