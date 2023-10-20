
// ==UserScript==
// @name         Post Request and Save Result
// @namespace    inplayipTVPostRequest
// @version      1.0
// @description  Save Results
// @author       DevParadigma
// @match        https://inplayip.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=inplayip.tv
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @run-at       document-start
// @updateURL    https://github.com/devparadigma/inplaytv/raw/main/dev.js
// @downloadURL  https://github.com/devparadigma/inplaytv/raw/main/dev.js
// ==/UserScript==


(function() {
    'use strict';

    // Получаем текущую дату и форматируем ее в необходимый формат (YYYY-MM-DD)
    const today = new Date();
    const searchDate = today.toISOString().split('T')[0];

     // Функция для отправки POST запроса
    function sendPostRequest(url, data) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            onload: function(response) {
                console.log(response.responseText);
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    }

    // Создаем JSON объект с параметрами для запроса
    const requestData = {
        filters: {
            searchDate: searchDate,
            searchWord: "",
            onlyNew: false,
            showVOD: false,
            showLive: false,
            sportsCriteria: [],
            countriesCriteria: [],
            servicesCriteria: []
        },
        timezoneOffset: 0
    };

    // Преобразуем объект в JSON строку
    const jsonRequestBody = JSON.stringify(requestData);

    // Определяем обработчик для выполнения POST запроса
    function sendPostRequest() {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.inplayip.tv/api/schedule/table",
            headers: {
                "Content-Type": "application/json"
            },
            data: jsonRequestBody,
            onload: function(response) {
                const jsonResult = JSON.parse(response.responseText); // Преобразуем полученный результат в JSON объект

                // Сохраняем JSON результат в файл
                const fileData = JSON.stringify(jsonResult);
                const fileName = "postResponse.json";

                // Выполняем загрузку файла
                GM_download({
                    url: "data:application/json;charset=utf-8," + encodeURIComponent(fileData),
                    name: fileName
                });
                // Отправка полученных данных на "https://jsonbase.devparadigma.workers.dev/devdata"
                    sendPostRequest("https://jsonbase.devparadigma.workers.dev/devdata", jsonResult);
            }
        });
    }

    // Выполняем отправку POST запроса при загрузке страницы
    window.addEventListener('load', sendPostRequest);
})();
