(function () {

    var app = angular.module("githubViewer");

    var RepoController = function ($scope, github, $routeParams, $location) {
        var onRepoComplete = function (data) {
            $scope.repo = data;
            github.getRepoContributors($scope.repo.contributors_url)
                  .then(onRepoContributorsComplete, onError);
        };

        var onRepoContributorsComplete = function (data) {
            $scope.contributors = data;
        };

        var onError = function (reason) {
            $scope.error = "Encountered an error fetching the data";
        };

        var onUserClicked = function () {
            $location.path("/main")
        }

        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;
        $scope.contibSortOrder = "login";
        github.getRepo($scope.username, $scope.reponame).then(onRepoComplete, onError);

    };

    app.controller("RepoController", RepoController);

}());