import React, { FC } from 'react';
import { ItemDto } from '#server/common/dto/item.dto';
import { srcFromPhotoPath } from '#src/js/util/src-from-photo-path';

interface Props {
  item: ItemDto;
  width?: `small` | `medium` | `large` | `xlarge` | `1-1`;
  padding?: boolean;
}

export const PhotosSlideshow: FC<Props> = ({ item, width = `xlarge`, padding = true }) => {
  if (!(item?.photos && item.photos.length !== 0)) {
    return null;
  }

  return (
    <div className={`ItemPhotos ${(padding) ? `ItemPhotos--padding@m` : ``} uk-width-${width} uk-position-relative uk-margin-bottom`} uk-slideshow={``}>
      <ul className={`uk-slideshow-items`}>
        {item.photos?.map(({ photoPath }) => (
          <li key={photoPath}><img src={srcFromPhotoPath(photoPath)} alt={``} uk-cover={``} /></li>
        ))}
      </ul>
      <button
        className={`uk-position-center-left uk-position-small uk-hidden-hover uk-link`}
        uk-slidenav-previous={``}
        uk-slideshow-item={`previous`}
      />
      <button
        className={`uk-position-center-right uk-position-small uk-hidden-hover uk-link`}
        uk-slidenav-next={``}
        uk-slideshow-item={`next`}
      />
    </div>
  );
};