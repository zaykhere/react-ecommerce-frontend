import React, { useEffect, useState } from "react";
import "./list.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { Skeleton } from "@mui/material";
import debounce from 'lodash.debounce';

const List = ({subCats, maxPrice, sort, catId}) => {
  const [debouncedUrl, setDebouncedUrl] = useState('');

  const queryString = subCats
  .map((value, index) => `filters[sub_categories][id][$in][${index}]=${value}`)
  .join('&');

  // Debounce function to update the URL for API call
  const updateUrl = debounce((price) => {
    const url = `/products?populate=*&[filters][categories][id][$eq]=${catId}&${queryString}&[filters][price][$lte]=${price}&sort=price:${sort}`;
    setDebouncedUrl(url);
  }, 300); // Adjust debounce time as needed

  useEffect(() => {
    updateUrl(maxPrice);

    // Cleanup the debounce on unmount
    return () => {
      updateUrl.cancel();
    };
  }, [maxPrice, catId, queryString, sort]); // Runs when any of these values change

  const { data, loading, error } = useFetch(debouncedUrl);
  

  // const data = [
  //   {
  //     id: 1,
  //     img: "https://radstore.pk/cdn/shop/products/1C1A9074_360x.jpg?v=1676539370/", // Replace with a valid Pexels link
  //     img2: "https://radstore.pk/cdn/shop/files/1C1A3404_720x.jpg?v=1707402975", // Replace with a valid Pexels link
  //     title: "Long sleeve graphic t-shirt",
  //     isNew: true,
  //     oldPrice: 19,
  //     newPrice: 12,
  //   },
  //   {
  //     id: 2,
  //     img: "https://radstore.pk/cdn/shop/files/DSC00553_360x.jpg?v=1725355973", // Replace with a valid Pexels link
  //     img2: "https://radstore.pk/cdn/shop/files/IMG_2742-_4_360x.jpg?v=1683881475", // Replace with a valid Pexels link
  //     title: "Short sleeve graphic t-shirt",
  //     isNew: false,
  //     oldPrice: 25,
  //     newPrice: 18,
  //   },
  //   {
  //     id: 3,
  //     img: "https://mendeez.com/cdn/shop/files/10-2_634e3f50-ff7f-4582-9b8a-aca9c3457f37.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1723905145&width=900/", // Replace with a valid Pexels link
  //     img2: "https://mendeez.com/cdn/shop/files/12-2_7b190bbf-f4f6-441c-8ebe-bc6ddc572514.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1723905135&width=900/", // Replace with a valid Pexels link
  //     title: "Sleeveless graphic t-shirt",
  //     isNew: true,
  //     oldPrice: 22,
  //     newPrice: 16,
  //   },
  //   {
  //     id: 4,
  //     img: "https://radstore.pk/cdn/shop/files/IMG_2742-_4_360x.jpg?v=1683881475", // Replace with a valid Pexels link
  //     img2: "https://radstore.pk/cdn/shop/files/DSC00553_360x.jpg?v=1725355973/", // Replace with a valid Pexels link
  //     title: "Short sleeve graphic t-shirt",
  //     isNew: false,
  //     oldPrice: 25,
  //     newPrice: 18,
  //   },
  // ];

  return (
    <div className="list">
        {loading && [0,1,2,3].map((item) => (
          <Skeleton variant="rectangular" width={280} height={400} />
        ))}
        {data?.map(item=>(
            <Card item={item} key={item.id} />
        ))}
    </div>
  );
};

export default List;
