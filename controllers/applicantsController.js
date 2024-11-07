const conn = require('./../db')
const moment = require('moment')

exports.newApplicant = (req, res)=>{
    const { fname, lname, email, phone, gender, eduLevel, address, bio, password } = req.body;
    const Bdate = req.body.birthday;
    
    const [day, month, year] = Bdate.split('/').map(Number);
    const birthday = new Date(year, month-1, day);
    
    const sql = `insert into applicants (Fname, Lname, email, phone, gender, birthday, eduLevel, address, bio, password) values (?,?,?,?,?,?,?,?,?,?)`
    
    conn.query(sql, [fname, lname, email, phone, gender, birthday, eduLevel, address, bio, password], (err, result)=>{
        res.redirect("/dashboard")
    })
}

exports.allApplicants = (req, res)=>{
    
      conn.query(`select * from applicants`, (err, result)=>{
        res.render('members', {members: result, count: result.length})
    })
}
exports.allApplications = (req, res)=>{
    
      conn.query(`select * from applications`, (err, result)=>{
        res.render('applications', {members: result, count: result.length})
    })
}

exports.applicantsProfile = (req, res)=>{
        const fname = req.params.Fname;
        const email = req.params.email;
        
        const sql = `select * from applicants where  email = '${email}' `
        const sql2 = `select DATE_FORMAT( birthday, "%d - %m - %Y" ) As formatted_date from applicants where email = '${email}'`
       
    
        conn.query(sql, (err, result)=>{
            conn.query(sql2, (err, result2)=>{
                    const [member] = result;
                    const [da] = result2;
      
            res.render('profile', {fname: member.Fname, lname: member.Lname, email: member.email,
                phone: member.phone, eduLevel: member.eduLevel, birthday: da.formatted_date,
              joinedAt: member.joinedAt})
               
          })
            })
            
            
        
}