const conn = require('./../db')

exports.getAll = (req, res)=>{
    const sql = `select * from postedjobs order by id desc`;
    // const sql1 = `select DATE_FORMAT( postDate, "%d - %m - %Y" ) As formatted_date from postedjobs order by id desc`
    const sql2 = `select * from postedjobs where category = 'technology'`;
    const sql3 = `select * from postedjobs where category = 'healthcare'`;
    const sql4 = `select * from postedjobs where category = 'education'`;
    const sql5 = `select * from postedjobs where category = 'finance'`;
    const sql6 = `select * from postedjobs where category = 'arts'`;
    const sql7 = `select * from postedjobs where category = 'others'`;
    
    
      conn.query(sql, (err, result)=>{
        //  conn.query(sql1, (err, resultt)=>{
          conn.query(sql2, (err, resTech)=>
             conn.query(sql3, (err, reshealth)=>
              conn.query(sql4, (err, reseducation)=>
              conn.query(sql5, (err, resfinance)=>
              conn.query(sql6, (err, resarts)=>
              conn.query(sql7, (err, resothers)=>{
                  
            // const num_Days = Math.floor((new Date() - result.postDate) / (24 * 60 * 60 * 1000));
              
              const [postt] = result;
              const dataa = postt.postDate;
            //   res.send(num_Days)
                res.render('dashboard', { contents: result, countTech : resTech.length, counthealth: reshealth.length, countfinance: resfinance.length,
                    counteducation: reseducation.length, countarts: resarts.length, countothers: resarts.length
                })
          })
          )
          )
          )
          ) 
          )
          
         
    //   })
      })
}

exports.getCompanydash = (req, res)=>{
    
    const compName = 'abc'
      const sql = `select * from postedjobs where compName = '${compName}'`;
      
      conn.query(sql, (err, result)=>{
          res.render('compdash', {contents: result})
        // res.send(result)
      })
    
}
