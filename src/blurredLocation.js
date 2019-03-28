BlurredLocationHelper = function BlurredLocationHelper(options) {

  var blurredLocationHelper = this ;
 
  options = options || {} ;
  options.LBL = options.LBL ;
  
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

  return {
   setZoomByPrecision: setZoomByPrecision ,
   truncateToPrecision: truncateToPrecision,
   gridWidthInPixels: gridWidthInPixels,
   getMinimumGridWidth: getMinimumGridWidth
  }
}

exports.BlurredLocationHelper = BlurredLocationHelper ;