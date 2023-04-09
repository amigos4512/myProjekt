import GoodsService from '../../../services/GoodsService';

export const toggleUploadAvatarMenu = (e, mode) => {
  const parentNode = e.target.closest('.userAvatar'),
    uploadsMenu = parentNode.lastChild;

  if (mode === 'show') {
    uploadsMenu.classList.add('userAvatar__menu_active');
  } else {
    uploadsMenu.classList.remove('userAvatar__menu_active');
  }
};

export const updateReviews = async (e, dataForUpdate, funcsForUpdate) => {
  try {
    e.preventDefault();
    await GoodsService.updateReview(
      dataForUpdate.reviewId,
      { review: dataForUpdate.review },
      dataForUpdate.token
    );
    funcsForUpdate.updateUserReviews({
      reviewId: dataForUpdate.reviewId,
      review: dataForUpdate.review,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReviews = async (dataForUpdate, funcsForUpdate) => {
  try {
    await GoodsService.removeReview(
      dataForUpdate.reviewId,
      dataForUpdate.token
    );
    funcsForUpdate.updateUserReviews({
      reviewId: dataForUpdate.reviewId,
      wasDeleted: true,
    });
  } catch (error) {
    console.log(error);
  }
};
