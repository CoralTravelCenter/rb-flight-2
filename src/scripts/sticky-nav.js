import {hostReactAppReady} from "../utils/utils.js";

export default async function initStickyNav() {
    await hostReactAppReady();
    const stickyNav = document.querySelector('[data-sticky-nav]');
    if (!stickyNav) return;

    const stickyNavParent = stickyNav.closest('div[class*="LayoutContainer_container__"]');
    if (!stickyNavParent) return;

    stickyNavParent.classList.add('sticky-container');

    const links = Array.from(stickyNav.querySelectorAll('.sticky-nav__link[href^="#"]'));
    if (!links.length) return;

    const ACTIVE_CLASS = "sticky-nav__link--active";
    const HIDDEN_CLASS = "sticky-nav--hidden";

    const sectionToLink = new Map();
    const sections = [];
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const section = document.querySelector(href);
        if (!section) return;
        sections.push(section);
        sectionToLink.set(section, link);
    });

    const setActiveLink = (link) => {
        links.forEach((item) => {
            item.classList.toggle(ACTIVE_CLASS, item === link);
        });
    };

    stickyNav.addEventListener("click", (e) => {
        const link = e.target.closest(".sticky-nav__link");
        if (!link || !stickyNav.contains(link)) return;
        setActiveLink(link);
    });

    setActiveLink(links[0]);

    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries.find((item) => item.isIntersecting);
                if (!entry) return;
                const link = sectionToLink.get(entry.target);
                if (link) setActiveLink(link);
            },
            {
                threshold: .3,
            },
        );

        sections.forEach((section) => observer.observe(section));
    }

    const hotelsSection = document.getElementById("hotels-set");
    if ("IntersectionObserver" in window && hotelsSection) {
        const hideObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                stickyNav.classList.toggle(HIDDEN_CLASS, entry.isIntersecting);
            },
            {threshold: .1},
        );
        hideObserver.observe(hotelsSection);
    }
}
