Используется БД - PostgreSQL

Инструкция по развертыванию

1. Клонировать репозиторий.
2. Создать базу данных с именем, например, hotel
3. Создать файл .env с параметрами (указать свои):
   PORT=5000
   DB_NAME=hotel
   DB_USER=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_PASSWORD=password
4. Для инициализации тестовых данных в бд - запустить приложение с помощью команды npm run start:init:data.
5. Запустить приложение с помощью команды npm start.

Инструкция для проверки работоспособности:

1. Открыть postman
2. Получить все комнаты: выполнить GET-запрос http://localhost:5000/api/rooms
3. Получить все комнаты, которые свободны в опеределенные даты: выполнить GET-запрос http://localhost:5000/api/rooms указав Query Params: startDate, endDate в виде YYYY-MM-DD.
4. Забронировать комнату: выполнить POST-запрос http://localhost:5000/api/rooms/:roomId, где roomId - id комнаты,
   пример body запроса (JSON):
   {
   "userId": "0dc78457-eb6c-4f9e-8c7d-24d53248ded8",
   "startDate": "2020-03-05",
   "endDate": "2020-03-08"
   },
   где userId - id клиента, startDate - даты заезда и выезда соответственно
5. Отменить бронь: выполнить DELETE-запрос http://localhost:5000/api/orders,
   пример body запроса (JSON):
   {
   "orderId": "9245518b-7ad5-4ead-b646-20e59496c7a2",
   "userId": "0dc78457-eb6c-4f9e-8c7d-24d53248ded6"
   },
   где userId - id клиента, orderId - id брони.
