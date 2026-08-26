<!--
  REFERENCE PROTOTYPE — not an approved design or production source.
  The assignee must generate new candidate designs in Penpot; switch references via ?variant=.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import CountertopVariant from './variants/CountertopVariant.vue'
import MarketVariant from './variants/MarketVariant.vue'
import PantryVariant from './variants/PantryVariant.vue'
import { ingredients, matchRecipes, recipes } from './prototype-data'

type VariantKey = 'A' | 'B' | 'C'

const variants: Array<{ key: VariantKey; name: string }> = [
  { key: 'A', name: '厨房台面' },
  { key: 'B', name: '冰箱控制台' },
  { key: 'C', name: '今日菜谱' },
]

const knownIngredientIds = new Set(ingredients.map((ingredient) => ingredient.id))

function readVariant(): VariantKey {
  const value = new URL(window.location.href).searchParams.get('variant')?.toUpperCase()
  return value === 'B' || value === 'C' ? value : 'A'
}

function readSelectedIngredients(): string[] {
  const value = new URL(window.location.href).searchParams.get('ingredients')
  if (!value) return []

  return [...new Set(value.split(',').filter((id) => knownIngredientIds.has(id)))]
}

const currentVariant = ref<VariantKey>(readVariant())
const selectedIds = ref(readSelectedIngredients())
const search = ref('')
const activeRecipeId = ref<string | null>(null)

const selectedIngredients = computed(() =>
  selectedIds.value.flatMap((id) => {
    const ingredient = ingredients.find((item) => item.id === id)
    return ingredient ? [ingredient] : []
  }),
)

const filteredIngredients = computed(() => {
  const keyword = search.value.trim()
  return keyword
    ? ingredients.filter((ingredient) => ingredient.name.includes(keyword))
    : ingredients
})

const results = computed(() => matchRecipes(selectedIds.value))
const activeRecipe = computed(
  () => recipes.find((recipe) => recipe.id === activeRecipeId.value) ?? null,
)
const currentVariantName = computed(
  () => variants.find((variant) => variant.key === currentVariant.value)?.name ?? variants[0].name,
)
const isProduction = import.meta.env.PROD

function writeUrl(): void {
  const url = new URL(window.location.href)
  url.searchParams.set('variant', currentVariant.value)

  if (selectedIds.value.length > 0) {
    url.searchParams.set('ingredients', selectedIds.value.join(','))
  } else {
    url.searchParams.delete('ingredients')
  }

  window.history.replaceState({}, '', url)
}

function toggleIngredient(id: string): void {
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter((selectedId) => selectedId !== id)
    : [...selectedIds.value, id]
  writeUrl()
}

function clearIngredients(): void {
  selectedIds.value = []
  writeUrl()
}

function setVariant(variant: VariantKey): void {
  currentVariant.value = variant
  activeRecipeId.value = null
  writeUrl()
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function cycleVariant(direction: -1 | 1): void {
  const currentIndex = variants.findIndex((variant) => variant.key === currentVariant.value)
  const nextIndex = (currentIndex + direction + variants.length) % variants.length
  const nextVariant = variants[nextIndex]
  if (nextVariant) setVariant(nextVariant.key)
}

function openRecipe(id: string): void {
  activeRecipeId.value = id
}

function closeRecipe(): void {
  activeRecipeId.value = null
}

function syncFromHistory(): void {
  currentVariant.value = readVariant()
  selectedIds.value = readSelectedIngredients()
  activeRecipeId.value = null
}

function handleKeydown(event: KeyboardEvent): void {
  const target = event.target
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  ) {
    return
  }

  if (event.key === 'ArrowLeft') cycleVariant(-1)
  if (event.key === 'ArrowRight') cycleVariant(1)
  if (event.key === 'Escape') closeRecipe()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('popstate', syncFromHistory)
  writeUrl()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('popstate', syncFromHistory)
})
</script>

<template>
  <main class="prototype-shell">
    <CountertopVariant
      v-if="currentVariant === 'A'"
      :ingredients="filteredIngredients"
      :selected-ids="selectedIds"
      :selected-ingredients="selectedIngredients"
      :results="results"
      :search="search"
      :active-recipe="activeRecipe"
      @update:search="search = $event"
      @toggle="toggleIngredient"
      @clear="clearIngredients"
      @open-recipe="openRecipe"
      @close-recipe="closeRecipe"
    />

    <PantryVariant
      v-else-if="currentVariant === 'B'"
      :ingredients="filteredIngredients"
      :selected-ids="selectedIds"
      :selected-ingredients="selectedIngredients"
      :results="results"
      :search="search"
      :active-recipe="activeRecipe"
      @update:search="search = $event"
      @toggle="toggleIngredient"
      @clear="clearIngredients"
      @open-recipe="openRecipe"
      @close-recipe="closeRecipe"
    />

    <MarketVariant
      v-else
      :ingredients="filteredIngredients"
      :selected-ids="selectedIds"
      :selected-ingredients="selectedIngredients"
      :results="results"
      :search="search"
      :active-recipe="activeRecipe"
      @update:search="search = $event"
      @toggle="toggleIngredient"
      @clear="clearIngredients"
      @open-recipe="openRecipe"
      @close-recipe="closeRecipe"
    />

    <aside v-if="!isProduction" class="prototype-switcher" aria-label="原型方案切换">
      <span class="prototype-switcher__tag">PROTOTYPE</span>
      <button type="button" aria-label="上一套方案" @click="cycleVariant(-1)">←</button>
      <span class="prototype-switcher__label">
        <strong>{{ currentVariant }}</strong>
        {{ currentVariantName }}
      </span>
      <button type="button" aria-label="下一套方案" @click="cycleVariant(1)">→</button>
    </aside>
  </main>
</template>
