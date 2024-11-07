const conn = require('./../db')

exports.allCompanies = (req, res)=>{
    
      conn.query(`select * from companies`, (err, result)=>{
        res.render('companies', {members: result, count: result.length})
    })
}

exports.newCompany = (req, res)=>{
    const { name, email, phone, address, moto } = req.body;
    
    const sql = `insert into companies (name, email, phone, address, moto) values (?,?,?,?,?)`
    
    conn.query(sql, [name, email, phone, address, moto], (err, result)=>{
        res.redirect("/compdash")
    })
}

exports.companyProfile = (req, res)=>{
       const name = req.params.name;
        
        const sql = `select * from companies where name = '${name}' `
        const sql2 = `select * from postedjobs Where compName = '${name}' `
    
        conn.query(sql, (err, result)=>{
            conn.query(sql2, (err, result2)=>{
                 const [member] = result;
            
            res.render('comprofile', {name: member.name,  email: member.email,
                phone: member.phone, 
               joinedAt: member.joinedAt, moto: member.moto, address: member.address, contents: result2})
    
        })  
            })
       
}
