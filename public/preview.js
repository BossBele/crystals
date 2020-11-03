var classes = {
	imageClass: {
		"display": "block",
		"background-repeat": "no-repeat",
		"background-position": "center",
		"background-size": "cover",
	},
	size: {
		small: {
			"height": 150,
			"width": 150,
		},
		medium: {
			"height": 300,
			"width": 300,
		},
		large: {
			"height": 450,
			"width": 450,
		},
	},
	border: {
		"border": "1px solid #e0e0e0",
	},
	cursor: {
		pointer: {
			"cursor": "pointer",
		},
	}
}

function readURL(input, screen) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		var extension = input.files[0].name.split('.').pop().toLowerCase();

		reader.onload = function(e) {
			if(screen.is("img") || screen.is("video")) {
				screen.attr('src', e.target.result);
			} else {
				if (true) {
					let styles = screen.getStyleObject();
					classes.imageClass["background-image"] = "url('" + e.target.result + "')";
					screen.css($.extend({}, styles, classes.imageClass));
				} else {
					screen.css("background-image", "url('" + e.target.result + "')");
				}
			}
		}

		reader.readAsDataURL(input.files[0]);
	}
}

$(document).ready(function(){
	$("[data-preview]:not(input)").each(function() {
		var $input = $(this).data("preview"),
		$screen = $(this);
		var options = "";

		if ($input.includes(",")) {
			let n = $input.indexOf(",");
			options = $input;
			$input = $input.slice(0, n);
			options = options.slice(n+2, -1);
			obj = {};
			var val = options.split(",");
			for (let i = 0; i < val.length; i++) {
				val[i] = val[i].split(":");
				obj[val[i][0]]=val[i][1];
			}
			options =  obj;
			alert(options.size);
		}

		if (options.bordered) {
			let styles = $screen.getStyleObject();
			$screen.css($.extend({}, styles, classes.border));
		} else {
			let styles = $screen.getStyleObject();
			switch(options.bordered) {
				case false:
					$screen.css($.extend({}, styles, options.border));
					break;
				default:
					$screen.css($.extend({}, styles, classes.border));
			}
		}

		if (options.defaultImagePreview) {
			let styles = $screen.getStyleObject();
			$screen.css($.extend({}, styles, classes.imageClass));
		} else {
			let styles = $screen.getStyleObject();
			switch(options.defaultImagePreview) {
				case false:
					$screen.css($.extend({}, styles, options.defaultImagePreview));
					break;
				default:
					$screen.css($.extend({}, styles, classes.imageClass));
			}
		}

		if (options.size) {
			let styles = $screen.getStyleObject();
			switch(options.size) {
				case "small":
					$screen.css($.extend({}, styles, classes.size.small));
					break;
				case "medium":
					$screen.css($.extend({}, styles, classes.size.medium));
					break;
				case "large":
					$screen.css($.extend({}, styles, classes.size.large));
					break;
				default:
					$screen.css($.extend({}, styles, options.size));
			}
		} else {
			let styles = $screen.getStyleObject();
			$screen.css($.extend({}, styles, classes.size.small));
		}

		if (options.triggersInput) {
			let styles = $screen.getStyleObject();
			$screen.css($.extend({}, styles, classes.cursor.pointer));
			$screen.click(function() {
				$input.trigger("click");
			});
		}

		$($input).change(function() {
			readURL(this, $screen);
		});
	});
});

// (function localFileVideoPlayer() {
// 	'use strict'
// 	var URL = window.URL || window.webkitURL
// 	// var displayMessage = function(message, isError) {
// 	// 	var element = document.querySelector('#message')
// 	// 	element.innerHTML = message
// 	// 	element.className = isError ? 'error' : 'info'
// 	// }
// 	var playSelectedFile = function(event) {
// 		var file = this.files[0];
// 		var type = file.type;
// 		var videoNode = document.querySelector("video");
// 		var canPlay = videoNode.canPlayType(type);
// 		if (canPlay === '') canPlay = 'no';
// 		var message = 'Can play type "' + type + '": ' + canPlay;
// 		var isError = canPlay === 'no';
// 		// displayMessage(message, isError);
// 		console.log(message, isError);

// 		if(isError) {
// 			return
// 		}

// 		var fileURL = URL.createObjectURL(file);
// 		videoNode.src = fileURL;
// 	}
// 	var inputNode = document.querySelector("input");
// 	inputNode.addEventListener("change", playSelectedFile, false);
// })()

// Plugins
/*
 * getStyleObject Plugin for jQuery JavaScript Library
 * From: http://upshots.org/?p=112
 *
 * Copyright: Unknown, see source link
 * Plugin version by Dakota Schneider (http://hackthetruth.org)
 */

(function($){
	$.fn.getStyleObject = function(){
		var dom = this.get(0);
		var style;
		var returns = {};
		if(window.getComputedStyle){
			var camelize = function(a,b){
				return b.toUpperCase();
			}
			style = window.getComputedStyle(dom, null);
			for(var i=0;i<style.length;i++){
				var prop = style[i];
				var camel = prop.replace(/\-([a-z])/g, camelize);
				var val = style.getPropertyValue(prop);
				returns[camel] = val;
			}
			return returns;
		}
		if(dom.currentStyle){
			style = dom.currentStyle;
			for(var prop in style){
				returns[prop] = style[prop];
			}
			return returns;
		}
		return this.css();
	}
})(jQuery);