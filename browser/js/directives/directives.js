'use-strict';
// juke.directive('thing', function () {
//   return {
//     restrict: 'E', // the 'E' is for 'element'
//     template: '<h2>I am a thing</h2>'
//   };
// });

juke.directive('sideBar', function () {
  return {
    restrict: 'E', // the 'E' is for 'element'
    templateUrl: '/js/directives/templates/sidebar.html'
  };
});

juke.directive('audioPlayer', function (PlayerFactory) {
  return {
    restrict: 'E', // the 'E' is for 'element'
    templateUrl: '/js/directives/templates/audioplayer.html',
    link: function(scope) {
      angular.extend(scope, PlayerFactory); // copy props from param2 to param1

	  scope.toggle = function () {
	    if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
	    else PlayerFactory.resume();
	  };

	  scope.getPercent = function () {
	    return PlayerFactory.getProgress() * 100;
	  };

	  scope.handleProgressClick = function (evt) {
	    PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
	  };

    }
  };
});

juke.directive('albumList', function () {
	return {
		restrict: 'E',
		templateUrl: '/js/directives/templates/albumlist.html',
		scope: {
			albums: '='
		},
		// link: function(scope) {

		// }
	}
})

juke.directive('songList', function (PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/directives/templates/songlist.html',
		scope: {
			songs: '='
		},
		link: function(scope) {
	      // angular.extend(scope, PlayerFactory); // copy props from param2 to param1
  		  	scope.toggle = function (song) {
			    if (song !== PlayerFactory.getCurrentSong()) {
			      PlayerFactory.start(song, scope.songs);
			    } else if ( PlayerFactory.isPlaying() ) {
			      PlayerFactory.pause();
			    } else {
			      PlayerFactory.resume();
			    }
		  	};

			scope.getCurrentSong = function () {
			   return PlayerFactory.getCurrentSong();
			};

			scope.isPlaying = function (song) {
			   return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
			};
		}
	}
})


// juke.directive('uponMouseover', function () {
//   return {
//     restrict: 'A',
//     scope: {
//       uponMouseover: '&'
//     },
//     link: function (scope, element) {
//       element.on('mouseover', function () {
//         scope.uponMouseover();
//       });
//     }
//   };
// });

juke.directive('doubleClick', function () {
  return {
    restrict: 'A',
    scope: {
      doubleClick: '&'
    },
    link: function (scope, element) {
      element.on('dblclick', function () {
      	console.log('hello!');
        scope.doubleClick();
        scope.$apply();
      });
    }
  };
});