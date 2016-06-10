describe("AppCtrl", function () {
    var $rootScope,
        $scope,
        controller;

    beforeEach(function () {

        module('ghostApp');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')("AppCtrl", {$scope: $scope});
        });

        $scope.$digest();
    });

    describe("Listeners", function () {
//        describe("pieHasBeenDepleted", function () {
//            it("Should set slices to 0", function () {
//                $rootScope.$broadcast("pieHasBeenDepleted");
//                $scope.$digest();
//                expect($scope.slices).toEqual(0);
//            });
//        });
    });

    describe("Action Handler", function () {
//        describe("eatSlice", function () {
//            it("Should decrement number of slices", function () {
//
//            });
//            it("Should do nothing when slices is 0", function () {
//
//            });
//        });
    });

    describe("Iniatialization", function () {
        it("Should instantiate players as empty object", function () {
            expect($scope.name).toEqual("Mr");
        });
//        it("Should instantiate lastRequestedFlavour", function () {
//            expect($scope.lastReqeustedFlavour).toBeUndefined();
//        });
//        it("Should instantiate nutritionalValue to its defaul", function () {
//            expect($scope.nutritionalValue).toEqual({calories: 500, carbs: 250, fat:100});
//        });
//        it("Should instantiate warning to null", function () {
//            expect($scope.warning).toBeNull();
//        });
    });
});
