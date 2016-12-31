%Font Style : Doom
mainMenu:-
	printMainMenu,
  read(Input),
  readInput(Input),
	mainMenu.

readInput(1):-
  emptyBoard(T),
  gameLoop(T, 21, 27,0,0).

readInput(2):-
	write('Choose difficulty of Bot(1->Normal or 2->Difficulty) :'),nl,
	read(Input),
	readInputBotDifficulty(Input).

readInput(3):-
	write('Choose difficulty of 1ºBot(1->Normal or 2->Difficulty) :'),nl,
	read(FirstDiff),
	write('Choose difficulty of 2ºBot(1->Normal or 2->Difficulty) :'),nl,
	read(SecondDiff),
	emptyBoard(T),
	gameLoopPcPc(T, FirstDiff, SecondDiff,	21, 27,0,0).

readInput(4):-
  printHowToPlayMenu,
  read(InputHowToPlay),
  readHowToPlayInput(InputHowToPlay).

readInput(5):-
  write('Exiting...').

readInput(_Input):-
  write('Error: invalid input.').

readInputBotDifficulty(2):-
	emptyBoard(T),
  gameLoopPlayerPc(T,y,21,27,0,0).

readInputBotDifficulty(_Input):-
	emptyBoard(T),
	gameLoopPlayerPc(T,n,21,27,0,0).

readHowToPlayInput(1):-
    mainMenu.

readHowToPlayInput(_InputHowToPlay):-
    write('Error: invalid input.').

printMainMenu:-
  nl,nl,nl,nl,nl,nl,nl,
  write('        |-----------------------------------------------------------------------------|'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                  _____ _            _             _                         |'),nl,
  write('        |                  | ___ | |          | |           | |                       |'),nl,
  write('        |                  | |_/ / | ___   ___| | ____ _  __| | ___                   |'),nl,
  write('        |                  | ___ | |/ _ | / __| |/ / _` |/ _` |/ _ |                  |'),nl,
  write('        |                  | |_/ | | (_) | (__|   < (_| | (_| |  __/                  |'),nl,
  write('        |                  |____/|_||___/ |___|_||_|__,_||__,_||___|                  |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                             Maria Joao Mira Paulo                           |'),nl,
  write('        |                                  Nuno Ramos                                 |'),nl,
  write('        |                  -----------------------------------------                  |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                        1.Start Game Player vs Player                        |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                           2.Start Game PC vs Player                         |'),nl,
  write('        |                                                                             |'),nl,
	write('        |                             3.Start Game PC vs PC                           |'),nl,
	write('        |                                                                             |'),nl,
  write('        |                               4.How to Play                                 |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                   5.Exit                                    |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                             Choose an option...                             |'),nl,
  write('        |-----------------------------------------------------------------------------| '),nl,nl,nl,nl.


printHowToPlayMenu:-
  nl,nl,nl,nl,nl,nl,nl,
  write('        |-----------------------------------------------------------------------------|'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |             _   _                   _         ______ _                      |'),nl,
  write('        |            | | | |               | |        | ___ | |                       |'),nl,
  write('        |            | |_| | _____      __ | |_ ___   | |_/ / | __ _ _   _            |'),nl,
  write('        |            |  _  |/ _  |  /| / / | __/ _  |  |  __/| |/ _` | | | |          |'),nl,
  write('        |            | | | | (_) | V  V /  | || (_) | | |   | | (_| | |_| |           |'),nl,
  write('        |            |_| |_/|___/ |_/|_/   | __|___/  |_|   |_||__,_||__, |           |'),nl,
  write('        |                                                             __/ |           |'),nl,
  write('        |                                                             |___/           |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |     Players each have 2 pawns, 9 walls (which are placed vertically),and    |'),nl,
  write('        |     9 walls (placed horizontally). Pawns start on the symbols matching      |'),nl,
  write('        |     them, which are 4x4 squares in on each of the four corners of the       |'),nl,
  write('        |     board. The objective is simple: to get one of your pawns to a           |'),nl,
  write('        |     starting spot of your opponent.                                         |'),nl,
  write('        |      Each turn players can move one pawn up to two spaces, and also place   |'),nl,
  write('        |     one wall, useful for blocking off their opponent s move.                |'),nl,
  write('        |      Walls always cover two squares worth of area, and must be place        |'),nl,
  write('        |      according to their type (vertically or horizontally).                  |'),nl,
  write('        |                                                                             |'),nl,
  write('        |     Once players are out of walls, they keep moving pawns until one wins.   |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                                                                             |'),nl,
  write('        |                             1. Main Menu                                    |'),nl,
  write('        |-----------------------------------------------------------------------------|'),nl,nl,nl,nl.
