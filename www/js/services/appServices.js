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

app.service("ControlsService", function()
{

	this.control = function(event)
	{
		switch(event)
		{
			case 'stop':
				//RService.stop;
				console.log('Stop');
				break;
			case 'play':
				//RService.play;
				console.log('Play');
				break;
			case 'pause':
				//RService.pause;
				console.log('Pause');
				break;
			default:
				//RService.stop
				console.log('Stop');
		}
	}

});

app.service("BeatDividerService", function()
{
    this.quantity = function()
    {

    }
});
