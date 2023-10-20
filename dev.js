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

    function getCurrentDate() {
        var today = new Date();
        var currentDate = today.toISOString();
        return currentDate;
    }

    var searchDate = getCurrentDate();
    var requestData = {
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

    sendPostRequest("https://api.inplayip.tv/api/schedule/table", requestData);
    sendPostRequest("https://jsonbase.devparadigma.workers.dev/devdata", requestData);

})();
