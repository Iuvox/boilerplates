import { gtm } from '../../config.json'

const gtmInit = () => {
    if (gtm !== null) {
        if (('gtmInit' in window) === false) {
            (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', gtm)
            window.dataLayer.push({
                event: "pageView",
                to: window.location.href.replace(window.location.origin, '')
            })
            window.gtmInit = true
        }
    }
}

const gtmEvent = (params) => {
    if (!
        import.meta.env.SSR) {
        if ('dataLayer' in window) {
            window.dataLayer.push(params)
        }
    }
}

const pageView = () => {
    gtmInit({
        event: "pageView",
        from: from.path,
        to: to.path
    })
}


export { gtmInit, gtmEvent, pageView }