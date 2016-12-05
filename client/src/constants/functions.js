export function clearSelection() {
  if ( document.selection ) {
    document.selection.empty();
  } else if ( window.getSelection ) {
    window.getSelection().removeAllRanges();
  }
}

export function formatPhone(phone) {
	if (typeof phone !== 'string')
		throw new Error(`Phone must be of type 'string'. Instead found type '${typeof phone}'`);

	if (phone[0] === '1')
		phone = phone.substr(1);

	if (phone.length <= 3)
		return phone;

	else if (phone.length <= 6)
		return `(${phone.substr(0, 3)}) ${phone.substr(3)}`;

	else if (phone.length <= 10)
		return `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6)}`;

	else if (phone.length === 10)
		return `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6)}`;

	else
		return `(${phone.substr(0, 3)}) ${phone.substr(3, 3)}-${phone.substr(6, 4)} ext ${phone.substr(10)}`;
}