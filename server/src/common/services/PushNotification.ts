import Constants = require("./../../config/constants/constants");
const FCM        = require('fcm-node');

class PushNotification {

    public static send(to: string, message, callback) {
        const FCMProvider = new FCM(Constants.FCM_SERVER_KEY);
        let messageData = {
            to: to,
            data: {
                message: message.text
            },
            notification: {
                title: message.title,
                body: message.text,
                sound: 'default'
            }
        };
        return FCMProvider.send(messageData, callback);
    }
}

export = PushNotification;