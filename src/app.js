const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
// define paths for express
const publicdir = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
// set up static directory to serve
app.use(express.static(publicdir))

app.get('',(req,res) =>{
    res.render('viewindex',{
        title:'Weather',
        name: 'murtaza singapurwala'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: "About me",
        name:'murtaza'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helptext: "hey guys if u need any help just tell me i will help u",
        title:'help',
        name: 'murtaza'
    })
})
//       res.send('<h1><b>Wheather</b></h1>')
// })

// app.get('/help',(req,res) => {
//     res.send([{
//         name : "andrew"
//     },{
//         name: "gdcvku"
//     }])

// })

// app.get('/about',(req,res) => {
//     res.send("<h1>HTML</h1>")
    

// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
              error: 'You must provide address.'
          })
      }else{
        geocode(req.query.address, (error,{latitude, longitude, location} = {}) =>{
            if(error){
               return res.send({error})
            }
             
             forecast(latitude,longitude, (error, forecastdata) => {
               if(error){
                  return res.send({error})
               } 
               res.send({
                forecast: forecastdata,
                location : location,
                address: req.query.address
            })
             })
         })
        }

})

app.get('/products',(req,res) => {
    if(!req.query.search){
      return res.send({
            error: 'You must provide search term.'
        })
    }else{
    console.log(req.query.search)
    res.send({
        products:[]
    })
    }
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Murtaza singapurwala',
        errormessage: 'help page not found'
    })

})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name: "murtaza singapurwala",
        errormessage: 'page not found'

    })

})



app.listen(3000, () => {
    console.log('server is up on port 3000')
})