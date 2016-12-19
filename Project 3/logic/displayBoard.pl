emptyBoard(Board):-
Board = [[empty,noVerticalWall,empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty],
        [noWall,null, noWall,null, noWall, null, noWall, null,  noWall, null,  noWall,null,  noWall, null, noWall, null, noWall, null, noWall,null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, empty,noVerticalWall, empty],
        [noWall,null, noWall,null, noWall, null, noWall,null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall,null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty, noVerticalWall,empty, noVerticalWall,empty, noVerticalWall,player11, noVerticalWall,empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, player12,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall,null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall,  null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty, noVerticalWall,empty, noVerticalWall,empty, noVerticalWall,player21, noVerticalWall,empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, player22,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall,empty,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
        [noWall, null, noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall],
        [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty]].


 normalBoard(Board):-
   Board = [[empty,noVerticalWall,empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty],
           [noWall,null, noWall,null, noWall, null, noWall, null,  noWall, null,  noWall,null,  noWall, null, noWall, null, noWall, null, noWall,null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, player11,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, empty,noVerticalWall, empty],
           [noWall,null, noWall,null, noWall, null, noWall,null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [wall,null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty, noVerticalWall,empty, noVerticalWall,empty, noVerticalWall,startPlayer1, verticalwall,empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, startPlayer1,noVerticalWall, empty,noVerticalWall, player22, noVerticalWall,empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,verticalwall, player12,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,null, noWall, null, wall, null, wall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, player21,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall,  null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, wall, null, wall, null, noWall],
           [empty, noVerticalWall,empty, noVerticalWall,empty, noVerticalWall,startPlayer2, noVerticalWall,empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, startPlayer2,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall,empty,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null,  noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall, null, noWall, null, noWall, null, noWall, null, noWall, null,  noWall, null, noWall, null, noWall, null, noWall, null, noWall, null, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty]].

finalBoard(Board):-
   Board = [[empty,noVerticalWall,empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, player11,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty, noVerticalWall,empty, noVerticalWall,empty, noVerticalWall,player21, verticalwall,empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, winnerplayer21,noVerticalWall, empty,noVerticalWall, player22, noVerticalWall,empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,verticalwall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, wall, empty, wall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, wall, empty, wall,empty, noWall],
           [empty, noVerticalWall,empty, noVerticalWall,empty, noVerticalWall,startPlayer2, noVerticalWall,empty,noVerticalWall, empty, noVerticalWall,empty,noVerticalWall, startPlayer2,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall,empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty],
           [noWall,empty, noWall,empty, noWall, empty, noWall,empty,  noWall, empty,  noWall,empty,  noWall, empty, noWall, empty, noWall, empty, noWall,empty, noWall],
           [empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty,noVerticalWall, empty, noVerticalWall, empty,noVerticalWall, empty]].


newBoard(Board):-
   Board = [[e,nVw,e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e],
            [nW,n, nW,n, nW, n, nW, n,  nW, n,  nW,n,  nW, n, nW, n, nW, n, nW,n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw,e,nVw, e,nVw, e],
            [nW,n, nW,n, nW, n, nW,n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW,n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e, nVw,e, nVw,e, nVw,p11, nVw,e,nVw, e, nVw,e,nVw, p12,nVw, e,nVw, e, nVw,e],
            [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW,n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n,  nW,  n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW],
            [e, nVw,e, nVw,e, nVw,p21, nVw,e,nVw, e, nVw,e,nVw, p22,nVw, e,nVw, e, nVw,e],
            [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW,e,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
            [nW, n, nW, n, nW, n, nW, n, nW, n,  nW, n, nW, n, nW, n, nW, n, nW, n, nW],
            [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e]].

newNormalBoard(Board):-
  Board = [[e,nVw,e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e],
           [nW,n, nW,n, nW, n, nW, n,  nW, n,  nW,n,  nW, n, nW, n, nW, n, nW,n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw,e,nVw, e,nVw, e],
           [nW,n, nW,n, nW, n, nW,n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
           [nW,n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
           [e, nVw,e, nVw,e, nVw,sP1, nVw,e,nVw, e, nVw,e,nVw, sP1,nVw, e,nVw, e, nVw,e],
           [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, W, n, W, n, nW, n, nW],
           [e,nVw, e,nVw, e,vW, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
           [nW,n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, p12, nW, n, nW],
           [e,nVw, e,nVw, e,vW, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
           [nW, n, nW, n, nW, n, nW, n,  W, n,  W, n,  nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, p21,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,vW, e, nVw, e,nVw, e],
           [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, e,nVw, e,nVw, p11,nVw, e,nVw, e,nVw, e,nVw, e,vW, e, nVw, e,nVw, e],
           [nW, n, nW, n, nW, n, nW, n,  nW,  n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, p22,nVw, e],
           [nW, n, nW, n, nW, n, W, n,  W, n,  nW, n,  nW, n, W, n, nW, n, W, n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,vW, e,nVw, e,nVw, e, nVw, e,nVw, e],
           [nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW, n, nW],
           [e, nVw,e, nVw,e, nVw,sP2, nVw,e,nVw, e, vW,e,nVw, sP2,nVw, e,nVw, e, nVw,e],
           [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW,e,  nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
           [nW, n, nW, n, nW, n, nW, n,  nW, n,  nW, n,  nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e],
           [nW, n, nW, n, nW, n, nW, n, nW, n,  nW, n, nW, n, nW, n, nW, n, nW, n, nW],
           [e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e,nVw, e, nVw, e,nVw, e]].

newFinalBoard(Board):-
              Board=[[e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,p1,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,p21,vW,e,nVw,e,nVw,e,nVw,wP21,nVw,e,nVw,p22,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,vW,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,wall,e,wall,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,wall,e,wall,e,nW],
              [e,nVw,e,nVw,e,nVw,sP2,nVw,e,nVw,e,nVw,e,nVw,sP2,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e],
              [nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW,e,nW],
              [e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e,nVw,e]].



player:-
write('                                __                 ___  __                             '),nl,
write(' ------------------------------|__) |     / |  |_/ |__  |__) --------------------------'),nl,
write('                               |    |___ /~~|   |  |___ |  |                           ').

player1:-
write('                                __                  ___  __                            '),nl,
write(' ------------------------------|__) |     / |  |_/ |__  |__)  /|-----------------------'),nl,
write('                               |    |___ /~~|   |  |___ |  |   |                       ').

player2:-
write('                                __                  ___  __   _                        '),nl,
write(' ------------------------------|__) |     / |  |_/ |__  |__)   )-----------------------'),nl,
write('                               |    |___ /~~|   |  |___ |  |  /_                       ').

pc1:-
write('                                        _   _                                          '),nl,
write(' --------------------------------------|_) |  /|---------------------------------------'),nl,
write('                                       |   |_  |                                       ').

pc2:-
write('                                        _    _  _                                       '),nl,
write(' -------------------------------------- |_) |    ) -------------------------------------'),nl,
write('                                        |   |_  /_                                      ').

pc:-
write('                                         _   _                                          '),nl,
write(' -------------------------------------- |_) |  -----------------------------------------'),nl,
write('                                        |   |_                                          ').


board_display([L1|LS]):-
 display_x_coord,
 nl, write('    ------------------------------------------------------------------------------------  '),nl,
 display_board([L1|LS],1,1).

display_board([L1|LS],Y, X1):-
 display_y_coord(Y, X1, X2),
 write('|'),
 display_line(L1), nl,
 Y1 is Y+1,
 display_board(LS,Y1, X2).

display_board([], Y, X):-
   Y>=X,
   write('    ------------------------------------------------------------------------------------ '),nl.

display_line([E1|ES]):-
 traduz(E1,V),
 write(V),
 display_line(ES).

display_line([]):-
 write(' |').

display_x_coord:-
 write('    a        b       c       d       e       f       g       h       i       j      k ').

display_y_coord(Y, X1, X2):-
 X1<10,
 1 is Y mod 2,
 write(X1),
 write(' '),
 X2 is X1+1.

display_y_coord(Y, X1, X2):-
 1 is Y mod 2,
 write(X1),
 X2 is X1+1.

display_y_coord(Y, X1, X2):-
 0 is Y mod 2,
 X2 is X1,
 write('  ').

 traduz(empty, '    ').
 traduz(null, '    ').
 traduz(startPlayer1, ' Oi ').
 traduz(startPlayer2, ' Xi ').
 traduz(verticalwall, ' *  ').
 traduz(wall, '****').
 traduz(noWall, '----').
 traduz(noVerticalWall, ' |  ').
 traduz(player21,' X1 ').
 traduz(player22,' X2 ').
 traduz(player12,' O2 ').
 traduz(player11,' O1 ').
 traduz(winnerplayer2,' Xw ').
 traduz(winnerplayer1,' Ow ').
