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