import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchdar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchCardURL } from 'services/api';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';

export function App() {
  const [keyword, setKeyword] = useState('');
  const [dataHit, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!keyword) {
      return;
    }

    const fetchData = async () => {
      setStatus('pending');
      try {
        const data = await fetchCardURL(keyword, page);

        if (data.hits.length === 0) {
          return setStatus('rejected');
        }

        setData(prevState => [...prevState, ...data.hits]);
        setStatus('resolved');
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.log('error', error.message);
        setError(true);
      }
    };
    fetchData();
  }, [keyword, page]);

  const addName = value => {
    if (keyword === value) {
      return alert(`Sorry! You are already watching ${value}`);
    }
    closeModal();
    setKeyword(value);
    setPage(1);
    setData([]);
    setError(false);
  };

  const addImages = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  return (
    <div className={css.App}>
      <Searchdar onSubmit={addName} />
      {status === 'idle' && (
        <div className={css.idle}>Please! Enter a keyword</div>
      )}
      {status === 'pending' && <Loader />}
      {error && (
        <p className={css.rejected}>
          Sorry! Something went wrong, please reload the page.
        </p>
      )}
      {status === 'rejected' && (
        <h1 className={css.rejected}>
          Sorry, there are no images matching your search query. Please try
          again.
        </h1>
      )}
      <ImageGallery data={dataHit} openModal={openModal} />
      {totalPages !== page && dataHit.length > 0 && (
        <Button onAddImages={addImages} />
      )}
      {isOpenModal && <Modal modalData={modalData} closeModal={closeModal} />}
      <ToastContainer avtoClose={3000} />
    </div>
  );
}
