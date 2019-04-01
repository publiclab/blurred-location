describe("Basic testing", function() {
  "use strict";

  var fixture = loadFixtures('example.html');

  it("Basic Test", function () {
  expect(true).toBe(true) ;
  });

  it("Truncate To Precision", function () {
  	expect(BL.truncateToPrecision(1.2345678 , 2)).toBe(1.23) ;
  });

  it("Return Grid Width in pixels", function () {
  	expect(BL.gridWidthInPixels(10).x).toBe(7282) ;
  	expect(BL.gridWidthInPixels(10).y).toBe(7332) ;
  });

   it("Return Grid Size from latitude in pixels", function () {
  	var pixels = BL.getGridSizeFromLatitude(1.23) ;
  	expect(pixels.x).toBe(11119492.664455874) ;
  	expect(pixels.y).toBe(11119492.664455874) ;
  });

});
