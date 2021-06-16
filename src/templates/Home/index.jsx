import React, { useCallback, useEffect, useState } from 'react'

import './Home.css';

import { Posts } from '../../components/Posts';
import { loadPost } from "../../utils/load-post";
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';
import { Select } from '../../components/Select';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const noMorePostsNext = page + postsPerPage >= allPosts.length;
  const noMorePostsPrevious = page + postsPerPage <= 0;
  
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPost();
    
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos);
  }, [])
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [
    handleLoadPosts,
    postsPerPage,
  ]);

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase()
                       .includes(searchValue.toLowerCase())
    }) : posts;

  const handleChangePage = (nextPage) => {
    const initialRange = nextPage * postsPerPage;
    const nextPosts = allPosts.slice(initialRange, initialRange + postsPerPage);

    setPosts(nextPosts);
    setPage(nextPage);
  }

  const handleClickNext = () => {
    handleChangePage(page + 1);
  }

  const handleClickPrevious = () => {
    handleChangePage(page - 1);
  }

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      <div className="search-container">
        <TextInput
          type={"search"}
          onChange={handleChangeInput}
          placeholder="Type your search"
        />
        
        {!!searchValue && ( <h1>Search value: {searchValue}</h1> )}
      </div>

      <div>
        {filteredPosts.length > 0
          ? <>
              <Posts posts={filteredPosts}/>
            </>
          : <>
              <h1>Sem resultados!</h1>
            </>
        }
      </div>

      <div>
        {!searchValue && (
          <>
            <Button
              onClick={handleClickNext}
              text={"Next"}
              disabled={noMorePostsNext}/>
            <Button
              onClick={handleClickPrevious}
              text={"Previous"}
              disabled={noMorePostsPrevious}
              />
          </>
        )}
      </div>
    </section>
  );
}

export default Home;