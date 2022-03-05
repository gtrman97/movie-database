function openMovieList() {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../static/json/movies.json', true);
    xhr.send(null);

    xhr.onload = function() {
        let responseObject = JSON.parse(xhr.responseText);
        let newContent = '', i;
        let subTitle;

        if (document.getElementById('openListBtn').innerText == 'View Movies List') {
            subTitle = '<h3>The latest 10 movies</h3>';
            document.getElementById('subTitle').innerHTML = subTitle;
            document.getElementById('openListBtn').innerText = "View All Movies";
            for (i = (responseObject.length - 1); i > (responseObject.length - 11); i--) {
                newContent += '<div class="container"><div class="row align-items-start">';
                newContent += '<div class="col"><b>Title: </b>' + responseObject[i].title + '</div>';
                newContent += '<div class="col"><b>Year: </b>' + responseObject[i].year + '</div>';
                newContent += '<div class="col"><p><b>Cast: </b>' + responseObject[i].cast + '</p></div>';
                newContent += '<div class="col"><p><b>Genres: </b>' + responseObject[i].genres + '</p></div></div></div>';
            }
        }
        else {
            subTitle = '<h3>The entire movie list</h3>';
            document.getElementById('subTitle').innerHTML = subTitle;
            for (i = (responseObject.length - 1); i > -1; i--) {
                newContent += '<div class="container"><div class="row align-items-start">';
                newContent += '<div class="col"><b>Title: </b>' + responseObject[i].title + '</div>';
                newContent += '<div class="col"><b>Year: </b>' + responseObject[i].year + '</div>';
                newContent += '<div class="col"><p><b>Cast: </b>' + responseObject[i].cast + '</p></div>';
                newContent += '<div class="col"><p><b>Genres: </b>' + responseObject[i].genres + '</p></div></div></div>';
            }
        }
        document.getElementById('content').innerHTML = newContent;
    }
}

function databaseStats() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../static/json/movies.json', true);
    xhr.send(null);

    xhr.onload = function() {
        document.getElementById('subTitle').innerHTML = '<h3>Database Statistics</h3>';
        let responseObject = JSON.parse(xhr.responseText);
        let newContent = '';
        let tempGenre;
        let tempActor;
        const actorsList = [];
        const genreList = [];
        const genreCount = [];
        let index = responseObject.length - 1;

        // create genreList and actorsList
        for (i = index; i > -1; i--) {
            // add new genres to genreList
            for (var k = 0; k < responseObject[i].genres.length; k++) {
                tempGenre = responseObject[i].genres[k];
                if(!genreList.includes(tempGenre)) {
                    genreList.push(tempGenre);
                    genreCount.push(1);
                }
                else {
                    genreCount[genreList.indexOf(tempGenre)] += 1;
                }
            }

            // add new actors to actorsList
            for (var j = 0; j < responseObject[i].cast.length; j++) {
                if(!actorsList.includes(responseObject[i].cast[j])) {
                    actorsList.push(responseObject[i].cast[j]);
                }
            }
        }

        newContent += '<div class="container"><div class="row align-items-start">';
        newContent += '<div class="col"><p><b>Total Number of Movies: </b>' + responseObject.length + '</p></div>';
        newContent += '<div class="col"><p><b>Total Number of Actors: </b>' + actorsList.length + '</p></div>';
        newContent += '<div class="col"><p><b>Total Number of Genres: </b>' + genreList.length + '</p></div></div></div>';
        newContent += '<div class="container"><div class="row align-items-start">';
        newContent += '<div class="col"><p><b>Number of Movies by Genre: </b></p></div></div></div>';

        for (i = 0; i < genreList.length; i++) {
            newContent += '<div class="container"><div class="row align-items-start">';
            newContent += '<div class="col itemIndent"><p><b>' + genreList[i] + ': </b>' + genreCount[i] + '</p></div></div></div>';
        }

        document.getElementById('content').innerHTML = newContent;
    }
}

function listActors() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../static/json/movies.json', true);
    xhr.send(null);

    xhr.onload = function() {
        document.getElementById('subTitle').innerHTML = '<h3>Database Statistics</h3>';
        let responseObject = JSON.parse(xhr.responseText);
        let newContent = '<div class="container"><div class="row align-items-start">';
        newContent += '<div class="col text-decoration-underline"><h3>Actors</h3></div>';
        newContent += '<div class="col text-decoration-underline"><h3>Genres</h3></div></div></div>';
        const actorsList = [];
        const genreList = [];
        let index = responseObject.length - 1;

        for (i = index; i > -1; i--) {
            // add new genres to genreList
            for (var k = 0; k < responseObject[i].genres.length; k++) {
                if(!genreList.includes(responseObject[i].genres[k])) {
                    genreList.push(responseObject[i].genres[k]);
                }
            }

            // add new actors to actorsList
            for (var j = 0; j < responseObject[i].cast.length; j++) {
                if(!actorsList.includes(responseObject[i].cast[j])) {
                    actorsList.push(responseObject[i].cast[j]);
                }
            }
        }

        for (i = 0; i < actorsList.length; i++) {
            newContent += '<div class="container"><div class="row align-items-start">';
            newContent += '<div class="col">' + actorsList[i] + '</div>';
            if (i < genreList.length) {
                newContent += '<div class="col">' + genreList[i] + '</div></div></div>';
            }
            else {
                newContent += '<div class="col hidden"></div></div></div>';
            }
        }

        document.getElementById('content').innerHTML = newContent;
    }
}