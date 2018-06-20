import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import RSVP from 'rsvp';
import { A } from '@ember/array';

function parseAuthParams(hash) {
  return hash.substr(1).split('&')
    .map(str => str.split('='))
    .reduce((acc, [key, value]) => Object.assign(acc, { [key]: value }), {})
}

export default Route.extend({
  ajax: inject(),
  application: inject(),

  // This is bad...never do this...
  _performAuth() {
    const deferred = RSVP.defer();
    const application = this.get('application');
    const clientId = '80f93c8f-66de-403b-af09-87087497523b';
    const url = `
https://login.inindca.com/oauth/authorize?client_id=${clientId}
&response_type=token
&redirect_uri=${window.location.origin}/
    `
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.src = url;
    iframe.height = 0;
    iframe.width = 0;
    iframe.frameBorder = 0;

    window.setToken = function (hash) {
      const authData = parseAuthParams(hash);
      application.set('accessToken', authData.access_token);

      window.setToken = null;
      iframe.remove();
      deferred.resolve();
    }

    return deferred.promise;
  },

  beforeModel() {
    const href = window.location.href;

    const matches = href.match(/conversationId=([\w-]+)/);
    if (matches && matches[1]) {
      this.set('application.conversationId', matches[1]);
    }

    if (href.indexOf('access_token') === -1) {
      return this._performAuth();
    } else {
      if (window.parent.setToken) {
        window.parent.setToken(window.location.hash);
      }
    }
  },

  model() {
    return this.get('ajax')
      .request(`https://api.inindca.com/api/v2/conversations/${this.get('application.conversationId')}`)
      .then(conversation => {
        if (conversation && conversation.participants) {
          const person = A(conversation.participants).findBy('purpose', 'customer');
          this.set('application.person', person);
        }
      })
      .catch(() => RSVP.resolve());
  }
})
