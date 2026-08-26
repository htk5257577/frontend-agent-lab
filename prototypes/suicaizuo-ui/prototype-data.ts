export interface Ingredient {
  id: string
  name: string
  icon: string
  category: string
  allergen?: '蛋类' | '奶类' | '大豆' | '含麸质谷物' | '花生' | '甲壳类' | '贝类'
}

export interface Recipe {
  id: string
  name: string
  note: string
  prepMinutes: number
  cookMinutes: number
  ingredients: string[]
  steps: string[]
  tone: string
}

export interface RecipeMatch {
  recipe: Recipe
  score: number
  matched: Ingredient[]
  missing: Ingredient[]
}

export const ingredients: Ingredient[] = [
  { id: 'pork', name: '猪里脊', icon: '🥩', category: '肉禽' },
  { id: 'minced-pork', name: '猪肉末', icon: '🥩', category: '肉禽' },
  { id: 'ribs', name: '排骨', icon: '🍖', category: '肉禽' },
  { id: 'chicken-thigh', name: '鸡腿肉', icon: '🍗', category: '肉禽' },
  { id: 'chicken-breast', name: '鸡胸肉', icon: '🍗', category: '肉禽' },
  { id: 'beef', name: '牛肉', icon: '🥩', category: '肉禽' },
  { id: 'shrimp', name: '虾仁', icon: '🍤', category: '水产', allergen: '甲壳类' },
  { id: 'fish', name: '鲜鱼', icon: '🐟', category: '水产' },
  { id: 'squid', name: '鱿鱼', icon: '🦑', category: '水产' },
  { id: 'clams', name: '花甲', icon: '🐚', category: '水产', allergen: '贝类' },
  { id: 'egg', name: '鸡蛋', icon: '🥚', category: '蛋奶豆', allergen: '蛋类' },
  { id: 'tofu', name: '嫩豆腐', icon: '◻️', category: '蛋奶豆', allergen: '大豆' },
  { id: 'dried-tofu', name: '香干', icon: '🟫', category: '蛋奶豆', allergen: '大豆' },
  { id: 'bean-curd-sheet', name: '千张', icon: '📜', category: '蛋奶豆', allergen: '大豆' },
  { id: 'milk', name: '牛奶', icon: '🥛', category: '蛋奶豆', allergen: '奶类' },
  { id: 'tomato', name: '西红柿', icon: '🍅', category: '蔬菜与香料' },
  { id: 'potato', name: '土豆', icon: '🥔', category: '蔬菜与香料' },
  { id: 'eggplant', name: '茄子', icon: '🍆', category: '蔬菜与香料' },
  { id: 'cucumber', name: '黄瓜', icon: '🥒', category: '蔬菜与香料' },
  { id: 'carrot', name: '胡萝卜', icon: '🥕', category: '蔬菜与香料' },
  { id: 'broccoli', name: '西兰花', icon: '🥦', category: '蔬菜与香料' },
  { id: 'spinach', name: '菠菜', icon: '🥬', category: '蔬菜与香料' },
  { id: 'celery', name: '芹菜', icon: '🌿', category: '蔬菜与香料' },
  { id: 'bell-pepper', name: '青椒', icon: '🫑', category: '蔬菜与香料' },
  { id: 'onion', name: '洋葱', icon: '🧅', category: '蔬菜与香料' },
  { id: 'scallion', name: '小葱', icon: '🌱', category: '蔬菜与香料' },
  { id: 'garlic', name: '大蒜', icon: '🧄', category: '蔬菜与香料' },
  { id: 'ginger', name: '生姜', icon: '🫚', category: '蔬菜与香料' },
  { id: 'winter-melon', name: '冬瓜', icon: '🍈', category: '蔬菜与香料' },
  { id: 'pumpkin', name: '南瓜', icon: '🎃', category: '蔬菜与香料' },
  { id: 'green-bean', name: '四季豆', icon: '🫛', category: '蔬菜与香料' },
  { id: 'lettuce', name: '生菜', icon: '🥬', category: '蔬菜与香料' },
  { id: 'napa-cabbage', name: '大白菜', icon: '🥬', category: '蔬菜与香料' },
  { id: 'shiitake', name: '香菇', icon: '🍄', category: '菌菇' },
  { id: 'oyster-mushroom', name: '平菇', icon: '🍄', category: '菌菇' },
  { id: 'enoki', name: '金针菇', icon: '🍄', category: '菌菇' },
  { id: 'wood-ear', name: '木耳', icon: '☁️', category: '菌菇' },
  { id: 'rice', name: '大米', icon: '🍚', category: '主食与干货' },
  { id: 'noodles', name: '面条', icon: '🍜', category: '主食与干货', allergen: '含麸质谷物' },
  { id: 'rice-noodles', name: '米粉', icon: '🍜', category: '主食与干货' },
  { id: 'flour', name: '面粉', icon: '🌾', category: '主食与干货', allergen: '含麸质谷物' },
  { id: 'peanuts', name: '花生', icon: '🥜', category: '主食与干货', allergen: '花生' },
  { id: 'doubanjiang', name: '豆瓣酱', icon: '🥣', category: '关键调味', allergen: '大豆' },
  { id: 'curry', name: '咖喱块', icon: '🟨', category: '关键调味' },
  { id: 'oyster-sauce', name: '蚝油', icon: '🫙', category: '关键调味' },
  { id: 'chili', name: '干辣椒', icon: '🌶️', category: '关键调味' },
  { id: 'soy-sauce', name: '生抽', icon: '🫙', category: '关键调味', allergen: '大豆' },
  { id: 'vinegar', name: '香醋', icon: '🍶', category: '关键调味' },
]

export const recipes: Recipe[] = [
  {
    id: 'tomato-egg',
    name: '番茄炒蛋',
    note: '酸甜下饭，新手也不容易失手',
    prepMinutes: 8,
    cookMinutes: 8,
    ingredients: ['tomato', 'egg'],
    steps: [
      '番茄切块，鸡蛋充分打散。',
      '先把鸡蛋炒至刚凝固后盛出。',
      '炒软番茄，再倒回鸡蛋快速翻匀。',
    ],
    tone: '#e85d35',
  },
  {
    id: 'pepper-pork',
    name: '青椒肉丝',
    note: '锅气十足的经典快手菜',
    prepMinutes: 12,
    cookMinutes: 8,
    ingredients: ['pork', 'bell-pepper', 'soy-sauce'],
    steps: ['里脊和青椒分别切细丝。', '肉丝滑炒至变色后盛出。', '青椒炒香，肉丝回锅调味。'],
    tone: '#4f7b45',
  },
  {
    id: 'mapo-tofu',
    name: '麻婆豆腐',
    note: '麻辣鲜香，拌饭正合适',
    prepMinutes: 10,
    cookMinutes: 15,
    ingredients: ['tofu', 'minced-pork', 'doubanjiang'],
    steps: ['豆腐切块并用温盐水浸泡。', '炒香肉末和豆瓣酱。', '加入豆腐烧入味，轻推避免破碎。'],
    tone: '#bc3527',
  },
  {
    id: 'kung-pao-chicken',
    name: '宫保鸡丁',
    note: '酸甜微辣，花生酥香',
    prepMinutes: 15,
    cookMinutes: 10,
    ingredients: ['chicken-thigh', 'peanuts', 'cucumber', 'chili', 'vinegar'],
    steps: ['鸡腿肉和黄瓜切丁。', '鸡丁炒至表面金黄。', '加入调味汁、黄瓜和花生快速收汁。'],
    tone: '#9d2d20',
  },
  {
    id: 'beef-potato',
    name: '土豆炖牛肉',
    note: '软烂浓香的一锅暖菜',
    prepMinutes: 15,
    cookMinutes: 55,
    ingredients: ['beef', 'potato', 'carrot', 'ginger'],
    steps: [
      '牛肉切块焯水，土豆胡萝卜切滚刀块。',
      '牛肉与姜片炒香后加热水炖煮。',
      '牛肉软烂后加入蔬菜继续炖熟。',
    ],
    tone: '#8d4f34',
  },
  {
    id: 'yuxiang-eggplant',
    name: '鱼香茄子',
    note: '没有鱼，却有熟悉的鱼香味',
    prepMinutes: 12,
    cookMinutes: 15,
    ingredients: ['eggplant', 'doubanjiang', 'garlic', 'vinegar'],
    steps: ['茄子切条，蒜切末。', '茄子煎软后盛出。', '炒香蒜末和豆瓣酱，加入茄子与鱼香汁。'],
    tone: '#653b66',
  },
  {
    id: 'garlic-broccoli',
    name: '蒜蓉西兰花',
    note: '清爽脆嫩，十分钟上桌',
    prepMinutes: 8,
    cookMinutes: 6,
    ingredients: ['broccoli', 'garlic'],
    steps: ['西兰花切小朵并充分清洗。', '沸水快速焯至翠绿。', '蒜末爆香后加入西兰花翻炒。'],
    tone: '#4c7f47',
  },
  {
    id: 'three-earth',
    name: '地三鲜',
    note: '三种蔬菜做出浓郁满足感',
    prepMinutes: 15,
    cookMinutes: 15,
    ingredients: ['potato', 'eggplant', 'bell-pepper', 'garlic'],
    steps: [
      '三种蔬菜切成大小接近的块。',
      '土豆和茄子分别煎至金黄。',
      '加入青椒、蒜末和调味汁快速翻匀。',
    ],
    tone: '#8a5b2f',
  },
  {
    id: 'napa-tofu',
    name: '白菜炖豆腐',
    note: '清淡鲜甜，适合工作日晚餐',
    prepMinutes: 8,
    cookMinutes: 18,
    ingredients: ['napa-cabbage', 'tofu', 'ginger'],
    steps: ['白菜切段，豆腐切厚片。', '姜片炒香后加入白菜梗。', '加水和豆腐炖熟，最后放白菜叶。'],
    tone: '#6a874b',
  },
  {
    id: 'mushroom-chicken-rice',
    name: '香菇鸡肉焖饭',
    note: '饭菜一锅出，省心又饱腹',
    prepMinutes: 15,
    cookMinutes: 35,
    ingredients: ['rice', 'chicken-thigh', 'shiitake', 'carrot', 'soy-sauce'],
    steps: [
      '鸡肉、香菇和胡萝卜切块。',
      '食材炒香后与洗净的大米混合。',
      '按正常煮饭水量焖熟并翻匀。',
    ],
    tone: '#8b5f43',
  },
  {
    id: 'shrimp-egg',
    name: '虾仁滑蛋',
    note: '鲜嫩柔软，轻松补充蛋白质',
    prepMinutes: 10,
    cookMinutes: 7,
    ingredients: ['shrimp', 'egg', 'scallion'],
    steps: ['虾仁擦干，鸡蛋加葱花打散。', '虾仁炒至变色。', '倒入蛋液，小火推炒至刚凝固。'],
    tone: '#d9845b',
  },
  {
    id: 'celery-beef',
    name: '芹菜炒牛肉',
    note: '芹香爽脆，牛肉嫩滑',
    prepMinutes: 15,
    cookMinutes: 8,
    ingredients: ['celery', 'beef', 'ginger', 'soy-sauce'],
    steps: ['牛肉逆纹切片，芹菜切段。', '牛肉大火滑炒至七成熟。', '加入芹菜和姜丝快速炒熟。'],
    tone: '#56734c',
  },
  {
    id: 'green-bean-mince',
    name: '干煸四季豆',
    note: '干香微辣，四季豆务必炒熟',
    prepMinutes: 12,
    cookMinutes: 18,
    ingredients: ['green-bean', 'minced-pork', 'chili', 'garlic'],
    steps: [
      '四季豆去筋并擦干，肉末备好。',
      '先把四季豆煸至表皮起皱并完全熟透。',
      '炒香肉末、辣椒和蒜，再与四季豆炒匀。',
    ],
    tone: '#52652e',
  },
  {
    id: 'curry-chicken',
    name: '咖喱鸡',
    note: '香浓温和，拌米饭很满足',
    prepMinutes: 12,
    cookMinutes: 25,
    ingredients: ['chicken-thigh', 'potato', 'carrot', 'onion', 'curry'],
    steps: [
      '鸡肉和蔬菜切成均匀小块。',
      '炒香洋葱和鸡肉后加入蔬菜及热水。',
      '食材煮熟后关小火融化咖喱块。',
    ],
    tone: '#c78a22',
  },
  {
    id: 'wintermelon-ribs',
    name: '冬瓜排骨汤',
    note: '清润鲜香，适合慢慢炖一锅',
    prepMinutes: 15,
    cookMinutes: 50,
    ingredients: ['winter-melon', 'ribs', 'ginger', 'scallion'],
    steps: ['排骨冷水下锅焯净浮沫。', '排骨与姜片加足量热水炖煮。', '加入冬瓜煮至透明，撒上葱花。'],
    tone: '#8aa697',
  },
  {
    id: 'braised-fish',
    name: '家常红烧鱼',
    note: '咸鲜入味，配一碗白米饭',
    prepMinutes: 12,
    cookMinutes: 22,
    ingredients: ['fish', 'ginger', 'scallion', 'garlic', 'soy-sauce'],
    steps: ['鲜鱼处理干净并擦干表面。', '两面煎定型后加入姜蒜。', '加入调味汁和热水烧熟，撒葱花。'],
    tone: '#9f4b35',
  },
  {
    id: 'onion-egg',
    name: '洋葱炒蛋',
    note: '甜脆柔软，冰箱常备组合',
    prepMinutes: 6,
    cookMinutes: 8,
    ingredients: ['onion', 'egg'],
    steps: ['洋葱切丝，鸡蛋打散。', '鸡蛋炒至刚凝固后盛出。', '洋葱炒软，倒回鸡蛋调味。'],
    tone: '#b8773f',
  },
  {
    id: 'hot-sour-potato',
    name: '酸辣土豆丝',
    note: '爽脆开胃，关键是冲去淀粉',
    prepMinutes: 12,
    cookMinutes: 6,
    ingredients: ['potato', 'chili', 'vinegar'],
    steps: [
      '土豆切细丝并冲洗掉表面淀粉。',
      '辣椒爆香后大火下土豆丝。',
      '沿锅边加入香醋，快速炒匀出锅。',
    ],
    tone: '#c59b3a',
  },
  {
    id: 'oyster-lettuce',
    name: '蚝油生菜',
    note: '清脆鲜亮，五分钟快手菜',
    prepMinutes: 5,
    cookMinutes: 5,
    ingredients: ['lettuce', 'oyster-sauce', 'garlic'],
    steps: ['生菜逐片洗净并沥水。', '快速焯水或大火炒至断生。', '淋上蒜香蚝油汁。'],
    tone: '#4f8444',
  },
  {
    id: 'pumpkin-porridge',
    name: '南瓜粥',
    note: '软糯温暖，早餐晚餐都合适',
    prepMinutes: 8,
    cookMinutes: 35,
    ingredients: ['pumpkin', 'rice'],
    steps: ['大米洗净，南瓜去皮切块。', '大米加足量水煮至开花。', '加入南瓜继续煮至软糯。'],
    tone: '#d18b2e',
  },
  {
    id: 'milk-egg',
    name: '牛奶蒸蛋',
    note: '口感细滑，火候比调味更重要',
    prepMinutes: 8,
    cookMinutes: 12,
    ingredients: ['milk', 'egg'],
    steps: ['鸡蛋与温牛奶搅匀后过筛。', '盖住碗口，水开后转小火蒸。', '中心凝固后关火焖两分钟。'],
    tone: '#c6ab77',
  },
  {
    id: 'garlic-clams',
    name: '蒜香花甲',
    note: '鲜辣多汁，花甲要充分吐沙',
    prepMinutes: 20,
    cookMinutes: 8,
    ingredients: ['clams', 'garlic', 'chili', 'scallion'],
    steps: [
      '花甲充分吐沙并刷洗外壳。',
      '蒜末和辣椒炒香后加入花甲。',
      '加盖焖至全部开口，撒葱花翻匀。',
    ],
    tone: '#a65d47',
  },
  {
    id: 'minced-eggplant',
    name: '肉末茄子',
    note: '软嫩入味，是米饭的好搭档',
    prepMinutes: 12,
    cookMinutes: 16,
    ingredients: ['minced-pork', 'eggplant', 'garlic', 'soy-sauce'],
    steps: ['茄子切条，肉末和蒜末备好。', '茄子煎软后盛出。', '炒散肉末，加入茄子和调味汁收汁。'],
    tone: '#76506f',
  },
  {
    id: 'scallion-noodles',
    name: '葱油拌面',
    note: '材料很少，也能做出稳定香气',
    prepMinutes: 6,
    cookMinutes: 12,
    ingredients: ['noodles', 'scallion', 'soy-sauce'],
    steps: ['小葱切段，用低温油慢慢炸香。', '面条煮熟后充分沥水。', '葱油与生抽调匀，拌入热面。'],
    tone: '#7f6b35',
  },
  {
    id: 'mushroom-tofu-soup',
    name: '双菇豆腐汤',
    note: '鲜味自然，清爽但不单薄',
    prepMinutes: 10,
    cookMinutes: 15,
    ingredients: ['tofu', 'shiitake', 'enoki', 'scallion'],
    steps: [
      '豆腐切块，菌菇清理干净。',
      '香菇先煮出鲜味，再加入豆腐。',
      '最后放金针菇煮熟并撒葱花。',
    ],
    tone: '#8a8161',
  },
]

const amountByIngredient: Record<string, string> = {
  pork: '180 克',
  'minced-pork': '150 克',
  ribs: '400 克',
  'chicken-thigh': '300 克',
  'chicken-breast': '250 克',
  beef: '300 克',
  shrimp: '180 克',
  fish: '1 条（约 500 克）',
  squid: '250 克',
  clams: '500 克',
  egg: '3 个',
  tofu: '1 盒（约 300 克）',
  'dried-tofu': '3 块',
  'bean-curd-sheet': '2 张',
  milk: '200 毫升',
  tomato: '2 个（约 350 克）',
  potato: '2 个（约 400 克）',
  eggplant: '2 根（约 450 克）',
  cucumber: '1 根',
  carrot: '1 根',
  broccoli: '1 颗（约 350 克）',
  spinach: '250 克',
  celery: '200 克',
  'bell-pepper': '2 个',
  onion: '1 个',
  scallion: '2 根',
  garlic: '4 瓣',
  ginger: '4 片',
  'winter-melon': '400 克',
  pumpkin: '350 克',
  'green-bean': '350 克',
  lettuce: '1 颗',
  'napa-cabbage': '400 克',
  shiitake: '6 朵',
  'oyster-mushroom': '200 克',
  enoki: '1 把（约 150 克）',
  'wood-ear': '泡发后 100 克',
  rice: '1 杯（约 150 克）',
  noodles: '200 克',
  'rice-noodles': '200 克',
  flour: '250 克',
  peanuts: '40 克',
  doubanjiang: '1 汤匙',
  curry: '2 小块（约 40 克）',
  'oyster-sauce': '1 汤匙',
  chili: '3 根',
  'soy-sauce': '1.5 汤匙',
  vinegar: '1 汤匙',
}

export function ingredientAmount(ingredient: Ingredient): string {
  return amountByIngredient[ingredient.id] ?? '1 份'
}

export function getRecipeIngredients(recipe: Recipe): Ingredient[] {
  return recipe.ingredients.flatMap((id) => {
    const ingredient = ingredients.find((item) => item.id === id)
    return ingredient ? [ingredient] : []
  })
}

export function matchRecipes(selectedIds: string[]): RecipeMatch[] {
  const selected = new Set(selectedIds)

  const matches = recipes.map((recipe) => {
    const recipeIngredients = getRecipeIngredients(recipe)
    const matched = recipeIngredients.filter((ingredient) => selected.has(ingredient.id))
    const missing = recipeIngredients.filter((ingredient) => !selected.has(ingredient.id))

    return {
      recipe,
      score: selected.size === 0 ? 0 : matched.length / recipeIngredients.length,
      matched,
      missing,
    }
  })

  if (selected.size === 0) {
    return matches.sort((left, right) => left.recipe.name.localeCompare(right.recipe.name, 'zh-CN'))
  }

  const ranked = matches
    .filter((match) => match.matched.length > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.missing.length - right.missing.length ||
        left.recipe.name.localeCompare(right.recipe.name, 'zh-CN'),
    )

  const qualified = ranked.filter((match) => match.score >= 0.5)
  return qualified.length > 0 ? qualified : ranked.slice(0, 3)
}

export const ingredientCategories = [...new Set(ingredients.map((item) => item.category))]
