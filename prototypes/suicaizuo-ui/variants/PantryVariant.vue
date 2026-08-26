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

function matchPercent(match: RecipeMatch): number {
  return props.selectedIds.length === 0 ? 100 : Math.round(match.score * 100)
}
</script>

<template>
  <div class="pantry">
    <header class="pantry__topbar">
      <div class="pantry__brand">
        <span>SCZ</span>
        <strong>随材做</strong>
        <small>厨房决策台</small>
      </div>
      <div class="pantry__system-status">
        <span><i></i> 本地菜谱库已就绪</span>
        <b>24 RECIPES / 48 INGREDIENTS</b>
      </div>
    </header>

    <div class="pantry__workspace">
      <aside class="pantry__inventory">
        <div class="pantry__inventory-head">
          <span>01 / INVENTORY</span>
          <h1>冰箱库存</h1>
          <p>勾选手边真实拥有的食材。</p>
        </div>

        <label class="pantry__search">
          <span>⌕</span>
          <span class="sr-only">搜索已有食材</span>
          <input
            :value="search"
            type="search"
            placeholder="输入中文食材名"
            @input="emit('update:search', ($event.target as HTMLInputElement).value)"
          />
          <kbd>/</kbd>
        </label>

        <div v-if="groupedIngredients.length > 0" class="pantry__ingredient-list">
          <section v-for="[category, items] in groupedIngredients" :key="category">
            <h2>
              <span>{{ category }}</span
              ><b>{{ String(items.length).padStart(2, '0') }}</b>
            </h2>
            <button
              v-for="ingredient in items"
              :key="ingredient.id"
              type="button"
              :class="{ 'is-selected': selectedIds.includes(ingredient.id) }"
              :aria-pressed="selectedIds.includes(ingredient.id)"
              @click="emit('toggle', ingredient.id)"
            >
              <span class="pantry__check">{{
                selectedIds.includes(ingredient.id) ? '✓' : ''
              }}</span>
              <span class="pantry__ingredient-icon">{{ ingredient.icon }}</span>
              <strong>{{ ingredient.name }}</strong>
              <small>{{ ingredient.allergen ?? '常规' }}</small>
            </button>
          </section>
        </div>
        <div v-else class="pantry__search-empty">
          <b>NO ENTRY</b>
          <p>暂未收录“{{ search }}”</p>
        </div>

        <footer class="pantry__inventory-footer">
          <div>
            <span>已选库存</span><strong>{{ selectedIds.length }}</strong
            ><small>/ 48</small>
          </div>
          <button type="button" :disabled="selectedIds.length === 0" @click="emit('clear')">
            全部清空
          </button>
        </footer>
      </aside>

      <section class="pantry__main">
        <template v-if="!activeRecipe">
          <div class="pantry__main-head">
            <div>
              <span>02 / MATCH QUEUE</span>
              <h2>{{ selectedIds.length === 0 ? '全部菜谱' : '可执行菜谱' }}</h2>
            </div>
            <div class="pantry__selected-strip">
              <span v-if="selectedIngredients.length === 0">等待选择库存</span>
              <button
                v-for="ingredient in selectedIngredients"
                :key="ingredient.id"
                type="button"
                :aria-label="`移除${ingredient.name}`"
                @click="emit('toggle', ingredient.id)"
              >
                {{ ingredient.icon }} {{ ingredient.name }} ×
              </button>
            </div>
          </div>

          <div v-if="results.length > 0" class="pantry__queue">
            <article
              v-if="results[0]"
              class="pantry__primary-match"
              :style="{ '--recipe-tone': results[0].recipe.tone }"
            >
              <div class="pantry__primary-score">
                <span>TOP MATCH</span>
                <strong>{{ matchPercent(results[0]) }}</strong>
                <small>%</small>
                <i :style="{ '--score': `${matchPercent(results[0])}%` }"></i>
              </div>
              <div class="pantry__primary-copy">
                <p>{{ results[0].recipe.note }}</p>
                <h3>{{ results[0].recipe.name }}</h3>
                <dl>
                  <div>
                    <dt>总耗时</dt>
                    <dd>{{ results[0].recipe.prepMinutes + results[0].recipe.cookMinutes }} min</dd>
                  </div>
                  <div>
                    <dt>缺少</dt>
                    <dd>{{ results[0].missing.length }} items</dd>
                  </div>
                  <div>
                    <dt>份量</dt>
                    <dd>2 人</dd>
                  </div>
                </dl>
                <p
                  v-if="selectedIds.length > 0 && results[0].missing.length > 0"
                  class="pantry__missing"
                >
                  待补充 / {{ results[0].missing.map((item) => item.name).join('、') }}
                </p>
                <p v-else-if="selectedIds.length > 0" class="pantry__available">
                  ● 库存完整，可以开始
                </p>
                <button type="button" @click="emit('open-recipe', results[0].recipe.id)">
                  打开操作清单 <span>→</span>
                </button>
              </div>
              <div class="pantry__primary-visual" aria-hidden="true">
                <span v-for="ingredient in results[0].matched.slice(0, 4)" :key="ingredient.id">
                  {{ ingredient.icon }}
                </span>
                <span v-if="results[0].matched.length === 0">🍲</span>
              </div>
            </article>

            <div class="pantry__queue-header" aria-hidden="true">
              <span>顺位</span><span>菜谱 / 状态</span><span>匹配度</span><span>耗时</span
              ><span></span>
            </div>
            <article
              v-for="(match, index) in results.slice(1)"
              :key="match.recipe.id"
              class="pantry__queue-row"
            >
              <span class="pantry__queue-rank">{{ String(index + 2).padStart(2, '0') }}</span>
              <div>
                <h3>{{ match.recipe.name }}</h3>
                <p v-if="selectedIds.length > 0 && match.missing.length > 0">
                  缺 {{ match.missing.map((item) => item.name).join('、') }}
                </p>
                <p v-else>{{ match.recipe.note }}</p>
              </div>
              <div class="pantry__bar">
                <i :style="{ width: `${matchPercent(match)}%` }"></i>
                <span>{{ matchPercent(match) }}%</span>
              </div>
              <time>{{ match.recipe.prepMinutes + match.recipe.cookMinutes }} min</time>
              <button
                type="button"
                :aria-label="`查看${match.recipe.name}`"
                @click="emit('open-recipe', match.recipe.id)"
              >
                ↗
              </button>
            </article>
          </div>

          <div v-else class="pantry__no-result">
            <b>NO MATCH</b>
            <h3>当前组合暂无可执行菜谱</h3>
            <p>取消一个食材，或换一组库存再试。</p>
          </div>
        </template>

        <article v-else class="pantry__detail">
          <header>
            <button type="button" @click="emit('close-recipe')">← 返回匹配队列</button>
            <div><span>COOK MODE</span><i></i><small>2 人份</small></div>
          </header>
          <div class="pantry__detail-title" :style="{ '--recipe-tone': activeRecipe.tone }">
            <div>
              <span>当前操作清单</span>
              <h2>{{ activeRecipe.name }}</h2>
              <p>{{ activeRecipe.note }}</p>
            </div>
            <dl>
              <div>
                <dt>PREP</dt>
                <dd>{{ activeRecipe.prepMinutes }}<small>min</small></dd>
              </div>
              <div>
                <dt>COOK</dt>
                <dd>{{ activeRecipe.cookMinutes }}<small>min</small></dd>
              </div>
            </dl>
          </div>
          <div class="pantry__detail-grid">
            <section>
              <header>
                <span>01</span>
                <h3>食材核对</h3>
                <b>{{ activeIngredients.length }} ITEMS</b>
              </header>
              <ul>
                <li v-for="ingredient in activeIngredients" :key="ingredient.id">
                  <i>{{ ingredient.icon }}</i>
                  <span
                    >{{ ingredient.name
                    }}<small>{{ ingredient.allergen ?? '常规食材' }}</small></span
                  >
                  <b>{{ ingredientAmount(ingredient) }}</b>
                </li>
              </ul>
              <p v-if="activeAllergens.length > 0" class="pantry__allergen">
                ! 过敏原提示 / {{ activeAllergens.join('、') }}
              </p>
            </section>
            <section>
              <header>
                <span>02</span>
                <h3>烹饪步骤</h3>
                <b>{{ activeRecipe.steps.length }} STEPS</b>
              </header>
              <ol>
                <li v-for="(step, index) in activeRecipe.steps" :key="step">
                  <b>{{ String(index + 1).padStart(2, '0') }}</b>
                  <p>{{ step }}</p>
                  <span>未完成</span>
                </li>
              </ol>
              <footer>原型示例数据 / 正式发布前需完成内容与食品安全审核</footer>
            </section>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>
