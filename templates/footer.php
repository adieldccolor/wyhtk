	<!-- Latest compiled and minified JavaScript -->
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/animatescroll.min.js"></script>
	<script type="text/javascript">
		
		function showModal (id,idShow) {
			$('#'+id).on('click', function () {
				var a,b,c,d,f,g;
				$('#'+idShow).addClass('md-show');
				$('.container > .icon-close').on('click',function () {
				 	 b = $(this).attr('data-id');
				 	 $('#'+b).removeClass('md-show');
				});

			});
		}
		$(function(){
			$('.carousel').carousel();
			showModal('mailet','showMailet');
			$('#btn-hoster-1').on('click',function  () {
				$('#hoster-1').hide(0);
				$('#hoster-2').show('slow');
			});
			$('#btn-hoster-2').on('click',function  () {
				$('#hoster-2').hide('slow');
				$('#hoster-1').show('slow');
			});
			var menu = {
			    menuLinks: function(){
			        menuItem.on('click', 'ul li a', function(e){
			        e.preventDefault(); e.stopPropagation();
			            var caja = $(this).attr('href');
			            menuItem.find('ul li a').removeClass('active');
			            $(this).addClass('active');
			        });
			    }
			}
			var menuItem = $('.navbar-collapse');
			menu.menuLinks();
		});
	</script>
</body>
</html>
