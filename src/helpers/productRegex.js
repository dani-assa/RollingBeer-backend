export const nameMenu = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/u;

export const imageMenu = /^https:\/\/.*\.(jpg|jpeg|png|gif)$/;

export const priceMenu = /^(?!-)(?:\d{1,8}(?:\.\d{1,2})?|100000000)$/;

export const cantidadMenu = /^(?!-)(?:\d{1,9}|1000000000)$/;

export const descriptionMenu = /^[a-zA-Z0-9\s.,!?()-]+$/;