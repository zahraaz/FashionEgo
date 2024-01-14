import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';

import { getProducts, getProductById, createNewProduct, deleteProduct, updateProduct } from '../controllers/productController';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
    
             cb(null, path.join('public', 'images'))
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
        }
    })
});

const router = express.Router();
router.get('/:productId', getProductById)
router.delete('/:productId', deleteProduct)
router.get('/', getProducts);

router.use(upload.single('image'));
//router.use(upload.array('images', 12));

router.post('/', createNewProduct)
router.put('/:productId', updateProduct);

 export default router;

