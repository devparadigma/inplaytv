// ==UserScript==
// @name         Inplayip.tv POST Request Extension
// @namespace    https://example.com/
// @version      1.0
// @description  Auto POST request on inplayip.tv schedule page
// @author       Your Name
// @match        https://inplayip.tv/schedule
// @grant        GM_xmlhttpRequest
// @run-at       document-end
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
