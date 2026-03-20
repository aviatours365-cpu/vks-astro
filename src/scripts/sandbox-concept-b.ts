export const initAccordion = () => {
  const slices = document.querySelectorAll(".c2-slice");
  if (!slices.length) return;

  slices.forEach((s) => {
    s.addEventListener("click", () => {
      if (s.classList.contains("c2-expanded")) return;
      expandSlice(s as HTMLElement, slices);
    });
  });
};

const resetAllSlices = (slices: NodeListOf<Element>) => {
  slices.forEach((s) => {
    s.classList.remove("c2-expanded", "bg-white", "w-[55%]", "xl:w-[60%]");
    (s as HTMLElement).style.width = "";
    s.classList.add("hover:bg-[#f1f3f5]", "w-[6.42%]", "xl:w-[5.71%]");

    const collapsedContent = s.querySelector(".c2-collapsed-content");
    if (collapsedContent) {
      collapsedContent.classList.remove("opacity-0", "pointer-events-none");
      collapsedContent.classList.add("opacity-100");
    }

    const expandedContent = s.querySelector(".c2-expanded-content");
    if (expandedContent) {
      expandedContent.classList.remove("opacity-100", "translate-x-0");
      expandedContent.classList.add(
        "opacity-0",
        "translate-x-8",
        "pointer-events-none",
      );
    }
  });
};

const expandSlice = (slice: HTMLElement, slices: NodeListOf<Element>) => {
  resetAllSlices(slices);

  slice.classList.add("c2-expanded", "bg-white", "w-[55%]", "xl:w-[60%]");
  slice.classList.remove("hover:bg-[#f1f3f5]", "w-[6.42%]", "xl:w-[5.71%]");
  slice.style.width = "";

  const activeCollapsed = slice.querySelector(".c2-collapsed-content");
  if (activeCollapsed) {
    activeCollapsed.classList.remove("opacity-100");
    activeCollapsed.classList.add("opacity-0", "pointer-events-none");
  }

  const activeExpanded = slice.querySelector(".c2-expanded-content");
  if (activeExpanded) {
    activeExpanded.classList.remove(
      "opacity-0",
      "translate-x-8",
      "pointer-events-none",
    );
    activeExpanded.classList.add("opacity-100", "translate-x-0");
  }
};
