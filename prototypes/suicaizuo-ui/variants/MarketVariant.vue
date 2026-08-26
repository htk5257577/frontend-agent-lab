<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import {
  getRecipeIngredients,
  ingredientAmount,
  ingredientCategories,
  type Ingredient,
  type Recipe,
  type RecipeMatch,
} from '../prototype-data'

const props = defineProps<{
  ingredients: Ingredient[]
  selectedIds: string[]
  selectedIngredients: Ingredient[]
  results: RecipeMatch[]
  search: string
  activeRecipe: Recipe | null
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  toggle: [id: string]
  clear: []
  'open-recipe': [id: string]
  'close-recipe': []
}>()

const activeCategory = ref('全部')

const visibleIngredients = computed(() => {
  if (props.search.trim() || activeCategory.value === '全部') return props.ingredients
  return props.ingredients.filter((ingredient) => ingredient.category === activeCategory.value)
})

const activeIngredients = computed(() =>
  props.activeRecipe ? getRecipeIngredients(props.activeRecipe) : [],
)

const activeAllergens = computed(() => [
  ...new Set(activeIngredients.value.flatMap((ingredient) => ingredient.allergen ?? [])),
])

watch(
  () => props.search,
  (value) => {
    if (value.trim()) activeCategory.value = '全部'
  },
)

function resultCaption(match: RecipeMatch): string {
  if (props.selectedIds.length === 0)
    return `${match.recipe.prepMinutes + match.recipe.cookMinutes} 分钟完成`
  if (match.score === 1) return '食材刚刚好，今晚就做它'
  return `还差 ${match.missing.map((item) => item.name).join('、')}`
}
</script>

<template>
  <div class="market">
    <header class="market__header">
      <a href="#market-top" class="market__logo">随材做<span>。</span></a>
      <nav aria-label="页面导航">
        <a href="#market-pantry">选食材</a>
        <a href="#market-recipes">看菜谱</a>
      </nav>
      <p>第 01 期<br /><span>家常食材特刊</span></p>
    </header>

    <section id="market-top" class="market__hero">
      <div class="market__hero-title">
        <span>COOK WITH WHAT YOU HAVE</span>
        <h1>今天，<br />冰箱里有<br /><em>什么好吃的？</em></h1>
      </div>
      <div class="market__hero-note">
        <span>不用列购物清单</span>
        <p>从已经拥有的食材出发，把“吃什么”变成一个轻松的小选择。</p>
        <a href="#market-pantry">去逛食材摊位 ↘</a>
      </div>
      <div class="market__produce-poster" aria-hidden="true">
        <div class="market__poster-stamp">新鲜<br />组合</div>
        <span
          v-for="(ingredient, index) in selectedIngredients.slice(0, 6)"
          :key="ingredient.id"
          :class="`market__poster-item--${index}`"
          :style="{ '--i': index }"
        >
          {{ ingredient.icon }}
        </span>
        <template v-if="selectedIngredients.length === 0">
          <span class="market__poster-item--0" style="--i: 0">🍅</span
          ><span class="market__poster-item--1" style="--i: 1">🥦</span
          ><span class="market__poster-item--2" style="--i: 2">🥚</span>
          <span class="market__poster-item--3" style="--i: 3">🍆</span
          ><span class="market__poster-item--4" style="--i: 4">🥕</span>
        </template>
        <strong>{{ selectedIds.length > 0 ? selectedIds.length : '48' }}</strong>
        <small>{{ selectedIds.length > 0 ? '样已选食材' : '种日常食材' }}</small>
      </div>
    </section>

    <section id="market-pantry" class="market__pantry" aria-labelledby="market-pantry-title">
      <div class="market__section-kicker">
        <span>01</span>
        <p>YOUR PANTRY<br />今日食材摊</p>
      </div>
      <div class="market__pantry-main">
        <div class="market__pantry-head">
          <div>
            <h2 id="market-pantry-title">挑出家里有的</h2>
            <p>盐、油和水默认已经备好。</p>
          </div>
          <label class="market__search">
            <span class="sr-only">搜索已有食材</span>
            <input
              :value="search"
              type="search"
              placeholder="找一种食材……"
              @input="emit('update:search', ($event.target as HTMLInputElement).value)"
            />
            <span>搜索</span>
          </label>
        </div>

        <div class="market__categories" aria-label="食材分类">
          <button
            v-for="category in ['全部', ...ingredientCategories]"
            :key="category"
            type="button"
            :class="{ 'is-active': activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div v-if="visibleIngredients.length > 0" class="market__produce-grid">
          <button
            v-for="(ingredient, index) in visibleIngredients"
            :key="ingredient.id"
            type="button"
            :class="{ 'is-selected': selectedIds.includes(ingredient.id) }"
            :aria-pressed="selectedIds.includes(ingredient.id)"
            @click="emit('toggle', ingredient.id)"
          >
            <span class="market__produce-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="market__produce-icon">{{ ingredient.icon }}</span>
            <strong>{{ ingredient.name }}</strong>
            <small>{{ ingredient.category }}</small>
            <i>{{ selectedIds.includes(ingredient.id) ? '已放入' : '放进篮子' }}</i>
          </button>
        </div>
        <div v-else class="market__empty">
          <span>本摊暂无</span>
          <h3>暂未收录“{{ search }}”</h3>
          <p>试试更短的中文食材名。</p>
        </div>
      </div>
    </section>

    <div class="market__basket" :class="{ 'is-empty': selectedIngredients.length === 0 }">
      <span>我的菜篮 / {{ selectedIds.length }}</span>
      <div>
        <button
          v-for="ingredient in selectedIngredients"
          :key="ingredient.id"
          type="button"
          @click="emit('toggle', ingredient.id)"
        >
          {{ ingredient.icon }} {{ ingredient.name }} ×
        </button>
        <p v-if="selectedIngredients.length === 0">还是空的，随便挑几样吧</p>
      </div>
      <button type="button" :disabled="selectedIds.length === 0" @click="emit('clear')">
        倒空菜篮
      </button>
    </div>

    <section id="market-recipes" class="market__recipes" aria-labelledby="market-recipe-title">
      <div class="market__recipes-head">
        <div class="market__section-kicker">
          <span>02</span>
          <p>TONIGHT'S MENU<br />今晚推荐</p>
        </div>
        <div>
          <p>
            {{ selectedIds.length === 0 ? '从 24 道家常菜里慢慢逛' : '按照现有食材的可做程度排列' }}
          </p>
          <h2 id="market-recipe-title">
            {{ selectedIds.length === 0 ? '全部菜谱' : '最接近开饭的选择' }}
          </h2>
        </div>
      </div>

      <div v-if="results.length > 0" class="market__recipe-editorial">
        <article
          v-if="results[0]"
          class="market__cover"
          :style="{ '--recipe-tone': results[0].recipe.tone }"
        >
          <div class="market__cover-art">
            <span class="market__cover-label">EDITOR'S CHOICE</span>
            <div class="market__cover-ingredients">
              <span v-for="ingredient in results[0].matched.slice(0, 4)" :key="ingredient.id">{{
                ingredient.icon
              }}</span>
              <span v-if="results[0].matched.length === 0">🍲</span>
            </div>
            <b>{{
              selectedIds.length === 0 ? '今日' : `${Math.round(results[0].score * 100)}%`
            }}</b>
          </div>
          <div class="market__cover-copy">
            <span>NO. 01 / 两人份</span>
            <h3>{{ results[0].recipe.name }}</h3>
            <p>{{ results[0].recipe.note }}</p>
            <strong>{{ resultCaption(results[0]) }}</strong>
            <button type="button" @click="emit('open-recipe', results[0].recipe.id)">
              翻开菜谱 <span>↗</span>
            </button>
          </div>
        </article>

        <div class="market__story-list">
          <article
            v-for="(match, index) in results.slice(1)"
            :key="match.recipe.id"
            :style="{ '--recipe-tone': match.recipe.tone }"
          >
            <span class="market__story-index">{{ String(index + 2).padStart(2, '0') }}</span>
            <div class="market__story-visual" aria-hidden="true">
              <span v-for="ingredient in match.matched.slice(0, 3)" :key="ingredient.id">{{
                ingredient.icon
              }}</span>
              <span v-if="match.matched.length === 0">🥢</span>
            </div>
            <div class="market__story-copy">
              <small>{{ match.recipe.prepMinutes + match.recipe.cookMinutes }} 分钟 · 2 人份</small>
              <h3>{{ match.recipe.name }}</h3>
              <p>{{ match.recipe.note }}</p>
              <strong>{{ resultCaption(match) }}</strong>
            </div>
            <button
              type="button"
              :aria-label="`查看${match.recipe.name}`"
              @click="emit('open-recipe', match.recipe.id)"
            >
              阅读<br />做法 ↗
            </button>
          </article>
        </div>
      </div>

      <div v-else class="market__empty market__empty--recipes">
        <span>今天还没对上</span>
        <h3>换几样食材，再来逛一圈</h3>
      </div>
    </section>

    <footer class="market__footer">
      <p>吃掉已有的，减少一点浪费。</p>
      <strong>随材做。</strong>
      <span>UI DIRECTION C / PROTOTYPE</span>
    </footer>

    <div v-if="activeRecipe" class="market__detail-backdrop" @click.self="emit('close-recipe')">
      <article
        class="market__detail"
        role="dialog"
        aria-modal="true"
        :aria-label="activeRecipe.name"
      >
        <button class="market__detail-close" type="button" @click="emit('close-recipe')">
          关闭 ×
        </button>
        <header :style="{ '--recipe-tone': activeRecipe.tone }">
          <div>
            <span>今晚的菜谱 / RECIPE NOTE</span>
            <h2>{{ activeRecipe.name }}</h2>
            <p>{{ activeRecipe.note }}</p>
          </div>
          <div class="market__detail-time">
            <span
              ><b>{{ activeRecipe.prepMinutes }}</b> 分钟备菜</span
            >
            <i></i>
            <span
              ><b>{{ activeRecipe.cookMinutes }}</b> 分钟烹饪</span
            >
          </div>
        </header>
        <div class="market__detail-spread">
          <section>
            <span class="market__detail-label">左页 / 食材</span>
            <h3>两人份，刚刚好</h3>
            <ul>
              <li v-for="ingredient in activeIngredients" :key="ingredient.id">
                <span
                  ><i>{{ ingredient.icon }}</i
                  >{{ ingredient.name }}</span
                >
                <b>{{ ingredientAmount(ingredient) }}</b>
              </li>
            </ul>
            <p v-if="activeAllergens.length > 0" class="market__allergen">
              过敏原提示：可能含有{{ activeAllergens.join('、') }}
            </p>
          </section>
          <section>
            <span class="market__detail-label">右页 / 做法</span>
            <h3>慢一点，也不会难</h3>
            <ol>
              <li v-for="(step, index) in activeRecipe.steps" :key="step">
                <b>{{ index + 1 }}</b>
                <p>{{ step }}</p>
              </li>
            </ol>
            <footer>菜谱为原型示例，正式发布前需完成内容与食品安全审核。</footer>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>
