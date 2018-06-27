import PropTypes from 'prop-types';

const VideoPropType = PropTypes.shape({
    videoId:          PropTypes.string.isRequired,
    publishedAt:      PropTypes.string.isRequired,
    title:            PropTypes.string.isRequired,
    description:      PropTypes.string.isRequired,
    channelTitle:     PropTypes.string.isRequired,
    channelId:        PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      default:  PropTypes.string,
      medium:   PropTypes.string,
      high:     PropTypes.string
    })
})

export default VideoPropType