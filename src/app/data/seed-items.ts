import { Game, ShopItem } from '../models/shop.models';

/**
 * SHOP SETTINGS
 * Edit these values directly in this file to customize the shop branding.
 *
 * For images, use a file in public/images (example: '/images/logo.svg')
 * or paste an image URL.
 */
export const SHOP_NAME = 'Blox Market';
export const SHOP_TAGLINE = 'In-game items & accounts';
export const SHOP_LOGO = 'https://i.pinimg.com/736x/97/02/f4/9702f40105c7b1dfd21658284af98ce9.jpg';


/**
 * The game roster the shop filters by.
 *
 * This is a fixed list - the filter bar reads from it,
 * so there is exactly one place to change if we ever stock a fifth game.
 */
export const GAMES: Game[] = [
  {
    id: 'aotr',
    name: 'Attack on Titan Revolution',
    shortName: 'AOTR',
    blurb: 'Titan-slaying gamepass, serums, accounts, cosmetics and Families.',
  },
  {
    id: 'blox-fruit',
    name: 'Blox Fruit',
    shortName: 'Blox Fruit',
    blurb: 'Blox Fruit, Permanent Bloxfruit, Gamepasses, Accounts and Boosting',
  },
  {
    id: 'fisch',
    name: 'Fisch',
    shortName: 'Fisch',
    blurb: 'Currency, Rods, Accounts and Boosting',
  },
  {
    id: 'mm2',
    name: 'Murder Mystery 2',
    shortName: 'MM2',
    blurb: 'Knives, guns and accounts',
  },
];

/** All prices in this shop are Ph Peso. */
export const CURRENCY = 'PHP';

/**
 * Starting catalog. Nothing here is fetched from a server - it is just an array
 * that the service copies into a signal when the app boots.
 */
export const SEED_ITEMS: ShopItem[] = [
  // ---------------------------------------------------------------- AOTR
  {
    id: 'aotr-1',
    image: 'https://aotrevolution.com/originals/webp/Attack%20Serum.webp',
    name: 'Attack Serum',
    game: 'aotr',
    price: 106.69,
    category: 'Serum',
    description:
      'Unlocks the Titan Shifting of the Attack Titan.',
  },
  {
    id: 'aotr-2',
    image: 'https://aotrevolution.com/originals/webp/Female%20Serum.webp',
    name: 'Female Serum',
    game: 'aotr',
    price: 106.69,
    category: 'Serum',
    description:
      'Unlocks the Female Titan transformation ability.',
  },
  {
    id: 'aotr-3',
    image: 'https://aotrevolution.com/originals/webp/Armored%20Serum.webp',
    name: 'Armored Serum',
    game: 'aotr',
    price: 106.69,
    category: 'Serum',
    description:
      'Unlocks the Armored Titan transformation ability.',
  },
  {
    id: 'aotr-4',
    image: 'https://aotrevolution.com/originals/webp/Colossal%20Serum.webp',
    name: 'Colossal Serum',
    game: 'aotr',
    price: 213,
    category: 'Serum',
    description: 'Unlocks the Colossal Titan transformation ability.',
  },
  {
    id: 'aotr-5',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzTJaRfpixaOFHjMWYYoriiIFr2dnvjhnFuaiOmFk_Yw&s=10',
    name: 'Angel Wings',
    game: 'aotr',
    price: 782.41,
    category: 'Cosmetics',
    description: 'An super rare cosmetic that gives you angel wings. It is a super rare that you can only get it at 0.05% chance.',
  },
    {
    id: 'aotr-5',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08WTqCkCDpW-gyZatVmRioVJ4E5wTucBZIt4QReLujA&s=10',
    name: 'Susanoo Wings',
    game: 'aotr',
    price: 213.58,
    category: 'Cosmetics',
    description: 'An super rare cosmetic that gives you Susanoo wings. It is a super rare that you can only get it at a low chance.',
  },
    {
    id: 'aotr-5',
    image: 'https://aotrevolution.com/originals/webp/Skip%20Roll.webp',
    name: 'Skip Roll',
    game: 'aotr',
    price: 101.45,
    category: 'Game Pass',
    description: 'The gamepass that will let you skip the rolling animation when you roll for a family',
  },
      {
    id: 'aotr-5',
    image: 'https://aotrevolution.com/originals/webp/Loadouts.webp',
    name: 'Loadout',
    game: 'aotr',
    price: 210.34,
    category: 'Game Pass',
    description: 'The gamepass that will let you switch loadouts wothout having to re unlock the skill tree',
  },
    {
    id: 'aotr-5',
    image: 'https://aotrevolution.com/originals/webp/helos-2f431bbd56e217e1bc969f3621d35518.webp',
    name: 'Helos',
    game: 'aotr',
    price: 3488.42,
    category: 'Family',
    description: 'A family that is known for its high damage and mobility. It is a very rare family that you can only get it at a low chance.',
  },
      {
    id: 'aotr-5',
    image: 'https://aotrevolution.com/originals/webp/fritz-2f3054a6c17f4abcd10d76cb9609e7a0.webp',
    name: 'Fritz',
    game: 'aotr',
    price: 3488.42,
    category: 'Family',
    description: 'A family that is known for its high damage while using the transformation. It is a very rare family that you can only get it at a low chance.',
  },


  // ---------------------------------------------------------- Blox Fruit
  {
    id: 'bf-1',
    image: 'https://static.wikia.nocookie.net/roblox-blox-piece/images/2/29/Dragon_Fruit.png/revision/latest/scale-to-width-down/110?cb=20260806232519',
    name: 'Dragon Fruit',
    game: 'blox-fruit',
    price: 925.50,
    category: 'Fruit',
    description:
      'Mythical beast-type fruit. Strong in raids and the transformation gives decent mobility on the sea.',
  },
  {
    id: 'bf-2',
    image: 'https://static.wikia.nocookie.net/roblox-blox-piece/images/1/14/Tiger_Fruit.png/revision/latest/scale-to-width-down/110?cb=20251101005924',
    name: 'Leopard Fruit',
    game: 'blox-fruit',
    price: 206.46,
    category: 'Fruit',
    description:'Top-tier grinding fruit. Fast movement and high damage, which is why it is the most requested one we list.',
  },
  {
    id: 'bf-3',
    image: 'https://static.wikia.nocookie.net/roblox-blox-piece/images/0/02/Dough_Fruit.png/revision/latest/scale-to-width-down/110?cb=20260806235727',
    name: 'Dough Fruit',
    game: 'blox-fruit',
    price: 71.20,
    category: 'Fruit',
    description: 'Awakened-ready fruit with strong combo potential. Needs the raid unlock to reach full power.',
  },
  {
    id: 'bf-4',
    image: 'https://static.wikia.nocookie.net/roblox-blox-piece/images/6/65/Kitsune_Fruit.png/revision/latest/scale-to-width-down/110?cb=20241223162956',
    name: 'Permanent Kitsune',
    game: 'blox-fruit',
    price: 1839.69,
    category: 'Permanent Fruit',
    description: 'Stored permanently in your inventory instead of being lost on death. Highest value item we carry.',
  },
  {
    id: 'bf-5',
    image: 'https://static.wikia.nocookie.net/roblox-blox-piece/images/c/cf/BadgeMoneyx2.png/revision/latest/scale-to-width-down/110?cb=20241223150409',
    name: '2x Money',
    game: 'blox-fruit',
    price: 206.46,
    category: 'Game Pass',
    description: 'Doubles the money you earn from defeating enemies.',
  },
  {
    id: 'bf-6',
    image: 'https://mir-s3-cdn-cf.behance.net/projects/808/ba69a4206128855.Y3JvcCw1NDAwLDQyMjMsMCwxNDgz.png',
    name: 'Max level Account with random fruit(Chance to get a Mythical fruit)',
    game: 'blox-fruit',
    price: 294.74,
    category: 'Account',
    description: 'A max level account with a random fruit. There is a chance to get a Mythical fruit, which is the most expensive fruit in the game.',
  },

  // ---------------------------------------------------------------- Fisch
  //FISCH NOT AVAILABLE YET



  
  // ----------------------------------------------------------------- MM2
  //MM2 NOT AVAILABLE YET

];
