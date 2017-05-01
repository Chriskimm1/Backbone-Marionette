import Backbone from 'backbone';
import data from './mockData';

import ProductDetails from 'app/productDetails/productView';
import ProductCollection from 'app/productDetails/productCollection';
import UserAddressPage from 'app/userAddressPage/userAddressPageView';

export default Backbone.Router.extend({
  routes: {
    '': 'productDetails',
    'address' : 'userAddressPage'
  },

  productDetails() {
    const productCollection = new ProductCollection(data);
    const productDetails = new ProductDetails({
      collection: productCollection,
    }).render();
  },

  userAddressPage(data) {
    debugger;
    const userAddressPageView = new UserAddressPage().render();
  }
});
