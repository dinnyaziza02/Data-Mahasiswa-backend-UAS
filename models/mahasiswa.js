
const SqlString = require("mysql/lib/protocol/SqlString")
const db=require("./db")

let mahasiswa = [   {nim:'1120101862', nama:'Mansuri',angkatan:"2020", prodi:"TI",create:new Date()},
                    {nim:'1120101863', nama:'Mansubi',angkatan:"2020", prodi:"TI",create:new Date()},
                    {nim:'1120101864', nama:'Mansuyi',angkatan:"2020", prodi:"MI",create:new Date()},
                    {nim:'1120101865', nama:'Mansuhi',angkatan:"2020", prodi:"MI",create:new Date()},
                ]
                const cari=(arrData,nim)=>{
                    ketemu =-1
                    indeks =0
                    while (ketemu== -1 && indeks < arrData.length) {
                        if(arrData[indeks].nim == nim){
                            ketemu=indeks
                            return indeks
                        }
                        indeks++
                    }
                    return -1
                }

                module.exports={
                    // getMahasiswa : mahasiswa ,

                    // insert : (req)=>{
                    //     const newItem={
                    //         nim:req.body.nim,
                    //         nama:req.body.nama,
                    //         angkatan:req.body.angkatan,
                    //         prodi:req.body.prodi
                    //     }
                    //     mahasiswa.push(newItem)
                    //     return newItem
                    // }
                    insert : (mahasiswaBaru,result)=>{
                       db.query("INSERT INTO mahasiswa SET?", mahasiswaBaru,(err,res)=>{
                           if (err){
                               console.log("error:", err);
                               result(err,null);
                               return;
                           }
                           result(null,{id: res.insertId, ...mahasiswaBaru});
                       })
                    },
                    getMahasiswa(result){
                        let query = "SELECT * FROM mahasiswa";
                        db.query(query, (err,res)=>{
                            if (err){
                                console.log("error:", err);
                                return;

                            }
                            result(null,res);
                        })
                    },
                    getMahasiswaByNim:(nim, result)=>{
                        db.query(`SELECT * FROM mahasiswa WHERE nim = ${nim}`,(err, res)=>{
                            if (err){
                                console.log("error: ", err);
                                result(err, null);
                                return;
                            }
                            if(res.length){
                                console.log("mahasiswa ditemukan:", res[0]); //opsi
                                result(null, res[0]);
                                return;
                            }
                            result({kind:"tidak ditemukan"}, null)
                        })
                    },
                    
                    update:(nim , mahasiswa, result)=>{
                        db.query(
                            "UPDATE mahasiswa SET nama= ?, angkatan=?, prodi=? WHERE nim=?",
                            [mahasiswa.nama, mahasiswa.angkatan, mahasiswa.prodi, nim],
                            (err, res)=>{
                                if (err){
                                    console.log("error:", err);
                                    result(null, err);
                                    return;
                                }
                                if (res.affectedRows==0){
                                    result({kind:"not_found"}, null);
                                    return;
                                }
                                console.log("update mahasiswa: ", {nim : nim,...mahasiswa});
                                result(null, {nim: nim,...mahasiswa});
                            }
                        )
                    },

                    delete: (nim, result)=>{
                        db.query("DELETE FROM mahasiswa WHERE nim = ?",nim,(err, res)=>{
                            if(err){
                                console.log("error:", err);
                                result(null, err);
                                return;
                            }
                            if(res.affectedRows == 0){
                                result({kind:"not_found"}, null);
                                return;
                            }
                            console.log("deleted mahasiswa with nim : ", nim);
                            result(null, res);
                        })
                    },
                    getNilaiByNim:(nim, result)=>{
                        console.log(nim)
                        try{
                            db.query(`SELECT matakuliah.kdMk, matakuliah.matakuliah,nilai.dosen,nilai.semester,nilai.nilai 
                            FROM mahasiswa,matakuliah,nilai WHERE mahasiswa.nim=${nim} AND nilai.nim=${nim} AND nilai.kdMk=matakuliah.kdMk `,(err,res)=>
                            {
                                result(null,res)
                            }
                            );
                        }catch(error){
                            result(error,null)
                        }
                    }
                   
                    
                    
                }