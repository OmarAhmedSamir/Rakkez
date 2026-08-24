/* =========================================================
   RAKKEZ CONFIG
   ========================================================= */

const RAKKEZ_CONFIG = {

    spotify: {

        clientId:
            "YOUR_SPOTIFY_CLIENT_ID",

        redirectUri:
            window.location.origin +
            window.location.pathname,

        scopes: [

            "user-read-private",
            "user-read-email",
            "user-read-currently-playing",
            "user-read-playback-state"

        ].join(" ")

    },


    google: {

        clientId:
            "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"

    }

};