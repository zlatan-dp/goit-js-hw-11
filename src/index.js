import PicsApiService from './js/pics-service';
import { Notify } from 'notiflix';

const picApiService = new PicsApiService();

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  try {
    evt.preventDefault();

    picApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

    if (picApiService.query === '') {
      return Notify.warning('Еnter a currect query');
    }
    refs.loadMoreBtn.classList.add('is-hidden');
    picApiService.resetPage();

    const pics = await picApiService.getPics();
    if (pics.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    clearPicsGallery();
    renderPics(pics);
    refs.loadMoreBtn.classList.remove('is-hidden');
    Notify.success(`Hooray! We found ${pics.totalHits} totalHits images.`);
  } catch (error) {
    console.error(error);
  }
}

/* function onSearch(evt) {
  evt.preventDefault();

  picApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (picApiService.query === '') {
    return Notify.warning('Еnter a currect query');
  }
  refs.loadMoreBtn.classList.add('is-hidden');
  picApiService.resetPage();
  picApiService.getPics().then(pics => {
    console.log(pics);
    if (pics.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    clearPicsGallery();
    renderPics(pics);
    refs.loadMoreBtn.classList.remove('is-hidden');
    Notify.success(`Hooray! We found ${pics.totalHits} totalHits images.`);
  });
} */

async function onLoadMore() {
  try {
    const pics = await picApiService.getPics();
    if (pics.hits.length === 0) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderPics(pics);
  } catch (error) {
    console.error(error);
  }
}

/* function onLoadMore() {
  picApiService.getPics().then(pics => {
    if (pics.hits.length === 0) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderPics(pics);
  });
} */

function renderPics(pics) {
  const markup = pics.hits
    .map(pic => {
      return `<div class="photo-card">
  <img src="${pic.webformatURL}" alt="${pic.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> </br>${pic.likes}
    </p>
    <p class="info-item">
      <b>Views</b> </br>${pic.views}
    </p>
    <p class="info-item">
      <b>Comments</b> </br>${pic.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> </br>${pic.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearPicsGallery() {
  refs.galleryContainer.innerHTML = '';
}
