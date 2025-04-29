import React from 'react';

function TextWithLineBreaks(props) {
  const textWithBreaks = props.text.split('\n').map((text, index) => (
    <span key={index}>
      {text}
      <br />
    </span>
  ));

  return <div>{textWithBreaks}</div>;
}

export default TextWithLineBreaks;