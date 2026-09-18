import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductById } from '../../service/productService';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
    const {id}=useParams();
    const [product,setProduct]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    useEffect(()=>{
        const fetchProduct=async()=>{
            try{
                const response=await getProductById(id);
                setProduct(response.data);
            }catch(error){
                console.error("Error fetching product:",error);
                setError(error.response?.data?.message || "Failed to fetch product details. Please try again later.");
            }finally{
                setLoading(false);
            }
        }
        fetchProduct();
    },[id]);
    if(loading){
        return(<div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <p className='text-secondary mt-3'>Loading products...</p>
            </div>
        </div>)
      }
      if(error){
        return(<div className="container py-5 text-center">
          <div className='alert alert-danger mt-3'><i className="bx bx-error-circle me-2"></i> {error}</div>
          <Link to="/products" className="btn btn-outline-primary mt-3"><i className="bx bx-arrow-back me-2"></i>Back to Products</Link>  
      
            </div>
            )
            }
  return (
    <div>
      
    </div>
  )
}

export default ProductDetails