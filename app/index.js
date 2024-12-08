// index.js

const http = require('http');
const os = require('os');

// Получаем переменные окружения
const author = process.env.AUTHOR || 'Unknown Author';
const uuid = process.env.UUID || '00000000-0000-0000-0000-000000000000';

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
    // Установим заголовок Content-Type
    res.setHeader('Content-Type', 'application/json');

    // Обрабатываем запросы
    if (req.method === 'GET') {
        if (req.url === '/hostname') {
            // Возвращаем имя хоста
            res.writeHead(200);
            res.end(JSON.stringify({ hostname: os.hostname() }));
        } else if (req.url === '/author') {
            // Возвращаем имя автора
            res.writeHead(200);
            res.end(JSON.stringify({ author: author }));
        } else if (req.url === '/id') {
            // Возвращаем UUID
            res.writeHead(200);
            res.end(JSON.stringify({ id: uuid }));
        } else {
            // Обработка 404 Not Found
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } else {
        // Обработка 405 Method Not Allowed
        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});

// Запускаем сервер на порту 8000
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const port = 3000;

// Эндпоинт для проверки состояния
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Основной эндпоинт
app.get('/', (req, res) => {
  const uuid = process.env.UUID; // Получаем UUID из переменной окружения
  res.send(`Hello from Node.js app with UUID: ${uuid}`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
