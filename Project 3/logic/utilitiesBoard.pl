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
/*
  boardToJson([], []).
  boardToJson([List | R], [JsonList | Json]):-
    boardToJsonLine(List, JsonList),
    boardToJson(R, Json).

  boardToJsonLine([], []).
  boardToJsonLine([Element | Rest], [JsonElem | JsonRest]):-
    atomString(Element,JsonElem),
    boardToJsonLine(Rest, JsonRest).


atomString(empty, '"empty"').
atomString(noVerticalWall, '"noVerticalWall"').
atomString(noWall, '"noWall"').
atomString(wall, '"wall"').
atomString(verticalwall, '"verticalwall"').
atomString(player11, "player11").
atomString(player12, "player12").
atomString(player21, "player21").
atomString(player22, "player22").
atomString(null, "null").
atomString(startPlayer1, "startPlayer1").
atomString(startPlayer2, "startPlayer2").
atomString(winnerplayer2, "winnerplayer2").
atomString(winnerplayer1, "winnerplayer1").*/
