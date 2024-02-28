import Product from "../models/product.model.js"
import {verifyUserToken} from "../models/verifyToken.js"


export const createProduct = async (req, res) => {
  const { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionMenu, categoryMenu } = req.body;
  // const { userToken } = req;
  
  // if (userToken.role !== "Admin") {
  //   return res.status(403).json({ message: "Acceso denegado" });
  // }

  try {
    const newProduct = await Product.create({
      nameMenu: nameMenu,
      imageMenu: imageMenu,
      priceMenu: priceMenu,
      cantidadMenu: cantidadMenu,
      descriptionMenu: descriptionMenu,
      categoryMenu: categoryMenu
    });

    res.status(201).json({ _id: newProduct._id });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  }


export const getAll = async (req, res) => {
  // const { userToken } = req;
  
  // if ( userToken.role !== "Admin") {
  //   return res.status(403).json({message: "Acceso denegado"});
  // }
  try {
    const products = await Product.find();
    res.status(200).json(products);

  } catch (error) {
    return res.status(500).json({message: error});
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    res.status(200).json(products);

  } catch (error) {
    return res.status(500).json({message: error});
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;
  // const { userToken } = req;
  
  // if ( userToken.role !== "Admin") {
  //   return res.status(403).json({message: "Acceso denegado"});
  // }

  try {
    await Product.findByIdAndDelete(id);
    res.status(204).json({message: "Producto eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

export const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { userToken } = req;
  
  if ( userToken.role !== "Admin") {
    return res.status(403).json({message: "Acceso denegado"});
  }
  try {
    const productUpdate = await Product.findByIdAndUpdate(id, payload);

    if (!productUpdate) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto actualizado" });
  } catch (error) {
    return res.status(500).json({message: error});
  }
};

export const getProductsWithOptions = async (req, res) => {
  const { nameMenu, priceMenu, categoryMenu } = req.query;
  const searchQuery = { visible: true };
  let sortQuery = {};

  if (priceMenu === 'asc' || priceMenu === 'desc') {
    sortQuery.priceMenu = priceMenu === 'asc' ? 1 : -1;
  }

  if (nameMenu) {
    const partialMatchName = new RegExp(nameMenu, 'i');
    searchQuery.nameMenu = partialMatchName;
  }

  if (priceMenu === 'disc') {
    searchQuery.discountPercentage = { $exists: true };
  }

  if (categoryMenu) {
    searchQuery.categoryMenu = categoryMenu;
  }

  try {
    const productsFound = await Product.find(searchQuery).sort(sortQuery);

    if (productsFound.length >= 1) {
      return res.status(200).json(productsFound);
    }

    res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

