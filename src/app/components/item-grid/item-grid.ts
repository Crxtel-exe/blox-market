import { Component, computed, inject } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ItemCard } from '../item-card/item-card';
import { GAMES } from '../../data/seed-items';

/**
 * The product grid.
 *
 * It reads the already-filtered list from the service, so it never has to know
 * which game is selected - the filter bar changes that and this updates itself.
 */
@Component({
  selector: 'app-item-grid',
  imports: [ItemCard],
  templateUrl: './item-grid.html',
  styleUrl: './item-grid.css',
})
export class ItemGrid {
  private readonly shop = inject(ShopService);

  readonly items = this.shop.filteredItems;
  readonly selectedGame = this.shop.selectedGame;

  /** Heading text, e.g. "Showing Murder Mystery 2" or "All items". */
  readonly heading = computed(() => {
    const game = this.selectedGame();
    if (game === 'all') {
      return 'All items';
    }
    return GAMES.find((g) => g.id === game)?.name ?? 'Items';
  });

  /** One-line blurb under the heading, taken from the game record when one is selected. */
  readonly blurb = computed(() => {
    const game = this.selectedGame();
    if (game === 'all') {
      return 'Game passes, weapons, fruits, rods, pets, currency and Roblox accounts.';
    }
    return GAMES.find((g) => g.id === game)?.blurb ?? '';
  });

  /** Puts the filter back to "All" from the empty state. */
  showAll(): void {
    this.shop.selectGame('all');
  }
}
