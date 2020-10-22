/**
 * Import jquery
 */
var script = document.createElement('script'); 
 
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'; 
document.getElementsByTagName('head')[0].appendChild(script);

 
/**
 * VUE
 */
let vm = new Vue({
    el: '#app',
    data() {
        return{
            posts: [],
            field: 'skateboarding',
        }
    },
    methods: {
        makePostsArray(x) {
            this.search = x;
            this.posts = [];
            url = 'https://www.reddit.com/r/' + x + '/.json';

            $.getJSON(url).then(response => {

                console.log('response: ', response);
                response.data.children.forEach(post => {
                    const me = post.data;
                    if (
                        me.secure_media !== null &&
                        me.is_video === true &&
                        me.author != "AutoModerator"
                    ) {
                        const postObj = {
                            "titolo": me.title,
                            "autore": me.author,
                            "linkPost": me.url,
                            "linkDownload": "https://viddit.red/?url=" + me.url.replace(/(^\w+:|^)\/\//, ''),
                            "upVotes": me.ups,
                            "isVideo": me.is_video,
                            "urlMedia": me.secure_media.reddit_video.fallback_url,
                            "height": me.secure_media.reddit_video.height,
                            "width": me.secure_media.reddit_video.width,
                        };
                        this.posts.push(postObj);
                    }  
                });
                // console.log(this.posts)
            });

            this.field = '';
        },

    }
});
