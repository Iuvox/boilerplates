import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import { gtmEvent } from '../plugins/gtm'

const components = {
    home: () =>
        import ('/src/views/HomeView.vue'),
}

const routes = [{
        path: '/',
        name: 'Home',
        component: components.home
    },
]


const createRouter = () => {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition && !
                import.meta.env.SSR) {
                return savedPosition
            } else {
                return { top: 0 }
            }
        }
    })
}

const routerBeforeEach = async(to, from) => {}

const routerAfterEach = (to, from) => {}

export { createRouter, routerBeforeEach, routerAfterEach, components, routes }