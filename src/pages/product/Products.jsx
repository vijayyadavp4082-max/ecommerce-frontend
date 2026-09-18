import React from 'react'
import { useState } from 'react'
import ProductCard from '../../component/productCard/ProductCard'
import {getAllProducts} from '../../service/productService'
import { useEffect } from 'react'

const Products = () => {
  //product received from backend
    const [products, setProducts] = useState([]);
    //what user is currently typing
    const [searchText, setSearchText] = useState("");
    //actual keyword sent to backend for searching
    const [keyword, setkeyword]= useState("");
    //backend start page is 0
    const [currentPage, setCurrentPage] = useState(0);
    //total pages received from backend
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const pageSize=8;
    useEffect(()=>{
      const fetchProducts=async()=>{
        setLoading(true);
        setError("");
        try{
          const response=await getAllProducts(keyword,currentPage,pageSize);
          setProducts(response.data.content);
          setTotalPages(response.data.totalPages);
          setTotalProducts(response.data.totalElements);

        }catch(error){
          console.error("Error fetching products:",error);
          setError("Failed to fetch products. Please try again later.");
        }finally{
          setLoading(false);
        }
      }
      fetchProducts();
    },[keyword,currentPage]);
    const handleSearch=(event)=>{
      event.preventDefault();
      setkeyword(searchText.trim());
      setCurrentPage(0);
    };
    const handleClearSearch=()=>{
      setSearchText("");
      setkeyword("");
      setCurrentPage(0);
    };
    const handlePageChange=(pageNumber)=>{
      setCurrentPage(pageNumber);
      window.scrollTo({
        top:0,
        behavior:"smooth"   
      })
      if(loading){
        return(<div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <p className='text-secondary mt-3'>Loading products...</p>
            </div>
        </div>)
      }

    }

  return (

    <div className="container py-5">


      {/* PAGE HEADING */}

      <div className="text-center mb-4">

        <i className="bx bx-store display-5 text-primary"></i>

        <h2 className="fw-bold mt-2">
          Our Products
        </h2>

        <p className="text-secondary">
          Explore our latest products
        </p>

      </div>



      {/* SEARCH SECTION */}

      <div className="row justify-content-center mb-5">

        <div className="col-md-8 col-lg-6">

          <form onSubmit={handleSearch}>

            <div className="input-group">

              <span className="input-group-text bg-white">

                <i className="bx bx-search"></i>

              </span>


              <input
                type="text"
                className="form-control"
                placeholder="Search products by name..."
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
              />


              <button
                type="submit"
                className="btn btn-primary"
              >

                <i className="bx bx-search me-1"></i>

                Search

              </button>


              {keyword && (

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClearSearch}
                >

                  <i className="bx bx-x me-1"></i>

                  Clear

                </button>

              )}

            </div>

          </form>

        </div>

      </div>



      {/* ERROR MESSAGE */}

      {error && (

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {error}

        </div>

      )}



      {/* SEARCH INFORMATION */}

      {!error && keyword && (

        <div className="alert alert-light border">

          <i className="bx bx-search-alt me-2"></i>

          Search results for:

          <strong className="ms-1">
            "{keyword}"
          </strong>

          <span className="badge text-bg-primary ms-2">

            {totalProducts} products

          </span>

        </div>

      )}



      {/* NO PRODUCTS */}

      {!error && products.length === 0 && (

        <div className="alert alert-info text-center">

          <i className="bx bx-info-circle me-2"></i>

          No products found.

        </div>

      )}



      {/* PRODUCT CARDS */}

      {!error && products.length > 0 && (

        <>

          <div
            className="
              row
              row-cols-1
              row-cols-sm-2
              row-cols-lg-3
              row-cols-xl-4
              g-4
            "
          >

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>



          {/* PAGINATION */}

          {totalPages > 1 && (

            <nav
              className="mt-5"
              aria-label="Product pagination"
            >

              <ul className="pagination justify-content-center">


                {/* PREVIOUS */}

                <li
                  className={
                    currentPage === 0
                      ? "page-item disabled"
                      : "page-item"
                  }
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      handlePageChange(
                        currentPage - 1
                      )
                    }
                  >

                    <i className="bx bx-chevron-left me-1"></i>

                    Previous

                  </button>

                </li>



                {/* PAGE NUMBERS */}

                {Array.from(
                  { length: totalPages },
                  (_, index) => index
                ).map((pageNumber) => (

                  <li
                    key={pageNumber}
                    className={
                      currentPage === pageNumber
                        ? "page-item active"
                        : "page-item"
                    }
                  >

                    <button
                      className="page-link"
                      onClick={() =>
                        handlePageChange(
                          pageNumber
                        )
                      }
                    >

                      {pageNumber + 1}

                    </button>

                  </li>

                ))}



                {/* NEXT */}

                <li
                  className={
                    currentPage === totalPages - 1
                      ? "page-item disabled"
                      : "page-item"
                  }
                >

                  <button
                    className="page-link"
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1
                      )
                    }
                  >

                    Next

                    <i className="bx bx-chevron-right ms-1"></i>

                  </button>

                </li>


              </ul>

            </nav>

          )}

        </>

      )}


    </div>

  );
}

export default Products;