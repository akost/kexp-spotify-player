import React from 'react';
import glamorous from 'glamorous';
import {colors} from '../lib/common';

const Wrapper = glamorous.div({
  paddingTop: 5,
  paddingBottom: 15,
  '& h2': {
    margin: 0
  },
  '& .onnow': {
    color: colors.orange,
    fontWeight: 'bold',
    display: 'inline-block',
    marginTop: 8,
    marginRight: 8,
    fontSize: 12,
    textTransform: 'uppercase'
  },
  '& .host': {
    fontSize: 12,
    color: colors.white,
    textDecoration: 'none'
  },
  '& .host:hover': {
    textDecoration: 'underline'
  }
});

const PlayerHeader = ({currentShow}) => (
  <Wrapper>
    <h2>KEXP + Spotify</h2>
    {currentShow && (
      <div>
        <span className="onnow">On air now:</span>
        <a className="host" href="https://kexp.org/playlist/" target="_blank" rel="noopener noreferrer">{currentShow.name} with {currentShow.host}</a>
      </div>  
    )}
  </Wrapper>
);

export default PlayerHeader;
