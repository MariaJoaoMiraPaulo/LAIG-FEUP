 :- ensure_loaded('displayBoard.pl').
 :- ensure_loaded('utilitiesBoard.pl').
 :- ensure_loaded('userInput.pl').
 :- ensure_loaded('gameLogic.pl').
 :- ensure_loaded('menus.pl').
 :- ensure_loaded('bot.pl').
 :- ensure_loaded('gameLoops.pl').

pos:-
  emptyBoard(T),
  returnPosition(startPlayer1WithPawn,T,1,1,Xf,Yf),
  write(Xf),
  write(Yf).
