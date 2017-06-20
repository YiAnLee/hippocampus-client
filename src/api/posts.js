// Develop server URL
const postBaseUrl = 'http://localhost:3000/api1';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';
 // as3-verfinal-dev.us-west-2.elasticbeanstalk.com
// const postBaseUrl = 'http://as3-verfinal-dev.us-west-2.elasticbeanstalk.com/api1';
// const postBaseUrl = 'http://hippocampus-dev.us-west-2.elasticbeanstalk.com/api1';

export function listPosts(searchText = '', start) {
    let url = `${postBaseUrl}/posts`;
    let query = [];
    if (searchText)
        query.push(`searchText=${searchText}`);
    if (start)
        query.push(`start=${start}`);
    if (query.length)
        url += '?' + query.join('&');

    console.log(`Making GET request to: ${url}`);

    return fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}

export function createPost(uri, mood, text) {
    uri="test";
    console.log("creact post, uri:",uri,"mood",mood)
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);
    // const file = {
    //   uri,             // e.g. 'file:///path/to/file/image123.jpg'
    //   name,            // e.g. 'image123.jpg',
    //   type             // e.g. 'image/jpg'
    // }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uri,
            mood,
            text,
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        else {
            console.log("probably success?")
        }
        return res.json();
    });
}

export function createVote(id, mood) {
    let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;

    console.log(`Making POST request to: ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });
}
