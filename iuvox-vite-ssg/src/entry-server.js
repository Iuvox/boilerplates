import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
import path, { basename } from 'path'
import { renderHeadToString } from '@vueuse/head'


export const genHtml = (template, appHtml, preloadLinks, headTags, htmlAttrs, bodyAttrs) => {
    const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`{{html-attrs}}`, htmlAttrs)
        .replace(`{{body-attrs}}`, bodyAttrs)
        .replace(`<!--{{head-tags}}-->`, headTags)
        .replace(`<!--{{ssr-outlet}}-->`, appHtml)
    return html
}



export async function render(url, manifest, template) {
    const { app, router, pinia, head } = createApp()

    // set the router to the desired URL before rendering
    router.push(url)

    await router.isReady()

    // passing SSR context object which will be available via useSSRContext()
    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    // components that have been instantiated during this render call.
    const ctx = {}
    const html = await renderToString(app, ctx) + `<script>window.__PiniaInit__ = ${JSON.stringify(pinia.state.value) }</script>`


    const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)



    // the SSR manifest generated by Vite contains module -> chunk/asset mapping
    // which we can then use to determine what files need to be preloaded for this
    // request.
    const preloadLinks = '' //renderPreloadLinks(ctx.modules, manifest)


    return genHtml(template, html, preloadLinks, headTags, htmlAttrs, bodyAttrs)
}