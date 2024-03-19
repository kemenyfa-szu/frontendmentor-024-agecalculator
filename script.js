document.getElementById("years").addEventListener("animationend", () => {
  document.getElementById("years").classList.remove("slide-in");
});
document.getElementById("months").addEventListener("animationend", () => {
  document.getElementById("months").classList.remove("slide-in");
});
document.getElementById("days").addEventListener("animationend", () => {
  document.getElementById("days").classList.remove("slide-in");
});

// Day input validations and setters
function ValidateDay() {
  const day = document.getElementById("day");

  if (day.value == "") {
    SetDayError("This field is required");
    return false;
  }
  const dayVal = Number(day.value);
  if (isNaN(dayVal) || dayVal < 1 || dayVal > 31) {
    SetDayError("Must be a valid day");
    return false;
  }
  resetDayError();
  return true;
}

function SetDayError(errorText) {
  resetDateError();

  document.getElementById("dayError").innerHTML = errorText;
  document.getElementById("dayContainer").classList.add("error");
}

function resetDayError() {
  document.getElementById("dayError").innerHTML = "";
  document.getElementById("dayContainer").classList.remove("error");
}
// End of Day input validations and setters

// Month input validations and setters
function ValidateMonth() {
  const month = document.getElementById("month");

  if (month.value == "") {
    SetMonthError("This field is required");
    return false;
  }
  const monthVal = Number(month.value);
  if (isNaN(monthVal) || monthVal < 1 || monthVal > 12) {
    SetMonthError("Must be a valid month");
    return false;
  }

  resetMonthError();
  return true;
}

function SetMonthError(errorText) {
  resetDateError();

  document.getElementById("monthError").innerHTML = errorText;
  document.getElementById("monthContainer").classList.add("error");
}

function resetMonthError() {
  document.getElementById("monthError").innerHTML = "";
  document.getElementById("monthContainer").classList.remove("error");
}
// End of Month input validations and setters

// Year input validations and setters
function ValidateYear() {
  const year = document.getElementById("year");

  if (year.value == "") {
    SetYearError("This field is required");
    return false;
  }

  const yearVal = Number(year.value);
  if (isNaN(yearVal) || yearVal > new Date().getFullYear()) {
    SetYearError("Must be in the past");
    return false;
  }

  resetYearError();
  return true;
}

function SetYearError(errorText) {
  resetDateError();

  document.getElementById("yearError").innerHTML = errorText;
  document.getElementById("yearContainer").classList.add("error");
}

function resetYearError() {
  document.getElementById("yearError").innerHTML = "";
  document.getElementById("yearContainer").classList.remove("error");
}
// End of Year input validations and setters

// Date validations and setters
function isDateValid(date, year, month, day) {
  return (
    date.getFullYear() == year &&
    date.getMonth() + 1 == month &&
    date.getDate() == day
  );
}

function setDateError(errorText) {
  setUserAge();
  document.getElementById("inputs").classList.add("date-error");
  const dateError = document.getElementById("dateError");
  dateError.classList.add("date-error");
  dateError.innerHTML = errorText;
}

function resetDateError() {
  document.getElementById("inputs").classList.remove("date-error");
  const dateError = document.getElementById("dateError");
  dateError.classList.remove("date-error");
  dateError.innerHTML = "";
}
// End of Date validations and setters

// Modifying "output" elements
function setUserAge(userAge = "") {
  let year;
  let month;
  let day;

  const years = document.getElementById("years");
  const months = document.getElementById("months");
  const days = document.getElementById("days");

  if (userAge == "") {
    year = "--";
    month = "--";
    day = "--";
  } else {
    year = userAge.getFullYear() - 1970;
    month = userAge.getMonth();
    day = userAge.getDate();

    years.classList.add("slide-in");
    months.classList.add("slide-in");
    days.classList.add("slide-in");
  }

  years.innerHTML = year;
  months.innerHTML = month;
  days.innerHTML = day;
}

// Whole Form validation
function ValidateBirthdate() {
  /* Specifications:
  - Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
  */

  // Validating inputs each by each
  let dayValid = ValidateDay();
  let monthValid = ValidateMonth();
  let yearValid = ValidateYear();

  if (!dayValid || !monthValid || !yearValid) {
    setUserAge();
    return false;
  }

  resetDayError();
  resetMonthError();
  resetYearError();

  // Parsing input to date
  const year = document.getElementById("year").value.padStart(4, "0");
  const month = document.getElementById("month").value.padStart(2, "0");
  const day = document.getElementById("day").value.padStart(2, "0");

  const birthDate = new Date(year + "/" + month + "/" + day);

  // Validating parsed date
  if (!isDateValid(birthDate, year, month, day)) {
    setDateError("Must be a valid date");
    return false;
  }

  // Setting up output
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const userAge = new Date(today.getTime() - birthDate.getTime());
  if (userAge < 0) {
    setDateError("Must be in the past");
    return false;
  }
  resetDateError();
  setUserAge(userAge);
  return false;
}
