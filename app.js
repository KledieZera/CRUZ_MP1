const educArticle = document.querySelector("div.educ");
const projDiv = document.querySelector("div.proj");
const boutMe = document.querySelector("div.about-me");

function renderSchool(doc){
	let art = document.createElement("article");
	let schoolname = document.createElement("div");
	let schooldescription = document.createElement("div");
	
	art.setAttribute('data-id', doc.id);
	schoolname.textContent = doc.data().school;
    schooldescription.textContent = doc.data().schooldesc;

	art.appendChild(schoolname);
	art.appendChild(schooldescription);
	
	educArticle.appendChild(art);
}

function renderInfo(doc){
	let info = document.createElement('p');
	let content = document.createElement("div");

	info.setAttribute('data-id', doc.id);
	content.textContent = doc.data().ame;

	info.appendChild(content);

	boutMe.appendChild(info);
}

function renderVid(doc){
    let output = document.createElement("div");
    let vid = document.createElement('iframe');

    $("#iframe").attr('src',doc.data().embed);
    output.appendChild(vid);

    projDiv.appendChild(output);
}

db.collection('educ').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderSchool(doc);
	})
})

db.collection('about-me').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderInfo(doc);
	})
})

db.collection('proj').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderVid(doc);
	})
})