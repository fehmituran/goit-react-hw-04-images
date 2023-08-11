import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import pixabayApi from '../services/api';
import { useEffect } from 'react';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Notification from './Notification/Notification';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPage, setTotalPage] = useState(0);

  const onSubmit = searchValue => {
    setSearchQuery(searchValue);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    const fetcImages = async () => {
      if (!searchQuery) return;

      setIsLoading(true);

      try {
        const response = await pixabayApi(searchQuery, page);

        const { hits, totalHits } = response.data;

        if (totalHits === 0) {
          return Notiflix.Notify.warning(
            `it couldn't find  ${searchQuery} images for you,`
          );
        }

        setImages(prevState => [...prevState, ...hits]);
        setTotalPage(totalHits / 12);
      } catch (error) {
        setError('Something wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetcImages();
  }, [searchQuery, page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader isLoading={isLoading} />}
      <ImageGallery images={images} />
      {totalPage > page && searchQuery && <Button loadMore={onLoadMore} />}
      {error && <Notification message={error} />}
    </div>
  );
};
