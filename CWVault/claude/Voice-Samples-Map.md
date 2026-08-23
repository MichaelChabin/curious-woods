---
status: Voice samples — Aug 19 2026
role: Register test for explaining hard things to a ten-year-old who resents being talked down to
related: Design-Principles.md, claude/Fog-Map.md
---
Two Explanations, in the Voice

Written to a brief: explain this to a ten-year-old with no background who resents being talked down to.

The register, stated as rules: no framing devices, no enthusiasm markers, no "isn't that amazing," no rhetorical questions to the reader. Short sentences. Real numbers, not round ones. Say the hard part plainly rather than skipping it. Let the interesting thing be interesting without help. Respect means not explaining the joke.

The largest-prime-factor map

Every number can be broken into primes, and there's only one way to do it. 12 is 2 × 2 × 3. 1768 is 2 × 2 × 2 × 13 × 17. Once you've broken a number all the way down, look at the biggest prime you got. For 12 that's 3. For 1768 it's 17. That biggest prime is the number's colour on this map. Small biggest prime, cool and dark. Large biggest prime, bright.

Each square on the map is a multiplication: the square in column 7, row 4 holds 28. And here's the part worth stopping on. To break 28 into primes you don't have to start over — 28 is 7 × 4, so its primes are just 7's primes and 4's primes tipped into the same pile. 7, and 2 × 2. The biggest one in the pile is 7.

Which means the colour of any square is decided by a very small rule: take the biggest prime in the column, take the biggest prime in the row, and keep the bigger of the two. That's all. You never look at the actual number.

That rule is why it looks like fabric. Every column has one number that speaks for it, and so does every row. Where they cross, the bigger one wins — so a bright thread crossing a dark one stays bright, and the dark thread gets interrupted. That's exactly what happens in real plaid: some threads pass over, some pass under. Here the one that passes over is the one with the bigger prime.

Now you can read the picture. The darkest columns are 2, 4, 8, 16, 32, 64 — nothing in them but 2s. The brightest single lines are the big primes, where the whole column is that one colour because nothing in any row is big enough to beat it. And some enormous numbers are almost black: 64 × 81 is 5184, but it's only 2s and 3s, so it sits in the dark.

Big number, small colour. The map isn't showing you how large things are. It's showing you what they're made of.

The orchard

Stand in the corner of an orchard. The trees are planted at every whole-number spot: one step across and three steps up, four across and four up, and so on, forever.

Look out across it. You can't see all the trees, because some of them are standing exactly behind a nearer one.

Take the tree at 4 across, 6 up. Look straight at it. Your line of sight passes through 2 across, 3 up on the way — there's already a tree there, and it's in the way. So the tree at 4 and 6 is hidden. And so is 6 and 9, and 8 and 12, and every tree further along that same line.

Here's when a tree is hidden: when its two numbers share a factor. 4 and 6 are both even, so halve them both and you land on a nearer tree at 2 and 3. That nearer tree is what blocks it. If the two numbers share nothing — 3 and 5, say — there's no nearer tree on that line, and you can see it.

That's the whole picture. The dark dots are trees you can see. The pale streaks running away from the corner are the queues: each one is a line of trees standing behind whichever tree got there first.

Every tree you can see is a fraction that can't be reduced. The tree at 3 across and 5 up is three-fifths, and there's no simpler way to say it. The hidden ones behind it — 6 and 10, 9 and 15 — are the same fraction written worse.

Now count. In any big square patch of the orchard, you can see about 61 trees out of every 100. Not 60, not 62. I counted a patch 600 by 600 and got 0.6083.

That number is 6 divided by pi squared.

Pi. In an orchard. There is no circle here, nothing is round, and nothing has been measured with a curve — you counted trees on a grid of whole numbers and pi came out.

I'm not going to pretend the reason is easy. The short version: to see a tree, its two numbers have to avoid sharing 2, and avoid sharing 3, and avoid sharing 5, and so on for every prime forever. When you chase what that costs you, you end up adding 1 + 1/4 + 1/9 + 1/16 + ... — one over each square, forever — and that sum is pi squared over six. Which is its own strange fact, and worth a separate afternoon.

For now the thing to hold is smaller and stranger: pi is not really about circles. It shows up in circles. It also shows up here.