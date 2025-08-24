// ========================
//   Element refs
// ========================
const navLogo = document.querySelector(".nav-logo");
const navExploreText = document.querySelector(".nav-explore-text");
const exploreDropdown = document.querySelector(".explore-dropdown");
const settingMenuIcon = document.querySelector(".settings-menu-icon");
const settingDropDown = document.querySelector(".settings-dropdown");
const imageGallery = document.querySelector(".image-gallery");
const loader = document.querySelector(".loader");
const navSearch = document.querySelector(".nav-search");
const heroSection = document.querySelector(".hero-section");
const navbar = document.querySelector("header");
const heroSearchInput = document.querySelector(".hero-search input");
const navSearchInput = document.querySelector(".nav-search input");
const heroSearchBtn = document.querySelector(".hero-search span"); // fixed: span
const navSearchBtn = document.querySelector(".nav-search span"); // fixed: span
const searchTag = document.querySelector(".search-tag");

// Modal refs
const imgClickWrapper = document.querySelector(".img-click-wrapper");
const singleImageView = document.querySelector(".single-image-view");
const imgCloseBtn = document.querySelector(".img-close-btn");
const creatorFollow = document.querySelector(".creator-follow");
const creatorName = document.querySelector(".creator-name");
const creatorImage = document.querySelector(".creator-image");

// ========================
//   State
// ========================
const apiKey = "uz5KgNyrQQZNyfsn8RqjWwNJVXJaVmk54gu7jvhHBNoiZnIQE601h2gI";
let isExplorePinned = false;
let isSettingsPinned = false;
let perPage = 10;
let page = 1;
let isLoading = false;
let currentQuery = ""; // search query
let lastScrollY = window.scrollY;
let ticking = false;

// ========================
//   Helpers
// ========================
const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
};
const setAvatarColor = (el, avgColor) => {
  el.style.background = avgColor || "#666";
};

// Logo click
navLogo?.addEventListener("click", () => {
  window.location.href = "#";
});

// Dropdown logic (Explore)
const exploreShowDropdown = () => {
  exploreDropdown.classList.add("active");
  navExploreText.classList.add("active");
};
const exploreHideDropdown = () => {
  exploreDropdown.classList.remove("active");
  navExploreText.classList.remove("active");
  isExplorePinned = false;
};
navExploreText.addEventListener("mouseenter", () => {
  if (!isExplorePinned) exploreShowDropdown();
});
exploreDropdown.addEventListener("mouseenter", () => {
  if (!isExplorePinned) exploreShowDropdown();
});
navExploreText.addEventListener("mouseleave", () => {
  if (!isExplorePinned) {
    setTimeout(() => {
      if (
        !exploreDropdown.matches(":hover") &&
        !navExploreText.matches(":hover")
      ) {
        exploreHideDropdown();
      }
    }, 100);
  }
});
exploreDropdown.addEventListener("mouseleave", () => {
  if (!isExplorePinned) {
    setTimeout(() => {
      if (
        !exploreDropdown.matches(":hover") &&
        !navExploreText.matches(":hover")
      ) {
        exploreHideDropdown();
      }
    }, 100);
  }
});
navExploreText.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isExplorePinned) {
    exploreHideDropdown();
  } else {
    settingHideDropdown();
    isSettingsPinned = false;
    exploreShowDropdown();
    isExplorePinned = true;
  }
});

// Dropdown logic (Settings)
const settingShowDropdown = () => {
  settingDropDown.classList.add("active");
  settingMenuIcon.classList.add("active");
};
const settingHideDropdown = () => {
  settingDropDown.classList.remove("active");
  settingMenuIcon.classList.remove("active");
  isSettingsPinned = false;
};
settingMenuIcon.addEventListener("mouseenter", () => {
  if (!isSettingsPinned) settingShowDropdown();
});
settingDropDown.addEventListener("mouseenter", () => {
  if (!isSettingsPinned) settingShowDropdown();
});
settingMenuIcon.addEventListener("mouseleave", () => {
  if (!isSettingsPinned) {
    setTimeout(() => {
      if (
        !settingDropDown.matches(":hover") &&
        !settingMenuIcon.matches(":hover")
      ) {
        settingHideDropdown();
      }
    }, 100);
  }
});
settingDropDown.addEventListener("mouseleave", () => {
  if (!isSettingsPinned) {
    setTimeout(() => {
      if (
        !settingDropDown.matches(":hover") &&
        !settingMenuIcon.matches(":hover")
      ) {
        settingHideDropdown();
      }
    }, 100);
  }
});
settingMenuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isSettingsPinned) {
    settingHideDropdown();
  } else {
    exploreHideDropdown();
    isExplorePinned = false;
    settingShowDropdown();
    isSettingsPinned = true;
  }
});

// Close dropdowns clicking outside
document.body.addEventListener("click", () => {
  if (isExplorePinned) exploreHideDropdown();
  if (isSettingsPinned) settingHideDropdown();
});

const buildEndpoint = () =>
  currentQuery
    ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        currentQuery
      )}&per_page=${perPage}&page=${page}`
    : `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`;

function renderPhotos(photos) {
  photos.forEach((photo) => {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = photo.src.large;
    img.alt = photo.alt || photo.photographer || "Pexels photo";
    img.onload = () => img.classList.add("loaded");
    // 🟢 Reserve space before image loads
    img.style.aspectRatio = `${photo.width} / ${photo.height}`;
    img.style.width = "100%";
    img.style.display = "block";
    img.style.background = "#f0f0f0"; // light placeholder bg
    img.addEventListener("click", () => {
      singleImageView.src = photo.src.original;
      singleImageView.alt = photo.alt || "Selected photo";

      creatorName.textContent = photo.photographer;
      creatorImage.textContent = getInitials(photo.photographer);
      setAvatarColor(creatorImage, photo.avg_color);

      creatorFollow.onclick = () =>
        window.open(photo.photographer_url, "_blank", "noopener,noreferrer");

      const downloadBtn = document.querySelector(".download-btn");
      if (downloadBtn) {
        downloadBtn.onclick = () => {
          const a = document.createElement("a");
          a.href = photo.src.original;
          a.download = `pexels-${photo.id}.jpg`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        };
      }

      imgClickWrapper.style.display = "flex";
      imgClickWrapper.setAttribute("aria-hidden", "false");
    });

    imageGallery.appendChild(img);
  });
}

// ========================
//   Fetch (unified)
// ========================
async function fetchPhotos() {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = "block";

  try {
    const endpoint = buildEndpoint();
    const res = await fetch(endpoint, { headers: { Authorization: apiKey } });
    const data = await res.json();

    if (page === 1) imageGallery.innerHTML = ""; // reset for new searches

    if (data?.photos?.length) {
      renderPhotos(data.photos);
      page++;
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  } finally {
    loader.style.display = "none";
    isLoading = false;
  }
}

// ========================
//   Search
// ========================
function performSearch(query) {
  const q = (query || "").trim();
  currentQuery = q;
  searchTag.textContent = q || "Stock";
  page = 1;
  fetchPhotos();
}

function onSearchEnter(e) {
  if (e.key === "Enter") performSearch(e.target.value);
}

// Bind Enter + Buttons
heroSearchInput?.addEventListener("keydown", onSearchEnter);
navSearchInput?.addEventListener("keydown", onSearchEnter);
heroSearchBtn?.addEventListener("click", () =>
  performSearch(heroSearchInput.value)
);
navSearchBtn?.addEventListener("click", () =>
  performSearch(navSearchInput.value)
);

// ========================
//   Infinite scroll
// ========================
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
    fetchPhotos();
  }
});

// ========================
//   Modal Close
// ========================
const closeModal = () => {
  imgClickWrapper.style.display = "none";
  imgClickWrapper.setAttribute("aria-hidden", "true");
  singleImageView.src = "";
};
imgCloseBtn?.addEventListener("click", closeModal);
imgClickWrapper?.addEventListener("click", (e) => {
  if (e.target === imgClickWrapper) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ========================
//   Navbar: show on scroll down, hide on scroll up
// ========================
function onScrollDirection() {
  const currentY = window.pageYOffset;
  const delta = currentY - lastScrollY;

  if (delta > 5) {
    navbar.style.transform = "translateY(-100%)";
  } else if (delta < -5) {
    navbar.style.transform = "translateY(0%)";
  }

  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(onScrollDirection);
      ticking = true;
    }
  },
  { passive: true }
);

// ========================
//   Show nav search only after hero leaves
// ========================
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navSearch.style.opacity = "0";
        navSearch.style.pointerEvents = "none";
      } else {
        navSearch.style.opacity = "1";
        navSearch.style.pointerEvents = "auto";
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${heroSection.offsetHeight}px 0px 0px 0px`,
  }
);
io.observe(heroSection);

// ========================
//   Default load (curated/mixed)
// ========================
fetchPhotos(); // initial curated feed

// ========================
//   ORIENTATION FILTER (DROP-IN)
// ========================

// keep whatever value might already exist
let currentOrientation = window.currentOrientation || ""; // "", "landscape", "portrait"

const filterBtn = document.querySelector(".filter-text");
const filterLabel = filterBtn?.querySelector("p");
let filterDropdownEl;

// Create dropdown once (append to <body>, not inside the button)
function createOrientationDropdown() {
  if (filterDropdownEl) return filterDropdownEl;
  filterDropdownEl = document.createElement("div");
  filterDropdownEl.className = "filter-dropdown";
  filterDropdownEl.innerHTML = `
    <div data-o="">Mix</div>
    <div data-o="landscape">Horizontal</div>
    <div data-o="portrait">Vertical</div>
  `;
  document.body.appendChild(filterDropdownEl);
  return filterDropdownEl;
}

// Open/close and position dropdown
function openOrientationDropdown() {
  const dd = createOrientationDropdown();
  const r = filterBtn.getBoundingClientRect();
  dd.style.top = r.bottom + window.scrollY + "px";
  dd.style.left = r.left + "px";
  dd.style.minWidth = r.width + "px";
  dd.style.display = "block";
}
function closeOrientationDropdown() {
  if (filterDropdownEl) filterDropdownEl.style.display = "none";
}

// Toggle on button click
filterBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (filterDropdownEl?.style.display === "block") {
    closeOrientationDropdown();
  } else {
    openOrientationDropdown();
  }
});

// Handle selection + outside click
document.addEventListener("click", async (e) => {
  if (filterDropdownEl && e.target.closest(".filter-dropdown div")) {
    const val = e.target.getAttribute("data-o") || "";
    currentOrientation = val;
    window.currentOrientation = currentOrientation; // persist globally
    if (filterLabel) filterLabel.textContent = e.target.textContent.trim();

    // restart pagination and fetch with the new orientation
    page = 1;
    await fetchPhotos();
    closeOrientationDropdown();
  } else if (!e.target.closest(".filter-text")) {
    closeOrientationDropdown();
  }
});

// Helper: client-side filtering for curated results
function applyOrientationClientSide(photos) {
  if (!currentOrientation) return photos;
  return photos.filter((p) =>
    currentOrientation === "landscape"
      ? p.width >= p.height
      : p.height > p.width
  );
}

// --- Override fetchPhotos to inject orientation (keeps all other behavior) ---
const _oldFetchPhotos = fetchPhotos; // backup in case you need it
fetchPhotos = async function () {
  if (isLoading) return;
  isLoading = true;
  loader.style.display = "block";

  try {
    const searching = !!currentQuery;
    // Add &orientation only for SEARCH; curated handled client-side below.
    const endpoint = searching
      ? `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          currentQuery
        )}&per_page=${perPage}&page=${page}${
          currentOrientation ? `&orientation=${currentOrientation}` : ""
        }`
      : `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`;

    const res = await fetch(endpoint, { headers: { Authorization: apiKey } });
    const data = await res.json();

    if (page === 1) imageGallery.innerHTML = ""; // reset gallery for new search/filter

    let photos = Array.isArray(data?.photos) ? data.photos : [];

    // If curated (no query), API may ignore orientation -> filter locally by width/height
    if (!searching && currentOrientation) {
      photos = applyOrientationClientSide(photos);

      // If nothing left after filtering, pull more pages until we fill something (nice UX)
      while (photos.length === 0) {
        page++;
        const moreRes = await fetch(
          `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`,
          { headers: { Authorization: apiKey } }
        );
        const moreData = await moreRes.json();
        let more = Array.isArray(moreData?.photos) ? moreData.photos : [];
        more = applyOrientationClientSide(more);
        photos = photos.concat(more);
        if (!more.length) break;
      }
    }

    if (photos.length) {
      renderPhotos(photos);
      page++; // keep infinite scroll working
    }
  } catch (err) {
    console.error("orientation fetchPhotos error:", err);
    // graceful fallback to original if something goes wrong
    try {
      await _oldFetchPhotos();
    } catch {}
  } finally {
    loader.style.display = "none";
    isLoading = false;
  }
};
