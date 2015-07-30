/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
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