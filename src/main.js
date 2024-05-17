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
let limit = 15
let currentSearchQuery = ''; 


function showLoadMoreButton() {
  fetchPhotosButton.classList.remove('is-hidden-btn');
}

function hideLoadMoreButton() {
  fetchPhotosButton.classList.add('is-hidden-btn');
}

async function fetchAndDisplayPhotos(searchQuery, pageNumber) {
  loaderEl.classList.remove('is-hidden');
  try {
    const imagesData = await fetchPhotos(searchQuery, pageNumber);
    if (imagesData.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreButton();
      fetchPhotosButton.removeEventListener('click', onLoadMore);
    } else {
      imgContainer.innerHTML += createMarkup(imagesData.hits);
   
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
      lightbox.refresh();
 
const totalLoadedImages = pageNumber * limit;
      if (totalLoadedImages >= imagesData.totalHits) {
        hideLoadMoreButton();
        fetchPhotosButton.removeEventListener('click', onLoadMore);
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

async function onLoadMore() {
  page++;
  await fetchAndDisplayPhotos(currentSearchQuery, page);
  scrollPage();
}

fetchPhotosButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchKeyword.value.trim();
  imgContainer.innerHTML = '';
  if (searchQuery === '') {
    hideLoadMoreButton();
    fetchPhotosButton.removeEventListener('click', onLoadMore);
    return iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });

  }
  currentSearchQuery = searchQuery; 
  loaderEl.classList.remove('is-hidden');

  try {
    page = 1; 
    await fetchAndDisplayPhotos(searchQuery, page);
   
  } catch (error) {
    console.log(error);
  } finally {
    event.target.reset();
    loaderEl.classList.add('is-hidden');
  }
}

searchForm.addEventListener('submit', onSearch);


function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.photo-container')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
