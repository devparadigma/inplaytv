// ==UserScript==
// @name         Post Request and Save Result
// @namespace    inplayipTVPostRequest
// @version      1.0
// @description  Send a POST request and save the response as JSON file with today's date as filename and send it to another API
// @match        https://inplayip.tv/shedule
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Функция для отправки POST запроса
    function sendPostRequest(url, postData, callback) {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            },
            onload: function(response) {
                callback(response.responseText);
            }
        });
    }

    // Функция для сохранения JSON в файл
    function saveJSONToFile(jsonData) {
        const todayDate = new Date().toLocaleDateString().replace(/\//g, "-");
        const fileName = todayDate + ".json";
        const fileData = JSON.stringify(jsonData);
        
        const blobData = new Blob([fileData], { type: "application/json" });
        const downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(blobData);
        downloadLink.download = fileName;
        downloadLink.click();

        // Отправка данных POST запросом на другую страницу
        const apiUrl = "https://freebet.work/table";
        sendPostRequest(apiUrl, jsonData, function(responseData) {
            console.log("Data sent to API successfully.");
        });
    }

    // Отправка POST запроса и сохранение JSON
    function sendAndSaveRequest() {
        const url = "https://api.inplayip.tv/api/schedule/table";
        const searchDate = new Date().toISOString(); // Получаем сегодняшнюю дату

        const postData = {
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

        sendPostRequest(url, postData, function(responseData) {
            const jsonData = JSON.parse(responseData);
            saveJSONToFile(jsonData);
        });
    }

    // Выполняем отправку запроса и сохранение при загрузке страницы
    sendAndSaveRequest();
})();
