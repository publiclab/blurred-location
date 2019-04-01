describe("Basic testing", function() {
  "use strict";

  var fixture = loadFixtures('example.html');

  it("Basic Test", function () {
  expect(true).toBe(true) ;
  });

  it("Truncate To Precision", function () {
  	expect(BL.truncateToPrecision(1.2345678 , 2)).toBe(1.23) ;
  });

  // it("Return Grid Width in pixels", function () {
  // 	expect(BL.gridWidthInPixels(10).x).toBe(7282) ;
  // 	expect(BL.gridWidthInPixels(10).y).toBe(7332) ;
  // });

   it("Return Grid Size from latitude in pixels", function () {
  	var pixels = BL.getGridCoordinatesFromLatitude(1.23) ;
  	expect(pixels.height.x[0]).toBe(0) ;
  	expect(pixels.height.x[1]).toBe(0) ;
  	expect(pixels.height.y[0]).toBe(0) ;
  	expect(pixels.height.y[1]).toBe(100) ;
  	expect(pixels.width.x[0]).toBe(0) ;
  	expect(pixels.width.x[1]).toBe(0) ;
  	expect(pixels.width.y[0]).toBe(100) ;
  	expect(pixels.width.y[1]).toBe(0) ;
  });

  it("Return zoom by precision", function () {
  	expect(BL.returnZoomByPrecision('1')).toBe(10) ;
  });

});
