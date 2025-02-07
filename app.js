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
    // Запускаем видео в полноэкранном режиме на мобильных
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }

    video.play();
  } else {
    // Для десктопов просто играем видео
    if (video.paused) {
      video.play();
      card.classList.add("playing");
    }
  }
}
