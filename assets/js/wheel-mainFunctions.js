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
			$('.container > .icon-close').on('click',function () {
			 	 var b = $(this).attr('data-id');
			 	 $('#'+b).removeClass('md-show');
			});
		}
	}, init: function(){
		this.hosterModal.init();
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