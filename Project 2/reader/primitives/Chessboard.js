/**
 * ChessBoard
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function ChessBoard(scene, du, dv, texture, ) {
    CGFobject.call(this, scene);

    
};

ChessBoard.prototype = Object.create(CGFobject.prototype);
ChessBoard.prototype.constructor = ChessBoard;

/**
 * Function to display the chessboard
 */
ChessBoard.prototype.display = function(){

}

ChessBoard.prototype.updateTexCoords = function(s, t) {

}
