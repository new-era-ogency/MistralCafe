export const menuItems = [
  {
    id: "breakfast-omelette",
    category: "breakfast",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    title: { en: "Herb Garden Omelette", ua: "Омлет із зеленню", bg: "Омлет с билки", ru: "Омлет с травами" },
    description: {
      en: "Free-range eggs, dill, chives, local goat cheese and toasted sourdough.",
      ua: "Фермерські яйця, кріп, шніт, козячий сир і підсмажений хліб.",
      bg: "Фермерски яйца, копър, пресен лук, козе сирене и тост.",
      ru: "Фермерские яйца, укроп, шнитт, козий сыр и поджаренный хлеб.",
    },
    allergens: ["Eggs", "Dairy", "Gluten"],
    price: "18.50",
  },
  {
    id: "salad-sea-breeze",
    category: "salads",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80",
    title: { en: "Sea Breeze Salad", ua: "Салат Морський Бриз", bg: "Салата Морски Бриз", ru: "Салат Морской Бриз" },
    description: {
      en: "Arugula, citrus fennel, grilled shrimp and sage vinaigrette.",
      ua: "Рукола, цитрусовий фенхель, креветки гриль і соус з шавлією.",
      bg: "Рукола, цитрусов фенел, скариди на грил и салвия винегрет.",
      ru: "Руккола, цитрусовый фенхель, креветки гриль и соус с шалфеем.",
    },
    allergens: ["Shellfish"],
    price: "22.00",
  },
  {
    id: "mains-sea-bass",
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    title: { en: "Charred Sea Bass", ua: "Сібас на вугіллі", bg: "Лаврак на жар", ru: "Сибас на огне" },
    description: {
      en: "Black Sea bass, lemon potatoes, caper butter and grilled asparagus.",
      ua: "Чорноморський сібас, лимонна картопля, каперсове масло та спаржа.",
      bg: "Черноморски лаврак, лимонови картофи, каперсово масло и аспержи.",
      ru: "Черноморский сибас, лимонный картофель, масло с каперсами и спаржа.",
    },
    allergens: ["Fish", "Dairy"],
    price: "36.00",
  },
  {
    id: "dessert-honey-cream",
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
    title: { en: "Honey Cream Tart", ua: "Медовий тарт", bg: "Тарт с меден крем", ru: "Тарт с медовым кремом" },
    description: {
      en: "Flaky tart shell, acacia honey cream and seasonal berries.",
      ua: "Хрустка основа, крем з акацієвим медом та сезонні ягоди.",
      bg: "Хрупкава основа, крем от акациев мед и сезонни плодове.",
      ru: "Хрустящая основа, крем из акациевого меда и сезонные ягоды.",
    },
    allergens: ["Dairy", "Gluten"],
    price: "14.00",
  },
  {
    id: "coffee-mistral-latte",
    category: "coffee",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    title: { en: "Mistral Latte", ua: "Лате Містраль", bg: "Лате Мистрал", ru: "Латте Мистраль" },
    description: {
      en: "Double espresso, steamed milk and cardamom foam.",
      ua: "Подвійне еспресо, молоко на пару та піна з кардамоном.",
      bg: "Двойно еспресо, мляко на пара и кардамонова пяна.",
      ru: "Двойной эспрессо, парное молоко и пена с кардамоном.",
    },
    allergens: ["Dairy"],
    price: "7.50",
  },
  {
    id: "cocktail-sunset",
    category: "cocktails",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    title: { en: "Sveti Sunset", ua: "Светі Сансет", bg: "Свети Сънсет", ru: "Свети Сансет" },
    description: {
      en: "Gin, peach infusion, rosemary syrup and citrus mist.",
      ua: "Джин, персиковий настій, сироп розмарину та цитрус.",
      bg: "Джин, прасковена инфузия, сироп от розмарин и цитрус.",
      ru: "Джин, персиковый настой, сироп розмарина и цитрус.",
    },
    allergens: [],
    price: "13.50",
  },
  {
    id: "wine-white-2022",
    category: "wine",
    image:
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=900&q=80",
    title: { en: "Misket Reserve 2022", ua: "Міскет Резерв 2022", bg: "Мискет Резерва 2022", ru: "Мискет Резерв 2022" },
    description: {
      en: "Elegant Bulgarian white wine with floral aroma and mineral finish.",
      ua: "Вишукане болгарське біле вино з квітковим ароматом.",
      bg: "Елегантно българско бяло вино с флорален аромат.",
      ru: "Элегантное болгарское белое вино с цветочным ароматом.",
    },
    allergens: ["Sulphites"],
    price: "11.00",
  },
];

export const menuCategories = [
  { key: "all", label: { en: "All", ua: "Усе", bg: "Всички", ru: "Все" } },
  { key: "breakfast", label: { en: "Breakfast", ua: "Сніданки", bg: "Закуска", ru: "Завтраки" } },
  { key: "salads", label: { en: "Salads", ua: "Салати", bg: "Салати", ru: "Салаты" } },
  { key: "mains", label: { en: "Mains", ua: "Основні", bg: "Основни", ru: "Основные" } },
  { key: "desserts", label: { en: "Desserts", ua: "Десерти", bg: "Десерти", ru: "Десерты" } },
  { key: "coffee", label: { en: "Coffee", ua: "Кава", bg: "Кафе", ru: "Кофе" } },
  { key: "cocktails", label: { en: "Cocktails", ua: "Коктейлі", bg: "Коктейли", ru: "Коктейли" } },
  { key: "wine", label: { en: "Wine", ua: "Вино", bg: "Вино", ru: "Вино" } },
];
