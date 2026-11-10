(function() {
    var root = document.documentElement;

    function get(k) { try { return localStorage.getItem(k) } catch (e) { return null } }

    function set(k, v) { try { localStorage.setItem(k, v) } catch (e) {} }

    /* ---------- Idioma ---------- */
    var T = {
        es: {
            title: "ClickApp CRM · Elige tu industria",
            desc: "ClickApp CRM para audiovisual, derecho, artistas, diseño, marketing y bienes raíces. Elige tu industria y conoce la solución. Por DeleClick Marketing.",
            navLandings: "Industrias",
            navPortfolio: "Portafolio",
            h1: "Una plataforma. Seis industrias.",
            lead: "ClickApp CRM reúne clientes, proveedores y proyectos en un solo lugar. Elige tu sector y conoce cómo se aplica a tu trabajo.",
            ctaMain: "Ver industrias",
            ctaAlt: "Ver portafolio",
            view: "Ver landing",
            more: "Conocer más",
            secTitle: "Encuentra la solución para tu industria",
            secSub: "Cada industria tiene su propia página con la información de ClickApp CRM pensada para ella.",
            projTitle: "Portafolio",
            projSub: "ClickApp es un sistema CRM a la medida, que integra en una sola plataforma la gestión de clientes, ventas, proyectos, compras, tareas, campañas, reportes y mucho más. Diseñado para adaptarse a la forma de trabajar de tu empresa, automatiza procesos, centraliza la información y mejora la productividad de tu equipo.",
            projCta: "Ver más",
            devBy: "Desarrollado por Dynamic Advance S.A.",
            terms: "Términos y condiciones",
            privacy: "Políticas de privacidad",
            site: "Ir a deleclick.com",
            t_audiovisual: "Audiovisual",
            t_derecho: "Derecho",
            t_artistas: "Artistas",
            t_diseno: "Diseño",
            t_marketing: "Marketing",
            t_bienesraices: "Bienes raíces",
            s_audiovisual: "Del guion al llamado, todo en orden.",
            s_derecho: "Para despachos y profesionales del derecho.",
            s_artistas: "Para artistas y creadores independientes.",
            s_diseno: "Para estudios y profesionales del diseño.",
            s_marketing: "Para agencias y equipos de marketing.",
            s_bienesraices: "Para corredores y empresas de bienes raíces.",
            d_audiovisual: "Escenas, jornadas, recursos, citaciones y presupuesto de tu producción en un solo sistema.",
            d_derecho: "ClickApp CRM para despachos y profesionales del derecho.",
            d_artistas: "ClickApp CRM para artistas y creadores independientes.",
            d_diseno: "ClickApp CRM para estudios y profesionales del diseño.",
            d_marketing: "ClickApp CRM para agencias y equipos de marketing.",
            d_bienesraices: "ClickApp CRM para corredores y empresas de bienes raíces.",
            logoLabel: "DeleClick Marketing, ir al sitio principal",
            langLabel: "Cambiar idioma a inglés",
            themeLabel: "Cambiar entre tema claro y oscuro"
        },
        en: {
            title: "ClickApp CRM · Choose your industry",
            desc: "ClickApp CRM for audiovisual, law, artists, design, marketing and real estate. Choose your industry and discover the solution. By DeleClick Marketing.",
            navLandings: "Industries",
            navPortfolio: "Portfolio",
            h1: "One platform. Six industries.",
            lead: "ClickApp CRM brings clients, suppliers and projects together in one place. Pick your field and see how it fits your work.",
            ctaMain: "See industries",
            ctaAlt: "View portfolio",
            view: "View landing page",
            more: "Learn more",
            secTitle: "Find the solution for your industry",
            secSub: "Each industry has its own page with ClickApp CRM information made for it.",
            projTitle: "Portfolio",
            projSub: "ClickApp is a custom CRM system that integrates customer, sales, project, purchasing, task, and campaign management—along with reporting and much more—into a single platform. Designed to adapt to the way your company works, it automates processes, centralizes information, and boosts your team's productivity.",
            projCta: "See more",
            devBy: "Developed by Dynamic Advance S.A.",
            terms: "Terms and conditions",
            privacy: "Privacy policy",
            site: "Go to deleclick.com",
            t_audiovisual: "Audiovisual",
            t_derecho: "Law",
            t_artistas: "Artists",
            t_diseno: "Design",
            t_marketing: "Marketing",
            t_bienesraices: "Real estate",
            s_audiovisual: "From script to call sheet, everything in order.",
            s_derecho: "For law firms and legal professionals.",
            s_artistas: "For artists and independent creators.",
            s_diseno: "For design studios and professionals.",
            s_marketing: "For agencies and marketing teams.",
            s_bienesraices: "For real estate agents and companies.",
            d_audiovisual: "Scenes, shooting days, resources, call times and budget for your production in one system.",
            d_derecho: "ClickApp CRM for law firms and legal professionals.",
            d_artistas: "ClickApp CRM for artists and independent creators.",
            d_diseno: "ClickApp CRM for design studios and professionals.",
            d_marketing: "ClickApp CRM for agencies and marketing teams.",
            d_bienesraices: "ClickApp CRM for real estate agents and companies.",
            logoLabel: "DeleClick Marketing, go to main site",
            langLabel: "Switch language to Spanish",
            themeLabel: "Switch between light and dark theme"
        }
    };
    var lang = get("lang") || ((navigator.language || "es").toLowerCase().indexOf("en") === 0 ? "en" : "es");

    function applyLang(l) {
        lang = l;
        var d = T[l];
        root.lang = l === "en" ? "en" : "es-CR";
        document.title = d.title;
        document.querySelector('meta[name="description"]').setAttribute("content", d.desc);
        document.querySelectorAll("[data-i18n]").forEach(function(e) { e.textContent = d[e.getAttribute("data-i18n")] });
        document.querySelectorAll("[data-i18n-aria]").forEach(function(e) { e.setAttribute("aria-label", d[e.getAttribute("data-i18n-aria")]) });
        document.getElementById("langTxt").textContent = l === "en" ? "ES" : "EN";
    }
    document.getElementById("lang").addEventListener("click", function() {
        var n = lang === "es" ? "en" : "es";
        set("lang", n);
        applyLang(n)
    });

    /* ---------- Tema ---------- */
    var saved = get("theme");
    if (saved) root.setAttribute("data-theme", saved);
    document.getElementById("theme").addEventListener("click", function() {
        var cur = root.getAttribute("data-theme");
        var dark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
        var n = dark ? "light" : "dark";
        root.setAttribute("data-theme", n);
        set("theme", n);
    });

    /* ---------- Carrusel de fondo (automático, sin controles) ---------- */
    var imgs = document.querySelectorAll("#bg img"),
        n = imgs.length,
        i = 0,
        t = null;

    function show(k) { for (var j = 0; j < n; j++) imgs[j].classList.toggle("on", j === k) }

    function start() {
        stop();
        t = setInterval(function() {
            i = (i + 1) % n;
            show(i)
        }, 5000)
    }

    function stop() {
        if (t) {
            clearInterval(t);
            t = null
        }
    }
    show(0);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && n > 1) {
        start();
        document.addEventListener("visibilitychange", function() { document.hidden ? stop() : start() });
    }

    document.getElementById("yr").textContent = new Date().getFullYear();
    applyLang(lang);
    start();
})();