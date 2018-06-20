import Route from '@ember/routing/route';
import { inject } from '@ember/service';

function parseAuthParams(hash) {
  return hash.substr(1).split('&')
    .map(str => str.split('='))
    .reduce((acc, [key, value]) => Object.assign(acc, { [key]: value }), {})
}

export default Route.extend({
  application: inject(),

  // This is bad...never do this...
  _performAuth() {
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
    }
  },

  beforeModel() {
    if (window.location.href.indexOf('access_token') === -1) {
      this._performAuth();
    } else {
      if (window.parent.setToken) {
        window.parent.setToken(window.location.hash);
      }
    }
  }
})
