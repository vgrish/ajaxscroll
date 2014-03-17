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
    poz[pagenum]=paginTop;
    }

}
////////////////////////
var dkey,paginElem,paginTop,pagenum=1,url,urlpre=1,pagination="page", poz=[];


$(document).on('as_complete', document, function(e,d) {
    dkey = d["key"];
    
    $(".pagin."+dkey).append(d["pagination"]);

    $(document).on('click', '.'+dkey+' .pagination a', function(e) {
    e.preventDefault();
    url = $(this).attr('href');
    pagenum = url.substring(url.indexOf("=")+1, url.leght ) ;

    $.post(url, {as_action: dkey}, function(response) {
        if (typeof response.output !== "undefined") {
            $('.ajax-snippet#'+dkey).append(response.output);
            $(".pagin."+dkey).html(response.pagination); 
          }
    }, "json");                  
    urlpre=url;     
    visible("pagin");

    }); 

});
//////////////////////////////////////////////////

    visible("pagin");
    window.onscroll = function() {
    url = $("#next").attr('href');

    var pageY = window.pageYOffset || document.documentElement.scrollTop;

    if ((pageY >= paginTop) && (url!== urlpre)) {
       
       pagenum = url.substring(url.indexOf("=")+1, url.leght ) ;

       $.post(url, {as_action: dkey}, function(response) {
        if (typeof response.output !== "undefined") {
            $('.ajax-snippet#'+dkey).append(response.output);
            $(".pagin."+dkey).html(response.pagination); 
            
            Hash.add(pagination, pagenum);
          }
        }, "json");                  
       
       urlpre=url; 
       visible("pagin");
       
    }
    /////////
    if (poz[pagenum-1] > pageY ) {
       
       if ((pagenum-1) >0) {
       
       pagenum--;

       Hash.add(pagination, pagenum);
       
       }
    }
    if (poz[pagenum] < pageY ) {
       
       if ((pagenum) >0) {
       
       pagenum++;
       
       Hash.add(pagination, pagenum);
       
       }

    }
    //////////
    
  }