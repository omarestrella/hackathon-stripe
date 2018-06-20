import Controller from '@ember/controller';
import { set, computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  application: inject(),

  orders: null,

  actions: {
    updateOrder(order, detail, event) {
      if (event.target.value === 'change-amount') {
        const amount = window.prompt('What is the new amount for this order?');
        const numAmount = Number(amount);
        set(detail, 'amount', numAmount);
        set(detail, 'price', detail.price * 4);
      }
    }
  },

  streetAddress: computed('application.person', function () {
    if (this.get('application.person.attributes')['context.addressStreet']) {
      return this.get('application.person.attributes')['context.addressStreet'];
    }

    return '3948 East Bay St.';
  }),

  cityState: computed('application.person', function () {
    let city, state, zip;
    if (!this.get('application.person.attributes')) {
      city = 'Charleston';
      state = 'SC';
      zip = '29492'
    } else {
      city = this.get('application.person.attributes')['context.addressCity'];
      state = this.get('application.person.attributes')['context.addressState'];
      zip = this.get('application.person.attributes')['context.addressPostalCode'];
    }

    return `${city}, ${state} ${zip}`;
  }),

  init() {
    this._super(...arguments);

    this.set('orders', [{
      number: '#00232-dfd',
      orderDate: '20 Jun 2018',
      shipmentDate: '23 Jun 2018',
      status: 'Not Packed',
      statusClass: 'error',

      details: [{
        name: 'Fair Trade Coffee',
        amount: 1,
        price: 15.99
      }]
    }, {
      number: '#00132-df3d',
      orderDate: '20 Jun 2017',
      shipmentDate: '21 Jun 2017',
      status: 'Delivered',
      statusClass: 'success',

      details: [{
        name: 'Fair Trade Coffee',
        amount: 3,
        price: 39.99
      }]
    }]);
  }
});
