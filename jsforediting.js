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
    let cross = document.createElement('button');
	
	art.setAttribute('data-id', doc.id);
	schoolname.textContent = doc.data().school;
    schooldescription.textContent = doc.data().schooldesc;
    cross.textContent = "Delete";

	$(schoolname).addClass("schoolname");
	$(schooldescription).addClass("schooldesc");

	art.appendChild(schoolname);
    art.appendChild(schooldescription);
    art.appendChild(cross);
	
    $("div.educ").append(art);
    
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('educ').doc(id).delete();
    })
}

function renderInfo(doc){
	let info = document.createElement('p');
    let content = document.createElement("div");
    let cross = document.createElement('button');

	info.setAttribute('data-id', doc.id);
    content.textContent = doc.data().ame;
    cross.textContent = "Delete";

    info.appendChild(content);
    info.appendChild(cross);

    boutMe.appendChild(info);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('about-me').doc(id).delete();
    })
}

function renderVid(doc){
    let output = document.createElement("div");
    let vid = document.createElement('iframe');
    let cross = document.createElement('button');

	vid.setAttribute('data-id', doc.id);
    vid.setAttribute('src',doc.data().embed);
    cross.textContent = "Delete";

    output.appendChild(vid);
    output.appendChild(cross);

    projDiv.appendChild(output);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('proj').doc(id).delete();
    })
}

function renderContacts(doc){
    let link = document.createElement('div');
	let name = document.createElement('div');
    let site = document.createElement('a');
    let cross = document.createElement('button');

	link.setAttribute('data-id', doc.id);
	site.setAttribute('href',doc.data().link);
	name.textContent = doc.data().name;
    site.textContent = doc.data().link;
    cross.textContent = "Delete";

	$(name).addClass("name");

	link.appendChild(name);
    link.appendChild(site);
    link.appendChild(cross);
    $("div.contacts").append(link);
    
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('contacts').doc(id).delete();
    })
}

function renderOrgs(doc){
    let link = document.createElement('img');
	let name = document.createElement('div');
    let desc = document.createElement('div');
    let cross = document.createElement('button');

	name.setAttribute('data-id', doc.id);
	link.setAttribute('src',doc.data().link);
	name.textContent = doc.data().name;
    desc.textContent = doc.data().desc;
    cross.textContent = "Delete";

	$(name).addClass("name");
	$(desc).addClass("desc");
	$(link).addClass("img");

    name.appendChild(cross);
	$(name).append(desc);
    $(name).append(link);
    $("div.orgs").append(name);
    
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('orgs').doc(id).delete();
    })
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