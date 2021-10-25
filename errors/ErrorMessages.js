const wrongName = 'Неправильное имя';
const wrongLink = 'Ошибка в ссылке';
const wrongAuth = 'Неверный E-mail или пароль';
const wrongId = 'Неверный Id';
const wrongMail = 'E-mail не соответствует требованиям';
const wrongPassword = 'Пароль не соответствует требованиям (минимум 4 знака)';
const errorMessage = {
  badRequest: 'Переданы некорректные данные',
  unauthorized: 'Необходима авторизация пользователя',
  tokenRequired: 'Необходима авторизация: отсутствует токен',
  incorrectLoginOrPassword: 'Неверный логин или пароль',
  forbidden: 'У пользователя нет прав для удаления фильма',
  notFound: 'Данные не найдены',
  userAlreadyRegistered: 'Пользователь с такими данными уже зарегистрирован',
  internalServerError: 'На сервере произошла ошибка',
  invalidUrl: 'Неправильный формат ссылки',
  invalidEmail: 'Неправильный формат электронной почты',
  tooManyRequests: 'Слишком много запросов с этого IP. Попробуйте через 1 час',
};
module.exports = {
  errorMessage,
  wrongName,
  wrongLink,
  wrongAuth,
  wrongId,
  wrongMail,
  wrongPassword,
};
