const CACHE_NAME = "weather-app-v1"
const STATIC_CACHE = "weather-static-v1"
const API_CACHE = "weather-api-v1"

// Static assets to cache
const STATIC_ASSETS = ["/", "/manifest.json", "/offline"]

// API endpoints to cache
const API_ENDPOINTS = [
  "https://api.openweathermap.org/data/2.5/weather",
  "https://api.openweathermap.org/data/2.5/forecast",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      }),
      caches.open(API_CACHE).then((cache) => {
        // Pre-cache will be handled by fetch events
        return Promise.resolve()
      }),
    ]),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests with stale-while-revalidate
  if (API_ENDPOINTS.some((endpoint) => request.url.includes(endpoint))) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Handle static assets with cache-first
  if (
    request.destination === "document" ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image"
  ) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Default to network-first for other requests
  event.respondWith(networkFirst(request))
})

// Cache-first strategy for static assets
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)

  if (cached) {
    return cached
  }

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    // Return offline page for navigation requests
    if (request.destination === "document") {
      return cache.match("/offline") || new Response("Offline", { status: 503 })
    }
    throw error
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }
    throw error
  }
}

// Stale-while-revalidate strategy for API calls
async function staleWhileRevalidate(request) {
  const cache = await caches.open(API_CACHE)
  const cached = await cache.match(request)

  // Fetch fresh data in the background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => {
      // If network fails, we'll use cached version
      return null
    })

  // Return cached version immediately if available, otherwise wait for network
  if (cached) {
    return cached
  }

  return fetchPromise || new Response("Network error", { status: 503 })
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "weather-sync") {
    event.waitUntil(syncWeatherData())
  }
})

async function syncWeatherData() {
  // Sync any pending weather data requests
  const cache = await caches.open(API_CACHE)
  // Implementation would depend on specific sync requirements
}
