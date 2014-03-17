function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;

    var clientTop = docElem.clientTop || body.clientTop || 0;

    var top  = box.top +  scrollTop - clientTop;

    return { top: Math.round(top)};
}

function visible(elem) {
    
    if ("#"+elem) {
    paginElem = document.getElementById(elem);
    paginTop = getCoords(paginElem).top;
    poz.push(paginTop);
    console.log("hash.get--"+Hash.read());
    console.log("poz.paginTop--"+poz);
    console.log("paginTop--"+paginTop);
     
    }

}
////////////////////////
var dkey,paginElem,paginTop,pagenum=1,url,urlpre=0,pagination="page", poz=[];


$(document).on('as_complete', document, function(e,d) {
    dkey = d["key"];
    
    $(".pagin."+dkey).append(d["pagination"]);
    //console.log("старт события");
    //visible("pagin");
    
    //url = $("#next").attr('href');
	$(document).on('click', '.'+dkey+' .pagination a', function(e) {
	e.preventDefault();
    url = $(this).attr('href');
    pagenum = url.substring(url.indexOf("=")+1, url.leght ) ;

    if (!parseInt(pagenum)) {
        pagenum=1;
        Hash.remove(pagination);
        url = url+"?"+pagination+"="+pagenum; //для стр.1
    } 
    else  {
    Hash.add(pagination, pagenum);
    } 
 
    $.post(url, {as_action: dkey}, function(response) {
	    if (typeof response.output !== "undefined") {
		    $('.ajax-snippet#'+dkey).append(response.output);
		    $(".pagin."+dkey).html(response.pagination); 
	      }
    }, "json");                  
    urlpre=url;     
    visible("pagin");
    console.log("url---"+url);
    }); 
    
    //////////// событие прокрутки
    ///////////
});
//////////////////////////////////////////////////
    //console.log("старт ");
    
    visible("pagin");
  
    window.onscroll = function() {
        
    url = $("#next").attr('href');
    var pageY = window.pageYOffset || document.documentElement.scrollTop;
    //console.log("pagenum-"+pagenum);
    console.log("pageY"+pageY);
    //console.log("dkey"+dkey);
    
    if ((pageY >= paginTop+20) && (url!== urlpre)) {
       
    console.log("url-------"+url);
       
       $.post(url, {as_action: dkey}, function(response) {
	    if (typeof response.output !== "undefined") {
		    $('.ajax-snippet#'+dkey).append(response.output);
		    $(".pagin."+dkey).html(response.pagination); 
		    pagenum++;
		    Hash.add(pagination, pagenum);
	      }
        }, "json");                  
       
       urlpre=url; 
       visible("pagin");
       
    }

  }