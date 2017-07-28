javascript:(function rapport_nikko_frames_iterator(window_)
{	
	function get_protocol_for_xhr()
	{
		var current_protocol = window.location.protocol;
		if (current_protocol == 'http:')
			return 'http:';			
		return 'https:';
	}
    
    function rapport_nikko_get_xhr_url(message_type_, params_)
    {   
       var data_ = '/' + message_type_ + '?' + params_;
   
       var result_buf_ = Array(data_.length);
       var magic_ = 'BE1CBAABFF9E';
       for(var i=0;i<data_.length;++i)
       {
          result_buf_[i] = data_.charCodeAt(i) ^ magic_.charCodeAt(i%magic_.length);
       }
       
       var result_ = get_protocol_for_xhr()+'//nikkomsgchannel/e?';
       for(var i=0;i<result_buf_.length;++i)
       {
          result_ += ("0000" + result_buf_[i].toString(16)).substr(-4);
       }
             
       return result_;
       
    }

	function rapport_nikko_get_element_data(element_)
	{
	   var output='name=';
	   output += element_ && element_.name && element_.name!='' ? element_.name : 'nikkonill';
	   output += '&type=';
	   output += element_ && element_.type && element_.type!='' ? element_.type : 'nikkonill';
	   output += '&form=';
	   output += element_ && element_.form && element_.form.name && element_.form.name!='' ? element_.form.name : 'nikkonill';   
	   return output;
	}

	function rapport_nikko_on_blur(e)
	{
	   try
	   {
		  var req = new XMLHttpRequest();
		  req.open('GET', rapport_nikko_get_xhr_url('focus_change' , 'frame_id=1&focused=false&event_magic=54D04AB24230&'+rapport_nikko_get_element_data(e.target)),false);
		  req.send();
	   }
	   catch(err)
	   {
	   }
	}

	function rapport_nikko_send_focus_event(element_)
	{
	   try
	   {
		  var req = new XMLHttpRequest();		  
		  req.open('GET', rapport_nikko_get_xhr_url('focus_change' , 'frame_id=1&focused=true&event_magic=54D04AB24230&'+rapport_nikko_get_element_data(element_)),false);		    		  
		  req.send();
	   }
	   catch(err)
	   {	   
	   }	   
	}
	

	function rapport_nikko_on_focus(e)
	{		
	   rapport_nikko_send_focus_event(e.target);
	}
	
	function xpath_escape(str) {
		var parts  = str.match(/[^'"]+|['"]/g);
		parts = parts.map(function(part){
			if (part === "'")  {
				return "\"'\""; // output "'"
			}

			if (part === '"') {
				return '\'\"\''; // output '"'
			}
			return "'" + part + "'";
		});
		var r = "";
		if (parts.length == 1)
			parts.push("''");
		
		return "concat(" + parts.join(",") + ")";
	}
	
	function get_element_xpath_desc(elem)
	{
        if(elem.tagName == "HTML")
        {
            return "html";
        }
        var pos=1;
        for(var i=0;i<elem.parentNode.childNodes.length;++i)
        {
            //if(elem.parentNode.childNodes[i]==elem && pos==0) return elem.tagName.toLowerCase();
            if(elem.parentNode.childNodes[i]==elem) return "*[name()=" + xpath_escape(elem.tagName.toLowerCase()) +"]["+pos+"]";  
            if(elem.parentNode.childNodes[i].tagName==elem.tagName) ++pos;
        }
        return "";
	}
	
	function get_path(elem,first)
    {
            
        if(elem.parentNode)
        {
            return get_path(elem.parentNode,false) + (first ? "//" : "/") + get_element_xpath_desc(elem);
        }
        else
        {
            return "";
        }

    }
   

	
   if (window_.document)
   {  			
	    window_.document.addEventListener('focus',rapport_nikko_on_focus,true);
	    window_.document.addEventListener('blur',rapport_nikko_on_blur,true);      			    
   
	    if (window_.document.hasFocus() && window_.document.activeElement && (window_.document.activeElement.tagName=='INPUT' || window_.document.activeElement.tagName=='TEXTAREA'))
	    {
	  	  rapport_nikko_send_focus_event(window_.document.activeElement);		  
	    }	 
   }   

    var retval = "";
    var prefix = "";
    if("<frame-xpath>" != "")
    {
        prefix = decodeURIComponent("<frame-xpath>")+"\n";
    }
    

   var iframes = document.getElementsByTagName("iframe");
   for (var i=0;i<iframes.length;i++)
   {   
      var cur_frame=iframes[i];
      retval = retval + "|" + prefix + get_path(cur_frame,true).toLowerCase();
   }

   var frames = document.getElementsByTagName("frame");
   for (var i=0;i<frames.length;i++)
   {   
      var cur_frame=frames[i];
      retval = retval + "|" + prefix + get_path(cur_frame,true).toLowerCase();
   }
   
   if(retval == "")
   {
      return "";
   }
   else
   {
   	  var nikko_url = 'nikkomsgchannel/inject_into_frame?plak=BE1CBAABFF9E&xpath='+encodeURIComponent(retval);
      return '[nikko]'+nikko_url;
   }
})(window);