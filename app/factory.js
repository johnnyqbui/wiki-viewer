angular.module('wikiApp').factory('wikiFactory', ['$http',
    function wikiFactory($http) {
        return {
            get: function(searchStr) {
                if (searchStr) {
                    // Search input
                    var api = "https://en.wikipedia.org/w/api.php?action=query&format=json" +
                        "&prop=info%7Cextracts&indexpageids=1&generator=search" +
                        "&inprop=url&exsentences=1&exlimit=10&exintro=1&explaintext=1" +
                        "&gsrsearch=" + searchStr + "&gsrnamespace=0&callback=JSON_CALLBACK";
                    return this.pushContent(api);

                } else {
                    // Random article
                    var api = "https://en.wikipedia.org/w/api.php?action=query&format=json" +
                        "&prop=info%7Cextracts%7Cpageimages&list=&indexpageids=1&generator=random" +
                        "&inprop=url&exintro=1&explaintext=1&piprop=original&grnnamespace=0" +
                        "&callback=JSON_CALLBACK";
                    return this.pushContent(api);

                }
            },

            pushContent: function(api) {
                return $http.jsonp(api).then(function(response) {
                    // if response from api has query object then push query data to contentArr
                    if (response.data.hasOwnProperty('query')) {
                        var contentArr = [];
                        var values = Object.values(response.data.query.pages);
                        // Loop through JSON data and push required content data through to contentArr
                        values.forEach(function(data) {
                            var image = data.thumbnail ? data.thumbnail.original : "";
                            contentArr.push({
                                "title": data.title,
                                "extract": data.extract,
                                "url": data.fullurl,
                                "image": image,
                            });
                        })
                        return contentArr;
                    } else {
                        return "Search yielded no results"
                    }
                }).catch(function(failed) {
                    console.log("Failed to obtain data. Please try again.")
                });

            }
        }
    }
]);