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

app.directive("pianoRange", function()
{
	return {
		restrict: 'A',
		link: function($scope, element, attrs)
		{
			$(element).on({
				mousedown: function(event){
					console.log(event.pageX, element);

					$(this).append("<span class='range-note' style='left:" + event.pageX + "px; height: 29px;'></span>");

					/* SNAP
					 css({
					 top: $div.offset().top,
					 left: $div.offset().left
					 });
					 */
				}
			});
            $(document).keypress(function(event) {
                var key = event.keyCode;
                $('#key'+key).trigger( "mousedown" );
                console.log(key);
            }).keyup(function(event) {
                var key = event.keyCode;
                $('#key'+key).trigger( "mouseup" );
                console.log(key);
            });

		}
	};
});

app.directive("beatDividers", function()
{
    return {
        restrict: 'A',
        link: function($scope, element, attrs)
        {
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

        }
    };
});

