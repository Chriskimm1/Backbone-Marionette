import Backbone from 'backbone';

export default Backbone.Model.extend({
    defaults: {
      color : '',
      sizes : [],
      price : 0,
      selected: false,
    },

    isSelected: function() {
      return this.get('selected');
    },
  });
