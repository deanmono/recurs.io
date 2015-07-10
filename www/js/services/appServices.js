app.service("RService", function()
{
	//this.recurs = T("saw", {freq: $scope.key.frequency});

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    this.keyStart = function($type, $value)
    {
        // create Oscillator node
        this.oscillator = audioCtx.createOscillator();
        this.gainNode = audioCtx.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(audioCtx.destination);
        this.oscillator.type = $type;
        this.oscillator.frequency.value = $value; // value in hertz

        this.oscillator.start();
    }

    this.keyStop = function()
    {
        this.oscillator.stop();
    }

});

app.service("KeyService", function($rootScope)
{

	this.on = function($scope)
	{
		$scope.recurs.start();
	}

	this.off = function($scope)
	{
		$scope.recurs.stop();
	}

});

app.service("TimerService", function()
{
    this.time = 0; // milliseconds
    this.format = '00:00:00';

    this.playPercent = function()
    {
        //return 100 * (music.currentTime / duration);

        //playhead.style.marginLeft = playPercent + "%";
    }
});

app.service("TimeService", function($rootScope)
{
    this.scale = function(val, scale) {
        var scale = scale + val;
        return scale
    }

    this.grid_width;
    this.bpm;
    this.beats;
    this.measure;
    this.duration;
    this.minutes;
    this.total_beats;
    this.divider_width;
    this.x_position;
});

app.service("RangeRecordService", function($rootScope, TimerService)
{
    this.record = [];


});

app.service("ControlsService", function($rootScope, TimerService, $interval)
{
    this.format;

    /** To Remove - Used in ControlsController
     *
	this.control = function(event)
	{
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

    this.start = function()
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

        }, 10);
    }

    this.stop = function()
    {
        $interval.cancel(this.interval);
        TimerService.time = 0;
        TimerService.format = '00:00:00';
        $rootScope.$broadcast('counter-action');
    }

    this.pause = function()
    {
        $interval.cancel(this.interval);
    }
    */
});