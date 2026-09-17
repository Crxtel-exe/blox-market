import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { CURRENCY } from '../../data/seed-items';
import { Order } from '../../models/shop.models';

/**
 * Checkout form.
 *
 * The Roblox username is the one field the order actually needs, so it is required.
 * Validation runs when the buyer presses Confirm, and again on every keystroke once
 * an error is showing - that way the message clears as soon as they fix it rather
 * than making them press the button again to find out.
 */
@Component({
  selector: 'app-checkout-form',
  imports: [FormsModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.css',
})
export class CheckoutForm {
  private readonly shop = inject(ShopService);

  readonly cartTotal = this.shop.cartTotal;
  readonly cartCount = this.shop.cartCount;
  readonly currency = CURRENCY;

  /** Fires once the order has been recorded. */
  readonly placed = output<Order>();

  /** Fires when the buyer backs out of checkout. */
  readonly cancelled = output<void>();

  robloxUsername = '';
  email = '';
  note = '';

  /** Set to true once Confirm has been pressed with an empty username. */
  usernameError = false;

  /**
   * Only shown after the first failed attempt, so we do not yell at the buyer
   * before they have had a chance to type anything.
   */
  get showUsernameError(): boolean {
    return this.usernameError;
  }

  /** Clears the error as soon as the buyer starts typing a real value. */
  onUsernameInput(): void {
    if (this.usernameError && this.robloxUsername.trim().length > 0) {
      this.usernameError = false;
    }
  }

  confirm(): void {
    // The required field check.
    if (this.robloxUsername.trim().length === 0) {
      this.usernameError = true;
      return;
    }

    const order = this.shop.placeOrder(this.robloxUsername);

    // Reset the form so a second order starts clean.
    this.robloxUsername = '';
    this.email = '';
    this.note = '';
    this.usernameError = false;

    this.placed.emit(order);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
