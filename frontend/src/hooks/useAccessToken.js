import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/slices/authSlice';

const useAccessToken = () => {
  return useSelector(selectAccessToken);
}

export default useAccessToken;
