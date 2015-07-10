app.directive("pianoRoll", function()
{
    return {
        restrict: 'A',
		controller: 'KeyController',
        link: function($scope, element, attrs)
        {
			$(element).on({
				mousedown: function(){
					$scope.key.hoverEvent(true);
				},
                keypress: function(){
                    $scope.key.hoverEvent(true);
                },
				mouseup: function(){
					$scope.key.hoverEvent(false);
				},
				mouseover: function(){
					if($scope.$parent.$parent.keys.pressed == true)
					{
						$scope.key.hoverEvent(true);
					}
				},
				mouseleave: function(){
                    if($scope.$parent.$parent.keys.pressed == true)
                    {
                        $scope.key.hoverEvent(false);
                    }
				}
			});
        }
    };
});

app.directive("pianoRange", function(RangeRecordService)
{
	return {
		restrict: 'A',
		link: function($scope, element, attrs)
		{
			$(element).on({
				mousedown: function(event){

                    var x = event.pageX - $(this).offset().left;
					$(this).append("<span class='range-note' style='left:" + x + "px; height: 29px;'></span>");
                    console.log(x, $scope.key);
                    $scope.key['position'] = x;
                    //convert x (pixels) into time (milliseconds)

					/* SNAP
					 css({
					 top: $div.offset().top,
					 left: $div.offset().left
					 });
					 */

                    RangeRecordService.record.push($scope.key);
                    console.log($scope.keys);
				}
			});

            /*
            $(document).keypress(function(event) {
                var key = event.keyCode;
                    $('#key'+key).trigger( "mousedown" );
                    console.log(key);
            }).keyup(function(event) {

                    var key = event.keyCode;
                    $('#key'+key).trigger( "mouseup" );
                    console.log(key);

            });
            */
		}
	};
});

app.directive("beatDividers", function($compile, TimeService)
{
    return {
        restrict: 'A',
        controller: 'TimeController',
        link: function($scope, element, attrs)
        {
            $scope.$watch("scale", function(newVal) {
                console.log(newVal);
                //$(element).css('width', ($scope.scaleVal) + 'px');
            });


            $(element).on({
                mousedown: function(event){
                    console.log(event.pageX, element);

                    //$(this).append("<span class='range-note' style='left:" + event.pageX + "px; height: 29px;'></span>");

                    /* SNAP
                     css({
                     top: $div.offset().top,
                     left: $div.offset().left
                     });
                     */
                }
            });

            TimeService.grid_width = $(element).parent().width();

            TimeService.divider_width = TimeService.grid_width / TimeService.total_beats;
            $(element).width(TimeService.divider_width);

            //console.log('grid', TimeService.grid_width);
            //console.log('divider w', divider_width);

            $scope.$on('counter-action', function(event, args) {


            });
        }
    };
});

app.directive("playHead", function(TimeService)
{
    return {
        restrict: 'A',
        controller: 'PlayHeadController',
        link: function($scope, element, attrs)
        {
            $scope.$on('counter-action', function(event, args) {

                var duration = TimeService.duration; //milliseconds
                var grid_width = TimeService.grid_width; //pixels
                var divider_width = TimeService.divider_width; //pixels
                //var bpm = TimeService.bpm;

                //var minutes = TimeService.minutes;

                // $scope.time current time in milliseconds
                // Convert the position time in milliseconds into pixels to divide over grid_width
                // Note: min duration should equal grid_width

                var MpP = grid_width / duration;
                // M is milliseconds per pixel

                //var position = 100 * ($scope.time / duration);
                var position_px = Math.floor($scope.time * MpP); // in pixels
                TimeService.x_position = position_px;


                $(element).css( "margin-left", position_px + "px");
                //console.log('time:',$scope.time);
            });


            //element.style.marginLeft = $scope.current + "%";

        }
    };
});

