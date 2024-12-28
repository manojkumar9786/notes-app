import { Provider } from 'react-redux';
import { store } from '../store/store';
import '../styles/globals.css';
import Layout from '@/components/Layout';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
