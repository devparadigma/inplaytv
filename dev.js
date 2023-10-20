
// ==UserScript==
// @name         Inplayip.tv Post Request and Save Result
// @namespace    inplayipTVPostRequest
// @version      1.0
// @description  Save Results
// @match        https://inplayip.tv/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';

    // Получаем текущую дату и форматируем ее в необходимый формат (YYYY-MM-DD)
    const today = new Date();
    const searchDate = today.toISOString().split('T')[0];

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
            }
        });
    }

    // Выполняем отправку POST запроса при загрузке страницы
    window.addEventListener('load', sendPostRequest);
})();
