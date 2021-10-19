import PropTypes from 'prop-types';
import с from './Container.module.css';

export default function Container({ children }) {
  return <div className={с.container}>{children}</div>;
}
Container.propTypes = {
  children: PropTypes.array.isRequired,
};
