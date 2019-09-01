window.onload = () => {
	const emailSubmitButton = document.getElementById('bottle');
	const emailInputField = document.getElementById('emailInput');
	const errorMsgHolder = document.getElementById('errorMsgHolder');
	const errorMsgText = document.getElementById('errorMsgText');
	const errorClose = document.getElementById('closeErrorMsg');
	const successMsgHolder = document.getElementById('successMsgHolder');
	const successMsgText = document.getElementById('successMsgText');
	const successClose = document.getElementById('closeSuccessMsg');

	emailSubmitButton.addEventListener('click', (e) => {
	  submitEmail();
	});

	emailInputField.addEventListener('keypress', (e) => {
		if (errorMsgHolder.style.opacity == '1' || successMsgHolder.style.opacity == '1') {
			errorMsgHolder.style.opacity = '0';
			errorMsgHolder.style.visibility = 'hidden';
		}
		if (errorMsgHolder.style.opacity == '1' || successMsgHolder.style.opacity == '1') {
			successMsgHolder.style.opacity = '0';
			successMsgHolder.style.visibility = 'hidden';
		}
		var key = e.which || e.keyCode;
	    if (key === 13) { // 13 is enter
	      submitEmail();
	    }
	});

	successClose.addEventListener('click', (e) => {
		successMsgHolder.style.opacity = '0';
		successMsgHolder.style.visibility = 'hidden';
	});

	errorClose.addEventListener('click', (e) => {
		errorMsgHolder.style.opacity = '0';
		errorMsgHolder.style.visibility = 'hidden';
	})

	function submitEmail() {
		let emailText = emailInputField.value;
		fetch('/email', {
			method: 'POST',
			body: JSON.stringify({email: emailText}),
			headers:{
		    	'Content-Type': 'application/json'
		  	}
		}).then((res) => res.json())
		.then((response) => {
			if (response.success == false) {
				printErrorMessage(response.message);
			}
			else {
				printSuccessMessage(response.message);
			}
		})
	}

	function printErrorMessage(errorMsg) {
		errorMsgText.innerHTML = errorMsg.content;
		errorMsgHolder.style.opacity = '1';
		errorMsgHolder.style.visibility = 'visible';
	}

	function printSuccessMessage(successMsg) {
		successMsgText.innerHTML = successMsg.content;
		successMsgHolder.style.opacity = '1';
		successMsgHolder.style.visibility = 'visible';
	}
}
