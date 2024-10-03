import React from "react";
import "./categories.scss";
import {Link} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Skeleton } from "@mui/material";

const Categories = () => {
  const {data, loading, error} = useFetch(`/categories?populate=img`);

  return (
    <>
    {loading && (
      <Skeleton variant="rectangular" width={1000} height={400} />
    )}
    {data && (
       <div className="categories">
       <div className="col">
         <div className="row">
         <img
             src={`${import.meta.env.VITE_UPLOAD_URL}${data[0].img.url}`}
             alt=""
           />
           <button>
             <Link className="link" to={`/products/${data[0].id}`}>
               {data[0].title}
             </Link>
           </button>
         </div>
         <div className="row">
         <img
             src={`${import.meta.env.VITE_UPLOAD_URL}${data[1].img.url}`}
             alt=""
           />
           <button>
             <Link to={`/products/${data[1].id}`} className="link">
             {data[1].title}
             </Link>
           </button>
         </div>
       </div>
       <div className="col">
         <div className="row">
         <img
             src={`${import.meta.env.VITE_UPLOAD_URL}${data[2].img.url}`}
             alt=""
           />
           <button>
             <Link to={`/products/${data[2].id}`} className="link">
             {data[2].title}
             </Link>
           </button>
         </div>
       </div>
       <div className="col col-l">
         <div className="row">
           <div className="col">
             <div className="row">
             <img
                 src={`${import.meta.env.VITE_UPLOAD_URL}${data[3].img.url}`}
                 alt=""
               />
               <button>
                 <Link to={`/products/${data[3].id}`} className="link">
                  {data[3].title}
                 </Link>
               </button>
             </div>
           </div>
           <div className="col">
             <div className="row">
             <img
                 src={`${import.meta.env.VITE_UPLOAD_URL}${data[4].img.url}`}
                 alt=""
               />
               <button>
                 <Link to={`/products/${data[4].id}`} className="link">
                  {data[4].title}
                 </Link>
               </button>
             </div>
           </div>
         </div>
         <div className="row">
         <img
             src={`${import.meta.env.VITE_UPLOAD_URL}${data[5].img.url}`}
             alt=""
           />
           <button>
             <Link to={`/products/${data[5].id}`} className="link">
              {data[5].title}
             </Link>
           </button>
         </div>
       </div>
     </div>
    )}
   
    </>
  );
};

export default Categories;
