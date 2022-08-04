///////////////////////////////////////////////////////////////////////////////////
// Listing 1: Structural Typing betrachtet die Form der Werte statt ihres Namens //
///////////////////////////////////////////////////////////////////////////////////

type Person = {
   age: number,
   name: string
}

type Student = {
  age: number,
  name: string,
  semester: number
}

const student: Student = {
  age: 24,
  semester: 7,
  name: “Jane Doe”
}

const person: Person = student // das klappt!


///////////////////////////////////////////////////
// Listing 2: Definition eines Intersection Type //
///////////////////////////////////////////////////

type Studies = {
	semester: number
}

type Person = {
	name: string,
	age: number
}

type Student = Person & Studies


////////////////////////////////////////////
// Listing 3: Definieren eines Union Type //
////////////////////////////////////////////

type Professor = Person & {
	institute: string,
	employeeId: string
}

type UniversityPeople = Student | Professor


////////////////////////////////////////////
// Listing 4: Verwenden von Literal Types //
////////////////////////////////////////////

type ToyBase = {
    name: string;
    price: number;
    quantity: number;
    minimumAge: number;
  };
  
  type BoardGame = ToyBase & {
    kind: "boardgame";
    players: number;
  }
  
  type Puzzle = ToyBase & {
    kind: "puzzle";
    pieces: number;
  }
  
  type Doll = ToyBase & {
    kind: "doll";
    material: "plastic" | "plush";
  }


//////////////////////////////////////
// Listing 5: Exhaustiveness Checks //
//////////////////////////////////////

function printToys(toy: Toy) {
    switch(toy.kind) {
      case "boardgame":
        // toy is BoardGame
        break;
      case "puzzle":
        // toy is Puzzle
        break;
      case "doll":
        // toy is Doll
        break;
      default: 
        assertNever(toy)
    }
  }
  
  function assertNever(obj: never) {
    throw Error("I can't work with this type")
  }


/////////////////////////////////////////////////////////////
// Listing 6: Hinzufuegen einer neuen Variante zum Toy-Typ //
/////////////////////////////////////////////////////////////

type VideoGame
type VideoGame = ToyBase & {
  kind: "videogame";
  system: "NES" | "SNES" | "Mega Drive" | "There are no more consoles"; 
};

type Toy = BoardGame | Puzzle | Doll | VideoGame


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Listing 7: Unverzuegliche Reaktion von Exhaustiveness Checks nach Aenderung des urspruenglichen Union Type //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function printToys(toy: Toy) {
  switch(toy.kind) {
    case "boardgame":
      // toy is BoardGame
      break;
    case "puzzle":
      // toy is Puzzle
      break;
    case "doll":
      // toy is Doll
      break;
    default: 
      // Einen Augenblick! toy ist nun VideoGame
      // und nicht never. Dieser Funktionsaufruf
      // ist ungueltig
      assertNever(toy)
  }
}


///////////////////////////////////////////////////////////////////////////////
// Listing 8: Wie TypeScript eine "Conditional of Unions" expandieren wuerde //
///////////////////////////////////////////////////////////////////////////////

type Dolls = BoardGame extends { kind: "doll"} ? BoardGame : never |
	Doll extends { kind: "doll"} ? Doll : never |
	Puzzle extends { kind: "doll"} ? Puzzle : never |
	VideoGame extends { kind: "doll"} ? VideoGame : never


//////////////////////////////////////////////////////
// Listing 9: Wie TypeScript GroupedToys expandiert //
//////////////////////////////////////////////////////

type GroupedToys = {
    boardgame: BoardGame[];
    puzzle: Puzzle[];
    doll: Doll[];
    videogame: VideoGame[];
 }
