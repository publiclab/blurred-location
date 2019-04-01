BlurredLocationHelper = function BlurredLocationHelper(options) {

  var blurredLocationHelper = this ;
 
  options = options || {} ;
  options.LBL = options.LBL ;
  options.zoom_filter = options.zoom_filter || [[0,5,0] , [5,6,2] , [8,10,4] , [11,18,5]] ;

  function setZoomByPrecision(precision) {
    var precisionTable = {'-2': 2, '-1': 3, '0':6, '1':10, '2':13, '3':16} ;
    options.LBL.setZoom(precisionTable[precision]) ;
  }

  function truncateToPrecision(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
  };

  function gridWidthInPixels(degrees) {
  	let center = options.LBL.map.getCenter() ;
    var p1 = L.latLng(center.lat, center.lng);
    var p2 = L.latLng(p1.lat+degrees, p1.lng+degrees);
    var l1 = options.LBL.map.latLngToContainerPoint(p1);
    var l2 = options.LBL.map.latLngToContainerPoint(p2);
    return {
      x: Math.abs(l2.x - l1.x),
      y: Math.abs(l2.y - l1.y),
    }
  }

  function getMinimumGridWidth(pixels) {
    var degrees = 100.0, precision = -2;
    while(gridWidthInPixels(degrees).x > pixels) {
      degrees/= 10;
      precision+= 1;
    }
    return {
      precision: precision,
      degrees: degrees,
    }
  }

  // Interval = difference between consecutive coordinates .
  function getIntervalFromZoomLevel(zoom){
                  
     if(zoom >=2 && zoom <=2){
      return 100 ;
     }            
     else if(zoom >2 && zoom <=5){
      return 10 ;
     } 
     else if(zoom >5 && zoom <=9){
      return 1 ;
     } 
     else if(zoom >9 && zoom <=12){
      return 0.1 ;
     }      
     else if(zoom >12 && zoom <=15){
      return 0.01 ;
     } 
     else if(zoom >15){
      return 0.001 ;
     } 
  }

  // For a given precision value , returns the maximum zoom level where the marker will be visible .
  function getMaxZoomFromPrecision(precision){

    let zoom = options.zoom_filter[0][2] ;
    let i=0 ;
    for(i=0 ; i<options.zoom_filter.length ; i++){
      if(i-1>0 && options.zoom_filter[i][2] > precision){
        zoom = options.zoom_filter[i-1][2] ;
        break ;
      }
    }

    if(i>0 && i == options.zoom_filter.length){
      zoom = options.zoom_filter[i-1][2] ;
    }
    console.log("max zoom : " , zoom) ;
    return zoom ; 
  }

  // calculates the grid size from the precision of the latitude .
  function getGridSizeFromLatitude(latitude){
    let afterDecimal = latitude.toString().split(".")[1] ;
    let precision = 0 ; 
    if(typeof afterDecimal === "undefined") {
      precision = 0 ; 
    }
    else{
      precision = afterDecimal.length ;
    }

    let max_zoom = getMaxZoomFromPrecision(precision) ; 
    let interval = getIntervalFromZoomLevel(max_zoom) ;
    console.log("interval: " , interval) ;

    var latlng1 = L.latLng(0,0) ;
    var latlng2 = L.latLng(0,interval) ;
    let x_dist = options.LBL.map.distance(latlng1,latlng2) ;

    var latlng3 = L.latLng(0,0) ;
    var latlng4 = L.latLng(interval,0) ;
    let y_dist = options.LBL.map.distance(latlng3,latlng4) ;

    return {
      x: x_dist,
      y: y_dist
    }

  }

  return {
   setZoomByPrecision: setZoomByPrecision ,
   truncateToPrecision: truncateToPrecision,
   gridWidthInPixels: gridWidthInPixels,
   getMinimumGridWidth: getMinimumGridWidth,
   getGridSizeFromLatitude: getGridSizeFromLatitude
  }
}

exports.BlurredLocationHelper = BlurredLocationHelper ;