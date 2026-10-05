// WeatherFlow service worker.
// Bump VERSION on every deploy-facing change so stale caches are purged and
// waiting workers can be swapped in through the update flow.
const VERSION = "weatherflow-v1"
const STATIC_CACHE = `${VERSION}-static`
const RUNTIME_CACHE = `${VERSION}-runtime`

const APP_SHELL = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
]

const API_HOST = "api.openweathermap.org"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)),
  )
  // No skipWaiting here: a new worker waits until the page calls
  // SKIP_WAITING (update toast) so open tabs never swap mid-session.
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== STATIC_CACHE && name !== RUNTIME_CACHE)
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting()
  }
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)

  if (url.host === API_HOST) {
    event.respondWith(networkFirstApi(request))
    return
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request))
    return
  }

  if (url.origin === self.location.origin && isStaticAsset(url, request)) {
    event.respondWith(cacheFirstStatic(request))
    return
  }

  event.respondWith(networkOnly(request))
})

function isStaticAsset(url, request) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    request.destination === "image" ||
    APP_SHELL.includes(url.pathname)
  )
}

// API: always try the network so shown data is fresh; fall back to the cached
// copy (stamped with x-weatherflow-cached-at) when the network is unreachable.
async function networkFirstApi(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE)
      const headers = new Headers(response.headers)
      headers.set("x-weatherflow-cached-at", String(Date.now()))
      const stamped = new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
      cache.put(request, stamped)
      return response
    }
    return response
  } catch (error) {
    const cache = await caches.open(RUNTIME_CACHE)
    const cached = await cache.match(request)
    if (cached) {
      const headers = new Headers(cached.headers)
      headers.set("x-weatherflow-source", "cache")
      return new Response(cached.body, { status: cached.status, statusText: cached.statusText, headers })
    }
    throw error
  }
}

// Navigations: network-first so deploys show up immediately, cached shell when
// offline.
async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, response.clone())
      if (new URL(request.url).pathname === "/") {
        cache.put("/", response.clone())
      }
      return response
    }
    return response
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE)
    const cached = await cache.match(request)
    if (cached) return cached
    const home = await cache.match("/")
    if (home) return home
    const offline = await cache.match("/offline")
    if (offline) return offline
    throw error
  }
}

// Hashed Next.js assets and icons: cache-first, they are immutable per build.
async function cacheFirstStatic(request) {
  const cache = await caches.open(STATIC_CACHE)
  const cached = await cache.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    if (request.destination === "image") {
      const icon = await cache.match("/icon-192.png")
      if (icon) return icon
    }
    throw error
  }
}

// Cross-origin subresources (analytics, etc.): pass through, never block offline.
async function networkOnly(request) {
  try {
    return await fetch(request)
  } catch (error) {
    return new Response("", { status: 204, statusText: "Offline" })
  }
}
