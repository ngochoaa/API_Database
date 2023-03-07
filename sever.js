const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('./models/user')
const Admin = require('./models/admin')
const Feedback = require('./models/feedback')
 const Hoadon = require('./models/hoadon')

 const Nhanvien = require('./models/nhanvien')
 const Sanpham = require('./models/sanpham')
const Tichdiem = require('./models/tichdiem')
const Uudai = require('./models/uudai')
const Category = require('./models/category')
var router = require('./router/router')
const port = 3000 || process.env.PORT




app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router);

mongoose.set("strictQuery", false)

mongoose.connect("mongodb+srv://hoangochuynh252:hoangochuynh252@cluster0.i0zhbp5.mongodb.net/Node-API?retryWrites=true&w=majority")
    .then(() => {
        app.listen(port, () => {
            console.log('Node API app running 3000 ')
        })

        console.log('Connect to MongoDB')
    }).catch((error) => {
        console.log(error)
    })
//routers

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})


//SELECT
app.get('/user', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//UPDATE

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ID = await User.findByIdAndUpdate(id, req.body);
        if (!ID) {
            return res.status(404).json({ message: 'Cannot find any user with id' })
        }
        const updaeUser = await User.findById(id);
        res.status(200).json(updaeUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//ADD
// app.post('/user', async (req, res) => {
//     try {
//         const user = await User.create(req.body)
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({ message: error.message });
//     }
// })

//DELETE
app.delete('/user/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltuser = await User.findByIdAndDelete(id);
        if(!dltuser){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltuser);z
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
    
})





//--------------------------TBL ADMIN-------------------------------------------


app.get('/admin', async (req, res) => {
    try {
        const admin = await Admin.find({});
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/admin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//UPDATE

app.put('/admin/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ID = await Admin.findByIdAndUpdate(id, req.body);
        if (!ID) {
            return res.status(404).json({ message: 'Cannot find any user with id' })
        }
        const updaeAdmin = await Admin.findById(id);
        res.status(200).json(updaeAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//ADD
app.post('/admin', async (req, res) => {
    try {
        const admin = await Admin.create(req.body)
        res.status(200).json(admin);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/admin/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltadmin = await Admin.findByIdAndDelete(id);
        if(!dltadmin){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltadmin);z
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
    
})




//--------------------------TBL NHANVIEN-------------------------------------------


app.get('/nhanvien', async (req, res) => {
    try {
        const nhanvien = await Nhanvien.find({});
        res.status(200).json(nhanvien)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/nhanvien/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const nhanvien = await Nhanvien.findById(id);
        res.status(200).json(nhanvien)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//UPDATE

app.put('/nhanvien/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ID = await Nhanvien.findByIdAndUpdate(id, req.body);
        if (!ID) {
            return res.status(404).json({ message: 'Cannot find any user with id' })
        }
        const updaenhanvien = await Nhanvien.findById(id);
        res.status(200).json(updaenhanvien);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//ADD
app.post('/nhanvien', async (req, res) => {
    try {
        const nhanvien = await Nhanvien.create(req.body)
        res.status(200).json(nhanvien);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/nhanvien/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltnhanvien = await Nhanvien.findByIdAndDelete(id);
        if(!dltadmin){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltnhanvien);z
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
    
})





//--------------------------TBL HOADON-------------------------------------------


app.get('/hoadon', async (req, res) => {
    try {
        const hoadon = await Hoadon.find({});
        res.status(200).json(hoadon)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/hoadon/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hoadon = await Hoadon.findById(id);
        res.status(200).json(hoadon)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//ADD
app.post('/hoadon', async (req, res) => {
    try {
        const hoadon = await Hoadon.create(req.body)
        res.status(200).json(hoadon);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/hoadon/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dlthoadon = await Hoadon.findByIdAndDelete(id);
        if(!dlthoadon){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dlthoadon);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
    
})



//--------------------------TBL SANPHAM-------------------------------------------


app.get('/sanpham', async (req, res) => {
    try {
        const sanpham = await Sanpham.find({});
        res.status(200).json(sanpham)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/sanpham/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sanpham = await Sanpham.findById(id);
        res.status(200).json(sanpham)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//UPDATE

app.put('/sanpham/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ID = await Sanpham.findByIdAndUpdate(id, req.body);
        if (!ID) {
            return res.status(404).json({ message: 'Cannot find any user with id' })
        }
        const updaesanpham = await Sanpham.findById(id);
        res.status(200).json(updaesanpham);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//ADD
app.post('/sanpham', async (req, res) => {
    try {
        const sanpham = await Sanpham.create(req.body)
        res.status(200).json(sanpham);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/sanpham/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltsanpham = await Sanpham.findByIdAndDelete(id);
        if(!dltsanpham){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltsanpham);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
})

//--------------------------TBL FEEDBACK-------------------------------------------


app.get('/feedback', async (req, res) => {
    try {
        const feedback = await Feedback.find({});
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/feedback/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//ADD
app.post('/feedback', async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body)
        res.status(200).json(feedback);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/feedback/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltfeedback = await Feedback.findByIdAndDelete(id);
        if(!dltfeedback){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltfeedback);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
})



//--------------------------TBL TICHDIEM-------------------------------------------


app.get('/tichdiem', async (req, res) => {
    try {
        const tichdiem = await Tichdiem.find({});
        res.status(200).json(tichdiem)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/tichdiem/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tichdiem = await Tichdiem.findById(id);
        res.status(200).json(tichdiem)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//ADD
app.post('/tichdiem', async (req, res) => {
    try {
        const tichdiem = await Tichdiem.create(req.body)
        res.status(200).json(tichdiem);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//--------------------------TBL UUDAI-------------------------------------------


app.get('/uudai', async (req, res) => {
    try {
        const uudai = await Uudai.find({});
        res.status(200).json(uudai)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/uudai/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const uudai = await Uudai.findById(id);
        res.status(200).json(uudai)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//UPDATE

app.put('/uudai/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ID = await Uudai.findByIdAndUpdate(id, req.body);
        if (!ID) {
            return res.status(404).json({ message: 'Cannot find any user with id' })
        }
        const updaeuudai = await Uudai.findById(id);
        res.status(200).json(updaeuudai);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//ADD
app.post('/uudai', async (req, res) => {
    try {
        const uudai = await Uudai.create(req.body)
        res.status(200).json(uudai);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/uudai/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltuudai = await Uudai.findByIdAndDelete(id);
        if(!dltadmin){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltuudai);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
    
})

//--------------------------TBL CATEGORY-------------------------------------------


app.get('/category', async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})
//SELECT BY ID
app.get('/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//UPDATE

app.put('/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ID = await Category.findByIdAndUpdate(id, req.body);
        if (!ID) {
            return res.status(404).json({ message: 'Cannot find any category with id' })
        }
        const updaeCategory = await Category.findById(id);
        res.status(200).json(updaeCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//ADD
app.post('/category', async (req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
})

//DELETE
app.delete('/category/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const dltcategory = await Category.findByIdAndDelete(id);
        if(!dltcategory){
            return res.status(404).json({message: 'CANNOT FIND USER BY ID'})
        }
        res.status(200).json(dltcategory);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ message:error.message});
    }
    
})