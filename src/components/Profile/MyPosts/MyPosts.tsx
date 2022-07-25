import React from 'react';
import style from './MyPosts.module.css';
import { Post } from './MyPost/Post.';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLength, requiredField } from '../../../helpers/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';

export type PostPropsType = {
  id?: number
  message: string
  likeCounts: number
}

type MyPostsPropsType = {
  posts: PostPropsType[]
  addPost: (post: string) => void
}


export class MyPosts extends React.PureComponent<MyPostsPropsType> {

  // shouldComponentUpdate(nextProps: Readonly<MyPostsPropsType>, nextState: Readonly<{}>): boolean {
  //   return nextProps !== this.props || nextState !== this.state
  // }
  //   эта тема что сверху написана в реакт мемо и пюр компонент для классов
  // PureComponent    analog React.memo for classes

  render() {
    const onSubmit = (formData: FormDataType) => {
      this.props.addPost(formData.post);
    };

    return (
      <div className={style.postsBlock}>
        <h3>My posts</h3>
        <PostReduxForm onSubmit={onSubmit} />
        <div className={style.posts}>
          {this.props.posts.map((p: PostPropsType) => (
            <Post
              key={p.id}
              message={p.message}
              likeCounts={p.likeCounts}
            />),
          )}
        </div>
      </div>
    );
  }
}

const maxLength10 = maxLength(10); // выносить креатор за пределы компонента


type FormDataType = {
  post: string
}

const PostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="New Post"
          name={'post'}
          component={Textarea}
          validate={[requiredField, maxLength10]}
        />
      </div>
      <div>
        <button>add post</button>
      </div>
    </form>
  );
};
const PostReduxForm = reduxForm<FormDataType>({ form: 'post' })(PostForm);
