const setActiveNav = (
  id: string | null,
  navItems: NodeListOf<Element>,
  sections: NodeListOf<Element>,
) => {
  navItems.forEach((item) => {
    const isActive = item.getAttribute("data-target") === id;
    const icon = item.querySelector("svg");
    const a = "bg-navy text-white shadow-brand".split(" ");
    const r = "text-navy/60 hover:bg-surface hover:text-navy".split(" ");

    item.classList[isActive ? "add" : "remove"](...a);
    item.classList[isActive ? "remove" : "add"](...r);
    if (icon) {
      icon.classList[isActive ? "add" : "remove"]("text-white");
      icon.classList[isActive ? "remove" : "add"](
        "text-navy/30",
        "group-hover/nav:text-blue",
      );
    }
  });

  sections.forEach((section) => {
    const card = section.firstElementChild;
    if (card) {
      card.classList.toggle("is-active", section.getAttribute("id") === id);
    }
  });
};

const closeOtherAccordions = (
  currentTrigger: Element,
  triggers: NodeListOf<Element>,
) => {
  triggers.forEach((t) => {
    if (t === currentTrigger) return;
    const otherWrapper = t.closest(".editorial-accordion");
    t.setAttribute("aria-expanded", "false");
    const panel = t.nextElementSibling as HTMLElement;
    if (panel) {
      panel.style.cssText =
        "grid-template-rows: 0fr; opacity: 0; transition: all 300ms ease-in-out;";
    }
    t.querySelector(".editorial-chevron")?.classList.remove("rotate-180");
    if (otherWrapper) {
      otherWrapper.classList.remove(
        "border-transparent",
        "shadow-[0_8px_30px_rgba(0,123,255,0.12)]",
      );
      otherWrapper.classList.add("border-[#e1e1e1]");
    }
  });
};

const initDesktopSpy = () => {
  const sections = document.querySelectorAll(".editorial-section");
  const navItems = document.querySelectorAll(".editorial-nav-item");
  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (e) =>
          e.isIntersecting &&
          setActiveNav(e.target.getAttribute("id"), navItems, sections),
      );
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
  );
  sections.forEach((s) => observer.observe(s));
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const href = item.getAttribute("href");
      if (href)
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const initMobileAccordion = () => {
  const triggers = document.querySelectorAll(".editorial-trigger");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    // Prevent double listeners
    if (trigger.hasAttribute("data-js-init")) return;
    trigger.setAttribute("data-js-init", "true");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const isExp = trigger.getAttribute("aria-expanded") === "true";
      const wrapper = trigger.closest(".editorial-accordion");

      closeOtherAccordions(trigger, triggers);

      trigger.setAttribute("aria-expanded", String(!isExp));
      const panel = trigger.nextElementSibling as HTMLElement;
      if (panel) {
        panel.style.cssText = !isExp
          ? "grid-template-rows: 1fr; opacity: 1; transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);"
          : "grid-template-rows: 0fr; opacity: 0; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);";
      }

      trigger
        .querySelector(".editorial-chevron")
        ?.classList.toggle("rotate-180", !isExp);

      if (wrapper) {
        wrapper.classList.toggle("border-transparent", !isExp);
        wrapper.classList.toggle(
          "shadow-[0_8px_30px_rgba(0,123,255,0.12)]",
          !isExp,
        );
        wrapper.classList.toggle("border-[#e1e1e1]", isExp);
        
        if (!isExp) {
          // Allow panel to start opening before scrolling
          setTimeout(() => {
            wrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 350);
        }
      }
    });
  });
};

export const initSolutionsEditorial = () => {
  initDesktopSpy();
  initMobileAccordion();
};
