import React from 'react';
import style from './MyPosts.module.css';
import {Post} from "./MyPost/Post.";
import {addPost, PostPropsType} from "../../../Redux/store";

type MyPostsPropsType = {
    postsData: PostPropsType[]
    addPost: (postMessage: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    //
    // const [textPost, setTextPost] = useState('')
    // const [posts, setPosts] = useState(props.postsData)
    //
    // const textPostChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setTextPost(event.currentTarget.value)
    // }
    //
    // const addTaskHandler = () => {
    //     if (!!textPost.trim()) {
    //         setPosts([{id: 4, message: textPost, likeCounts: 0}, ...posts])
    //         setTextPost('')
    //     }
    // }


    let postElement: any = React.createRef()

    const addTaskHandler2 = () => {
        let text = postElement.current.value
        props.addPost(text)
        postElement.current.value =''
    }

    return (
        <div className={style.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        // value={textPost}
                        // onChange={textPostChangeHandler}
                        ref={postElement} // method 2
                    />
                </div>
                <div>
                    <button
                        // onClick={addTaskHandler}
                        onClick={addTaskHandler2}
                    >add post
                    </button>
                </div>
            </div>
            <div className={style.posts}>
                {/*{posts.map((p: any, key: number) => (*/}
                {props.postsData.map((p: any, key: number) => (
                    <Post
                        key={key}
                        message={p.message}
                        likeCounts={p.likeCounts}
                    />)
                )}
            </div>
        </div>
    )
}