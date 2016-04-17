/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component, OnInit} from 'angular2/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import { StateService } from '../../services/state.service';
import { LeafletMouseEvent } from 'leaflet';

@Component({
    selector: 'app',
    template: require<any>('./app.component.html'),
    styles: [
        require<any>('./app.component.less')
    ],
    directives: [NavigatorComponent]
})
export class AppComponent implements OnInit  {
    private mapService: MapService;
    private geocoder: GeocodingService;
    private stateService: StateService;

    constructor(mapService: MapService, geocoder: GeocodingService, stateService: StateService) {
        this.mapService = mapService;
        this.geocoder = geocoder;
        this.stateService = stateService;
    }

    ngOnInit() {
        var map = new L.Map('map', {
            zoomControl: false,
            center: new L.LatLng(37.09024, -95.712891),
            zoom: 6,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });
        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);
        this.stateService.getStates().subscribe(result => {
            var state_boundary = L.geoJson(result, {
                onEachFeature: this.onEachFeature,
                style: this.stateStyle,
            }).addTo(map);
        });
        this.mapService.map = map;

        this.geocoder.getCurrentLocation()
            .subscribe(
            location => map.panTo([location.latitude, location.longitude]),
            err => console.error(err)
            );
    }

    stateStyle (state) {
        return {
            fillColor: 'green',
        }
    }

    onEachFeature(feature, layer) {
        layer.bindPopup('<div class="fa fa-globe">' + '</div>' + '<div>' + feature.properties.NAME + ' </div>' + '<div>area: ' + feature.properties.CENSUSAREA + ' </div > ');
    }
}
