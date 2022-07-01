import React from 'react';
import style from './MyPosts.module.css';
import { Post } from './MyPost/Post.';
import { PostPropsType } from '../../../Redux/store';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLength, requiredField } from '../../../helpers/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';
// import { Textarea } from '../../common/FormControls/FormControls';



type MyPostsPropsType = {
  posts: PostPropsType[]
  addPost: (post: string) => void
}

const maxLength10 = maxLength(10); // выносить креатор за пределы компонента

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

  const onSubmit = (formData: FormDataType) => {
    props.addPost(formData.post);
  };

  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <PosyReduxForm onSubmit={onSubmit} />
      <div className={style.posts}>
        {props.posts.map((p: PostPropsType) => (
          <Post
            key={p.id}
            message={p.message}
            likeCounts={p.likeCounts}
          />),
        )}
      </div>
    </div>
  );
};

type FormDataType = {
  post: string
}

const PosyForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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
const PosyReduxForm = reduxForm<FormDataType>({ form: 'post' })(PosyForm);
