<script setup lang="ts">
import { computed } from 'vue'

import {
  getRecipeIngredients,
  ingredientAmount,
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

const groupedIngredients = computed(() => {
  const groups = new Map<string, Ingredient[]>()
  for (const ingredient of props.ingredients) {
    const group = groups.get(ingredient.category) ?? []
    group.push(ingredient)
    groups.set(ingredient.category, group)
  }
  return [...groups.entries()]
})

const activeIngredients = computed(() =>
  props.activeRecipe ? getRecipeIngredients(props.activeRecipe) : [],
)

const activeAllergens = computed(() => [
  ...new Set(activeIngredients.value.flatMap((ingredient) => ingredient.allergen ?? [])),
])

function scoreLabel(match: RecipeMatch): string {
  if (props.selectedIds.length === 0)
    return `${match.recipe.prepMinutes + match.recipe.cookMinutes} 分钟`
  if (match.score === 1) return '现在就能做'
  return `已有 ${Math.round(match.score * 100)}%`
}
</script>

<template>
  <div class="countertop">
    <header class="countertop__header">
      <a class="countertop__brand" href="#top" aria-label="随材做首页">
        <span class="countertop__brand-mark">随</span>
        <span>随材做</span>
      </a>
      <p>今天不买菜，也能好好吃饭</p>
      <button class="countertop__pantry-link" type="button" @click="clear">
        清空食材 <span>{{ selectedIds.length }}</span>
      </button>
    </header>

    <section id="top" class="countertop__hero">
      <div class="countertop__hero-copy">
        <span class="countertop__eyebrow">今晚吃什么？</span>
        <h1>打开冰箱，<br /><em>从手边的食材开始。</em></h1>
        <p>选中家里现有的食材，我们会把最容易做成的家常菜排在前面。</p>
        <a class="countertop__start" href="#ingredients">开始选食材 <span>↓</span></a>
      </div>
      <div class="countertop__still-life" aria-hidden="true">
        <span class="countertop__sun"></span>
        <div class="countertop__shelf">
          <span v-for="ingredient in selectedIngredients.slice(0, 5)" :key="ingredient.id">
            {{ ingredient.icon }}
          </span>
          <span v-if="selectedIngredients.length === 0">🍅</span>
          <span v-if="selectedIngredients.length === 0">🥚</span>
          <span v-if="selectedIngredients.length === 0">🥔</span>
        </div>
        <div class="countertop__bowl"></div>
        <small>{{
          selectedIds.length > 0 ? `已放入 ${selectedIds.length} 样食材` : '等你把食材放进来'
        }}</small>
      </div>
    </section>

    <section
      id="ingredients"
      class="countertop__selector"
      aria-labelledby="countertop-selector-title"
    >
      <div class="countertop__section-title">
        <div>
          <span>01 / 我的冰箱</span>
          <h2 id="countertop-selector-title">家里有什么？</h2>
        </div>
        <label class="countertop__search">
          <span aria-hidden="true">⌕</span>
          <span class="sr-only">搜索已有食材</span>
          <input
            :value="search"
            type="search"
            placeholder="搜索 48 种食材"
            @input="emit('update:search', ($event.target as HTMLInputElement).value)"
          />
        </label>
      </div>

      <div v-if="groupedIngredients.length > 0" class="countertop__ingredient-groups">
        <div
          v-for="[category, items] in groupedIngredients"
          :key="category"
          class="countertop__group"
        >
          <h3>{{ category }}</h3>
          <div class="countertop__chips">
            <button
              v-for="ingredient in items"
              :key="ingredient.id"
              type="button"
              :class="{ 'is-selected': selectedIds.includes(ingredient.id) }"
              :aria-pressed="selectedIds.includes(ingredient.id)"
              @click="emit('toggle', ingredient.id)"
            >
              <span>{{ ingredient.icon }}</span>
              {{ ingredient.name }}
              <b aria-hidden="true">{{ selectedIds.includes(ingredient.id) ? '✓' : '+' }}</b>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="prototype-empty">
        <strong>暂未收录“{{ search }}”</strong>
        <p>试试搜索其他常见食材。</p>
      </div>

      <div v-if="selectedIngredients.length > 0" class="countertop__tray">
        <span>我的食材</span>
        <button
          v-for="ingredient in selectedIngredients"
          :key="ingredient.id"
          type="button"
          :aria-label="`移除${ingredient.name}`"
          @click="emit('toggle', ingredient.id)"
        >
          {{ ingredient.icon }} {{ ingredient.name }} ×
        </button>
        <button class="countertop__clear" type="button" @click="emit('clear')">全部清空</button>
      </div>
    </section>

    <section class="countertop__results" aria-labelledby="countertop-result-title">
      <div class="countertop__section-title countertop__section-title--results">
        <div>
          <span>02 / 今晚开饭</span>
          <h2 id="countertop-result-title">
            {{ selectedIds.length === 0 ? '全部菜谱' : `找到 ${results.length} 道合适的菜` }}
          </h2>
        </div>
        <p v-if="selectedIds.length > 0">按“现在最容易做”排序</p>
        <p v-else>先随便看看，也可以从上面挑食材</p>
      </div>

      <div v-if="results.length > 0" class="countertop__recipe-grid">
        <article
          v-for="(match, index) in results"
          :key="match.recipe.id"
          class="countertop__recipe"
          :class="{ 'countertop__recipe--lead': index === 0 }"
          :style="{ '--recipe-tone': match.recipe.tone }"
        >
          <div class="countertop__recipe-visual">
            <span class="countertop__recipe-rank">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="countertop__plate">
              <span
                v-for="ingredient in match.matched.slice(0, 3)"
                :key="ingredient.id"
                :title="ingredient.name"
              >
                {{ ingredient.icon }}
              </span>
              <span v-if="match.matched.length === 0">🍲</span>
            </div>
            <span class="countertop__match">{{ scoreLabel(match) }}</span>
          </div>
          <div class="countertop__recipe-copy">
            <p>{{ match.recipe.note }}</p>
            <h3>{{ match.recipe.name }}</h3>
            <p
              v-if="selectedIds.length > 0 && match.missing.length > 0"
              class="countertop__missing"
            >
              还缺：{{ match.missing.map((item) => item.name).join('、') }}
            </p>
            <p v-else-if="selectedIds.length > 0" class="countertop__ready">食材已经齐了</p>
            <button type="button" @click="emit('open-recipe', match.recipe.id)">
              查看做法 <span>↗</span>
            </button>
          </div>
        </article>
      </div>
      <div v-else class="countertop__no-result">
        <span>🥣</span>
        <h3>这组食材暂时没有合适菜谱</h3>
        <p>换一种食材组合试试看。</p>
      </div>
    </section>

    <footer class="countertop__footer">
      <strong>随材做</strong>
      <p>盐、油和水默认家中已有，不参与匹配。</p>
      <span>UI PROTOTYPE / A</span>
    </footer>

    <div v-if="activeRecipe" class="countertop__detail-backdrop" @click.self="emit('close-recipe')">
      <article
        class="countertop__detail"
        role="dialog"
        aria-modal="true"
        :aria-label="activeRecipe.name"
      >
        <button
          class="countertop__detail-close"
          type="button"
          aria-label="关闭菜谱"
          @click="emit('close-recipe')"
        >
          ×
        </button>
        <header :style="{ '--recipe-tone': activeRecipe.tone }">
          <span>2 人份 · 家常菜</span>
          <h2>{{ activeRecipe.name }}</h2>
          <p>{{ activeRecipe.note }}</p>
          <dl>
            <div>
              <dt>备菜</dt>
              <dd>{{ activeRecipe.prepMinutes }} 分钟</dd>
            </div>
            <div>
              <dt>烹饪</dt>
              <dd>{{ activeRecipe.cookMinutes }} 分钟</dd>
            </div>
          </dl>
        </header>
        <div class="countertop__detail-body">
          <section>
            <span class="countertop__detail-index">01</span>
            <h3>准备食材</h3>
            <ul>
              <li v-for="ingredient in activeIngredients" :key="ingredient.id">
                <span>{{ ingredient.icon }} {{ ingredient.name }}</span>
                <b>{{ ingredientAmount(ingredient) }}</b>
              </li>
            </ul>
            <p v-if="activeAllergens.length > 0" class="countertop__allergen">
              可能含有：{{ activeAllergens.join('、') }}
            </p>
          </section>
          <section>
            <span class="countertop__detail-index">02</span>
            <h3>开始烹饪</h3>
            <ol>
              <li v-for="(step, index) in activeRecipe.steps" :key="step">
                <b>{{ index + 1 }}</b
                ><span>{{ step }}</span>
              </li>
            </ol>
            <small>原型示例内容，正式发布前需进行菜谱与食品安全审核。</small>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>
