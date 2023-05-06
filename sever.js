const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const Admin = require("./models/admin");
const Feedback = require("./models/feedback");
const Hoadon = require("./models/hoadon");

const Nhanvien = require("./models/nhanvien");
const Sanpham = require("./models/sanpham");
const Tichdiem = require("./models/tichdiem");
const Uudai = require("./models/uudai");
const Category = require("./models/category");
const Banner = require("./models/banner");
var router = require("./router/router");
const category = require("./models/category");
const PRODUCT = require("./models/product");

const CAFE = require("./models/ProductByIDCategory/Cafe");
const DAXAY = require("./models/ProductByIDCategory/DaXay");
const NUOCEP = require("./models/ProductByIDCategory/NuocEp");
const TRA = require("./models/ProductByIDCategory/Tra");
const TRASUA = require("./models/ProductByIDCategory/TraSua");
const Cart = require("./models/cart");

const paypal = require("paypal-rest-sdk");

const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://hoangochuynh252:hoangochuynh252@cluster0.i0zhbp5.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Node API app running 3000 ");
    });

    console.log("Connect to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
//routers

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

//CART

// Lấy thông tin giỏ hàng của người dùng
app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Thêm sản phẩm vào giỏ hàng
app.post("/cart/:userId/items", async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, price, subtotal } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      // Giỏ hàng đã tồn tại, thêm sản phẩm mới vào
      cart.items.push({ productId, quantity, price, subtotal });
      await cart.save();
    } else {
      // Tạo giỏ hàng mới và thêm sản phẩm vào
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity, price, subtotal }],
      });
      await newCart.save();
    }

    res.status(201).json({ message: "Thêm sản phẩm vào giỏ hàng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});
//CẬP NHẬT GIỎ HÀNG
app.put("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items; // Cập nhật lại danh sách sản phẩm trong giỏ hàng
      await cart.save();
      res.status(200).json({ message: "Cập nhật giỏ hàng thành công" });
    } else {
      res.status(404).json({ error: "Không tìm thấy giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});
//XÓA GIỎ HÀNG
app.delete("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndRemove({ userId });

    if (cart) {
      res.status(200).json({ message: "Xóa giỏ hàng thành công" });
    } else {
      res.status(404).json({ error: "Không tìm thấy giỏ hàng" });
    }
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

//THANH TOÁN

paypal.configure({
  mode: "sandbox",
  client_id:
    "ATJRRo4MAb6Y8Vh377l5jfmvHRZi2rAWL4aJjESQHn4Rf24PUUa43sEdJlFgh70Y7QS5tzfwLkZ1EH16",
  client_secret:
    "EHCQS5Zk4WacDmiHUnMsLE6wtALW-uMoYljvLXU4vZZmDrmhq700gIGJaAZ2fjKYc3WhjZGswWiNn3kt",
});

app.post("/pay", function (req, res) {
  var payment = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "This is the payment description.",
      },
    ],
  };
  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error);
    } else {
      for (var i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

//SELECT
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "get user thất bại",
    });
  }
});

//UPDATE

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await User.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find any user with id" });
    }
    const updateUser = await User.findById(id);
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Cập nhật thất bại nhé" });
  }
});

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
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltuser = await User.findByIdAndDelete(id);
    if (!dltuser) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltuser);
    z;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL ADMIN-------------------------------------------

app.get("/admin", async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE

app.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Admin.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find any user with id" });
    }
    const updaeAdmin = await Admin.findById(id);
    res.status(200).json(updaeAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD
app.post("/admin", async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json(admin);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltadmin = await Admin.findByIdAndDelete(id);
    if (!dltadmin) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltadmin);
    z;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL NHANVIEN-------------------------------------------

app.get("/nhanvien", async (req, res) => {
  try {
    const nhanvien = await Nhanvien.find({});
    res.status(200).json(nhanvien);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/nhanvien/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nhanvien = await Nhanvien.findById(id);
    res.status(200).json(nhanvien);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE

app.put("/nhanvien/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Nhanvien.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find any user with id" });
    }
    const updaenhanvien = await Nhanvien.findById(id);
    res.status(200).json(updaenhanvien);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD
app.post("/nhanvien", async (req, res) => {
  try {
    const nhanvien = await Nhanvien.create(req.body);
    res.status(200).json(nhanvien);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/nhanvien/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltnhanvien = await Nhanvien.findByIdAndDelete(id);
    if (!dltadmin) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltnhanvien);
    z;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL HOADON-------------------------------------------

app.get("/hoadon", async (req, res) => {
  try {
    const hoadon = await Hoadon.find({});
    res.status(200).json(hoadon);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/hoadon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hoadon = await Hoadon.findById(id);
    res.status(200).json(hoadon);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//ADD
app.post("/hoadon", async (req, res) => {
  try {
    const hoadon = await Hoadon.create(req.body);
    res.status(200).json(hoadon);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/hoadon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dlthoadon = await Hoadon.findByIdAndDelete(id);
    if (!dlthoadon) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dlthoadon);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL SANPHAM-------------------------------------------

app.get("/sanpham", async (req, res) => {
  try {
    const sanpham = await Sanpham.find({}).populate("LoaiSP");
    res.status(200).json(sanpham);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/sanphamtest", async (req, res) => {
  try {
    const sanpham = await Sanpham.find({}).populate("LoaiSP");
    res.status(200).json(sanpham);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/sanphamtest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltsanpham = await Sanpham.findByIdAndDelete(id);
    if (!dltsanpham) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltsanpham);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/sanphamtest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Sanpham.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find any user with id" });
    }
    const updaesanpham = await Sanpham.findById(id).populate("LoaiSP");
    res.status(200).json(updaesanpham);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/sanphamtest", async (req, res) => {
  try {
    const sanpham = await Sanpham.create(req.body);
    if (req.body.category) {
      const category = Category.findById(req.body.category);
      await category.updateOne({ $push: { products: sanpham._id } });
    }
    res.status(200).json(sanpham);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/sanpham/category", async (req, res) => {
  try {
    const sanpham = await Sanpham.find({}).populate("LoaiSP");
    res.status(200).json(sanpham);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/sanpham/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sanpham = await Sanpham.findById(id).populate("LoaiSP");

    res.status(200).json(sanpham);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE

app.put("/sanpham/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Sanpham.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find any user with id" });
    }
    const updaesanpham = await Sanpham.findById(id).populate("LoaiSP");
    res.status(200).json(updaesanpham);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/sanpham", async (req, res) => {
  try {
    const sanpham = await Sanpham.create(req.body);
    if (req.body.category) {
      const category = Category.findById(req.body.category);
      await category.updateOne({ $push: { products: sanpham._id } });
    }
    res.status(200).json(sanpham);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/sanpham/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltsanpham = await Sanpham.findByIdAndDelete(id);
    if (!dltsanpham) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltsanpham);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL FEEDBACK-------------------------------------------

app.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//ADD
app.post("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(200).json(feedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltfeedback = await Feedback.findByIdAndDelete(id);
    if (!dltfeedback) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltfeedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL TICHDIEM-------------------------------------------

app.get("/tichdiem", async (req, res) => {
  try {
    const tichdiem = await Tichdiem.find({});
    res.status(200).json(tichdiem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/tichdiem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tichdiem = await Tichdiem.findById(id);
    res.status(200).json(tichdiem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//ADD
app.post("/tichdiem", async (req, res) => {
  try {
    const tichdiem = await Tichdiem.create(req.body);
    res.status(200).json(tichdiem);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL UUDAI-------------------------------------------

app.get("/uudai", async (req, res) => {
  try {
    const uudai = await Uudai.find({});
    res.status(200).json(uudai);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/uudai/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const uudai = await Uudai.findById(id);
    res.status(200).json(uudai);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE

app.put("/uudai/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Uudai.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find any user with id" });
    }
    const updaeuudai = await Uudai.findById(id);
    res.status(200).json(updaeuudai);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD
app.post("/uudai", async (req, res) => {
  try {
    const uudai = await Uudai.create(req.body);
    res.status(200).json(uudai);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/uudai/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltuudai = await Uudai.findByIdAndDelete(id);
    if (!dltuudai) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltuudai);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL CATEGORY-------------------------------------------

app.get("/category", async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//--------------------------GET NAME CATEGORY-------------------

app.get("/category/name", async (req, res) => {
  try {
    const namecategory = await Category.find().select("name");
    res.status(200).json(namecategory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE

app.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Category.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res
        .status(404)
        .json({ message: "Cannot find any category with id" });
    }
    const updaeCategory = await Category.findById(id);
    res.status(200).json(updaeCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD
app.post("/category", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltcategory = await Category.findByIdAndDelete(id);
    if (!dltcategory) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltcategory);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL BANNER-------------------------------------------

app.get("/banner", async (req, res) => {
  try {
    const banner = await Banner.find();
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/banner/images", async (req, res) => {
  try {
    const banner = await Banner.find().select("images");
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/banner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE

app.put("/banner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await Banner.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res
        .status(404)
        .json({ message: "Cannot find any banner with id" });
    }
    const updatebanner = await Banner.findById(id);
    res.status(200).json(updatebanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD
app.post("/banner", async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(200).json(banner);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/banner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltbanner = await Banner.findByIdAndDelete(id);
    if (!dltbanner) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltbanner);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-------------------GET PRODUCT BY ID CATEGORY--------------

app.get("/sanpham/LoaiSP/:id", (req, res) => {
  const categoryId = req.params.id;

  // TODO: Truy vấn vào database để lấy sản phẩm theo categoryId

  res.status(200).json(categoryId);
});

app.get("/sanpham/LoaiSP/:id", async (req, res) => {
  const categoryId = req.params.id;

  const products = await Sanpham.find({ _id: categoryId }).exec();

  res.status(200).json(products);
});

//-----------------------------------------------------MANG DANH MUC
const categories = ["MilkTea", "Cafe", "Ice", "Tea", "Juice"];

app.get("/categories", (req, res) => {
  res.send(categories);
});

//--------------------------TBL PRODUCT-------------------------------------------

app.get("/product", async (req, res) => {
  try {
    const product = await PRODUCT.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/product/category", async (req, res) => {
  try {
    const product = await PRODUCT.find({ category });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//SELECT BY ID
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await PRODUCT.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//ADD
app.post("/product", async (req, res) => {
  try {
    const product = await PRODUCT.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//--------------------------TBL SANPHAM THEO DANH MUC CAFE-------------------------------------------

app.get("/products/category/Cafe", async (req, res) => {
  try {
    const cafe = await CAFE.find({});
    res.status(200).json(cafe);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//ADD
app.post("/products/category/Cafe", async (req, res) => {
  try {
    const cafe = await CAFE.create(req.body);
    res.status(200).json(cafe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//UPDATE
app.put("/products/category/Cafe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await CAFE.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find with id" });
    }
    const updateCafe = await CAFE.findById(id);
    res.status(200).json(updateCafe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//DELETE
app.delete("/products/category/Cafe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltcafe = await CAFE.findByIdAndDelete(id);
    if (!dlthoadon) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltcafe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/category/Ice", async (req, res) => {
  try {
    const daxay = await DAXAY.find({});
    res.status(200).json(daxay);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//UPDATE
app.put("/products/category/Ice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await DAXAY.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find with id" });
    }
    const updateDaxay = await DAXAY.findById(id);
    res.status(200).json(updateDaxay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//ADD
app.post("/products/category/Ice", async (req, res) => {
  try {
    const daxay = await DAXAY.create(req.body);
    res.status(200).json(daxay);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/products/category/Ice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltdaxay = await DAXAY.findByIdAndDelete(id);
    if (!dltdaxay) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltcafe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//---------------------NUOCEP---------------------
app.get("/products/category/Juice", async (req, res) => {
  try {
    const nuocep = await NUOCEP.find({});
    res.status(200).json(nuocep);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//UPDATE
app.put("/products/category/Juice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await NUOCEP.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find with id" });
    }
    const updateNuocEp = await NUOCEP.findById(id);
    res.status(200).json(updateNuocEp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//ADD
app.post("/products/category/Juice", async (req, res) => {
  try {
    const nuocep = await NUOCEP.create(req.body);
    res.status(200).json(nuocep);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/products/category/Juice/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dltnuocep = await NUOCEP.findByIdAndDelete(id);
    if (!dltnuocep) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltcafe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//---------------------tra---------------------
app.get("/products/category/Tea", async (req, res) => {
  try {
    const tra = await TRA.find({});
    res.status(200).json(tra);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE
app.put("/products/category/Tea/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await TRA.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find with id" });
    }
    const updateTra = await TRA.findById(id);
    res.status(200).json(updateTra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ADD
app.post("/products/category/Tea", async (req, res) => {
  try {
    const tra = await TRA.create(req.body);
    res.status(200).json(tra);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/products/category/Tea/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dlttra = await TRA.findByIdAndDelete(id);
    if (!dlttra) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltcafe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//---------------------tra sua---------------------
app.get("/products/category/MilkTea", async (req, res) => {
  try {
    const trasua = await TRASUA.find({});
    res.status(200).json(trasua);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//UPDATE
app.put("/products/category/MilkTea/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ID = await TRASUA.findByIdAndUpdate(id, req.body);
    if (!ID) {
      return res.status(404).json({ message: "Cannot find with id" });
    }
    const updateTraSua = await TRASUA.findById(id);
    res.status(200).json(updateTraSua);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//ADD
app.post("/products/category/MilkTea", async (req, res) => {
  try {
    const trasua = await TRASUA.create(req.body);
    res.status(200).json(trasua);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE
app.delete("/products/category/MilkTea/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dlttrasua = await TRASUA.findByIdAndDelete(id);
    if (!dlttrasua) {
      return res.status(404).json({ message: "CANNOT FIND USER BY ID" });
    }
    res.status(200).json(dltcafe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-----------------------UPDATE USER------
