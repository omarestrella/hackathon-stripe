import Service from '@ember/service';

const { localStorage } = window;

export default Service.extend({
  token: null,

  init() {
    this._super(...arguments);

    const token = localStorage.getItem('stripe_token');
    if (token) {
      this.set('token', token);
    }
  },

  saveToken(token) {
    this.set('token', token);
    localStorage.setItem('stripe_token', token);
  }
});
