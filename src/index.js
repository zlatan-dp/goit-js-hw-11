import PicsApiService from './js/pics-service';

const picApiService = new PicsApiService();

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
  evt.preventDefault();

  clearPicsGallery();
  picApiService.query = evt.currentTarget.elements.searchQuery.value;
  picApiService.resetPage();
  picApiService.getPics().then(pics => {
    clearPicsGallery();
    renderPics(pics);
  });
}

function onLoadMore() {
  picApiService.getPics().then(renderPics);
}

function renderPics(pics) {
  const markup = pics.hits
    .map(pic => {
      return `<div class="photo-card">
  <img src="${pic.webformatURL}" alt="" loading="lazy" />
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
