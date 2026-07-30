import { initRevealLeftToRightStaggerOnScroll } from "./animations/reveal-left-to-right-stagger-on-scroll";

export async function initServicesData() {
  const container = document.getElementById("services-container");
  if (!container) {
    return;
  }

  try {
    const response = await fetch("/src/data/services.json");
    if (!response.ok)
      throw new Error("Failed to load services JSON data source.");

    const services = await response.json();

    const cardsHtml = services
      .map((service) => {
        const featuredClass = service.featured
          ? "md:col-span-2 lg:col-span-1"
          : "";
        let imageSectionHtml = "";

        if (Array.isArray(service.image)) {
          imageSectionHtml = `
            <div class="w-full h-55 overflow-hidden relative flex flex-row">
              <div class="w-1/2 h-full relative border-r border-white-pure/20">
                <img src="${service.image[0]}" alt="Before - ${service.alt}" class="w-full h-full object-cover">
                <span class="absolute bottom-2 left-2 bg-dark-slate/80 text-white-pure text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider backdrop-blur-sm">Before</span>
              </div>
              <div class="w-1/2 h-full relative">
                <img src="${service.image[1]}" alt="After - ${service.alt}" class="w-full h-full object-cover">
                <span class="absolute bottom-2 right-2 bg-yellow-gold text-dark-slate text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider">After</span>
              </div>
            </div>
          `;
        } else {
          imageSectionHtml = `
            <div class="w-full h-55 overflow-hidden relative">
              <img src="${service.image}" alt="${service.alt}" loading="lazy" class="w-full h-full object-cover">
            </div>
          `;
        }

        return `
        <article data-animate="stagger-item" class="w-full bg-cyan-brand-dark text-white-pure rounded-[30px] overflow-hidden shadow-md flex flex-col ${featuredClass}">
          ${imageSectionHtml}
          <div class="p-6 flex flex-col items-center text-center grow">
            <span class="font-cursive">Harborshine</span>
            <p class="h-medium mb-3">${service.title}</p>
            <p class="p-medium">${service.description}</p>
          </div>
        </article>
      `;
      })
      .join(""); // Merges the array into a single clean string

    container.innerHTML = cardsHtml;
    initRevealLeftToRightStaggerOnScroll();
  } catch (error) {
    console.error("❌ Services engine template failure:", error);
  }
}
