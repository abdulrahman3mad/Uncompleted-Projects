

//DOM elements
let text_area = document.querySelector("textarea");
let view_port = document.querySelector(".viewport");


let space_regex = /\w{1,}\s+\w{1,}/g;
let regex_header = /#+[a-zA-Z0-9]{1,}/;
let regex_bold = /(\*{2})[a-zA-Z0-9]{1,}(\*{2})/;
let regex_italics = /(\*{1})[a-zA-Z0-9]{1,}(\*{1})/;
let regex_unordered_list = /\*{1}\s[a-zA-Z0-9]{1,}/;
let regex_ordered_list = /^[1-9]{1}\.\s[a-zA-Z0-9]{1,}$/g;
let regex_link = /^\[{1}[a-zA-z0-9]{1,}\]{1}\s{0,}\({1}[a-zA-Z0-9\.\/+\:+]{1,}\){1}$/g;
let regex_actual_link = /\({1}[a-zA-Z0-9\.\/\:]{1,}\){1}/;
let regex_displayed_text = /\[{1}[a-zA-Z0-9\.\/+\:+]{1,}\]{1}/g;

function createElementWithRegex(DOMElementType, textarea_value) {
	let element = document.createElement(DOMElementType);
	element.textContent = textarea_value.replace(/#+|\*+/g, "")
	view_port.appendChild(element);
}

function createList(textarea_value, list_type) {
	let list = document.createElement(list_type);
	let list_element = document.createElement("li");
	if (list_type == "ol") {
		list_element.textContent = textarea_value.replace(/#+|\*+|[1-9]\./g, "")
	} else {
		list_element.textContent = textarea_value.replace(/#+|\*+/g, "")
	}
	list.appendChild(list_element);
	view_port.appendChild(list);
}

view_port.addEventListener("click", () => {

	let content = text_area.value;

	if (regex_header.test(content.replace(space_regex, ""))) {
		for (let i = 1; i <= 6; i++) {
			const regex_headers = new RegExp(`#{${i}}[a-zA-Z0-9]{1,}`);
			if (regex_headers.test(content.replace(space_regex, ""))) {
				createElementWithRegex(`h${i}`, content.match(/#+[a-zA-Z0-9]{1,}/)[0]);
				content.replace(/#{2}[a-zA-Z0-9]{1,}/, "")
			}
		}
	}

	console.log(content + "-".repeat(10));
	if (regex_bold.test(content.replace(space_regex, ""))) {
		createElementWithRegex("strong", content.match(regex_bold)[0]);
		content = content.replace(regex_bold, "");
		console.log(content);
	} if (regex_italics.test(content.replace(space_regex, ""))) {
		createElementWithRegex("em", content.match(regex_italics)[0]);
		content = content.replace(regex_italics, "");

	} if (regex_unordered_list.test(content.replace(space_regex, ""))) {
		createList(content, "ul");
		content = content.replace(regex_unordered_list, "");
	} if (regex_ordered_list.test(content.replace(space_regex, ""))) {
		createList(content, "ol");
	} if (regex_link.test(text_area.value.replace(space_regex, ""))) {
		let link = document.createElement("a");
		view_port.appendChild(link);
		let link_href = text_area.value.match(regex_actual_link);
		link_href = link_href[0].replace(/\(|\)/g, "");
		link.href = link_href;
		let link_content = text_area.value.match(regex_displayed_text);
		link.textContent = link_content[0].replace(/\[|\]/g, "");
	}

})
