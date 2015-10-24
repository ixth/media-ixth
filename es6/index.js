import Playlist from './Models/Playlist';
import VKAPI from './Models/vk-api';

var api = new VKAPI();

api.init().then(() => {
    alert(111);
});
