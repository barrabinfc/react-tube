import PropTypes from 'prop-types';

const ThumbnailPropType = PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
})

const VideoPropType = PropTypes.shape({
    videoId:          PropTypes.oneOfType([
                            PropTypes.bool,
                            PropTypes.string
                        ]).isRequired,
    publishedAt:      PropTypes.string.isRequired,
    title:            PropTypes.string.isRequired,
    description:      PropTypes.string.isRequired,
    channelTitle:     PropTypes.string.isRequired,
    channelId:        PropTypes.string.isRequired,
    thumbnails: PropTypes.shape({
      default:  ThumbnailPropType,
      medium:   ThumbnailPropType,
      high:     ThumbnailPropType
    })
})

export default VideoPropType