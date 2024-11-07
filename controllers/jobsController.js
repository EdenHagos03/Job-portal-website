const conn = require('./../db')


exports.getTechnology = (req, res)=>{
      const sql = `select * from postedjobs where category = 'technology'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}

exports.getHealthcare = (req, res)=>{
      const sql = `select * from postedjobs where category = 'healthcare'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}

exports.getFinance = (req, res)=>{
      const sql = `select * from postedjobs where category = 'finance'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}

exports.getEducation = (req, res)=>{
      const sql = `select * from postedjobs where category = 'education'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}

exports.getMarketing = (req, res)=>{
      const sql = `select * from postedjobs where category = 'marketing'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}
exports.getConstruction = (req, res)=>{
      const sql = `select * from postedjobs where category = 'construction'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}
exports.getArts = (req, res)=>{
      const sql = `select * from postedjobs where category = 'arts'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}

exports.getOthers = (req, res)=>{
      const sql = `select * from postedjobs where category = 'others'`;
      conn.query(sql, (err, result)=>{
          res.render('dashboard', { contents: result})
      })
}

exports.handlePost = (req, res)=>{
    const { compName,jobTitle, category, age, eduLevel, gender, experience, salary, deadLine, workPlace, descriptionn } = req.body;
    
    // const deadli = req.body.deadLine;
    
    const [day, month, year] = deadLine.split('/').map(Number);
    const deadlin = new Date(year, month-1, day);
    
    const sql = `insert into postedjobs ( compName, jobTitle, category, age, eduLevel, gender, experience, salary, workPlace, deadLine, descriptionn) values (?,?,?,?,?,?,?,?,?,?,?)`
    conn.query (sql, [compName, jobTitle, category, age, eduLevel, gender, experience, salary, workPlace, deadlin, descriptionn], (err, result)=>{
        res.redirect("/dashboard")
    })
}

exports.getDetails = (req, res)=>{
    const id = req.params.id;
    const name = "Mekelle university"
    conn.query(`select * from postedjobs where id = ${id}`, (err, result)=>{
        conn.query(`select * from companies where name = '${name}'`, (err, result2)=>{
            
            const [member] = result2;
             res.render('details', {contents: result, name: member.name,  email: member.email,
                phone: member.phone, joinedAt: member.joinedAt}) 
            // res.send(member.name)
        })
           
    })
   
}