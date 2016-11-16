angular.module('wikiApp').controller('wikiController', ['$scope', 'wikiFactory',
    function($scope, wikiFactory) {
        $scope.value = "";
        $scope.getArticle = function(keyEvent, searchStr) {
            // Get searched article
            if (keyEvent && searchStr) {
                if (keyEvent.which === 13 || keyEvent.type === "click") {
                    wikiFactory.get(searchStr).then(function(content) {
                        if (Array.isArray(content)) {
                            $scope.message = "";
                            $scope.contentData = content;
                            $scope.image = "";
                        } else {
                            $scope.message = content;
                        }
                    })
                }
            } else if (keyEvent === undefined && searchStr === undefined){
                // Get random article
                wikiFactory.get().then(function(content) {
                    $scope.message = ""
                    $scope.contentData = content;
                    content[0].image == "" ? $scope.image = "" : $scope.image = "<img src=" + content[0].image + " alt=" + content[0].title + ">";
                })
            }
        }
    }
]);