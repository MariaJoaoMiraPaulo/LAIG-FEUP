gameLoop([L1|LS], Xlimit, Ylimit, WallsPlayer1, WallsPlayer2):-
  nl,nl,player1,nl,nl,
  play([L1|LS],1,Xlimit,Ylimit,[N1|NS],Over1,WallsPlayer1,NewWallsPlayer1),
  Over1=0->
    (
      nl,nl,player2,nl,nl,
      play([N1|NS],2,Xlimit,Ylimit,[M1|MS],Over2,WallsPlayer2,NewWallsPlayer2),
      Over2=0->
        gameLoop([M1|MS],Xlimit,Ylimit,NewWallsPlayer1,NewWallsPlayer2);
        winner(2)
    );
    winner(1).

gameLoopPlayerPc([L1|LS], Bot,Xlimit, Ylimit, WallsPlayer, WallsBot):-
  nl,nl,player,nl,nl,
  play([L1|LS],1,Xlimit,Ylimit,[N1|NS],Over1,WallsPlayer,NewWallsPlayer),
  Over1=0->
  (
    write('Type something to continue ...'),nl,
    read(_Lixo),
    nl,nl,pc,nl,nl,
    %playBot([N1|NS],2 ,Xlimit,Ylimit,[M1|MS],Over2,WallsBot,NewWallsBot),
    (
      Bot=y->
        playBotSecondDifficulty([N1|NS],2 ,Xlimit,Ylimit,[M1|MS],Over2,WallsBot,NewWallsBot);
        playBot([N1|NS],2 ,Xlimit,Ylimit,[M1|MS],Over2,WallsBot,NewWallsBot)
    ),

    Over2=0->
    gameLoopPlayerPc([M1|MS],Bot,Xlimit,Ylimit,NewWallsPlayer,NewWallsBot);
    write('BOT WINS!!!')
  );
  write('PLAYER WINS!!!!').

gameLoopPcPc([L1|LS], FirstDifficulty, SecondDifficulty,Xlimit, Ylimit,WallsBot1, WallsBot2):-
  nl,nl,pc1,nl,nl,
  (
    FirstDifficulty=2->
      playBotSecondDifficulty([L1|LS],1,Xlimit,Ylimit,[N1|NS],Over1,WallsBot1,NewWallsBot1);
      playBot([L1|LS],1,Xlimit,Ylimit,[N1|NS],Over1,WallsBot1,NewWallsBot1)
  ),

  Over1=0->
    (
      write('Type something to continue ...'),nl,
      read(_Lixo),
      nl,nl,pc2,nl,nl,
      (
        SecondDifficulty=2->
          playBotSecondDifficulty([N1|NS],2,Xlimit,Ylimit,[M1|MS],Over2,WallsBot2,NewWallsBot2);
          playBot([N1|NS],2,Xlimit,Ylimit,[M1|MS],Over2,WallsBot2,NewWallsBot2)
      ),
      Over2=0->
        (
          write('Type something to continue ...'),nl,
          read(_Lixo2),
          gameLoopPcPc([M1|MS], FirstDifficulty, SecondDifficulty,Xlimit,Ylimit,NewWallsBot1,NewWallsBot2)
        );
        write('BOT 2 WINS!!!!')
    );
    write('BOT 1 WINS!!!!').

playBot([L1|LS], Player, Xlimit, Ylimit,[T1|TS],Over,WallsBot,NewWallsBot):-
  board_display([L1|LS]),
  randomPawn(NewPawn),
  randomDirection(NewDirection),
  transformToCoordinates([L1|LS],Player, NewPawn, NewDirection,Xi, Yi, Xf, Yf, PawnName),

  isAvalidMove([L1|LS],Xi,Yi,Xf,Yf,NewDirection, Xlimit, Ylimit)->
  (
    (\+isAwinner([L1|LS],Player,Xf,Yf)->
      (
        Over=0,
        setListElement([L1|LS],Xf,Yf,1,1,PawnName,[N1|NS])
      );
      (
        Over=1,
        winnerName(1,WinnerName),
        setListElement([L1|LS],Xf,Yf,1,1,WinnerName,[N1|NS])
      )
    ),
    isAStartHouse(Xi,Yi, OldPawnName),
    setListElement([N1|NS],Xi,Yi,1,1,OldPawnName,[M1|MS]),
    (
      Over=0->
        (
          WallsBot<9->
          (wallBot([M1|MS],Xlimit,Ylimit,[T1|TS],WallsBot,NewWallsBot));
          (
          write('Already reached the max number of walls'),nl,
          NewWallsBot is WallsBot,
          T1=M1,
          TS=MS
          )
        )
    )
  );
  (
    write('Invalid play, try again'),nl,
    playBot([L1|LS], Player, Xlimit, Ylimit, _T,WallsBot,NewWallsBot)
  ).

playBotSecondDifficulty([L1|LS], Player, Xlimit, Ylimit,[T1|TS],Over,WallsBot,NewWallsBot):-
  board_display([L1|LS]),
  randomPawn(NewPawn),
  preparingForRandomDirection([L1|LS],Player,NewPawn,NewDirection),
  transformToCoordinates([L1|LS],Player, NewPawn, NewDirection,Xi, Yi, Xf, Yf, PawnName),

  isAvalidMove([L1|LS],Xi,Yi,Xf,Yf,NewDirection, Xlimit, Ylimit)->
  (
    (\+isAwinner([L1|LS],Player,Xf,Yf)->
      (
        Over=0,
        setListElement([L1|LS],Xf,Yf,1,1,PawnName,[N1|NS])
      );
      (
        Over=1,
        winnerName(1,WinnerName),
        setListElement([L1|LS],Xf,Yf,1,1,WinnerName,[N1|NS])
      )
    ),
    isAStartHouse(Xi,Yi, OldPawnName),
    setListElement([N1|NS],Xi,Yi,1,1,OldPawnName,[M1|MS]),
  (
    Over=0->
      (
        WallsBot<9->
        (wallBot([M1|MS],Xlimit,Ylimit,[T1|TS],WallsBot,NewWallsBot));
          (
            write('Already reached the max number of walls'),nl,
            NewWallsBot is WallsBot,
            T1=M1,
            TS=MS
          )
      )
    )
  );
  (
    write('Invalid play, try again'),nl,
    playBot([L1|LS], Player, Xlimit, Ylimit, _T,WallsBot,NewWallsBot)
  ).

play([L1|LS], Player, Xlimit, Ylimit,[T1|TS],Over,WallsPlayer,NewWallsPlayer):-
  board_display([L1|LS]),
  readingInput(_Pawn, _Direction,NewPawn,NewDirection),
  transformToCoordinates([L1|LS],Player, NewPawn, NewDirection,Xi, Yi, Xf, Yf, PawnName),

  isAvalidMove([L1|LS],Xi,Yi,Xf,Yf,NewDirection, Xlimit, Ylimit)->
  (
    (isAwinner([L1|LS],Player,Xf,Yf)->
      (
        Over=1,
        winnerName(1,WinnerName),
        setListElement([L1|LS],Xf,Yf,1,1,WinnerName,[N1|NS])
      );
      (
        Over=0,
        setListElement([L1|LS],Xf,Yf,1,1,PawnName,[N1|NS])
      )
    ),
    isAStartHouse(Xi,Yi, OldPawnName),
    setListElement([N1|NS],Xi,Yi,1,1,OldPawnName,[M1|MS]),
    (
      Over=0->
        (
          WallsPlayer<9->
            (wall([M1|MS],Xlimit,Ylimit,[T1|TS],WallsPlayer,NewWallsPlayer));
            (
              write('Already reached the max number of walls'),nl,
              NewWallsPlayer is WallsPlayer,
              T1=M1,
              TS=MS
            )
        )
    )
  );
  (
    write('Invalid play, try again'),nl,
    play([L1|LS], Player, Xlimit, Ylimit, _T,WallsPlayer,NewWallsPlayer)
  ).
