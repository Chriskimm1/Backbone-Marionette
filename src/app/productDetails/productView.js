import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

import template from './productView.hbs';

export default Marionette.View.extend({
  el: '#root',

  template,

  ui: {
    selectColor: '.product-details__color-box',
    selectSize: '.sizes-dropdown li',
    selectQty: '.qty-dropdown li',
    nextPage: '.saveBtn'
  },

  events: {
    'click @ui.selectColor': 'onSelectColor',
    'click @ui.selectSize': 'onSelectSize',
    'click @ui.selectQty': 'onSelectQty',
    'click @ui.nextPage': 'nextPage'
  },

  collectionEvents: {
    all: 'render'
  },

  nextPage : function(){
    Backbone.history.navigate('address', true);
  },

  onSelectColor: function(event) {
    this.collection.setSelected(this.$(event.target).attr('data-id'));
  },

  onSelectSize: function(event) {
    this.selectedSize = this.$(event.target).closest('li').attr('data-size');
    this.render();
  },

  onSelectQty: function(event) {
    this.selectedQty = this.$(event.target).closest('li').attr('data-qty');
    this.render();
  },

  getSalePrice: function(selectedProduct) {
    if ( this.selectedSize && selectedProduct.get('sizesOnSale').indexOf(this.selectedSize) > -1 ) {
      return parseInt(selectedProduct.get('price')) * ((100 - selectedProduct.get('salePercent'))/100);
    }
    return false;
  },

  serializeData: function() {
    const selectedProduct = this.collection.getSelected()[0];

    if (!selectedProduct) {
      return false;
    }

    const availableColors = this.collection.getAvailableColors();
    const availableSizes = this.collection.getAvailableSizes(selectedProduct);

    return {
      selectedProduct: selectedProduct.toJSON(),
      availableColors,
      availableSizes,
      selectedSize: this.selectedSize,
      selectedQty: this.selectedQty,
      salePrice: this.getSalePrice(selectedProduct),
    };
  },
});
