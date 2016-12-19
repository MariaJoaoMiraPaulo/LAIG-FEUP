readingInput(Pawn, Direction,NewPawn,NewDirection ):-
  readPawn(Pawn),
  validateInputPawn(Pawn, NewPawn),
  readDirection(Direction),
  validateInputDirection(Direction, NewDirection).

readPawn(Pawn):-
  write('Which Pawn do you want to move ( 1 , 2 ):'),nl,
  read(Pawn).

validateInputPawn(1, NewPawn):-
  NewPawn=1.

validateInputPawn(2, NewPawn):-
  NewPawn=2.

validateInputPawn(_Pawn, NewPawn):-
  write('Invalid pawn input'),nl,
  readPawn(AnotherTry),
  validateInputPawn(AnotherTry, NewPawn).

readDirection(Direction):-
  write('Which direction do you want to take ( left->(l1 or l2), right->(r1 or r2), top->(t1 or t2), bottom->(b1 or b2), diagonalTopRight->dtr , diagonalTopLeft->dtl , diagonalBottomLeft->dbl , diagonalBottomRight->dbr)'),
  read(Direction).

validateInputDirection(l1, NewDirection):-
  NewDirection=l1.

validateInputDirection(l2, NewDirection):-
  NewDirection=l2.

validateInputDirection(r1, NewDirection):-
  NewDirection=r1.

validateInputDirection(r2, NewDirection):-
  NewDirection=r2.

validateInputDirection(t1, NewDirection):-
  NewDirection=t1.

validateInputDirection(t2, NewDirection):-
  NewDirection=t2.

validateInputDirection(b1, NewDirection):-
  NewDirection=b1.

validateInputDirection(b2, NewDirection):-
  NewDirection=b2.

validateInputDirection(dtr, NewDirection):-
  NewDirection=dtr.

validateInputDirection(dtl, NewDirection):-
  NewDirection=dtl.

validateInputDirection(dbl, NewDirection):-
  NewDirection=dbl.

validateInputDirection(dbr, NewDirection):-
  NewDirection=dbr.

validateInputDirection(_Direction, NewDirection):-
  write('Invalid direction input'),nl,nl,nl,
  readDirection(AnotherTry),
  validateInputDirection(AnotherTry, NewDirection).

askingPosition(WallX,WallY):-
  write('Position x (a....k) :'),nl,
  read(Answer1),
  validateInputPosition(Answer1,NewAnswer),
  letterCoordinateToNumber(NewAnswer,X),
  transformToRealCoordinates(X,WallX),
  write('Postion y (1....14) :'),nl,
  read(Answer2),nl,
  validateInputPosition2(Answer2),
  %validateAnswer2
  transformToRealCoordinates(Answer2,WallY).

validateInputPosition2(Answer2):-
  Answer2 >= 1,
  Answer2 =< 14.

validateInputPosition(a,NewAnswer):-
  NewAnswer = a.

validateInputPosition(b,NewAnswer):-
  NewAnswer = b.

validateInputPosition(c,NewAnswer):-
  NewAnswer = c.

validateInputPosition(d,NewAnswer):-
  NewAnswer = d.

validateInputPosition(e,NewAnswer):-
  NewAnswer = e.

validateInputPosition(f,NewAnswer):-
  NewAnswer = f.

validateInputPosition(g,NewAnswer):-
  NewAnswer = g.

validateInputPosition(h,NewAnswer):-
  NewAnswer = h.

validateInputPosition(i,NewAnswer):-
  NewAnswer = i.

validateInputPosition(j,NewAnswer):-
  NewAnswer = j.

validateInputPosition(k,NewAnswer):-
  NewAnswer = k.

validateInputPosition(_Answer1,NewAnswer):-
  write('Invalid position input'),nl,nl,nl,
  read(AnotherTry),
  validateInputPosition(AnotherTry, NewAnswer).

transformToRealCoordinates(ICoordinate,FCoordinate):-
  ICoordinate=1->FCoordinate=1;
  FCoordinate is ICoordinate*2 - 1.

wallOrientation(Orientation,NewOrientation):-
  write('Wall orientation (v or h) :'),nl,
  read(Orientation),
  validOrientation(Orientation,NewOrientation).

validOrientation(v,NewOrientation):-
  NewOrientation=v.

validOrientation(h,NewOrientation):-
  NewOrientation=h.

validOrientation(_Orientation,NewOrientation):-
  write('Invalid Orientation, try again'),nl,
  wallOrientation(_AnotherTry,NewOrientation).

wallPositionInside(v,WallPositionInside):-
  write('You want your wall on left top, right top, left bottom , right bottom (lt , rt, lb , rb): '),nl,
  read(Answer),
  validPositionInside(v,Answer,WallPositionInside).

wallPositionInside(h,WallPositionInside):-
  write('You want your wall on top to the left, top to the right, bottom to the left or bottom to the right (tl, tr, bl, br): '),nl,
  read(Answer),
  validPositionInside(h,Answer,WallPositionInside).

validPositionInside(v,lt,WallPositionInside):-
  WallPositionInside=lt.

validPositionInside(v,rt,WallPositionInside):-
  WallPositionInside=rt.

validPositionInside(v,lb,WallPositionInside):-
  WallPositionInside=lb.

validPositionInside(v,rb,WallPositionInside):-
  WallPositionInside=rb.

validPositionInside(h,tl,WallPositionInside):-
  WallPositionInside=tl.

validPositionInside(h,tr,WallPositionInside):-
  WallPositionInside=tr.

validPositionInside(h,bl,WallPositionInside):-
 WallPositionInside=bl.

validPositionInside(h,br,WallPositionInside):-
  WallPositionInside=br.

validPositionInside(Orientation,_Answer,WallPositionInside):-
  write('Invalid position inside, try again'),nl,
  wallPositionInside(Orientation,WallPositionInside).

input(1, 1, player11).
input(1, 2, player12).
input(2, 1, player21).
input(2, 2, player22).

letterCoordinateToNumber(a,1).
letterCoordinateToNumber(b,2).
letterCoordinateToNumber(c,3).
letterCoordinateToNumber(d,4).
letterCoordinateToNumber(e,5).
letterCoordinateToNumber(f,6).
letterCoordinateToNumber(g,7).
letterCoordinateToNumber(h,8).
letterCoordinateToNumber(i,9).
letterCoordinateToNumber(j,10).
letterCoordinateToNumber(k,11).
letterCoordinateToNumber(l,12).
letterCoordinateToNumber(m,13).
letterCoordinateToNumber(n,14).
letterCoordinateToNumber(o,15).
letterCoordinateToNumber(p,16).
letterCoordinateToNumber(q,17).
letterCoordinateToNumber(r,18).
letterCoordinateToNumber(s,19).
letterCoordinateToNumber(t,20).
letterCoordinateToNumber(u,21).
letterCoordinateToNumber(v,22).
letterCoordinateToNumber(w,23).
letterCoordinateToNumber(x,24).
letterCoordinateToNumber(y,25).
letterCoordinateToNumber(z,26).
