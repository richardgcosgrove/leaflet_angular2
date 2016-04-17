import {Http, Headers, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class StateService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getStates() {
        return this.http
            .get('./states.json')
            .map(res => res.json())
            .map(result => {
                console.log(result);
                return result['features'];
            });
    }
}
