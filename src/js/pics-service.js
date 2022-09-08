import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pixabay.com/api',
});

export default class PicsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getPics() {
    const PIXABAY_KEY = '29768412-8eb757bc43ab5434ca5a1f8dd';
    return api
      .get(
        `/?key=${PIXABAY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      )
      .then(response => {
        this.incrementPage();
        return response.data;
        //console.log(response);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
