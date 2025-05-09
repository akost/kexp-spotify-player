import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import {colors} from '../lib/common';
import vinylRecord from '../icons/vinyl-record.svg';
import SpotifyActions from './SpotifyActions';
import FormattedComments from '../lib/formattedComments';
import { LinkItUrl } from 'react-linkify-it';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  width: '100%',
  '& .image': {
    width: '50%',
    '& img': {
      maxWidth: '100%'
    }
  },
  '& .comment a': {
        color: '#feac31',
        textDecoration: 'none'
  },
  '& .details': {
    display: 'flex',
    width: '45%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .label': {
      fontSize: 12,
      color: colors.lightGray,
      marginBottom: 5
    },
    '& .value': {
      fontSize: 22,
      marginBottom: 15,
      fontWeight: 300
    },
    '& .comment': {
      fontSize: 15
    },
    '& .airbreak': {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: 28
    }
  },
  '@media(max-width: 600px)': {
    display: 'block',
    '& .details': {
      marginBottom: 20,
      width: '100%',
      '& .label': {
        margin: '0 15px 3px 15px'
      },
      '& .value': {
        fontSize: 18,
        margin: '0 15px 10px 15px',
        fontWeight: 300
      },
      '& .comment': {
        fontSize: 14
      }
    },
    '& .image': {
      display: 'block',
      textAlign: 'center',
      width: '100%'
    },
    
    '& .airbreak': {
      textAlign: 'center',
      fontSize: 22,
      '& h3': {
        margin: '5px 0'
      }
    }
  }
});

class NowPlaying extends Component {
  renderAirbreak() {  
    return (
      <div className="details">
        <div className="airbreak">
          <h3>Air break</h3>
        </div>
      </div>
    );
  }

  renderTrackDetails() {
    const {nowPlaying, onSaveTrack} = this.props;
            
    return (
      <div className="details">
        <div>
          <div className="label">Artist</div>
          <div className="value">{nowPlaying.artist}</div>
          <div className="label">Track</div>
          <div className="value">{nowPlaying.track}</div>
          {nowPlaying.release && (
            <div>
              <div className="label">Album</div>
              <div className="value">
                {nowPlaying.release}
                {nowPlaying.releaseYear && ` – ${nowPlaying.releaseYear}`}
              </div>
            </div>
          )}
          {nowPlaying.comment && (
            <div>
              <div className="label">DJ Comments</div>
              <div className="value comment">
                  <FormattedComments text={nowPlaying.comment} />
              </div>
            </div>
          )}
        </div>
        <div>
          {<SpotifyActions nowPlaying={nowPlaying} onSave={onSaveTrack}/>}
        </div>
      </div>
    );
  }

  renderAlbumArt() {
    const {nowPlaying} = this.props;
    let albumArt = vinylRecord;

    if (!nowPlaying) return null;
    
    if(nowPlaying.releaseImage) {
      albumArt = nowPlaying.releaseImage;
    }

    // If we have Spotify data
    if (nowPlaying.albumImage) {
      albumArt = nowPlaying.albumImage;
    } 

    return (
      <div className="image">
        <img src={albumArt} alt={nowPlaying.release}/>
      </div>
    );
  }


  render() {
    const {nowPlaying} = this.props;
    if (!nowPlaying) return null;

    return (
      <Wrapper>
        {nowPlaying.playType === 'Air break' ? this.renderAirbreak() : this.renderTrackDetails()}
        {this.renderAlbumArt()}
        
      </Wrapper>
    );
  }  
};

NowPlaying.propTypes = {
  nowPlaying: PropTypes.shape({
    artist: PropTypes.string,
    track: PropTypes.string,
    release: PropTypes.string,
    releaseYear: PropTypes.number,
    releaseImage: PropTypes.string,
    albumImage: PropTypes.string,
    playType: PropTypes.string,
    comment: PropTypes.string,
    isSavedToSpotify: PropTypes.bool
  }),
  onSaveTrack: PropTypes.func,
  validSpotifyToken: PropTypes.bool
};

export default NowPlaying;