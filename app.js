/* MealPilot — prototype front-end autonome. Les données prix/enseignes sont simulées. */

const STORE_KEY = 'mealpilot-prototype-v1';
const MONEY = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const app = document.getElementById('app');
const toastRoot = document.getElementById('toast-root');

const ICONS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/><path d="M9 21v-6h6v6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h2m4 0h2m-8 3h2"/>',
  cart: '<path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/>',
  star: '<path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.2-5.5-2.9-5.5 2.9 1.1-6.2-4.5-4.4 6.2-.9z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  sparkles: '<path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7zM5 2l.6 2.4L8 5l-2.4.6L5 8l-.6-2.4L2 5l2.4-.6z"/>',
  settings: '<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="m19.4 15 .1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 1 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 1 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 1 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 1 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5m6 6-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  leaf: '<path d="M20.5 3.5c-9.4-.5-15.8 3.2-16 10.1a6.4 6.4 0 0 0 6.1 6.8c7.2.3 10.5-7.2 9.9-16.9Z"/><path d="M5 20c2.5-4.5 6.2-7.3 11-9.5"/>',
  wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8h18M16 14h2"/><path d="M6 5V3h12v2"/>',
  fork: '<path d="M7 3v6M4 3v4a3 3 0 0 0 6 0V3M7 10v11M16 3v18M16 3c3 2 4 5 4 8h-4"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  heart: '<path d="M20.8 8.7c0 5.2-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9a7 7 0 0 1 11.8-2L20 12M4 12l2.6 5a7 7 0 0 0 11.8-2"/>',
  oven: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16M8 5.5h.01M12 5.5h.01M16 5.5h.01M7 11h10v7H7z"/>',
  stove: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M7 6h2m6 0h2M8 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>',
  microwave: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M5 8h11v8H5zM19 9h.01M19 12h.01M19 15h.01"/>',
  airfryer: '<path d="M7 3h10v3H7zM5 6h14l1.3 12.2A2 2 0 0 1 18.3 20H5.7a2 2 0 0 1-2-1.8L5 6Z"/><path d="M8 10h8v4H8zM10 17h4"/>',
  blender: '<path d="M8 3h8l1 4H7l1-4ZM7 7h10l-1 10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 7ZM10 21h4"/><path d="M9 10h6"/>',
  robot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 3v5M9 12h.01M15 12h.01M8 16h8M3 12h1M20 12h1"/>',
  pot: '<path d="M4 10h16l-1.4 9H5.4L4 10ZM3 10h18M8 10V7h8v3M2 7h4m12 0h4"/><path d="M9 4h6"/>',
  pan: '<path d="M3 12h13a4 4 0 0 1 0 8H8a5 5 0 0 1-5-5v-3ZM16 12l5-5"/><path d="M7 15h.01"/>',
  toaster: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M7 8V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3M8 12v3m8-3v3M20 13h1v4h-1"/>',
  basket: '<path d="m4 10 2 10h12l2-10H4Z"/><path d="m8 10 4-7 4 7M9 13v4m6-4v4M3 10h18"/>',
  fish: '<path d="M3 12s3-5 9-5c4 0 7 5 7 5s-3 5-7 5c-6 0-9-5-9-5Z"/><path d="m19 12 3-3v6l-3-3ZM9 10h.01M7 12h.01"/>',
  dairy: '<path d="M8 3h8l2 4v14H6V7l2-4ZM6 7h12M9 3v4m6-4v4"/><path d="M9 12h6"/>',
  bread: '<path d="M4 13a4 4 0 0 1 0-8 4 4 0 0 1 8 0 4 4 0 0 1 8 0 4 4 0 0 1 0 8v7H4v-7Z"/><path d="M9 14v3m6-3v3"/>',
  snow: '<path d="M12 2v20M4 7l16 10M20 7 4 17"/><path d="m9 4 3-2 3 2m-6 16 3 2 3-2M2 10l2-3 3 1m10 8 3 1 2-3M22 10l-2-3-3 1M7 16l-3 1-2-3"/>',
  shield: '<path d="M12 22s8-3.8 8-10V5l-8-3-8 3v7c0 6.2 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  fridge: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M5 11h14M9 6v2m0 6v3"/>',
  lightbulb: '<path d="M9 18h6M10 22h4M8.2 14.5a6 6 0 1 1 7.6 0c-.8.7-1.3 1.5-1.5 2.5h-4.6c-.2-1-.7-1.8-1.5-2.5Z"/>',
  trend: '<path d="m3 17 6-6 4 4 8-9"/><path d="M15 6h6v6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  plate: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="M12 2v3m10 7h-3"/>',
  milk: '<path d="M8 3h8l2 4v14H6V7l2-4ZM6 7h12M10 3v4"/><path d="M9 12h6"/>',
  bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M9 12v.01M15 12v.01"/>',
  camera: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6 9.5 3h5L16 6"/><circle cx="12" cy="13" r="3.2"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  fire: '<path d="M12 22c4.2 0 7-2.8 7-6.8 0-2.4-1.2-4.5-3.3-6.6-.2 2-1.2 3.1-2.7 3.8.7-4.5-1.8-7.8-4.4-10.4C8.9 6 7 8.5 6 10.9 4.5 14.4 5 17.2 6.5 19.4A6.5 6.5 0 0 0 12 22Z"/><path d="M12 22c-1.9 0-3.2-1.4-3.2-3.2 0-1.2.6-2.2 1.8-3.5.1 1.2.7 1.8 1.4 2.1.1-1.6.7-2.5 1.6-3.4.8 1.5 1.5 2.6 1.5 4.1A3.7 3.7 0 0 1 12 22Z"/>',
  meal: '<path d="M4 12h16M6 12a6 6 0 0 1 12 0M8 17h8M12 3v2"/>',
};
function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.info;
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
function money(value) { return MONEY.format(Number.isFinite(value) ? value : 0); }
function round2(value) { return Math.round((value + Number.EPSILON) * 100) / 100; }
function normalizeText(value = '') { return String(value).toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }
function splitTerms(value = '') { return String(value).split(/[,;\n]/).map(x => normalizeText(x)).filter(Boolean); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function prettyNumber(n, digits = 1) { return Number(n).toLocaleString('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: Number.isInteger(n) ? 0 : Math.min(digits, 1) }); }

const GOALS = [
  { id: 'balanced', label: 'Manger équilibré', icon: 'leaf' },
  { id: 'weight', label: 'Perdre du poids', icon: 'trend' },
  { id: 'muscle', label: 'Prendre du muscle', icon: 'fire' },
  { id: 'protein', label: 'Plus de protéines', icon: 'meal' },
  { id: 'save', label: 'Réduire les dépenses', icon: 'wallet' },
  { id: 'vegetables', label: 'Plus de légumes', icon: 'leaf' },
  { id: 'vegetarian', label: 'Manger végétarien', icon: 'leaf' },
  { id: 'time', label: 'Gagner du temps', icon: 'clock' },
  { id: 'waste', label: 'Réduire le gaspillage', icon: 'refresh' },
  { id: 'wellbeing', label: 'Simplement bien manger', icon: 'heart' },
];
const EQUIPMENT = [
  { id: 'oven', label: 'Four', icon: 'oven' },
  { id: 'hob', label: 'Plaques', icon: 'stove' },
  { id: 'microwave', label: 'Micro-ondes', icon: 'microwave' },
  { id: 'airfryer', label: 'Air fryer', icon: 'airfryer' },
  { id: 'blender', label: 'Blender', icon: 'blender' },
  { id: 'robot', label: 'Robot de cuisine', icon: 'robot' },
  { id: 'cocotte', label: 'Cocotte', icon: 'pot' },
  { id: 'pan', label: 'Poêle', icon: 'pan' },
  { id: 'pot', label: 'Casserole', icon: 'pot' },
  { id: 'toaster', label: 'Grille-pain', icon: 'toaster' },
];
const STORES = ['Carrefour', 'E.Leclerc', 'Lidl', 'Aldi', 'Intermarché', 'Auchan', 'Monoprix', 'Amazon Fresh', 'Autre'];
const STORE_FACTOR = { 'Lidl': .91, 'Aldi': .92, 'E.Leclerc': .96, 'Auchan': .98, 'Intermarché': .99, 'Carrefour': 1, 'Autre': 1, 'Monoprix': 1.12, 'Amazon Fresh': 1.15 };
const STORE_PRICE_INDEX = {
  'Fruits & légumes': { 'Carrefour': 1, 'E.Leclerc': .94, 'Lidl': .96, 'Aldi': .98, 'Intermarché': .99, 'Auchan': 1.01, 'Monoprix': 1.15, 'Amazon Fresh': 1.12, 'Autre': 1 },
  'Viandes & poissons': { 'Carrefour': 1, 'E.Leclerc': .92, 'Lidl': .98, 'Aldi': .95, 'Intermarché': .96, 'Auchan': .97, 'Monoprix': 1.16, 'Amazon Fresh': 1.14, 'Autre': 1 },
  'Produits laitiers & œufs': { 'Carrefour': 1, 'E.Leclerc': .95, 'Lidl': .97, 'Aldi': .93, 'Intermarché': .98, 'Auchan': .96, 'Monoprix': 1.14, 'Amazon Fresh': 1.12, 'Autre': 1 },
  'Épicerie': { 'Carrefour': 1, 'E.Leclerc': .96, 'Lidl': .90, 'Aldi': .92, 'Intermarché': .99, 'Auchan': .97, 'Monoprix': 1.14, 'Amazon Fresh': 1.03, 'Autre': 1 },
  'Boulangerie': { 'Carrefour': 1, 'E.Leclerc': .98, 'Lidl': .96, 'Aldi': .97, 'Intermarché': 1.01, 'Auchan': .99, 'Monoprix': 1.16, 'Amazon Fresh': 1.12, 'Autre': 1 },
  'Surgelés': { 'Carrefour': 1, 'E.Leclerc': .97, 'Lidl': .90, 'Aldi': .92, 'Intermarché': .98, 'Auchan': .94, 'Monoprix': 1.14, 'Amazon Fresh': 1.03, 'Autre': 1 },
};
const STORE_SHORT = { 'E.Leclerc': 'Leclerc', 'Intermarché': 'Intermarché', 'Amazon Fresh': 'Amazon Fresh', 'Carrefour': 'Carrefour', 'Lidl': 'Lidl', 'Aldi': 'Aldi', 'Auchan': 'Auchan', 'Monoprix': 'Monoprix', 'Autre': 'Autre' };
const CATEGORY_ORDER = ['Fruits & légumes', 'Viandes & poissons', 'Produits laitiers & œufs', 'Épicerie', 'Boulangerie', 'Surgelés'];
const CATEGORY_ICONS = { 'Fruits & légumes': 'leaf', 'Viandes & poissons': 'fish', 'Produits laitiers & œufs': 'dairy', 'Épicerie': 'basket', 'Boulangerie': 'bread', 'Surgelés': 'snow' };
const EQUIPMENT_LABEL = Object.fromEntries(EQUIPMENT.map(item => [item.id, item.label]));
const SLOT_LABEL = { breakfast: 'Petit-déjeuner', lunch: 'Déjeuner', dinner: 'Dîner' };

const INGREDIENTS = {
  oats: { name: 'Flocons d’avoine', unit: 'g', price: .00225, category: 'Épicerie', allergens: ['gluten'] },
  greekYogurt: { name: 'Yaourt grec nature', unit: 'g', price: .0041, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  banana: { name: 'Bananes', unit: 'piece', price: .27, category: 'Fruits & légumes' },
  apple: { name: 'Pommes', unit: 'piece', price: .39, category: 'Fruits & légumes' },
  milk: { name: 'Lait demi-écrémé', unit: 'ml', price: .00125, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  soyMilk: { name: 'Boisson au soja', unit: 'ml', price: .00165, category: 'Produits laitiers & œufs', allergens: ['soja'] },
  soyYogurt: { name: 'Yaourt au soja', unit: 'g', price: .0048, category: 'Produits laitiers & œufs', allergens: ['soja'] },
  peanutButter: { name: 'Beurre de cacahuète', unit: 'g', price: .0064, category: 'Épicerie', allergens: ['arachides'] },
  honey: { name: 'Miel', unit: 'g', price: .0065, category: 'Épicerie' },
  cinnamon: { name: 'Cannelle', unit: 'g', price: .022, category: 'Épicerie' },
  eggs: { name: 'Œufs plein air', unit: 'piece', price: .31, category: 'Produits laitiers & œufs', allergens: ['œufs'] },
  bread: { name: 'Pain complet', unit: 'g', price: .0031, category: 'Boulangerie', allergens: ['gluten'] },
  spinach: { name: 'Épinards frais', unit: 'g', price: .0052, category: 'Fruits & légumes' },
  butter: { name: 'Beurre doux', unit: 'g', price: .0082, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  flour: { name: 'Farine de blé', unit: 'g', price: .00125, category: 'Épicerie', allergens: ['gluten'] },
  cottageCheese: { name: 'Fromage frais', unit: 'g', price: .0058, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  tomato: { name: 'Tomates', unit: 'g', price: .0030, category: 'Fruits & légumes' },
  oliveOil: { name: 'Huile d’olive', unit: 'ml', price: .0063, category: 'Épicerie' },
  chicken: { name: 'Poulet', unit: 'g', price: .0093, category: 'Viandes & poissons' },
  rice: { name: 'Riz long', unit: 'g', price: .00235, category: 'Épicerie' },
  carrot: { name: 'Carottes', unit: 'g', price: .00175, category: 'Fruits & légumes' },
  broccoli: { name: 'Brocolis', unit: 'g', price: .0031, category: 'Fruits & légumes' },
  soySauce: { name: 'Sauce soja', unit: 'ml', price: .0048, category: 'Épicerie', allergens: ['soja', 'gluten'] },
  garlic: { name: 'Ail', unit: 'piece', price: .22, category: 'Fruits & légumes' },
  lentils: { name: 'Lentilles corail', unit: 'g', price: .00345, category: 'Épicerie' },
  onion: { name: 'Oignons jaunes', unit: 'g', price: .00185, category: 'Fruits & légumes' },
  passata: { name: 'Coulis de tomate', unit: 'ml', price: .00175, category: 'Épicerie' },
  coconutMilk: { name: 'Lait de coco', unit: 'ml', price: .0028, category: 'Épicerie' },
  peas: { name: 'Petits pois surgelés', unit: 'g', price: .0026, category: 'Surgelés' },
  pasta: { name: 'Pâtes', unit: 'g', price: .0018, category: 'Épicerie', allergens: ['gluten'] },
  tuna: { name: 'Thon au naturel', unit: 'piece', price: .95, category: 'Viandes & poissons', allergens: ['poisson'] },
  cheese: { name: 'Emmental râpé', unit: 'g', price: .011, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  couscous: { name: 'Semoule de couscous', unit: 'g', price: .00225, category: 'Épicerie', allergens: ['gluten'] },
  chickpeas: { name: 'Pois chiches cuits', unit: 'g', price: .0032, category: 'Épicerie' },
  cucumber: { name: 'Concombre', unit: 'g', price: .0020, category: 'Fruits & légumes' },
  lemon: { name: 'Citrons', unit: 'piece', price: .43, category: 'Fruits & légumes' },
  turkey: { name: 'Dinde hachée', unit: 'g', price: .0102, category: 'Viandes & poissons' },
  beans: { name: 'Haricots rouges', unit: 'g', price: .0031, category: 'Épicerie' },
  pepper: { name: 'Poivrons', unit: 'g', price: .0037, category: 'Fruits & légumes' },
  tofu: { name: 'Tofu nature', unit: 'g', price: .0088, category: 'Produits laitiers & œufs', allergens: ['soja'] },
  frozenVeg: { name: 'Légumes wok surgelés', unit: 'g', price: .0026, category: 'Surgelés' },
  potato: { name: 'Pommes de terre', unit: 'g', price: .00155, category: 'Fruits & légumes' },
  salad: { name: 'Salade verte', unit: 'g', price: .0038, category: 'Fruits & légumes' },
  paprika: { name: 'Paprika doux', unit: 'g', price: .025, category: 'Épicerie' },
  salmon: { name: 'Filet de saumon', unit: 'g', price: .021, category: 'Viandes & poissons', allergens: ['poisson'] },
  zucchini: { name: 'Courgettes', unit: 'g', price: .00265, category: 'Fruits & légumes' },
  cream: { name: 'Crème légère', unit: 'ml', price: .0024, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  stock: { name: 'Bouillon de légumes', unit: 'piece', price: .17, category: 'Épicerie' },
  corn: { name: 'Maïs doux', unit: 'g', price: .0029, category: 'Épicerie' },
  mushroom: { name: 'Champignons', unit: 'g', price: .0047, category: 'Fruits & légumes' },
  quinoa: { name: 'Quinoa', unit: 'g', price: .0051, category: 'Épicerie' },
  yogurtSauce: { name: 'Yaourt nature', unit: 'g', price: .0036, category: 'Produits laitiers & œufs', allergens: ['lait', 'lactose'] },
  herbs: { name: 'Herbes fraîches', unit: 'g', price: .035, category: 'Fruits & légumes' },
  garlicPowder: { name: 'Ail en poudre', unit: 'g', price: .02, category: 'Épicerie' },
};

function recipe(id, type, name, description, time, difficulty, protein, calories, tags, equipment, ingredients, steps, palette) {
  return { id, type, name, description, time, difficulty, protein, calories, tags, equipment, ingredients: ingredients.map(([ingredient, qty]) => ({ ingredient, qty })), steps, palette };
}

const RECIPES = [
  recipe('porridge-banane', 'breakfast', 'Porridge banane & cacahuète', 'Un petit-déjeuner chaud, simple et rassasiant.', 10, 'Facile', 17, 410, ['balanced', 'protein', 'vegetarian', 'lowCost'], ['pot', 'hob'], [['oats', 50], ['milk', 170], ['banana', .5], ['peanutButter', 10], ['cinnamon', 1]], ['Fais chauffer les flocons avec le lait à feu doux pendant 5 à 6 minutes.', 'Ajoute la banane en rondelles et le beurre de cacahuète.', 'Termine avec une pointe de cannelle.'], ['#eee4d0', '#c48b58', '#73916b', '#edc66e']),
  recipe('yaourt-pomme', 'breakfast', 'Bol de yaourt, pomme & avoine', 'Un bol frais avec des fruits et une touche de miel.', 5, 'Très facile', 15, 355, ['balanced', 'vegetarian', 'lowCost'], [], [['greekYogurt', 145], ['oats', 30], ['apple', .5], ['honey', 5], ['cinnamon', .5]], ['Verse le yaourt dans un bol.', 'Ajoute la pomme coupée, les flocons d’avoine et le miel.', 'Saupoudre légèrement de cannelle.'], ['#f1e8d8', '#f0c979', '#89a776', '#dd9863']),
  recipe('tartine-oeuf', 'breakfast', 'Tartine complète & œuf', 'Une tartine nourrissante, avec épinards et œuf mollet.', 12, 'Facile', 19, 390, ['balanced', 'protein', 'vegetarian'], ['hob', 'pan'], [['eggs', 1.5], ['bread', 70], ['spinach', 25], ['butter', 3]], ['Fais cuire les œufs 6 à 7 minutes dans l’eau frémissante.', 'Fais tomber les épinards dans une poêle avec une noisette de beurre.', 'Sers sur le pain complet, avec l’œuf coupé en deux.'], ['#e8dfcf', '#dbad67', '#779776', '#f4d783']),
  recipe('overnight-oats', 'breakfast', 'Overnight oats à la pomme', 'À préparer la veille pour un réveil sans effort.', 5, 'Très facile', 12, 340, ['balanced', 'vegetarian', 'lowCost', 'quick'], [], [['oats', 45], ['milk', 150], ['apple', .5], ['greekYogurt', 45], ['cinnamon', .5]], ['Mélange les flocons, le lait et le yaourt dans un bocal.', 'Ajoute la pomme en petits dés et une pincée de cannelle.', 'Laisse reposer une nuit au réfrigérateur.'], ['#efe6d8', '#d69762', '#8a9a70', '#ead18a']),
  recipe('smoothie-banane', 'breakfast', 'Smoothie banane & avoine', 'Un smoothie doux, prêt en quelques minutes.', 5, 'Très facile', 13, 365, ['balanced', 'vegetarian', 'lowCost', 'quick'], ['blender'], [['milk', 200], ['banana', 1], ['oats', 25], ['peanutButter', 8]], ['Verse le lait dans le blender.', 'Ajoute la banane, les flocons et le beurre de cacahuète.', 'Mixe jusqu’à obtenir une texture lisse.'], ['#eee5d2', '#d4a85f', '#88a06e', '#e4ca8b']),
  recipe('pancakes-maison', 'breakfast', 'Pancakes maison & banane', 'Des pancakes moelleux avec des ingrédients du placard.', 20, 'Facile', 14, 420, ['balanced', 'vegetarian', 'lowCost'], ['hob', 'pan'], [['flour', 45], ['milk', 90], ['eggs', .5], ['banana', .5], ['butter', 3]], ['Mélange la farine, le lait et l’œuf jusqu’à obtenir une pâte lisse.', 'Fais cuire de petits pancakes dans une poêle légèrement beurrée.', 'Sers avec la banane en rondelles.'], ['#efe5d6', '#cb945f', '#82996f', '#f0cf7d']),
  recipe('tartine-frais', 'breakfast', 'Tartine fraîche au fromage blanc', 'Une tartine fraîche, tomate et herbes du jardin.', 8, 'Très facile', 13, 325, ['balanced', 'vegetarian', 'quick'], ['toaster'], [['bread', 75], ['cottageCheese', 70], ['tomato', 70], ['herbs', 2], ['oliveOil', 3]], ['Fais griller le pain complet.', 'Étale le fromage frais, puis ajoute la tomate coupée.', 'Ajoute quelques herbes et un filet d’huile d’olive.'], ['#ece5d8', '#d87758', '#7d9c76', '#f0cc7d']),
  recipe('porridge-vegetal', 'breakfast', 'Porridge végétal à la banane', 'Une version végétale, douce et nourrissante.', 10, 'Facile', 15, 390, ['balanced', 'protein', 'vegetarian', 'vegan', 'lowCost'], ['pot', 'hob'], [['oats', 45], ['soyMilk', 170], ['banana', .5], ['peanutButter', 8], ['cinnamon', 1]], ['Fais chauffer les flocons avec la boisson au soja à feu doux.', 'Mélange pendant 5 à 6 minutes jusqu’à obtenir une texture crémeuse.', 'Ajoute la banane, le beurre de cacahuète et la cannelle.'], ['#eee4d0', '#c58c59', '#78986f', '#ebc977']),
  recipe('bol-soja-fruits', 'breakfast', 'Bol de soja aux fruits', 'Un bol sans cuisson, végétal et naturellement sans gluten.', 5, 'Très facile', 11, 310, ['balanced', 'vegetarian', 'vegan', 'lowCost', 'quick'], [], [['soyYogurt', 150], ['apple', .5], ['banana', .35], ['honey', 3], ['cinnamon', .4]], ['Verse le yaourt au soja dans un bol.', 'Coupe les fruits en morceaux et ajoute-les.', 'Termine avec un peu de miel ou de sirop et une pointe de cannelle.'], ['#f0e8d9', '#d69a62', '#809c74', '#e8c774']),
  recipe('bol-yaourt-fruits', 'breakfast', 'Yaourt, pomme & banane', 'Un petit-déjeuner frais et simple, sans préparation.', 4, 'Très facile', 12, 305, ['balanced', 'vegetarian', 'quick', 'lowCost'], [], [['greekYogurt', 145], ['apple', .5], ['banana', .35], ['honey', 4]], ['Verse le yaourt nature dans un bol.', 'Ajoute la pomme et la banane coupées en morceaux.', 'Ajoute un léger filet de miel.'], ['#f0e8d9', '#d69b61', '#829b73', '#e9cb83']),

  recipe('poulet-riz', 'lunch', 'Poulet sauté, riz & brocoli', 'Un plat complet et généreux, relevé d’une sauce légère.', 30, 'Facile', 34, 560, ['balanced', 'protein', 'vegetables'], ['hob', 'pan'], [['chicken', 115], ['rice', 70], ['broccoli', 75], ['carrot', 45], ['onion', 20], ['soySauce', 8], ['garlic', .15], ['oliveOil', 4]], ['Fais cuire le riz dans une casserole d’eau salée.', 'Fais dorer le poulet émincé dans une poêle avec l’huile et l’ail.', 'Ajoute carotte et brocoli, puis la sauce soja. Fais sauter 7 à 8 minutes.', 'Sers avec le riz chaud.'], ['#eee6d8', '#ce965c', '#77986f', '#ebc975']),
  recipe('curry-lentilles', 'lunch', 'Curry doux de lentilles corail', 'Des lentilles fondantes au lait de coco, avec du riz.', 28, 'Facile', 22, 520, ['balanced', 'protein', 'vegetarian', 'vegan', 'lowCost', 'vegetables'], ['hob', 'pot'], [['lentils', 75], ['rice', 55], ['onion', 30], ['passata', 90], ['coconutMilk', 45], ['spinach', 25], ['garlic', .15], ['paprika', 1]], ['Fais revenir l’oignon et l’ail dans une casserole.', 'Ajoute les lentilles, le coulis, le lait de coco et un verre d’eau.', 'Laisse mijoter 18 minutes. Ajoute les épinards en fin de cuisson.', 'Sers avec le riz.'], ['#efe6d7', '#c8824d', '#83986c', '#e5bd70']),
  recipe('pates-thon', 'lunch', 'Pâtes au thon & tomate', 'Un classique rapide avec une sauce tomate maison.', 20, 'Très facile', 28, 540, ['balanced', 'protein', 'lowCost', 'quick'], ['hob', 'pot'], [['pasta', 85], ['tuna', .45], ['passata', 90], ['onion', 22], ['cheese', 8], ['oliveOil', 3]], ['Fais cuire les pâtes dans une grande casserole.', 'Fais revenir l’oignon avec un filet d’huile puis ajoute le coulis.', 'Incorpore le thon égoutté et laisse mijoter 5 minutes.', 'Mélange avec les pâtes et ajoute un peu d’emmental.'], ['#f0e4d4', '#c95f45', '#78956e', '#e7bd73']),
  recipe('couscous-pois-chiches', 'lunch', 'Couscous aux pois chiches & concombre', 'Une assiette fraîche et rassasiante, prête en 15 minutes.', 15, 'Très facile', 19, 495, ['balanced', 'vegetarian', 'vegan', 'lowCost', 'quick', 'vegetables'], [], [['couscous', 65], ['chickpeas', 90], ['cucumber', 65], ['tomato', 65], ['lemon', .15], ['oliveOil', 4], ['herbs', 2]], ['Verse de l’eau bouillante sur la semoule et couvre 5 minutes.', 'Rince et égoutte les pois chiches. Coupe concombre et tomate.', 'Aère la semoule puis mélange le tout avec citron, huile et herbes.'], ['#eee4d1', '#d2a75e', '#7f9b70', '#d87957']),
  recipe('chili-dinde', 'lunch', 'Chili doux de dinde & riz', 'Un chili doux et protéiné, cuisiné en une seule cocotte.', 30, 'Facile', 32, 575, ['balanced', 'protein', 'lowCost', 'vegetables'], ['hob', 'cocotte'], [['turkey', 85], ['beans', 75], ['rice', 55], ['passata', 100], ['onion', 25], ['pepper', 45], ['paprika', 1.5]], ['Fais cuire le riz à part.', 'Fais revenir l’oignon et la dinde dans une cocotte.', 'Ajoute le poivron, les haricots, le coulis et le paprika.', 'Laisse mijoter 15 minutes puis sers avec le riz.'], ['#eee5d5', '#c46f4d', '#76956d', '#dfb95f']),
  recipe('tofu-wok', 'lunch', 'Wok de tofu & légumes croquants', 'Un wok coloré, rapide et riche en protéines végétales.', 25, 'Facile', 25, 510, ['balanced', 'protein', 'vegetarian', 'vegan', 'vegetables'], ['hob', 'pan'], [['tofu', 100], ['rice', 65], ['frozenVeg', 110], ['soySauce', 10], ['garlic', .15], ['oliveOil', 4]], ['Fais cuire le riz.', 'Fais dorer le tofu en cubes dans une poêle chaude.', 'Ajoute les légumes surgelés, l’ail et la sauce soja.', 'Fais sauter 8 minutes et sers avec le riz.'], ['#ece5d6', '#d2a060', '#829c70', '#d8895e']),
  recipe('omelette-pommes-terre', 'lunch', 'Omelette pommes de terre & salade', 'Une omelette familiale, accompagnée de salade verte.', 25, 'Facile', 21, 525, ['balanced', 'protein', 'vegetarian', 'lowCost'], ['hob', 'pan'], [['eggs', 2], ['potato', 140], ['salad', 45], ['onion', 20], ['cheese', 7], ['oliveOil', 4]], ['Coupe les pommes de terre en petits dés et fais-les dorer à la poêle.', 'Bats les œufs avec un peu de sel et verse-les sur les pommes de terre.', 'Ajoute l’emmental, cuis à feu doux puis accompagne de salade.'], ['#eee5d5', '#d8ad64', '#79976e', '#e7cf88']),
  recipe('salade-thon-pois', 'lunch', 'Salade de pois chiches & thon', 'Une salade complète à assembler sans cuisson.', 12, 'Très facile', 27, 475, ['balanced', 'protein', 'quick', 'vegetables'], [], [['chickpeas', 100], ['tuna', .4], ['cucumber', 60], ['tomato', 65], ['lemon', .12], ['oliveOil', 4], ['herbs', 2]], ['Égoutte les pois chiches et le thon.', 'Coupe le concombre et les tomates en dés.', 'Mélange avec le jus de citron, l’huile d’olive et les herbes.'], ['#eee7d8', '#d3a05d', '#81a073', '#d87353']),
  recipe('salade-pois-chiches', 'lunch', 'Salade fraîche aux pois chiches', 'Une assiette végétale sans cuisson, avec citron et herbes.', 10, 'Très facile', 16, 410, ['balanced', 'protein', 'vegetarian', 'vegan', 'lowCost', 'quick', 'vegetables'], [], [['chickpeas', 120], ['cucumber', 75], ['tomato', 80], ['lemon', .18], ['oliveOil', 4], ['herbs', 2]], ['Égoutte et rince les pois chiches.', 'Coupe le concombre et la tomate en dés.', 'Mélange avec le jus de citron, l’huile d’olive et les herbes fraîches.'], ['#eee7d8', '#d2a15f', '#819d75', '#d77554']),
  recipe('wrap-poulet', 'lunch', 'Wraps de poulet & crudités', 'Des wraps faciles à emporter, garnis de poulet et de crudités.', 22, 'Facile', 29, 545, ['balanced', 'protein', 'quick', 'vegetables'], ['hob', 'pan'], [['chicken', 90], ['bread', 75], ['cucumber', 45], ['tomato', 50], ['yogurtSauce', 25], ['salad', 25]], ['Fais dorer le poulet émincé dans une poêle.', 'Mélange le yaourt avec les herbes et un peu de citron.', 'Garnis le pain avec salade, concombre, tomate, poulet et sauce.'], ['#eee5d7', '#c98754', '#7e9a74', '#e5c071']),

  recipe('shakshuka', 'dinner', 'Shakshuka douce & pain complet', 'Des œufs mijotés dans une sauce tomate et poivron.', 25, 'Facile', 22, 480, ['balanced', 'protein', 'vegetarian', 'lowCost', 'vegetables'], ['hob', 'pan'], [['eggs', 1.5], ['passata', 110], ['pepper', 55], ['onion', 25], ['bread', 35], ['oliveOil', 3], ['paprika', 1]], ['Fais revenir l’oignon et le poivron dans une poêle avec l’huile.', 'Ajoute le coulis et le paprika, puis laisse mijoter 10 minutes.', 'Casse les œufs dans la sauce et couvre jusqu’à ce qu’ils soient cuits.', 'Sers avec du pain complet.'], ['#eee3d2', '#ce7650', '#79976e', '#e3c270']),
  recipe('poulet-four', 'dinner', 'Poulet rôti & légumes au four', 'Un plat complet au four, pratique à préparer à l’avance.', 40, 'Facile', 32, 570, ['balanced', 'protein', 'vegetables'], ['oven'], [['chicken', 105], ['potato', 150], ['carrot', 65], ['onion', 25], ['oliveOil', 5], ['paprika', 1]], ['Préchauffe le four à 200 °C.', 'Coupe les légumes en morceaux et dépose-les dans un plat.', 'Ajoute le poulet, l’huile, le paprika et un peu de sel.', 'Enfourne 35 à 40 minutes, jusqu’à ce que le poulet soit bien cuit.'], ['#eee5d8', '#c98759', '#80986d', '#e4bf69']),
  recipe('saumon-four', 'dinner', 'Saumon au four & courgettes', 'Un dîner riche en oméga-3, avec des légumes rôtis.', 30, 'Facile', 31, 565, ['balanced', 'protein', 'vegetables'], ['oven'], [['salmon', 95], ['potato', 100], ['zucchini', 100], ['lemon', .12], ['oliveOil', 4]], ['Préchauffe le four à 200 °C.', 'Dispose les pommes de terre et les courgettes en tranches dans un plat.', 'Ajoute le saumon, le citron et un filet d’huile.', 'Enfourne 20 à 23 minutes.'], ['#eee7dc', '#c98561', '#829873', '#e8c778']),
  recipe('pates-courgette', 'dinner', 'Pâtes crémeuses aux courgettes', 'Des pâtes fondantes, relevées d’ail et d’un peu de fromage.', 22, 'Facile', 18, 520, ['balanced', 'vegetarian', 'lowCost', 'quick', 'vegetables'], ['hob', 'pot', 'pan'], [['pasta', 85], ['zucchini', 100], ['cream', 25], ['cheese', 10], ['garlic', .12], ['oliveOil', 3]], ['Fais cuire les pâtes dans une casserole.', 'Fais revenir les courgettes en demi-rondelles avec l’ail.', 'Ajoute la crème, un peu d’eau de cuisson et l’emmental.', 'Mélange avec les pâtes et poivre avant de servir.'], ['#eee7d9', '#d5a763', '#8ca274', '#f1d38c']),
  recipe('soupe-lentilles', 'dinner', 'Soupe de lentilles & carottes', 'Une soupe réconfortante, économique et facile à congeler.', 35, 'Facile', 20, 460, ['balanced', 'protein', 'vegetarian', 'vegan', 'lowCost', 'vegetables'], ['hob', 'pot'], [['lentils', 65], ['carrot', 80], ['potato', 60], ['onion', 25], ['stock', .25], ['oliveOil', 3], ['bread', 25]], ['Fais revenir l’oignon dans une grande casserole.', 'Ajoute carottes, pommes de terre, lentilles, bouillon et 500 ml d’eau.', 'Laisse mijoter 25 minutes puis mixe si tu le souhaites.', 'Sers avec une tranche de pain complet.'], ['#eee5d7', '#c57e4e', '#82976d', '#e2bd74']),
  recipe('salade-soir', 'dinner', 'Salade du soir pois chiches & crudités', 'Une salade complète à assembler en quelques minutes, sans cuisson.', 10, 'Très facile', 15, 405, ['balanced', 'protein', 'vegetarian', 'vegan', 'lowCost', 'quick', 'vegetables'], [], [['chickpeas', 105], ['cucumber', 60], ['tomato', 65], ['salad', 30], ['lemon', .12], ['oliveOil', 4], ['herbs', 2]], ['Rince et égoutte les pois chiches.', 'Coupe les crudités puis dispose-les avec la salade.', 'Assaisonne avec citron, huile d’olive et herbes fraîches.'], ['#eee7d8', '#d3a05d', '#82a073', '#db7755']),
  recipe('chili-vegetarien', 'dinner', 'Chili végétarien aux haricots', 'Un chili doux et généreux, parfait avec un peu de riz.', 28, 'Facile', 19, 505, ['balanced', 'protein', 'vegetarian', 'vegan', 'lowCost', 'vegetables'], ['hob', 'pot'], [['beans', 95], ['corn', 45], ['passata', 90], ['pepper', 40], ['onion', 25], ['rice', 45], ['paprika', 1]], ['Fais cuire le riz.', 'Fais revenir l’oignon et le poivron dans une casserole.', 'Ajoute haricots, maïs, coulis et paprika.', 'Laisse mijoter 15 minutes et sers avec le riz.'], ['#eee4d5', '#c7774e', '#7d976c', '#dfbc71']),
  recipe('salade-quinoa', 'dinner', 'Salade tiède de quinoa & légumes', 'Une assiette végétale équilibrée, à servir tiède ou froide.', 25, 'Facile', 18, 500, ['balanced', 'vegetarian', 'vegan', 'vegetables'], ['hob', 'pot'], [['quinoa', 55], ['chickpeas', 65], ['cucumber', 40], ['tomato', 55], ['lemon', .1], ['oliveOil', 4], ['herbs', 2]], ['Rince le quinoa puis fais-le cuire 12 minutes.', 'Égoutte les pois chiches et coupe les légumes.', 'Mélange le tout avec le jus de citron, l’huile et les herbes.'], ['#ede6d9', '#d1a664', '#809c73', '#d97c59']),
  recipe('pommes-terre-farcies', 'dinner', 'Pommes de terre farcies au fromage frais', 'Des pommes de terre fondantes, accompagnées de salade.', 35, 'Facile', 17, 510, ['balanced', 'vegetarian', 'lowCost'], ['oven'], [['potato', 190], ['cottageCheese', 50], ['cheese', 8], ['salad', 45], ['herbs', 2], ['oliveOil', 2]], ['Préchauffe le four à 200 °C.', 'Pique les pommes de terre et fais-les cuire 30 minutes.', 'Ouvre-les puis garnis de fromage frais et d’herbes.', 'Sers avec la salade assaisonnée.'], ['#eee6d7', '#d7ad68', '#7b9a74', '#f0d18b']),
  recipe('risotto-champignons', 'dinner', 'Risotto aux champignons', 'Un risotto crémeux, tout simple avec des champignons frais.', 32, 'Intermédiaire', 16, 545, ['balanced', 'vegetarian', 'vegetables'], ['hob', 'pot'], [['rice', 75], ['mushroom', 90], ['onion', 25], ['cream', 18], ['cheese', 12], ['stock', .3], ['oliveOil', 3]], ['Fais revenir l’oignon et les champignons dans une casserole.', 'Ajoute le riz et mélange une minute.', 'Verse le bouillon petit à petit, en remuant, pendant 18 minutes.', 'Ajoute la crème et l’emmental avant de servir.'], ['#eee6d9', '#c68b5f', '#829970', '#e5c67f']),
  recipe('poelee-legumes-oeufs', 'dinner', 'Poêlée de légumes & œufs', 'Une poêlée colorée et économique, prête en moins de 25 minutes.', 23, 'Très facile', 19, 440, ['balanced', 'protein', 'vegetarian', 'lowCost', 'quick', 'vegetables'], ['hob', 'pan'], [['eggs', 1.5], ['potato', 100], ['carrot', 50], ['spinach', 20], ['onion', 20], ['oliveOil', 3]], ['Coupe les pommes de terre et les carottes en petits dés.', 'Fais-les revenir avec l’oignon dans une poêle couverte.', 'Ajoute les épinards puis les œufs battus.', 'Cuis à feu doux jusqu’à ce que les œufs soient pris.'], ['#eee6d7', '#d0a15f', '#80a075', '#e8c977']),
 ];

const RECIPE_IMAGES = {
  'porridge-banane': './images/breakfast-porridge.jpg',
  'yaourt-pomme': './images/breakfast-yogurt.jpg',
  'tartine-oeuf': './images/breakfast-eggs.jpg',
  'overnight-oats': './images/breakfast-yogurt.jpg',
  'smoothie-banane': './images/breakfast-smoothie.jpg',
  'pancakes-maison': './images/breakfast-pancakes.jpg',
  'tartine-frais': './images/breakfast-eggs.jpg',
  'porridge-vegetal': './images/breakfast-porridge.jpg',
  'bol-soja-fruits': './images/breakfast-yogurt.jpg',
  'bol-yaourt-fruits': './images/breakfast-yogurt.jpg',
  'poulet-riz': './images/lunch-chicken-rice.jpg',
  'curry-lentilles': './images/lunch-lentil-curry.jpg',
  'pates-thon': './images/lunch-tuna-pasta.jpg',
  'couscous-pois-chiches': './images/lunch-chickpea-salad.jpg',
  'chili-dinde': './images/lunch-chili.jpg',
  'tofu-wok': './images/lunch-tofu-wok.jpg',
  'omelette-pommes-terre': './images/lunch-omelette-potato.jpg',
  'salade-thon-pois': './images/lunch-chickpea-salad.jpg',
  'salade-pois-chiches': './images/lunch-chickpea-salad.jpg',
  'wrap-poulet': './images/lunch-chicken-wrap.jpg',
  'shakshuka': './images/dinner-shakshuka.jpg',
  'poulet-four': './images/dinner-roast-chicken.jpg',
  'saumon-four': './images/dinner-salmon-zucchini.jpg',
  'pates-courgette': './images/dinner-zucchini-pasta.jpg',
  'soupe-lentilles': './images/dinner-lentil-soup.jpg',
  'salade-soir': './images/lunch-chickpea-salad.jpg',
  'chili-vegetarien': './images/dinner-vegetarian-chili.jpg',
  'salade-quinoa': './images/lunch-chickpea-salad.jpg',
  'pommes-terre-farcies': './images/lunch-omelette-potato.jpg',
  'risotto-champignons': './images/dinner-mushroom-risotto.jpg',
  'poelee-legumes-oeufs': './images/lunch-omelette-potato.jpg',
};
RECIPES.forEach(item => { if (RECIPE_IMAGES[item.id]) item.imageUrl = RECIPE_IMAGES[item.id]; });

const EQUIPMENT_OPTIONS = EQUIPMENT;
const PANTRY_OPTIONS = [
  { id: 'rice', qty: 700 }, { id: 'pasta', qty: 500 }, { id: 'oats', qty: 400 }, { id: 'oliveOil', qty: 300 },
  { id: 'eggs', qty: 6 }, { id: 'flour', qty: 400 }, { id: 'lentils', qty: 250 }, { id: 'chickpeas', qty: 200 },
  { id: 'beans', qty: 200 }, { id: 'passata', qty: 250 }, { id: 'garlic', qty: 3 }, { id: 'spices', qty: 25 },
  { id: 'salt', qty: 100 }, { id: 'honey', qty: 100 }, { id: 'couscous', qty: 300 }, { id: 'stock', qty: 2 },
];
const PANTRY_NAMES = { spices: 'Épices variées', salt: 'Sel', oliveOil: 'Huile d’olive' };
const PANTRY_PRICE = { spices: .03, salt: .001 };
const PANTRY_UNIT = { spices: 'g', salt: 'g' };
const DEFAULT_PANTRY = { rice: 500, pasta: 350, oats: 250, oliveOil: 150, garlic: 2, spices: 20, salt: 50 };

function defaultProfile() {
  return {
    name: 'Marie', adults: 2, children: 2, childAges: '6 et 9 ans', individualProfiles: false, profileNotes: '',
    budget: 100, budgetMode: 'strict', includeBreakfast: false,
    equipment: ['oven', 'hob', 'microwave', 'pan', 'pot'], ignoreEquipment: false,
    goals: ['balanced', 'protein'], otherGoal: '',
    likes: '', dislikes: '', allergies: '', excluded: '', diet: 'omnivore', cookingTime: 30, skill: 'beginner',
    stores: ['Carrefour'],
  };
}
function totalPeople(profile) { return Math.max(1, Number(profile.adults || 0) + Number(profile.children || 0)); }
function currentWeekDates() {
  const today = new Date();
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  monday.setHours(12, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d; });
}
function dayName(date, short = false) {
  return new Intl.DateTimeFormat('fr-FR', { weekday: short ? 'short' : 'long' }).format(date).replace('.', '');
}
function capitalize(value = '') { return value.charAt(0).toLocaleUpperCase('fr-FR') + value.slice(1); }
function dateShort(date) { return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' }).format(date).replace('.', ''); }
function weekRangeLabel() {
  const dates = currentWeekDates(); const a = dates[0], b = dates[6];
  const mA = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(a).replace('.', '');
  const mB = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(b).replace('.', '');
  const yA = a.getFullYear(), yB = b.getFullYear();
  if (mA === mB && yA === yB) return `Semaine du ${a.getDate()} au ${b.getDate()} ${mB} ${yB}`;
  return `Semaine du ${a.getDate()} ${mA} au ${b.getDate()} ${mB} ${yB}`;
}
function todayIndex() { return (new Date().getDay() + 6) % 7; }
function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function defaultWeekAttendance(profile) {
  const servings = totalPeople(profile);
  return Object.fromEntries(currentWeekDates().map(date => [dateKey(date), {
    lunch: { active: true, portions: servings },
    dinner: { active: true, portions: servings },
  }]));
}
function normalizeWeekAttendance(savedAttendance, profile) {
  const defaults = defaultWeekAttendance(profile);
  const normalized = {};
  for (const [key, defaultDay] of Object.entries(defaults)) {
    const previous = savedAttendance?.[key] || {};
    normalized[key] = {};
    for (const slot of ['lunch', 'dinner']) {
      const entry = previous[slot] || defaultDay[slot];
      normalized[key][slot] = { active: entry.active !== false, portions: Math.max(1, Math.min(12, Number(entry.portions) || totalPeople(profile))) };
    }
  }
  return normalized;
}
function getRecipe(id) { return RECIPES.find(item => item.id === id) || RECIPES[0]; }
function getRecipeTypeLabel(type) { return SLOT_LABEL[type] || 'Repas'; }

function formatShoppingQty(qty, unit) {
  if (unit === 'g') {
    const rounded = Math.ceil(qty / 10) * 10;
    if (rounded >= 1000) return `${prettyNumber(rounded / 1000, 1)} kg`;
    return `${rounded} g`;
  }
  if (unit === 'ml') {
    const rounded = Math.ceil(qty / 25) * 25;
    if (rounded >= 1000) return `${prettyNumber(rounded / 1000, 1)} L`;
    return `${rounded} ml`;
  }
  if (unit === 'piece') {
    const rounded = Math.ceil(qty - 1e-6);
    return `${rounded} ${rounded === 1 ? 'pièce' : 'pièces'}`;
  }
  return `${prettyNumber(qty, 1)} ${unit}`;
}
function roundPurchaseQty(qty, unit) {
  if (unit === 'g') return Math.ceil(qty / 10) * 10;
  if (unit === 'ml') return Math.ceil(qty / 25) * 25;
  if (unit === 'piece') return Math.ceil(qty - 1e-6);
  return Math.ceil(qty * 10) / 10;
}
function formatRecipeQty(qty, unit) {
  if (unit === 'g' || unit === 'ml') {
    const n = Math.round(qty / 5) * 5;
    return `${n} ${unit}`;
  }
  if (unit === 'piece') {
    const n = Math.round(qty * 2) / 2;
    if (n % 1 === .5) return `${Math.floor(n)}½ ${Math.floor(n) === 0 ? 'pièce' : 'pièces'}`;
    return `${n} ${n === 1 ? 'pièce' : 'pièces'}`;
  }
  return `${prettyNumber(qty, 1)} ${unit}`;
}
function priceOfIngredient(id) {
  if (id === 'spices') return PANTRY_PRICE.spices;
  if (id === 'salt') return PANTRY_PRICE.salt;
  return (INGREDIENTS[id] || {}).price || 0;
}
function ingredientUnit(id) { return (INGREDIENTS[id] || {}).unit || PANTRY_UNIT[id] || 'g'; }
function ingredientName(id) { return (INGREDIENTS[id] || {}).name || PANTRY_NAMES[id] || id; }
function ingredientCategory(id) { return (INGREDIENTS[id] || {}).category || 'Épicerie'; }
function storePriceIndex(store, category) {
  return STORE_PRICE_INDEX[category]?.[store] ?? STORE_FACTOR[store] ?? 1;
}
function selectedStores(stores = []) {
  const chosen = Array.isArray(stores) ? stores.filter(store => STORES.includes(store)) : [];
  return chosen.length ? chosen : ['Carrefour'];
}
function cheapestStoreForIngredient(ingredientId, stores = []) {
  const category = ingredientCategory(ingredientId);
  return selectedStores(stores).reduce((best, store) => storePriceIndex(store, category) < storePriceIndex(best, category) ? store : best);
}
function ingredientPriceAtStore(ingredientId, store) {
  return priceOfIngredient(ingredientId) * storePriceIndex(store, ingredientCategory(ingredientId));
}
function recipeCostPerServing(item, profile = state.profile) {
  return item.ingredients.reduce((sum, part) => {
    const store = cheapestStoreForIngredient(part.ingredient, profile.stores);
    return sum + part.qty * ingredientPriceAtStore(part.ingredient, store);
  }, 0);
}
function recipeIngredientNameSearch(item) {
  return `${item.name} ${item.ingredients.map(x => ingredientName(x.ingredient)).join(' ')}`;
}
function formatGoalLabel(id) { return GOALS.find(goal => goal.id === id)?.label || id; }

function recipeAllowed(item, profile, { ignoreTime = false } = {}) {
  const equipment = profile.equipment || [];
  if (!profile.ignoreEquipment && item.equipment.some(id => !equipment.includes(id))) return false;
  if (!ignoreTime && Number(profile.cookingTime) && item.time > Number(profile.cookingTime) && profile.cookingTime !== 'any') return false;
  if (profile.skill === 'beginner' && item.difficulty === 'Intermédiaire') return false;
  const diet = profile.diet || 'omnivore';
  if ((diet === 'vegetarian' || (profile.goals || []).includes('vegetarian')) && !item.tags.includes('vegetarian')) return false;
  if (diet === 'vegan' && !item.tags.includes('vegan')) return false;
  if (diet === 'gluten-free' && item.ingredients.some(part => (INGREDIENTS[part.ingredient]?.allergens || []).includes('gluten'))) return false;
  if (diet === 'dairy-free' && item.ingredients.some(part => (INGREDIENTS[part.ingredient]?.allergens || []).some(a => ['lait', 'lactose'].includes(a)))) return false;
  const allergyTerms = splitTerms(profile.allergies);
  const excludedTerms = [...splitTerms(profile.excluded), ...allergyTerms];
  const likes = splitTerms(profile.likes);
  const searchName = normalizeText(recipeIngredientNameSearch(item));
  const allergenText = normalizeText(item.ingredients.flatMap(part => INGREDIENTS[part.ingredient]?.allergens || []).join(' '));
  const allergySynonyms = {
    arachide: ['arachide', 'cacahuete', 'peanut'], arachides: ['arachide', 'cacahuete', 'peanut'],
    lactose: ['lait', 'lactose'], lait: ['lait', 'lactose'], gluten: ['gluten'], oeuf: ['oeufs', 'oeuf'], oeufs: ['oeufs', 'oeuf'],
    poisson: ['poisson'], fruitsasec: ['noix', 'amande', 'noisette'], soja: ['soja'],
  };
  for (const term of excludedTerms) {
    const synonyms = allergySynonyms[term.replace(/\s/g, '')] || [term];
    if (synonyms.some(synonym => searchName.includes(synonym) || allergenText.includes(synonym))) return false;
  }
  // The likes are intentionally a ranking boost rather than a hard filter.
  item._liked = likes.some(term => searchName.includes(term));
  return true;
}
function preferenceScore(item, profile, usedRecipes, ingredientUse, seed) {
  let score = 0;
  const goals = profile.goals || [];
  const cost = recipeCostPerServing(item, profile);
  if (goals.includes('balanced') || goals.includes('wellbeing')) score += item.tags.includes('balanced') ? .45 : 0;
  if (goals.includes('protein') || goals.includes('muscle')) score += item.protein >= 25 ? .85 : item.protein >= 18 ? .38 : 0;
  if (goals.includes('weight')) score += item.calories <= 500 ? .35 : 0;
  if (goals.includes('vegetables')) score += item.tags.includes('vegetables') ? .7 : 0;
  if (goals.includes('vegetarian')) score += item.tags.includes('vegetarian') ? .7 : 0;
  if (goals.includes('time')) score += item.time <= 20 ? .65 : item.time <= 30 ? .2 : -.25;
  if (goals.includes('save')) score -= cost * .7;
  if (goals.includes('waste')) score += item.ingredients.reduce((total, part) => total + (ingredientUse[part.ingredient] ? .19 : 0), 0);
  if (item._liked) score += .9;
  if (goals.includes('save') || profile.budgetMode === 'strict') score -= cost * (goals.includes('save') ? .24 : .12);
  const used = usedRecipes[item.id] || 0;
  score -= used * 3.1;
  const pantryCount = item.ingredients.reduce((total, part) => total + ((state?.pantry?.[part.ingredient] || 0) > 0 ? .12 : 0), 0);
  score += pantryCount;
  const hash = Array.from(`${seed}-${item.id}`).reduce((total, char) => ((total * 31) + char.charCodeAt(0)) >>> 0, 7);
  score += (hash % 1000) / 1000 * .34;
  return score;
}
function eligibleRecipes(type, profile, { ignoreTime = false } = {}) {
  const matches = RECIPES.filter(item => item.type === type && recipeAllowed(item, profile, { ignoreTime }));
  if (!matches.length && !ignoreTime) return eligibleRecipes(type, profile, { ignoreTime: true });
  return matches;
}
function makePlan(profile, generation = 1, attendance = null) {
  const dates = currentWeekDates();
  const slots = profile.includeBreakfast ? ['breakfast', 'lunch', 'dinner'] : ['lunch', 'dinner'];
  const attendanceMap = attendance || state?.weekAttendance || defaultWeekAttendance(profile);
  const usedRecipes = Object.create(null);
  const ingredientUse = Object.create(null);
  const plan = dates.map((date, index) => ({ date: dateKey(date), label: capitalize(dayName(date)), shortDate: dateShort(date), meals: [], index }));
  let slotIndex = 0;
  for (let dayIndex = 0; dayIndex < plan.length; dayIndex++) {
    for (const type of slots) {
      const entry = type === 'breakfast' ? { active: true, portions: totalPeople(profile) } : (attendanceMap[plan[dayIndex].date]?.[type] || { active: true, portions: totalPeople(profile) });
      if (!entry.active) continue;
      const portions = Math.max(1, Math.min(12, Number(entry.portions) || totalPeople(profile)));
      const candidates = eligibleRecipes(type, profile);
      if (!candidates.length) continue;
      candidates.sort((a, b) => preferenceScore(b, profile, usedRecipes, ingredientUse, `${generation}-${dayIndex}-${slotIndex}`) - preferenceScore(a, profile, usedRecipes, ingredientUse, `${generation}-${dayIndex}-${slotIndex}`));
      const selected = candidates[0];
      usedRecipes[selected.id] = (usedRecipes[selected.id] || 0) + 1;
      selected.ingredients.forEach(part => { ingredientUse[part.ingredient] = (ingredientUse[part.ingredient] || 0) + 1; });
      plan[dayIndex].meals.push({ slot: type, recipeId: selected.id, portions });
      slotIndex++;
    }
  }
  return profile.budgetMode === 'strict' ? optimizePlanToBudget(plan, profile) : plan;
}
function calculateBasket(plan = state.plan, profile = state.profile, pantry = state.pantry) {
  const requirements = Object.create(null);
  for (let dayIndex = 0; dayIndex < (plan || []).length; dayIndex++) {
    const day = plan[dayIndex];
    for (let mealIndex = 0; mealIndex < (day.meals || []).length; mealIndex++) {
      const meal = day.meals[mealIndex];
      const item = getRecipe(meal.recipeId);
      const portions = Math.max(1, Number(meal.portions || totalPeople(profile)));
      for (const part of item.ingredients) {
        const id = part.ingredient;
        if (!requirements[id]) requirements[id] = { id, total: 0, mealCount: 0, recipes: new Set(), category: ingredientCategory(id), name: ingredientName(id), unit: ingredientUnit(id) };
        requirements[id].total += part.qty * portions;
        requirements[id].mealCount++;
        requirements[id].recipes.add(item.id);
      }
    }
  }
  const items = [];
  let total = 0, pantrySavings = 0, pantryUsed = 0;
  for (const entry of Object.values(requirements)) {
    const stock = Number(pantry?.[entry.id] || 0);
    const used = Math.min(stock, entry.total);
    pantryUsed += used > 0 ? 1 : 0;
    const store = cheapestStoreForIngredient(entry.id, profile.stores);
    const unitPrice = ingredientPriceAtStore(entry.id, store);
    pantrySavings += used * unitPrice;
    const needed = Math.max(0, entry.total - stock);
    if (needed <= .001) continue;
    const purchaseQty = roundPurchaseQty(needed, entry.unit);
    const price = round2(purchaseQty * unitPrice);
    total += price;
    items.push({ ...entry, needed, purchaseQty, unitPrice, price, store, shared: entry.recipes.size > 1, recipesCount: entry.recipes.size });
  }
  items.sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.name.localeCompare(b.name, 'fr'));
  const sharedIngredients = Object.values(requirements).filter(item => item.recipes.size > 1).length;
  const mealCount = (plan || []).reduce((sum, day) => sum + (day.meals || []).length, 0);
  const checkedCount = items.filter(item => state?.checkedItems?.[item.id]).length;
  return { items, total: round2(total), pantrySavings: round2(pantrySavings), pantryUsed, sharedIngredients, mealCount, checkedCount, requirements };
}
function clonePlan(plan) { return (plan || []).map(day => ({ ...day, meals: (day.meals || []).map(meal => ({ ...meal })) })); }
function optimizePlanToBudget(plan, profile) {
  const result = clonePlan(plan);
  if (profile.budgetMode !== 'strict' || !Number(profile.budget)) return result;
  const budget = Number(profile.budget);
  const maxIterations = result.reduce((sum, day) => sum + day.meals.length, 0) * 2;
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const currentBasket = calculateBasket(result, profile, state?.pantry || DEFAULT_PANTRY);
    if (currentBasket.total <= budget + .005) break;
    let bestSwap = null;
    const usage = Object.create(null);
    result.forEach(day => day.meals.forEach(meal => { usage[meal.recipeId] = (usage[meal.recipeId] || 0) + 1; }));
    for (let dayIndex = 0; dayIndex < result.length; dayIndex++) {
      for (let mealIndex = 0; mealIndex < result[dayIndex].meals.length; mealIndex++) {
        const meal = result[dayIndex].meals[mealIndex];
        const current = getRecipe(meal.recipeId);
        const candidates = eligibleRecipes(meal.slot, profile).filter(candidate => candidate.id !== current.id && (usage[candidate.id] || 0) < 2);
        for (const candidate of candidates) {
          const trial = clonePlan(result);
          trial[dayIndex].meals[mealIndex].recipeId = candidate.id;
          const trialTotal = calculateBasket(trial, profile, state?.pantry || DEFAULT_PANTRY).total;
          const saving = currentBasket.total - trialTotal;
          if (saving <= .009) continue;
          const preferenceDelta = preferenceScore(candidate, profile, usage, {}, `opt${iteration}`) - preferenceScore(current, profile, usage, {}, `opt${iteration}`);
          const utility = saving + preferenceDelta * .12;
          if (!bestSwap || utility > bestSwap.utility) bestSwap = { dayIndex, mealIndex, candidate, utility, saving };
        }
      }
    }
    if (!bestSwap) break;
    result[bestSwap.dayIndex].meals[bestSwap.mealIndex].recipeId = bestSwap.candidate.id;
  }
  return result;
}

function recipeArt(itemOrId) {
  const item = typeof itemOrId === 'string' ? getRecipe(itemOrId) : itemOrId;
  let imageUrl = '';
  const candidateImage = String(item.imageUrl || '');
  if (/^\.\/images\/[a-z0-9._-]+\.jpe?g$/i.test(candidateImage)) {
    imageUrl = candidateImage;
  } else {
    try {
      const parsed = new URL(candidateImage);
      if (parsed.protocol === 'https:') imageUrl = parsed.href;
    } catch (_) {}
  }
  if (imageUrl) return `<img class="recipe-photo" src="${escapeHtml(imageUrl)}" alt="Photo de ${escapeHtml(item.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />`;
  const palette = item.palette || ['#efe6d7', '#d6a15e', '#829b75', '#e6c77a'];
  let seed = Array.from(item.id || 'food').reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 13);
  const pieces = [];
  for (let i = 0; i < 10; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const x = 89 + (seed % 104);
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const y = 51 + (seed % 70);
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const color = palette[(seed % (palette.length - 1)) + 1];
    const rx = 5 + ((seed >>> 5) % 9);
    const ry = 4 + ((seed >>> 8) % 7);
    const rotation = seed % 45 - 22;
    pieces.push(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rotation} ${x} ${y})" fill="${color}" opacity=".94"/>`);
  }
  return `<svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration de ${escapeHtml(item.name)}">
    <rect width="280" height="180" rx="20" fill="${palette[0]}"/>
    <ellipse cx="141" cy="96" rx="96" ry="68" fill="#655f50" opacity=".08"/>
    <ellipse cx="140" cy="89" rx="94" ry="65" fill="#fffdfa"/>
    <ellipse cx="140" cy="88" rx="79" ry="51" fill="#f7f3ea"/>
    <ellipse cx="140" cy="87" rx="68" ry="42" fill="${palette[0]}" opacity=".74"/>
    ${pieces.join('')}
    <circle cx="115" cy="78" r="4" fill="#fff5dd" opacity=".9"/><circle cx="164" cy="102" r="3" fill="#fff5dd" opacity=".8"/>
    <path d="M188 67c-11 5-16 13-17 22 10-2 16-7 20-16 2 9-2 18-10 23" fill="none" stroke="#6f8f69" stroke-width="3" stroke-linecap="round" opacity=".85"/>
    <circle cx="140" cy="88" r="63" fill="none" stroke="#e9e5db" stroke-width="1.4"/>
  </svg>`;
}

function buildDefaultState() {
  const profile = defaultProfile();
  const weekAttendance = defaultWeekAttendance(profile);
  const starter = {
    profile,
    plan: [],
    weekAttendance,
    pantry: clone(DEFAULT_PANTRY),
    favorites: [],
    checkedItems: {},
    collapsedCategories: [],
    generation: 1,
    hasCompletedOnboarding: false,
    page: 'home',
  };
  state = { ...starter, plan: makePlan(profile, 1, weekAttendance), onboardingOpen: true, onboardingEntry: 'initial', isGenerating: false, loadingStep: 0, modal: null };
  return state;
}
function loadState() {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (!stored) return buildDefaultState();
    const saved = JSON.parse(stored);
    const profile = { ...defaultProfile(), ...(saved.profile || {}) };
    if (profile.name === 'Camille') profile.name = 'Marie';
    delete profile.grityIntegrationChoice;
    const weekAttendance = normalizeWeekAttendance(saved.weekAttendance, profile);
    state = {
      profile,
      plan: Array.isArray(saved.plan) && saved.plan.length ? saved.plan : makePlan(profile, saved.generation || 1, weekAttendance),
      weekAttendance,
      pantry: { ...clone(DEFAULT_PANTRY), ...(saved.pantry || {}) },
      favorites: Array.isArray(saved.favorites) ? saved.favorites : [],
      checkedItems: saved.checkedItems || {},
      collapsedCategories: saved.collapsedCategories || [],
      generation: saved.generation || 1,
      hasCompletedOnboarding: saved.hasCompletedOnboarding !== false,
      page: ['home', 'week', 'groceries', 'favorites', 'profile'].includes(saved.page) ? saved.page : 'home',
      onboardingOpen: false,
      onboardingEntry: 'initial',
      isGenerating: false,
      loadingStep: 0,
      modal: null,
    };
    return state;
  } catch (error) {
    console.warn('MealPilot: état local illisible, démarrage avec la démo.', error);
    return buildDefaultState();
  }
}
function saveState() {
  if (!state) return;
  const data = {
    profile: state.profile,
    plan: state.plan,
    weekAttendance: state.weekAttendance,
    pantry: state.pantry,
    favorites: state.favorites,
    checkedItems: state.checkedItems,
    collapsedCategories: state.collapsedCategories,
    generation: state.generation,
    hasCompletedOnboarding: state.hasCompletedOnboarding,
    page: state.page,
  };
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (error) { console.warn('MealPilot: impossible de sauvegarder localement.', error); }
}

let state;
let draftProfile;
let draftAttendance;
let onboardingStep = 0;
let storeSearch = '';
let profileStoreSearch = '';
let onboardingReturnPage = 'home';
let scannerStream = null;
let scannerInterval = null;
let scannerStatus = '';
let scannerCode = '';
let loadingTimer = null;
let toastTimer = null;

function showToast(message, kind = 'success') {
  toastRoot.innerHTML = `<div class="toast ${kind === 'error' ? 'error' : ''}">${icon(kind === 'error' ? 'info' : 'checkCircle')}<span>${escapeHtml(message)}</span></div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastRoot.innerHTML = ''; }, 2800);
}
function startGeneration({ fromWizard = false } = {}) {
  if (loadingTimer) clearInterval(loadingTimer);
  state.isGenerating = true;
  state.loadingStep = 0;
  state.onboardingOpen = false;
  state.modal = null;
  if (fromWizard) {
    state.profile = clone(draftProfile);
    state.weekAttendance = normalizeWeekAttendance(draftAttendance, state.profile);
    state.generation += 1;
    state.plan = makePlan(state.profile, state.generation, state.weekAttendance);
    state.checkedItems = {};
    state.hasCompletedOnboarding = true;
  } else {
    state.generation += 1;
    state.plan = makePlan(state.profile, state.generation, state.weekAttendance);
    state.checkedItems = {};
  }
  saveState();
  render();
  const stages = 5;
  loadingTimer = setInterval(() => {
    state.loadingStep += 1;
    if (state.loadingStep >= stages) {
      clearInterval(loadingTimer); loadingTimer = null;
      state.isGenerating = false;
      state.page = 'home';
      state.hasCompletedOnboarding = true;
      saveState();
    }
    render();
  }, 510);
}
function updatePortionsToHousehold() {
  const servings = totalPeople(state.profile);
  state.plan.forEach(day => day.meals.forEach(meal => {
    meal.portions = meal.slot === 'breakfast' ? servings : Math.max(1, Number(state.weekAttendance?.[day.date]?.[meal.slot]?.portions) || servings);
  }));
}
function updateDefaultAttendanceCounts(previousSize, nextSize, attendance = state.weekAttendance) {
  for (const day of Object.values(attendance || {})) {
    for (const slot of ['lunch', 'dinner']) {
      const entry = day[slot];
      if (entry?.active && Number(entry.portions) === Number(previousSize)) entry.portions = nextSize;
    }
  }
}
function regenerateForProfileChange(field, message) {
  const replanningFields = ['goals', 'otherGoal', 'likes', 'dislikes', 'allergies', 'excluded', 'diet', 'cookingTime', 'skill', 'equipment', 'ignoreEquipment', 'includeBreakfast'];
  if (replanningFields.includes(field)) {
    state.generation += 1;
    state.plan = makePlan(state.profile, state.generation, state.weekAttendance);
  } else if (['adults', 'children'].includes(field)) {
    updatePortionsToHousehold();
  } else if (field === 'budget' || field === 'budgetMode') {
    if (state.profile.budgetMode === 'strict') {
      const before = calculateBasket().total;
      state.plan = optimizePlanToBudget(state.plan, state.profile);
      const after = calculateBasket(state.plan, state.profile, state.pantry).total;
      if (after < before - .009) message = `Menu ajusté pour se rapprocher de ${money(state.profile.budget)}.`;
    }
  }
  saveState();
  render();
  if (message) showToast(message);
}
function updateProfileField(key, value, { toast = true } = {}) {
  const previousHouseholdSize = totalPeople(state.profile);
  state.profile[key] = value;
  if (['adults', 'children'].includes(key)) updateDefaultAttendanceCounts(previousHouseholdSize, totalPeople(state.profile));
  let message = '';
  if (['goals', 'otherGoal', 'likes', 'dislikes', 'allergies', 'excluded', 'diet', 'cookingTime', 'skill', 'equipment', 'ignoreEquipment', 'includeBreakfast'].includes(key)) message = 'Semaine recalculée selon tes préférences.';
  if (['adults', 'children'].includes(key)) message = 'Portions et liste de courses mises à jour.';
  if (key === 'stores') message = 'Enseignes et prix estimés mis à jour.';
  if (key === 'budget' || key === 'budgetMode') message = 'Budget et menu actualisés.';
  regenerateForProfileChange(key, toast ? message : '');
}

const ONBOARDING_STEPS = ['Le foyer', 'Présences', 'Le budget', 'Matériel', 'Objectifs', 'Préférences', 'Magasins'];
function onboardingTop() {
  return `<header class="onboarding-top">
    <a class="brand" href="#" aria-label="MealPilot"> <span class="brand-mark">${icon('leaf')}</span><span class="brand-name">Meal<span>Pilot</span></span></a>
    <button class="button button-plain" data-action="${state.onboardingEntry === 'initial' ? 'explore-demo' : 'cancel-onboarding'}">${state.onboardingEntry === 'initial' ? 'Voir un aperçu' : 'Fermer'} ${icon('arrowRight')}</button>
  </header>`;
}
function weeklyAttendanceWizardHtml() {
  const dates = currentWeekDates();
  const rows = dates.map(date => {
    const key = dateKey(date);
    const displayDay = capitalize(dayName(date));
    const displayDate = dateShort(date);
    const cells = ['lunch', 'dinner'].map(slot => {
      const entry = draftAttendance?.[key]?.[slot] || { active: true, portions: totalPeople(draftProfile) };
      const label = slot === 'lunch' ? 'Midi' : 'Soir';
      return `<div class="attendance-cell ${entry.active ? 'active' : ''}"><button class="attendance-presence" data-action="draft-attendance-toggle" data-date="${key}" data-slot="${slot}" aria-pressed="${entry.active}"><span class="attendance-checkbox">${entry.active ? icon('check') : ''}</span><span>${label}</span></button>${entry.active ? `<div class="attendance-adjust"><button class="attendance-count-btn" data-action="draft-attendance-count" data-date="${key}" data-slot="${slot}" data-delta="-1" aria-label="Retirer une personne du repas du ${label.toLowerCase()}" ${entry.portions <= 1 ? 'disabled' : ''}>${icon('minus')}</button><span class="attendance-count-value">${entry.portions}<small>pers.</small></span><button class="attendance-count-btn" data-action="draft-attendance-count" data-date="${key}" data-slot="${slot}" data-delta="1" aria-label="Ajouter une personne au repas du ${label.toLowerCase()}" ${entry.portions >= 12 ? 'disabled' : ''}>${icon('plus')}</button></div>` : `<span class="attendance-not-planned">Pas prévu</span>`}</div>`;
    }).join('');
    return `<div class="attendance-agenda-row"><div class="attendance-day"><strong>${displayDay}</strong><span>${displayDate}</span></div>${cells}</div>`;
  }).join('');
  return `<div class="attendance-agenda-tools"><span>${icon('calendar')} ${escapeHtml(weekRangeLabel())}</span><div><button class="text-link" data-action="draft-attendance-all" data-value="on">Tout cocher</button><button class="text-link" data-action="draft-attendance-all" data-value="off">Tout décocher</button></div></div><div class="attendance-agenda"><div class="attendance-agenda-head"><span>Jour</span><span>Midi</span><span>Soir</span></div>${rows}</div><p class="segment-help">Les petits-déjeuners, s’ils sont activés, reprennent l’effectif du foyer. Tu pourras ajuster les portions d’un repas depuis sa fiche.</p>`;
}
function wizardStepContent() {
  const p = draftProfile;
  if (onboardingStep === 0) return {
    title: 'Pour combien de personnes cuisines-tu ?',
    description: 'On adaptera automatiquement les portions et les quantités de courses à ton foyer.',
    html: `<div class="wizard-counter-grid">
        ${wizardCounter('adultes', 'Adultes', p.adults, 'data-field="adults"')}
        ${wizardCounter('enfants', 'Enfants', p.children, 'data-field="children"')}
      </div>
      ${Number(p.children) > 0 ? `<div class="wizard-inline-field"><label class="field-label" for="child-ages">Âge approximatif des enfants</label><input id="child-ages" class="text-field" type="text" data-draft-field="childAges" value="${escapeHtml(p.childAges || '')}" placeholder="Ex. 6 et 9 ans" /></div>` : ''}
      <div class="household-total" style="margin-top:13px"><span>Personnes à table</span><strong>${totalPeople(p)} ${totalPeople(p) > 1 ? 'personnes' : 'personne'}</strong></div>
      <div class="toggle-row"><div class="toggle-copy"><strong>Ajouter des profils individuels</strong><span>Pour préciser les goûts ou besoins de chacun.</span></div><button class="switch ${p.individualProfiles ? 'on' : ''}" data-action="draft-individual" aria-label="Ajouter des profils"><span></span></button></div>
      ${p.individualProfiles ? `<div class="wizard-inline-field"><label class="field-label" for="profile-notes">Prénoms ou besoins particuliers</label><textarea id="profile-notes" class="textarea-field" data-draft-field="profileNotes" placeholder="Ex. Léa n’aime pas les champignons…">${escapeHtml(p.profileNotes || '')}</textarea></div>` : ''}`,
  };
  if (onboardingStep === 1) return {
    title: 'Qui sera à table cette semaine ?',
    description: 'Coche les déjeuners et dîners prévus à la maison, puis règle le nombre de personnes pour chaque repas.',
    html: weeklyAttendanceWizardHtml(),
  };
  if (onboardingStep === 2) return {
    title: 'Quel est ton budget courses ?',
    description: 'On construit le menu en essayant de rester sous ce montant, sans mauvaise surprise.',
    html: `<div class="budget-input-wrap"><span class="currency">€</span><input id="draft-budget" type="number" min="10" step="5" data-draft-field="budget" value="${escapeHtml(p.budget)}" aria-label="Budget hebdomadaire en euros" /></div>
      <div class="wizard-inline-field"><span class="field-label">Ta façon de gérer le budget</span><div class="segmented"><button class="${p.budgetMode === 'strict' ? 'selected' : ''}" data-action="draft-budget-mode" data-value="strict">Strict</button><button class="${p.budgetMode === 'flexible' ? 'selected' : ''}" data-action="draft-budget-mode" data-value="flexible">Flexible</button></div><p class="segment-help">${p.budgetMode === 'strict' ? 'Le budget devient une vraie contrainte : MealPilot privilégie les options économiques.' : 'Le menu peut dépasser légèrement le budget pour conserver davantage de variété.'}</p></div>
      <div class="household-total" style="margin-top:17px"><span>Budget hebdomadaire</span><strong>${money(Number(p.budget) || 0)}</strong></div>`,
  };
  if (onboardingStep === 3) return {
    title: 'Quel matériel as-tu en cuisine ?',
    description: 'On ne proposera que des recettes réalisables avec ce que tu as sous la main.',
    html: `<p class="wizard-section-label">Sélectionne ton matériel</p><div class="equipment-grid">${EQUIPMENT_OPTIONS.map(item => `<button class="equipment-option ${(p.equipment || []).includes(item.id) && !p.ignoreEquipment ? 'selected' : ''}" data-action="draft-equipment" data-id="${item.id}"><span class="equipment-icon">${icon(item.icon)}</span><span>${escapeHtml(item.label)}</span></button>`).join('')}</div>
      <button class="equipment-ignore ${p.ignoreEquipment ? 'selected' : ''}" data-action="draft-ignore"><span>Je ne sais pas / Je préfère ignorer</span>${p.ignoreEquipment ? icon('check') : icon('arrowRight')}</button>`,
  };
  if (onboardingStep === 4) return {
    title: 'Qu’aimerais-tu privilégier ?',
    description: 'Choisis autant d’objectifs que tu veux. On s’en servira pour composer tes repas.',
    html: `<div class="goals-grid">${GOALS.map(goal => `<button class="goal-option ${(p.goals || []).includes(goal.id) ? 'selected' : ''}" data-action="draft-goal" data-id="${goal.id}"><span class="goal-check">${icon('check')}</span><span>${escapeHtml(goal.label)}</span></button>`).join('')}</div>
      <div class="wizard-inline-field"><label class="field-label" for="other-goal">Un autre objectif ?</label><input id="other-goal" class="text-field" type="text" data-draft-field="otherGoal" value="${escapeHtml(p.otherGoal || '')}" placeholder="Ex. cuisiner davantage de saison" /></div>
      <div class="toggle-row"><div class="toggle-copy"><strong>Prévoir les petits-déjeuners</strong><span>Ajoute un repas chaque matin au planning et à la liste.</span></div><button class="switch ${p.includeBreakfast ? 'on' : ''}" data-action="draft-breakfast" aria-label="Prévoir les petits-déjeuners"><span></span></button></div>`,
  };
  if (onboardingStep === 5) return {
    title: 'Tes préférences alimentaires',
    description: 'Quelques détails pour éviter les ingrédients qui ne te conviennent pas.',
    html: `<div class="preference-fields">
      <div><label class="field-label" for="likes">J’aime (facultatif)</label><input class="text-field" id="likes" data-draft-field="likes" value="${escapeHtml(p.likes || '')}" placeholder="Ex. courgette, citron" /></div>
      <div><label class="field-label" for="dislikes">Je n’aime pas</label><input class="text-field" id="dislikes" data-draft-field="dislikes" value="${escapeHtml(p.dislikes || '')}" placeholder="Ex. champignons, coriandre" /></div>
      <div><label class="field-label" for="allergies">Allergies / intolérances</label><input class="text-field" id="allergies" data-draft-field="allergies" value="${escapeHtml(p.allergies || '')}" placeholder="Ex. arachides, lactose" /></div>
      <div><label class="field-label" for="excluded">Aliments à exclure</label><input class="text-field" id="excluded" data-draft-field="excluded" value="${escapeHtml(p.excluded || '')}" placeholder="Ex. porc, poisson" /></div>
      <div><label class="field-label" for="diet">Régime alimentaire</label><select class="select-field" id="diet" data-draft-field="diet">${dietOptions(p.diet)}</select></div>
      <div><label class="field-label" for="time-limit">Temps maximum pour cuisiner</label><select class="select-field" id="time-limit" data-draft-field="cookingTime">${timeOptions(p.cookingTime)}</select></div>
      <div class="field-full"><label class="field-label" for="skill">Niveau en cuisine</label><select class="select-field" id="skill" data-draft-field="skill">${skillOptions(p.skill)}</select></div>
      </div>`,
  };
  const visibleStores = STORES.filter(item => normalizeText(item).includes(normalizeText(storeSearch)));
  return {
    title: 'Où fais-tu tes courses ?',
    description: 'Tu peux choisir plusieurs enseignes. Les prix du prototype sont estimés et simulés.',
    html: `<label class="field-label" for="store-search">Rechercher une enseigne</label><div class="search-box"><span>${icon('search')}</span><input id="store-search" class="search-input store-search" data-search="onboarding-stores" value="${escapeHtml(storeSearch)}" placeholder="Carrefour, Lidl…" /></div>
      <div class="store-grid">${visibleStores.map(store => `<button class="store-option ${(p.stores || []).includes(store) ? 'selected' : ''}" data-action="draft-store" data-id="${escapeHtml(store)}"><span class="store-checkbox">${icon('check')}</span><span>${escapeHtml(store)}</span></button>`).join('') || '<p class="segment-help">Aucune enseigne trouvée.</p>'}</div>
      <div class="household-total" style="margin-top:15px"><span>Enseignes sélectionnées</span><strong>${(p.stores || []).length ? escapeHtml(p.stores.join(' · ')) : 'Aucune sélection'}</strong></div>
      <p class="segment-help">Tu pourras modifier tes enseignes et ajouter les aliments déjà présents chez toi dans ton profil.</p>`,
  };
}
function wizardCounter(aria, title, count, dataField) {
  const match = dataField.match(/data-field="([^"]+)"/);
  const field = match ? match[1] : '';
  const min = field === 'adults' ? 1 : 0;
  return `<div class="wizard-counter-card"><div><strong>${title}</strong><span>${field === 'adults' ? '18 ans et +' : 'Moins de 18 ans'}</span></div><div class="counter-control"><button class="counter-btn" data-action="draft-count" data-field="${field}" data-delta="-1" aria-label="Retirer un ${aria}" ${Number(count) <= min ? 'disabled' : ''}>${icon('minus')}</button><span class="counter-value">${Number(count) || 0}</span><button class="counter-btn" data-action="draft-count" data-field="${field}" data-delta="1" aria-label="Ajouter un ${aria}">${icon('plus')}</button></div></div>`;
}
function dietOptions(selected) {
  const options = [['omnivore', 'De tout'], ['vegetarian', 'Végétarien'], ['vegan', 'Végétalien'], ['gluten-free', 'Sans gluten'], ['dairy-free', 'Sans lactose']];
  return options.map(([value, label]) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${label}</option>`).join('');
}
function timeOptions(selected) {
  const options = [['15', '15 minutes'], ['30', '30 minutes'], ['45', '45 minutes'], ['any', 'Peu importe']];
  return options.map(([value, label]) => `<option value="${value}" ${String(selected) === value ? 'selected' : ''}>${label}</option>`).join('');
}
function skillOptions(selected) {
  const options = [['beginner', 'Débutant'], ['intermediate', 'Intermédiaire'], ['advanced', 'Avancé']];
  return options.map(([value, label]) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${label}</option>`).join('');
}
function renderOnboarding() {
  const details = wizardStepContent();
  const activeCount = onboardingStep + 1;
  return `<div class="onboarding-screen">${onboardingTop()}<div class="wizard-layout">
      <aside class="wizard-aside"><div class="wizard-aside-content"><div class="eyebrow">${icon('sparkles')} Une semaine à ton image</div><h2>Bien manger, sans y penser.</h2><p>Quelques réponses suffisent. MealPilot s’occupe du menu, des quantités et de la liste de courses.</p></div>
        <div class="wizard-steps">${ONBOARDING_STEPS.map((label, index) => `<div class="wizard-step ${index === onboardingStep ? 'active' : ''} ${index < onboardingStep ? 'done' : ''}"><span class="wizard-step-number">${index < onboardingStep ? icon('check') : index + 1}</span><span class="wizard-step-label">${label}</span></div>`).join('')}</div>
        <div class="wizard-aside-foot">Tes préférences restent modifiables à tout moment.</div>
      </aside>
      <main class="wizard-main">
        <div class="wizard-progress-mobile"><span>Étape ${activeCount} sur ${ONBOARDING_STEPS.length}</span><div class="progress-track"><div class="progress-fill" style="width:${activeCount / ONBOARDING_STEPS.length * 100}%"></div></div></div>
        <div class="wizard-step-kicker">Étape ${activeCount} sur ${ONBOARDING_STEPS.length} · ${ONBOARDING_STEPS[onboardingStep]}</div><h1>${details.title}</h1><p>${details.description}</p>
        <div class="wizard-form">${details.html}</div>
        <footer class="wizard-footer"><div class="wizard-footer-note">${icon('shield')} Tes données restent sur cet appareil.</div><div class="wizard-footer-actions">${onboardingStep > 0 ? `<button class="button button-plain" data-action="wizard-back">${icon('arrowLeft')} Retour</button>` : ''}<button class="button button-primary" data-action="wizard-next">${onboardingStep === ONBOARDING_STEPS.length - 1 ? 'Créer ma semaine' : 'Continuer'} ${icon('arrowRight')}</button></div></footer>
      </main>
    </div></div>`;
}

function navItems() {
  return [
    { id: 'home', label: 'Accueil', icon: 'home' },
    { id: 'week', label: 'Ma semaine', icon: 'calendar' },
    { id: 'groceries', label: 'Courses', icon: 'cart' },
    { id: 'favorites', label: 'Favoris', icon: 'star' },
    { id: 'profile', label: 'Mon profil', icon: 'user' },
  ];
}
function renderSidebar() {
  const budget = calculateBasket().total;
  return `<aside class="sidebar">
    <a class="brand" href="#" aria-label="MealPilot — accueil" data-nav="home"><span class="brand-mark">${icon('leaf')}</span><span class="brand-name">Meal<span>Pilot</span></span></a>
    <div class="sidebar-caption">Espace repas</div>
    <nav class="nav-list" aria-label="Navigation principale">${navItems().map(item => `<button class="nav-link ${state.page === item.id ? 'active' : ''}" data-nav="${item.id}" ${state.page === item.id ? 'aria-current="page"' : ''}>${icon(item.icon)}<span>${item.label}</span></button>`).join('')}</nav>
    <div class="sidebar-spacer"></div>
    <div class="sidebar-plan"><div class="sidebar-plan-top"><span>SEMAINE EN COURS</span><span class="plan-dot"></span></div><p>${money(budget)} estimés sur ${money(Number(state.profile.budget) || 0)}</p><button data-nav="groceries">Voir le panier ${icon('arrowRight', 'icon-sm')}</button></div>
    <div class="sidebar-user" data-nav="profile"><span class="avatar">${initials(state.profile.name)}</span><span class="sidebar-user-name"><strong>${escapeHtml(state.profile.name || 'Mon profil')}</strong><span>${totalPeople(state.profile)} personnes · ${(state.profile.stores || []).length || 1} magasins</span></span>${icon('chevronRight', 'icon-sm')}</div>
  </aside>`;
}
function initials(name = '') { return (String(name).trim().split(/\s+/).slice(0, 2).map(x => x[0] || '').join('') || 'MP').toUpperCase(); }
function renderTopbar() {
  return `<header class="topbar"><div class="topbar-date">${icon('calendar')}<span>${escapeHtml(weekRangeLabel())}</span></div>
    <div class="topbar-mobile-brand"><span class="brand-mark">${icon('leaf')}</span><span class="brand-name">Meal<span>Pilot</span></span></div>
    <div class="topbar-actions"><button class="button button-primary button-small" data-action="open-onboarding">${icon('settings')}<span class="desktop-only">Ajuster ma semaine</span><span class="mobile-only">Ajuster</span></button><button class="avatar topbar-user" data-nav="profile" aria-label="Mon profil">${initials(state.profile.name)}</button></div>
  </header>`;
}
function renderMobileNav() {
  return `<nav class="mobile-nav" aria-label="Navigation mobile">${navItems().map(item => `<button class="${state.page === item.id ? 'active' : ''}" data-nav="${item.id}" ${state.page === item.id ? 'aria-current="page"' : ''}>${icon(item.icon)}<span>${item.id === 'groceries' ? 'Courses' : item.id === 'favorites' ? 'Favoris' : item.id === 'profile' ? 'Profil' : item.label}</span></button>`).join('')}</nav>`;
}
function renderWeeklyQuizButton() {
  return `<button class="weekly-quiz-fab" data-action="open-weekly-quiz" aria-label="Refaire le quiz MealPilot pour planifier la semaine"><span class="weekly-quiz-fab-mark">${icon('leaf')}</span><span class="weekly-quiz-fab-copy"><strong>MealPilot</strong><span>Refaire le quiz</span></span></button>`;
}
function render() {
  if (!state) return;
  if (state.isGenerating) { app.innerHTML = renderLoading(); return; }
  if (state.onboardingOpen) { app.innerHTML = renderOnboarding(); return; }
  const page = renderPage();
  app.innerHTML = `<div class="app-shell">${renderSidebar()}<div class="main-area">${renderTopbar()}<main class="content">${page}</main></div>${renderMobileNav()}</div>${renderWeeklyQuizButton()}${renderModal()}`;
}
function pageHeading(eyebrow, title, description, actions = '') {
  return `<div class="page-heading"><div class="page-heading-main"><div class="eyebrow">${escapeHtml(eyebrow)}</div><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ''}</div>`;
}
function renderPage() {
  switch (state.page) {
    case 'week': return renderWeek();
    case 'groceries': return renderGroceries();
    case 'favorites': return renderFavorites();
    case 'profile': return renderProfile();
    default: return renderHome();
  }
}
function mealButton(dayIndex, mealIndex, meal, cls = 'week-meal-card') {
  const item = getRecipe(meal.recipeId);
  return `<button class="${cls}" data-action="view-meal" data-day="${dayIndex}" data-meal="${mealIndex}"><span class="meal-art">${recipeArt(item)}</span><span class="week-meal-copy"><span class="meal-type"><i class="type-dot"></i>${escapeHtml(SLOT_LABEL[meal.slot])}</span><span class="meal-title">${escapeHtml(item.name)}</span><span class="meal-meta">${icon('clock', 'icon-sm')} ${item.time} min · ${meal.portions} pers.</span></span>${icon('chevronRight', 'icon-sm week-meal-arrow')}</button>`;
}
function renderHome() {
  const stats = calculateBasket();
  const budget = Number(state.profile.budget) || 0;
  const remaining = budget - stats.total;
  const percent = budget > 0 ? Math.min(100, stats.total / budget * 100) : 0;
  const dayIndex = todayIndex();
  const today = state.plan[dayIndex] || state.plan[0];
  const todayMeals = today?.meals || [];
  const plannedMeals = stats.mealCount;
  const goals = (state.profile.goals || []).slice(0, 3);
  const todayLabel = `${today?.label || 'Aujourd’hui'} · ${today?.shortDate || ''}`;
  const weekCards = state.plan.map((day, index) => `<div class="mini-day ${index === dayIndex ? 'today' : ''}"><div class="mini-day-heading" data-nav="week"><strong>${escapeHtml(day.label)}</strong><span>${escapeHtml(day.shortDate)}</span></div>${day.meals.map((meal, mealIndex) => `<button class="mini-meal-link" data-action="view-meal" data-day="${index}" data-meal="${mealIndex}"><span class="mini-bullet"></span><span>${escapeHtml(getRecipe(meal.recipeId).name)}</span></button>`).join('')}</div>`).join('');
  const groceriesAction = `<button class="button button-secondary" data-nav="groceries">${icon('cart')}Ma liste de courses ${icon('arrowRight', 'icon-sm')}</button>`;
  return `<div class="greeting-row"><div class="greeting-copy"><div class="eyebrow">${icon('sparkles')} TA SEMAINE, EN MIEUX</div><h1>Bonjour ${escapeHtml(state.profile.name || 'Marie')}.</h1><p>Tout est prévu. Tu peux te concentrer sur le reste.</p></div><div class="heading-actions">${groceriesAction}</div></div>
    <section class="stats-grid" aria-label="Résumé de la semaine">
      <article class="card stat-card budget-card"><div class="stat-label">${icon('wallet', 'icon-sm')} Budget prévu</div><div class="stat-value-row"><strong class="stat-value">${money(stats.total)}</strong><span class="stat-of">sur ${money(budget)}</span></div><div class="stat-progress"><div class="progress-track"><div class="progress-fill ${remaining < 0 ? 'over' : ''}" style="width:${percent}%"></div></div><span>${remaining >= 0 ? `${money(remaining)} disponibles` : `${money(Math.abs(remaining))} au-dessus`}</span></div></article>
      <article class="card stat-card stat-card-light"><div class="stat-main"><div><div class="stat-label">${icon('calendar', 'icon-sm')} Repas planifiés</div><div class="stat-value">${plannedMeals}</div></div><span class="stat-icon">${icon('fork')}</span></div><div class="stat-foot"><span>${state.profile.includeBreakfast ? 'Petits-déjeuners compris' : 'Présences choisies par repas'}</span><span class="stat-foot-badge">7 jours</span></div></article>
      <article class="card stat-card stat-card-light"><div class="stat-main"><div><div class="stat-label">${icon('leaf', 'icon-sm')} Anti-gaspi</div><div class="stat-value">${stats.sharedIngredients}</div></div><span class="stat-icon amber">${icon('refresh')}</span></div><div class="stat-foot"><span>ingrédients réutilisés</span><span class="stat-foot-badge">${stats.pantryUsed} au placard</span></div></article>
    </section>
    <section class="home-two-col">
      <article class="card today-card"><div class="today-head"><div class="card-heading"><div><h2>Aujourd’hui</h2><p>${escapeHtml(todayLabel)}</p></div></div><span class="today-date-pill">${todayMeals.length} ${todayMeals.length > 1 ? 'repas prévus' : 'repas prévu'}</span></div><div class="today-meals ${todayMeals.length > 2 ? 'has-breakfast' : ''}">${todayMeals.length ? todayMeals.map((meal, mealIndex) => {
        const item = getRecipe(meal.recipeId);
        return `<button class="today-meal" data-action="view-meal" data-day="${dayIndex}" data-meal="${mealIndex}"><span class="meal-art">${recipeArt(item)}</span><span><span class="meal-type"><i class="type-dot"></i>${escapeHtml(SLOT_LABEL[meal.slot])}</span><span class="meal-title">${escapeHtml(item.name)}</span><span class="meal-meta">${icon('clock', 'icon-sm')} ${item.time} min · ${meal.portions} pers.</span></span></button>`;
      }).join('') : '<div class="no-meals-note">Aucun repas à la maison aujourd’hui. La journée reste libre.</div>'}</div></article>
      <aside class="card week-focus-card"><div class="week-focus-top"><div><h3>Ton cap cette semaine</h3><p>Le menu suit tes priorités.</p></div><span class="small-icon-box">${icon('sparkles')}</span></div><div class="goal-chip-list">${goals.length ? goals.map(id => `<span class="goal-chip">${icon(GOALS.find(g => g.id === id)?.icon || 'leaf')} ${escapeHtml(formatGoalLabel(id))}</span>`).join('') : '<span class="goal-chip">Simplement bien manger</span>'}</div><div class="reuse-note">${icon('leaf')}<span><strong>${stats.sharedIngredients} ingrédients</strong> reviennent dans plusieurs recettes. De quoi limiter le gaspillage.</span></div></aside>
    </section>
    <section class="card week-preview"><div class="card-heading week-preview-head"><div><h2>Au menu cette semaine</h2><p>${escapeHtml(weekRangeLabel())}</p></div><button class="text-link" data-nav="week">Voir le planning complet ${icon('arrowRight')}</button></div><div class="week-strip">${weekCards}</div></section>`;
}
function renderWeek() {
  const stats = calculateBasket();
  const budget = Number(state.profile.budget) || 0;
  const actions = `<button class="button button-primary" data-action="generate-week">${icon('sparkles')}Régénérer ma semaine</button>`;
  return `${pageHeading('TON PLANNING', 'Ma semaine', 'Tes repas sont organisés jour par jour. Clique sur un plat pour voir la recette ou le remplacer.', actions)}
    <section class="card week-summary"><div class="week-summary-left"><span class="week-summary-icon">${icon('calendar')}</span><span class="week-summary-copy"><strong>${escapeHtml(weekRangeLabel())}</strong><span>${stats.mealCount} repas prévus · effectifs ajustés service par service</span></span></div><div class="week-summary-right"><div class="summary-metric"><span>Budget estimé</span><strong>${money(stats.total)}</strong></div><div class="summary-metric"><span>Budget semaine</span><strong>${money(budget)}</strong></div><div class="summary-metric"><span>Disponible</span><strong>${money(budget - stats.total)}</strong></div></div></section>
    <section class="week-calendar">${state.plan.map((day, dayIndex) => `<article class="day-column ${dayIndex === todayIndex() ? 'today' : ''}"><div class="day-column-heading"><div><strong>${escapeHtml(day.label)}</strong><span>${escapeHtml(day.shortDate)}</span></div>${dayIndex === todayIndex() ? '<span class="today-tag">Aujourd’hui</span>' : ''}</div><div class="meal-list">${day.meals.length ? day.meals.map((meal, mealIndex) => mealButton(dayIndex, mealIndex, meal)).join('') : '<div class="no-meals-note">Aucun repas prévu</div>'}</div></article>`).join('')}</section>`;
}
function renderGroceries() {
  const stats = calculateBasket();
  const budget = Number(state.profile.budget) || 0;
  const remaining = budget - stats.total;
  const over = remaining < -.009;
  const percent = budget > 0 ? Math.min(100, stats.total / budget * 100) : 0;
  const byStore = new Map();
  for (const item of stats.items) {
    if (!byStore.has(item.store)) byStore.set(item.store, []);
    byStore.get(item.store).push(item);
  }
  const storeOrder = [...selectedStores(state.profile.stores), ...byStore.keys()].filter((store, index, list) => list.indexOf(store) === index && byStore.has(store));
  const itemsHtml = storeOrder.map(store => {
    const storeItems = byStore.get(store) || [];
    const subtotal = round2(storeItems.reduce((sum, item) => sum + item.price, 0));
    const byCategory = new Map();
    for (const item of storeItems) {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    }
    const categories = CATEGORY_ORDER.filter(category => byCategory.has(category));
    const categoryHtml = categories.map(category => {
      const list = byCategory.get(category);
      const categoryKey = `${store}::${category}`;
      const collapsed = (state.collapsedCategories || []).includes(categoryKey);
      return `<section class="grocery-category ${collapsed ? 'collapsed' : ''}" data-category="${escapeHtml(categoryKey)}"><button class="category-head" data-action="toggle-category" data-category="${escapeHtml(categoryKey)}"><span class="category-icon">${icon(CATEGORY_ICONS[category] || 'basket')}</span><span class="category-title">${escapeHtml(category)}</span><span class="category-count">${list.length} ${list.length > 1 ? 'articles' : 'article'}</span>${icon('chevronDown', 'icon-sm category-chevron')}</button><div class="category-items">${list.map(item => {
        const checked = !!state.checkedItems[item.id];
        const detail = `${formatShoppingQty(item.purchaseQty, item.unit)}${item.shared ? ' · utilisé dans plusieurs recettes' : ''}`;
        return `<div class="grocery-item ${checked ? 'is-checked' : ''}" data-item-id="${item.id}" data-search="${escapeHtml(normalizeText(`${item.name} ${category} ${item.store}`))}"><button class="check-square" data-action="toggle-grocery" data-id="${item.id}" aria-label="${checked ? 'Décocher' : 'Cocher'} ${escapeHtml(item.name)}">${icon('check')}</button><div class="grocery-item-name">${escapeHtml(item.name)}<span class="grocery-item-detail">${escapeHtml(detail)}${Number(state.pantry[item.id] || 0) > 0 ? ` · ${formatShoppingQty(Math.min(Number(state.pantry[item.id]), item.total), item.unit)} déjà chez toi` : ''}</span></div><span class="grocery-price">~${money(item.price)}</span></div>`;
      }).join('')}</div></section>`;
    }).join('');
    return `<section class="store-shopping-group" data-store-group="${escapeHtml(store)}"><header class="store-shopping-head"><div class="store-shopping-head-copy"><span class="store-shopping-icon">${icon('basket')}</span><div><h2>À acheter chez ${escapeHtml(STORE_SHORT[store] || store)}</h2><p>${storeItems.length} ${storeItems.length > 1 ? 'produits' : 'produit'} au prix estimé le plus bas parmi tes choix</p></div></div><strong>${money(subtotal)}</strong></header>${categoryHtml}</section>`;
  }).join('');
  const actions = `<button class="button button-secondary" data-action="open-pantry">${icon('fridge')}Ce que j’ai déjà</button>`;
  const stockNames = Object.keys(state.pantry).filter(id => Number(state.pantry[id]) > 0).map(ingredientName);
  const pantryNames = stockNames.slice(0, 4).join(', ');
  return `${pageHeading('TON PANIER', 'Ma liste de courses', 'Les articles sont répartis entre tes magasins sélectionnés selon le prix estimé le plus bas, puis classés par rayon.', actions)}
    <div class="grocery-layout"><section class="card grocery-main-card"><div class="grocery-toolbar"><div class="search-box">${icon('search')}<input class="search-input" data-search="groceries" placeholder="Rechercher un produit…" aria-label="Rechercher dans la liste" /></div><button class="button button-quiet button-small" data-action="uncheck-all">Tout décocher</button></div>
      <div class="store-price-note">${icon('info')} Prix simulés par magasin et par rayon : ce ne sont pas des prix en temps réel.</div>
      ${itemsHtml || (stats.mealCount === 0 ? `<div class="empty-state"><span class="empty-state-icon">${icon('calendar')}</span><h2>Aucun repas planifié</h2><p>Ton agenda ne contient aucun déjeuner ou dîner à la maison cette semaine.</p><button class="button button-secondary" data-action="open-weekly-quiz">Compléter l’agenda</button></div>` : `<div class="empty-state"><span class="empty-state-icon">${icon('checkCircle')}</span><h2>Tout est déjà à la maison</h2><p>Le placard couvre les ingrédients nécessaires pour cette semaine.</p><button class="button button-secondary" data-action="open-pantry">Gérer mon inventaire</button></div>`)}
      <div class="grocery-empty-search filter-hidden">Aucun produit ne correspond à ta recherche.</div>
    </section>
    <aside class="grocery-aside"><section class="card basket-summary"><h2>Résumé du panier</h2><p>${stats.items.length} produits · ${stats.checkedCount} cochés</p><div class="basket-total"><span>Total estimé</span><strong>${money(stats.total)}</strong></div><div class="basket-meter"><div class="progress-track"><div class="progress-fill ${over ? 'over' : ''}" style="width:${percent}%"></div></div></div><div class="basket-caption"><span>Budget ${money(budget)}</span><strong class="${over ? 'over' : ''}">${over ? `${money(Math.abs(remaining))} au-dessus` : `${money(remaining)} disponibles`}</strong></div><div class="basket-stats"><div class="basket-stat-row"><span>Repas planifiés</span><strong>${stats.mealCount}</strong></div><div class="basket-stat-row"><span>Ingrédients réutilisés</span><strong>${stats.sharedIngredients}</strong></div><div class="basket-stat-row"><span>Déjà dans tes placards</span><strong>−${money(stats.pantrySavings)}</strong></div></div></section>
      <section class="optimize-box ${over ? 'warning' : ''}"><div class="optimize-box-head"><span class="small-icon-box">${icon(over ? 'wallet' : 'sparkles')}</span><div><h3>${over ? `Le menu dépasse de ${money(Math.abs(remaining))}` : 'Ton budget est respecté'}</h3><p>${over ? 'On peut alléger le panier avec des recettes et ingrédients moins chers.' : `Environ ${stats.sharedIngredients} ingrédients servent dans plusieurs plats. ${stats.pantryUsed ? 'Ton placard a aussi évité quelques achats.' : ''}`}</p></div></div>${over ? `<button class="button button-primary button-small" data-action="optimize-budget">${icon('sparkles')}Optimiser automatiquement</button>` : `<button class="button button-plain button-small" data-action="open-pantry">${icon('fridge')}Mettre à jour mon placard</button>`}</section>
      <section class="card pantry-preview"><div class="pantry-preview-head"><h3>Déjà chez toi</h3><button class="text-link" data-action="open-pantry">Modifier ${icon('chevronRight')}</button></div><p>${stockNames.length ? `Pris en compte : ${escapeHtml(pantryNames)}${stockNames.length > 4 ? '…' : ''}.` : 'Ajoute ce que tu as pour éviter les achats en double.'}</p><div class="pantry-chips">${stockNames.slice(0, 4).map(name => `<span class="pantry-chip">${icon('check')} ${escapeHtml(name)}</span>`).join('') || `<span class="pantry-chip">${icon('fridge')} Inventaire vide</span>`}</div></section>
    </aside></div>`;
}
function renderFavorites() {
  const favoriteRecipes = state.favorites.map(getRecipe);
  const title = pageHeading('TES RECETTES', 'Mes favoris', 'Garde sous la main les repas que tu aimes et retrouve-les quand tu veux.', `<button class="button button-secondary" data-nav="week">${icon('calendar')}Explorer ma semaine</button>`);
  if (!favoriteRecipes.length) return `${title}<section class="empty-state"><span class="empty-state-icon">${icon('star')}</span><h2>Les bonnes idées restent ici.</h2><p>Ouvre une recette depuis ta semaine et appuie sur l’étoile pour l’ajouter à tes favoris.</p><button class="button button-primary" data-nav="week">Voir les repas prévus ${icon('arrowRight')}</button></section>`;
  return `${title}<section class="recipe-grid">${favoriteRecipes.map(item => recipeCard(item)).join('')}</section>`;
}
function recipeCard(item) {
  const isFav = state.favorites.includes(item.id);
  return `<article class="recipe-card" data-action="view-recipe" data-recipe="${item.id}"><div class="recipe-card-art"><span class="meal-art">${recipeArt(item)}</span><button class="favorite-star ${isFav ? 'active' : ''}" data-action="toggle-favorite" data-recipe="${item.id}" aria-label="${isFav ? 'Retirer des' : 'Ajouter aux'} favoris">${icon('star', 'icon-sm')}</button></div><div class="recipe-card-body"><span class="meal-type"><i class="type-dot"></i>${escapeHtml(SLOT_LABEL[item.type])}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="recipe-card-meta"><span>${icon('clock')} ${item.time} min</span><span>${icon('fire')} ${item.protein} g prot.</span></div></div></article>`;
}
function renderProfile() {
  const p = state.profile;
  const stats = calculateBasket();
  const action = `<button class="button button-primary" data-action="generate-week">${icon('sparkles')}Recalculer ma semaine</button>`;
  const equipmentHtml = EQUIPMENT_OPTIONS.map(item => `<button class="choice-card ${(p.equipment || []).includes(item.id) && !p.ignoreEquipment ? 'selected' : ''}" data-action="profile-equipment" data-id="${item.id}"><span class="choice-card-icon">${icon(item.icon)}</span><span class="choice-card-label">${escapeHtml(item.label)}</span></button>`).join('');
  const visibleStores = STORES.filter(store => normalizeText(store).includes(normalizeText(profileStoreSearch)));
  return `${pageHeading('TES PRÉFÉRENCES', 'Mon profil', 'Tes contraintes sont prises en compte pour adapter le menu, les portions et le panier.', action)}
    <div class="profile-layout"><div class="profile-main">
      <section class="card profile-section"><div class="profile-section-head"><div><h2>Mon foyer & mon budget</h2><p>Les portions et estimations s’ajustent à chaque modification.</p></div><span class="section-icon">${icon('users')}</span></div>
        <div class="profile-fields"><div><span class="field-label">Adultes</span><div class="counter-control"><button class="counter-btn" data-action="profile-count" data-field="adults" data-delta="-1" ${p.adults <= 1 ? 'disabled' : ''}>${icon('minus')}</button><span class="counter-value">${p.adults}</span><button class="counter-btn" data-action="profile-count" data-field="adults" data-delta="1">${icon('plus')}</button></div></div>
          <div><span class="field-label">Enfants</span><div class="counter-control"><button class="counter-btn" data-action="profile-count" data-field="children" data-delta="-1" ${p.children <= 0 ? 'disabled' : ''}>${icon('minus')}</button><span class="counter-value">${p.children}</span><button class="counter-btn" data-action="profile-count" data-field="children" data-delta="1">${icon('plus')}</button></div></div>
          <div><label class="field-label" for="profile-name">Prénom</label><input id="profile-name" class="text-field" type="text" autocomplete="given-name" maxlength="32" data-profile-field="name" value="${escapeHtml(p.name || '')}" placeholder="Ex. Marie" /></div>
          <div><label class="field-label" for="profile-child-ages">Âge des enfants</label><input id="profile-child-ages" class="text-field" data-profile-field="childAges" value="${escapeHtml(p.childAges || '')}" placeholder="Ex. 6 et 9 ans" /></div>
          <div><label class="field-label" for="profile-budget">Budget hebdomadaire</label><div class="input-with-prefix"><span>€</span><input id="profile-budget" class="text-field" type="number" min="10" step="5" data-profile-field="budget" value="${escapeHtml(p.budget)}" /></div></div>
          <div><label class="field-label" for="profile-budget-mode">Souplesse du budget</label><select id="profile-budget-mode" class="select-field" data-profile-field="budgetMode"><option value="strict" ${p.budgetMode === 'strict' ? 'selected' : ''}>Strict — à respecter</option><option value="flexible" ${p.budgetMode === 'flexible' ? 'selected' : ''}>Flexible — indicatif</option></select></div>
        </div>
        <div class="toggle-row"><div class="toggle-copy"><strong>Inclure le petit-déjeuner</strong><span>Ajoute les petits-déjeuners pour les 7 jours.</span></div><button class="switch ${p.includeBreakfast ? 'on' : ''}" data-action="profile-breakfast"><span></span></button></div>
      </section>
      <section class="card profile-section"><div class="profile-section-head"><div><h2>Mes objectifs</h2><p>Plusieurs choix possibles. Le planning se recalcule avec tes priorités.</p></div><span class="section-icon">${icon('sparkles')}</span></div><div class="choice-grid">${GOALS.map(goal => `<button class="choice-pill ${(p.goals || []).includes(goal.id) ? 'selected' : ''}" data-action="profile-goal" data-id="${goal.id}">${icon(goal.icon)}${escapeHtml(goal.label)}</button>`).join('')}</div><div style="margin-top:12px"><label class="field-label" for="profile-other-goal">Autre objectif</label><input id="profile-other-goal" class="text-field" data-profile-field="otherGoal" value="${escapeHtml(p.otherGoal || '')}" placeholder="Un objectif à ajouter…" /></div></section>
      <section class="card profile-section"><div class="profile-section-head"><div><h2>Matériel de cuisine</h2><p>On évite les recettes qui demandent un équipement absent.</p></div><span class="section-icon">${icon('oven')}</span></div><div class="choice-grid-large">${equipmentHtml}</div><button class="equipment-ignore ${p.ignoreEquipment ? 'selected' : ''}" data-action="profile-ignore-equipment"><span>Je ne sais pas / Je préfère ignorer le matériel</span>${p.ignoreEquipment ? icon('check') : icon('arrowRight')}</button></section>
      <section class="card profile-section"><div class="profile-section-head"><div><h2>Préférences alimentaires</h2><p>Pour éviter les ingrédients indésirables et respecter ton rythme.</p></div><span class="section-icon">${icon('leaf')}</span></div><div class="profile-fields">
        <div><label class="field-label" for="profile-diet">Régime alimentaire</label><select id="profile-diet" class="select-field" data-profile-field="diet">${dietOptions(p.diet)}</select></div>
        <div><label class="field-label" for="profile-time">Temps maximum pour cuisiner</label><select id="profile-time" class="select-field" data-profile-field="cookingTime">${timeOptions(p.cookingTime)}</select></div>
        <div><label class="field-label" for="profile-skill">Niveau en cuisine</label><select id="profile-skill" class="select-field" data-profile-field="skill">${skillOptions(p.skill)}</select></div>
        <div><label class="field-label" for="profile-likes">J’aime</label><input id="profile-likes" class="text-field" data-profile-field="likes" value="${escapeHtml(p.likes || '')}" placeholder="Ex. citron, courgette" /></div>
        <div><label class="field-label" for="profile-dislikes">Je n’aime pas</label><input id="profile-dislikes" class="text-field" data-profile-field="dislikes" value="${escapeHtml(p.dislikes || '')}" placeholder="Ex. champignons" /></div>
        <div><label class="field-label" for="profile-allergies">Allergies / intolérances</label><input id="profile-allergies" class="text-field" data-profile-field="allergies" value="${escapeHtml(p.allergies || '')}" placeholder="Ex. arachides, lactose" /></div>
        <div><label class="field-label" for="profile-excluded">Aliments interdits</label><input id="profile-excluded" class="text-field" data-profile-field="excluded" value="${escapeHtml(p.excluded || '')}" placeholder="Ex. poisson" /></div>
        <div><label class="field-label" for="profile-profile-notes">Notes du foyer</label><input id="profile-profile-notes" class="text-field" data-profile-field="profileNotes" value="${escapeHtml(p.profileNotes || '')}" placeholder="Une précision utile…" /></div>
      </div></section>
      <section class="card profile-section"><div class="profile-section-head"><div><h2>Mes magasins</h2><p>La liste répartit les articles vers l’enseigne au prix estimé le plus bas parmi tes choix.</p></div><span class="section-icon">${icon('basket')}</span></div><div class="search-box" style="margin-bottom:11px">${icon('search')}<input class="search-input store-search" data-search="profile-stores" value="${escapeHtml(profileStoreSearch)}" placeholder="Rechercher une enseigne…" /></div><div class="store-grid">${visibleStores.map(store => `<button class="store-option ${(p.stores || []).includes(store) ? 'selected' : ''}" data-action="profile-store" data-id="${escapeHtml(store)}"><span class="store-checkbox">${icon('check')}</span><span>${escapeHtml(store)}</span></button>`).join('')}</div></section>
      <section class="card profile-section"><div class="profile-section-head"><div><h2>Ce que j’ai déjà</h2><p>Les ingrédients du placard sont soustraits aux courses.</p></div><span class="section-icon">${icon('fridge')}</span></div><p style="margin:0 0 12px;color:#879087;font-size:10px">${Object.keys(state.pantry).filter(id => state.pantry[id] > 0).length} produits enregistrés · environ ${money(stats.pantrySavings)} d’achats évités cette semaine.</p><button class="button button-secondary button-small" data-action="open-pantry">${icon('fridge')}Gérer mon inventaire</button></section>
    </div><aside class="profile-sidebar"><section class="card profile-summary"><h3>Ton profil en bref</h3><p>MealPilot construit une semaine adaptée à ces paramètres.</p><div class="profile-summary-stat"><span>Personnes</span><strong>${totalPeople(p)}</strong></div><div class="profile-summary-stat"><span>Budget</span><strong>${money(Number(p.budget) || 0)} / sem.</strong></div><div class="profile-summary-stat"><span>Repas planifiés</span><strong>${stats.mealCount}</strong></div><div class="profile-summary-stat"><span>Estimation actuelle</span><strong>${money(stats.total)}</strong></div><button class="button button-primary button-small" data-action="generate-week">${icon('sparkles')}Recalculer ma semaine</button></section><div class="data-note"><strong>Prix indicatifs.</strong> Les prix et enseignes sont simulés dans ce prototype. Tes préférences sont enregistrées uniquement sur cet appareil.</div></aside></div>`;
}

function renderLoading() {
  const messages = ['Analyse de ton budget…', 'Création des recettes…', 'Optimisation des ingrédients…', 'Calcul des quantités…', 'Préparation de ta liste de courses…'];
  const current = Math.min(state.loadingStep, messages.length - 1);
  return `<div class="loading-screen"><section class="loading-card"><span class="loading-mark">${icon('leaf')}</span><h1>On prépare ta semaine.</h1><p>Quelques secondes pour tout organiser, tu n’as plus rien à calculer.</p><div class="loading-steps">${messages.map((message, index) => `<div class="loading-step ${index === current ? 'active' : index < current ? 'done' : ''}"><span class="loading-indicator">${index < current ? icon('check') : ''}</span><span>${message}</span></div>`).join('')}</div><div class="loading-progress"><span style="width:${Math.min(100, (current + 1) / messages.length * 100)}%"></span></div></section></div>`;
}

function findMeal(dayIndex, mealIndex) {
  const day = state.plan?.[Number(dayIndex)];
  const meal = day?.meals?.[Number(mealIndex)];
  return meal ? { day, meal, dayIndex: Number(dayIndex), mealIndex: Number(mealIndex) } : null;
}
function renderRecipeModal() {
  const modal = state.modal;
  const item = getRecipe(modal.recipeId);
  const ref = modal.dayIndex != null ? findMeal(modal.dayIndex, modal.mealIndex) : null;
  const portions = ref ? Number(ref.meal.portions || totalPeople(state.profile)) : Number(modal.portions || totalPeople(state.profile));
  const label = ref ? `${ref.day.label} · ${SLOT_LABEL[ref.meal.slot]}` : SLOT_LABEL[item.type];
  const cost = recipeCostPerServing(item, state.profile);
  const ingredients = item.ingredients.map(part => {
    const food = INGREDIENTS[part.ingredient] || {};
    return `<div class="recipe-ingredient"><span>${escapeHtml(food.name || part.ingredient)}</span><strong>${formatRecipeQty(part.qty * portions, food.unit || 'g')}</strong></div>`;
  }).join('');
  const equipment = item.equipment.length ? item.equipment.map(id => `<span class="equipment-tag">${icon(EQUIPMENT.find(x => x.id === id)?.icon || 'oven')} ${escapeHtml(EQUIPMENT_LABEL[id] || id)}</span>`).join('') : '<span class="equipment-tag">Aucun matériel particulier</span>';
  const isFavorite = state.favorites.includes(item.id);
  const actions = `<button class="button button-plain" data-action="toggle-favorite" data-recipe="${item.id}">${icon('star')} ${isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button><div class="modal-actions-right">${ref ? `<button class="button button-secondary" data-action="open-replace">${icon('refresh')}Remplacer ce repas</button>` : ''}<button class="button button-primary" data-action="close-modal">${ref ? 'Terminé' : 'Fermer'}</button></div>`;
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="recipe-title"><header class="modal-head"><div><div class="eyebrow">${escapeHtml(label)}</div><h2 id="recipe-title">${escapeHtml(item.name)}</h2><p>${escapeHtml(item.description)}</p></div><button class="modal-close" data-action="close-modal" aria-label="Fermer">${icon('close')}</button></header>
    <div class="modal-content"><div class="recipe-detail-grid"><div class="recipe-detail-art">${recipeArt(item)}</div><div class="recipe-detail-aside"><div class="recipe-tags">${item.tags.filter(tag => ['balanced', 'protein', 'vegetarian', 'vegan', 'vegetables', 'quick', 'lowCost'].includes(tag)).slice(0, 3).map(tag => `<span class="recipe-tag">${tag === 'balanced' ? 'Équilibré' : tag === 'protein' ? 'Riche en protéines' : tag === 'vegetarian' ? 'Végétarien' : tag === 'vegan' ? 'Végétalien' : tag === 'vegetables' ? 'Légumes' : tag === 'quick' ? 'Rapide' : 'Économique'}</span>`).join('')}</div><p class="recipe-detail-description">Une recette pensée pour ton planning, avec des quantités adaptées à ${portions} ${portions > 1 ? 'personnes' : 'personne'}.</p><div class="recipe-facts"><div class="recipe-fact"><strong>${item.time} min</strong><span>Préparation</span></div><div class="recipe-fact"><strong>${escapeHtml(item.difficulty)}</strong><span>Difficulté</span></div><div class="recipe-fact"><strong>${item.calories}</strong><span>kcal / pers.</span></div></div><div class="recipe-facts"><div class="recipe-fact"><strong>${item.protein} g</strong><span>Protéines</span></div><div class="recipe-fact"><strong>~${money(cost)}</strong><span>Par personne</span></div><div class="recipe-fact"><strong>${portions}</strong><span>Portions</span></div></div><div class="portion-adjust"><span>Portions de cette recette</span><div class="portion-buttons"><button class="counter-btn" data-action="portion-change" data-delta="-1" ${portions <= 1 ? 'disabled' : ''}>${icon('minus')}</button><span class="counter-value">${portions}</span><button class="counter-btn" data-action="portion-change" data-delta="1" ${portions >= 12 ? 'disabled' : ''}>${icon('plus')}</button></div></div></div></div>
      <section class="recipe-section"><h3 class="recipe-section-heading">Ingrédients <span>pour ${portions} ${portions > 1 ? 'personnes' : 'personne'}</span></h3><div class="ingredient-chips">${ingredients}</div></section>
      <section class="recipe-section"><h3 class="recipe-section-heading">Matériel nécessaire</h3><div class="equipment-list">${equipment}</div></section>
      <section class="recipe-section"><h3 class="recipe-section-heading">Préparation <span>${item.steps.length} étapes</span></h3><div class="recipe-steps">${item.steps.map((step, index) => `<div class="recipe-step"><span class="recipe-step-number">${index + 1}</span><span>${escapeHtml(step)}</span></div>`).join('')}</div></section>
    </div><footer class="modal-actions">${actions}</footer></section></div>`;
}
function renderReplaceModal() {
  const ref = state.modal?.dayIndex != null ? findMeal(state.modal.dayIndex, state.modal.mealIndex) : null;
  if (!ref) return '';
  const current = getRecipe(ref.meal.recipeId);
  const candidates = eligibleRecipes(ref.meal.slot, state.profile).filter(item => item.id !== current.id).sort((a, b) => recipeCostPerServing(a) - recipeCostPerServing(b));
  const list = candidates.map(item => `<button class="replace-option" data-action="replace-meal" data-recipe="${item.id}"><span class="meal-art">${recipeArt(item)}</span><span class="replace-option-copy"><strong>${escapeHtml(item.name)}</strong><span>${item.time} min · ${escapeHtml(item.difficulty)} · ${item.protein} g protéines</span></span><span class="replace-option-price">~${money(recipeCostPerServing(item) * ref.meal.portions)}<br><span style="font-size:8px;font-weight:500;color:#929a92">pour ${ref.meal.portions}</span></span></button>`).join('');
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal-panel modal-replace" role="dialog" aria-modal="true" aria-labelledby="replace-title"><header class="modal-head"><div><div class="eyebrow">${escapeHtml(ref.day.label)} · ${escapeHtml(SLOT_LABEL[ref.meal.slot])}</div><h2 id="replace-title">Remplacer ce repas</h2><p>Les quantités, le panier et le budget seront mis à jour automatiquement.</p></div><button class="modal-close" data-action="close-modal" aria-label="Fermer">${icon('close')}</button></header><div class="modal-content"><div class="replace-list">${list || '<p class="segment-help">Aucune autre recette ne correspond à tes préférences actuelles.</p>'}</div></div></section></div>`;
}
function renderPantryModal() {
  const groups = new Map();
  for (const option of PANTRY_OPTIONS) {
    const category = ingredientCategory(option.id);
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category).push(option);
  }
  const content = [...groups.entries()].map(([category, options]) => `<div class="pantry-group"><p class="wizard-section-label">${escapeHtml(category)}</p><div class="pantry-modal-grid">${options.map(option => {
    const selected = Number(state.pantry[option.id] || 0) > 0;
    const unit = ingredientUnit(option.id);
    const qty = selected ? Number(state.pantry[option.id]) : option.qty;
    return `<button class="pantry-modal-option ${selected ? 'selected' : ''}" data-action="toggle-pantry" data-id="${option.id}"><span class="pantry-option-check">${icon('check')}</span><span><span class="pantry-option-name">${escapeHtml(ingredientName(option.id))}</span><span class="pantry-option-qty">${selected ? `${formatShoppingQty(qty, unit)} déjà en stock` : `J’en ai (${formatShoppingQty(option.qty, unit)} environ)`}</span></span></button>`;
  }).join('')}</div></div>`).join('');
  const stats = calculateBasket();
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal-panel modal-small" role="dialog" aria-modal="true" aria-labelledby="pantry-title"><header class="modal-head"><div><div class="eyebrow">TON INVENTAIRE</div><h2 id="pantry-title">Ce que j’ai déjà</h2><p>Coche les ingrédients présents chez toi. Ils seront retirés du panier, en tenant compte des quantités.</p></div><div class="modal-head-actions"><button class="button button-secondary button-small" data-action="open-scanner">${icon('camera')}Scanner</button><button class="modal-close" data-action="close-modal" aria-label="Fermer">${icon('close')}</button></div></header><div class="modal-content">${content}<p class="modal-footnote">Le prototype utilise des quantités estimées. Tu peux modifier ton inventaire à tout moment.</p></div><footer class="modal-actions"><span style="color:#899289;font-size:9px">${stats.pantryUsed} ingrédients utilisés · ${money(stats.pantrySavings)} économisés</span><div class="modal-actions-right"><button class="button button-primary" data-action="close-modal">C’est noté</button></div></footer></section></div>`;
}
function renderScannerModal() {
  const list = PANTRY_OPTIONS.map(option => {
    const inStock = Number(state.pantry[option.id] || 0) > 0;
    const quantity = inStock ? state.pantry[option.id] : option.qty;
    return `<div class="scan-product" data-search="${escapeHtml(normalizeText(`${ingredientName(option.id)} ${ingredientCategory(option.id)}`))}"><span class="scan-product-info"><strong>${escapeHtml(ingredientName(option.id))}</strong><span>${inStock ? `Déjà noté : ${formatShoppingQty(quantity, ingredientUnit(option.id))}` : ingredientCategory(option.id)}</span></span><button class="button button-secondary button-small" data-action="add-pantry-product" data-id="${option.id}">${icon('plus')}${inStock ? 'Ajouter encore' : 'Ajouter'}</button></div>`;
  }).join('');
  const status = scannerStatus || 'Cadre un code-barres avec la caméra, ou ajoute directement un produit depuis la liste.';
  return `<div class="modal-backdrop" data-modal-backdrop><section class="modal-panel modal-small" role="dialog" aria-modal="true" aria-labelledby="scanner-title"><header class="modal-head"><div><div class="eyebrow">INVENTAIRE MAISON</div><h2 id="scanner-title">Scanner un produit</h2><p>Ajoute un aliment déjà chez toi pour éviter de le racheter.</p></div><div class="modal-head-actions"><button class="button button-quiet button-small" data-action="open-pantry">${icon('arrowLeft')}Inventaire</button><button class="modal-close" data-action="close-modal" aria-label="Fermer">${icon('close')}</button></div></header><div class="modal-content"><div class="scanner-viewport"><video id="scanner-video" playsinline muted></video><div class="scanner-frame"></div><div class="scanner-placeholder">${icon('camera')}<strong>Prêt à scanner</strong><span>Autorise l’accès à la caméra puis place le code-barres dans le cadre.</span></div></div><div id="scanner-status" class="scanner-status">${icon('info')}<span>${escapeHtml(status)}${scannerCode ? ` Code détecté : ${escapeHtml(scannerCode)}.` : ''}</span></div><div class="scanner-controls"><button class="button button-primary button-small" data-action="start-scanner">${icon('camera')}Démarrer le scan</button></div><div class="scanner-list-heading"><span>Ou ajoute un produit manuellement</span><span>${PANTRY_OPTIONS.length} aliments</span></div><div class="search-box">${icon('search')}<input class="search-input" data-search="scanner-products" placeholder="Rechercher un aliment…" aria-label="Rechercher un aliment à ajouter" /></div><div class="scanner-list">${list}</div><p class="modal-footnote">La lecture du code dépend du navigateur et de l’autorisation caméra. Le prototype ne consulte pas encore de catalogue produit externe : après le scan, choisis l’aliment correspondant.</p></div></section></div>`;
}
function stopPantryScanner() {
  if (scannerInterval) { clearInterval(scannerInterval); scannerInterval = null; }
  if (scannerStream) { scannerStream.getTracks().forEach(track => track.stop()); scannerStream = null; }
  const video = document.getElementById('scanner-video');
  if (video) { video.pause?.(); video.srcObject = null; }
  document.querySelector('.scanner-viewport')?.classList.remove('camera-live');
}
async function startPantryScanner() {
  const setStatus = message => { scannerStatus = message; const target = document.querySelector('#scanner-status span'); if (target) target.textContent = message; };
  if (!navigator.mediaDevices?.getUserMedia) { setStatus('La caméra n’est pas accessible ici. Tu peux ajouter le produit avec la liste ci-dessous.'); return; }
  if (typeof BarcodeDetector === 'undefined') { setStatus('La lecture automatique des codes n’est pas prise en charge par ce navigateur. Ajoute l’aliment depuis la liste ci-dessous.'); return; }
  let detector;
  try {
    detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'qr_code'] });
    scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
    const video = document.getElementById('scanner-video');
    if (!video || state.modal?.type !== 'scanner') { stopPantryScanner(); return; }
    video.srcObject = scannerStream;
    await video.play();
    document.querySelector('.scanner-viewport')?.classList.add('camera-live');
    setStatus('Caméra active. Place le code-barres dans le cadre.');
    scannerInterval = setInterval(async () => {
      if (!video.srcObject || video.readyState < 2) return;
      try {
        const codes = await detector.detect(video);
        if (codes?.length) {
          scannerCode = codes[0].rawValue || '';
          stopPantryScanner();
          setStatus(`Code détecté : ${scannerCode}. Choisis l’aliment correspondant dans la liste.`);
        }
      } catch (error) { console.warn('MealPilot: lecture du code impossible.', error); }
    }, 500);
  } catch (error) {
    stopPantryScanner();
    setStatus(error?.name === 'NotAllowedError' ? 'Accès caméra refusé. Tu peux tout de même ajouter un aliment manuellement.' : 'Impossible de démarrer la caméra. Utilise la liste pour ajouter un aliment.');
  }
}
function renderModal() {
  if (!state.modal) return '';
  if (state.modal.type === 'recipe') return renderRecipeModal();
  if (state.modal.type === 'replace') return renderReplaceModal();
  if (state.modal.type === 'pantry') return renderPantryModal();
  if (state.modal.type === 'scanner') return renderScannerModal();
  return '';
}

function toggleArray(array, item) {
  const values = Array.isArray(array) ? array.slice() : [];
  const index = values.indexOf(item);
  if (index >= 0) values.splice(index, 1); else values.push(item);
  return values;
}
function openRecipeFromButton(el) {
  const ref = findMeal(el.dataset.day, el.dataset.meal);
  if (!ref) return;
  state.modal = { type: 'recipe', recipeId: ref.meal.recipeId, dayIndex: ref.dayIndex, mealIndex: ref.mealIndex };
  render();
}
function toggleFavorite(recipeId) {
  if (state.favorites.includes(recipeId)) {
    state.favorites = state.favorites.filter(id => id !== recipeId);
    showToast('Recette retirée de tes favoris.');
  } else {
    state.favorites = [...state.favorites, recipeId];
    showToast('Recette ajoutée à tes favoris.');
  }
  saveState();
  render();
}
function applyReplacement(recipeId) {
  const ref = state.modal?.dayIndex != null ? findMeal(state.modal.dayIndex, state.modal.mealIndex) : null;
  if (!ref) return;
  ref.meal.recipeId = recipeId;
  state.modal = null;
  saveState(); render();
  showToast('Repas remplacé · liste de courses mise à jour.');
}
function setDraftField(field, value) {
  if (field === 'budget' || field === 'adults' || field === 'children') {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) draftProfile[field] = field === 'budget' ? Math.max(0, parsed) : Math.max(field === 'adults' ? 1 : 0, Math.floor(parsed));
  } else if (field === 'cookingTime') {
    draftProfile[field] = value === 'any' ? 'any' : Number(value);
  } else {
    draftProfile[field] = value;
  }
}
function completeDraft() {
  if (!draftProfile.stores.length) draftProfile.stores = ['Carrefour'];
  if (!draftProfile.goals.length) draftProfile.goals = ['balanced'];
  if (Number(draftProfile.budget) < 10) draftProfile.budget = 10;
  startGeneration({ fromWizard: true });
}
function handleClick(event) {
  if (event.target.matches('.modal-backdrop')) { if (state.modal?.type === 'scanner') stopPantryScanner(); state.modal = null; render(); return; }
  const el = event.target.closest('[data-action], [data-nav]');
  if (!el) return;
  if (el.dataset.nav) {
    if (state.modal?.type === 'scanner') stopPantryScanner();
    state.page = el.dataset.nav;
    state.modal = null;
    saveState(); render();
    return;
  }
  const action = el.dataset.action;
  if (action === 'explore-demo') {
    state.onboardingOpen = false; state.hasCompletedOnboarding = true; state.page = 'home'; saveState(); render();
    return;
  }
  if (action === 'open-onboarding') {
    draftProfile = clone(state.profile); draftAttendance = normalizeWeekAttendance(state.weekAttendance, state.profile); onboardingStep = 0; storeSearch = ''; state.onboardingEntry = 'profile'; state.onboardingOpen = true; state.modal = null; render(); return;
  }
  if (action === 'open-weekly-quiz') {
    draftProfile = clone(state.profile); draftAttendance = normalizeWeekAttendance(state.weekAttendance, state.profile); onboardingStep = 0; storeSearch = ''; onboardingReturnPage = state.page; state.onboardingEntry = 'weekly'; state.onboardingOpen = true; state.modal = null; render(); return;
  }
  if (action === 'cancel-onboarding') { state.onboardingOpen = false; state.page = state.onboardingEntry === 'weekly' ? onboardingReturnPage : 'profile'; render(); return; }
  if (action === 'wizard-back') { onboardingStep = Math.max(0, onboardingStep - 1); render(); return; }
  if (action === 'wizard-next') {
    if (onboardingStep < ONBOARDING_STEPS.length - 1) { onboardingStep += 1; render(); }
    else completeDraft();
    return;
  }
  if (action === 'draft-count') {
    const field = el.dataset.field; const min = field === 'adults' ? 1 : 0;
    const previousSize = totalPeople(draftProfile);
    draftProfile[field] = Math.max(min, Number(draftProfile[field] || 0) + Number(el.dataset.delta));
    updateDefaultAttendanceCounts(previousSize, totalPeople(draftProfile), draftAttendance);
    render(); return;
  }
  if (action === 'draft-attendance-toggle') {
    const entry = draftAttendance?.[el.dataset.date]?.[el.dataset.slot];
    if (entry) entry.active = !entry.active;
    render(); return;
  }
  if (action === 'draft-attendance-count') {
    const entry = draftAttendance?.[el.dataset.date]?.[el.dataset.slot];
    if (entry) entry.portions = Math.max(1, Math.min(12, Number(entry.portions || 1) + Number(el.dataset.delta)));
    render(); return;
  }
  if (action === 'draft-attendance-all') {
    const active = el.dataset.value === 'on';
    for (const day of Object.values(draftAttendance || {})) for (const slot of ['lunch', 'dinner']) day[slot].active = active;
    render(); return;
  }
  if (action === 'draft-individual') { draftProfile.individualProfiles = !draftProfile.individualProfiles; render(); return; }
  if (action === 'draft-budget-mode') { draftProfile.budgetMode = el.dataset.value; render(); return; }
  if (action === 'draft-equipment') { draftProfile.equipment = toggleArray(draftProfile.equipment, el.dataset.id); draftProfile.ignoreEquipment = false; render(); return; }
  if (action === 'draft-ignore') { draftProfile.ignoreEquipment = !draftProfile.ignoreEquipment; render(); return; }
  if (action === 'draft-goal') { draftProfile.goals = toggleArray(draftProfile.goals, el.dataset.id); render(); return; }
  if (action === 'draft-breakfast') { draftProfile.includeBreakfast = !draftProfile.includeBreakfast; render(); return; }
  if (action === 'draft-store') { draftProfile.stores = toggleArray(draftProfile.stores, el.dataset.id); render(); return; }
  if (action === 'generate-week') { startGeneration(); return; }
  if (action === 'view-meal') { openRecipeFromButton(el); return; }
  if (action === 'view-recipe') { state.modal = { type: 'recipe', recipeId: el.dataset.recipe, portions: totalPeople(state.profile) }; render(); return; }
  if (action === 'toggle-favorite') { event.stopPropagation(); toggleFavorite(el.dataset.recipe); return; }
  if (action === 'open-replace') { if (state.modal?.type === 'recipe') state.modal = { type: 'replace', dayIndex: state.modal.dayIndex, mealIndex: state.modal.mealIndex }; render(); return; }
  if (action === 'replace-meal') { applyReplacement(el.dataset.recipe); return; }
  if (action === 'portion-change') {
    const ref = state.modal?.dayIndex != null ? findMeal(state.modal.dayIndex, state.modal.mealIndex) : null;
    if (ref) {
      ref.meal.portions = Math.min(12, Math.max(1, Number(ref.meal.portions || 1) + Number(el.dataset.delta)));
      if (ref.meal.slot !== 'breakfast' && state.weekAttendance?.[ref.day.date]?.[ref.meal.slot]) state.weekAttendance[ref.day.date][ref.meal.slot].portions = ref.meal.portions;
    } else if (state.modal) state.modal.portions = Math.min(12, Math.max(1, Number(state.modal.portions || 1) + Number(el.dataset.delta)));
    saveState(); render(); return;
  }
  if (action === 'close-modal') { if (state.modal?.type === 'scanner') stopPantryScanner(); state.modal = null; render(); return; }
  if (action === 'open-pantry') { stopPantryScanner(); state.modal = { type: 'pantry' }; render(); return; }
  if (action === 'open-scanner') { scannerCode = ''; scannerStatus = ''; stopPantryScanner(); state.modal = { type: 'scanner' }; render(); return; }
  if (action === 'start-scanner') { startPantryScanner(); return; }
  if (action === 'add-pantry-product') {
    const option = PANTRY_OPTIONS.find(item => item.id === el.dataset.id);
    if (option) {
      state.pantry[option.id] = Number(state.pantry[option.id] || 0) + option.qty;
      scannerStatus = `${ingredientName(option.id)} ajouté au placard (${formatShoppingQty(state.pantry[option.id], ingredientUnit(option.id))} au total).`;
      stopPantryScanner(); saveState(); render(); showToast(`${ingredientName(option.id)} ajouté à ce que tu as déjà.`);
    }
    return;
  }
  if (action === 'toggle-pantry') {
    const id = el.dataset.id;
    if (Number(state.pantry[id] || 0) > 0) delete state.pantry[id];
    else {
      const option = PANTRY_OPTIONS.find(item => item.id === id);
      if (option) state.pantry[id] = option.qty;
    }
    saveState(); render(); return;
  }
  if (action === 'toggle-grocery') { const id = el.dataset.id; state.checkedItems[id] = !state.checkedItems[id]; saveState(); render(); return; }
  if (action === 'uncheck-all') { state.checkedItems = {}; saveState(); render(); showToast('La liste est décochée.'); return; }
  if (action === 'toggle-category') { state.collapsedCategories = toggleArray(state.collapsedCategories, el.dataset.category); saveState(); render(); return; }
  if (action === 'optimize-budget') {
    const before = calculateBasket().total;
    state.plan = optimizePlanToBudget(state.plan, state.profile);
    const after = calculateBasket(state.plan, state.profile, state.pantry).total;
    saveState(); render();
    if (after < before - .009) showToast(`Panier optimisé : ${money(before - after)} économisés.`);
    else showToast('Ton menu est déjà au meilleur prix avec ces critères.', 'error');
    return;
  }
  if (action === 'profile-count') {
    const field = el.dataset.field; const minimum = field === 'adults' ? 1 : 0;
    const value = Math.max(minimum, Number(state.profile[field] || 0) + Number(el.dataset.delta));
    updateProfileField(field, value); return;
  }
  if (action === 'profile-breakfast') { updateProfileField('includeBreakfast', !state.profile.includeBreakfast); return; }
  if (action === 'profile-goal') { updateProfileField('goals', toggleArray(state.profile.goals, el.dataset.id)); return; }
  if (action === 'profile-equipment') { state.profile.ignoreEquipment = false; updateProfileField('equipment', toggleArray(state.profile.equipment, el.dataset.id)); return; }
  if (action === 'profile-ignore-equipment') { updateProfileField('ignoreEquipment', !state.profile.ignoreEquipment); return; }
  if (action === 'profile-store') { updateProfileField('stores', toggleArray(state.profile.stores, el.dataset.id)); return; }
}
function syncVisibleProfileName(name) {
  const cleanName = String(name || '').trim() || 'Marie';
  const greeting = document.querySelector('.greeting-copy h1');
  if (greeting) greeting.textContent = `Bonjour ${cleanName}.`;
  const sidebarName = document.querySelector('.sidebar-user-name strong');
  if (sidebarName) sidebarName.textContent = cleanName;
  document.querySelectorAll('.avatar').forEach(node => { node.textContent = initials(cleanName); });
}
function handleChange(event) {
  const el = event.target;
  if (el.matches('[data-draft-field]')) {
    const field = el.dataset.draftField;
    setDraftField(field, el.value);
    render();
    return;
  }
  if (el.matches('[data-profile-field]')) {
    const field = el.dataset.profileField;
    let value = el.value;
    if (field === 'name') {
      value = String(value || '').trim().slice(0, 32) || 'Marie';
      state.profile.name = value;
      el.value = value;
      saveState();
      syncVisibleProfileName(value);
      return;
    }
    if (['adults', 'children', 'budget'].includes(field)) value = Number(value) || (field === 'children' ? 0 : 10);
    if (field === 'cookingTime') value = value === 'any' ? 'any' : Number(value);
    updateProfileField(field, value);
  }
}
function applyStoreSearch(input, selector) {
  const term = normalizeText(input.value);
  document.querySelectorAll(selector).forEach(card => {
    const text = normalizeText(card.textContent);
    card.classList.toggle('filter-hidden', term && !text.includes(term));
  });
}
function applyGrocerySearch(input) {
  const term = normalizeText(input.value);
  let visible = 0;
  document.querySelectorAll('.grocery-category').forEach(category => {
    let hasVisible = false;
    category.querySelectorAll('.grocery-item').forEach(item => {
      const match = !term || normalizeText(item.dataset.search).includes(term);
      item.classList.toggle('filter-hidden', !match);
      if (match) { hasVisible = true; visible++; }
    });
    category.classList.toggle('filter-hidden', !hasVisible);
  });
  document.querySelectorAll('.store-shopping-group').forEach(group => {
    const hasVisibleCategory = Array.from(group.querySelectorAll('.grocery-category')).some(category => !category.classList.contains('filter-hidden'));
    group.classList.toggle('filter-hidden', !hasVisibleCategory);
  });
  const empty = document.querySelector('.grocery-empty-search');
  if (empty) empty.classList.toggle('filter-hidden', !term || visible > 0);
}
function handleInput(event) {
  const el = event.target;
  if (el.matches('[data-profile-field="name"]')) {
    state.profile.name = String(el.value || '').slice(0, 32);
    saveState();
    syncVisibleProfileName(state.profile.name);
    return;
  }
  if (el.matches('[data-search="onboarding-stores"]')) {
    storeSearch = el.value;
    applyStoreSearch(el, '.store-option');
    return;
  }
  if (el.matches('[data-search="profile-stores"]')) {
    profileStoreSearch = el.value;
    applyStoreSearch(el, '.store-option');
    return;
  }
  if (el.matches('[data-search="scanner-products"]')) { applyStoreSearch(el, '.scan-product'); return; }
  if (el.matches('[data-search="groceries"]')) { applyGrocerySearch(el); return; }
  if (el.matches('[data-draft-field="budget"]')) {
    const value = Number(el.value);
    if (!Number.isNaN(value)) draftProfile.budget = Math.max(0, value);
  }
  if (el.matches('[data-draft-field="adults"], [data-draft-field="children"]')) setDraftField(el.dataset.draftField, el.value);
}

app.addEventListener('click', handleClick);
app.addEventListener('change', handleChange);
app.addEventListener('input', handleInput);

state = loadState();
draftProfile = clone(state.profile);
draftAttendance = normalizeWeekAttendance(state.weekAttendance, state.profile);
render();
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('MealPilot: mode hors ligne indisponible.', error));
}
