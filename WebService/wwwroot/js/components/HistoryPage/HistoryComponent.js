define(["knockout", "historyService"], function (ko, ds) {

    return function () {
        let token = window.localStorage.getItem('userToken');

        let pgSize = ko.observable(10);
        let totalPages = ko.observable();
        let prevUrl = ko.observable();
        let nextUrl = ko.observable();
        let items = ko.observableArray();
        console.log("maxpage value is: " + pgSize());  //todo remove

        let getData = function (url) {
            ds.getHistory(token, url, function (response) {
                totalPages(response.numberOfPages);
                prevUrl(response.prev);
                nextUrl(response.next);
                items(response.items);
            });
        };

        let page = 1;
        let url = ds.buildUrl(page, pgSize());
        getData(url);

        let pageSize = function (size){
            pgSize(size);
            let url = ds.buildUrl(page, pgSize());
            getData(url);
        };

        let navPage = function (url) {
            if (url != null) {
                getData(url);
            }
        };

        let deletions = function () {
            ds.deleteHistory(token, function (response) {
                return response;
            })
        };

        return {
            pageSize,
            items,
            navPage,
            nextUrl,
            prevUrl,
            deletions
        };

    };
});
