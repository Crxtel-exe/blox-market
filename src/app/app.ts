import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Header } from './components/header/header';
import { GameFilterBar } from './components/game-filter-bar/game-filter-bar';
import { ItemGrid } from './components/item-grid/item-grid';
import { Cart } from './components/cart/cart';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';
import { ShopService } from './services/shop.service';
import { GAMES, SHOP_NAME } from './data/seed-items';
import { GameId } from './models/shop.models';

/**
 * App shell.
 *
 * Holds the page together and owns the small bits of UI state that are about layout
 * rather than shop data - whether the cart is open, and which
 * section to scroll to.
 */
@Component({
  selector: 'app-root',
  imports: [Header, GameFilterBar, ItemGrid, Cart, OrderConfirmation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly shop = inject(ShopService);

  readonly games = GAMES;
  readonly shopName = SHOP_NAME;
  readonly lastOrder = this.shop.lastOrder;
  readonly showConfirmationModal = this.shop.showConfirmationModal;

  /** Panel visibility. */
  readonly cartOpen = signal(false);

  /** Anchors used by the header nav and the in-page links. */
  private readonly shopAnchor = viewChild<ElementRef<HTMLElement>>('shopAnchor');
  private readonly gamesAnchor = viewChild<ElementRef<HTMLElement>>('gamesAnchor');
  private readonly howAnchor = viewChild<ElementRef<HTMLElement>>('howAnchor');

  // ------------------------------------------------------------------- panels

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }


  // -------------------------------------------------------------- nav scrolls

  scrollTo(section: 'shop' | 'games' | 'how'): void {
    const target =
      section === 'shop'
        ? this.shopAnchor()
        : section === 'games'
          ? this.gamesAnchor()
          : this.howAnchor();
    target?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ------------------------------------------------------------ shop actions

  selectGame(gameId: GameId): void {
    this.shop.selectGame(gameId);
    this.scrollTo('shop');
  }


  /** Called when an order is confirmed from the cart. */
  onOrderPlaced(): void {
    this.cartOpen.set(false);
    setTimeout(() => this.scrollTo('shop'));
  }

  /** Closes the inline confirmation under the order area. */
  dismissInlineOrder(): void {
    this.shop.dismissLastOrder();
  }

  /** Closes the pop-up but leaves the inline confirmation in place. */
  dismissModal(): void {
    this.shop.closeConfirmationModal();
  }
}
