/**
 * Client Constructor
 * @param port port to be used
 * @constructor
 */
function Client(port) {
    this.defaultPort = 8081;
    this.port = port || this.defaultPort;
};

Client.prototype.constructor = Client;

/**
 * Function to make the request to the prolog server
 * @param requestString
 * @param onSuccess function to be called on success
 * @param onError function to be called on error
 */
Client.prototype.getPrologRequest = function(requestString, onSuccess, onError){
    var requestPort = this.port;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
    request.onerror = onError || function(){console.log("Error waiting for response");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

/**
 * Function to handle some replies
 * @param data
 * @returns {Object}
 */
Client.prototype.handleReply = function(data){
    return data.target.response;
}
/**
 * Function to set the port to be used
 * @param newPort new Porto to be used
 */
Client.prototype.setPort = function(newPort){
    this.port = newPort;
}
