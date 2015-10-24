import { Collection } from 'Backbone';
import Track from './Track';
import VKAPI from './vk-api';

class Playlist extends Collection {
    initialize() {
        this.model = Track;
        this._offset = 0;
    }

    load() {
        this.fetch({ add: true });
    }

    sync(method, collection, options) {
        if (method === 'read') {
            VKAPI.getAudio({
                offset: this._offset,
                count: 10
            }).then(
                this._onReadSuccess.bind(this, collection, options),
                this._onReadFailure.bind(this, collection, options)
            );
        }
        collection.trigger('request', collection, null, options);
    }

    _onReadSuccess(collection, options, response) {
        this._offset += response.items.length;
        collection.trigger('sync', collection, response, options);
        if (options.success) {
            options.success(response, null, null);
        }
    }

    _onReadFailure(collection, options, error) {
        collection.trigger('sync', collection, error, options);
        if (options.error) {
            options.error(null, null, error);
        }
    }

    parse(data, xhr) {
        return data.items;
    }
}

export default Playlist;
