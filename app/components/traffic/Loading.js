import React from 'react';
import styles from './loading.scss';

const Loading = (props) => {
  const { isError, isFetching } = props;
  const message = props.isError ? 'Opps somthing went wrong try again' : 'Loading...';
  let markup = null;

  if (isError || isFetching) {
    markup = (
      <div className={styles.wrapper}>
        <div className={styles.message}>{message}</div>
      </div>
    );
  }

  return markup;
};

export default Loading;
