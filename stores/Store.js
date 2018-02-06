import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../assets/constants';

const API_GET_SMALLCASE_URL: string = BASE_URL + '/smallcases/smallcase';
const API_GET_HISTORICAL_URL: string = BASE_URL + '/smallcases/historical';
export default class Store {

    @observable smallcase = {};

    get smallcase() {
        return this.smallcase;
    }

    set smallcase(smallcase) {
        this.smallcase = smallcase;
    }

    async loadSmallcase(scid) {
        const requestURL = `${API_GET_SMALLCASE_URL}?scid=${scid}`;

        try {
            let response = await fetch(requestURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const sc = await response.json();

            if (!sc.success)
                return;

            this.smallcase = sc.data;
            AsyncStorage.setItem(scid, JSON.stringify(this.smallcase));
        } catch (e) {
            console.warn(e.message);
        }

        return this.smallcase;
    }

    async loadHistorical(scid) {
        const requestURL = `${API_GET_HISTORICAL_URL}?scid=${scid}`;
        this.smallcase.historical = {};

        try {
            let response = await fetch(requestURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            const sc = await response.json();

            if (!sc.success)
                return;

            this.smallcase.historical = sc.data;
            AsyncStorage.setItem(scid, JSON.stringify(this.smallcase));
        } catch (e) {
            console.warn(e.message);
        }

        return this.smallcase.historical;
    }

}