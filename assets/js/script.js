(function ($) {
  "use strict";
  // Load Agentation only in local development so it stays out of production.
  /*if (
    !window.__agentationVanillaLoaded &&
    (location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.protocol === "file:")
  ) {
    window.__agentationVanillaLoaded = true;
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/mearnest-dev/agentation-vanilla@main/agentation-vanilla.js";
    document.body.appendChild(script);
  }*/

  // Whole Page scroll Aniamtion

  // Premium smooth reveal animation
  /*document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(
      "[data-reveal], .fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down",
    );

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -45px 0px",
      },
    );

    revealElements.forEach((el, index) => {
      if (!el.dataset.delay) {
        el.style.transitionDelay = `${Math.min(index * 0.035, 0.22)}s`;
      }

      revealObserver.observe(el);
    });
  });*/
  const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            target.classList.toggle('show', isIntersecting);
        });
    });
    const hiddenElements = document.querySelectorAll('.fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down');
    document.addEventListener('DOMContentLoaded', () => {
        hiddenElements.forEach((el) => observer.observe(el));
    });
  // fancy Box for pop-up section
  Fancybox.bind("[data-fancybox]", {
    Html5: {
      autoplay: true,
      muted: true,
      loop: true,
    },
  });
  // make sticky navbar
  $(function () {
    const $navbar = $(".top-navbar");
    $(window).on("scroll", function () {
      $navbar.toggleClass("sticky", $(this).scrollTop() > 100);
    });
  });
  // header section
  const page = location.pathname.split("/").pop() || "index1.html";
  const norm = (h) => (h || "").replace("./", "").split("/").pop();
  const $nav = $(".mobile-nav");
  const $overlay = $(".menu-overlay");
  $(".active-link, .active-mid, .active-sub").removeClass(
    "active-link active-mid active-sub",
  );
  $(".dropdown").each(function () {
    const $drop = $(this);
    const $parentA = $drop.children("a");
    if (norm($parentA.attr("href")) === page) {
      $drop.addClass("active-link");
      return;
    }
    $drop.find(".submenu-right a").each(function () {
      if (norm(this.href) === page) {
        $drop.addClass("active-link");
        $(this).closest(".dropdown-sub").addClass("active-mid");
        $(this).parent().addClass("active-sub");
      }
    });
    $drop.find("> .submenu a").each(function () {
      if (norm(this.href) === page) {
        $drop.addClass("active-link");
        $(this).parent().addClass("active-sub");
      }
    });
  });
  $("li:not(.dropdown) > a").each(function () {
    if (norm(this.href) === page) {
      $(this).parent().addClass("active-link");
    }
  });
  const openMenu = () => {
    $nav.addClass("active");
    $overlay.addClass("active");
    $("html, body").addClass("menu-open");
  };
  const closeMenu = () => {
    $nav.removeClass("active");
    $overlay.removeClass("active");
    $("html, body").removeClass("menu-open");
    $(".submenu.open, .submenu-right.open").removeClass("open");
  };
  $(document).on("click", function (e) {
    const $t = $(e.target);
    if ($t.closest(".menu-toggle").length) {
      $nav.hasClass("active") ? closeMenu() : openMenu();
      return;
    }
    if ($t.closest(".close-icon, .menu-overlay").length) {
      closeMenu();
      return;
    }
    if (innerWidth <= 1199 && $nav.hasClass("active") && !$t.closest(".mobile-nav, .menu-toggle").length) {
      closeMenu();
      return;
    }
    if (innerWidth > 1199) return;
    const $main = $t.closest(".dropdown > a");
    if ($main.length) {
      const $sub = $main.next(".submenu");
      if ($sub.length) {
        e.preventDefault();
        $(".submenu.open").not($sub).removeClass("open");
        $sub.toggleClass("open");
      }
      return;
    }
    const $subLink = $t.closest(".dropdown-sub > a");
    if ($subLink.length) {
      const $sub = $subLink.next(".submenu-right");
      if ($sub.length) {
        e.preventDefault();
        $(".submenu-right.open").not($sub).removeClass("open");
        $sub.toggleClass("open");
      }
    }  $(document).on("keydown.mobileMenuEscape", function (e) {
    if (e.key === "Escape" && $nav.hasClass("active")) {
      closeMenu();
    }
  });

  $(window).on("resize.mobileMenuClose", function () {
    if (innerWidth > 1199 && $nav.hasClass("active")) {
      closeMenu();
    }
  });

  });
  // hero slider section
  $(function () {
    const $heroSlider = $(".hero1-slider-wrapper");
    if (!$heroSlider.hasClass("slick-initialized")) {
      $heroSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        speed: 2000,
        arrows: false,
        dots: false,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
      });
    }
    $(window).on("resize orientationchange", function () {
      $heroSlider.slick("setPosition");
    });
    $(document).on("shown.bs.tab shown.bs.collapse", function () {
      $heroSlider.slick("setPosition");
    });
  });
  // bottom to top button section
  $(function () {
    const $btn = $("#scrollToTop");
    const circle = document.querySelector(".progress-ring__circle");
    if (!circle) return;
    const circumference = circle.r.baseVal.value * 2 * Math.PI;
    $(window).on("scroll", function () {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        circumference - (scrollTop / scrollHeight) * circumference;
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = progress;
      $btn.css("display", scrollTop > 200 ? "flex" : "none");
    });
    $btn.on("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  // preloader section
  $(window).on("load", function () {
    $("#preloader").fadeOut(600, function () {
      $(this).remove();
    });
  });
  // counter section
  $(function () {
    let done = false;
    const run = () =>
      $(".counter-grid h2").each(function () {
        let $t = $(this),
          n = 0,
          end = +$t.data("target"),
          s = $t.data("suffix") || "",
          step = Math.ceil(end / 200);
        (function c() {
          n += step;
          n < end
            ? ($t.text(n + s), requestAnimationFrame(c))
            : $t.text(end + s);
        })();
      });
    const counterSection = document.querySelector(".counter-section");
    if (counterSection) {
      new IntersectionObserver(
        (e) => e[0].isIntersecting && !done && ((done = true), run()),
        { threshold: 0.7 },
      ).observe(counterSection);
    }
  });
  // infinite scroll section
  $(function () {
    const debounce = (fn, d = 300) => {
      let t;
      return () => (clearTimeout(t), (t = setTimeout(fn, d)));
    };
    const setup = ($el) => {
      const html = $el.data("html") || $el.html();
      $el.data("html", html).html(html);
      const w = $(window).width();
      const repeat = w > 3840 ? 6 : w > 2560 ? 4 : w > 1920 ? 3 : 2;
      $el.append(html.repeat(repeat));
    };
    const init = () => {
      $("#scrollContent, #scrollContent2").each(function () {
        setup($(this));
      });
    };
    init();
    $(window).on("resize", debounce(init));
  });
  // coming soon countdown section
  $(function () {
    const $days = $("#days"),
      $hours = $("#hours"),
      $minutes = $("#minutes"),
      $seconds = $("#seconds"),
      launch = new Date("2026-04-25T10:00:00").getTime();
    const pad = (num) => String(num).padStart(2, "0");
    const updateCountdown = () => {
      const diff = launch - Date.now();
      if (diff <= 0) {
        $days.add($hours).add($minutes).add($seconds).text("00");
        return;
      }
      $days.text(pad(Math.floor(diff / 86400000)));
      $hours.text(pad(Math.floor((diff % 86400000) / 3600000)));
      $minutes.text(pad(Math.floor((diff % 3600000) / 60000)));
      $seconds.text(pad(Math.floor((diff % 60000) / 1000)));
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
  });
  // common function for the slick slider
  function initSlickSlider({ slider, settings, prevBtn, nextBtn }) {
    const $sliders = $(slider);
    if (!$sliders.length) return;

    const getPoint = (e) => {
      const original = e.originalEvent || e;
      const touch =
        (original.touches && original.touches[0]) ||
        (original.changedTouches && original.changedTouches[0]);

      return {
        x: touch ? touch.clientX : original.clientX,
        y: touch ? touch.clientY : original.clientY,
      };
    };

    const baseSettings = {
      draggable: true,
      swipe: true,
      touchMove: true,
      swipeToSlide: true,
      waitForAnimate: false,
      touchThreshold: 1000,
      cssEase: "ease-out",
    };

    $sliders.each(function () {
      const $slider = $(this);
      const finalSettings = { ...baseSettings, ...settings };

      if (finalSettings.speed && finalSettings.speed > 700) {
        finalSettings.speed = 450;
      }

      if (!$slider.hasClass("slick-initialized")) {
        $slider.slick(finalSettings);
      }

      let startX = 0;
      let startY = 0;
      let dragged = false;

            $slider
        .on("pointerdown", function () {
          $slider.addClass("is-drag-pressing");
          if ($slider.hasClass("slick-initialized")) {
            $slider.slick("slickPause");
          }
        })
        .on("pointerup pointercancel mouseleave", function () {
          $slider.removeClass("is-drag-pressing");
          if ($slider.hasClass("slick-initialized")) {
            $slider.slick("slickPlay");
          }
        });
$slider
        .off(".dragGuard")
        .on("mousedown.dragGuard touchstart.dragGuard", function (e) {
          const p = getPoint(e);
          startX = p.x || 0;
          startY = p.y || 0;
          dragged = false;
        })
        .on("mousemove.dragGuard touchmove.dragGuard", function (e) {
          const p = getPoint(e);
          if (
            Math.abs((p.x || 0) - startX) > 6 ||
            Math.abs((p.y || 0) - startY) > 6
          ) {
            dragged = true;
          }
        })
        .on("click.dragGuard", "a", function (e) {
          if (dragged || $slider.hasClass("slick-dragging")) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        });
    });

    if (prevBtn) {
      $(document).on("click", prevBtn, function () {
        $sliders.slick("slickPrev");
      });
    }

    if (nextBtn) {
      $(document).on("click", nextBtn, function () {
        $sliders.slick("slickNext");
      });
    }
  }
  // projects slider section
  $(function () {
    function initInfiniteCardSlider(sectionSelector) {
      const section = document.querySelector(sectionSelector);
      if (!section) return;

      const slider = section.querySelector(".projects-autoplay");
      if (!slider) return;

      const $slider = $(slider);

      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }

      slider.querySelectorAll("[data-slider-clone='true']").forEach(function (clone) {
        clone.remove();
      });

      const originalCards = Array.from(slider.children);

      if (!originalCards.length) return;

      originalCards.forEach(function (card) {
        card.setAttribute("data-slider-original", "true");
      });

      const beforeClones = originalCards.map(function (card) {
        const clone = card.cloneNode(true);
        clone.setAttribute("data-slider-clone", "true");
        clone.removeAttribute("data-slider-original");
        return clone;
      });

      const afterClones = originalCards.map(function (card) {
        const clone = card.cloneNode(true);
        clone.setAttribute("data-slider-clone", "true");
        clone.removeAttribute("data-slider-original");
        return clone;
      });

      beforeClones.reverse().forEach(function (clone) {
        slider.insertBefore(clone, slider.firstChild);
      });

      afterClones.forEach(function (clone) {
        slider.appendChild(clone);
      });

      let isDown = false;
      let startX = 0;
      let lastX = 0;
      let moved = false;
      let hover = false;
      let autoTimer = null;

      function groupWidth() {
        return slider.scrollWidth / 3;
      }

      function setMiddlePosition() {
        slider.scrollLeft = groupWidth();
      }

      function normalizeLoopPosition() {
        const width = groupWidth();

        if (!width) return;

        if (slider.scrollLeft < width * 0.5) {
          slider.scrollLeft += width;
        }

        if (slider.scrollLeft > width * 1.5) {
          slider.scrollLeft -= width;
        }
      }

      function cardStep() {
        const card = slider.querySelector("[data-slider-original='true']");
        if (!card) return slider.clientWidth * 0.8;

        const rect = card.getBoundingClientRect();
        const style = window.getComputedStyle(slider);
        const gap = parseFloat(style.gap || style.columnGap || "30") || 30;

        return rect.width + gap;
      }

      function stopAuto() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }

      function startAuto() {
        stopAuto();

        if (isDown || hover) return;

        autoTimer = setInterval(function () {
          slider.scrollBy({ left: cardStep(), behavior: "smooth" });

          setTimeout(function () {
            normalizeLoopPosition();
          }, 520);
        }, 4200);
      }

      function dragStart(e) {
        if (e.button !== undefined && e.button !== 0) return;

        isDown = true;
        moved = false;
        startX = e.clientX;
        lastX = e.clientX;

        slider.classList.add("is-card-dragging");
        document.body.classList.add("is-card-slider-dragging");

        stopAuto();
        e.preventDefault();
      }

      function dragMove(e) {
        if (!isDown) return;

        const delta = e.clientX - lastX;
        lastX = e.clientX;

        if (Math.abs(e.clientX - startX) > 1) {
          moved = true;
        }

        slider.scrollLeft -= delta;
        normalizeLoopPosition();

        e.preventDefault();
      }

      function dragEnd() {
        if (!isDown) return;

        isDown = false;
        slider.classList.remove("is-card-dragging");
        document.body.classList.remove("is-card-slider-dragging");

        normalizeLoopPosition();

        setTimeout(function () {
          moved = false;
        }, 120);

        startAuto();
      }

      slider.addEventListener("mousedown", dragStart);
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);

      slider.addEventListener(
        "touchstart",
        function (e) {
          if (!e.touches || !e.touches.length) return;

          isDown = true;
          moved = false;
          startX = e.touches[0].clientX;
          lastX = e.touches[0].clientX;

          slider.classList.add("is-card-dragging");
          document.body.classList.add("is-card-slider-dragging");

          stopAuto();
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchmove",
        function (e) {
          if (!isDown || !e.touches || !e.touches.length) return;

          const x = e.touches[0].clientX;
          const delta = x - lastX;
          lastX = x;

          if (Math.abs(x - startX) > 1) {
            moved = true;
            e.preventDefault();
          }

          slider.scrollLeft -= delta;
          normalizeLoopPosition();
        },
        { passive: false }
      );

      slider.addEventListener("touchend", dragEnd);
      slider.addEventListener("touchcancel", dragEnd);

      $slider.off("click.cardDrag").on("click.cardDrag", "a", function (e) {
        if (moved) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      });

      section.addEventListener("mouseenter", function () {
        hover = true;
        stopAuto();
      });

      section.addEventListener("mouseleave", function () {
        hover = false;
        if (!isDown) startAuto();
      });

      $(section).find(".projects-prev").off("click.cardDrag").on("click.cardDrag", function () {
        slider.scrollBy({ left: -cardStep(), behavior: "smooth" });

        setTimeout(function () {
          normalizeLoopPosition();
        }, 520);
      });

      $(section).find(".projects-next").off("click.cardDrag").on("click.cardDrag", function () {
        slider.scrollBy({ left: cardStep(), behavior: "smooth" });

        setTimeout(function () {
          normalizeLoopPosition();
        }, 520);
      });

      requestAnimationFrame(function () {
        setMiddlePosition();
        startAuto();
      });

      window.addEventListener("resize", function () {
        setMiddlePosition();
      });
    }

    initInfiniteCardSlider(".product-applications-section");
    initInfiniteCardSlider(".who-we-serve-section");
  });
  // our testimonial section
  $(function () {
    const $right = $(".our-testimonial-right-up-slider");
    const $left = $(".our-testimonial-left-slider");
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 280,
      arrows: false,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
    };
    $right.slick({
      ...settings,
      dots: true,
      appendDots: $(".our-testimonial-dots"),
      asNavFor: ".our-testimonial-left-slider",
    });
    $left.slick({
      ...settings,
      dots: false,
      asNavFor: ".our-testimonial-right-up-slider",
    });
    $(".our-testimonial-prev-arrow").on("click", () =>
      $right.slick("slickPrev"),
    );
    $(".our-testimonial-next-arrow").on("click", () =>
      $right.slick("slickNext"),
    );
  });
  // latest blogs section
  $(function () {
    initSlickSlider({
      slider: ".latest-blogs-slider",
      prevBtn: ".blogs-prev",
      nextBtn: ".blogs-next",
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplaySpeed: 4000,
        speed: 280,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1401,
            settings: { slidesToShow: 3, variableWidth: false },
          },
          {
            breakpoint: 992,
            settings: { slidesToShow: 2, variableWidth: false },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 1, variableWidth: false },
          },
        ],
      },
    });
  });
  // custom carpentry our projects slider section
  $(function () {
    initSlickSlider({
      slider: ".latest-blogs-slider2",
      prevBtn: ".blogs-prev",
      nextBtn: ".blogs-next",
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplaySpeed: 4000,
        speed: 280,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
      },
    });
  });
  // team progress section
  $(function () {
    const $section = $(".progress-section");
    if (!$section.length) return;
    const animateProgress = () => {
      $(".progress-bar .progress-item").each(function () {
        const $item = $(this).find(".progress");
        const target = parseInt($item.data("progress"), 10) || 0;
        const $val = $(this).find(".item-value");
        let current = 0;
        const animate = () => {
          if (current <= target) {
            $item.css("width", current + "%");
            $val.text(current + "%");
            current++;
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      });
    };
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgress();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe($section[0]);
  });
  // pricing plan toggle section
  $(".switch input").on("change", function () {
    const yearly = this.checked;
    $(".monthly-yearly-container").toggleClass("yearly-active", yearly);
    $(".price-value").each(function () {
      const price = yearly ? $(this).data("yearly") : $(this).data("monthly");
      $(this).text(`$${price}`);
    });
    $(".price-duration").text(yearly ? "/year" : "/month");
    $(".pricing-plan-img").each(function () {
      $(this).attr(
        "src",
        yearly ? $(this).data("yearly-img") : $(this).data("monthly-img"),
      );
    });
  });
  // testimonial load more button section
  $(".load-more-btn").on("click", function (e) {
    e.preventDefault();
    $(".testimonial-grid-card.hidden").removeClass("hidden");
    $(this).addClass("hide");
  });
  // projects load more button section
  $(".load-more-projects-btn").on("click", function (e) {
    e.preventDefault();
    $(".projects-card.hidden").removeClass("hidden");
    $(this).addClass("hide");
  });
  // single project-1 load more button section
  $(".load-more-single-project-btn").on("click", function (e) {
    e.preventDefault();
    $(".single-project1-card.hidden").removeClass("hidden");
    $(this).addClass("hide");
  });
  // projects3 load more button section
  $(".load-more-project3-btn").on("click", function (e) {
    e.preventDefault();
    $(".projects3-box.hidden").removeClass("hidden");
    $(this).addClass("hide");
  });
  // custom select dropdown
  $(function () {
    $(document).on("click", ".select-head", function () {
      const $select = $(this).closest(".custom-select");
      $(".custom-select")
        .not($select)
        .removeClass("open")
        .find(".select-list")
        .hide();
      $select.toggleClass("open").find(".select-list").toggle();
    });
    $(document).on("click", ".select-list li", function () {
      const $select = $(this).closest(".custom-select");
      $select.find(".selected-text").text($(this).text());
      $(this).addClass("active").siblings().removeClass("active");
      $select.removeClass("open").find(".select-list").hide();
    });
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".custom-select").length) {
        $(".custom-select").removeClass("open").find(".select-list").hide();
      }
    });
  });
  // single project-2 image slider section
  $(".single-project2-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 2000,
    arrows: false,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
  });
  // our timeline slider section
  $(function () {
    const $prev = $(".our-timeline-prev");
    const $next = $(".our-timeline-next");
    let position = 0;
    const max = 2;
    initSlickSlider({
      slider: ".our-timeline-slider",
      prevBtn: ".our-timeline-prev",
      nextBtn: ".our-timeline-next",
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 280,
        variableWidth: true,
        infinite: false,
        responsive: [
          {
            breakpoint: 1515,
            settings: { slidesToShow: 2, variableWidth: false },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 1, variableWidth: false },
          },
        ],
      },
    });
    const update = () => {
      $prev.removeClass("show-arrow");
      $next.removeClass("show-arrow");
      if (position > 0) $prev.addClass("show-arrow");
      if (position < max) $next.addClass("show-arrow");
    };
    update();
    $next.on("click", () => {
      if (position < max) {
        position++;
        update();
      }
    });
    $prev.on("click", () => {
      if (position > 0) {
        position--;
        update();
      }
    });
  });
  // Product, plywood, and gallery image viewer
  $(function () {
    if (typeof Fancybox === "undefined") return;

    const openImageViewer = (img, caption) => {
      if (!img || !img.src) return;
      Fancybox.show([
        {
          src: img.currentSrc || img.src,
          type: "image",
          caption: caption || img.alt || "",
        },
      ]);
    };

    $(document).on(
      "click",
      ".projects3-image-container:not(a), .plywood-card-3d",
      function (e) {
        const img = this.querySelector("img");
        const caption =
          this.dataset.name ||
          this.querySelector(
            ".projects3-overlay-content h3",
          )?.textContent?.trim() ||
          img?.alt ||
          "";
        openImageViewer(img, caption);
      },
    );
  });
})(jQuery);

(function ($) {
  "use strict";

  if (window.__alaminMobileMenuFixApplied) return;
  window.__alaminMobileMenuFixApplied = true;

  $(function () {
    const $nav = $(".mobile-nav");
    const $overlay = $(".menu-overlay");

    if (!$nav.length || !$overlay.length) return;

    let lockedScrollY = 0;

    function lockPageScroll() {
      if ($("body").hasClass("menu-open")) return;

      lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

      $("html, body").addClass("menu-open");
      document.body.style.top = "-" + lockedScrollY + "px";
    }

    function unlockPageScroll() {
      if (!$("body").hasClass("menu-open")) return;

      $("html, body").removeClass("menu-open");
      document.body.style.top = "";

      window.scrollTo(0, lockedScrollY);
    }

    function syncMenuState() {
      if ($nav.hasClass("active")) {
        $overlay.addClass("active");
        lockPageScroll();
      } else {
        $overlay.removeClass("active");
        unlockPageScroll();
      }
    }

    function closeMobileMenu() {
      $nav.removeClass("active");
      $overlay.removeClass("active");
      $(".submenu.open, .submenu-right.open").removeClass("open");
      syncMenuState();
    }

    const observer = new MutationObserver(syncMenuState);

    observer.observe($nav[0], {
      attributes: true,
      attributeFilter: ["class"],
    });

    $(document)
      .off("click.mobileMenuOutsideClose")
      .on("click.mobileMenuOutsideClose", function (event) {
        if (window.innerWidth > 1199 || !$nav.hasClass("active")) return;

        const $target = $(event.target);

        if ($target.closest(".mobile-nav, .menu-toggle").length) return;

        closeMobileMenu();
      });

    $overlay
      .off("click.mobileMenuOverlayClose")
      .on("click.mobileMenuOverlayClose", function (event) {
        event.preventDefault();
        closeMobileMenu();
      });

    $(document)
      .off("keydown.mobileMenuEscapeClose")
      .on("keydown.mobileMenuEscapeClose", function (event) {
        if (event.key === "Escape" && $nav.hasClass("active")) {
          closeMobileMenu();
        }
      });

    $(window)
      .off("resize.mobileMenuAutoClose")
      .on("resize.mobileMenuAutoClose", function () {
        if (window.innerWidth > 1199 && $nav.hasClass("active")) {
          closeMobileMenu();
        }
      });

    syncMenuState();
  });
})(jQuery);