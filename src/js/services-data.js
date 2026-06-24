export async function initServicesData() {
  const container = document.getElementById("services-container");
  if (!container) {
    console.warn(
      "⚠️ Services Module: Target '#services-container' not found in DOM yet.",
    );
    return;
  }

  try {
    // 1. Fetch data from our custom decoupled JSON file
    const response = await fetch("/src/data/services.json");
    if (!response.ok)
      throw new Error("Failed to load services JSON data source.");

    const services = await response.json();

    // 2. Loop through the array and construct the HTML string dynamically
    const cardsHtml = services
      .map((service) => {
        // Evaluate if the card should span across multiple columns on tablet viewports
        const featuredClass = service.featured
          ? "md:col-span-2 lg:col-span-1"
          : "";

        return `
        <article class="w-full bg-cyan-brand text-white-pure rounded-[30px] overflow-hidden shadow-md flex flex-col transition-transform duration-300 hover:-translate-y-1 ${featuredClass}">
          <div class="w-full h-55 overflow-hidden relative">
            <img src="${service.image}" alt="${service.alt}" class="w-full h-full object-cover">
          </div>
          <div class="p-6 flex flex-col items-center text-center grow">
            <span class="font-heading font-light text-[1.5rem] tracking-wider mb-1 opacity-90 block italic lowercase">Harborshine</span>
            <h3 class="font-heading text-[1.9rem] uppercase tracking-wide leading-tight mb-3">${service.title}</h3>
            <p class="font-body text-white-pure/90 text-[1rem] leading-snug">${service.description}</p>
          </div>
        </article>
      `;
      })
      .join(""); // Merges the array into a single clean string

    // 3. Inject the complete string into the container DOM node
    container.innerHTML = cardsHtml;
    console.log(
      "📦 Services Module: 7 Premium cards successfully rendered from JSON.",
    );
  } catch (error) {
    console.error("❌ Services engine template failure:", error);
  }
}
