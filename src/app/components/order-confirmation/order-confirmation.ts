import { Component, inject, input, output } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { CURRENCY, GAMES } from '../../data/seed-items';
import { Order } from '../../models/shop.models';

/**
 * Order confirmation.
 *
 * One component, two jobs. With `variant="modal"` it renders as the pop-up that opens
 * over the page; with `variant="inline"` it renders as the message sitting under the
 * order area. Both are driven by the same order object, so the buyer sees the same
 * details in both places - including the Roblox username they typed.
 */
@Component({
  selector: 'app-order-confirmation',
  imports: [],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
})
export class OrderConfirmation {
  private readonly shop = inject(ShopService);

  /** The order to show. */
  readonly order = input.required<Order>();

  /**
   * "modal" for the pop-up, "inline" for the message under the order area.
   * The styling differs but the contents do not.
   */
  readonly variant = input<'modal' | 'inline'>('inline');

  /** Raised when the buyer dismisses this confirmation. */
  readonly dismissed = output<void>();

  readonly currency = CURRENCY;

  gameName(gameId: string): string {
    return GAMES.find((g) => g.id === gameId)?.shortName ?? gameId;
  }

  lineTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  /** Total number of individual items, counting quantities. */
  get totalItems(): number {
    return this.order().lines.reduce((sum, line) => sum + line.quantity, 0);
  }

  dismiss(): void {
    this.shop.closeConfirmationModal();
    this.dismissed.emit();
  }
}
