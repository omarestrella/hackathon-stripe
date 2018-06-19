import Component from "@ember/component";
import { computed } from "@ember/object";
import { dasherize } from "@ember/string";

export default Component.extend({
  card: null,

  icon: computed('card.brand', function () {
    const brand = dasherize(this.get('card.brand')).toLowerCase()
    return `/images/cards/${brand}.png`;
  })
});
