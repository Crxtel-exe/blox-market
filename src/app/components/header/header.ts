import { Component, inject, output } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { SHOP_LOGO, SHOP_NAME, SHOP_TAGLINE } from '../../data/seed-items';

/**
 * Top bar: brand, a couple of nav links, the cart button and the cart button.
 *
 * The cart count comes straight from the service signal, so the badge updates the
 * moment something is added without the header having to be told about it.
 */
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly shop = inject(ShopService);

  readonly cartCount = this.shop.cartCount;
  readonly shopName = SHOP_NAME;
  readonly shopTagline = SHOP_TAGLINE;
  readonly shopLogo = SHOP_LOGO;

  /** Raised when the buyer clicks the cart button. */
  readonly openCart = output<void>();


  /** Raised when a nav link is clicked, so the shell can scroll to that part of the page. */
  readonly navigateTo = output<'shop' | 'games' | 'how'>();

  go(section: 'shop' | 'games' | 'how'): void {
    this.navigateTo.emit(section);
  }
}
