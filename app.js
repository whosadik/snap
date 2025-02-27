const ham = document.querySelector(".hamburger");
const header = document.querySelector(".header");
const featuresBtns = document.querySelectorAll(".features-btn");
const companyBtns = document.querySelectorAll(".company-btn");
const hiddenFeaturesBtns = document.querySelectorAll(".hidden-features");
const hiddenCompanyBtns = document.querySelectorAll(".hidden-company");

ham.addEventListener("click", function () {
  header.classList.toggle("active");
});

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

filterLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const selectedCountry = this.getAttribute("data-country");

    videoCards.forEach((card) => {
      const cardCountry = card.getAttribute("data-country");

      if (selectedCountry === "Все страны" || selectedCountry === cardCountry) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
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
    video.currentTime = 0;
    poster.style.opacity = "0";
    video.style.opacity = "1";

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
    poster.style.opacity = "1";
    video.style.opacity = "0";
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

      console.log("Выбрана страна:", selectedCountry);

      countryButton.textContent =
        selectedCountry === "Все страны" ? "Все страны" : selectedCountry;

      allCards.forEach((card) => {
        card.classList.add("hidden");
      });

      if (selectedCountry === "Все страны") {
        allCards.forEach((card) => {
          if (card.classList.contains("always-visible")) {
            card.classList.remove("hidden");
          }
        });
      } else {
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
  const cardsSection = document.getElementById("cards-section");

  window.scrollTo({
    top: cardsSection.offsetTop - 100,
    behavior: "smooth",
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const countryButton = document.querySelector(".country-btn");
  const countryLinks = document.querySelectorAll(".hidden-features a");

  countryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const selectedCountry = this.getAttribute("data-country");
      countryButton.textContent = selectedCountry;
      const arrow = countryButton.querySelector(".arrow-icon");
      countryButton.classList.remove("active");
    });
  });

  countryButton.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

function playVideoMobile(card) {
  let video = card.querySelector(".video");

  if (window.innerWidth <= 768) {
    if (video.paused) {
      video.play();

      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  } else {
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
  Непредставляю: [
    {
      country: "Португалия",
      img: "preview/Portuges/4-PG-I have no idea.jpg",
      desc: "Не имею представления; Не знаю",
    },
    {
      country: "Италия",
      img: "preview/5-IT-I don't care.jpg",
      desc: "Мне все равно.",
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
      const gesture = this.dataset.gesture;
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
document.addEventListener("DOMContentLoaded", function () {
  const quizModal = document.getElementById("gesture-quiz-modal");
  const openQuizBtn = document.getElementById("gesture-start-quiz-btn");
  const closeQuizBtn = document.getElementById("gesture-close-quiz");
  const questionText = document.getElementById("gesture-question-text");
  const answersContainer = document.getElementById("gesture-answers");
  const resultText = document.getElementById("gesture-result");
  const nextBtn = document.getElementById("gesture-next-btn");
  const mediaContainer = document.getElementById("gesture-media");

  let currentQuestionIndex = 0;
  let shuffledQuestions = [];
  let score = 0;
  let hasAnswered = false;

  const questions = [
    {
      question: "Что означает этот жест?(Россия)",
      video: "gestures/russia/27-RU-I've had enough2.mp4",
      answers: ["Привет", "До свидания", "Отлично", "С меня хватит"],
      correct: 3,
    },
    {
      question: "Какой жест показан в видео?(Россия)",
      video: "gestures/russia/1-RU-Yes.mp4",
      answers: ["Да", "Внимание", "Нет", "Не знаю"],
      correct: 0,
    },
    {
      question: "Какой смысл этого жеста?(Россия)",
      video: "gestures/17-RU-gloating.mp4",
      answers: ["Согласие", "Угроза", "Шутка", "Дразнить"],
      correct: 3,
    },
    {
      question: "Как используется этот жест?(Россия)",
      video: "gestures/russia/30-RU-Promised.mp4",
      answers: ["Приветствие", "Обещано", "Оскорбление", "Знак уважения"],
      correct: 1,
    },
    {
      question: "Какой смысл этого жеста?(Великобритания)",
      video: "gestures/21-GB-Don't be nosy.mp4 ",
      answers: ["Радость", "Оскорбление", "Это не твое дело", "Что-то не так"],
      correct: 2,
    },
    {
      question: "Этот жест используется в какой стране?",
      video: "gestures/11-GB-insult.mp4",
      answers: ["Италия", "Великобритания", "Франция", "Россия"],
      correct: 1,
    },
    {
      question: "Что означает этот жест?(Италия)",
      video: "gestures/11-IT-Perfect.mp4",
      answers: ["Привет", "До свидания", "Отлично", "С меня хватит"],
      correct: 2,
    },
    {
      question: "Что означает этот жест?(Франция)",
      video: "gestures/france/10-FR-Zero.mp4",
      answers: ["Вкусно", "Радость", "Отлично", "Ты ничто"],
      correct: 3,
    },
    {
      question: "Что означает этот жест?(Франция)",
      video: "gestures/france/31-FR-I knew it.mp4",
      answers: [
        "Это не твое дело",
        "Я знал это",
        "Оскорбление",
        "С меня хватит",
      ],
      correct: 1,
    },
    {
      question: "Что означает этот жест?(Франция)",
      video: "gestures/france/31-FR-I knew it.mp4",
      answers: [
        "Это не твое дело",
        "Я знал это",
        "Оскорбление",
        "С меня хватит",
      ],
      correct: 1,
    },
    {
      question: "Что означает этот жест?(Франция)",
      video: "gestures/france/37-FR-Let's go.mp4",
      answers: ["Пойдем", "С меня хватит", "Это не твое дело", "Я знал это"],
      correct: 0,
    },

    {
      question: "Что означает этот жест?(Италия)",
      video: "gestures/italy/18-IT-What do you want.mp4",
      answers: ["Что же ты хочешь", "Обещано", "Оскорбление", "Знак уважения"],
      correct: 0,
    },
    {
      question: "Что означает этот жест?(Италия)",
      video: "gestures/italy/30-IT-Smart.mp4",
      answers: ["Обещано", "Я знал это", "Оскорбление", "Это умно"],
      correct: 3,
    },

    {
      question: "Что означает этот жест?(Италия)",
      video: "gestures/italy/23-IT-Crowded place (1).mp4",
      answers: ["Пойдем", "Многолюдное место", "С меня хватит", "Это умно"],
      correct: 1,
    },
    {
      question: "Что означает этот жест?(Португалия)",
      video: "gestures/Portuges/8-PG-Good luck.mp4",
      answers: ["Ты получишь что-то", "Вкусно", "Удачи", "Ничего"],
      correct: 2,
    },

    {
      question: "Что означает этот жест?(Португалия)",
      video: "gestures/italy/38-IT-You're in trouble.mp4",
      answers: ["У тебя проблемы!", "Вкусно", "Удачи", "Я люблю тебя"],
      correct: 0,
    },
    {
      question: "Что означает этот жест?(Португалия)",
      video: "gestures/Portuges/4-PG-I have no idea.mp4",
      answers: [
        "У тебя проблемы!",
        "Вкусно",
        "Не имею представления",
        "Я люблю тебя",
      ],
      correct: 2,
    },
    {
      question: "Что означает этот жест?(Болгария)",
      video: "gestures/bolgar/2-BU-No.mp4",
      answers: ["Да", "Нет", "Не знаю", "Вкусно"],
      correct: 1,
    },
    {
      question: "Что означает этот жест?(Болгария)",
      video: "gestures/bolgar/1-1-BU-Yes2.mp4",
      answers: ["Да", "Нет", "Не знаю", "Вкусно"],
      correct: 0,
    },
    {
      question: "Что означает этот жест?(Болгария)",
      video: "gestures/bolgar/18-You're stupid.mp4",
      answers: ["Удачи", "Нет", "Не знаю", "Ты глупый"],
      correct: 0,
    },
  ];

  function getRandomQuestions(allQuestions, count) {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  openQuizBtn.addEventListener("click", function () {
    quizModal.style.display = "block";
    startQuiz();
  });

  closeQuizBtn.addEventListener("click", function () {
    quizModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === quizModal) {
      quizModal.style.display = "none";
    }
  });

  function startQuiz() {
    shuffledQuestions = getRandomQuestions(questions, 5);
    currentQuestionIndex = 0;
    score = 0;
    hasAnswered = false;
    loadQuestion();
  }

  function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) return;

    hasAnswered = false;

    const question = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = question.question;

    mediaContainer.innerHTML = "";

    const videoElement = document.createElement("video");
    videoElement.src = question.video;
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.width = 320;
    mediaContainer.appendChild(videoElement);

    answersContainer.innerHTML = "";
    question.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.classList.add("gesture-answer");
      button.textContent = answer;
      button.dataset.correct = index === question.correct;
      button.onclick = () => checkGestureAnswer(button);
      answersContainer.appendChild(button);
    });

    resultText.textContent = "";
    nextBtn.textContent = "Следующий вопрос";
    nextBtn.style.display = "none";
  }

  function checkGestureAnswer(button) {
    if (hasAnswered) return;

    hasAnswered = true;

    const isCorrect = button.dataset.correct === "true";

    if (isCorrect) {
      score += 1;
    }

    resultText.textContent = isCorrect ? "✅ Правильно!" : "❌ Неправильно!";
    resultText.style.color = isCorrect ? "green" : "red";

    document.querySelectorAll(".gesture-answer").forEach((btn) => {
      btn.disabled = true;
    });

    nextBtn.style.display = "block";
  }

  nextBtn.addEventListener("click", function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      loadQuestion();
    } else {
      resultText.textContent = `🎉 Тест завершен! Ваш результат: ${score} из 5`;
      nextBtn.textContent = "Пройти заново";
      nextBtn.onclick = startQuiz;
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const videoPopup = document.getElementById("videoPopup");
  const videoPopupTitle = document.getElementById("videoPopupTitle");
  const videoPopupPlayer = document.getElementById("videoPopupPlayer");
  const videoPopupDescription = document.getElementById(
    "videoPopupDescription"
  );
  const closePopup = document.querySelector(".video-popup-close");

  const gestureModal = document.getElementById("gestureModal");
  const modalTitle = document.getElementById("modal-title");
  const modalCardsContainer = document.getElementById("modal-cards-container");
  const closeModal = document.querySelector(".close");

  let currentGesture = "";

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        const country = this.dataset.country || "Неизвестная страна";
        const gesture = this.dataset.gesture || "Неизвестный жест";
        const videoElement = this.querySelector(".video source");
        const description =
          this.querySelector(".info p")?.innerText || "Нет описания";

        if (!videoElement) {
          console.error("Видео не найдено в карточке!");
          return;
        }

        const videoSrc = videoElement.src;
        currentGesture = gesture;

        videoPopupTitle.textContent = `${country}`;
        videoPopupPlayer.src = videoSrc;
        videoPopupDescription.textContent = description;

        videoPopup.style.display = "flex";

        videoPopupPlayer.load();
        videoPopupPlayer
          .play()
          .catch((err) => console.error("Ошибка воспроизведения:", err));
      }
    });
  });

  closePopup.addEventListener("click", function () {
    videoPopup.style.display = "none";
    videoPopupPlayer.pause();
    videoPopupPlayer.src = "";

    setTimeout(() => {
      if (currentGesture && gestureVariations[currentGesture]) {
        modalTitle.textContent = `Другие значения жеста`;
        modalCardsContainer.innerHTML = "";

        gestureVariations[currentGesture].forEach((variation) => {
          modalCardsContainer.innerHTML += createCardHTML(variation);
        });

        gestureModal.style.display = "block";
      }
    }, 300);
  });

  closeModal.addEventListener("click", function () {
    gestureModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === videoPopup) {
      videoPopup.style.display = "none";
      videoPopupPlayer.pause();
      videoPopupPlayer.src = "";
    }
    if (event.target === gestureModal) {
      gestureModal.style.display = "none";
    }
  });

  function createCardHTML(gesture) {
    return `
      <div class="modal-card">
        <img src="${gesture.img}" alt="${gesture.desc}">
        <p><strong>${gesture.country}: </strong>${gesture.desc}</p>
      </div>
    `;
  }
});
