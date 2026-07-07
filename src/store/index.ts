import { createAsyncStorage } from '@react-native-async-storage/async-storage';
const storage = createAsyncStorage('session-db');

export default storage;
