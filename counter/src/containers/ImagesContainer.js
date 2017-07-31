import { connect } from 'react-redux';
import Images from '../components/Images';
import { fetchImages } from '../actions';
import { clearImages } from '../actions';

const mapStateToProps = (state) => {
  return {
    images: state.images
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clear: () => dispatch(clearImages()),
    load: (query) => dispatch(fetchImages(query))
  }
};

const ImagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Images);

export default ImagesContainer;
