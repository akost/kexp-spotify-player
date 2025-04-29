import React from 'react';
import { LinkItUrl } from 'react-linkify-it';

function FormattedComments(props) {
  const textWithBreaks = props.text.split('\n').map((text, index) => (
    <span key={index}>
      {text}
      <br />
    </span>
  ));

  return <LinkItUrl>{textWithBreaks}</LinkItUrl>;
}

export default FormattedComments;