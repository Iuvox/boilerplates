import { createApp } from './main'

const { app, router, pinia } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    pinia.state.value = window.__PiniaInit__
    app.mount('#app')
})

