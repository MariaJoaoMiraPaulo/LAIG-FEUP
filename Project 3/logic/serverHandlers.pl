%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Require your Prolog Files here

parse_input(handshake, handshake).
parse_input(test(C,N), Res) :- test(C,Res,N).
parse_input(quit, goodbye).
parse_input(board, Numbers):-
	finalBoard(B),boardToNumbers(B,Numbers).

parse_input(initial_board,Board):-
	emptyBoardBlockade(TempBoard),
	boardToNumbers(TempBoard,Board).

parse_input(move_player(NumberBoard,Direction,Player,Pawn),NewBoardNumbers):-
	boardToNumbers(TempBoard,NumberBoard),
	transformToCoordinates(TempBoard,Player,Pawn,Direction,Xi,Yi,Xf,Yf,PawnName),
	setListElement(TempBoard,Xf,Yf,1,1,PawnName,NewBoard),
	isAStartHouse(Xi,Yi,OldPawnName),
	setListElement(NewBoard,Xi,Yi,1,1,OldPawnName,NewBoard2),
	boardToNumbers(NewBoard2,NewBoardNumbers).

parse_input(put_wall(Board,WallOri,FirstX,FirstY,SecondX,SecondY),NewBoard):-
  boardToNumbers(TempBoard,Board),
  writeWallOnBoard(TempBoard,WallOri,FirstX,FirstY,SecondX,SecondY,TempBoard2),
	board_display(TempBoard),nl,nl,
	board_display(TempBoard2),
	boardToNumbers(TempBoard2,NewBoard).

parse_input(valid_position(Board,Direction,Player,Pawn),Response):-
	boardToNumbers(TempBoard,Board),
	transformToCoordinates(TempBoard,Player,Pawn,Direction,Xi,Yi,_,_,_),
	(
		hasNoWall(TempBoard,Direction,Xi,Yi) ->
			Response = 1;
			Response = 0
	).

test(_,[],N) :- N =< 0.
test(A,[A|Bs],N) :- N1 is N-1, test(A,Bs,N1).

put_wall(_,_,_,_,_).

move_player(NumberBoard,Direction,Player,Pawn):-
	write('entrei'),
	boardToNumbers(TempBoard,NumberBoard),
	transformToCoordinates(TempBoard,Player,Pawn,Direction,Xi,Yi,Xf,Yf,PawnName),
	setListElement(TempBoard,Xf,Yf,1,1,PawnName,NewBoard),
	isAStartHouse(Xi,Yi,OldPawnName),
	setListElement(NewBoard,Xi,Yi,1,1,OldPawnName,_NewBoard2).
