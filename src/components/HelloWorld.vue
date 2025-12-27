<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const responseText = ref<string>('')
const loading = ref(false)
const error = ref<string>('')

const fetchProducts = async () => {
  loading.value = true
  error.value = ''
  responseText.value = ''
  
  try {
    const endpointResponse = await fetch('/api/products/1')
    if (endpointResponse.ok) {
      const data = await endpointResponse.json()
      responseText.value = JSON.stringify(data, null, 2)
    } else {
      responseText.value = `Erreur: Code HTTP ${endpointResponse.status}`
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    Changez components/HelloWorld.vue pour testez le HMR (Hot Reloading)
  </p>

  <div class="card">  
    <p>Exemple 1 : compteur</p>
    <button type="button" @click="count++">Vous avez cliqué ici {{ count }} fois.</button>
    <hr>
    <p>Exemple 2 : requête à une API (labo 3)</p>
    <button @click="fetchProducts" :disabled="loading">
      {{ loading ? 'Chargement...' : 'Faire une requête à /products/1' }}
    </button>
    <p v-if="error" style="color: red;">
      Erreur: {{ error }}
    </p>
    <pre v-else-if="responseText">
      {{ responseText }}
    </pre>
    <p v-else>
      Réponse: Aucune requête effectuée
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>