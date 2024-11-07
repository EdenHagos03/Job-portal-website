const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')
const path = require('path')
const mysql = require('mysql')
const conn = require('./db')
const jobsController = require('./controllers/jobsController')
const dashboardController = require('./controllers/dashboardController')
const applicantsController = require('./controllers/applicantsController')
const companiesController = require('./controllers/companiesController')

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'views/css')))
app.use(bodyParser.urlencoded({ extended: false }))

// app.get("/", (req, res)=>{
//       const sql = `select * from postedjobs`;
//       conn.query(sql, (err, result)=>{
//           res.render('index', { contents: result})
//       })
// })
app.get('/', (req, res)=>{
    res.render('home')
})
app.get("/newpost", (req, res)=>{
     res.render("postForm")
})
app.get('/signup', (req, res)=>{
    res.render('signup')
})
app.get("/login", (req, res)=>{
    res.render('login')
})
app.get('/newcomp', (req, res)=>{
    res.render('newcompany')
})
app.get('/logout', (req, res)=>{
    res.redirect('/')
})

app.post('/handlelogin', (req, res)=>{
 
    const email = req.body.email;
    const password = req.body.password;

    const sql = `select * from applicants where email = '${email}'`
    conn.query(sql, (err, result, fields)=>{
        const [member] = result;
        if(!member){
            res.send("Member not found")
        }
        else if( password != member.password){
            res.send("Incorrect password")
        }
       else{
            res.redirect('/dashboard')
        }  
    })
    
       console.log("akfhad");
})

app.get('/compro', (req, res)=>{
       const name = 'SM Production';
        
        const sql = `select * from companies where name = '${name}' `
        const sql2 = `select * from postedjobs Where compName = '${name}' `
    
        conn.query(sql, (err, result)=>{
            conn.query(sql2, (err, result2)=>{
                 const [member] = result;
            
            res.render('compro', {name: member.name,  email: member.email,
                phone: member.phone, 
               joinedAt: member.joinedAt, moto: member.moto, address: member.address, contents: result2})
    
        })  
            })
})
app.get('/complog', (req, res)=>{
    res.render('complog')
})
app.post('/handlecomplogin', (req, res)=>{
    res.redirect('/compdash')
})
app.get('/applicationform', (req, res)=>{
    res.render('appform')
})
app.get('/compdash', dashboardController.getCompanydash)
// companies route 
app.get('/companies', companiesController.allCompanies)
app.post('/addcompany', companiesController.newCompany)
app.get('/comprofile/:name', companiesController.companyProfile)


// applicants route 
app.get('/members', applicantsController.allApplicants)
app.get('/applications', applicantsController.allApplications)
app.post('/addapplicant', applicantsController.newApplicant)
app.get('/profile/:email', applicantsController.applicantsProfile)

// Dashboards 

app.get('/dashboard', dashboardController.getAll)

app.post('/handleapplication', (req, res)=>{
    const {email, letter } = req.body;
    
    const sql = `insert into applications (email, letter ) values (?,?)`
    conn.query(sql, [email, letter], (err, result)=>{
        res.send("Letter submitted successfully")
    })
})
// About Jobs 

app.get("/technology", jobsController.getTechnology)
app.get("/healthcare", jobsController.getHealthcare)
app.get("/finance", jobsController.getFinance)
app.get("/education", jobsController.getEducation)
app.get("/marketing", jobsController.getMarketing)
app.get("/construction", jobsController.getConstruction)
app.get("/arts", jobsController.getArts)
app.get("/others", jobsController.getOthers)
app.post('/handlepost', jobsController.handlePost)
app.get('/details/:id', jobsController.getDetails)


app.listen("3000")