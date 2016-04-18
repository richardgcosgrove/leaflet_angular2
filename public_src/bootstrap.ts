import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MapService} from './services/map.service';
import {GeocodingService} from './services/geocoding.service';
import {StateService } from './services/state.service';
setTimeout(bootstrap(AppComponent, [HTTP_PROVIDERS, MapService, GeocodingService, StateService])
    .catch(err => console.error(err)), 8000);

