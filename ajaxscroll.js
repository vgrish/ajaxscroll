function getCoords(elem) {
    var topY = $(elem).offset().top;
    console.log("topY-"+topY);
    return Math.round(topY);
}

function visible(elem) {
    if ("#"+elem) {
    paginElem = document.getElementById(elem);
    paginTop = getCoords(paginElem);
    poz[pagenum]=paginTop;
    }
}

var dkey,paginElem,paginTop,pagenum=1,url,urlpre=1,pagination="page", poz=[],itemHeight,pageY;

$(document).on('as_complete', document, function(e,d) {
    dkey = d["key"];
    $(".pagin."+dkey).append(d["pagination"]);

    $(document).on('click', '.'+dkey+' .pagination a', function(e) {
    e.preventDefault();
    url = $(this).attr('href');
    pagenum = url.substring(url.lastIndexOf("=")+1, url.leght ) ;
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
$(document).ready(function(){
    visible("pagin");
    window.onscroll = function() {
    
    url = $("#next").attr('href');
    pageY = (window.pageYOffset || document.documentElement.scrollTop)+10;
    //itemHeight = $('.ajax-snippet#'+dkey).outerHeight();

    if ((pageY >= paginTop)  && (url!== urlpre) && (url)) {
        
       pagenum = url.substring(url.lastIndexOf("=")+1, url.leght ) ;
           
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
});