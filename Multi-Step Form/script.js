const formElements = {
  formBoxes: document.querySelectorAll(".form__box"),
  formBoxesName: document.querySelectorAll(".form__box h4"),
  formPricingContainer: document.querySelectorAll(".form__pricing-container"),
  formStep2Price: document.querySelectorAll(".form__step-2-price"),
  formYearlyDiscount: document.querySelectorAll(".form__yearly-discount"),
  formInputCheckbox: document.querySelector("#form__input-checkbox"),
  formMonth: document.querySelector(".form__monthly"),
  formYear: document.querySelector(".form__yearly"),
  formSilder: document.querySelector("input:checked + .slider:before"),

  formRectangles: document.querySelectorAll(".form__rectangle"),
  formPrice: document.querySelectorAll(".form__price"),
  formChange: document.querySelector(".form__change"),

  formHolderPricingChoice: document.querySelector(
    ".form__holder-pricing-choice"
  ),
  formHolderPricingPrice: document.querySelector(".form__holder-pricing-price"),

  activePlanName: document.querySelector(".form__box-active h4"),
  activePlanPrice: document.querySelector(
    ".form__box-active .form__step-2-price"
  ),

  formHolderContainer: document.querySelector(".form__holder-container"),

  //
};


// Variables
const formSteps = document.querySelectorAll(".form__step");
const formCircles = document.querySelectorAll(".form__circle"); // Form Circles

const nameFull = document.getElementById("form__input-name");
const email = document.getElementById("form__input-email");
const phone = document.getElementById("form__input-phone");

const formInput = document.querySelectorAll(".form__input"); // [Name, Email, Phone]

let currentFormStep = 0;
let currentFormCircle = 0;

const formButtonNext = document.querySelectorAll(".form__button-next");
const formButtonBack = document.querySelectorAll(".form__button-back");

const updateForm = (stepDelta, circleDelta) => {
  formSteps[currentFormStep].classList.add("form__hidden");
  currentFormStep = Math.min(currentFormStep + stepDelta, formSteps.length - 1);
  formSteps[currentFormStep].classList.remove("form__hidden");

  formCircles[currentFormCircle].classList.remove("form__active");
  currentFormCircle = Math.min(
    currentFormCircle + circleDelta,
    formCircles.length - 1
  );
  formCircles[currentFormCircle].classList.add("form__active");
};

const buttonClickHandler = (stepDelta, circleDelta) => () => {
  if (
    currentFormStep + stepDelta >= 0 &&
    currentFormStep + stepDelta < formSteps.length &&
    checkInputs()
  ) {
    updateForm(stepDelta, circleDelta);
  }
};

formButtonNext.forEach((button) => {
  button.addEventListener("click", buttonClickHandler(1, 1));
});

formButtonBack.forEach((button) => {
  button.addEventListener("click", buttonClickHandler(-1, -1));
});

const errorMessage = [
  "This field is required",
  "Wrong email format",
  "Phone number must be 10 digits",
];

formSteps[0].addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

const setError = (inputElement, message) => {
  inputElement.parentElement.querySelector(
    ".form__input--error-message"
  ).textContent = message;

  inputElement.classList.add("form__input--error");
};

const toggleError = (inputElement, message = "") => {
  inputElement.parentElement.querySelector(
    ".form__input--error-message"
  ).textContent = message;
  inputElement.classList.toggle("form__input--error", !!message);
};

// Remove error upon entry
formInput.forEach((input) => {
  input.addEventListener("input", () => {
    // input.className = input.className.replace(/form__input--error?/, "");
    toggleError(input);
  });
});

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhoneNumber = (phoneNumber) => {
  const ph = /^(\s?\(\d{3}\)|\s?\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return ph.test(phoneNumber);
};

const checkInputs = () => {
  const nameValue = nameFull.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();

  let isValid = true;

  if (emailValue === "") {
    toggleError(email, errorMessage[0]);
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    toggleError(email, errorMessage[1]);
    isValid = false;
  } else {
    toggleError(email);
  }

  if (nameValue === "") {
    toggleError(nameFull, errorMessage[0]);
    isValid = false;
  } else {
    toggleError(nameFull);
  }

  if (phoneValue === "") {
    toggleError(phone, errorMessage[0]);
    isValid = false;
  } else if (!isValidPhoneNumber(phoneValue)) {
    toggleError(phone, errorMessage[2]);
    isValid = false;
  } else {
    toggleError(phone);
  }

  return isValid;
};
////////////////////////////////// Switcher Section begins here ////////////////////////////////////////////////////

const pricingInfo = {
  monthly: [9, 12, 15],
  yearly: [90, 120, 150],
  monthlyAddOns: [1, 2, 2],
  yearlyAddOns: [10, 20, 20],
  plans: ["Arcade", "Advanced", "Pro"],
  addOnsNames: ["Online Service", "Larger Storage", "Customizable Profile"],
};

// Initial State of Elements upon Loading Page
document.addEventListener("DOMContentLoaded", () => {
  // Initial condition of CheckBox
  formElements.formInputCheckbox.checked = false;

  // Initial Plan Names
  formElements.formBoxesName.forEach((formBoxName, nameIndex) => {
    formBoxName.innerHTML = pricingInfo.plans[nameIndex];
  });

  // Initial Monthly Prices
  formElements.formStep2Price.forEach((price, priceIndex) => {
    price.innerHTML = pricingInfo.monthly[priceIndex];
  });

  // Initial Summary Screen Given Active classes
  // Initial Plan Name
  formElements.formHolderPricingChoice.innerHTML = `${formElements.activePlanName.innerHTML} (Monthly)`;
  // Initial Plan Price
  formElements.formHolderPricingPrice.innerHTML = `$${formElements.activePlanPrice.innerHTML}/mo`;

  // Initial Container Box
  formElements.formPricingContainer.forEach((container, containerIndex) => {
    formElements.formStep2Price[containerIndex].innerHTML = formElements
      .formInputCheckbox.checked
      ? `$<span class="form__step-2-price">${pricingInfo.yearly[containerIndex]}</span>/yr`
      : `$<span class="form__step-2-price">${pricingInfo.monthly[containerIndex]}</span>/mo`;
  });

  // Initial Rectangle Name / Price added
  formElements.formRectangles.forEach((rectangle, rectangleIndex) => {
    if (rectangle.classList.contains("form__rectangle-active")) {
      formElements.formHolderContainer.innerHTML = formElements
        .formInputCheckbox.checked
        ? `
      <div class="form__holder holder">
        <h4>${pricingInfo.addOnsNames[rectangleIndex]}</h4>
        <h4>+${pricingInfo.yearlyAddOns[rectangleIndex]}/yr</h4>
      </div>`
        : `
      <div class="form__holder holder">
      <h4>${pricingInfo.addOnsNames[rectangleIndex]}</h4>
      <h4>+${pricingInfo.monthlyAddOns[rectangleIndex]}/mo</h4>
    </div>`;
    }
  });

  const tallyings = document.querySelectorAll(".tallying");
  tallyings.forEach((tally) => {
    if (tally.innerHTML === "+$1/mo") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$10/yr`
        : `+$1/mo`;
    } else if (tally.innerHTML === "+$10/yr") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$10/yr`
        : `+$1/mo`;
    }

    if (tally.innerHTML === "+$2/mo") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$20/yr`
        : `+$2/mo`;
    } else if (tally.innerHTML === "+$20/yr") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$20/yr`
        : `+$2/mo`;
    }
  });

  const formHolderBottom = document.querySelector('.form__holders-bottom');
  let tallyArray = Array.from(tallyings)

  let tallySum = 0;
  for (let i = 0; i < tallyArray.length; i++) {
    tallySum += tallyArray[i];
  }

  let firstAmount = formElements.formHolderPricingPrice.innerHTML;
  let firstAmountParsed = parseInt(firstAmount.replace(/\D/g, ""), 10);
  let totalValue = firstAmountParsed + tallySum;

  // formElements.formHolderPricingPrice

  formHolderBottom.innerHTML = formElements.formInputCheckbox.checked
    ?
    `
  <div class="form__holder">
    <h4>Total (per year)</h4>
    <h3>$${totalValue}/yr</h3>
  </div>
  `
    :
    `
  <div class="form__holder">
    <h4>Total (per month)</h4>
    <h3>$${totalValue}/mo</h3>
  </div>
  `;

  lastSection();

});

// Adds Active Class to Box
formElements.formBoxes.forEach((formBox, formBoxIndex) => {
  formBox.addEventListener("click", () => {
    formElements.formBoxes.forEach((otherFormBoxes) => {
      otherFormBoxes.classList.remove("form__box-active");
    });
    formBox.classList.add("form__box-active");
    // returnsActiveClassBoxInformation();

    // Use these for checkbox switch as well
    if (formBox.classList.contains("form__box-active", "form__step-2-price")) {
      formElements.formHolderPricingPrice.innerHTML = formElements
        .formInputCheckbox.checked
        ? `$${pricingInfo.yearly[formBoxIndex]}/yr`
        : `$${pricingInfo.monthly[formBoxIndex]}/mo`;

      lastSection();
    }

    if (formBox.classList.contains("form__box-active", "h4")) {
      formElements.formHolderPricingChoice.innerHTML = formElements
        .formInputCheckbox.checked
        ? `${pricingInfo.plans[formBoxIndex]} (Yearly)`
        : `${pricingInfo.plans[formBoxIndex]} (Monthly)`;
      lastSection();
    }
    lastSection();
  });
});

// Month - Year Switchers And their Effects
formElements.formInputCheckbox.addEventListener("change", () => {

  // First Change
  formElements.formPrice.forEach((price, priceIndex) => {
    formElements.formYearlyDiscount[priceIndex].innerHTML = formElements
      .formInputCheckbox.checked
      ? "2 months free"
      : "";

    price.innerHTML = formElements.formInputCheckbox.checked
      ? `+$${pricingInfo.yearlyAddOns[priceIndex]}/yr`
      : `+$${pricingInfo.monthlyAddOns[priceIndex]}/mo`;

    formElements.formStep2Price[priceIndex].innerHTML = formElements
      .formInputCheckbox.checked
      ? `$<span class="form__step-2-price">${pricingInfo.yearly[priceIndex]}</span>/yr`
      : `$<span class="form__step-2-price">${pricingInfo.monthly[priceIndex]}</span>/mo`;
  });

  formElements.formBoxes.forEach((formBox, formBoxIndex) => {
    // Use these for checkbox switch as well

    if (formBox.classList.contains("form__box-active", "form__step-2-price")) {
      formElements.formHolderPricingPrice.innerHTML = formElements
        .formInputCheckbox.checked
        ? `$${pricingInfo.yearly[formBoxIndex]}/yr`
        : `$${pricingInfo.monthly[formBoxIndex]}/mo`;
    }

    if (formBox.classList.contains("form__box-active", "h4")) {
      formElements.formHolderPricingChoice.innerHTML = formElements
        .formInputCheckbox.checked
        ? `${pricingInfo.plans[formBoxIndex]} (Yearly)`
        : `${pricingInfo.plans[formBoxIndex]} (Monthly)`;
    }
  });

  const tallyings = document.querySelectorAll(".tallying");
  tallyings.forEach((tally) => {
    if (tally.innerHTML === "+$1/mo") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$10/yr`
        : `+$1/mo`;
    } else if (tally.innerHTML === "+$10/yr") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$10/yr`
        : `+$1/mo`;
    }

    if (tally.innerHTML === "+$2/mo") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$20/yr`
        : `+$2/mo`;
    } else if (tally.innerHTML === "+$20/yr") {
      tally.innerHTML = formElements.formInputCheckbox.checked
        ? `+$20/yr`
        : `+$2/mo`;
    }
  });
  lastSection();
});

document.addEventListener("DOMContentLoaded", () => {
  const formRectangles = document.querySelectorAll(".form__rectangle");

  formRectangles.forEach((formRectangle) => {
    const formCheck = formRectangle.querySelector(".form__check");

    const handleClick = () => {
      formRectangle.classList.toggle("form__rectangle-active");
      formCheck.checked = formRectangle.classList.contains(
        "form__rectangle-active"
      );

      // Initial Rectangle Name / Price added
      formElements.formRectangles.forEach((rectangle, rectangleIndex) => {
        if (rectangle.classList.contains("form__rectangle-active")) {
          formElements.formHolderContainer.innerHTML += formElements
            .formInputCheckbox.checked
            ? `
      <div class="form__holder holder">
        <h4>${pricingInfo.addOnsNames[rectangleIndex]}</h4>
        <h4 class='tallying'>+$${pricingInfo.yearlyAddOns[rectangleIndex]}/yr</h4>
      </div>`
            : `
      <div class="form__holder holder">
        <h4>${pricingInfo.addOnsNames[rectangleIndex]}</h4>
        <h4 class='tallying'>+$${pricingInfo.monthlyAddOns[rectangleIndex]}/mo</h4>
      </div>`;
        }
      });
    };

    formRectangle.addEventListener("click", () => {
      formElements.formHolderContainer.innerHTML = "";
      handleClick();
      lastSection();

    });

    formCheck.addEventListener("click", (event) => {
      event.stopPropagation();
      handleClick();
      lastSection();

    });


  });
});

// Brings Back to Change Options
formElements.formChange.addEventListener("click", (event) => {
  event.preventDefault();
  // Hide all form steps
  formSteps.forEach((formStep) => {
    formStep.classList.add("form__hidden");
  });
  // Display the second form step
  formSteps[1].classList.remove("form__hidden");
  // Update the active circle
  formCircles.forEach((circle) => {
    circle.classList.remove("form__active");
  });
  formCircles[1].classList.add("form__active");
  // Update the step/circle values
  currentFormStep = 1;
  currentFormCircle = 1;

  lastSection();
});

let inputString = "+$20/yr";
let parsedValue = parseInt(inputString.replace(/\D/g, ""), 10);

function lastSection() {
  const formHolderBottom = document.querySelector('.form__holders-bottom');
  const tallyings = document.querySelectorAll(".tallying");


  let tallyArray = Array.from(tallyings)

  let tallySum = 0;
  for (let i = 0; i < tallyArray.length; i++) {
    tallySum += parseInt(tallyArray[i].innerHTML.replace(/\D/g, ""), 10)
  }
  console.log(tallySum)


  let firstAmount = formElements.formHolderPricingPrice.innerHTML;
  let firstAmountParsed = parseInt(firstAmount.replace(/\D/g, ""), 10);
  console.log(firstAmountParsed + tallySum)

  let totalValue = firstAmountParsed + tallySum;
  console.log(totalValue);
  console.log(typeof totalValue);


  formHolderBottom.innerHTML = formElements.formInputCheckbox.checked
    ?
    `
  <div class="form__holder">
    <h4>Total (per year)</h4>
    <h3>$${totalValue}/yr</h3>
  </div>
  `
    :
    `
  <div class="form__holder">
    <h4>Total (per month)</h4>
    <h3>$${totalValue}/mo</h3>
  </div>
  `;
}