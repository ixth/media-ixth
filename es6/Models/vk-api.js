import dom from 'dom-create';

class VKAPI {
    init() {
        if (!this._isApiInjected(document)) {
            document.documentElement.appendChild(script);
        }

        return new Promise((resolve, reject) => {
            VK.init(() => {
                this._checkPermissions(VKAPI.P_FRIENDS | VKAPI.P_AUDIO);
            }, reject, '5.37');
        });
    }

    getAudio() {
    }

    _isApiInjected(document) {
        return true;
    }

    _checkPermissions(neededPermissions) {
        VK.api('account.getAppPermissions', {}, function ({ response }) {
            var hasPermissions = (response & neededPermissions) === neededPermissions;
            if (!hasPermissions) {
                VK.callMethod('showSettingsBox', neededPermissions);
            }
        });
    }
}

const permissions = {
    P_FRIENDS: 2,
    P_AUDIO: 8
};

for (let k in permissions) {
    VKAPI[k] = permissions[k];
}

export default VKAPI;
