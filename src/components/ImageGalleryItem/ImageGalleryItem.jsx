import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL, openModal }) {
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

