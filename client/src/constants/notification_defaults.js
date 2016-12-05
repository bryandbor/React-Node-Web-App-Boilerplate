const status = 'default', // default, info, success, warning, error
	position = 'bl', // t, tc, tl, tr, b, bc, br, bl
	dismissible = true,
	dismissAfter = 5000,
	closeButton = false,
	allowHTML = false;

const notifDefaults = {
	status,
	position,
	dismissible,
	dismissAfter,
	closeButton,
	allowHTML
};

export default notifDefaults;