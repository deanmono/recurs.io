/*app.controller('DataController', function($scope, angularFire) {

    var ref = new Firebase('https://recursio.firebaseio.com/users');
    angularFire(ref, $scope, 'users');

});
*/
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

app.controller('ControlsController', function($scope, $rootScope, $interval, TimerService, RangeRecordService)
{
	$scope.mainControls = function(event)
	{
		//ControlsService.control(event);
        switch(event)
        {
            case 'stop':
                this.stop();
                console.log('Stop');
                break;
            case 'play':
                this.start();
                console.log('Play');
                break;
            case 'pause':
                this.pause();
                console.log('Pause');
                break;
            default:
                //RService.stop
                console.log('Stop');
        }
	}

    $scope.stop = function()
    {
        $interval.cancel(this.interval);
        TimerService.time = 0;
        TimerService.format = '00:00:00';
        $rootScope.$broadcast('counter-action');
    }

    $scope.start = function()
    {
        this.interval = $interval(function () {

            TimerService.time += 10;
            var date = new Date(TimerService.time);

            var minutes = date.getMinutes(),
                seconds = date.getSeconds(),
                milliseconds = (date.getMilliseconds()/10);

            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            milliseconds = (milliseconds  < 10) ? "0" + milliseconds : milliseconds ;

            TimerService.format = minutes + ':' + seconds + ':' + milliseconds;

            $rootScope.$broadcast('counter-action');

            $scope.$on('counter-action', function(event, args) {

                $scope.current = TimerService.format;
                $scope.time = TimerService.time;

            });

        }, 10);
    }

    $scope.pause = function()
    {
        $interval.cancel(this.interval);
    }

    $scope.current = '00:00:00';


    //future change to currentTime callback set by start/stop or playhead

;

});

app.controller('TimeController', function($scope, TimeService)
{
    $scope.bpm = 120;
    $scope.beats = 4;
    $scope.measure = 4;
    $scope.duration = 20000; //milliseconds

    //$scope.scale = TimeService.scale(10, $scope.scale);
    $scope.grid_width = TimeService.grid_width;

    var minutes = $scope.duration / 60000;

    $scope.total_beats = Math.floor($scope.bpm * minutes);

    TimeService.total_beats = $scope.total_beats;
    TimeService.bpm = $scope.bpm;
    TimeService.beats = $scope.beats;
    TimeService.measure = $scope.measure;
    TimeService.duration = $scope.duration;
    TimeService.minutes = minutes;
    TimeService.x_position = $scope.x_position;

});

app.controller('PlayHeadController', function($scope, TimerService, TimeService, RangeRecordService)
{
    $scope.$on('counter-action', function(event, args) {
        $scope.current = TimerService.format;
        $scope.time = TimerService.time;

        //console.log('Time', TimeService.x_position);
        RangeRecordService.record;
        var t = TimerService.time;
        for (var t in RangeRecordService.record) {
            if (!RangeRecordService.record.hasOwnProperty(t)) continue;
            if (RangeRecordService.record[t] === TimeService.x_position) {
                console.log('play');
            }
        }
    });
});