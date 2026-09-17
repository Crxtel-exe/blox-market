import { Component, computed, inject, input } from '@angular/core';
import { ShopItem, isAccount } from '../../models/shop.models';
import { ShopService } from '../../services/shop.service';
import { CURRENCY, GAMES } from '../../data/seed-items';

/**
 * One product tile.
 *
 * The parent passes the item in; everything else (the game's display name, how many
 * are already in the cart) is worked out here so the grid stays dumb.
 */
@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.html',
  styleUrl: './item-card.css',
})
export class ItemCard {
  private readonly shop = inject(ShopService);

  /** The product this tile represents. */
  readonly item = input.required<ShopItem>();

  readonly currency = CURRENCY;

  /** Full game name, e.g. "Murder Mystery 2" instead of "mm2". */
  readonly gameName = computed(
    () => GAMES.find((g) => g.id === this.item().game)?.shortName ?? this.item().game,
  );

  /** How many of this item are already in the cart, for the "in cart" badge. */
  readonly inCart = computed(() => this.shop.quantityOf(this.item().id));

  /** Accounts get a different card tint than in-game items. */
  readonly accountItem = computed(() => isAccount(this.item()));

  addToCart(): void {
    this.shop.addToCart(this.item());
  }
}
