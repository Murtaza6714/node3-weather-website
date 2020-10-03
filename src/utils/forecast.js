const request = require('request')
const forecast =(lat,lon,callback) =>{
    url = 'http://api.weatherstack.com/current?access_key=d46c815ab7d88e4dab5b020df2d8cf3d&query=' + lon + ',' + lat + '&units=f'
    
    request({url,json:true},(error,{body}) =>{
       if(error){
          callback('Unable to connect to loaction services!',undefined)
       }else if (body.error) {
          callback('unable to find location. try another search.',undefined)
       }else{
          callback(undefined,'Currently the temperature is '+ body.current.temperature +' degree. Wind speed is ' +body.current.wind_speed+ ' and weather is ' + body.current.weather_description)
       }
    })
 }


 module.exports= forecast


 