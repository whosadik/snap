const ham = document.querySelector(".hamburger");
const header = document.querySelector(".header");
const featuresBtns = document.querySelectorAll(".features-btn");
const companyBtns = document.querySelectorAll(".company-btn");
const hiddenFeaturesBtns = document.querySelectorAll(".hidden-features");
const hiddenCompanyBtns = document.querySelectorAll(".hidden-company");

// Открытие и закрытие меню на мобильных устройствах
ham.addEventListener("click", function () {
  header.classList.toggle("active");
});

// Открытие и закрытие скрытых списков для кнопок "Features" и "Company"
featuresBtns.forEach((button, index) => {
  button.addEventListener("click", function () {
    hiddenFeaturesBtns[index].classList.toggle("active");
  });
});

companyBtns.forEach((button, index) => {
  button.addEventListener("click", function () {
    hiddenCompanyBtns[index].classList.toggle("active");
  });
});

// Закрытие скрытых списков при клике вне области меню
window.addEventListener("click", (e) => {
  if (
    Array.from(hiddenFeaturesBtns).some((btn) =>
      btn.classList.contains("active")
    ) &&
    !e.target.closest(".features-btn")
  ) {
    hiddenFeaturesBtns.forEach((btn) => btn.classList.remove("active"));
  }
  if (
    Array.from(hiddenCompanyBtns).some((btn) =>
      btn.classList.contains("active")
    ) &&
    !e.target.closest(".company-btn")
  ) {
    hiddenCompanyBtns.forEach((btn) => btn.classList.remove("active"));
  }
});

const filterLinks = document.querySelectorAll(".hidden-features a");
const videoCards = document.querySelectorAll(".video-card");

// Слушаем клик на ссылках фильтра
filterLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // чтобы не было перезагрузки страницы
    const selectedCountry = this.getAttribute("data-country"); // получаем страну из атрибута

    videoCards.forEach((card) => {
      const cardCountry = card.getAttribute("data-country"); // страна карточки
      // Показываем или скрываем карточку в зависимости от выбранной страны
      if (selectedCountry === "Все страны" || selectedCountry === cardCountry) {
        card.classList.remove("hidden"); // Показываем карточку
      } else {
        card.classList.add("hidden"); // Скрываем карточку
      }
    });
  });
});

document.querySelectorAll(".video-card").forEach((card) => {
  const video = card.querySelector(".video");
  const poster = card.querySelector(".poster");

  let isHovering = false;

  card.addEventListener("mouseenter", () => {
    isHovering = true;
    video.currentTime = 0; // Сбрасываем видео на начало
    poster.style.opacity = "0"; // Скрываем обложку
    video.style.opacity = "1"; // Показываем видео

    if (video.readyState >= 2) {
      video
        .play()
        .catch((err) => console.error("Ошибка воспроизведения:", err));
    } else {
      video.addEventListener(
        "canplay",
        () => {
          video
            .play()
            .catch((err) => console.error("Ошибка воспроизведения:", err));
        },
        { once: true }
      );
    }
  });

  card.addEventListener("mouseleave", () => {
    isHovering = false;
    video.pause();
    poster.style.opacity = "1"; // Показываем обложку
    video.style.opacity = "0"; // Скрываем видео
  });

  video.addEventListener("ended", () => {
    if (isHovering) {
      video.currentTime = 0;
      video.play();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const countryButton = document.querySelector(".country-btn");
  const countryLinks = document.querySelectorAll(".hidden-features a");
  const allCards = document.querySelectorAll(".video-card");

  countryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedCountry = this.getAttribute("data-country");

      console.log("Выбрана страна:", selectedCountry); // Проверка в консоли

      // Меняем текст кнопки
      countryButton.textContent =
        selectedCountry === "Все страны" ? "Все страны" : selectedCountry;

      // Скрываем все карточки сначала
      allCards.forEach((card) => {
        card.classList.add("hidden");
      });

      if (selectedCountry === "Все страны") {
        // Если выбрано "Все страны", показываем все карточки, включая always-visible
        allCards.forEach((card) => {
          if (card.classList.contains("always-visible")) {
            card.classList.remove("hidden");
          }
        });
      } else {
        // Если выбрана конкретная страна, показываем только карточки этой страны
        allCards.forEach((card) => {
          if (card.getAttribute("data-country") === selectedCountry) {
            card.classList.remove("hidden");
          }
        });
      }
    });
  });
});

document.querySelector(".start-journey").addEventListener("click", function () {
  // Получаем секцию с карточками
  const cardsSection = document.getElementById("cards-section");

  // Прокручиваем страницу, но с небольшой задержкой
  window.scrollTo({
    top: cardsSection.offsetTop - 100, // 100px выше секции
    behavior: "smooth",
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const countryButton = document.querySelector(".country-btn");
  const countryLinks = document.querySelectorAll(".hidden-features a");

  // Обработчик для выбора страны
  countryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedCountry = this.getAttribute("data-country");
      countryButton.textContent = selectedCountry; // Обновляем текст на кнопке
      const arrow = countryButton.querySelector(".arrow-icon");
      countryButton.classList.remove("active"); // Убираем активный класс после выбора страны
    });
  });

  // Обработчик клика на кнопку для открытия списка стран
  countryButton.addEventListener("click", function () {
    this.classList.toggle("active"); // Переключаем класс для показа списка стран
  });
});

function playVideoMobile(card) {
  let video = card.querySelector(".video");

  if (window.innerWidth <= 768) {
    if (video.paused) {
      video.play();

      // Попытка открыть видео в полноэкранном режиме
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        // iPhone, Safari
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        // IE/Edge
        video.msRequestFullscreen();
      }
    }
  } else {
    // Для десктопов видео играет в карточке
    video.play();
  }
}

document.querySelectorAll(".video-card").forEach((card) => {
  card.addEventListener("click", function () {
    const country = this.dataset.country;
    const gesture = this.dataset.gesture;

    console.log("Страна:", country);
    console.log("Жест:", gesture);

    const key = `${country}_${gesture}`;
    console.log("Сформированный ключ:", key);
  });
});

document.querySelectorAll(".video-card").forEach((card) => {
  card.addEventListener("click", function () {
    console.log("Все dataset атрибуты:", this.dataset);
  });
});

const gestureVariations = {
  Вкусно: [
    {
      country: "Франция",
      img: "preview/32-FR-Delicious.jpg",
      desc: "Вкусно; Отлично",
    },
    {
      country: "Португалия",
      img: "preview/Portuges/19-PG-Delicious.jpg",
      desc: "Вкусно",
    },
    {
      country: "Италия",
      img: "preview/28-IT-Delicious.jpg",
      desc: "Вкусно",
    },
  ],
  Я_знал_это: [
    {
      country: "Франция",
      img: "preview/francais/31-FR-I knew it.jpg",
      desc: "Я знал это; У меня хорошее чутье",
    },
    {
      country: "Великобритания",
      img: "preview/21-GB-Don't be nosy.jpg",
      desc: "Не будьте любопытными; это не твое дело",
    },
  ],
  Ноль: [
    {
      country: "Франция",
      img: "preview/francais/10-FR-Zero.jpg",
      desc: "Ноль; Ты ничто",
    },
    {
      country: "Италия",
      img: "preview/11-IT-Perfect.jpg",
      desc: "Идеально; Отлично",
    },
    {
      country: "Великобритания",
      img: "preview/british/12-GB-Perfect.jpg",
      desc: "Идеально; Отлично",
    },
  ],
  Говорил: [
    {
      country: "Франция",
      img: "preview/francais/33-FR-I told you so.jpg",
      desc: "Я же тебе говорил",
    },
    {
      country: "Россия",
      img: "preview/27-RU-I've had enough2.jpg",
      desc: "С меня хватит; Раздраженный",
    },
  ],
  Пойдем: [
    {
      country: "Франция",
      img: "preview/francais/37-FR-Let's go.jpg",
      desc: "Пойдем; Давай уйдем",
    },
    {
      country: "Италия",
      img: "preview/italy/17-IT-Let's go.jpg",
      desc: "Пойдем; Давай уйдем",
    },
  ],
  Страх: [
    {
      country: "Франция",
      img: "preview/francais/35-FR-Are you scared-.jpg",
      desc: "Ты боишься?; Страх",
    },
    {
      country: "Италия",
      img: "preview/italy/23-IT-Crowded place.jpg",
      desc: "Многолюдное место; Полно людей",
    },
  ],
  Нет: [
    {
      country: "Россия",
      img: "preview/2-RU-No.jpg",
      desc: "Нет; Не согласен",
    },
    {
      country: "Болгария",
      img: "preview/bolgaria/1-1-BU-Yes2.jpg",
      desc: "Да",
    },
  ],
  Да: [
    {
      country: "Россия",
      img: "preview/1-RU-Yes.jpg",
      desc: "Да; Я согласен",
    },
    {
      country: "Болгария",
      img: "preview/bolgaria/2-BU-No.jpg",
      desc: "Нет; Не согласен",
    },
  ],
  Фиг: [
    {
      country: "Болгария",
      img: "preview/bolgaria/28-BU-You're getting anything.jpg",
      desc: "Болгария ты получаешь что-нибудь; Ничего",
    },
    {
      country: "Франция",
      img: "preview/francais/36-FR-It won't happen.jpg",
      desc: "Этого не случится; Забудь.",
    },
    {
      country: "Португалия",
      img: "preview/Portuges/8-PG-Good luck.jpg",
      desc: "Удачи",
    },
  ],
  Неверю: [
    {
      country: "Франция",
      img: "preview/francais/20-FR-I don't believe you.jpg",
      desc: "Я тебе не верю",
    },
    {
      country: "Португалия",
      img: "preview/Portuges/16-PG-Someone is smart.jpg",
      desc: "Вы умны; Это умно!",
    },
  ],
};
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("gestureModal");
  const modalTitle = document.getElementById("modal-title");
  const modalCardsContainer = document.getElementById("modal-cards-container");
  const closeModal = document.querySelector(".close");

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", function () {
      const gesture = this.dataset.gesture; // Ищем только по названию жеста
      modalTitle.textContent = `Другие значения жеста`;
      modalCardsContainer.innerHTML = "";

      if (gestureVariations[gesture]) {
        gestureVariations[gesture].forEach((variation) => {
          modalCardsContainer.innerHTML += createCardHTML(variation);
        });
      } else {
        modalCardsContainer.innerHTML =
          "<p>Нет других значений для этого жеста.</p>";
      }

      modal.style.display = "block";
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function createCardHTML(gesture) {
    return `
      <div class="modal-card">
        <img src="${gesture.img}" alt="${gesture.desc}">
        <p><strong>${gesture.country}:</strong> ${gesture.desc}</p>
      </div>
    `;
  }
});
