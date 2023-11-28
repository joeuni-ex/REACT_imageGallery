import React from "react";
import { useGlobalContext } from "./context";
import { useFetch } from "./useFetch";

//API주소
const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_ACCESS_KEY
}`;

const Gallery = () => {
  //데이터 받아오기
  const { searchTerm } = useGlobalContext(); //전역 저장된 검색어
  const { data, error, isPending } = useFetch(`${url}&query=${searchTerm}`);
  console.log(data);

  //로딩중
  if (isPending) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  //에러있을경우
  if (error) {
    return (
      <section className="image-container">
        <h4>{error}</h4>
      </section>
    );
  }

  return (
    <section className="gallery">
      <ul className="images">
        {data &&
          data.results.map((item) => {
            const url = item?.urls?.regular;
            return (
              <li className="img" key={item.id}>
                <img src={url} alt={item.alt_description}></img>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Gallery;
