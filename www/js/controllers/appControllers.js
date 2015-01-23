/*app.controller('DataController', function($scope, angularFire) {

    var ref = new Firebase('https://recursio.firebaseio.com/users');
    angularFire(ref, $scope, 'users');

});

// Turned into PainoFactory
app.controller('PianoController', function($scope, $rootScope)
{
	$scope.keys = [];

	// array and loop for rendering key object and note elements
	var semitones = ['B','C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb'];

	for (var i=0;i<=127;i++)
	{
		var shiftedNote = semitones.shift();
		semitones.push(shiftedNote);

		var firsttone = semitones[0];

		if ( !((firsttone  == 'Db') || (firsttone  == 'Eb') || (firsttone  == 'Gb') || (firsttone  == 'Ab') || (firsttone  == 'Bb')))
		{
			var flat = false;
		}
		else
		{
			flat = true;
		}

		var baseFrequency = 8.1757989156;
		var steps = Math.pow(1.0594630943, i);
		var frequency = baseFrequency * steps;

		var note = {
				name: semitones[0],
				frequency: frequency,
				midinote: i,
				flat: flat
			}

		$scope.keys.push(note);

	}

});
 */

app.controller('KeyController', function($scope, $rootScope, RService)
{
	$scope.$parent.$parent.keys.pressed = false;

	$scope.key.hoverEvent = function(event)
	{
        $scope.RService = RService;

		if(event === true)
		{
			//$scope.node = RService;
            $scope.RService.keyStart('sine', $scope.key.frequency);
		}
		else if (event === false)
		{
            $scope.RService.keyStop();
		} else {
            return false;
        }
	}

});

app.controller('ControlsController', function($scope, $rootScope, ControlsService)
{
	$scope.mainControls = function(event)
	{
		ControlsService.control(event);
	}

});

app.controller('TimeController', function($scope, $rootScope)
{
    $scope.time.bpm = 180;
    $scope.time.beats = 4;
    $scope.time.measure = 4;
});