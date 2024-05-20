import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup } from './js/render-functions';
import fetchPhotos from './js/pixabay-api';

const imgContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
const fetchPhotosButton = document.querySelector('.photo-btn');

let page = 1;
const limit = 15;
let currentSearchQuery = '';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
fetchPhotosButton.addEventListener('click', onLoadMore);

function showLoadMoreButton() {
  fetchPhotosButton.classList.remove('is-hidden-btn');
  fetchPhotosButton.disabled = false;
}

function hideLoadMoreButton() {
  fetchPhotosButton.classList.add('is-hidden-btn');
  fetchPhotosButton.disabled = true;
}

async function fetchAndDisplayPhotos(searchQuery, pageNumber) {
  loaderEl.classList.remove('is-hidden');
  fetchPhotosButton.disabled = true;  // Disable the button while fetching
  try {
    const imagesData = await fetchPhotos(searchQuery, pageNumber);
    if (imagesData.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreButton();
    } else {
      imgContainer.insertAdjacentHTML('beforeend', createMarkup(imagesData.hits));
      lightbox.refresh();

      const totalLoadedImages = pageNumber * limit;
      if (totalLoadedImages >= imagesData.totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    console.error('Error fetching photos:', error);
  } finally {
    loaderEl.classList.add('is-hidden');
    fetchPhotosButton.disabled = false;  // Re-enable the button after fetching
  }
}

async function onLoadMore() {
  if (fetchPhotosButton.disabled) return; // Prevent multiple clicks
  page++;
  await fetchAndDisplayPhotos(currentSearchQuery, page);
  scrollPage();
}

async function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchKeyword.value.trim();
  imgContainer.innerHTML = '';
  if (searchQuery === '') {
    hideLoadMoreButton();
    return iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
  }
  currentSearchQuery = searchQuery;
  loaderEl.classList.remove('is-hidden');

  try {
    page = 1;
    await fetchAndDisplayPhotos(searchQuery, page);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    event.target.reset();
    loaderEl.classList.add('is-hidden');
  }
}

function scrollPage() {
  const { height: cardHeight } = document.querySelector('.photo-container').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}









