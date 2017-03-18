(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$timeout', 'sortkeys', '$q', '$interval', '$state'];
    /* @ngInject */
    function HomeController($timeout, sortkeys, $q, $interval, $state) {
        var vm = this;
        vm.firstGuess;
        vm.objArr = [];
        vm.timeLeft = 60;
        vm.matches = 0;
        vm.game={
            header:'Notification',
            msg:'Click Start to begin the game \n Time Limit : 60 secs'
        }
        vm.showGame = false;

        $('#myModal').modal('show');
        vm.start = function() {
            vm.showGame = true;
            vm.timeLeft = 6;
            vm.matches = 0;
            activate();
        }

        var stopInterval;

        function activate() {
            var promises = [getLearningPaths()];
            return $q.all(promises).then(function () {
                scatterArr(vm.objArr);
                stopTimer();
                stopInterval = $interval(function () {
                    if (vm.timeLeft > 0) {
                        vm.timeLeft--;
                    } else {
                        stopTimer();
                    }
                }, 1000);
            });
        }

        function stopTimer() {
            if (angular.isDefined(stopInterval)) {
                $interval.cancel(stopInterval);
                stopInterval = undefined;
                if (vm.matches === 8) {
                   vm.game.header = 'You WON';
                } else {
                    vm.game.header = 'YOU LOST';
                }
                vm.game.msg = 'Click Start to continue';
                vm.showGame = false;
                $('#myModal').modal('show');
            }
        }

        vm.dflip = function() {
            $('.card').toggleClass('flipped');
        }


        function getLearningPaths() {
            return sortkeys.getSortKeys().then(function (data) {
                vm.objArr = data;
            });
        }

        function flip(tile) {
            tile.flipped = !tile.flipped;
        }

        vm.flipTile = function (tile) {
            flip(tile);
            if (!vm.firstGuess) {
                vm.firstGuess = tile;
            } else {
                if (vm.firstGuess.color === tile.color) {
                    this.firstGuess = undefined;
                    vm.matches++;
                    if(vm.matches === 8) {
                        stopTimer();
                        $('#myModal').modal('show');
                    }
                } else {
                    $timeout(function () {
                        flip(tile);
                        flip(vm.firstGuess);
                        vm.firstGuess = undefined;
                    }, 1000);
                }
            }
        }

        function scatterArr(arr) {
            var i = arr.length, j, temp;
            while (--i) {
                j = Math.floor(Math.random() * (i - 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            console.log(arr);
        }

    }

})();