import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../assets/constants';

const API_GET_SMALLCASE_URL: string = BASE_URL + '/smallcases/smallcase';

export default class Store {

    @observable smallcases = [];

    get smallcases() {
        return this.smallcases;
    }

    set smallcases(result: Array<Object>) {
        this.smallcases = result;
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

            console.log(sc.data.scid)

            if (!sc.success)
                return;

            if (this.smallcases.length === 0) this.smallcases = sc.data;
            else this.smallcases = this.smallcases.concat(sc.data);

        } catch (e) {
            console.warn(e.message);
        }

        return this.posts;
    }

}