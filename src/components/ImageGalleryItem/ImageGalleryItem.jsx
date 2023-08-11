import React from 'react';
import { Item, Image, ListItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ImageGalleryItem = ({item}) => {


    const [isModalOpen, setIsModalOpen] = useState(false)
    const { largeImageURL, tags, webformatURL } = item;

    const showModal = () =>{
        setIsModalOpen(true)
    }

    const closeModal = () =>{
        setIsModalOpen(false)
    }

  return (
      <>
        <ListItem>
          <Item>
            <Image
              src={webformatURL}
              alt={tags}
              loading="lazy"
              onClick={showModal}
            />
          </Item>
        </ListItem>
        {isModalOpen && (
          <Modal url={largeImageURL} tag={tags} onClose={closeModal} />
        )}
      </>
    );
}

export default ImageGalleryItem

ImageGalleryItem.propTypes = {
    item: PropTypes.shape({
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired,
  };