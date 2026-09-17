import { Component, inject, output } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { CheckoutForm } from '../checkout-form/checkout-form';
import { CURRENCY, GAMES } from '../../data/seed-items';
import { Order } from '../../models/shop.models';

/**
 * Slide-in cart panel.
 *
 * Holds the line items with quantity steppers and remove buttons, the running total,
 * and the checkout form at the bottom. Checkout is only reachable once there is
 * something in the cart.
 */
@Component({
  selector: 'app-cart',
  imports: [CheckoutForm],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private readonly shop = inject(ShopService);

  readonly cartLines = this.shop.cartLines;
  readonly cartTotal = this.shop.cartTotal;
  readonly cartCount = this.shop.cartCount;
  readonly isCartEmpty = this.shop.isCartEmpty;

  readonly currency = CURRENCY;

  /** Raised when the buyer closes the panel. */
  readonly close = output<void>();

  /** Passed up so the shell can show the confirmation under the main content too. */
  readonly orderPlaced = output<Order>();

  /** Tracks whether the checkout form has been opened. */
  showingCheckout = false;

  gameName(gameId: string): string {
    return GAMES.find((g) => g.id === gameId)?.shortName ?? gameId;
  }

  lineTotal(price: number, quantity: number): number {
    return price * quantity;
  }

  increase(itemId: string, quantity: number): void {
    this.shop.setQuantity(itemId, quantity + 1);
  }

  decrease(itemId: string, quantity: number): void {
    this.shop.setQuantity(itemId, quantity - 1);
  }

  remove(itemId: string): void {
    this.shop.removeFromCart(itemId);
  }

  clearAll(): void {
    this.shop.clearCart();
    this.showingCheckout = false;
  }

  openCheckout(): void {
    this.showingCheckout = true;
  }

  cancelCheckout(): void {
    this.showingCheckout = false;
  }

  /** Called by the checkout form once the order has gone through. */
  onOrderPlaced(order: Order): void {
    this.showingCheckout = false;
    this.orderPlaced.emit(order);
    // The cart is emptied by the service, so the panel switches to its empty state.
  }
}
