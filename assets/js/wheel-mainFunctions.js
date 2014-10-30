var app, modalTemplate = {};

app = {
	hosterModal: {
		init: function(){
			var _self = this,
				hosterModalElement = $('#showHoster');

			$('a[rel="hoster_modal"]').on('click', function(e){
				e.preventDefault(); e.stopPropagation();
				_self.trigger($(this));
			});

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
			modalTemplate._object.find('.descripcion').html(newTemplate).end().addClass('md-show');
		}, enableClose: function(){
			var _self = this;
			$('.container > .icon-close').on('click',function () {
			 	 var b = $(this).attr('data-id');
			 	 $('#'+b).removeClass('md-show');
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

			var menuClone = $('[role="navigation"]').first().clone();
			menuClone.css({position: 'relative'});
			$('[role="navigation"]').first().before(menuClone);
	}, init: function(){
		this.hosterModal.init();
		this.menu();
	}
}


$(function(){
	$('.carousel').carousel();

	app.init();

	$('#btn-hoster-1').on('click',function  () {
		$('#hoster-1').hide(0);
		$('#hoster-2').show('slow');
	});
	$('#btn-hoster-2').on('click',function  () {
		$('#hoster-2').hide('slow');
		$('#hoster-1').show('slow');
	});
});