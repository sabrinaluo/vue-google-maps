/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

const Q = require("q");

var setUp = false;
const loadingDefered = Q.defer();

export const loaded = loadingDefered.promise;

window['vueGoogleMapsInit'] = () => {
  loadingDefered.resolve();
}

export const load = (apiKey, version) => {
  if (!setUp) {
    const googleMapScript = document.createElement('SCRIPT');
    let url = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=vueGoogleMapsInit';
    if (version) {
      url = url + '&v=' + version;
    }
    googleMapScript.setAttribute('src', url);
    googleMapScript.setAttribute('async', '');
    googleMapScript.setAttribute('defer', '');
    document.body.appendChild(googleMapScript);
  } else {
    throw new Error('You already started the loading of google maps');
  }
}

