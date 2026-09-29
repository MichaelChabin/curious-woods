---
status: 29 Sept 2026. Built and hung as Wordplay (active/wordplay.html). The texts live in stories/limericks.json only. The mockup is CWVault/claude/mockups/limerick-puzzle-mockup.html, and it is the behaviour to match.
role: Spec, texts and credits for the limerick puzzle. The build prompt is Prompt-Build-Limerick-Puzzle.md.
---

# Limerick Puzzle: texts, credits, design

A gallery puzzle, one limerick at a time. The lines are shuffled and she drags them back into order. Michael's larger hope is that this leads to reading poetry closely, then editing it, then writing it.

Pillar: Stories (a puzzle story), with a Practice idea attached (below). Intuition: decomposition, pulling a thing apart and putting it back.

All the poems below are public domain in the US: they were printed before 1931, or are folk verses with no known author.

## Design as of 27 Sept (Michael)

- **Parchment, not a geometry sheet.** The poem is only text, with no boxes. Every line can be dragged. Very faint ruled lines, like writing paper.
- **All five lines start scrambled.**
- **Italic until it is typed.** A line in the wrong place is italic. When it lands in its own place, it is typed out in ordinary type, letter by letter, with a cursor and quiet typewriter keys. Lines are typed one at a time; a line waiting its turn stays italic. Once typed, lines 3 and 4 sit at their indent. The idea is to suggest composing. Michael: "I think I like this… Let's go with this."
- **Next line, please.** Each tap puts the next line of the poem in its place, fixes it there, and types it. Five taps give her the whole poem.
- **A ding** when the whole poem is right, after the last line has been typed.
- **Another one** brings the next limerick.
- **Order.** The first time she opens it: the Lear introduction, then the young lady of Niger. After that, the order changes each time.
- **Share Postcard,** as in Geometry: the postcard is the share action. The card holds her own note at the top, then the poem and its credit. If the limerick has its own open-licence picture (a Lear drawing, a map), *Add the picture* puts it on the card too. She does not upload pictures of her own.
- **Keep on my list** (28 Sept). When a poem is whole she can keep it; *My list*, top right, shows the kept ones by first line, and opens one whole, with *Scramble it* to do it again. On her device only; no counts. Open: whether kept limericks also belong in Saved Stories.
- **A back arrow** (28 Sept), top left, to the page she came from.
- **The gallery picture** is a drawn mark: five lines on parchment, the limerick's own shape (long, long, short and indented, short and indented, long), the last line half typed with the cursor. Not a picture from any one limerick, since not every limerick has one.
- **Later levels:** scrambled phrases, then words.
- **Other poets** (28 Sept, Michael): the same puzzle could introduce and explore all kinds of poetry. Emily Dickinson comes to mind, and with a proper introduction Li Bai, especially once Maya is in.
- **Practice idea (not in this build):** "I want to Remember this" puts the poem on her list. The ladder of practice is: write it from memory; if not much comes, put the lines in order; then scramble within lines. It should work for other poems too. Still open: who moves her up and down the ladder, and how writing from memory avoids marking her wrong. (The Maya flag rules apply: without Maya, Remember appears only when the text names it.)

## The introduction (first time only)

In 1832 a young painter named Edward Lear went to stay at a big house near Liverpool. The Earl of Derby kept a private zoo there, and Lear, who was twenty, had been hired to paint the animals.

There were children in the house, and they liked him. Someone showed Lear a short, silly poem about "a sick man of Tobago," and he began making up poems like it for the children, with a drawing for each one. This is one of them:

[Lear's drawing of the Old Man with a beard]

There was an Old Man with a beard,
Who said, "It is just as I feared!—
Two Owls and a Hen,
Four Larks and a Wren,
Have all built their nests in my beard!"

In 1846 he put them in a book called *A Book of Nonsense*. He didn't use his own name. He signed it "Derry Down Derry."

Lear never called his poems limericks. Nobody did until fifty years later, and nobody knows for sure where the name came from. The best guess is an old party song. People took turns making up a verse, and then everyone sang the chorus: "Will you come up to Limerick?" Limerick is a city in Ireland.

Checks: Knowsley Hall, the Earl of Derby's menagerie; the Tobago poem is from *Anecdotes and Adventures of Fifteen Gentlemen* (1822). Accounts differ on whether a friend showed it to Lear or he found the book at Knowsley, so we say "someone showed." The word "limerick" is first recorded in 1896 (Aubrey Beardsley).

## The limericks: where they live (29 Sept, Michael)

**The texts live in `cw-deploys/stories/limericks.json`, and only there.** The page reads that file; adding a limerick means adding one record to it. This spec no longer carries the poems' words, so the two can't drift apart. What stays here: the decisions, the sources, the checks, and the notes on particular poems.

Each record holds `id`, `lines` (five), `credit`, `ease` (easy, middle, hard), and where needed `title`, `intro`, `swap` (the two line numbers, counting from 1, that may change places) and `picture`.

### What is live (40, as built 28 Sept)

| id | first line | credit | ease |
|---|---|---|---|
| niger | There was a young lady of Niger | Cosmo Monkhouse, before 1901 | easy |
| hall | There was a young fellow named Hall | Anonymous; date unknown | middle |
| bright | There was a young lady named Bright | A.H. Reginald Buller; first printed unsigned in *Punch*, 19 December 1923 | hard |
| pelican | A gorgeous bird is the pelican | Anonymous, first printed 1913; often wrongly credited to Dixon Lanier Merritt | middle |
| flue | A flea and a fly in a flue | Anonymous, printed by 1905; not Ogden Nash | hard |
| tutor | A Tutor who tooted the flute | Carolyn Wells, *The Jingle Book*, 1899 | hard |
| canner | A canner, exceedingly canny | Attributed to Carolyn Wells; date unknown | hard |
| japan | There was a young man of Japan | Anonymous, traditional | middle |
| peru | There was an old man of Peru | Anonymous, traditional | easy |
| crewe | An epicure dining at Crewe | Anonymous, traditional | middle |
| lynn | There was a young lady of Lynn | Anonymous, traditional | middle |
| bush | There was an Old Man who said, “Hush! | Edward Lear, *A Book of Nonsense*, 1846 | easy |
| bonnet | There was a Young Lady whose bonnet | Edward Lear, *A Book of Nonsense* | easy |
| tree | There was an Old Man in a tree | Edward Lear, *A Book of Nonsense* | easy |
| chin | There was a Young Lady whose chin | Edward Lear, *A Book of Nonsense* | easy |
| boat | There was an Old Man in a boat | Edward Lear, *A Book of Nonsense* | easy |
| west | There was an Old Man of the West | Edward Lear, *A Book of Nonsense* | easy |
| norway | There was a Young Lady of Norway | Edward Lear, *A Book of Nonsense* | easy |
| nose | There was an Old Man on whose nose | Edward Lear, *A Book of Nonsense* | middle |
| burton | There was an Old Person of Burton | Edward Lear, *A Book of Nonsense* | easy |
| sestri | There was an old person of Sestri | Edward Lear, *More Nonsense*, 1872 | middle |
| border | There was an old man on the Border | Edward Lear, *More Nonsense*, 1872 | easy |
| dumpet | There was an old man of West Dumpet | Edward Lear, *More Nonsense*, 1872 | easy |
| blackheath | There was an old man of Blackheath | Edward Lear, *More Nonsense*, 1872 | middle |
| ware | There was an old person of Ware | Edward Lear, *More Nonsense*, 1872 | easy |
| marsh | There was an old man in a Marsh | Edward Lear, *More Nonsense*, 1872 | middle |
| dumbree | There was an old man of Dumbree | Edward Lear, *More Nonsense*, 1872 | easy |
| france | There was an old lady of France | Edward Lear, *More Nonsense*, 1872 | easy |
| nantucket | There was once a man from Nantucket | Anonymous, *The Princeton Tiger*, 1902 | middle |
| bear | A cheerful old bear at the Zoo | Anonymous, printed by 1924 | easy |
| tring | There was an old person of Tring | Anonymous, printed by 1924 | hard |
| bagdad | There once was a lad of Bagdad | Anonymous, printed by 1924 | middle |
| montrose | Said a funny old man of Montrose | Anonymous, printed by 1924 | middle |
| emu | At the Zoo I remarked to an emu | Anonymous, printed by 1924 | middle |
| eye | There was a young maid who said, “Why | Anonymous, printed by 1902 | easy |
| twoandtwo | There was an old man who said, “Do | Anonymous, printed 1864 | middle |
| cow | There once was a man who said, “How | Anonymous, printed 1864 | easy |
| tarentum | There was an old man of Tarentum | Anonymous, printed by 1924 | middle |
| perth | There was a young fellow of Perth | Anonymous, printed by 1924 | middle |
| eden | There was a dear lady of Eden | Anonymous, printed 1864 | middle |

### What changed at the build (28 Sept)

The pool that went live differs from the 28 proposed here on 28 Sept. **Nothing was dropped by a check:** the build was made before that list reached the vault, so it chose its own newcomers, checked each against a printing before 1931, and never saw the proposed ones. Michael has not yet read the sixteen that came in. (Claude Code's findings, 29 Sept.)

**Came in at the build**, with where each was found:

- Old Man of the West: Lear, *A Book of Nonsense*, Warne printing, Internet Archive `bookofnonsense00lear`, leaf n42, with his drawing.
- Old Person of Burton: the same printing, leaf n122.
- Sestri: Lear, *More Nonsense*, first edition 1872, Internet Archive `morenonsensepict00learrich`, leaf n134, with his drawing.
- The Border: *More Nonsense* 1872, leaf n144.
- West Dumpet: *More Nonsense* 1872, leaf n168.
- The Marsh: *More Nonsense* 1872, leaf n240.
- Dumbree: *More Nonsense* 1872, leaf n244.
- The old lady of France: *More Nonsense* 1872, leaf n288.
- Tring: Langford Reed, *The Complete Limerick Book* (Putnam 1925; preface December 1924), p. 148, "Some Old Favourites", unsigned.
- Perth: Reed, p. 149, same chapter, unsigned.
- Montrose: Reed, p. 155, unsigned.
- The emu: Reed, p. 166, unsigned.
- The maid who looks in her ear: Carolyn Wells, *A Nonsense Anthology* (1902), signed "Anonymous". Gutenberg's text has no page numbers.
- Adding two and two: Wells 1902, "Anonymous", in a group Wells credits to books printed for the 1864 New York Sanitary Commission fair.
- Carrying the cow ("There once was a man who said, 'How…'"): Wells 1902, the same 1864 group.
- Eden: Wells 1902, the same 1864 group.

**Went out** (never checked, simply not used): Lear's "who supposed", "with a nose", Kilkenny, the cow ("How / Shall I flee"), Portugal, Whitehaven, Thermopylae and Dean; the anonymous gas man, Perkins, Devizes, Asturias, Millicent, Darjeeling, the city and the Amazon. One fact from Reed, p. 117: **Devizes is signed Archibald Marshall**, so it isn't anonymous. They remain candidates for the next batch.

**Checked, and in both lists:** Nantucket is Reed p. 99, credited to the *Princeton Tiger* with no year. Tarentum is Reed p. 159, the bear Reed p. 166, and Bagdad Reed p. 181, in "Some New Ones", unsigned. The Lear ones in both lists are all from the same two scans, with drawings.

**For Michael to look at when he reads the newcomers:** Tring depends on knowing the tunes "God Save the King" and "Pop Goes the Weasel", which a ten-year-old in the US may not. Eden is a joke about Adam and Eve. Neither is wrong; both are his call.

### Notes on particular poems (these are kept whatever happens to the texts)

- **Niger:** the intro in the file is Michael's wording. French was the official language until 2025, when Hausa, which most people speak, replaced it; French is still used in government and business. NYE-jer was the ordinary English way of saying the river's name, so "changed" is loose; an alternative is "In the limerick it's said NYE-jer, to rhyme with tiger."
- **Hall:** Michael: "Put him in. It is funny."
- **The pelican:** the 1913 last line reads "But I'm d—— if I see how in hellecan." We softened it. First printed 1913; often wrongly credited to Dixon Lanier Merritt, who said he didn't write it.
- **The flue:** printed by 1905, so not Ogden Nash (born 1902).
- **Bright:** first printed unsigned in *Punch*, 19 December 1923; Buller claimed it in 1937.
- **The tutor:** Carolyn Wells, *The Jingle Book*, 1899, in her wording.
- **Nantucket:** kept although rude limericks borrowed its first line (Michael, 28 Sept).
- **The beard** (Lear) is not in the pool; it is the example in the Opening.
- Lear printed lines 3 and 4 as one line; we break them in two.

### Still wanted
Introductions for the ones that need them (the places: Tarentum, Bagdad, Perth, Montrose, Sestri, Blackheath; a quadrille where one turns up). A map for Niger.

## Composing layout (28 Sept, Michael; mockup, not yet in the build prompt)

- The poem starts as empty lines with a cursor. The scrambled lines sit at the bottom right under a faint rule, smaller and in italics, labelled **Ideas**. She taps the idea that is the next line; it vanishes and the line is typed. Every line has to be tapped, even the last. A wrong tap does nothing (open: or a small shake).
- Some lines are equivalent (lines 3 and 4 of Niger, Bright, the pelican, the flue, Peru). She may type them in either order. If hers differs from the original, the page shows the original order and says: "But your arrangement works every bit as well."
- **Top of the page:** a brief introduction for the poem, when it has one. It may explain a new technique (the pelican: "Writers often invent new words to make their poems work. It only works when the reader knows at once what the word means."). **Ruled 28 Sept (Michael): an exception to "never explain an effect before she has had it."** Under the poem it would compete with the pleasure of finishing and the pull of the postcard; at the top it is most likely to be read.
- **Title:** a line kept for it above the poem. A poem with a title shows it at the end, with the byline and date. A poem without one offers *Give it a title* when she finishes: a plain field in the title line, typed with her own keyboard, saved as she types. Her title goes on the postcard and in *My list*.
- **Deferred to a global design (28 Sept, Michael):** an on-page keyboard (with the typewriter keys) and *Say it* (speaking instead of typing). Both are "really, really nice", but each needs to be a site-wide change, not one page's. The same goes for a keyboard for the postcard note.
- **Making sure she knows what to do (28 Sept, Michael).** The Opening is its own page. After the "Lear never called his poems limericks" paragraph it says: "In what follows, the lines of the limerick will appear in a stack under *Ideas*. Your job is to compose the limerick by tapping the ideas in the right order." *Next*, bottom right, brings the first limerick. For her first three limericks, beside IDEAS in lower-case italics: "(tap the line you think comes next)". (Michael wrote "click"; the Rulings make *tap* the verb for mouse and finger both.)
- **Words that do things are Payne's grey,** #546A80, the colour the Remember note already uses for its link, so they read as words that act.
- **Name:** Michael suggests *Wordplay*. Open.
- **Fixes from testing (29 Sept, Michael):** ← goes back one page inside Wordplay (the trail of this visit), not to the gallery; a word *The Curious Woods* beside it goes to the gallery; no idea starts in its own place (a derangement: 44 of the 120 orders of five lines, 24 when a swap pair is excluded too); tapping *Give it a title* clears the words and leaves the cursor and the faint line.
- A small gap between title and poem; the poem single-spaced but not tight; no ruled lines.

## The column and her poems (29 Sept, Michael)

The controls move into Glass Geometry's left column: *How this works*, then **Compose** and **Save and Share** (each opens a small panel she can drag and close), then the italic commands *Share*, *Add to my list*, *Show my poems*, *Go to previous*. Commands appear only when they can do something (Michael's choice). *Next*, bottom right of the poem area, replaces *Another one*. The ← arrow goes (*Go to previous* does its job); *The Curious Woods* stays at the top.

Panel texts. Compose: "The lines of your poem are in a jumbled stack below the word IDEAS. Find the first line and tap it. It will be typed on the sheet. Do the same with the next line and each line that follows. When it is complete, you can give it a title." Save and Share: "To add this poem to your list of favorites, tap *Add to my list*. You can see your list by tapping *Show my poems*. To share your poem as a postcard, tap *Share*." (Michael's words; the first line recast to name the command, per the Instructions ruling.)

*Add to my list* adds the poem as she composed it, with her title (Michael's choice). *Show my poems* turns into *Show new poems* and shows only her poems, whole, with her titles, which she can edit there (Michael's choice); no ideas; **Notes:** under each; *Remove from my list* under the notes, at the left. Removing the last returns to new poems.

Amended 29 Sept (Michael): *Next line, please* removed. *The Curious Woods* at the top of the column. The column is a pale strip (`#f7f4ec`) down the left, for contrast with its words.

## Openings (28 Sept, Michael)

From time to time, when she opens the puzzle, she finds a new first page instead of going straight to a poem. Michael named these **Openings** (28 Sept). It introduces a new poet or a new form the way the Lear page does: who they were, one short example, and then the puzzles. Emily Dickinson, haiku, a Shakespeare song, and later, with Maya, Li Bai.

Michael's view: this started as low-hanging fruit and has turned into a way for a child to explore poetry and literature in general. Start with limericks; go on to haiku (eventually in Japanese), Shakespeare, Li Bai (Michael once spent an afternoon translating "Drinking Alone by Moonlight" with Claude).

**Every poet introduced on an opening also needs a full story in the gallery**, so each one goes on the list of stories wanted. First on the list: **Edward Lear.**

Things to settle: copyright for each poet (Dickinson's 1890s texts are public domain, the 1955 texts with her dashes are not; Li Bai needs an old translation or one of our own); each new form needs its own line shape in place of the limerick's indent; tricks for new forms go in Poetry-Tricks.md.

## Tricks

A trick worth pointing out (a made-up word, one word with two meanings) gets one short note under the finished poem. The list, the rules and the wording are in `Poetry-Tricks.md`.

## Sources
- Pelican: quoteinvestigator.com/2020/06/20/pelican/
- Bright: quoteinvestigator.com/2013/12/19/lady-bright/
- Flue: commonplacefacts.com/2023/04/22/a-flea-and-a-fly-in-a-flue/
- Tutor: Project Gutenberg, *The Jingle Book* (#24560)
- Lear and the word "limerick": worldwidewords.org/qa-lim1.html
- Niger's languages: en.wikipedia.org/wiki/Languages_of_Niger
