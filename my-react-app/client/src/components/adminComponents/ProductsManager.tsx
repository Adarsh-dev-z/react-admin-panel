import React from "react";
import { useDispatch, useSelector} from "react-redux"
import { addProduct, updateProduct, deleteProduct } from "../../slices/productSlice";

const ProductFrom:React.FC = () =>{

    const [formData, setFormData] = useState<Omit<Product, "_id">>({
        name: "",
        price: 0,
        description: "",
        category: "",
        inStock: true,
      });

    return(
        <div></div>
    )
}