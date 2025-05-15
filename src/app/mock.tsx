const email = "la@gmail.com";

const addresses = {
  streetName: "sovet",
  streetNumber: "56",
  postalCode: "246001",
  city: "Gomel",
  country: "BY",
};

export const body = {
  email: email,
  firstName: "papa",
  lastName: "Popov",
  password: "secret123",
  addresses: [addresses],
  defaultShippingAddress: 0, //Это индекс элемента(адреса) массива адресов из пункта "addresses", который будет устанавливаться по умолчанию. Давай если введён один адрес, то он и будет по умолчанию
  defaultBillingAddress: 0, //Это адрес выставления счёта, тоже индекс из массива адресов
  dateOfBirth: "1992-10-17",
  store: "rush-store",
};

export const login = {
  email: email,
  password: "secret123",
};
