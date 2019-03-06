/** Movie data schema:
 * title: String
 * releaseYear: Number
 * cast: String array
 * director: String
 * tags: Object
 *    genres: String array
 *    moods: String array
 * ratings: Object
 *    mpaa: String
 *    rottenTomatoes: Object
 *      score: String
 *      link: String
 *    imdb: Object
 *      score: Number
 *      link: String
 * plot: String
 * media: Object
 *    posterUrl: String
 *    trailerUrl: String
 * quotes: String array
 * runtime: Number (in minutes)
 * stream: Object
 */
const movieData = [
  {
    id: 1,
    title: 'How to Train Your Dragon: The Hidden World',
    releaseYear: 2019,
    cast: ['Jay Baruchel'],
    director: 'Dean Deblois',
    tags: {
      genres: [
        'Animation',
        'Action',
        'Adventure',
        'Comedy',
        'Family',
        'Fantasy',
      ],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG',
      rottenTomatoes: {
        score: '92%',
        link:
          'https://www.rottentomatoes.com/m/how_to_train_your_dragon_the_hidden_world',
      },
      imdb: {
        score: 7.9,
        link: 'https://www.imdb.com/title/tt2386490',
      },
    },
    plot:
      "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless' discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup's reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMjIwMDIwNjAyOF5BMl5BanBnXkFtZTgwNDE1MDc2NTM@._V1_SY1000_CR0,0,631,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/SkcucKDrbOI',
    },
    quotes: [''],
    runtime: 104,
    streams: {
      theaters:
        'https://www.fandango.com/how-to-train-your-dragon-the-hidden-world-212232/movie-overview',
    },
  },
  {
    id: 2,
    title: 'Alita: Battle Angel',
    releaseYear: 2019,
    cast: ['Rosa Salazar'],
    director: 'Robert Rodriguez',
    tags: {
      genres: ['Action', 'Adventure', 'Romance', 'Sci-Fi', 'Thriller'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG-13',
      rottenTomatoes: {
        score: '59%',
        link: 'https://www.rottentomatoes.com/m/alita_battle_angel',
      },
      imdb: {
        score: 7.6,
        link: 'https://www.imdb.com/title/tt0437086',
      },
    },
    plot:
      "Alita is a creation from an age of despair. Found by the mysterious Dr. Ido while trolling for cyborg parts, Alita becomes a lethal, dangerous being. She cannot remember who she is, or where she came from. But to Dr. Ido, the truth is all too clear. She is the one being who can break the cycle of death and destruction left behind from Tiphares. But to accomplish her true purpose, she must fight and kill. And that is where Alita's true significance comes to bear. She is an angel from heaven. She is an angel of death.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNzVhMjcxYjYtOTVhOS00MzQ1LWFiNTAtZmY2ZmJjNjIxMjllXkEyXkFqcGdeQXVyNTc5OTMwOTQ@._V1_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/w7pYhpJaJW8',
    },
    quotes: [''],
    runtime: 122,
    streams: {
      theaters:
        'https://www.fandango.com/alita-battle-angel-208277/movie-overview',
    },
  },
  {
    id: 3,
    title: 'The Lego Movie 2: The Second Part',
    releaseYear: 2019,
    cast: ['Chris Pratt'],
    director: 'Mike Mitchell',
    tags: {
      genres: [
        'Animation',
        'Action',
        'Adventure',
        'Comedy',
        'Family',
        'Fantasy',
        'Musical',
      ],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG',
      rottenTomatoes: {
        score: '86%',
        link:
          'https://www.rottentomatoes.com/m/the_lego_movie_2_the_second_part',
      },
      imdb: {
        score: 7.1,
        link: 'https://www.imdb.com/title/tt3513498',
      },
    },
    plot:
      "It's been five years since everything was awesome and the citizens are facing a huge new threat: Lego Duplo invaders from outer space, wrecking everything faster than they can rebuild.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMTkyOTkwNDc1N15BMl5BanBnXkFtZTgwNzkyMzk3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/XvHSlHhh1gk',
    },
    quotes: [''],
    runtime: 104,
    streams: {
      theaters:
        'https://www.fandango.com/the-lego-movie-2-the-second-part-185756/movie-overview',
    },
  },

  {
    id: 4,
    title: 'Fighting with My Family',
    releaseYear: 2019,
    cast: ['Dwayne Johnson'],
    director: 'Stephen Merchant',
    tags: {
      genres: ['Biography', 'Comdey', 'Drama', 'Sport'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG-13',
      rottenTomatoes: {
        score: '91%',
        link: 'https://www.rottentomatoes.com/m/fighting_with_my_family',
      },
      imdb: {
        score: 7.8,
        link: 'https://www.imdb.com/title/tt6513120',
      },
    },
    plot:
      'A former wrestler and his family make a living performing at small venues around the country while his kids dream of joining World Wrestling Entertainment.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMjQ3MTk4Nzc1M15BMl5BanBnXkFtZTgwMTEwMDU5NjM@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/WqF3VTv0cqU',
    },
    quotes: [''],
    runtime: 108,
    streams: {
      theaters:
        'https://www.fandango.com/fighting-with-my-family-215780/movie-overview',
    },
  },
  {
    id: 5,
    title: "Isn't It Romantic",
    releaseYear: 2019,
    cast: ['Rebel Wilson'],
    director: 'Todd Strauss-Schulson',
    tags: {
      genres: ['Comdey', 'Fantasy', 'Romance'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG-13',
      rottenTomatoes: {
        score: '69%',
        link: 'https://www.rottentomatoes.com/m/isnt_it_romantic_2019',
      },
      imdb: {
        score: 6.3,
        link: 'https://www.imdb.com/title/tt2452244',
      },
    },
    plot:
      'A young woman disenchanted with love mysteriously finds herself trapped inside a romantic comedy.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BZGE1NGYxOWItODdmMy00NWNhLTgxZmMtYmVjYmViMGI0NTdmXkEyXkFqcGdeQXVyNzE2MTQyMzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/8ZwgoVmILQU',
    },
    quotes: [''],
    runtime: 88,
    streams: {
      theaters:
        'https://www.fandango.com/isnt-it-romantic-215554/movie-overview',
    },
  },
  {
    id: 6,
    title: 'What Men Want',
    releaseYear: 2019,
    cast: ['Taraji P. Henson'],
    director: 'Adam Shankman',
    tags: {
      genres: ['Comdey', 'Fantasy', 'Romance'],
      moods: [''],
    },
    ratings: {
      mpaa: 'R',
      rottenTomatoes: {
        score: '46%',
        link: 'https://www.rottentomatoes.com/m/what_men_want_2019',
      },
      imdb: {
        score: 4.3,
        link: 'https://www.imdb.com/title/tt7634968',
      },
    },
    plot:
      "A woman is boxed out by the male sports agents in her profession, but gains an unexpected edge over them when she develops the ability to hear men's thoughts.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMTYxNjE2NjIwOF5BMl5BanBnXkFtZTgwMjE0MzkxNzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/HeoLiTirRp4',
    },
    quotes: [''],
    runtime: 117,
    streams: {
      theaters: 'https://www.fandango.com/what-men-want-213523/movie-overview',
    },
  },
  {
    id: 7,
    title: 'Happy Death Day 2U',
    releaseYear: 2019,
    cast: ['Jessica Rothe'],
    director: 'Christopher Landon',
    tags: {
      genres: ['Drama', 'Horror', 'Mystery', 'Sci-Fi', 'Thriller'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG-13',
      rottenTomatoes: {
        score: '68%',
        link: 'https://www.rottentomatoes.com/m/happy_death_day_2u',
      },
      imdb: {
        score: 6.7,
        link: 'https://www.imdb.com/title/tt8155288',
      },
    },
    plot:
      "Having survived the farcical but utterly life-threatening events in Happy Death Day (2017), the feisty sorority sister, Tree Gelbman, finds herself in the same college dorm, thankful to be alive. However, this time, it's Carter's roommate, Ryan, who claims that he is reliving the same paradoxical day over and over again, as a mysterious paranoid killer in a single-toothed baby-faced mask with a big kitchen knife has made a habit of murdering him. Under those circumstances, a valiant but vain attempt to face the challenge, once more, will send Tree back to square one, trapped in an all too familiar and blood-drenched time loop. How many deaths separate Tree from a truly happy birthday?",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMTg0NzkwMzQyMV5BMl5BanBnXkFtZTgwNDcxMTMyNzM@._V1_SY1000_CR0,0,631,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/MT9MBytHuOI',
    },
    quotes: [''],
    runtime: 100,
    streams: {
      theaters:
        'https://www.fandango.com/happy-death-day-2u-215139/movie-overview',
    },
  },
  {
    id: 8,
    title: 'Cold Pursuit',
    releaseYear: 2019,
    cast: ['Liam Neeson'],
    director: 'Hans Petter Moland',
    tags: {
      genres: ['Action', 'Crime', 'Drama', 'Thriller'],
      moods: [''],
    },
    ratings: {
      mpaa: 'R',
      rottenTomatoes: {
        score: '70%',
        link: 'https://www.rottentomatoes.com/m/cold_pursuit',
      },
      imdb: {
        score: 6.6,
        link: 'https://www.imdb.com/title/tt5719748',
      },
    },
    plot:
      'Quiet family man and hard-working snowplow driver Nels is the lifeblood of a glitzy resort town in the Rocky Mountains because he is the one who keeps the winter roads clear. He and his wife live in a comfortable cabin away from the tourists. The town has just awarded him "Citizen of the Year." But Nels has to leave his quiet mountain life when his son is murdered by a powerful drug lord. As a man who has nothing to lose he is stoked by a drive for vengeance. This unlikely hero uses his hunting skills and transforms from an ordinary man into a skilled killer as he sets out to dismantle the cartel. Nels\' actions ignite a turf war between a manically unpredictable gangster known as Viking and a rival gang boss. Justice is served in one final spectacular confrontation that will leave (almost) no one unscathed.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BM2YyYWI3NjItMWEwZS00MzhkLWJmZTMtZDAzYjRhODM0OTMzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SY1000_CR0,0,648,1000_AL_.jpg',
      trailerUrl: 'https://youtu.be/0phuNQQ_gHI',
    },
    quotes: [''],
    runtime: 119,
    streams: {
      theaters: 'https://www.fandango.com/cold-pursuit-215413/movie-overview',
    },
  },
  {
    id: 9,
    title: 'The Upside',
    releaseYear: 2019,
    cast: ['Kevin Hart'],
    director: '',
    tags: {
      genres: ['Comedy', 'Drama'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG-13',
      rottenTomatoes: {
        score: '40%',
        link: 'https://www.rottentomatoes.com/m/the_upside',
      },
      imdb: {
        score: 6.3,
        link: 'https://www.imdb.com/title/tt1987680',
      },
    },
    plot:
      'Philip is a disabled white billionaire, who feels that life is not worth living. To help him in his day to day routine, he hires Del, an African American parolee, trying to reconnect with his estranged wife. What begins as a professional relationship develops into a friendship as Del shows his grouchy charge that life is worth living.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNzY3NzYyNjI0N15BMl5BanBnXkFtZTgwNjYzMDc0NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/EWw7rCHcduQ',
    },
    quotes: [''],
    runtime: 126,
    streams: {
      theaters: 'https://www.fandango.com/the-upside-214774/movie-overview',
    },
  },
  {
    id: 10,
    title: 'Run the Race',
    releaseYear: 2019,
    cast: ['Mykelti Williamson'],
    director: 'Chris Downling',
    tags: {
      genres: ['Drama', 'Sport'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG',
      rottenTomatoes: {
        score: '40%',
        link: 'https://www.rottentomatoes.com/m/run_the_race',
      },
      imdb: {
        score: 6.3,
        link: 'https://www.imdb.com/title/tt3201736',
      },
    },
    plot:
      'Against the backdrop of high school football and track, two brothers in a small Southern town face escalating problems with two different world views, straining - but ultimately strengthening - the bonds of brotherhood.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BODY5ZmIwYzItY2M0NS00NDBkLTk3OWQtNjgzN2MwNzc3ZmQzXkEyXkFqcGdeQXVyODUwNjMwOQ@@._V1_.jpg',
      trailerUrl: 'https://www.youtube.com/embed/ebELWVvbUKo',
    },
    quotes: [''],
    runtime: 101,
    streams: {
      theaters: 'https://www.fandango.com/run-the-race-216281/movie-overview',
    },
  },
];

/** MovieAPI */
export default class MovieAPI {
  /**
   * Contruct new MovieAPI instance
   */
  constructor() {
    this.movies = movieData;
  }

  /**
   * Return movie data
   */
  getMovies() {
    return this.movies;
  }

  /**
   * Filters movies by genre
   * @param {*} genre
   */
  getMoviesByGenre(genre) {
    return this.movies.filter(movie => movie.tags.genres.includes(genre));
  }
}
