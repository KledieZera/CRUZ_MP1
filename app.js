const projDiv = document.querySelector("div.proj");
const boutMe = document.querySelector("div.about-me");
const addEduc = document.querySelector("#addeduc");
const addOrg = document.querySelector("#addorg");
const addProj = document.querySelector("#addproj");
const addAme = document.querySelector("#addame");
const addCont = document.querySelector("#addcont");

function renderSchool(doc){
	var art = document.createElement("article");
	var schoolname = document.createElement("div");
	var schooldescription = document.createElement("div");
	
	art.setAttribute('data-id', doc.id);
	schoolname.textContent = doc.data().school;
    schooldescription.textContent = doc.data().schooldesc;

	$(schoolname).addClass("schoolname");
	$(schooldescription).addClass("schooldesc");

	$(art).append(schoolname);
	$(art).append(schooldescription);
	
	$("div.educ").append(art);
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

	vid.setAttribute('data-id', doc.id);
	vid.setAttribute('src',doc.data().embed);

    output.appendChild(vid);

    projDiv.appendChild(output);
}

function renderContacts(doc){
    let link = document.createElement('div');
	let name = document.createElement('div');
	let site = document.createElement('a');

	link.setAttribute('data-id', doc.id);
	site.setAttribute('href',doc.data().link);
	name.textContent = doc.data().name;
	site.textContent = doc.data().link;

	$(name).addClass("name");

	link.appendChild(name);
	link.appendChild(site);
	$("div.contacts").append(link);
}

function renderOrgs(doc){
    let link = document.createElement('img');
	let name = document.createElement('div');
	let desc = document.createElement('div');

	link.setAttribute('data-id', doc.id);
	link.setAttribute('src',doc.data().link);
	name.textContent = doc.data().name;
	desc.textContent = doc.data().desc;

	$(name).addClass("name");
	$(desc).addClass("desc");
	$(link).addClass("img");

	$(name).append(desc);
	$(name).append(link);
	$("div.orgs").append(name);
}

//get data
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

db.collection('contacts').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderContacts(doc);
	})
})

db.collection('orgs').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		renderOrgs(doc);
	})
})

//add data
addEduc.addEventListener('submit', (e) => {
	db.collection('educ').add({
		school: addEduc.schoolname.value,
		schooldesc: addEduc.schooldesc.value
	});
	e.preventDefault();
	addEduc.reset();
})

addOrg.addEventListener('submit', (e) => {
	db.collection('orgs').add({
		desc: addOrg.orgdesc.value,
		link: addOrg.orglink.value,
		name: addOrg.orgname.value
	});
	e.preventDefault();
	addOrg.reset();
})

addProj.addEventListener('submit', (e) => {
	db.collection('proj').add({
		embed: addProj.projlink.value
	});
	e.preventDefault();
	addProj.reset();
})

addAme.addEventListener('submit', (e) => {
	db.collection('about-me').add({
		ame: addAme.addame.value
	});
	e.preventDefault();
	addAme.reset();
})

addCont.addEventListener('submit', (e) => {
	db.collection('contacts').add({
		link: addCont.contlink.value,
		name: addCont.contname.value
	});
	e.preventDefault();
	addCont.reset();
})