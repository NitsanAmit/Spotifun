import {Genre} from "./entity-models";
import {pop, rock, country, indie, metal,
    jazz, hipHop, electronic, sad, happy,
    dancey, angry, relaxed, workout} from "../static-resources/icons";

export const Genres: {[key: string]: Genre} = {
    pop : {
        id: "pop",
        name: "Pop",
        genres: ["indie-pop", "pop"],
        image: pop,
        selected: false,
    },
    rock : {
        id: "rock",
        name: "Rock",
        genres: ["rock", "hard-rock","rock-n-roll"],
        image: rock,
        selected: false,
    },
    country : {
        id: "country",
        name: "Country",
        genres: ["country"],
        image: country,
        selected: false,
    },
    indie : {
        id: "indie",
        name: "Indie",
        genres: ["indie", "alternative"],
        image: indie,
        selected: false,
    },
    metal : {
        id: "metal",
        name: "Metal",
        genres: ["metal", "heavy-metal"],
        image: metal,
        selected: false,
    },
    jazzAndBlues : {
        id: "jazzAndBlues",
        name: "Jazz & Blues",
        genres: ["jazz", "blues"],
        image: jazz,
        selected: false,
    },
    hipHop : {
        id: "hipHop",
        name: "Hip Hop",
        genres: ["hip-hop"],
        image: hipHop,
        selected: false,
    },
    electronic : {
        id: "electronic",
        name: "Electronic",
        genres: ["electro", "electronic", "edm"],
        image: electronic,
        selected: false,
    },
    sad: {
        id: "sad",
        name: "Sad",
        genres: ["rainy-day", "sad"],
        image: sad,
        selected: false,
    },
    happy: {
        id: "happy",
        name: "Happy",
        genres: ["happy"],
        image: happy,
        selected: false,
    },
    dancey: {
        id: "dancey",
        name: "Dancey",
        genres: ["dance", "pop", "party"],
        image: dancey,
        selected: false,
    },
    angry: {
        id: "angry",
        name: "Angry",
        genres: ["metal", "rock", "hard-rock"],
        image: angry,
        selected: false,
    },
    relaxed: {
        id: "relaxed",
        name: "Relaxed",
        genres: ["study", "sleep"],
        image: relaxed,
        selected: false,
    },
    workout: {
        id: "workout",
        name: "Working Out",
        genres: ["work-out", "workout"],
        image: workout,
        selected: false,
    }
}