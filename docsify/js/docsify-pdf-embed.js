const DEBUG = 0;
const PDF_VIEWER_WIDTH = '100%';
const PDF_VIEWER_HEIGHT = '50rem';
const PDF_MARGIN_TOP = '2rem';
const PDF_MARGIN_BOTTOM = '5rem';

! function() {
	var verbose_log = function(log){
		if (DEBUG) {
			console.log(log);
		}
	}

	var mobile_check = function() {
  		var check = false;
  		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  		return check;
	};

	var url_check = function(url_str) {
		var expression = /^(http|https):\/\/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		return url_str.match(expression);
	}

	var build_absolute_path = function(path_str) {
		return window.location.protocol + "//" + window.location.hostname + "/" + path_str;
	}

	var renderer_func = function(code, lang, base=null) { 
		var pdf_renderer = function(code, lang, verify) {
			function unique_id_generator(){
				function rand_gen(){
					return Math.floor((Math.random()+1) * 65536).toString(16).substring(1);
				}
				return rand_gen() + rand_gen() + '-' + rand_gen() + '-' + rand_gen() + '-' + rand_gen() + '-' + rand_gen() + rand_gen() + rand_gen();
			}
			if(lang && !lang.localeCompare('pdf', 'en', {sensitivity: 'base'})){
				if(verify){
					return true;
				}else{
					var divId = "markdown_code_pdf_container_" + unique_id_generator().toString();
					var container_list = new Array();
					if(localStorage.getItem('pdf_container_list')){
						container_list = JSON.parse(localStorage.getItem('pdf_container_list'));	
					}
					container_list.push({"pdf_location": code, "div_id": divId});
					localStorage.setItem('pdf_container_list', JSON.stringify(container_list));
					return (
						'<div style="margin-top:'+ PDF_MARGIN_TOP +'; margin-bottom:'+ PDF_MARGIN_BOTTOM +';" id="'+ divId +'">'
							+ '<a href="'+ code + '"> Link </a> to ' + code +
						'</div>'
					);
				} 
			}
			return false;
		}
		if(pdf_renderer(code, lang, true)){
		   return pdf_renderer(code, lang, false);
		}
		/* SECTION START: Put other custom code rendering functions here
			i.e. If the language of the code block is LaTex, 
			put the code below to replace original code block with the text: 
			'Using LaTex is much better than handwriting!' inside a div container.

			if (lang == "latex") {
				return ('<div class="container">Using LaTex is much better than handwriting!</div>');
			}
			
		SECTION END */
		return (base ? base : this.origin.code.apply(this, arguments));
	}

	var pdf_renderer = {code: renderer_func};
	var doc_md = window.$docsify.markdown = (window.$docsify.markdown || {});
	var doc_md_rend = doc_md.renderer = (window.$docsify.markdown.renderer || {});
	doc_md_rend.code = (doc_md_rend.code ? doc_md_rend.code : renderer_func);

	var mobile_view = mobile_check();

	// Allowing Docsify to execute the script to embed PDF
	window.$docsify.executeScript = true;

	// Linking Docsify to the PDF plugin
	window.$docsify.plugins = [
		function(hook, vm) {
			hook.init(function() {
				verbose_log('PDF Code Block Loader Plugin Initialized');
				verbose_log('This is a '.concat(mobile_view ? 'Mobile' : 'Non-mobile').concat(' Viewer.'));
			});
			hook.afterEach(function(html, next) {
				verbose_log('PDF Code Block Loader Plugin After Hook Initialized');
				container_list = JSON.parse(localStorage.getItem('pdf_container_list'));
				verbose_log(container_list);
				if(container_list){
					// Handling mobile pdf rendering
					if(mobile_view){
						html += '<script>';
						container_list.forEach(function(container){
							var absolute_pdf_location = url_check(container['pdf_location']) ? container['pdf_location'] : build_absolute_path(container['pdf_location']);
							var view_location = "https://mozilla.github.io/pdf.js/web/viewer.html?file=" + absolute_pdf_location;
							var iframe_id = container['div_id'].concat('-iframe');
							html += '\
									document.getElementById("'+ container['div_id'] +'").innerHTML = \
									\'<iframe \
										style="overflow: auto; width: '+ PDF_VIEWER_WIDTH +'; height: '+ PDF_VIEWER_HEIGHT +';"\
										id="'+ iframe_id +'"\
								    	src="'+ view_location +'"\
								    	style="border: none;" \
									\/>\'\
								;';
						});
						html += '<\/script>';
					}else{
						// Handling desktop pdf rendering
						html += '<script>';
						container_list.forEach(function(container){
							html += '\
							var options = {\
								height: "'+ PDF_VIEWER_HEIGHT +'",\
								width: "'+ PDF_VIEWER_WIDTH +'"\
							};\
							PDFObject.embed("'+ container['pdf_location'] +'", "#'+ container['div_id'] +'", options);';
						});
						html += '<\/script>';
					}
				}
				localStorage.removeItem('pdf_container_list');
				next(html);
			});
		}
	].concat(window.$docsify.plugins || [])
}();
