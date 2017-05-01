import Backbone from 'backbone';

export default Backbone.Model.extend({
    defaults: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: ''
    }
});