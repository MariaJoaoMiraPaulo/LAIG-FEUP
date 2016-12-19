:- use_module(library(random)).

randomPawn(Pawn):-
	random(0,2,GeneratePawn),
	generatePawn(GeneratePawn,Pawn).

generatePawn(0,Pawn):-
	Pawn=1.

generatePawn(1,Pawn):-
	Pawn=2.

randomDirection(Direction):-
	random(0,12,GenerateDirection),
	generateDirection(GenerateDirection,Direction).

generateDirection(0,Direction):-
	Direction=l1.

generateDirection(1,Direction):-
	Direction=r1.

generateDirection(2,Direction):-
	Direction=t1.

generateDirection(3,Direction):-
	Direction=b1.

generateDirection(4,Direction):-
	Direction=l2.

generateDirection(5,Direction):-
	Direction=r2.

generateDirection(6,Direction):-
	Direction=t2.

generateDirection(7,Direction):-
	Direction=b2.

generateDirection(8,Direction):-
	Direction=dtr.

generateDirection(9,Direction):-
	Direction=dtl.

generateDirection(10,Direction):-
	Direction=dbr.

generateDirection(11,Direction):-
	Direction=dbl.

randomWallAnswer(Answer):-
	random(0,2,NumberGenerated),
	generateWallAnswer(NumberGenerated,Answer).

generateWallAnswer(0,Answer):-
	Answer=y.

generateWallAnswer(1,Answer):-
	Answer=n.

randomOrientation(Orientation):-
	random(0,2,NumberGenerated),
	generateOrientation(NumberGenerated,Orientation).

generateOrientation(0,Orientation):-
	Orientation=v.

generateOrientation(1,Orientation):-
	Orientation=h.

randomPositionInside(Orientation,WallPositionInside):-
	random(0,4,NumberGenerated),
	generatePositionInside(Orientation,NumberGenerated,WallPositionInside).

generatePositionInside(v,0,WallPositionInside):-
	WallPositionInside=lt.

generatePositionInside(v,1,WallPositionInside):-
	WallPositionInside=rt.

generatePositionInside(v,2,WallPositionInside):-
	WallPositionInside=lb.

generatePositionInside(v,3,WallPositionInside):-
	WallPositionInside=rb.

generatePositionInside(h,0,WallPositionInside):-
	WallPositionInside=tl.

generatePositionInside(h,1,WallPositionInside):-
	WallPositionInside=tr.

generatePositionInside(h,2,WallPositionInside):-
	WallPositionInside=bl.

generatePositionInside(h,3,WallPositionInside):-
	WallPositionInside=br.

randomWallPosition(Xlimit,Ylimit,WallX,WallY):-
	MaxX is (Xlimit+1)/2+1,
	random(1,MaxX,X),
	X2 is round(X),
	transformToRealCoordinates(X2,WallX),
	MaxY is (Ylimit+1)/2+1,
	random(1,MaxY,Y),
	Y2 is round(Y),
	transformToRealCoordinates(Y2,WallY).

preparingForRandomDirection([L1|LS],1,Pawn,Direction):-  %(player,pawn)
	input(1,Pawn,PawnName),
	returnPosition(PawnName,[L1|LS],1,1,X,Y),
	distanceTo(X,Y,7,21,Distance1),
	distanceTo(X,Y,15,21,Distance2),
	Distance1>=Distance2->
		(
			%write('Vou para o 15 21'),nl,
			input(1,Pawn,PawnName),
			returnPosition(PawnName,[L1|LS],1,1,X,Y),
			choosingQuadrant(X,Y,15,21,Quadrant)
		);
		(
			%write('Vou para o 7 21'),nl,
			input(1,Pawn,PawnName),
			returnPosition(PawnName,[L1|LS],1,1,X,Y),
			choosingQuadrant(X,Y,7,21,Quadrant)
		),
		randomDirectionNewDifficulty(Quadrant,Direction).

preparingForRandomDirection([L1|LS],2,Pawn,Direction):-  %(player,pawn)
	input(2,Pawn,PawnName),
	returnPosition(PawnName,[L1|LS],1,1,X,Y),
	distanceTo(X,Y,7,7,Distance1),
	distanceTo(X,Y,15,7,Distance2),
	Distance1>=Distance2->
	(
		%write('Vou para o 15 7'),nl,
		input(2,Pawn,PawnName),
		returnPosition(PawnName,[L1|LS],1,1,X,Y),
	 	choosingQuadrant(X,Y,15,7,Quadrant)
	);
	(
	 %write('Vou para o 7 7'),nl,
	 input(2,Pawn,PawnName),
	 returnPosition(PawnName,[L1|LS],1,1,X,Y),
	choosingQuadrant(X,Y,7,7,Quadrant)
	),
	randomDirectionNewDifficulty(Quadrant,Direction),write(Direction),nl.

choosingQuadrant(Xp,Yp,Xf,Yf,Quadrant):-
	Xp > Xf->
		(
			Yp >= Yf->
				Quadrant=2;
				Quadrant=3
		);
		(
			Yp >= Yf->
				Quadrant=1;
				Quadrant=4
		).

distanceTo(X1,Y1,X2,Y2,Distance):-
	Xdist is X1-X2,
	Ydist is Y1-Y2,
	Distance is sqrt(Xdist**2+Ydist**2).

randomDirectionNewDifficulty(Quadrant,Direction):-
	random(0,5,GenerateDirection),
	generateDirectionNewDifficulty(Quadrant,GenerateDirection,Direction).

generateDirectionNewDifficulty(1,0,Direction):-
	Direction=t2.

generateDirectionNewDifficulty(1,1,Direction):-
	Direction=t1.

generateDirectionNewDifficulty(1,2,Direction):-
	Direction=r2.

generateDirectionNewDifficulty(1,3,Direction):-
	Direction=r1.

generateDirectionNewDifficulty(1,4,Direction):-
	Direction=dtr.

generateDirectionNewDifficulty(2,0,Direction):-
	Direction=t2.

generateDirectionNewDifficulty(2,1,Direction):-
	Direction=t1.

generateDirectionNewDifficulty(2,2,Direction):-
	Direction=l2.

generateDirectionNewDifficulty(2,3,Direction):-
	Direction=l1.

generateDirectionNewDifficulty(2,4,Direction):-
	Direction=dtl.

generateDirectionNewDifficulty(3,0,Direction):-
	Direction=l2.

generateDirectionNewDifficulty(3,1,Direction):-
	Direction=l1.

generateDirectionNewDifficulty(3,2,Direction):-
	Direction=b2.

generateDirectionNewDifficulty(3,3,Direction):-
	Direction=b1.

generateDirectionNewDifficulty(3,4,Direction):-
	Direction=dbl.

generateDirectionNewDifficulty(4,0,Direction):-
	Direction=b2.

generateDirectionNewDifficulty(4,1,Direction):-
	Direction=b1.

generateDirectionNewDifficulty(4,2,Direction):-
	Direction=r2.

generateDirectionNewDifficulty(4,3,Direction):-
	Direction=r1.

generateDirectionNewDifficulty(4,4,Direction):-
	Direction=dbr.
