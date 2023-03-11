$(document).ready(function () {
  $('.slider__inner').slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
          arrows: false,
        }
      }
    ]
  });

  //-------- tabs script
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  //-------- catalog item descr toggle
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__link-back');

  // modal
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  //-------- form validation
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: "required",
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите минимум {0} символа")
        },
        phone: "Нам важна связь с Вами!",
        email: {
          required: "Нам нужна ваша почта",
          email: "Указан неправильный адрес почты",
        }
      }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  //-------- phone input masked
  $('input[name=phone]').mask("(999) 999-9999", { placeholder: "Ваш телефон" });

  //-------- work with forms
  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  })

  // Smooth scroll and pageup
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

});
