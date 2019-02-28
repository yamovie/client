/* eslint-disable indent */
// ==========================================================================
// ==========================================================================

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
 *    rottenTomatoes: String
 *    imdb: Number
 * plot: String
 * media: Object
 *    posterUrl: String
 *    videoUrl: String
 * quotes: String array
 * runtime: Number (in minutes)
 * stream: Object
 */
const movieData = [
  {
    title: 'How to Train Your Dragon: The Hidden World',
    releaseYear: 2019,
    cast: ['Jay Baruchel'],
    director: 'Dean Deblois',
    tags: {
      genres: ['Animation', 'Action', 'Adventure', 'Comedy', 'Family', 'Fantasy'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG',
      rottenTomatoes: '92%',
      imdb: 7.9,
    },
    plot:
      "As Hiccup fulfills his dream of creating a peaceful dragon utopia, Toothless' discovery of an untamed, elusive mate draws the Night Fury away. When danger mounts at home and Hiccup's reign as village chief is tested, both dragon and rider must make impossible decisions to save their kind.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMjIwMDIwNjAyOF5BMl5BanBnXkFtZTgwNDE1MDc2NTM@._V1_SY1000_CR0,0,631,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/SkcucKDrbOI',
    },
    quotes: [''],
    runtime: 104,
    streams: {},
  },
  {
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
      rottenTomatoes: '59%',
      imdb: 7.6,
    },
    plot:
      "Alita is a creation from an age of despair. Found by the mysterious Dr. Ido while trolling for cyborg parts, Alita becomes a lethal, dangerous being. She cannot remember who she is, or where she came from. But to Dr. Ido, the truth is all too clear. She is the one being who can break the cycle of death and destruction left behind from Tiphares. But to accomplish her true purpose, she must fight and kill. And that is where Alita's true significance comes to bear. She is an angel from heaven. She is an angel of death.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNzVhMjcxYjYtOTVhOS00MzQ1LWFiNTAtZmY2ZmJjNjIxMjllXkEyXkFqcGdeQXVyNTc5OTMwOTQ@._V1_.jpg',
      videoUrl: 'https://youtu.be/w7pYhpJaJW8',
    },
    quotes: [''],
    runtime: 122,
    streams: {},
  },
  {
    title: 'The Lego Movie 2: The Second Part',
    releaseYear: 2019,
    cast: ['Chris Pratt'],
    director: 'Mike Mitchell',
    tags: {
      genres: ['Animation', 'Action', 'Adventure', 'Comedy', 'Family', 'Fantasy', 'Musical'],
      moods: [''],
    },
    ratings: {
      mpaa: 'PG',
      rottenTomatoes: '86%',
      imdb: 7.1,
    },
    plot:
      "It's been five years since everything was awesome and the citizens are facing a huge new threat: Lego Duplo invaders from outer space, wrecking everything faster than they can rebuild.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMTkyOTkwNDc1N15BMl5BanBnXkFtZTgwNzkyMzk3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/XvHSlHhh1gk',
    },
    quotes: [''],
    runtime: 104,
    streams: {},
  },

  {
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
      rottenTomatoes: '91%',
      imdb: 7.8,
    },
    plot:
      'A former wrestler and his family make a living performing at small venues around the country while his kids dream of joining World Wrestling Entertainment.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMjQ3MTk4Nzc1M15BMl5BanBnXkFtZTgwMTEwMDU5NjM@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/WqF3VTv0cqU',
    },
    quotes: [''],
    runtime: 108,
    streams: {},
  },
  {
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
      rottenTomatoes: '69%',
      imdb: 6.3,
    },
    plot:
      'A young woman disenchanted with love mysteriously finds herself trapped inside a romantic comedy.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BZGE1NGYxOWItODdmMy00NWNhLTgxZmMtYmVjYmViMGI0NTdmXkEyXkFqcGdeQXVyNzE2MTQyMzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/8ZwgoVmILQU',
    },
    quotes: [''],
    runtime: 88,
    streams: {},
  },
  {
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
      rottenTomatoes: '46%',
      imdb: 4.3,
    },
    plot:
      "A woman is boxed out by the male sports agents in her profession, but gains an unexpected edge over them when she develops the ability to hear men's thoughts.",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMTYxNjE2NjIwOF5BMl5BanBnXkFtZTgwMjE0MzkxNzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/HeoLiTirRp4',
    },
    quotes: [''],
    runtime: 117,
    streams: {},
  },
  {
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
      rottenTomatoes: '68%',
      imdb: 6.7,
    },
    plot:
      "Having survived the farcical but utterly life-threatening events in Happy Death Day (2017), the feisty sorority sister, Tree Gelbman, finds herself in the same college dorm, thankful to be alive. However, this time, it's Carter's roommate, Ryan, who claims that he is reliving the same paradoxical day over and over again, as a mysterious paranoid killer in a single-toothed baby-faced mask with a big kitchen knife has made a habit of murdering him. Under those circumstances, a valiant but vain attempt to face the challenge, once more, will send Tree back to square one, trapped in an all too familiar and blood-drenched time loop. How many deaths separate Tree from a truly happy birthday?",
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMTg0NzkwMzQyMV5BMl5BanBnXkFtZTgwNDcxMTMyNzM@._V1_SY1000_CR0,0,631,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/MT9MBytHuOI',
    },
    quotes: [''],
    runtime: 100,
    streams: {},
  },
  {
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
      rottenTomatoes: '70%',
      imdb: 6.6,
    },
    plot:
      'Quiet family man and hard-working snowplow driver Nels is the lifeblood of a glitzy resort town in the Rocky Mountains because he is the one who keeps the winter roads clear. He and his wife live in a comfortable cabin away from the tourists. The town has just awarded him "Citizen of the Year." But Nels has to leave his quiet mountain life when his son is murdered by a powerful drug lord. As a man who has nothing to lose he is stoked by a drive for vengeance. This unlikely hero uses his hunting skills and transforms from an ordinary man into a skilled killer as he sets out to dismantle the cartel. Nels\' actions ignite a turf war between a manically unpredictable gangster known as Viking and a rival gang boss. Justice is served in one final spectacular confrontation that will leave (almost) no one unscathed.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BM2YyYWI3NjItMWEwZS00MzhkLWJmZTMtZDAzYjRhODM0OTMzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SY1000_CR0,0,648,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/0phuNQQ_gHI',
    },
    quotes: [''],
    runtime: 119,
    streams: {},
  },
  {
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
      rottenTomatoes: '40%',
      imdb: 6.3,
    },
    plot:
      'Philip is a disabled white billionaire, who feels that life is not worth living. To help him in his day to day routine, he hires Del, an African American parolee, trying to reconnect with his estranged wife. What begins as a professional relationship develops into a friendship as Del shows his grouchy charge that life is worth living.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNzY3NzYyNjI0N15BMl5BanBnXkFtZTgwNjYzMDc0NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
      videoUrl: 'https://youtu.be/EWw7rCHcduQ',
    },
    quotes: [''],
    runtime: 126,
    streams: {},
  },
  {
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
      rottenTomatoes: '40%',
      imdb: 6.3,
    },
    plot:
      'Against the backdrop of high school football and track, two brothers in a small Southern town face escalating problems with two different world views, straining - but ultimately strengthening - the bonds of brotherhood.',
    media: {
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BODY5ZmIwYzItY2M0NS00NDBkLTk3OWQtNjgzN2MwNzc3ZmQzXkEyXkFqcGdeQXVyODUwNjMwOQ@@._V1_.jpg',
      videoUrl: 'https://youtu.be/ebELWVvbUKo',
    },
    quotes: [''],
    runtime: 101,
    streams: {},
  },
];

// ==========================================================================
// ==========================================================================

/** MovieAPI */
class MovieAPI {
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
}

// ==========================================================================

export default MovieAPI;

// ==========================================================================
// ==========================================================================

