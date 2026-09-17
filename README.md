# RBX Emporium

A Roblox game-item shop built with Angular. Buy in-game items for **AOTR (Attack on Titan
Revolution)**, **Blox Fruit**, **Fisch** and **Murder Mystery 2 (MM2)**, plus a few ready-made
Roblox accounts.

This is a front-end only project. There is no backend and no database — the catalog lives in a
TypeScript file, and the cart and orders are held in memory while the tab is open.

---

## Requirements

- **Node.js v22.22.3 or newer** (Angular 22 needs at least this; older Node will refuse to start
  the CLI)
- npm

Check what you have:

```bash
node -v
```

## Install and run

```bash
npm install
npm start
```

Then open <http://localhost:4200>.

`npm start` runs `ng serve`. The dev server reloads automatically when you save a file.

### Other commands

```bash
npm run build     # production build, output goes to dist/my-app
npm test          # unit tests with Vitest
```

If `ng` is not recognised, the CLI is installed locally rather than globally, so either use the npm
scripts above or run it through npx:

```bash
npx ng serve
```

---

## What the app does

**Game filter.** A row of chips across the top of the shop — *All*, *AOTR*, *Blox Fruit*, *Fisch*
and *MM2*. Each chip shows how many items are behind it. Clicking one filters the grid immediately,
because the grid reads a computed list that recalculates as soon as the selection changes.

**Catalog.** 26 items seeded across the four games — game passes, weapons, fruits, rods, pets and
currency — plus four Roblox accounts. Every price is in **Philippine Peso**.

Roblox accounts are listed as products like anything else, but each one sits under the game it
belongs to (the MM2 account under MM2, and so on) rather than getting a filter slot of its own. That
keeps the game filter to the four games, and the *Account* tag on the card is what marks it out.

**Add your own items.** The **Add item** button in the header opens a panel with a name field, a
game dropdown, a category dropdown, a price and a description. Whatever you add is pushed straight
into the catalog, so it shows up in the grid and can be filtered to right away. It lasts for the
session only.

**Cart.** Add items from any card, then open the cart from the header. The cart shows each line's
unit price, a quantity stepper, a line total, and a running total. Lines can be removed outright or
stepped down to zero. The header badge tracks the total item count.

**Checkout.** **Proceed to checkout** swaps the cart body for the checkout form. The **Roblox
username** is required — pressing *Confirm order* with it empty shows an inline error and a red
field outline, and the message clears as soon as you start typing.

**Confirmation.** A confirmed order shows up in two places at once:

1. A **pop-up modal** over the page, with the username called out, the order number and a summary.
2. An **inline message** under the shop area, with the same username, order number, total and full
   order summary.

The cart empties as soon as the order goes through. Closing the pop-up leaves the inline message
alone; the inline message has its own **Start a new order** button.

---

## Project layout

```
src/
  app/
    app.ts / app.html / app.css        Root shell: layout, panel visibility, section scrolling
    app.config.ts                      App providers
    models/
      shop.models.ts                   GameId, ShopItem, CartLine, Order
    data/
      seed-items.ts                    The four games and the starting catalog
    services/
      shop.service.ts                  All state: catalog, filter, cart, orders (signals)
      shop.service.spec.ts             Unit tests for the shop rules
    components/
      header/                          Top bar, nav, cart badge, Add item button
      game-filter-bar/                 All + the four games, with per-game counts
      item-grid/                       Responsive grid and empty state
      item-card/                       One product tile
      cart/                            Cart drawer: quantities, totals, remove
      checkout-form/                   Roblox username (required) + optional fields
      order-confirmation/              One component, two modes: modal and inline
      add-item-form/                   Add a product to the catalog
  styles.css                           Global dark theme and design tokens
```

## How the state works

Everything lives in `ShopService`, using Angular signals:

- `items` holds the catalog, seeded from `data/seed-items.ts`
- `selectedGame` holds the active filter
- `filteredItems` is a `computed` that applies the filter — this is why filtering feels instant
- `cartLines`, `cartCount` and `cartTotal` hold the cart
- `lastOrder` and `showConfirmationModal` drive the confirmation

Components read these signals directly, so nothing has to be passed down through chains of inputs
to stay in sync.

## Design

Dark throughout, with crimson (`#DC143C`) as the only accent — used for buttons, prices, the active
filter chip, tags and highlights. Surfaces sit on near-black, and the tokens are defined once at the
top of `src/styles.css`.

---


