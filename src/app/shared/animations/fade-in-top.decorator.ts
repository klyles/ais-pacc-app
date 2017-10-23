/**
 * Created by griga on 12/26/16.
 */

import { fadeInTop } from './router.animations';

export function FadeInTop() {
  const __ref__ = window['Reflect']

  function parseMeta(metaInformation) {
    for (let _i = 0,
      metaInformation_1 = metaInformation;
      _i < metaInformation_1.length; _i++) {

      const metadata = metaInformation_1[_i]; // metadata is @Component metadata


      // metadata.animations = [fadeInTop()];
      // metadata.host = {"[@fadeInTop]": ''};
      // your logic here
      // mine was metadata.styles = [builtStyles]
    }
  }

  // value represents the annotation parameter(s)
  return function (target) {
    const metaInformation = __ref__.getOwnMetadata('annotations', target);
    if (metaInformation) {
      parseMeta(metaInformation);
    }
  }
}
