export const initialCards = [];

export const buttonOpenProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonOpenNewCardForm = document.querySelector(
  ".profile__add-button"
);
export const buttonOpenAvatarEditForm = document.querySelector(
  ".profile__avatar-edit"
);

export const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const formValidators = {};

export const apiURL = "https://mesto.nomoreparties.co/v1/cohort-44";

export const baseAuthURL = "https://auth.nomoreparties.co";

export const headers = {
  authorization: "ba4cc9cb-bb64-45d3-b2e3-92f91eb3a7e5",
  "Content-Type": "application/json",
};

export const authHeaders = {
  "Content-Type": "application/json"
};