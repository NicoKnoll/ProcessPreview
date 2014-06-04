$(document).ready(function(){
	
	// extend jquery to get URL parameters
	$.extend({
	  getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
		  hash = hashes[i].split('=');
		  vars.push(hash[0]);
		  vars[hash[0]] = hash[1];
		}
		return vars;
	  },
	  getUrlVar: function(name){
		return $.getUrlVars()[name];
	  }
	});
	
	
	// prevent clicking multiple times while loading and waiting for ajax response
	var preview = false;
	$("#previewButton").click(function() {
		preview = true;

		event.preventDefault();

		if(preview == true) {
			if(typeof tinyMCE != "undefined") {
				tinyMCE.triggerSave();
			}
			
			// get the fields changed data
			var serializedFields = $('#ProcessPageEdit').serialize();
			console.log(serializedFields);
			
			// generate the ajax url (same page with param)
			var id = $.getUrlVar('id');
			var url = '?id=' + id + '&ajax=true';
			
			// do the ajax call
			$.post(url, serializedFields,
				function(previewPageURL) {
					preview = false;
					$("#previewButton").removeClass("ui-state-active");
					
					if(previewPageURL != 'false')
					var win = window.open(previewPageURL);
				}
			);
			//return false;
		}
	});
});