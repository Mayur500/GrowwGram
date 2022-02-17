import React, { useState, useEffect } from "react";
import './Feeds.css'
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchingRandomPosts } from "store/actions/feeds";
import {Comments,BackDrop} from 'ui';
import { ThreeDots } from 'react-loader-spinner'
import { fetchingMoreRandomPosts } from "store/actions/feeds";
import InfiniteScroll from 'react-infinite-scroller';
import Feed from "common/ListView/Feed/Feed";
import { PostsType } from "types/post";
import SuggestedProfile from "common/SuggestedProfiles/SuggestedProfile";
import Stories from "common/Stories/Stories";
import { FeedLoader } from "common/Loaders";

const Feeds = () => {

  const {
    posts,
    fetchingPosts,
    fetchingMorePosts,
    failFetchingPosts,
    failFetchingMorePosts,
    hasMorePosts,
    hidePosts
  } = useAppSelector(state => state.feedsData);
  const [isbackDrop, setBackDrop] = useState<boolean>(false);
  const [postid, setPostid] = useState<string>('');
  const dispatch = useAppDispatch();

  const isNotFetching = !fetchingPosts && !fetchingMorePosts;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchingRandomPosts());
  }, []);

  const filterPost = posts.find((post) => postid === post.id);

  const getMorePhotos = () => {
    if (isNotFetching) {
      dispatch(fetchingMoreRandomPosts());
    }
  }


  const ApiError = <div data-testid="three-dots-loading"><h1> Api Error </h1> </div>
  const FetchApiError = <h1 className="fd21Error" key={0}> Api Error </h1>
  return (
    <>
      {
         failFetchingPosts ? ApiError : (
          <>
            <BackDrop isDrop={isbackDrop} setBackDrop={setBackDrop} />
            <div className="fd21Container">
              {isbackDrop ? <Comments post={filterPost as PostsType} /> : null}
              <InfiniteScroll
                pageStart={0}
                loadMore={getMorePhotos}
                hasMore={hasMorePosts}
                loader={failFetchingMorePosts ? FetchApiError : <ThreeDots key={0} />}>

                <div className=" fd21Content main21Content">
                  <div className="fd21InsideContainer">
                     <div><Stories postStories={posts} fetchingPosts={fetchingPosts}/></div> 
                    { fetchingPosts ? <FeedLoader /> : (
                    
                    posts.map((post, index) => (

                        <Feed key={`${post.user.username}_${index}`} setBackDrop={setBackDrop} post={post} setPostId={setPostid} />

                      ))
                    
                     )
                  }
                  </div>

                  <div className="fd21Suggestions flex">
                    <SuggestedProfile />
                  </div>

                </div>

              </InfiniteScroll>
            </div>
          </>
        )}
    </>
  )
}

export default Feeds;
