var app, modalTemplate = {}, owl;

app = {
	hosterModal: {
		init: function(){
			var _self = this,
				hosterModalElement = $('#showHoster');
			$('#hoster-2,#hoster-2-c').hide();
			$('a[rel="hoster_modal"]').on('click touch tap', function(e){
				e.preventDefault(); e.stopPropagation();
				_self.trigger($(this));
			});

			$('body').find('.hoster').each(function(e,i,c){
				$(this).find('[rel="hoster_modal"]').data('index',e);
			});

			_self.directions();

			modalTemplate = {
				_object: (function(){
					return hosterModalElement;
				})(),
				template: (function(){
					return hosterModalElement.find('.descripcion').html();
				})()
			}
		},
		active: function(set){
			if(set!=undefined){
				$('body').find('[rel="hoster_modal"].active-hoster').removeClass('active-hoster');
				if(typeof set == 'object' && set.length>0){
					set.addClass('active-hoster');
				}
				return set;
			}else{
				return $('body').find('[rel="hoster_modal"].active-hoster');
			}
		},
		trigger: function(hosterTarget){
			var _self = this,
				_target = hosterTarget,
				info = {
					name: _target.find('[rel="hoster_name"]').html(),
					title: _target.find('[rel="hoster_title"]').html(),
					role: _target.find('[rel="hoster_role"]').html(),
					bio: _target.find('[rel="hoster_bio"]').html(),
					picture_url: _target.find('[rel="hoster_picture"]').attr('src')
				};

				_self.active(hosterTarget);
				_self.open(info);
				_self.enableClose(info);
		}, open: function(info){
			var newTemplate = modalTemplate.template
											.replace(/{{hoster\.name}}/g, info.name)
											.replace(/{{hoster\.title}}/g, info.title)
											.replace(/{{hoster\.role}}/g, info.role)
											.replace(/{{hoster\.picture_url}}/g, info.picture_url)
											.replace(/{{hoster\.bio}}/g, info.bio)
											.replace(/data-src/g, "src");
			modalTemplate._object.find('.descripcion').html(newTemplate).end().addClass('md-show').prev('.container').hide();
			$('.hosters').addClass('md-open');
		}, directions: function(){
			var _self = this;

			$('body').on('click','.prev-host', function(e){
				e.preventDefault(); e.stopPropagation();
				var _current = app.hosterModal.active().data('index'), prev = _current, elems = $('body').find('[rel="hoster_modal"]');
				prev = _current==0 ? 5 : _current - 1;
				_self.trigger(elems.eq(prev));
			}).on('click','.next-host', function(e){
				e.preventDefault(); e.stopPropagation();
				var _current = app.hosterModal.active().data('index'), next = _current, elems = $('body').find('[rel="hoster_modal"]');
				next = _current==5 ? 0 : _current + 1;
				_self.trigger(elems.eq(next));
			});

		}, enableClose: function(){
			var _self = this;
			$('.container > .icon-close').on('click',function () {
			 	 var b = $(this).attr('data-id');
			 	 $('#'+b).removeClass('md-show').prev('.container').show();
			 	 $('.hosters').removeClass('md-open');
			 	 _self.active([]);
			});
		}
	}, menu: function(){
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

			// var menuClone = $('[role="navigation"]').first().clone();
			// menuClone.css({position: 'relative'});
			// $('[role="navigation"]').first().before(menuClone);
	}, coverBackgrounds: function(){
		$(".hosters,.hero").backstretch("assets/img/background.png");
		$(".locations").backstretch("assets/img/locationbg.jpg");
	}, init: function(){
		this.hosterModal.init();
		this.menu();
		this.coverBackgrounds();
	}
}


$(function(){
	// $('.carousel').carousel();

	 owl = $("#owl-demo");
	  owl.owlCarousel({
	      autoPlay: 3000, //Set AutoPlay to 3 seconds
	      items : 4,
	      itemsDesktop : [1199,4],
	      itemsDesktopSmall : [979,3],
	      itemsTablet : [767,2],
	      itemsMobile : [480,1]
	  });
	   owls = $("#hoster-1,#hoster-2");
	  owls.owlCarousel({
	      //autoPlay: 3000, //Set AutoPlay to 3 seconds
	      items : 3,
	      itemsDesktop : [1199,3],
	      itemsDesktopSmall : [979,2],
	      itemsTablet : [767,2],
	      itemsMobile : [480,1]
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(e){
	  	e.preventDefault();
	  	e.stopPropagation();
	    owl.trigger('owl.next');
	  })
	  $(".prev").click(function(e){
	  	e.preventDefault();
	  	e.stopPropagation();
	    owl.trigger('owl.prev');
	  })

	  $(".next").click(function(e){
	  	e.preventDefault();
	  	e.stopPropagation();
	    owls.trigger('owl.next');
	  })
	  $(".prev").click(function(e){
	  	e.preventDefault();
	  	e.stopPropagation();
	    owls.trigger('owl.prev');
	  })

	app.init();

	$('#btn-hoster-1').on('click',function  () {
		$('#hoster-1,#hoster-1-c').hide(0);
		$('#hoster-2,#hoster-2-c').show('slow');
	});
	$('#btn-hoster-2').on('click',function  () {
		$('#hoster-2,#hoster-2-c').hide('slow');
		$('#hoster-1,#hoster-1-c').show('slow');
	});

	$('body').on('click', '#btn-hoster-2, #btn-hoster-1, .prev-host, .next-host', function(){
		$('html,body').stop(true,false).animate({scrollTop: $('#host').position().top-70},500);
	});
});