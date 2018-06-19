import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('account', function () {
    this.route('detail', { path: ':id' }, function () {

    });

    this.route('subscription', { path: 'subscription/:subscription_id' })
  })
});

export default Router;
