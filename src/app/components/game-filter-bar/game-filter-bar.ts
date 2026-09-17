import { Component, inject } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { GameFilter } from '../../models/shop.models';

/**
 * The game filter row: "All" first, then the four games.
 *
 * Clicking a chip just sets a signal in the service. The grid reads the computed
 * filtered list, so the change shows up straight away with no reload or wait.
 */
@Component({
  selector: 'app-game-filter-bar',
  imports: [],
  templateUrl: './game-filter-bar.html',
  styleUrl: './game-filter-bar.css',
})
export class GameFilterBar {
  private readonly shop = inject(ShopService);

  readonly games = this.shop.games;
  readonly selectedGame = this.shop.selectedGame;
  readonly countForGame = this.shop.countForGame;

  select(game: GameFilter): void {
    this.shop.selectGame(game);
  }
}
