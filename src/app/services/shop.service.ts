import { Injectable, computed, signal } from '@angular/core';
import { CartLine, GameFilter, Order, ShopItem } from '../models/shop.models';
import { GAMES, SEED_ITEMS } from '../data/seed-items';

/**
 * The whole shop's state lives here.
 *
 * There is no backend or database. The catalog is defined manually in
 * src/app/data/seed-items.ts, while cart/order state exists only in memory.
 *
 * State is kept in signals, so every component that reads `filteredItems`,
 * `cartLines` or `cartTotal` updates on its own the moment something changes.
 */
@Injectable({ providedIn: 'root' })
export class ShopService {
  // ------------------------------------------------------------------ state

  /** The catalog. Starts as a copy of the seed array so we never mutate the source. */
  private readonly _items = signal<ShopItem[]>([...SEED_ITEMS]);

  /** Which game the filter bar is currently on. 'all' shows everything. */
  private readonly _selectedGame = signal<GameFilter>('all');

  /** Everything in the cart, as item + quantity pairs. */
  private readonly _cart = signal<CartLine[]>([]);

  /** The most recent confirmed order, or null if nothing has been ordered yet. */
  private readonly _lastOrder = signal<Order | null>(null);

  /**
   * When true the confirmation shows as a pop-up on top of the page.
   * The inline confirmation message under the order area is driven by `_lastOrder`
   * instead, so the buyer always has a copy of it in the page itself.
   */
  private readonly _showConfirmationModal = signal(false);

  // ------------------------------------------------------------- public reads

  readonly games = GAMES;

  /** Read-only view of the catalog. */
  readonly items = this._items.asReadonly();

  readonly selectedGame = this._selectedGame.asReadonly();

  selectGame(game: GameFilter): void {
  this._selectedGame.set(game);
}

  readonly cartLines = this._cart.asReadonly();

  readonly lastOrder = this._lastOrder.asReadonly();

  readonly showConfirmationModal = this._showConfirmationModal.asReadonly();

  /**
   * The catalog after the game filter is applied.
   * Recomputes by itself whenever the catalog or the selected game changes, which is
   * why clicking a filter button feels instant.
   */
  readonly filteredItems = computed<ShopItem[]>(() => {
    const game = this._selectedGame();
    const all = this._items();
    return game === 'all' ? all : all.filter((item) => item.game === game);
  });

  /** Total number of individual items in the cart, counting quantities. */
  readonly cartCount = computed(() =>
    this._cart().reduce((sum, line) => sum + line.quantity, 0),
  );

  /** Cart value in Peso. */
  readonly cartTotal = computed(() =>
    this._cart().reduce((sum, line) => sum + line.item.price * line.quantity, 0),
  );

  readonly isCartEmpty = computed(() => this._cart().length === 0);

  /** How many items sit behind each filter button, for the little count on the tab. */
  readonly countForGame = computed<Record<GameFilter, number>>(() => {
    const all = this._items();
    const counts = { all: all.length } as Record<GameFilter, number>;
    for (const game of this.games) {
      counts[game.id] = all.filter((item) => item.game === game.id).length;
    }
    return counts;
  });

  // -------------------------------------------------------------- cart edits

  /** Adds one of an item, or bumps the quantity if it is already in the cart. */
  addToCart(item: ShopItem): void {
    this._cart.update((lines) => {
      const existing = lines.find((line) => line.item.id === item.id);
      if (existing) {
        return lines.map((line) =>
          line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...lines, { item, quantity: 1 }];
    });
  }

  /** Removes a line completely, however many of it were in there. */
  removeFromCart(itemId: string): void {
    this._cart.update((lines) => lines.filter((line) => line.item.id !== itemId));
  }

  /**
   * Sets an exact quantity. Dropping to zero or below removes the line, which saves
   * the buyer from having to press minus and then remove.
   */
  setQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    this._cart.update((lines) =>
      lines.map((line) => (line.item.id === itemId ? { ...line, quantity } : line)),
    );
  }

  clearCart(): void {
    this._cart.set([]);
  }

  /** How many of this exact item are in the cart. Used for the badge on each card. */
  quantityOf(itemId: string): number {
    return this._cart().find((line) => line.item.id === itemId)?.quantity ?? 0;
  }

  // ----------------------------------------------------------------- ordering

  /**
   * Confirms the order.
   *
   * The caller is expected to have already validated the Roblox username - this just
   * records the order, empties the cart and opens the confirmation pop-up.
   * Returns the order so the checkout form can react to it.
   */
  placeOrder(robloxUsername: string): Order {
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      robloxUsername: robloxUsername.trim(),
      lines: this._cart(),
      total: this.cartTotal(),
      placedAt: new Date(),
    };

    this._lastOrder.set(order);
    this._showConfirmationModal.set(true);
    this.clearCart();
    return order;
  }

  closeConfirmationModal(): void {
    this._showConfirmationModal.set(false);
  }

  /** Lets the buyer start a fresh order from the inline confirmation. */
  dismissLastOrder(): void {
    this._lastOrder.set(null);
    this._showConfirmationModal.set(false);
  }
}
