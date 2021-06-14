import React from 'react'

import './Home.css';

import { Posts } from '../../components/Posts';
import { loadPost } from "../../utils/load-post";
import { Button } from "../../components/Button";
import { TextInput } from '../../components/TextInput';

class Home extends React.Component {

  _timeoutUpdate = null;

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: "",
  }
  
  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPost();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  handleClickNext = () => {
    const { page } = this.state;
    this.handleChangePage(page + 1);
  }

  handleClickPrevious = () => {
    const { page } = this.state;
    this.handleChangePage(page - 1);
  }

  handleChangePage = (nextPage) => {
    const {
      postsPerPage,
      allPosts,
    } = this.state;
    const initialRange = nextPage * postsPerPage;
    const nextPosts = allPosts.slice(initialRange, initialRange + postsPerPage);

    this.setState({
      posts: nextPosts, page: nextPage,
    })
  }

  handleChangeInput = (e) => {
    const { value } = e.target;
    this.setState({ searchValue : value });
  }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state;
    const noMorePostsNext = page + postsPerPage >= allPosts.length;
    const noMorePostsPrevious = page + postsPerPage <= 0;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        )
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          <TextInput
            type={"search"}
            onChange={this.handleChangeInput}
            placeholder="Type your search"
          />

          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}
        </div>

        {filteredPosts.length > 0
          ? <>
              <Posts posts={filteredPosts}/>
            </>
            : <>
                <h1>Sem resultados!</h1>
              </>
        }

        {!searchValue && (
          <>
            <Button
              onClick={this.handleClickNext}
              text={"Next"}
              disabled={noMorePostsNext}/>
            <Button
              onClick={this.handleClickPrevious}
              text={"Previous"}
              disabled={noMorePostsPrevious}
              />
          </>
        )}
      </section>
    );
  }  
}



export default Home;
