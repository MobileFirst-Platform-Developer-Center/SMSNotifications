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

window.$ = window.jQuery = WLJQ;

function wlCommonInit(){
	WL.Client.connect({onSuccess: connectSuccess, onFailure: connectFailure});
	$('#isSMSSupportedButton').click(isSMSSupportedButtonClicked);
	$('#isSMSSubscribedButton').click(isSMSSubscribedButton);
	$('#SubscribeSMSButton').click(subscribeSMSButtonClicked);
	$('#UnsubscribeSMSButton').click(unsubscribeSMSButtonClicked);
}

function connectSuccess() {
	WL.Logger.debug ("Successfully connected to MobileFirst Server.");
}

function connectFailure() {
	WL.Logger.debug ("Failed connecting to MobileFirst Server.");
	WL.SimpleDialog.show("SMS Notifications", "Failed connecting to MobileFirst Server. Try again later.", 
			[{
				text : 'Reload',
				handler : WL.Client.reloadapp
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);
}

function isSMSSupportedButtonClicked(){
	var isSMSSupported = false;
	if (typeof(WL.Client.Push) != 'undefined') isSMSSupported = WL.Client.Push.isPushSMSSupported();
	alert("isSMSSupported = " + isSMSSupported);
}

function isSMSSubscribedButton(){
	var isSMSSubscribed = false;
	if (typeof(WL.Client.Push) != 'undefined') isSMSSubscribed = WL.Client.Push.isSMSSubscribed('myPushSMS');
	alert("isSMSSubscribed = " + isSMSSubscribed);
}


function subscribeSMSButtonClicked() {
	if (typeof(WL.Client.Push) == 'undefined'){
		alert("SMS notifications are not supported on current platform");
		return;
	}
		
	var phoneNumber = $('#PhoneNumber').val();
	var isNumberValid = validatePhoneNumber(phoneNumber); 
	
	if (!isNumberValid){
		alert("Phone number invalid");
		return;
	}

	WL.Client.Push.subscribeSMS("myPushSMS", "SMSAdapter", "SMSEventSource", phoneNumber, {
		onSuccess: onSubscribeSMSSuccess,
		onFailure: onSubscribeSMSFailure
	});
}

function onSubscribeSMSSuccess(response) {
	alert("Succesfully Subscribed to SMS");
}

function onSubscribeSMSFailure(response) {
	alert("Failed to Subscribe to SMS");
}


function unsubscribeSMSButtonClicked(){
	if (typeof(WL.Client.Push) == 'undefined'){
		alert("SMS notifications are not supported on current platform");
		return;
	}

	WL.Client.Push.unsubscribeSMS("myPushSMS", {
		onSuccess: onUnsubscribeSMSSuccess,
		onFailure: onUnsubscribeSMSFailure
	});
}

function onUnsubscribeSMSSuccess(response) {
	alert("Succesfully Unsubscribed to SMS");
}

function onUnsubscribeSMSFailure(response) {
	alert("Failed to Subscribe to SMS");
}


function validatePhoneNumber(phoneNo){
	if(!phoneNo || !phoneNo.length){
		return false;
	}
	
	for (var i=0; i<phoneNo.length; i++){
		var char = phoneNo[i];
		if (char === " " || char === "-" || char === "+" || char === '\n' || !isNaN(parseInt(char))){
			continue;
		} else {
			return false;
		}
	}
	return true;
}

/******************* Callbacks ******************/