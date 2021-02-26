

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





let test_text = "#header# **bold** *itatlics*";
console.log(regex_bold.test(test_text));
console.log(regex_header.test(test_text));
console.log(test_text.match(regex_header))
console.log(test_text.match(regex_bold))
console.log(test_text.match(regex_italics))


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










let text = "hello, world";

let regex1 = /hello/
let regex2 = /hello|world/;     //    "|" means "or"
let regex3 = /Hello/i;  //i is the "ignore case flag"
console.log(regex3.test(text));


// extract a string 

let text2 = "hello Hello all people";
let regex = /hello/;
let ourSting = text2.match(regex);
console.log(ourSting[0]);

let regex4 = /hello/ig;   //i for ignore case,  g is the global case
console.log(text2.match(regex4));

// period char 
let regex5 = /.o/  // . is the period char, and it means any char 
let text3 = "lo is my pubby "
console.log(text2.match(regex5));
console.log(text3.match(regex5));


//[] 

let text4 = "hello sello hallo fello in my world";
let regex6 = /h[aeos]/ig;  //[]  it means any char inside this braces
console.log(text4.match(regex6));


// [a-z]  every letter from a to z

//[a-z1-3]  every letter from a to z and every number from 1 to 3

// negated char sets  
//using "caret char  ^" --> works just if it comes inside []

let text5 = "hello everyone 00254 in my world";
let regex7 = /[^0-8aeos]/ig;  // any char and numbers except number from 0-9 and "aeos" letters
console.log(text5.match(regex7))


// at the beginning of the string  ^ --> it checks here if a spcific set of char comes at the beginning

let text12 = "this is my para";
let regex13 = /^this/;  //check of this comes at the beginning of the string
console.log(regex13.test(text12));


// $ matching if a set of char come at the end of a string

let regex14 = /ra$/;
console.log(regex14.test(text12));



let text7 = "thisss i is my text";
let regex8 = /s+/g;  //if s occures more than one side by side, catch them. and the single "s" too 
console.log(text7.match(regex8));




let regex9 = /is*/g; // s occures 0 or more
console.log(text7.match(regex9));


// ? char   --> to change search pattern from greedy to lazy

let mytext = "titanic";
let regex11 = /t[a-z]*?i/;  //zero or more of any letter from a to z     
//? for lazy matching, so it will take letters from a to z untill i letter appears
console.log(mytext.match(regex11));


let text8 = "<h1>this is my header</h1>"
let regex10 = /<.*?>/
console.log(text8.match(regex10))


let text9 = "<h2>hello people> hello everyone </h2>";
let regex12 = /<.*?>/;  // any char until ">" appears with lazy matching
// with greedy matching, it will choose any char untill the slastecond > appear 
console.log(text9.match(regex12))




let crowd = 'P1P2P3P4P5P6CCCP7P8P9';
let reCriminals = /C+/;  //one or more c
console.log(crowd.match(reCriminals));


//short hands
// \w  --> all letters, numbers, and _

let text17 = `this is my a letters 123_ . .
dasdasd

`
	;
let regex15 = /\w/g;
console.log(text17.match(regex15));

// \W  --> any thing but letters, and _
let regex16 = /\W/g;
console.log(text17.match(regex16));


// \d --> any number

let regex17 = /\d/g;
console.log(text17.match(regex17))


// \D --> any non-number

let regex18 = /\D/g;
console.log(text17.match(regex18));


// {} to specifiy the number of the occurrence of the match   [quantity specifier]

let regex19 = /[a]{2,}/g;   // from 2 a to infinity number of a   [ minimum number is 2 and maximum is infinity]
console.log(text17.match(regex19));



// to get the whitespace  [tap, space, newline, form feed]

let regex20 = /\s/g;
console.log(text17.match(regex20));


// to get anything not whitespace

let regex21 = /\S/g;
console.log(text7.match(regex21));



// to set optional letter

let regex22 = /hello?/g;    // it means that o is optional
let text18 = `hello everyone in here in my world`;
console.log(text18.match(regex22));


// to take a letter if a specific letter exists after   [called look ahead] 
let regex23 = /q(?=a)/g;  //positive lookahead
let text19 = `qa qs`;
console.log(text19.match(regex23));

// to take a letter if a specifi letter doesn't exist after
let regex24 = /q(?!a)/g;  //negetive lookahead
console.log(text19.match(regex24));

let regex29 = /(?<=a)b/g;  //positive lookbehind
let regex26 = /(?<!a)b/g;   //negative  lookbehind




// capture group   

let text20 = `hello hello hello hello this is me`
let regex25 = /(\w+)\s\1\s\1/;  //means put the capture group(inside ())  again in here 
console.log(text20.match(regex25))



// $ with replace 

let text21 = "abdo emad";
console.log(text21.replace(/(\w+)\s(\w+)/, "$2 $1"));   // 2 here refers here to the second capture, 1 referes to the first capture 


//



try {
	consolea.log("abdo");

} catch (error) {
	throw "12"
} finally {
	console.log("nice bad")
}	