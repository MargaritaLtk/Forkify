import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next');
    }
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev');
    }
    if (curPage < numPages) {
      return this._generateMarkupBtn();
    }
    return '';
  }

  _generateMarkupBtn(btnType = '') {
    const buttons = [
      ` <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
        </button>`,

      `<button data-goto="${
        this._data.page + 1
      }"  class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`,
    ];
    if (btnType === 'prev') {
      return buttons[0];
    }
    if (btnType === 'next') {
      return buttons[1];
    }
    return buttons.join('');
  }
}

export default new PaginationView();
