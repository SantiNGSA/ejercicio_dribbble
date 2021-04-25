window.addEventListener(`load`, () => {
    renderMenuItems();
    renderCategoriesItems();
    renderGaleriaItems();
    renderSliderItems();
    correctionJs();
    dribbledShotsCount();
    modalOpen();
    closeModalOut();
    popularDrop();
    getSingleCategories();
    getMenuEventIsotope();
    isoGrid();
    galleryFilterEvents();
});

let iso;

const renderMenuItems = () => {
    const menuItemsHolder = document.querySelector(`.header_nav ul`);
    let htmlString = "";
    for (let i = 0; i < home.menu.length; i++) {
        const menuItemHTMLString = `
            <li class="header_navigation_item">
                <a href="${home.menu[i].link}">${home.menu[i].label}</a>
             </li>
        `;
        htmlString += menuItemHTMLString;
        menuItemsHolder.innerHTML += menuItemHTMLString;
    }
};

const unitedCategories = (types) => {
    return types.join(" ");
};

const renderGaleriaItems = () => {
    const galeriaItemsHolder = document.querySelector(`.grid`);
    style = "background-color: ${home.slider[i].bgcolor}";
    let htmlString = "";

    for (let i = 0; i < home.galeria.length; i++) {
        const menuItemHTMLString = `
            <div class="grid-item ${unitedCategories(
                home.galeria[i].types
            )} galeria_item_${home.galeria[i].index}"
                >
                <div class="item_pic">
                    <div class="fa fa-folder"></div>
                    <div class="item_imagen">
                    <img src="${home.galeria[i].img}" alt=""></div>
                    
                </div>
                <div class="item_data">
                    <div class="data_profile">
                        <img src="${home.galeria[i].img_profile}" alt="">
                        <h4>${home.galeria[i].title}</h4>
                    </div>
                    <div class="data_views">
                        <div class="likes">
                            <div class="fa fa-heart"></div>
                            <p>${home.galeria[i].likes}</p>
                        </div>
                        <div class="views">
                            <div class="fa fa-eye"></div>
                            <p>${home.galeria[i].views}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        htmlString += menuItemHTMLString;
        galeriaItemsHolder.innerHTML += menuItemHTMLString;
    }
};

const getSingleCategories = () => {
    const categories = home.galeria.map((arrItem) => arrItem.types);
    const uCat = [];

    categories.forEach((c) => {
        c.forEach((d) => {
            if (!uCat.includes(d)) {
                uCat.push(d);
            }
        });
    });

    uCat.unshift("All");
    uCat.sort();
    return uCat;
};

const renderCategoriesItems = () => {
    const filters = document.querySelector(`.galeria_aside_categories ul`);
    let htmlString = "";
    const categories = getSingleCategories();
    categories.forEach((category) => {
        htmlString += `
        <li data-category="${category}">${category}</li>
        `;
    });
    filters.innerHTML = htmlString;
};

const galleryMenuEvents = () => {
    const filters = document.querySelectorAll(
        ".galeria_aside_categories ul li"
    );
    const workItems = document.querySelectorAll(".grid-item");
    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            const category = filter.dataset.category;
            workItems.forEach((workItem) => {
                if (workItem.classList.contains(category)) {
                    workItem.classList.remove("hidden");
                } else {
                    workItem.classList.add("hidden");
                }
            });
        });
    });
};

tippy(".galeria_aside_filters button", {
    animation: "scale",
});

const renderSliderItems = () => {
    const sliderHolder = document.querySelector(`.swiper-wrapper`);

    let htmlString = "";
    for (let i = 0; i < home.slider.length; i++) {
        const sliderHTMLString = `
        <div class="swiper-slide">
        <div class="slider">
            <div class="slider_holder"  style="background-color: ${home.slider[i].bgcolor}">
                <div class="slider_left">
                    <div class="slider_left_text">
                        <h1>${home.slider[i].title}</h1>
                        <p>${home.slider[i].description}</p>
                        <button class="cta_signup_dark">Discover</button>

                    </div>
                </div>
                <div class="slider_right">
                    <img src="${home.slider[i].img}" alt="">
                    <div class="img_description">Art by <a href="">${home.slider[i].author}</a></div>
                </div>
            </div>
        </div>
      </div>
        `;

        htmlString += sliderHTMLString;
        sliderHolder.innerHTML += sliderHTMLString;
    }
};

const correctionJs = () => {
    var swiper = new Swiper(".swiper-container", {
        effect: "slide",
        loop: true,
        grabCursor: true,

        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
};

const dribbledShotsCount = () => {
    const counter = document.querySelector(`.shots p span`);
    let htmlString = "";
    const count =
        Math.floor(Math.random() * (15000000 - 13000000 + 1)) + 13000000;
    htmlString += count;
    counter.innerHTML += count;
};

// Modal Options
const modalOpen = () => {
    const openModal = document.querySelectorAll(".cta_signup_light");
    openModal.forEach((mark, i) => {
        mark.addEventListener("click", () => {
            modal_container.classList.add("show");
        });
    });
};
const modalAnimationIn = anime({
    targets: ".modal",
    scale: 0.9,
    duration: 1000,
});
document.querySelector(".cta_signup_light").onclick = modalAnimationIn.play;

const modal_container = document.querySelector(".modal_container");
const closeModal = document.querySelector(".close");

closeModal.addEventListener("click", () => {
    modal_container.classList.remove("show");
});

const closeModalOut = () => {
    window.addEventListener("click", function (e) {
        if (e.target == modal_container) {
            modal_container.classList.toggle(".close");
            setTimeout(function () {
                modal_container.classList.remove("show");
            });
        }
    });
};

// End Modal Options

const popularDrop = () => {
    const drop = document.getElementById("popular_drop");
    const but = document.getElementById("popular_button");

    function showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        if (drop.style.display == "none") {
            drop.style.display = "block";
        } else if (drop.style.display == "block") {
            drop.style.display = "none";
        }
    }
    but.addEventListener("click", showHide, false);

    document.addEventListener(
        "click",
        function (e) {
            console.log("clic");
            const clic = e.target;
            console.log(clic);
            if (drop.style.display == "block" && clic != drop) {
                drop.style.display = "none";
            }
        },
        false
    );
};

let isOpen = false;
document.addEventListener(
    "DOMContentLoaded",
    () => {
        let targets = document.getElementById("wrapper");
        let wrapperStyle = wrapper.style;
        let button = document.getElementById("button");
        button.addEventListener(
            "click",
            () => {
                if (isOpen) {
                    anime({
                        targets,
                        height: 0,
                        opacity: [1, 0],
                        duration: 600,
                        easing: "easeOutQuad",
                        complete() {
                            isOpen = false;
                            wrapperStyle.display = "";
                        },
                    });
                } else {
                    isOpen = true;
                    wrapperStyle.display = "block";
                    wrapperStyle.height = "0px";
                    anime({
                        targets,
                        height: (el) => el.scrollHeight,
                        opacity: [0, 1],
                        duration: 600,
                        easing: "easeOutCubic",
                    });
                }
            },
            false
        );
    },
    false
);

const isoGrid = () => {
    const elem = document.querySelector(".grid");
    iso = new Isotope(elem, {
        itemSelector: ".grid-item",
        layoutMode: "fitRows",
    });
};

const getMenuEventIsotope = () => {
    const galleryFilters = document.querySelectorAll(
        ".galeria_aside_categories li"
    );

    galleryFilters.forEach((gf) => {
        gf.addEventListener("click", () => {
            const category = gf.dataset.category;

            if (category == "All") {
                iso.arrange({ filter: `*` });
            } else {
                iso.arrange({ filter: `.${category}` });
            }
        });
    });
};
const galleryFilterEvents = () => {
    const input = document.querySelector(".text_search input");
    const workItems = document.querySelectorAll(".grid-item");
    input.addEventListener("keyup", () => {
        const value = input.value;

        workItems.forEach((workItem) => {
            const title = workItem.querySelector(".data_profile h4");
            if (title.innerHTML.includes(value)) {
                workItem.classList.remove("hidden");
            } else {
                workItem.classList.add("hidden");
            }
        });
    });
};
const textSearchIso = () => {};
