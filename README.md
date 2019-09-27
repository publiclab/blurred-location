# blurred-location
A JavaScript library to help manage variable location privacy through a "blurred location" model

This library provides the "blurred location" model for `leaflet-blurred-location` - a Leaflet-based interface for selecting a "blurred" or low-resolution location, to preserve privacy

https://github.com/publiclab/leaflet-blurred-location

## Definition of "blurred location"

See https://github.com/publiclab/leaflet-blurred-location#how-it-works for an in-depth description of how blurred location works. 


## Features

The following functions are provided. 

### `BL.returnZoomByPrecision(precision)`

This function returns a [Leaflet-style](http://leafletjs.com/) zoom level from `precision` - a number of digits of precision

```js
BL.returnZoomByPrecision('1')
# => 10
```

### `BL.truncateToPrecision(number, digits)`

This basic function truncates the given `number` to a provided number of `digits`, preserving zeroes to the appropriate precision. 

```js
BL.truncateToPrecision(1.2345678 , 2)
# => 1.23
```

### `BL.getMinimumGridWidth(pixels)`

This in-progress function will return the width of a grid square in the following format, for a web map of the given pixel width:

```js
{
  precision: VALUE,
  degrees: VALUE
}
```

This is used to calculate a usefully sized grid for a given map display. 

### `BL.getGridCoordinatesFromLatitude(latitude)`

This function calculates the grid size from the precision of the `latitude` value (the maximum zoom where a marker would be visible). This function depends on the dimension of the map container. 
To calculate distance in pixels between 2 coordinates, one should use the function as decribed in the documentation of map used (for example Leaflet).

### `BL.gridWidthInPixels()` (planned, for integration with Leaflet)



****

## Examples

See these in action in our test suite, here: 

https://github.com/publiclab/blurred-location/blob/main/spec/javascripts/test_spec.js
