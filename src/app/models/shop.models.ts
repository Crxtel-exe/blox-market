/**
 * Shared types for the RBX Emporium shop.
 *
 * Everything here is plain TypeScript - there is no backend and no database.
 * The whole catalog lives in memory, so a page refresh resets the shop.
 */

/** The four games we stock items for. These are the only options in the game filter. */
export type GameId = 'aotr' | 'blox-fruit' | 'fisch' | 'mm2';

/** The game filter adds an "All" option on top of the four games. */
export type GameFilter = GameId | 'all';

/** A game shown in the filter bar. */
export interface Game {
  id: GameId;
  name: string;
  shortName: string;
  blurb: string;
}

/** What kind of thing the buyer is getting. Used for the little tag on each card. */
export type ItemCategory =
  | 'Game Pass'
  | 'Serum'
  | 'Weapon'
  | 'Fruit'
  | 'Rod'
  | 'Cosmetics'
  | 'Currency'
  | 'Account'
  | 'Family'
  | 'Permanent Fruit'
  | 'Boosting'
    
  ;

export interface ShopItem {
  id: string;
  name: string;
  /** Which game the product belongs to. Accounts belong to their game too. */
  game: GameId;
  price: number;
  description: string;
  /** Image path or URL shown on the product card. Edit this directly in seed-items.ts. */
  image?: string;
  category: ItemCategory;
}

/** True when the product is a whole Roblox account rather than an in-game item. */
export function isAccount(item: ShopItem): boolean {
  return item.category === 'Account';
}

/** One line in the cart: the item plus how many of it the buyer wants. */
export interface CartLine {
  item: ShopItem;
  quantity: number;
}

/** Snapshot of a completed order, kept around so we can show a summary. */
export interface Order {
  id: string;
  robloxUsername: string;
  lines: CartLine[];
  total: number;
  placedAt: Date;
}
