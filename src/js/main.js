$(document).ready(function () {
    $('.simple-slider').bxSlider({
        slideWidth: 350,
        minSlides: 1,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 15,
        pager: false,
        prevText: '',
        nextText: '',
        prevSelector: '.simple-slider__arrow-prev',
        nextSelector: '.simple-slider__arrow-next'
    });
    /* $('.simple-slider').slick({
     infinite: true,
     speed: 300,
     slidesToShow: 4,
     slidesToScroll: 1,
     arrows: true,
     prevArrow: '.simple-slider__arrow-prev',
     nextArrow: '.simple-slider__arrow-next',
     responsive: [
     {
     breakpoint: 1024,
     settings: {
     slidesToShow: 3,
     slidesToScroll: 1,
     infinite: true
     }
     },
     {
     breakpoint: 600,
     settings: {
     slidesToShow: 2,
     slidesToScroll: 1,
     infinite: true
     }
     },
     {
     breakpoint: 480,
     settings: {
     arrows: false,
     slidesToShow: 1,
     slidesToScroll: 1,
     infinite: true
     }
     }
     ]
     });*/
    $('#wrapper').slickLightbox();

    $('.centered-slider').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        arrows: true,
        prevArrow: '.centered-slider__button-prev',
        nextArrow: '.centered-slider__button-next',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    // Centered slider read more button
    readMore();
    var getPrevBtn = document.querySelector(".centered-slider__button-prev"),
        getNextBtn = document.querySelector(".centered-slider__button-next");
    getPrevBtn.addEventListener("click", function (e) {
        e.preventDefault();
        readMore();
    });
    getNextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        readMore();
    });
    function readMore() {
        var getParentDiv = document.querySelector(".slick-center").children;
        var getReadBtn = getParentDiv[3];
        getReadBtn.addEventListener("click", function (e) {
            e.preventDefault();
            var getChildDiv = getParentDiv[2];
            getChildDiv.style.display = "block";
            var getCloseBtn = getChildDiv.children[1];
            getCloseBtn.addEventListener("click", function (ev) {
                ev.preventDefault();
                getChildDiv.style.display = "none";
            });
        });
    }

    //Add page button
    var addPgBtn = document.querySelector(".number-pages__addbtn");
    addPgBtn.addEventListener('click', function (e) {
        e.preventDefault();

        var addPgRes = document.querySelector(".summary__number-pages-quantity"),
            quantPg = document.querySelector(".number-pages__quantity"),
            quantSummPg = document.querySelector(".summary__number-pages-price-input"),
            quantSummRes = document.querySelector(".number-pages__summ-price"),
            quantSummDisp = document.querySelector(".summary__number-pages-price-summ");
        var startPos = parseInt(quantPg.value);
        var startPrice = parseInt(quantSummPg.value);
        var incrNum = startPos + 1;
        var incrPrice = incrNum * startPrice;
        addPgRes.innerText = incrNum;
        quantPg.setAttribute("value", incrNum);
        quantSummDisp.innerText = incrPrice;
        quantSummRes.setAttribute("value", incrPrice);
        calculateTotal();
    });
    //Choose way of communication
    var $commValueInput = $(".chosen-communication-way");
    var $commNameOutEl = $(".comm-way-chosen");
    initializeCommunicationDropdown(".form-field__contact-list", $commValueInput, $commNameOutEl);

    function initializeCommunicationDropdown(listSelector, $wayIDInput, $wayNameOuputEl) {

        var communicationList = document.querySelector(listSelector);
        communicationList.addEventListener("click", function (e) {
            var $li = $(e.target).parents(".form-field__contact-item");
            if (!$li.length) {
                return;
            }

            var id = $li.attr("data-id");
            var name = $("[class=form-field__contact-item-name]", $li).text();

            $wayIDInput.attr("value", id);
            $wayNameOuputEl.text(name);
        });
    }
    //Close list aside
    var commCheck = '#communication-contact';
    var commLabel = '#communication-contact+label';
    var responsCheck = '#responsive-list-toggle';
    var responsLabel = '#responsive-list-toggle+label';
    var nonResponsCheck = '#nonresponsive-list-toggle';
    var nonResponsLabel = '#nonresponsive-list-toggle+label';
    closeAside(commCheck, commLabel);
    closeAside(responsCheck, responsLabel);
    closeAside(nonResponsCheck, nonResponsLabel);
    function closeAside (checkBoxSelector, checkLabelSelector) {
        $(document).click(function (e) {
            var aCheckBox = $(checkBoxSelector);
            aCheckBox.prop("checked", false);
        });
        var aCheckBox = $(checkBoxSelector);
        var aCheckLabel = $(checkLabelSelector);
        $(aCheckBox).click(function (e) {
            e.stopPropagation();
        });
        $(aCheckLabel).click(function (e) {
            e.stopPropagation();
        });
    }
    //Choose package
    var $priceValueInput = $(".chosen-item__price");
    var $priceNameOutEl = $(".summary__selected-package-price-summ");
    var $projNameOutEl = $(".summary__selected-package-line2");
    initializePricesDropdown(".forms-field__nonresponsive-list", $priceValueInput, $priceNameOutEl, $projNameOutEl);
    initializePricesDropdown(".forms-field__responsive-list", $priceValueInput, $priceNameOutEl, $projNameOutEl);


    function initializePricesDropdown(listSelector, $packageIDInput, $priceNameOuputEl) {

        var packageList = document.querySelector(listSelector);
        packageList.addEventListener("click", function (e) {
            var $li = $(e.target).parents(".forms-field__item");
            if (!$li.length) {
                return;
            }

            var id = $li.attr("data-id");
            var price = $li.attr("data-price");
            var name = $("[class*=responsive-item-name]", $li).text();

            $priceNameOuputEl.text(price);
            $packageIDInput.attr("value", id);
            $projNameOutEl.text(name);
            calculateTotal();
        });
    }

//Calculate summary
    function calculateTotal() {
        var quantPgPrice = document.querySelector(".number-pages__summ-price"),
            getQuantPgPrice = parseInt(quantPgPrice.getAttribute("value")),
            packagePrice = document.querySelector(".summary__selected-package-price-summ"),
            getPackagePrice = parseInt(packagePrice.innerText),
            totalPrice = document.querySelector(".summary__total-price-number"),
            totalPriceOutput = document.querySelector(".summary__total-price-input");
        var totalRes = getPackagePrice + getQuantPgPrice;
        totalPrice.innerText = totalRes;
        totalPriceOutput.setAttribute("value", totalRes);
    }


    var form = document.querySelector(".validate-this");
    (function () {
        var textName = form.nameClient,
            textEmail = form.contactNumber,
            textProject = form.projectTitle;

        form.addEventListener("submit", validate);

        function validate(e) {
            e.preventDefault();

            var form = this,
                inputs = form.querySelectorAll("[data-error]");

            clear(inputs, function () {
                checkIsEmpty(inputs);
            });

            function checkIsEmpty(inputs) {
                var isEmpty = false;

                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];

                    if (input.value.trim() === "") {
                        isEmpty = true;
                        markInput(input);
                    }
                }

                if (!isEmpty) {
                    setTimeout(function () {
                        alert("checking is complete");
                        form.submit();
                    }, 300);
                }

            }

            function markInput(input) {
                input.classList.add("error");
                var text = input.getAttribute("data-error");

                if (!text) return;

                var div = document.createElement("div");

                div.textContent = text;
                div.className = "error-text";
                input.parentNode.appendChild(div);
            }

            function clear(inputsItem, callback) {
                for (var i = 0; i < inputsItem.length; i++) {
                    var input = inputsItem[i],
                        parent = input.parentNode,
                        messagerr = parent.querySelector(".error-text");

                    input.classList.remove("error");
                    if (messagerr) parent.removeChild(messagerr);
                }

                if (callback) callback();
            }
        }
    }());
    form.addEventListener("submit", function () {
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/feedback");
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }
            var out = document.createElement("div");
            var jsonString = this.responseText;
            out.innerText = jsonString;
            document.body.appendChild(out);
        };
        var data = {
            nameClient: "",
            contactNumber: "",
            projectTitle: ""
        };
        var str = JSON.stringify(data);
        xhr.send(str);
    });
});