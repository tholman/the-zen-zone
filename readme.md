## The Zen Zone

[The Zen Zone](https://thezen.zone) is an exploration into a kind of digital meditation, by providing small "games" that capture your attention.

### The Games

**Switches**: This is perhaps the most simple one of the set, you are given 100 switches to turn on.

![The Switches Game](https://i.imgur.com/rRMN5lzr.png)

**Swirl**: In this activity, you trace the pattern of a spiral, deminishing its size slowly.

![The Swirl Game](https://i.imgur.com/JB8MRpEr.png)

**Break**: This involves moving your mouse to break a larger circle into smaller pieces.

![The Break Game](https://i.imgur.com/5oAqtbMr.png)

### Contributing
1. Clone the repo: `git clone https://github.com/tholman/the-zen-zone.git`
2. CD to directory: `cd the-zen-zone`
3. Yarn install: `yarn install`
4. Yarn start: `yarn start`

This should set up page on `http://localhost:3000`

For quicker development, it may be easier to change out some of the transition code in App.js.

Replacing

```
<TransitionGroup>
  { page }
</TransitionGroup>
```

with 

```
<TransitionGroup>
  { currentPage }
</TransitionGroup>
```

Just remember to set it back before you request a merge :).
