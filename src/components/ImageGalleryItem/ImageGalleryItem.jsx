import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL, openModal } = this.props;
    return (
      <>
        <li
          onClick={() => openModal({ largeImageURL, tags })}
          className={css.ImageGalleryItem}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>
      </>
    );
  }
}
