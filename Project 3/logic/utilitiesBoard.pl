getListElement([L1|LS],Xelement,Yelement,X,Y,Element):-
  checkTabLine(L1,Xelement,Yelement,X,Y,Element),!;
  (Y1 is Y+1,
  getListElement(LS,Xelement,Yelement,X,Y1,Element)).

getListElement([],_Xelement,_Yelement,_X,_Y,_Element).

checkTabLine([L1|LS],Xelement,Yelement,X,Y,Element):-
  compareCoordinates(L1,Xelement,Yelement,X,Y,Element),!;
  ( X1 is X+1,
  checkTabLine(LS,Xelement,Yelement,X1,Y,Element)).

compareCoordinates(L1,Xelement,Yelement,X,Y,Element):-
  Xelement=X,
  Yelement=Y,
  Element=L1.

returnPosition(_Name,[],_X, _Y, _Xf, _Yf):-
  write('Dont found the element'),fail.

returnPosition(Name,[L1|LS],X, Y, Xf, Yf):-
  checkLine(Name,L1,X,Y,Xf,Yf),
  Yf == Y,!;
  (Y1 is Y+1,
  returnPosition(Name,LS,X,Y1,Xf,Yf)).

checkLine(Name,[L1|LS],X,Y,Xf,Yf):-
  compareName(Name,L1,X,Y,Xf,Yf),!;
  (X1 is X+1,
  checkLine(Name,LS,X1,Y,Xf,Yf)).

checkLine(_Name,[],_X,_Y,_Xf,_Yf).

compareName(Name,T1,X,Y,Xf,Yf):-
  Name=T1,
  Xf is X,
  Yf is Y.

setListElement([],_Xelement,_Yelement,_X,_Y,_Element,[]).

setListElement([L1|LS],Xelement,Yelement,X,Y,Element,[N1|NS]):-
  setTabLine(L1,Xelement,Yelement,X,Y,Element,N1),
  Y1 is Y+1,
  setListElement(LS,Xelement,Yelement,X,Y1,Element,NS).

setTabLine([],_Xelement,_Yelement,_X,_Y,_Element,[]).

setTabLine([L1|LS],Xelement,Yelement,X,Y,Element,[N1|NS]):-
  (setElementValue(Xelement,Yelement,X,Y),
  N1=Element;
  N1=L1),
  X1 is X+1,
  setTabLine(LS,Xelement,Yelement,X1,Y,Element,NS).

setElementValue(Xelement,Yelement,X,Y):-
  Xelement=X,
  Yelement=Y.

  boardToNumbers([], []).
  boardToNumbers([List | R], [NumberList | Numbers]):-
    boardToNumbersLine(List, NumberList),
    boardToNumbers(R, Numbers).

  boardToNumbersLine([], []).
  boardToNumbersLine([Element | Rest], [Number | NumberRest]):-
    atomString(Element,Number),
    boardToNumbersLine(Rest, NumberRest).


atomString(empty, 0).
atomString(noVerticalWall, 1).
atomString(noWall, 2).
atomString(wall, 3).
atomString(verticalwall, 4).
atomString(player11, 5).
atomString(player12, 6).
atomString(player21, 7).
atomString(player22, 8).
atomString(null, 9).
atomString(startPlayer1, 10).
atomString(startPlayer2, 11).
atomString(winnerplayer2, 12).
atomString(winnerplayer1, 13).
