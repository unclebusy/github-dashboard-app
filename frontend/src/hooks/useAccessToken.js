import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/slices/authSlice';

const useAccessToken = () => useSelector(selectAccessToken);

export default useAccessToken;
