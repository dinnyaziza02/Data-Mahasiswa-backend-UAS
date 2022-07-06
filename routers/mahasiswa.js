const express = require("express");
const routerMahasiswa = express.Router()
const controllerMahasiswa = require('../controllers/mahasiswa')


// squential search


routerMahasiswa.route('/mahasiswa')
    .get(controllerMahasiswa.getMahasiswa )

    .post( controllerMahasiswa.insert)
                
routerMahasiswa.route('/mahasiswa')
    .get( (req,res)=>{
        res.send(mahasiswa)
    })

    .post( (req,res)=>{
        res.send('Data Mahasiswa Sukses Tersimpan')
    })

routerMahasiswa.route('/mahasiswa/:nim')
    .put( controllerMahasiswa.update)

    // session delete 
    .delete(controllerMahasiswa.delete)
    .get(controllerMahasiswa.getMahasiswaByNim)

routerMahasiswa.route('/mahasiswa/nilai/:nim')
    .get(controllerMahasiswa.getNilaiByNim)

routerMahasiswa.get('/mahasiswa/:nama/:alamat', (req,res)=>{
    const nama = req.params.nama
    const alamat = req.params.alamat
    res.send('Mahasiswa nama : ' + nama + 'alamat :' + alamat)
})
    module.exports=routerMahasiswa