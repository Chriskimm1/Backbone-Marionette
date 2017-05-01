import Backbone from 'backbone';
import ProductModel from './productModel';
import _ from 'lodash';

const SIZES_MAP = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
]

export default Backbone.Collection.extend({
  model: ProductModel,

  setSelected: function(selectedId) {
    this.each((product)=>{
      product.set('selected', product.get('id') === parseInt(selectedId));
    });
    return;
  },

  getAvailableColors: function() {
    return this.map((product)=>{
      return {
        color: product.get('color'),
        id: product.get('id'),
        selected: product.get('selected'),
      }
    });
  },

  getAvailableSizes: function(product) {
    return _.map(SIZES_MAP, (size)=> {
      return {
        size,
        isNotAvailable: product.get('sizes').indexOf(size) === -1,
        isOnSale: product.get('sizesOnSale').indexOf(size) > -1,
      };
    });
  },

  getSelected: function() {
    return this.filter(this._isSelected);
  },

  _isSelected: function(product) {
    return product.isSelected();
  }
});
