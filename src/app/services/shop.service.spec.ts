import { TestBed } from '@angular/core/testing';
import { ShopService } from './shop.service';
import { SEED_ITEMS } from '../data/seed-items';

/**
 * These cover the shop rules that matter: filtering, cart maths, and what happens to the cart once an order is confirmed.
 */
describe('ShopService', () => {
  let shop: ShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    shop = TestBed.inject(ShopService);
  });

  describe('catalog and filtering', () => {
    it('starts on "All" and shows the whole seed catalog', () => {
      expect(shop.selectedGame()).toBe('all');
      expect(shop.filteredItems().length).toBe(SEED_ITEMS.length);
    });

    it('filters to a single game when one is selected', () => {
      shop.selectGame('mm2');

      const items = shop.filteredItems();
      expect(items.length).toBeGreaterThan(0);
      expect(items.every((item) => item.game === 'mm2')).toBe(true);
    });

    it('has stock for all four games', () => {
      for (const game of ['aotr', 'blox-fruit', 'fisch', 'mm2'] as const) {
        shop.selectGame(game);
        expect(shop.filteredItems().length).toBeGreaterThan(0);
      }
    });

    it('goes back to everything when "all" is selected again', () => {
      shop.selectGame('fisch');
      shop.selectGame('all');
      expect(shop.filteredItems().length).toBe(SEED_ITEMS.length);
    });

    it('counts items per game for the filter chips', () => {
      const counts = shop.countForGame();
      expect(counts.all).toBe(SEED_ITEMS.length);
      expect(counts.mm2).toBe(SEED_ITEMS.filter((i) => i.game === 'mm2').length);
    });
  });


  describe('cart', () => {
    it('adds a line and counts it', () => {
      shop.addToCart(shop.items()[0]);

      expect(shop.cartLines().length).toBe(1);
      expect(shop.cartCount()).toBe(1);
    });

    it('bumps the quantity instead of adding a duplicate line', () => {
      const item = shop.items()[0];
      shop.addToCart(item);
      shop.addToCart(item);

      expect(shop.cartLines().length).toBe(1);
      expect(shop.cartLines()[0].quantity).toBe(2);
      expect(shop.cartCount()).toBe(2);
    });

    it('works out the total across different items and quantities', () => {
      const [first, second] = shop.items();
      shop.addToCart(first);
      shop.addToCart(first);
      shop.addToCart(second);

      expect(shop.cartTotal()).toBe(first.price * 2 + second.price);
    });

    it('removes a line completely', () => {
      const item = shop.items()[0];
      shop.addToCart(item);
      shop.addToCart(item);
      shop.removeFromCart(item.id);

      expect(shop.cartLines().length).toBe(0);
      expect(shop.cartTotal()).toBe(0);
      expect(shop.isCartEmpty()).toBe(true);
    });

    it('drops the line when the quantity is set to zero', () => {
      const item = shop.items()[0];
      shop.addToCart(item);
      shop.setQuantity(item.id, 0);

      expect(shop.cartLines().length).toBe(0);
    });

    it('clears the whole cart', () => {
      shop.addToCart(shop.items()[0]);
      shop.addToCart(shop.items()[1]);
      shop.clearCart();

      expect(shop.isCartEmpty()).toBe(true);
    });
  });

  describe('placing an order', () => {
    it('records the order with the Roblox username', () => {
      shop.addToCart(shop.items()[0]);
      const order = shop.placeOrder('  AceBloxxer2013  ');

      // The username is trimmed, so stray spaces do not end up on the order.
      expect(order.robloxUsername).toBe('AceBloxxer2013');
      expect(shop.lastOrder()?.robloxUsername).toBe('AceBloxxer2013');
    });

    it('empties the cart once the order is confirmed', () => {
      shop.addToCart(shop.items()[0]);
      shop.placeOrder('AceBloxxer2013');

      expect(shop.isCartEmpty()).toBe(true);
      expect(shop.cartTotal()).toBe(0);
    });

    it('opens the confirmation pop-up with the order total intact', () => {
      const item = shop.items()[0];
      shop.addToCart(item);
      shop.addToCart(item);

      shop.placeOrder('AceBloxxer2013');

      expect(shop.showConfirmationModal()).toBe(true);
      expect(shop.lastOrder()?.total).toBe(item.price * 2);
    });

    it('closes the pop-up without losing the order summary', () => {
      shop.addToCart(shop.items()[0]);
      shop.placeOrder('AceBloxxer2013');

      shop.closeConfirmationModal();

      expect(shop.showConfirmationModal()).toBe(false);
      expect(shop.lastOrder()).not.toBeNull();
    });

    it('clears the order summary when it is dismissed', () => {
      shop.addToCart(shop.items()[0]);
      shop.placeOrder('AceBloxxer2013');

      shop.dismissLastOrder();

      expect(shop.lastOrder()).toBeNull();
      expect(shop.showConfirmationModal()).toBe(false);
    });
  });
});
