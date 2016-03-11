ghostApp.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/home",
                data: {
                    requiresLogin: false,
                    id:1
                },
                templateUrl: "views/home.html",
                controller: 'HomeCtrl'
            });

        $urlRouterProvider.otherwise("home");
    })
    .config(function ($urlRouterProvider, $httpProvider, $stateProvider) {
        $urlRouterProvider.otherwise('home');

    })
    .run(function ($state, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (e, to) {
            console.log("$stateChangeStart");
            if (to.data && to.data.requiresLogin) {
                console.log("unauthorized");
                e.preventDefault();
                $state.go('login');
            }
        });
    });
