/*
*
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

*/

WL.Server.createEventSource({
	name: 'SMSEventSource',
	onDeviceSubscribe: 'onDeviceSubscribeCallback',
	onDeviceUnsubscribe: 'onDeviceUnsubscribeCallback',
	securityTest:'SMSRealm-mobile-securityTest'
});

function onDeviceSubscribeCallback(userSubscription, deviceSubscription){
	WL.Logger.debug(">> onDeviceSubscribeCallback");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function onDeviceUnsubscribeCallback(userSubscription, deviceSubscription){
	WL.Logger.debug(">> onDeviceUnsubscribeCallback");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}


function sendSMS(userId, smsText){
	var userSubscription = WL.Server.getUserNotificationSubscription('SMSAdapter.SMSEventSource', userId);
	
	if (userSubscription==null){
		return { result: "No subscription found for user :: " + userId };
	}
	
	var badgeDigit = 1;
	
	var notification = WL.Server.createDefaultNotification(smsText, badgeDigit, {});
	
	WL.Logger.debug("sendSMS >> userId :: " + userId + ", text :: " + smsText);
	
	WL.Server.notifyAllDevices(userSubscription, notification);
	
	return { 
		result: "Notification sent to user :: " + userId 
	};
}