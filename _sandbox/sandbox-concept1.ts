export const initConcept1 = () => {
  const sections = document.querySelectorAll(".content-section");
  const navItems = document.querySelectorAll(".nav-item");

  if (sections.length && navItems.length) {
    initDesktopNav(navItems);
    initDesktopSpy(navItems, sections);
  }

  initMobileAccordion();
};

const initDesktopNav = (navItems: NodeListOf<Element>) => {
  navItems.forEach((item, index) => {
    if (index !== 0) {
      const indicator = item.querySelector(".nav-indicator");
      const innerDot = item.querySelector(".inner-dot");
      indicator?.classList.replace("shadow-md", "border");
      indicator?.classList.replace("ring-2", "border-line");
      indicator?.classList.replace("ring-blue", "text-navy/30");
      indicator?.classList.replace("text-blue", "group-hover:text-navy/60");
      innerDot?.classList.replace("scale-100", "scale-50");
      innerDot?.classList.replace("opacity-100", "opacity-0");
    }
  });

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      if (targetId)
        document
          .querySelector(targetId)
          ?.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const updateNavState = (
  navItems: NodeListOf<Element>,
  activeId: string | null,
) => {
  navItems.forEach((item) => {
    const isAct = item.getAttribute("data-target") === activeId;
    const ind = item.querySelector(".nav-indicator");
    const dot = item.querySelector(".inner-dot");

    item.classList.toggle("text-navy", isAct);
    item.classList.toggle("text-navy/50", !isAct);

    if (isAct) {
      ind?.classList.add("shadow-md", "ring-2", "ring-blue", "text-blue");
      ind?.classList.remove(
        "border",
        "border-line",
        "text-navy/30",
        "group-hover:text-navy/60",
      );
      dot?.classList.add("scale-100", "opacity-100");
      dot?.classList.remove("scale-50", "opacity-0");
    } else {
      ind?.classList.remove("shadow-md", "ring-2", "ring-blue", "text-blue");
      ind?.classList.add(
        "border",
        "border-line",
        "text-navy/30",
        "group-hover:text-navy/60",
      );
      dot?.classList.remove("scale-100", "opacity-100");
      dot?.classList.add("scale-50", "opacity-0");
    }
  });
};

const initDesktopSpy = (
  navItems: NodeListOf<Element>,
  sections: NodeListOf<Element>,
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateNavState(navItems, entry.target.getAttribute("id"));
        }
      });
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
  );
  sections.forEach((s) => observer.observe(s));
};

const toggleAccordion = (trigger: Element, triggers: NodeListOf<Element>) => {
  const isExpanded = trigger.getAttribute("aria-expanded") === "true";
  const content = trigger.nextElementSibling as HTMLElement;
  const icon = trigger.querySelector(".accordion-icon");

  triggers.forEach((t) => {
    if (t !== trigger) {
      t.setAttribute("aria-expanded", "false");
      const c = t.nextElementSibling as HTMLElement;
      if (c) {
        c.style.gridTemplateRows = "0fr";
        c.style.marginBottom = "0px";
      }
      const i = t.querySelector(".accordion-icon");
      i?.classList.replace("rotate-90", "rotate-0");
    }
  });

  trigger.setAttribute("aria-expanded", String(!isExpanded));
  if (content) {
    content.style.gridTemplateRows = !isExpanded ? "1fr" : "0fr";
    content.style.marginBottom = !isExpanded ? "24px" : "0px";
  }
  if (icon) {
    icon.classList.toggle("rotate-90", !isExpanded);
    icon.classList.toggle("rotate-0", isExpanded);
  }
};

const initMobileAccordion = () => {
  const triggers = document.querySelectorAll(".accordion-trigger");
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => toggleAccordion(trigger, triggers));
  });
};
